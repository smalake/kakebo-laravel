<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\Group;
use \Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Error;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    // ユーザの新規登録
    public function register(RegisterRequest $request)
    {
        try {
            DB::beginTransaction();
            $group = Group::create([
                'manage_uid' => $request->uid,
            ]);
            $user = User::create([
                'uid' => $request->uid,
                'group_id' => $group->id,
                'name' => $request->name,
                'type' => $request->type,
            ]);
            DB::commit();

            //ユーザの作成が完了するとjsonを返す
            $json = [
                'data' => $user,
                'message' => 'User registration success!',
                'error' => ''
            ];
            return response()->json($json, Response::HTTP_OK);
        } catch (Error $e) {
            DB::rollBack();
            $json = [
                'message' => 'Failed Insert to Event',
                'error' => $e->getMessage()
            ];
            return response()->json($json, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // グループへの参加ユーザの新規登録
    public function join_register(RegisterRequest $request)
    {
        $user = User::create([
            'uid' => $request->uid,
            'group_id' => decrypt($request->group),
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
