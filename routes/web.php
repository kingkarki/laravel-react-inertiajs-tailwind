<?php

use App\Http\Controllers\GeneratorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TeamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::get('/', function () {
    return redirect()->route('dashboard');
});


Route::get('/dashboard', function () {
    $user = Auth::user();



    return Inertia::render('Dashboard', [
        'user' => $user
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('/players')->group(function () {
        Route::get('/', [PlayerController::class, 'list'])->name('players.list');
        Route::get('/add', [PlayerController::class, 'add'])->name('players.add');
        Route::post('/save', [PlayerController::class, 'save'])->name('players.save');
        Route::post('/rate', [PlayerController::class, 'rate_player'])->name('players.rate');
        Route::get('/edit/{player_id}', [PlayerController::class, 'edit'])->name('players.edit');
        Route::post('/update/{player_id}', [PlayerController::class, 'update'])->name('players.update');
        Route::get('/update/{player_id}', [PlayerController::class, 'update'])->name('players.update');
        Route::post('/delete/{player_id}', [PlayerController::class, 'delete'])->name('players.delete');
    });

    Route::resource('team', TeamController::class);

    Route::resource('generator', GeneratorController::class);
    Route::get('generator/generate/{name}', [GeneratorController::class, 'generate']);
    // Route::get('generator/test/test', [GeneratorController::class, 'test']);
    Route::get('generated/{slug}', [GeneratorController::class, 'generated_list'])->name('generated');
});


Route::get('generated/{slug}', [GeneratorController::class, 'generated_list'])->name('generated');
require __DIR__ . '/auth.php';
