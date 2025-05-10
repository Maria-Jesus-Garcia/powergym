<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GeneralController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EntrenamientoController;
use App\Http\Controllers\Api\EjercicioController;
use App\Http\Controllers\ProgresoController;
use App\Models\Entrenamiento;
use Illuminate\Support\Facades\Log;



Route::prefix('v1')->group(function() {
    Log::info('🧪 Laravel está cargando api.php');
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
        Route::post('/entrenamientos/{entrenamiento}/ejercicios', [EntrenamientoController::class, 'agregarEjercicio']);
        Route::post('/entrenamientos/user/{id}/asignar', [EntrenamientoController::class, 'asignarAUsuario']);
        Route::get('/entrenamientos/user/asignado', [EntrenamientoController::class, 'entrenamientoAsignadoUsuario']);
        

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
    
    Route::get('/v1/test-log', function () {
        Log::info('✅ Entró a /v1/test-log');
        return response()->json(['ok' => true]);
    });

});

