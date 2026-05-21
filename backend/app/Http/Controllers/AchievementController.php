<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AchievementController extends Controller
{
    public function index(Request $request)
    {
        $allAchievements = \App\Models\Achievement::all();
        $userAchievements = $request->user()->achievements->pluck('id')->toArray();

        $response = $allAchievements->map(function ($achievement) use ($userAchievements) {
            return [
                'id' => $achievement->id,
                'name' => $achievement->name,
                'description' => $achievement->description,
                'icon_url' => $achievement->icon_url,
                'unlocked' => in_array($achievement->id, $userAchievements),
            ];
        });

        return response()->json($response);
    }
}
