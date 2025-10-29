<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProductController;

Route::get('/', [TaskController::class, 'dashboard'])->name('dashboard');

Route::resource('tasks', TaskController::class);
Route::patch('tasks/{task}/toggle', [TaskController::class, 'toggle'])->name('tasks.toggle');
Route::resource('products', ProductController::class);
