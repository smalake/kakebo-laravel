<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use \Symfony\Component\HttpFoundation\Response;
use Error;

class DisplayNameController extends Controller
{
    // 表示名を取得
    public function get(Request $request)
    {
        try {
            $uid = $request->input('uid');
            $data = User::where('uid', $uid)->first();

            $json = [
                'data' => array('name' => $data->name),
                'message' => 'DisplayName Get success!',
                'error' => ''
            ];
            return response()->json($json, Response::HTTP_OK);
        } catch (Error $e) {
            $json = [
                'message' => 'Failed Get to DisplayName',
                'error' => $e->getMessage()
            ];
            return response()->json($json, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // 表示名を更新
    public function update(Request $request)
    {
        try {
            $uid = $request->input('uid');
            User::where('uid', $uid)->update([
                'name' => $request->name
            ]);

            $json = [
                'message' => 'DisplayName Update success!',
                'error' => ''
            ];
            return response()->json($json, Response::HTTP_OK);
        } catch (Error $e) {
            $json = [
                'message' => 'Failed Update to DisplayName',
                'error' => $e->getMessage()
            ];
            return response()->json($json, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
