<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Team;


class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Team::create(['name' => 'Team Surkhet']);
        Team::create(['name' => 'Team Kathmandu']);
        Team::create(['name' => 'Team Janakpur']);
        Team::create(['name' => 'Team Pokhara']);
    }
}
