<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    protected $fillable = [
        'area_id', 'nome', 'duracao', 'vagas', 'estado', 'descricao_curta', 'descricao_longa',
        'icone', 'destaque', 'objetivo', 'competencias', 'certificacao', 'slug', 'meta',
    ];

    protected $casts = [
        'destaque' => 'boolean',
        'meta' => 'array',
    ];

    public function area(): BelongsTo
    {
        return $this->belongsTo(CourseArea::class, 'area_id');
    }
}
