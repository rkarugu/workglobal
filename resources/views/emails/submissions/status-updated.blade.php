<!DOCTYPE html>
<html>
<head>
    <title>Application Status Update</title>
</head>
<body>
    <p>Dear {{ $submission->full_name }},</p>

    @if ($status === 'APPROVED')
        <p>We are pleased to inform you that your application for the position of <strong>{{ $submission->desired_position }}</strong> has been approved.</p>
        <p>Our team will be in touch with you shortly with further instructions. Please do not reply to this email.</p>
    @elseif ($status === 'REJECTED')
        <p>Thank you for your interest in the <strong>{{ $submission->desired_position }}</strong> position at Workforce International.</p>
        <p>After careful consideration, we regret to inform you that we will not be moving forward with your application at this time. We wish you the best in your job search.</p>
    @endif

    <p>Sincerely,</p>
    <p>The Workforce International Team</p>
</body>
</html>
