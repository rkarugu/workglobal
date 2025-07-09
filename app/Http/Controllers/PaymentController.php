<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Services\MpesaDaraja;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    public function initiate(Request $request)
    {
        $request->validate([
            'name'    => ['required','string','max:255'],
            'email'   => ['required','email'],
            'phone'   => ['required', 'regex:/^2547\d{8}$/'],
            'amount'  => ['required', 'integer', 'in:5200'],
            'terms_accepted' => ['required', 'boolean'],
        ]);

        $payment = Payment::create([
            'name'           => $request->name,
            'email'          => $request->email,
            'phone'          => $request->phone,
            'amount'         => 5200,
            'status'         => Payment::STATUS_PENDING,
            'reference'      => Str::uuid()->toString(),
            'terms_accepted' => true,
            'payment_method' => Payment::METHOD_STK,
        ]);

        $stkResponse = null;
        $stkError = null;
        try {
            $daraja = new MpesaDaraja();
            $callbackUrl = config('mpesa.callback_url');
            $stkResponse = $daraja->stkPush($payment->phone, $payment->amount, $payment->reference, $callbackUrl);
            $payment->merchant_request_id = $stkResponse['MerchantRequestID'] ?? null;
            $payment->checkout_request_id = $stkResponse['CheckoutRequestID'] ?? null;
            $payment->save();
        } catch (\Throwable $e) {
            // Fallback to manual if STK push fails
            $payment->payment_method = Payment::METHOD_MANUAL;
            $payment->save();
            $stkError = $e->getMessage();
        }

        return response()->json([
            'payment_id' => $payment->id,
            'paybill' => [
                'shortcode' => config('mpesa.short_code'),
                'amount' => 5200,
                'reference' => $payment->reference
            ],
            'stk' => [
                'success' => $stkResponse && isset($stkResponse['ResponseCode']) && $stkResponse['ResponseCode'] == '0',
                'error' => $stkError,
            ]
        ]);
    }

    public function verify(Request $request, Payment $payment)
    {
        $request->validate([
            'mpesa_code' => ['required', 'string', 'min:8'],
        ]);

        try {
            // In sandbox mode, accept any valid format M-Pesa code
            if (config('mpesa.env') === 'sandbox') {
                $payment->update([
                    'mpesa_code' => $request->mpesa_code,
                    'status' => Payment::STATUS_VERIFIED,
                    'verified_at' => now(),
                ]);

                // Send receipt email
                try {
                    \Mail::to($payment->email)->queue(new \App\Mail\PaymentReceiptMail($payment));
                } catch (\Throwable $e) {
                    Log::error('Failed to queue payment receipt mail', [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString(),
                        'payment_id' => $payment->id,
                        'email' => $payment->email
                    ]);
                    // Don't fail the verification just because email failed
                }

                return response()->json(['message' => 'Payment verified successfully']);
            }

            // For production, implement actual verification logic
        if (strlen($request->mpesa_code) >= 8 && (int) $payment->amount === 5200) {
            $payment->update([
                'mpesa_code' => $request->mpesa_code,
                'status' => Payment::STATUS_VERIFIED,
                'verified_at' => now(),
            ]);

            // Send receipt email
            try {
                \Mail::to($payment->email)->queue(new \App\Mail\PaymentReceiptMail($payment));
            } catch (\Throwable $e) {
                    Log::error('Failed to queue payment receipt mail', [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString(),
                        'payment_id' => $payment->id,
                        'email' => $payment->email
                    ]);
                    // Don't fail the verification just because email failed
            }

            return response()->json(['message' => 'Payment verified successfully']);
        }

        return response()->json(['message' => 'Invalid M-Pesa code or amount mismatch'], Response::HTTP_BAD_REQUEST);
        } catch (\Throwable $e) {
            Log::error('Payment verification failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'payment_id' => $payment->id,
                'mpesa_code' => $request->mpesa_code
            ]);
            return response()->json(['message' => 'Payment verification failed'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Daraja callback (disabled for manual verification)
    public function callback(Request $request)
    {
        // Safaricom will POST the result here
        $data = $request->all();
        \Log::info('M-Pesa Callback', $data);
        $checkoutRequestId = $data['Body']['stkCallback']['CheckoutRequestID'] ?? null;
        $resultCode = $data['Body']['stkCallback']['ResultCode'] ?? null;
        $mpesaReceipt = $data['Body']['stkCallback']['CallbackMetadata']['Item'][1]['Value'] ?? null;

        if ($checkoutRequestId && $resultCode === 0) {
            $payment = Payment::where('checkout_request_id', $checkoutRequestId)->first();
            if ($payment) {
                $payment->status = Payment::STATUS_VERIFIED;
                $payment->mpesa_receipt = $mpesaReceipt;
                $payment->verified_at = now();
                $payment->save();
                // Send receipt email
                try {
                    \Mail::to($payment->email)->queue(new \App\Mail\PaymentReceiptMail($payment));
                } catch (\Throwable $e) {
                    Log::error('Failed to queue payment receipt mail', ['error' => $e->getMessage()]);
                }
            }
        }
        return response()->json(['message' => 'Callback received']);
    }

    // Polling endpoint
    public function show(Payment $payment)
    {
        return response()->json($payment);
    }
}
