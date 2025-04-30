<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Entrenamiento extends Model
{
    use HasFactory;
    protected $guarded = [];
   

    public function ejercicios()
    {
        //return $this->belongsToMany(Ejercicio::class, 'entrenamiento_ejercicio'); // belongsToMany establece relacion de muchos a muchos
        return $this->belongsToMany(Ejercicio::class, 'entrenamiento_ejercicio')
                ->withPivot(['series', 'repeticiones']);
    }
    public function usuario() //antes tenia user
    {
        return $this->belongsTo (User::class, 'usuario_id'); //belongTo, relacion de muchos a uno
    }
}
