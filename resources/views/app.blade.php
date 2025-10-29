<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    @routes
    @vite(['resources/js/app.js'])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
    
    <script>
        // Debug: Check if Inertia is loaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded');
            console.log('Inertia object:', window.Inertia);
            console.log('Vue version:', window.Vue?.version);
        });
    </script>
</body>
</html>
