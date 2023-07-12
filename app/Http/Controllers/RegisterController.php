<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use \Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    // ユーザの新規登録
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'uid' => $request->uid,
            'group_id' => $request->group_id,
            'name' => $request->name,
            'type' => $request->type,
        ]);

        //ユーザの作成が完了するとjsonを返す
        $json = [
            'data' => $user,
            'message' => 'User registration success!',
            'error' => ''
        ];
        return response()->json($json, Response::HTTP_OK);
    }
}
