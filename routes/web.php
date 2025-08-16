<?php

use App\Http\Controllers\MenuCategoryController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Restaurant management routes
    Route::resource('restaurant', RestaurantController::class);
    Route::resource('menu-categories', MenuCategoryController::class);
    Route::resource('menu-items', MenuItemController::class);
    
    // Customer and restaurant shared routes
    Route::resource('orders', OrderController::class);
    Route::resource('reservations', ReservationController::class);
    Route::resource('payments', PaymentController::class)->only(['index', 'create', 'store', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
