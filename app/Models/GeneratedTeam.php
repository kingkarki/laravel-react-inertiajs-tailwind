<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneratedTeam extends Model
{

    public function players()
    {
        return  $this->hasMany(GeneratedTeamPlayer::class, 'generated_team_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
    //
}
