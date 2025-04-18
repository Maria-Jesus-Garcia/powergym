<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('entrenamiento_ejercicio', function (Blueprint $table) {
            $table->integer('series')->after('ejercicio_id'); //agrego columna series
            $table->integer('repeticiones')->after('series'); //agrego columna repeticiones
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entrenamiento_ejercicio', function (Blueprint $table) {
            $table->dropColumn(['series', 'repeticiones']);
            //elimina las columnas si es necesario
        });
    }
};
