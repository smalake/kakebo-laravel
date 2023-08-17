<?php

use App\Http\Controllers\DisplayNameController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SetupController;
use Illuminate\Support\Facades\Route;

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

Route::post('register', [RegisterController::class, 'register']);
Route::post('join-register', [RegisterController::class, 'join_register']);
Route::post('login', [LoginController::class, 'login']);
// Route::middleware('firebase')->get('register', [◯◯Controller::class, '関数名']);

// event用
Route::group(['middleware' => ['firebase']], function () {
    Route::post('events', [EventController::class, 'create']);
    Route::put('events', [EventController::class, 'update']);
    Route::get('events', [EventController::class, 'get_all']);
    Route::get('events/{id}', [EventController::class, 'get_one']);
    Route::delete('events', [EventController::class, 'delete']);
});

// setting用
Route::group(['middleware' => ['firebase']], function () {
    Route::get('display-name', [DisplayNameController::class, 'get']);
    Route::put('display-name', [DisplayNameController::class, 'update']);
    Route::get('invite-group', [GroupController::class, 'generate_url']);
});
Route::get('verify-invite-url', [GroupController::class, 'verify_url'])->name('verify.url');
