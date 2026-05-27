<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    public function index()
    {
        return response()->json(Quiz::with('questions')->get());
    }

    public function submit(Request $request, $id)
    {
        $quiz = Quiz::with('questions')->findOrFail($id);
        $answers = $request->input('answers', []); // ['question_id' => 'selected_option']
        
        $correctCount = 0;
        $totalQuestions = $quiz->questions->count();

        foreach ($quiz->questions as $question) {
            if (isset($answers[$question->id]) && $answers[$question->id] === $question->correct_answer) {
                $correctCount++;
            }
        }

        $percentage = $totalQuestions > 0 ? ($correctCount / $totalQuestions) : 0;
        $xpEarned = (int) round($percentage * $quiz->reward_xp);

        $user = Auth::user();
        $gamificationResult = [];
        if ($xpEarned > 0) {
            if (method_exists($user, 'addXP')) {
                $gamificationResult = $user->{'addXP'}($xpEarned);
            } elseif (method_exists($user, 'addXp')) {
                $gamificationResult = $user->{'addXp'}($xpEarned);
            } else {
                $user->xp = ($user->xp ?? 0) + $xpEarned;
                if (method_exists($user, 'save')) {
                    $user->save();
                }
                $gamificationResult = ['xp' => $user->xp, 'earned' => $xpEarned];
            }
        }

        return response()->json([
            'score' => $correctCount,
            'total' => $totalQuestions,
            'percentage' => $percentage * 100,
            'xp_earned' => $xpEarned,
            'gamification' => $gamificationResult
        ]);
    }
}
