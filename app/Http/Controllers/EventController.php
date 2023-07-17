<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EventController extends Controller
{
    public function create(Request $request)
    {
        $amount1 = $request->amount1;
        $amount2 = $request->amount2;
        $category1 = $request->category1;
        $category2 = $request->category2;
        $store_name = $request->storeName;
        $date = $request->date;
    }
}
