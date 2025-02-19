<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('generated_teams', function (Blueprint $table) {
            $table->id();
            $table->integer('generated_id');
            $table->integer('team_id');
            $table->integer('total_skills');
            $table->integer('avg_skill');
            $table->integer('player_count');
            $table->json('skill_distribution');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('generated_teams');
    }
};
