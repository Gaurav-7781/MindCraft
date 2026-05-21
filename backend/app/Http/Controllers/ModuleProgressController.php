<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ModuleProgressController extends Controller
{
    public function index(Request $request)
    {
        $progress = $request->user()->moduleProgress;
        return response()->json($progress);
    }

    public function store(Request $request)
    {
        $request->validate([
            'module_id' => 'required|string',
            'status' => 'required|string|in:started,completed',
            'score' => 'integer|min:0'
        ]);

        $progress = \App\Models\ModuleProgress::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'module_id' => $request->module_id,
            ],
            [
                'status' => $request->status,
                'score' => $request->score ?? 0,
            ]
        );

        return response()->json($progress);
    }
}
