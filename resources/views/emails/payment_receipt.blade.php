@component('mail::message')
# Payment Receipt

Dear {{ $payment->name ?? 'Valued Customer' }},

Thank you for paying the Workforce International application fee.

- **Amount:** Ksh {{ number_format($payment->amount ?? 0) }}
- **Phone:** {{ $payment->phone ?? 'N/A' }}
- **M-Pesa Code:** {{ $payment->mpesa_code ?? 'N/A' }}
- **Reference:** {{ $payment->reference ?? 'N/A' }}
- **Date:** {{ $payment->verified_at ? $payment->verified_at->format('Y-m-d H:i:s') : now()->format('Y-m-d H:i:s') }}

Your application portal is now unlocked. You may return to complete and submit your application.

If you have any questions please reply to this email.

Thanks,<br>
{{ config('app.name') }} Team
@endcomponent
