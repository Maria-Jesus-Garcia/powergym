<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ejercicio extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps= false;

    public function entrenamientos()
    {
        return $this->belongsToMany(Entrenamiento::class);
    }
}
