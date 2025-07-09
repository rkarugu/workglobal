<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/submissions', [SubmissionController::class, 'store']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Payment routes
Route::post('/payments/mpesa', [PaymentController::class, 'initiate']);
Route::post('/payments/mpesa/callback', [PaymentController::class, 'callback'])->name('mpesa.callback');
Route::post('/payments/{payment}/verify', [PaymentController::class, 'verify']);
Route::get('/payments/{payment}', [PaymentController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/submissions', [SubmissionController::class, 'index']);
    Route::get('/admin/submissions/{submission}', [SubmissionController::class, 'show']);
    Route::post('/admin/submissions/{submission}/approve', [SubmissionController::class, 'approve']);
    Route::post('/admin/submissions/{submission}/reject', [SubmissionController::class, 'reject']);
});
