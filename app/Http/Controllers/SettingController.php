<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Group;
use Error;
use \Symfony\Component\HttpFoundation\Response;

class SettingController extends Controller
{
    // グループの親かどうかチェック
    public function check_parent(Request $request)
    {
        try {
            // UIDからグループIDを取得
            $uid = $request->input('uid');
            $data = User::where('uid', $uid)->first();

            $group = Group::where('id', $data['group_id'])->first();
            if ($group['manage_uid'] == $uid) {
                $result = true;
            } else {
                $result = false;
            }
            $json = [
                'data' => $result,
                'message' => 'Parent Check success',
                'error' => ''
            ];
            return response()->json($json, Response::HTTP_OK);
        } catch (Error $e) {
            $json = [
                'message' => 'Failed to Check Parent',
                'error' => $e->getMessage()
            ];
            return response()->json($json, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
