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
        Schema::table('progresos', function (Blueprint $table) {
            $table->dropColumn('peso_objetivo');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('progresos', function (Blueprint $table) {
            $table->decimal('peso_objetivo', 5, 2)->nullable();
        });
    }
};
