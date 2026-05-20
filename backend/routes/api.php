<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

use App\Http\Controllers\QuizController;
use App\Http\Controllers\GameScoreController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Quizzes
    Route::get('/quizzes', [QuizController::class, 'index']);
    Route::post('/quizzes/{id}/submit', [QuizController::class, 'submit']);

    // Games
    Route::post('/games/score', [GameScoreController::class, 'store']);
});
