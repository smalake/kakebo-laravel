<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Firebase
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $auth = app('firebase.auth');
        try {
            $verifiedIdToken = $auth->verifyIdToken($request);
        } catch (\InvalidArgumentException $e) {
            return $e->getMessage();
        } catch (InvalidToken $e) {
            return $e->getMessage();
        }
        return $next($request);
    }
}
