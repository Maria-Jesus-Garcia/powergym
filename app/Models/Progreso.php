<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Progreso extends Model
{
    use HasFactory;

    protected $fillable= [
        'user_id',
        'peso_actual',
        'peso_objetivo',
        'edad',
        'fecha'
    ];

    public function user(){
        return $this->belongsTo(User::class); //un progreso pertenece a un usuario
    }
}
