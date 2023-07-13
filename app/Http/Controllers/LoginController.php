<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class LoginController extends Controller
{
    public function login(Request $request)
    {
        //バリデーション
        $credentials = $request->validate([
            'uid' => ['required']
        ]);

        // UIDがDBに登録されているか確認
        $user = User::where('uid', $request->uid)->first();
        Log::debug('【テスト】uid = ' . $user);

        if (empty($user)) {
            // ユーザがDBに登録されていなかった場合
            return response()->json([], 401);
        } else {
            // ユーザがDBに登録されていた場合
            return response()->json([], 200);
        }
    }
}
