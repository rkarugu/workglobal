<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Submission;

class SubmissionStatusUpdated extends Mailable
{
    use Queueable, SerializesModels;

    public $submission;
    public $status;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Submission $submission, $status)
    {
        $this->submission = $submission;
        $this->status = $status;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Update on your application with Workforce International')
                    ->view('emails.submissions.status-updated');
    }
}
