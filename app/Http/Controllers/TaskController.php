<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function dashboard()
    {
        try {
            $total = Task::count();
            $completed = Task::where('completed', true)->count();
            $pending = Task::where('completed', false)->count();
            $thisWeek = Task::where('created_at', '>=', now()->startOfWeek())->count();

            return Inertia::render('Dashboard', [
                'message' => '¡Bienvenido a tu aplicación Inertia.js con Vue 3!',
                'stats' => [
                    'total' => $total,
                    'completed' => $completed,
                    'pending' => $pending,
                    'thisWeek' => $thisWeek
                ]
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Dashboard', [
                'message' => 'Error al cargar el dashboard: ' . $e->getMessage(),
                'stats' => [
                    'total' => 0,
                    'completed' => 0,
                    'pending' => 0,
                    'thisWeek' => 0
                ]
            ]);
        }
    }

    public function index(Request $request)
    {
        try {
            $query = Task::query();
            
            // Handle filters
            if ($request->has('filter')) {
                switch ($request->filter) {
                    case 'today':
                        $query->whereDate('due_date', today());
                        break;
                    case 'week':
                        $query->whereBetween('due_date', [now()->startOfWeek(), now()->endOfWeek()]);
                        break;
                    case 'pending':
                        $query->where('completed', false);
                        break;
                    case 'completed':
                        $query->where('completed', true);
                        break;
                    case 'with_due_date':
                        $query->whereNotNull('due_date');
                        break;
                    case 'without_due_date':
                        $query->whereNull('due_date');
                        break;
                    // 'all' and default case - no additional filtering needed
                }
            }
            
            // Handle search
            if ($request->has('search') && !empty($request->search)) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            }
            
            $tasks = $query->latest()->get();
            
            return Inertia::render('Tasks/Index', [
                'tasks' => $tasks,
                'filters' => [
                    'filter' => $request->filter ?? 'all',
                    'search' => $request->search ?? ''
                ],
                'message' => 'Tareas cargadas correctamente'
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Tasks/Index', [
                'tasks' => [],
                'error' => 'Error al cargar las tareas: ' . $e->getMessage()
            ]);
        }
    }

    public function create()
    {
        return Inertia::render('Tasks/Create', [
            'message' => 'Formulario para crear nueva tarea'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
            'due_date' => 'nullable|date'  // Añadido
        ]);

        try {
            $task = Task::create($validated);
            return redirect()->route('tasks.index')->with('success', 'Tarea creada exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al crear la tarea: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
            'due_date' => 'nullable|date'  // Añadido
        ]);

        try {
            $task->update($validated);
            return redirect()->route('tasks.index')->with('success', 'Tarea actualizada exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al actualizar la tarea: ' . $e->getMessage());
        }
    }

    public function show(Task $task)
    {
        return Inertia::render('Tasks/Show', [
            'task' => $task
        ]);
    }

    public function edit(Task $task)
    {
        return Inertia::render('Tasks/Edit', [
            'task' => $task
        ]);
    }

    public function destroy(Task $task)
    {
        try {
            $task->delete();
            return redirect()->route('tasks.index')->with('success', 'Tarea eliminada exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al eliminar la tarea: ' . $e->getMessage());
        }
    }

    public function toggle(Request $request, Task $task)
    {
        try {
            $task->update(['completed' => !$task->completed]);

            $message = $task->completed
                ? 'Tarea marcada como completada'
                : 'Tarea marcada como pendiente';

            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al actualizar la tarea: ' . $e->getMessage());
        }
    }
}
