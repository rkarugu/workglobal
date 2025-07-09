<?php

namespace App\Mail;

use App\Models\Payment;
use App\Services\ReceiptPdfGenerator;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentReceiptMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public Payment $payment)
    {
    }

    public function build(): self
    {
        $pdfGenerator = new ReceiptPdfGenerator();
        $pdfPath = $pdfGenerator->generate($this->payment);

        return $this->from('payment@workforceinternational.agency', 'Workforce International')
            ->subject('Your Workforce International Payment Receipt')
            ->markdown('emails.payment_receipt')
            ->attach($pdfPath, [
                'as' => 'receipt.pdf',
                'mime' => 'application/pdf'
            ]);
    }
}
