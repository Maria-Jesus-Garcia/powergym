<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){ //listar los usuarios
        $data= User::all();
        return response()->json($data, 200);
    }
    public function show($id){//mostrar un usuario en concreto
        $data= User::find($id);
        return response()->json($data, 200);
    }
    public function update(Request $request, $id){  //modificar datos
        $data=User::find($id);
        $data->fill($request->all());
        $data->save();
        return response()->json($data, 200);
    }
    public function delete($id){
        $data=User::find($id);

        if(!$data){
            return response()->json(['message'=> 'Usuario no encontrado'], 404);
        }
        $data->delete();
        return response()->json(['message'=>'Usuario eliminado'], 200);

    }
}
