<?php

namespace App\Services;

use App\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;

class ReceiptPdfGenerator
{
    public function generate(Payment $payment): string
    {
        $pdf = PDF::loadView('pdfs.receipt', [
            'payment' => $payment,
            'company' => [
                'name' => config('app.name'),
                'address' => 'Nairobi, Kenya',
                'phone' => '+254 700 000000',
                'email' => 'payment@workforceinternational.agency',
            ]
        ]);

        // Generate a temporary file path
        $path = storage_path('app/temp/receipt_' . $payment->id . '.pdf');
        
        // Ensure directory exists
        if (!file_exists(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }

        // Save the PDF
        $pdf->save($path);

        return $path;
    }
} 