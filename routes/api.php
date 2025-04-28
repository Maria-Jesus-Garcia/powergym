<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GeneralController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EntrenamientoController;
use App\Http\Controllers\Api\EjercicioController;
use App\Http\Controllers\ProgresoController;


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
        Route::put('/entrenamientos/{id}', [EntrenamientoController::class, 'update']);
        Route::delete('/entrenamientos/{id}', [EntrenamientoController::class, 'delete']);
        // añadido despues
        Route::post('/entrenamientos', [EntrenamientoController::class, 'store']);
        Route::post('/entrenamientos/{entrenamiento}/ejercicios',
        [EntrenamientoController::class, 'agregarEjercicio']);

        //::ejercicios
        Route::get('/ejercicios', [EjercicioController::class, 'index']);
        Route::get('/ejercicios/{id}', [EjercicioController::class, 'show']);
        Route::post('/ejercicios', [EjercicioController::class, 'store']);
        Route::put('/ejercicios/{id}', [EjercicioController::class, 'update']);
        Route::delete('/ejercicios/{id}', [EjercicioController::class, 'delete']);

        //tabla pivote
        Route::put('/entrenamientos/{id}/sync-ejercicios', [EntrenamientoController::class, 'syncEjercicios']);
        Route::get('/entrenamientos/{id}/ejercicios', [EntrenamientoController::class, 'getEjercicios']);
        //::progresos
        Route::get('/progresos',[ProgresoController::class, 'index']);
        Route::get('/progresos/{id}',[ProgresoController::class, 'show']);
        Route::post('/progresos', [ProgresoController::class, 'store']);
        Route::put('/progresos/{id}', [ProgresoController::class, 'update']);
        Route::delete('/progresos/{id}', [ProgresoController::class, 'delete']);


    });



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
