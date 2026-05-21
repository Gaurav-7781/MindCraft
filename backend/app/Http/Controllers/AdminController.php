<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function stats()
    {
        return response()->json([
            'users_count' => \App\Models\User::count(),
            'quizzes_count' => \App\Models\Quiz::count(),
            'scenarios_count' => \App\Models\Scenario::count(),
            'achievements_count' => \App\Models\Achievement::count(),
        ]);
    }
}
