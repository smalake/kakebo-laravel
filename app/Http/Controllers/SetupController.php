<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use \Symfony\Component\HttpFoundation\Response;
use Error;
use Illuminate\Support\Facades\DB;

class SetupController extends Controller
{
    // グループ情報を取得
    public function get(Request $request)
    {
        try {
            // UIDからグループIDを取得
            $uid = $request->input('uid');
            $data = User::where('uid', $uid)->first();

            $json = [
                'data' => $data['group_id'],
                'message' => 'Get GroupID success!',
                'error' => ''
            ];
            return response()->json($json, Response::HTTP_OK);
        } catch (Error $e) {
            $json = [
                'message' => 'Failed Get to GroupID',
                'error' => $e->getMessage()
            ];
            return response()->json($json, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // グループを作成
    public function create(Request $request)
    {
        try {
            // UID取得
            $uid = $request->input('uid');
            // グループ作成
            DB::beginTransaction();
            $group = Group::create([
                'manage_uid' => $uid,
            ]);
            // グループIDをユーザに適用
            User::where('uid', $uid)->update([
                'group_id' => $group->id,
            ]);

            $json = [
                'data' => $group->id,
                'message' => 'Create Group success!',
                'error' => ''
            ];
            return response()->json($json, Response::HTTP_OK);
        } catch (Error $e) {
            $json = [
                'message' => 'Failed Create to Group',
                'error' => $e->getMessage()
            ];
            return response()->json($json, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
