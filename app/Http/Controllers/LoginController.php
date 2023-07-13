<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\LoginRequest;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {

        // UIDがDBに登録されているか確認
        $user = User::where('uid', $request->uid)->first();

        if (empty($user)) {
            // ユーザがDBに登録されていなかった場合
            return response()->json([], 401);
        } else {
            // ユーザがDBに登録されていた場合
            return response()->json([], 200);
        }
    }
}
