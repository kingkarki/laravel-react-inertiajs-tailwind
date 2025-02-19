<?php

namespace App\Http\Controllers;

use App\Models\GeneratedTeam;
use App\Models\GeneratedTeamPlayer;
use App\Models\Generator;
use App\Models\Player;
use App\Models\Team;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;



class GeneratorController extends Controller
{

    /**
     *  Generated list detail 
     */

    public function generated_list($slug)
    {

        $event = Generator::with(['teams.players.player', 'teams.team'])->where('slug', $slug)->first();
        if ($event == null) {
            // return redirect()->route('generator.index');
        }
        if ($event) {
            return Inertia::render('Generator/GeneratedList', [
                'event' => $event,

            ]);
        }
    }
    /**
     * Display a listing of the resource.
     */



    public function index()
    {
        $list = Generator::latest()->get();


        return Inertia::render('Generator/GeneratorList', [
            'list' => $list
        ]);
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Generator/GeneratorFormWrapper', []);
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required'],
        ]);

        $generator = new Generator();
        $generator->name = $request->name;
        $generator->slug =  Str::slug($request->name . '-' . now());
        $generator->save();
        $id = $generator->id;
        $teamAssignments = $this->distributePlayersToTeams();
        $analysis = $this->analyzeDistribution($teamAssignments, $id);

        return Redirect("generated/" . $generator->slug)->with('message', 'Teams generated successfully.');
    }





    public function generate_($name)
    {
        // Step 1: Get all players and order them by skill level
        $players = Player::orderBy('skill')->get();
        // debug($players->toArray(), true);

        // Step 2: Get all the teams
        $teams = Team::all();
        $teamCount = $teams->count();
        // debug($teamCount);
        // exit;
        // Check if there are enough teams (4 teams required)
        if ($teamCount < 4) {
            return response()->json(['message' => 'Not enough teams available.'], 400);
        }

        $groupedPlayers = [
            1 => $players->where('skill', 1),
            2 => $players->where('skill', 2),
            3 => $players->where('skill', 3),
            4 => $players->where('skill', 4),
            5 => $players->where('skill', 5),
        ];

        $teamIndex = 0;
        foreach ($groupedPlayers as $skillLevel => $playersAtSkillLevel) {
            foreach ($playersAtSkillLevel as $player) {
                // Assign player to the current team
                $player->team_id = $teams[$teamIndex]->id;
                // $player->save();

                // Move to the next team
                $teamIndex = ($teamIndex + 1) % $teamCount; // Cycle through teams
            }
        }
    }

    public function generate()
    {

        $generator = new Generator();
        $generator->name = 'testing';
        $generator->slug = 'testing';
        $generator->save();
        $id = $generator->id;



        $teamAssignments = $this->distributePlayersToTeams();
        $analysis = $this->analyzeDistribution($teamAssignments, $id);
    }

    public function distributePlayersToTeams(): array
    {
        // Get all players sorted by skill
        $players = Player::orderByDesc('skill')->get();
        $teams = Team::all();

        // Initialize team assignments and skills
        $teamAssignments = [];
        $teamSkills = [];

        foreach ($teams as $team) {
            $teamAssignments[$team->id] = [];
            $teamSkills[$team->id] = 0;
        }

        // Distribute players
        foreach ($players as $player) {
            $teamId = array_keys($teamSkills, min($teamSkills))[0];
            $teamAssignments[$teamId][] = $player;
            $teamSkills[$teamId] += $player->skill;
        }

        return $teamAssignments;
    }

    public function analyzeDistribution(array $teamAssignments, $generated_id): Collection
    {
        $analysis = collect();

        foreach ($teamAssignments as $teamId => $players) {
            $team = Team::find($teamId);
            $totalSkill = collect($players)->sum('skill');
            $playerCount = count($players);

            $skillDistribution = collect($players)
                ->groupBy('skill')
                ->map->count();

            $analysis->put($team->name, [
                'total_skill' => $totalSkill,
                'avg_skill' => $playerCount > 0 ? round($totalSkill / $playerCount, 2) : 0,
                'player_count' => $playerCount,
                'skill_distribution' => $skillDistribution,
                'players' => collect($players)
            ]);

            $generatedTeam = new GeneratedTeam();

            $generatedTeam->generated_id = $generated_id;
            $generatedTeam->team_id = $team->id;
            $generatedTeam->avg_skill =  $playerCount > 0 ? round($totalSkill / $playerCount, 2) : 0;
            $generatedTeam->total_skills = $totalSkill;
            $generatedTeam->player_count =  $playerCount;
            $generatedTeam->skill_distribution = json_encode($skillDistribution);
            $generatedTeam->save();
            foreach ($players as $player) {
                $generatedTeamPlayer = new GeneratedTeamPlayer();
                $generatedTeamPlayer->generated_team_id = $generatedTeam->id;
                $generatedTeamPlayer->player_id = $player->id;
                $generatedTeamPlayer->player_name = $player->name;
                $generatedTeamPlayer->save();
            }
        }

        return $analysis;
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $generators =   Generator::with(['teams.players.player', 'teams.team'])
            ->where('id', $id)
            ->first();

        // debug($generators->toArray());
        if ($generators) {
            $generators->teams->each(function ($team) {
                $team->players->each(function ($player) {


                    $player->delete();
                });
                $team->delete();
            });
            $generators->delete();
        }
    }
}
