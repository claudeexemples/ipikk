<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CourseArea extends Model
{
    protected $fillable = [
        'nome',
        'descricao',
        'cor',
        'icone',
        'classe_botao',
        'slug',
    ];

    public function cursos(): HasMany
    {
        return $this->hasMany(Course::class, 'area_id');
    }
}
