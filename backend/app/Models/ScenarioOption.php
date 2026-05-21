<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class ScenarioOption extends Model
{
    protected $fillable = ['scenario_node_id', 'text', 'next_node_id'];

    public function node()
    {
        return $this->belongsTo(ScenarioNode::class, 'scenario_node_id');
    }

    public function nextNode()
    {
        return $this->belongsTo(ScenarioNode::class, 'next_node_id');
    }
}
