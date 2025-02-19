<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Generator extends Model
{
    protected $table = "generator";
    //

    public function teams()
    {
        return  $this->hasMany(GeneratedTeam::class, 'generated_id');
    }
}
