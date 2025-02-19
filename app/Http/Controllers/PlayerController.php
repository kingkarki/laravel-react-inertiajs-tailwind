<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PlayerController extends Controller
{


    public function list()
    {
        $players = Player::latest()->get();

        return Inertia::render('Player/List', [
            'players' => $players
        ]);
    }


    public function add()
    {
        return Inertia::render('Player/PlayerFormWrapper', [
            'data' => [],
        ]);
    }

    public function save(Request $request)
    {
        $request->validate([
            'full_name' => ['required'],
            'rating' => ['required'],
        ]);

        $player = new Player();
        $player->name = $request->full_name;
        $player->skill = $request->rating;
        $player->save();


        return Redirect('/players')->with('message', 'Player ' . $request->full_name . ' added successfully.');
    }

    public function rate_player(Request $request)
    {
        $request->validate([
            'playerId' => ['required'],
            'rating' => ['required'],
        ]);

        $player = Player::find($request->playerId);
        $player->skill = $request->rating;
        $player->save();

        return Redirect(route('players.list'))->with('message',  'Skill rating updated for user ID ' . $player->id);
    }

    public function edit(Request $request, $player_id)
    {
        $player = Player::find($player_id);

        return Inertia::render('Player/PlayerFormWrapper', [
            'player' => $player,
        ]);
    }

    public function update(Request $request, $player_id)
    {
        $player = Player::find($player_id);
        $player->name = $request->full_name;
        $player->skill = $request->rating;
        $player->save();

        return Redirect('/players')->with('message', 'Player ' . $request->full_name . ' updated successfully.');
    }


    public function delete(Request $request, $player_id)
    {
        $player = Player::find($player_id);
        if ($player) {
            $player->delete();
        }

        return Redirect(route('players.list'))->with('message',  'Player #' . $player_id . ' deleted successfully.');
    }
}
