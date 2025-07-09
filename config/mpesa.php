<?php

return [
    /*
    |--------------------------------------------------------------------------
    | M-Pesa (Daraja) Configuration
    |--------------------------------------------------------------------------
    |
    | Values are pulled from the .env file so they can differ per environment.
    | You may switch between the Safaricom Sandbox and Production endpoints by
    | setting MPESA_ENV=sandbox|production.
    |
    */

    // sandbox | production
    'env'           => env('MPESA_ENV', 'sandbox'),

    // API consumer credentials
    'consumer_key'    => env('MPESA_CONSUMER_KEY'),
    'consumer_secret' => env('MPESA_CONSUMER_SECRET'),

    // Short code & passkey issued by Safaricom (PayBill or Till Number for Buy Goods)
    'short_code' => env('MPESA_ENV', 'sandbox') === 'sandbox' ? '174379' : '493969', // Use sandbox shortcode for testing
    'passkey'    => env('MPESA_PASSKEY'),

    // Callback URL that Safaricom POSTs payment result to
    'callback_url' => env('MPESA_CALLBACK_URL'),
];
