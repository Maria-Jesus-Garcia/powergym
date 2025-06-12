<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;




class AuthController extends Controller
{
    public function register(Request $request){
        
        
        Log::debug('Request Data: ', $request->all());

        

        $validator= Validator::make($request->all(), [
            'nombre'=>'required|string|max:255',
            'email'=>'required|email|unique:users,email',
            'edad'=>'nullable|integer',
            'peso_actual'=>'nullable|numeric',
            'peso_objetivo'=>'nullable|numeric',
            'contraseña'=>'required|string|min:6|confirmed',

        ]);

         // Si la validación falla, devolver un error con los detalles
         if ($validator->fails()) {
            $response= ["error"=>$validator->errors()];
            return response()->json($response, 200);
        }
        $input =$request->all();
       

        // Crear el nuevo usuario
        $user = User::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'edad' => $request->edad,
            'peso_actual' => $request->peso_actual,
            'peso_objetivo' => $request->peso_objetivo,
            'contraseña' => Hash::make($request->contraseña), // Encripta la contraseña
        ]);

        return response()->json(['message' => 'El usuario ha sido registrado con éxito'], 201);       
    }
    

    public function login(Request $request){

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'contraseña' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()], 422);
        }

    
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->contraseña, $user->contraseña)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        $token = $user->createToken('token_acceso')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    
    }


    public function logout(Request $request){
        //Elimina el token actual del usuario ya autenticado
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message'=> 'Sesión cerrada'
        ]);
    }
    

    
     
        






}