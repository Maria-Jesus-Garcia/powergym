<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ejercicio;

class EjercicioController extends Controller
{
    public function index(){
        return response()->json(Ejercicio::all(), 200);

    }

    public function show($id){
        $ejercicio= Ejercicio::find($id);
        if(!$ejercicio){
            return response()->json(['error'=> 'Ejercicio no encontrado']);
        }
        return response()->json($ejercicio, 200);
    }

    public function store(Request $request){
        $validate = $request->validate([
            'nombre'=> 'required|string|max:255',
            'descripcion'=> 'nullable|string',
            'tipo'=> 'required|string|max:50',
            'grupo_muscular'=> 'required|string',
            'urlfoto'=> 'nullable|string|max:255',
        ]);

        //crear ejercicio
        $ejercicio=Ejercicio::create($request->all());
        return response()->json($ejercicio, 201);
    }
    public function update(Request $request, $id){
        $ejercicio= Ejercicio::find($id);

        if (!$ejercicio){
            return response()->json(['error'=>'Ejercicio no encontrado'], 404);
        }
        $request->validate([
            'nombre'=> 'sometimes|required|string|max:255',
            'descripcion'=> 'nullable|string',
            'grupo_muscular'=> 'sometimes|required|string|max:50',
            'tipo'=> 'sometimes|required|string|max:50',
            'urlfoto'=> 'nullable|string|max:255',
        ]);
        $ejercicio->update($request->all());
        return response()->json($ejercicio, 200);
    }

    public function delete($id){
        $ejercicio= Ejercicio::find($id);

        if(!$ejercicio){
            return response()->json (['error'=> 'Ejercicio no encontrado'], 404);
        }
        $ejercicio->delete();
        return response()->json(['message'=>'Ejercicio eliminado'], 200);
    }
}
