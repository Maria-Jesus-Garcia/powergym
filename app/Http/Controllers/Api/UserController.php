<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $data= User::all();
        return response()->json($data, 200);
    }
    public function show($id){
        $data= User::find($id);
        return response()->json($data, 200);
    }
    public function update(Request $request, $id){
        $data=User::find($id);
        $data->fill($request->all());
        $data->save();
        return response()->json($data, 200);
    }
}
