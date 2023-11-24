<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DeceasedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// OPEN ROUTES ##############################################################
Route::controller(DeceasedController::class)->group(function () {
    Route::prefix('deceased')->group(function () {
        Route::get('/search/{string}', 'search');
        Route::get('/details/{id}', 'details');
    });
});

Route::controller(AdminController::class)->group(function () {
    Route::prefix('admin')->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login');
    });
});




// PROTECTED ROUTES ##############################################################
Route::middleware('auth:sanctum')->group(function () {

    Route::controller(DeceasedController::class)->group(function () {
        Route::prefix('deceased')->group(function () {
            Route::post('/store', 'store');
            Route::post('/update/{id}', 'update');
            Route::delete('/deleteRecord/{id}', 'deleteRecord');
        });
    });

    Route::controller(AdminController::class)->group(function () {
        Route::prefix('admin')->group(function () {
            Route::post('/changePassword', 'changePassword');
            Route::post('/logout', 'logout');
        });
    });
});
