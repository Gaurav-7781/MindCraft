<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

use App\Http\Controllers\QuizController;
use App\Http\Controllers\GameScoreController;
use App\Http\Controllers\ModuleProgressController;

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

    // Module Progress
    Route::get('/modules/progress', [ModuleProgressController::class, 'index']);
    Route::post('/modules/progress', [ModuleProgressController::class, 'store']);

    // Achievements
    Route::get('/achievements', [\App\Http\Controllers\AchievementController::class, 'index']);

    // Leaderboard
    Route::get('/leaderboard', [\App\Http\Controllers\LeaderboardController::class, 'index']);

    // Scenarios
    Route::get('/scenarios', [\App\Http\Controllers\ScenarioController::class, 'index']);
    Route::get('/scenarios/{id}', [\App\Http\Controllers\ScenarioController::class, 'show']);

    // Admin Routes
    Route::middleware([\App\Http\Middleware\AdminMiddleware::class])->group(function () {
        Route::get('/admin/stats', [\App\Http\Controllers\AdminController::class, 'stats']);
    });
});
