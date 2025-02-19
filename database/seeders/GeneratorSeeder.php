<?php

namespace Database\Seeders;

use App\Models\Generator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GeneratorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Generator::create(['name' => 'Friday Futsal', 'slug' => 'Friday Futsal']);
        Generator::create(['name' => 'Women Futsal', 'slug' => 'Women Futsal']);
        Generator::create(['name' => 'Everest Premiure League', 'slug' => 'Everest Premiure League']);
        Generator::create(['name' => 'Kathmandu Turnament', 'slug' => 'Kathmandu Turnament']);
    }
}
