<?php

namespace App\Mail;

use App\Models\Submission;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SubmissionReviewed extends Mailable
{
    use Queueable, SerializesModels;

    public Submission $submission;
    public string $reviewer;

    /**
     * Create a new message instance.
     */
    public function __construct(Submission $submission, string $reviewer)
    {
        $this->submission = $submission;
        $this->reviewer   = $reviewer;
    }

    /**
     * Build the message.
     */
    public function build(): self
    {
        return $this->subject('Your application has been reviewed')
            ->markdown('emails.submissions.reviewed');
    }
}
