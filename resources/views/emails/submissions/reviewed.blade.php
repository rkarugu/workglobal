@component('mail::message')
# Application Reviewed

Hello {{ $submission->full_name }},

Your job application has been reviewed by **{{ $reviewer }}**. We appreciate your interest in joining our team.

We will contact you with further updates as soon as possible.

If you have any questions in the meantime, feel free to reply to this email.

Thanks,
{{ config('app.name') }}
@endcomponent
