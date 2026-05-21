<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ScenarioController extends Controller
{
    public function index()
    {
        $scenarios = \App\Models\Scenario::all();
        return response()->json($scenarios);
    }

    public function show($id)
    {
        $scenario = \App\Models\Scenario::with('nodes.options')->findOrFail($id);
        return response()->json($scenario);
    }
}
