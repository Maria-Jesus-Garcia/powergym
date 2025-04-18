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
        Schema::table('entrenamientos', function (Blueprint $table){

        
        //renombro
        $table->renameColumn ('user_id', 'usuario_id');
        $table->renameColumn('completed', 'completado');
        $table->renameColumn('date', 'fecha');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entrenamientos', function (Blueprint $table){
            $table->renameColumn('usuario_id', 'user_id');
            $table->renameColumn('completado', 'completed');
            $table->renameColumn('fecha', 'date');
        });
        
    }
};
