<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\GameScore;
use Illuminate\Support\Facades\Auth;

class GameScoreController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'game_name' => 'required|string',
            'score' => 'required|integer',
            'play_time' => 'nullable|integer'
        ]);

        $user = Auth::user();
        
        $gameScore = GameScore::create([
            'user_id' => $user->id,
            'game_name' => $request->game_name,
            'score' => $request->score,
            'play_time' => $request->play_time,
        ]);

        // 1 score = 1 XP
        $xpEarned = $request->score;
        $gamificationResult = $user->addXP($xpEarned);

        return response()->json([
            'message' => 'Score saved successfully',
            'score' => $gameScore,
            'xp_earned' => $xpEarned,
            'gamification' => $gamificationResult
        ]);
    }
}
