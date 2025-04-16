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
        Schema::create('entrenamientos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 25);
            $table->foreignId('user_id')->constrained()->onUpdate('cascade')->onDelete('cascade');  // Relación con la tabla de usuarios
            $table->integer('series');
            $table->integer('repeticiones');
            $table->boolean('completed')->default(false);  // Estado del entrenamiento (completado o no)
            $table->date('date');  // Fecha del entrenamiento
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entrenamientos');
    }
};
