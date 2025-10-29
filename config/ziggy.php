<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Ziggy
    |--------------------------------------------------------------------------
    |
    | Generate a Blade directive and JavaScript route helper that you can use
    | in your JavaScript or TypeScript files without worrying about relative
    | paths and no need to maintain route lists in JavaScript.
    |
    | https://github.com/tighten/ziggy
    |
    */

    'url' => env('APP_URL', 'http://localhost'),

    'group' => env('ZIGGY_GROUP', null),

    'except' => [
        // 'routes.to.exclude'
    ],

    'skip-route-model-binding' => false,

];
