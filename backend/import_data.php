<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\GameScore;
use App\Models\Achievement;

function importData($modelClass, $filename) {
    $path = __DIR__.'/backup_data/'.$filename;
    if (!file_exists($path)) {
        echo "File $filename not found.\n";
        return;
    }
    
    $data = json_decode(file_get_contents($path), true);
    if (!is_array($data)) {
        echo "Invalid JSON in $filename.\n";
        return;
    }
    
    foreach ($data as $item) {
        $model = new $modelClass();
        foreach ($item as $key => $value) {
            $model->{$key} = $value;
        }
        $model->save();
    }
    echo "Imported " . count($data) . " records to " . class_basename($modelClass) . "\n";
}

// Clear existing to avoid duplicates if run multiple times
User::truncate();
Quiz::truncate();
Question::truncate();
GameScore::truncate();
Achievement::truncate();

importData(User::class, 'users.json');
importData(Quiz::class, 'quizzes.json');
importData(Question::class, 'questions.json');
importData(GameScore::class, 'game_scores.json');
importData(Achievement::class, 'achievements.json');

// user_achievements pivot table is a bit different in MongoDB if modeled as relationships.
// Since we are using standard Eloquent, many-to-many pivots in MongoDB require 'mongodb/laravel-mongodb' specific approach.
// For now, let's just insert the raw pivot data if possible or ignore it since the user mainly cares about users/scores.
$pivotPath = __DIR__.'/backup_data/user_achievements.json';
if (file_exists($pivotPath)) {
    $pivotData = json_decode(file_get_contents($pivotPath), true);
    if (is_array($pivotData) && count($pivotData) > 0) {
        // We can just use DB facade to insert into a 'user_achievements' collection
        Illuminate\Support\Facades\DB::collection('user_achievements')->truncate();
        Illuminate\Support\Facades\DB::collection('user_achievements')->insert($pivotData);
        echo "Imported " . count($pivotData) . " records to user_achievements collection.\n";
    }
}

echo "Data import completed.\n";
