<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Payment;
use Symfony\Component\HttpFoundation\Response;

class VerifyPayment
{
    public function handle(Request $request, Closure $next): Response
    {
        $paymentId = $request->query('payment_id');
        
        if (!$paymentId) {
            return redirect()->route('home')->with('error', 'Please complete the payment first.');
        }

        $payment = Payment::find($paymentId);

        if (!$payment || $payment->status !== Payment::STATUS_VERIFIED) {
            return redirect()->route('home')->with('error', 'Please complete the payment verification first.');
        }

        // Add payment details to the request for pre-filling the form
        $request->merge([
            'payment_details' => [
                'fullName' => $payment->name,
                'email' => $payment->email,
                'phone' => $payment->phone,
            ]
        ]);

        return $next($request);
    }
} 