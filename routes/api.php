<?php

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
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

Route::group(['middleware' => ['api', 'cors']], function () {
    Route::options('articles', function () {
        return response()->json();
    });
    Route::resource('articles', 'Api\ArticlesController');
});

// Route::middleware('firebase')->get('register', [◯◯Controller::class, '関数名']);
Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [LoginController::class, 'login']);
