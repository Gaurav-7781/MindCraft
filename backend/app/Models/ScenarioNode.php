<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class ScenarioNode extends Model
{
    protected $fillable = ['scenario_id', 'character_name', 'text', 'is_end'];

    public function scenario()
    {
        return $this->belongsTo(Scenario::class);
    }

    public function options()
    {
        return $this->hasMany(ScenarioOption::class);
    }
}
