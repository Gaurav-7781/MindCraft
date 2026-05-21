<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class GameScore extends Model
{
    protected $fillable = ['user_id', 'game_name', 'score', 'play_time'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
