<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index()
    {
        $topUsers = \App\Models\User::orderBy('xp', 'desc')
            ->select('id', 'name', 'xp', 'level')
            ->take(100)
            ->get();

        return response()->json($topUsers);
    }
}
