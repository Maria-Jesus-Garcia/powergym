<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Models\Entrenamiento;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MiEntrenamiento;
use Illuminate\Support\Facades\Log;


class EntrenamientoController extends Controller
{
    //Listar entrenamientos
    public function index(){
        $entrenamientos= Entrenamiento::with('ejercicios')->get(); 
        return response()->json($entrenamientos, 200);
    }

    //Mostrar un entrenemaiento en específico
    public function show($id){ 

        $entrenamiento= Entrenamiento::with('ejercicios')->find($id); 

        if(!$entrenamiento){
            return response()->json(['error'=> 'Entrenamiento no encontrado'], 404);
        }
        return response()->json($entrenamiento, 200);
    }

    //Crear un nuevo entrenamiento
    public function store(Request $request){
        $validated= $request->validate([ 
            'nombre'=> 'required|string|max:255',
            'usuario_id'=> 'nullable|exists:users,id',
            'series'=> 'required|integer',
            'repeticiones'=> 'required|integer',
            'fecha'=> 'required|date',
            'ejercicios'=>'required|array', 
            'ejercicios.*.ejercicio_id'=> 'required|exists:ejercicios,id',
            'ejercicios.*.series' => 'integer|min:1', 
            'ejercicios.*.repeticiones' => 'integer|min:1' 
        ]);
        //crear el entrenamiento
        $datos = $request->only(['nombre', 'series', 'repeticiones', 'fecha']);
        if ($request->filled('usuario_id')) {
            $datos['usuario_id'] = $request->usuario_id;
        }
        $entrenamiento = Entrenamiento::create($datos);

        return response()->json($entrenamiento, 201);
    }

    //Actualizar un entrenamiento

    public function update(Request $request, $id){
        $entrenamiento=Entrenamiento::find($id);

        if(!$entrenamiento){
            return response()->json(['error'=> 'El entrenamiento no se ha encontrado']);
        }

        $request->validate([
            'nombre'=> 'sometimes|required|string|max:255',
            'series'=> 'sometimes|required|integer',
            'repeticiones'=> 'sometimes|required|integer',
            'fecha'=> 'sometimes|required|date',
            'ejercicios'=> 'array',
            'ejercicios.*'=> 'exists:ejercicios,id',
        ]);

        //solo se actualiza los campos que se pasen
        $entrenamiento->update($request->only([
            'nombre', 'series', 'repeticiones', 'fecha'

        ]));
        // Si se pasan ejercicios, actualizamos la relación
        if ($request->has('ejercicios')) {
        // Primero eliminamos la relación existente
            $entrenamiento->ejercicios()->sync($request->input('ejercicios'));
        }

        return response()->json($entrenamiento, 200);
    }

    //Eliminar un entrenamiento
    public function delete($id){
        $entrenamiento =Entrenamiento::find($id);

        if(!$entrenamiento){
            return response()->json(['error'=> 'Es entrenamiento no se ha encontrado'], 404);
        }

        $entrenamiento->delete();
        return response()->json(['message'=>'El entrenamiento se haeliminado'], 200);
    }

    public function agregarEjercicio(Request $request, Entrenamiento $entrenamiento){
        $validated = $request->validate([
            'ejercicio_id' => 'required|exists:ejercicios,id',
            'series' => 'integer',
            'repeticiones' => 'integer'
        ]);

        $entrenamiento->ejercicios()->attach($validated['ejercicio_id'], [
            'series' => $validated['series'],
            'repeticiones' => $validated['repeticiones']
        ]);

        return response()->json(['message' => 'El ejercicio se ha agregado']);
    }

    public function syncEjercicios(Request $request, $id){
        $entrenamiento = Entrenamiento::findOrFail($id);

        $data =$request->validate([
            'ejercicios' => 'required|array',
            'ejercicios.*.ejercicio_id'=> 'required|exists:ejercicios,id',
            'ejercicios.*.series' => 'required|integer|min:1',
            'ejercicios.*.repeticiones' => 'required|integer|min:1',
        ]);
        $syncData = [];
        foreach ($data['ejercicios'] as $ejercicio){
            $syncData [$ejercicio['ejercicio_id']] = [
                'series' => $ejercicio ['series'],
                'repeticiones' => $ejercicio ['repeticiones']
            ];
        }
        //sincroniza tabla pivote
        $entrenamiento ->ejercicios()->sync($syncData);
        return response()->json(['message'=> 'Ejercicios sincronizados correctamente']);
    }
    public function getEjercicios($id){
        $entrenamiento = Entrenamiento::findOrFail($id);

        return response()->json($entrenamiento->ejercicios()->withPivot('series', 'repeticiones')->get());
    }
    public function asignarAUsuario(Request $request, $id){
        $user= $request->user();
        $entrenamiento= Entrenamiento::findOrFail($id);
        
        $user->entrenamientos()->syncWithoutDetaching([$entrenamiento->id]);

        return response()->json(['message' => 'Entrenamiento asignado']);
    }
    public function entrenamientoAsignadoUsuario(Request $request)
    {
        
        $user = $request->user();
    
        
        if (!$user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        $entrenamiento = $user->entrenamientos()
            ->with(['ejercicios' => function ($query) {
                $query->withPivot(['series', 'repeticiones']);
            }])
            ->latest('entrenamiento_user.created_at')  // Hace que el método sea más limpio
            ->first();

        if (!$entrenamiento) {
            return response()->json([], 200);  // Devuelve array vacío en lugar de 404
        }

        return response()->json($entrenamiento);
    }

    
    
}
