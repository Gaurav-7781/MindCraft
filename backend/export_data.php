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

if (!is_dir(__DIR__.'/backup_data')) {
    mkdir(__DIR__.'/backup_data');
}

file_put_contents(__DIR__.'/backup_data/users.json', User::all()->toJson(JSON_PRETTY_PRINT));
file_put_contents(__DIR__.'/backup_data/quizzes.json', Quiz::all()->toJson(JSON_PRETTY_PRINT));
file_put_contents(__DIR__.'/backup_data/questions.json', Question::all()->toJson(JSON_PRETTY_PRINT));
file_put_contents(__DIR__.'/backup_data/game_scores.json', GameScore::all()->toJson(JSON_PRETTY_PRINT));
file_put_contents(__DIR__.'/backup_data/achievements.json', Achievement::all()->toJson(JSON_PRETTY_PRINT));
// also user_achievements if it exists. We might need DB query for pivot table
use Illuminate\Support\Facades\DB;
file_put_contents(__DIR__.'/backup_data/user_achievements.json', json_encode(DB::table('user_achievements')->get(), JSON_PRETTY_PRINT));

echo "Data exported successfully to backup_data directory.\n";
