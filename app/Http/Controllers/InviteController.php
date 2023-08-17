<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Error;
use Illuminate\Support\Facades\URL;
use \Symfony\Component\HttpFoundation\Response;

class InviteController extends Controller
{
    // 招待用URLを生成
    public function generate_url(Request $request)
    {
        try {
            // UIDからグループIDを取得
            $uid = $request->input('uid');
            $data = User::where('uid', $uid)->first();
            $group = $data['group_id'];
            $encrypt_id = encrypt($group);

            // 署名付きURLの生成
            $expire = now()->addMilliseconds(600000); // 有効期限10分
            $url = URL::temporarySignedRoute('verify.url', $expire, ['group' => $encrypt_id]);
            $json = [
                'data' => $url,
                'message' => 'URL generate success!',
                'error' => ''
            ];
            return response()->json($json, Response::HTTP_OK);
        } catch (Error $e) {
            $json = [
                'message' => 'Failed generate URL',
                'error' => $e->getMessage()
            ];
            return response()->json($json, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // 招待用URLを検証
    public function verify_url(Request $request)
    {
        if (!$request->hasValidSignature()) {
            abort(403, 'Invalid signature.');
        }

        // 署名が正当な場合の処理
        $groupId = $request->query('group');

        return redirect('/join-register/' . $groupId);
    }
}
