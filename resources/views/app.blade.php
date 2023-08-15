<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
    <title>{{ config('app.name', 'app_name') }}</title>
    @viteReactRefresh
    @vite(['resources/ts/app.tsx', 'resources/css/app.css'])
</head>

<body>
    <div id="app"></div>
    <!-- PWA -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('./service_worker.js', {
                        scope: './'
                    })
                    .then((reg) => console.log('サービスワーカーの登録成功', reg.scope))
                    .catch((err) => console.log('サービスワーカーの登録失敗', err));
            });
        }
    </script>
</body>

</html>
