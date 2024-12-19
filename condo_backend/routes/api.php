<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminsListController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CondolenceController;
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

Route::prefix('account')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::controller(DeceasedController::class)->group(function () {
    Route::prefix('public')->group(function () {
        Route::get('/search/{string}', 'search');
        Route::get('/deceased/{id}', 'details');
        Route::get('/recents', 'recents');
    });
});

Route::controller(CondolenceController::class)->group(function () {
    Route::get('public/condolences/{deceased_id}', 'getCondolences');
    Route::post('public/condolences', 'postCondolence');
});


// PROTECTED ROUTES ##############################################################
Route::middleware('auth:sanctum')->group(function () {

    Route::controller(DeceasedController::class)->group(function () {
        Route::prefix('admin')->group(function () {
            Route::post('/deceased', 'saveNew');
            Route::post('/deceased/{id}', 'update');
            Route::get('/deceased/uploads', 'uploadsList');
            Route::delete('/deceased/deleteRecord/{id}', 'deleteRecord');
        });
    });

    Route::controller(AuthController::class)->group(function () {
        Route::prefix('account')->group(function () {
            Route::get('/profile', 'profile');
            Route::post('/changePassword', 'changePassword');
            Route::post('/logout', 'logout');
        });
    });

    Route::delete('/condolence/remove', [CondolenceController::class, 'removeCondolence']);

    Route::get('/admins/list', [AdminsListController::class, 'adminsList']);
    Route::delete('/admins/delete/{id}', [AdminsListController::class, 'deleteAdmin']);


    Route::prefix('account')->group(function () {});
});
