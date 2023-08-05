<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;
use Kreait\Firebase\Contract\Auth;
use \Symfony\Component\HttpFoundation\Response;

class Firebase
{
    private Auth $auth;
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // $auth = app('firebase.auth');
        // $token = $request->bearerToken();
        $idTokenString = $request->header('Authorization');
        $token = str_replace('Bearer ', '', $idTokenString);
        try {
            $verifiedIdToken = $this->auth->verifyIdToken($token);
            $uid = $verifiedIdToken->claims()->get('sub');
            $request->merge(['uid' => $uid]);
            return $next($request);
        } catch (FailedToVerifyToken $e) {
            LOG::debug('【TOKEN ERROR】' . $e->getMessage());
            $json = [
                'message' => $e->getMessage(),
                'error' => 'token error'
            ];
            return response()->json($json, Response::HTTP_UNAUTHORIZED);
        } catch (Exception $e) {
            LOG::debug('【ERROR】' . $e->getMessage());
            return response('error', 500);
        }

        //     $request->merge(['uid' => $uid]);
        //     return $next($request);
        // } catch (FailedToVerifyToken $e) {
        //     LOG::debug('【ERROR】' . $e->getMessage());
        //     $request->merge(['err' => "FailedToVerifyToken"]);
        //     return $next($request);
        // } catch (ExceptionToken $e) {
        //     return $e->getMessage();
        // }
    }
}
