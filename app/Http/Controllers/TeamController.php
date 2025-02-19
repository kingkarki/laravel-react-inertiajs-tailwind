<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {


        $teams =  Team::latest()->get();

        return Inertia::render('Team/TeamList', [
            'teams' => $teams
        ]);
    }

    public function create()
    {
        return Inertia::render('Team/TeamFormWrapper', [
            'data' => [],
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => ['required'],


        ], ['name' => 'Team name is required']);
        $team = new Team();
        $team->name = $request->name;
        $team->save();
        return Redirect(route('team.index'))->with('message', 'Team ' . $request->name . ' added successfully.');
    }

    public function show($id) {}

    public function edit($id, Request $request)
    {
        $team = Team::find($id);
        return Inertia::render('Team/TeamFormWrapper', [
            'team' => $team,
        ]);
    }

    public function update($id, Request $request)
    {
        $request->validate([
            'name' => ['required'],
        ]);

        $team = Team::find($id);
        $team->name = $request->name;
        $team->save();
        return Redirect(route('team.index'))->with('message', 'Team ' . $request->name . ' updated successfully.');
    }

    public function destroy($id)
    {
        $team = Team::find($id);
        if ($team) {
            $team->delete();
        }
        return Redirect(route('team.index'))->with('message', 'Team #' . $id . ' deleted successfully.');
    }
}
