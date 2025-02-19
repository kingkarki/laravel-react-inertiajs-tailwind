<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneratedTeamPlayer extends Model
{
    //
    public function player()
    {
        return $this->belongsTo(Player::class);
    }
}
