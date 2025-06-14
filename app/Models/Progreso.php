<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progreso extends Model
{
    protected $fillable= ['usuario_id', 'peso_actual', 'fecha'];

    public function usuario(){
        return $this->belongsTo(User::class, 'usuario_id');
    }
}
