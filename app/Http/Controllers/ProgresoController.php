<?php

namespace App\Http\Controllers;

use App\Models\Progreso;
use App\Models\User;
use Illuminate\Http\Request;


class ProgresoController extends Controller
{
    //Mostrar
    public function index(){
        $progresos= Progreso::all();
        return response()->json($progresos);
    }

    //mostrar progreso específico
    public function show($id){
        $usuario=User::find($id);
        if(!$usuario){
            return response()->json(['message'=> 'Usuario no encontrado'], 404);
        }
        $progresos= $usuario->progresos; //devulve los progresos del usuario en concreto
        return response()->json($progresos);
    }
    //crear registro de progreso
    public function store(Request $request){
        $request->validate([ //validamos
            //'usuario_id'=> 'required|exists:users,id',
            'peso_actual'=> 'required|numeric',
            'peso_objetivo'=> 'required|numeric',
            'fecha'=> 'required|date',
        ]);


        $progreso = Progreso::create([ //creamos
            'usuario_id'=>$request->user()->id, //'usuario_id'=>$request->usuario_id,
            'peso_actual'=> $request->peso_actual,
            'peso_objetivo'=> $request->peso_objetivo,
            'fecha'=> $request->fecha,
        ]);
        return response()->json($progreso, 201);
    }
    //Actualizar registro
    public function update(Request $request, $id){
        $progreso= Progreso::find($id);
        if(!$progreso){
            return response()->json([ 'message'=>'Progeso no encontrado'], 404);
        }
        $request->validate([
            'peso_actual'=> 'required|numeric',
            'peso_objetivo'=> 'required|numeric',
            'fecha'=> 'required|date',
        ]);
        $progreso->update([
            'peso_actual'=> $request->peso_actual,
            'peso_objetivo'=> $request->peso_objetivo,
            'fecha'=> $request->fecha,
        ]);
        return response()->json($progreso); //retorno de progreso actualizado
    }
    public function delete($id){
        $progreso= Progreso::find($id);
        if(!$progreso){
            return response()->json(['message'=> 'Progreso no encontrado'], 404);
        }
        $progreso->delete();
        return response()->json(['message'=>'Progreso eliminado con éxito']);
    }

}
