<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Entrenamiento extends Model
{
    use HasFactory;
    protected $guarded = [];
   

    public function ejercicio()
    {
        return $this->belongsToMany(Ejercicio::class); // belongsToMany establece relacion de muchos a muchos
    }
    public function user()
    {
        return $this->belongsTo (User::class); //belongTo, relacion de muchos a uno
    }
}
