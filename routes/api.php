<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GeneralController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EntrenamientoController;


Route::prefix('v1')->group(function() {
    //::PUBLIC
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post ('/auth/login', [AuthController::class, 'login']);

    //::PRIVATE
    Route::group(['middleware'=> 'auth:sanctum'], function(){
        //::auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        //ver usuario autenticado.... tengo que ver si me compensa dejarlo o no
        Route::get('/user', function (Request $request){
            return $request->user();
        });

        //::usuarios
        Route::get ('/users', [UserController::class, 'index']);
        Route::get ('/users/{id}', [UserController::class, 'show']);
        //Route::post('/users', [UserController::class, 'store']); ya tenemos 'register'
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'delete']);

        //::entrenamiento
        Route::get('/entrenamientos', [EntrenamientoController::class, 'index']);
        Route::get('/entrenamientos/{id}', [EntrenamientoController::class, 'show']);
        Route::post('/entrenamientos', [EntrenamientoController::class, 'store']);
        Route::put('/entrenamiento/{id}', [EntrenamientoController::class, 'update']);
        Route::delete('/entrenamiento/{id}', [EntrenamientoController::class, 'delete']);


        //::ejercicios
        //Route::get('')


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
