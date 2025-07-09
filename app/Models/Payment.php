<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'amount',
        'status',
        'mpesa_receipt',
        'reference',
        'terms_accepted',
        'mpesa_code',
        'payment_method',
        'verified_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_VERIFIED = 'verified';
    const STATUS_FAILED = 'failed';

    const METHOD_STK = 'stk';
    const METHOD_MANUAL = 'manual';
}
