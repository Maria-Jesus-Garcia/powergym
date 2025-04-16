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
        Schema::create('ejercicios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 25);
            $table->foreignId('entrenamiento_id')->constrained()->onUpdate('cascade')->onDelete('cascade');  // Relación con la tabla de entrenamientos
            $table->text('descripcion')->nullable();
            $table->string('grupo_muscular', 25);
            $table->string('tipo', 25); //peso libre, maquina, poleas
            $table->string('urlfoto', 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ejercicios');
    }
};
