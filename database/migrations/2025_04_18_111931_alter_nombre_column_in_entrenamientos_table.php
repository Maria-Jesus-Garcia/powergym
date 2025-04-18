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
        Schema::table('entrenamientos', function (Blueprint $table) {
            //cambio tamaño de la columnas 'nombre'
            $table->string('nombre', 255)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entrenamientos', function (Blueprint $table) {
            //revierte el cambio
            $table->string('nombre', 100)->change();
        });
    }
};
