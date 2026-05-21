<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = ['title', 'description', 'reward_xp'];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
