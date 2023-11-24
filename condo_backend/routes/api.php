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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Route::get("deceased/search/{string}", [DeceasedController::class, "search"]);

Route::controller(DeceasedController::class)->group(function () {
    Route::prefix('deceased')->group(function () {
        Route::get('/search/{string}', 'search');
        Route::get('/details/{id}', 'details');
        Route::delete('/deleteRecord/{id}', 'deleteRecord');
    });
});

Route::controller(AdminController::class)->group(function () {
    Route::prefix('admin')->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login');
    });
});
