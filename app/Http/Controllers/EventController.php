<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
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
                'store_name' => $request->storeName,
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

    // 全イベントを取得
    public function get_all(Request $request)
    {
        try {
            // UIDからグループIDを取得
            $uid = $request->input('uid');
            $data = User::where('uid', $uid)->first();

            $data = Event::where('group_id', $data['group_id'])->get();
            // 取得したイベントを日付毎にグルーピング
            $results = array();
            foreach ($data as $item) {
                $carbonDate = Carbon::parse($item->date);
                $carbonCreated = Carbon::parse($item->created_at);
                $carbonUpdated = Carbon::parse($item->updated_at);
                $result = array(
                    'amount' => $item->amount,
                    'category' => $item->category,
                    'storeName' => $item->store_name,
                    'date' => $item->date,
                    'createUser' => $item->create_user,
                    'updateUser' => $item->update_user,
                    'createdAt' => $carbonCreated->format('Y-m-d H:m:s'),
                    'updatedAt' => $carbonUpdated->format('Y-m-d H:m:s'),
                );
                if (isset($results[$carbonDate->format('Y-m-d')])) {
                    array_push($results[$carbonDate->format('Y-m-d')], $result);
                } else {
                    $results[$carbonDate->format('Y-m-d')][0] = $result;
                }
            }
            $json = [
                'data' => $results,
                'message' => 'All Event Get success!',
                'error' => ''
            ];
            return response()->json($json, Response::HTTP_OK);
        } catch (Error $e) {
            $json = [
                'message' => 'Failed Get to Event',
                'error' => $e->getMessage()
            ];
            return response()->json($json, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // 全イベントを取得
    public function get_one(Request $request, $id)
    {
    }
}
