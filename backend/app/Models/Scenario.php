<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Scenario extends Model
{
    protected $fillable = ['title', 'description', 'first_node_id'];

    public function nodes()
    {
        return $this->hasMany(ScenarioNode::class);
    }
}
