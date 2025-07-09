<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MpesaDaraja
{
    private string $baseUrl;
    private string $consumerKey;
    private string $consumerSecret;

    public function __construct()
    {
        $this->baseUrl = config('mpesa.env') === 'production'
            ? 'https://api.safaricom.co.ke'
            : 'https://sandbox.safaricom.co.ke';

        $this->consumerKey    = trim(config('mpesa.consumer_key'));
        $this->consumerSecret = trim(config('mpesa.consumer_secret'));

        if (empty($this->consumerKey) || empty($this->consumerSecret)) {
            throw new \RuntimeException('M-Pesa API credentials not configured. Please check your .env file.');
        }
    }

    /**
     * Get OAuth token (cached for 55 minutes).
     */
    public function accessToken(): string
    {
        return Cache::remember('daraja_access_token_' . config('mpesa.env'), 3300, function () {
            try {
            $client = config('mpesa.env') === 'production'
                ? Http::timeout(60)->withBasicAuth($this->consumerKey, $this->consumerSecret)
                : Http::timeout(60)->withoutVerifying()->withBasicAuth($this->consumerKey, $this->consumerSecret);

            $response = $client->get($this->baseUrl . '/oauth/v1/generate?grant_type=client_credentials');

            if (!$response->ok()) {
                    Log::error('Failed to obtain Daraja access token', [
                        'status' => $response->status(),
                        'body' => $response->json(),
                    ]);
                    throw new \RuntimeException('Failed to obtain Daraja access token: ' . $response->body());
            }

            return $response['access_token'];
            } catch (\Throwable $e) {
                Log::error('Error getting Daraja access token', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]);
                throw new \RuntimeException('Failed to authenticate with M-Pesa: ' . $e->getMessage());
            }
        });
    }

    /**
     * Initiate STK Push request
     */
    public function stkPush(string $phone, int $amount, string $reference, string $callbackUrl): array
    {
        try {
        $shortCode = trim(config('mpesa.short_code'));
            $passkey = trim(config('mpesa.passkey'));

            if (empty($shortCode) || empty($passkey)) {
                throw new \RuntimeException('M-Pesa shortcode or passkey not configured');
            }

            $timestamp = now()->format('YmdHis');
            $password = base64_encode($shortCode . $passkey . $timestamp);

        $payload = [
            'BusinessShortCode' => $shortCode,
                'Password' => $password,
                'Timestamp' => $timestamp,
                'TransactionType' => 'CustomerBuyGoodsOnline',
                'Amount' => $amount,
                'PartyA' => $phone,
                'PartyB' => $shortCode,
                'PhoneNumber' => $phone,
                'CallBackURL' => $callbackUrl,
                'AccountReference' => $reference,
                'TransactionDesc' => 'Application fee',
        ];

            Log::info('Initiating STK push', [
                'phone' => substr_replace($phone, 'XXXXX', -5),
                'amount' => $amount,
                'shortcode' => $shortCode,
            ]);

        $client = config('mpesa.env') === 'production'
            ? Http::timeout(60)->withToken($this->accessToken())
            : Http::timeout(60)->withoutVerifying()->withToken($this->accessToken());

        $response = $client->post($this->baseUrl . '/mpesa/stkpush/v1/processrequest', $payload);

        if (!$response->ok()) {
                Log::error('Daraja STK push failed', [
                'status' => $response->status(),
                    'body' => $response->json(),
                    'payload' => array_merge($payload, ['Password' => '***']),
            ]);
                
                $errorMessage = $response->json()['errorMessage'] ?? $response->body();
                throw new \RuntimeException('STK push failed: ' . $errorMessage);
        }

            $responseData = $response->json();
            Log::info('STK push response', [
                'ResponseCode' => $responseData['ResponseCode'] ?? null,
                'CustomerMessage' => $responseData['CustomerMessage'] ?? null,
            ]);

            return $responseData;
        } catch (\Throwable $e) {
            Log::error('STK push error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw new \RuntimeException('Failed to initiate M-Pesa payment: ' . $e->getMessage());
        }
    }
}
