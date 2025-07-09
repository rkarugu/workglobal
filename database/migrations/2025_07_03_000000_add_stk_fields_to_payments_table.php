<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->string('merchant_request_id')->nullable()->after('reference');
            $table->string('checkout_request_id')->nullable()->after('merchant_request_id');
            $table->string('payment_method')->default('manual')->after('terms_accepted');
        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn(['merchant_request_id', 'checkout_request_id', 'payment_method']);
        });
    }
}; 