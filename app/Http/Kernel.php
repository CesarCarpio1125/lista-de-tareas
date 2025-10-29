protected $middlewareGroups = [
    'web' => [
        // ...
        \Illuminate\Session\Middleware\StartSession::class,
        \App\Http\Middleware\HandleInertiaRequests::class,
        // ...
    ],
];
