<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class ModuleProgress extends Model
{
    protected $table = 'module_progress';

    protected $fillable = [
        'user_id',
        'module_id',
        'status',
        'score',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
