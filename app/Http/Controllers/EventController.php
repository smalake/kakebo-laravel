<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Symfony\Component\HttpFoundation\Response;

class EventController extends Controller
{
    // イベントの新規登録
    public function create(Request $request)
    {
        try {
            DB::beginTransaction();

            // UIDからグループIDを取得
            $uid = $request->input('uid');
            $data = User::where('uid', $uid)->first();

            Event::create([
                'amount' => $request->amount1,
                'category' => $request->category1,
                'store_name' => $request->store_name,
                'date' => $request->date,
                'create_user' => $uid,
                'update_user' => $uid,
                'group_id' => $data['group_id']
            ]);
            if ($request->amount2 != null) {
                Event::create([
                    'amount' => $request->amount2,
                    'category' => $request->category2,
                    'store_name' => $request->store_name,
                    'date' => $request->date,
                    'create_user' => $uid,
                    'update_user' => $uid,
                    'group_id' => $data['group_id']
                ]);
            }
            DB::commit();

            $json = [
                'message' => 'Event registration success!',
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

    // イベントの更新
    public function update(Request $request)
    {
        try {
            DB::transaction();

            Event::where('id', $request->id)->update([
                'category' => $request->category,
                'amount' => $request->amount,
                'store_name' => $request->storeName,
                'update_user' => $request->input('uid')
            ]);
            DB::commit();

            $json = [
                'message' => 'Event update success!',
                'error' => ''
            ];
            return response()->json($json, Response::HTTP_OK);
        } catch (Error $e) {
            DB::rollBack();
            $json = [
                'message' => 'Failed Update to Event',
                'error' => $e->getMessage()
            ];
            return response()->json($json, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
