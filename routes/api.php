<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GeneralController;
use App\Http\Controllers\Api\AuthController;


Route::prefix('v1')->group(function() {
    //::PUBLIC
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post ('/auth/login', [AuthController::class, 'login']);

    //::PRIVATE
    Route::group(['middleware'=> 'auth:sanctum'], function(){
        //::auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        //ver usuario autenticado
        Route::get('/user', function (Request $request){
            return $request->user();
        });


    });


/*
    // Rutas públicas
    Route::post('/auth/register', function(Request $request) {
        return response()->json(['message' => 'Registro correcto']);
    });
*/
    // Otras rutas públicas o privadas que quieras agregar
});


/*Route::prefix('v1')->group(function(){

    /////// PUBLIC
         //::public
    Route::get('/public/ejercicios', [GeneralController::class, 'listarEjercicios']);
    Route::get('/public/ejercicio/{slug}', [GeneralController::class, 'ejercicio']);
    Route::get('/public/entrenamientos', [GeneralController::class, 'listarEntrenamientos']);
    Route::get('/public/entrenamientos/{slug}', [GeneralController::class, 'entrenamiento']);

           //::auth 
           */
    //Route::post('/auth/register', [AuthController::class, 'register']);
     /*
    Route::post('/auth/login', [AuthController::class, 'login']);
           //crear recursos
    Route::post('/auth/entrenamiento{id}', [AuthController::class, 'crearEntreno']);
         //modificar recursos
    Route::put('/auth/entrenamiento{id}', [AuthController::class], 'modificarEntreno');
          //Eliminar recurso


    /////// PRIVATE

    Route::group(['middleware'=> 'auth:sanctum'], function(){
        //::auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);


    });

});*/



/*

//Rutas de la API.
Route::middleware('auth:sanctm')->get('/user', function (Request $request) {
    return $request->user();
});*/





/*Route::get('/lista_usuarios', [ListaUsuarioController::class, 'index']);
Route::get('/lista_usuarios/{id}', [ListaUsuarioController::class, 'show']);
Route::post('/lista_usuarios', [ListaUsuarioController::class, 'almacenar'] );

Route::put('/lista_usuarios/{id}', [ListaUsuarioController::class,
'actualizar']);
Route::patch('/lista_usuarios/{id}', [ListaUsuarioController::class,
'actualizarParcialmente']);
Route::delete('/lista_usuarios/{id}', [ListaUsuarioController::class,
'eliminar']);
Route::post('register', [AuthController::class, 'register']); //Registro
usuario
Route::post('login', [AuthController::class, 'login']); //Inicio de sesión
Route::post('logout', [AuthController::class, 'logout']); //cerrar sesión */
