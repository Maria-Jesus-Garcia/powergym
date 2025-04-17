<?php

namespace App\Http\Controllers\Api;

use App\Models\Entrenamiento;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EntrenamientoController extends Controller
{
    //Listar entrenamientos
    public function index(){
        $entrenamientos= Entrenamiento::all();
        return response()->json($entrenamientos, 200);
    }
    //Mostrar un entrenemaiento en específico
    public function show($id){ 

        $entrenamiento= Entrenamiento::find($id);

        if(!$entrenamiento){
            return response()->json(['error'=> 'Entrenamiento no encontrado'], 404);
        }
        return response()->json($entrenamiento, 200);
    
    }

    //Crear un nuevo entrenamiento
    public function store(Request $request){
        $request->validate([
            'nombre'=> 'required|string|max:255',
            'user_id'=> 'required|exists:users,id',
            'series'=> 'required|integer',
            'repeticiones'=> 'required|integer',
            'date'=> 'required|date',
        ]);
        $entrenamiento= Entrenamiento::create($request->all());
        return response()->json($entrenamiento, 201);
    }

    //Actualizar un entrenamiento

    public function update(Request $request, $id){
        $entrenamiento=Entrenamiento::find($id);

        if(!$entrenamiento){
            return response()->json(['error'=> 'Entrenamiento no encontrado']);
        }

        $request->validate([
            'nombre'=> 'sometimes|required|string|max:255',
            'series'=> 'sometimes|required|integer',
            'repeticiones'=> 'sometimes|required|integer',
            'date'=> 'sometimes|required|date',
        ]);
        //solo se actualiza los campos que se pasen
        $entrenamiento->update($request->all());
        return response()->json($entrenamiento, 200);
    }

    //Eliminar un entrenamiento
    public function delete($id){
        $entrenamiento =Entrenamiento::find($id);

        if(!$entrenamiento){
            return response()->json(['error'=> 'Entrenamiento no encontrado'], 404);
        }

        $entrenamiento->delete();
        return response()->json(['message'=>'Entrenamiento eliminado'], 200);
    }



}
