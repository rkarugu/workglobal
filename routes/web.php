<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SubmissionAdminController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\PaymentController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;

// Serve welcome Blade view
Route::get('/', function () {
    return view('admin');
})->name('home');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Route to handle the React Admin SPA
Route::view('/admin/{any?}', 'admin')->where('any', '.*')->name('admin');

// Admin routes
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/submissions', [SubmissionAdminController::class, 'index'])->name('submissions.index');
    Route::post('/submissions/{submission}/approve', [SubmissionAdminController::class, 'approve'])->name('submissions.approve');
    Route::post('/submissions/{submission}/reject', [SubmissionAdminController::class, 'reject'])->name('submissions.reject');
    Route::get('/submissions/{submission}', [SubmissionAdminController::class, 'show'])->name('submissions.show');
    Route::get('/submissions/{submission}/resume', [SubmissionAdminController::class, 'resume'])->name('submissions.resume');
});

// Public job application routes
Route::get('/apply', [SubmissionController::class, 'create'])->name('apply.form');
Route::post('/apply', [SubmissionController::class, 'store'])->name('apply.submit');

// Fallback to SPA index for other front-end routes
// Fallback for frontend routes, but exclude any path starting with api/
Route::get('/{any}', function () {
    return view('admin');
})->where('any', '^(?!api/|storage/).*');
