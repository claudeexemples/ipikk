<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsItem extends Model
{
    protected $fillable = [
        'categoria',
        'titulo',
        'resumo',
        'descricao',
        'midia',
        'tipo',
        'data_publicacao',
        'autor',
        'visualizacoes',
        'tags',
        'estado',
        'destaque_principal',
        'imagem',
        'video_url',
        'alt',
    ];

    protected $casts = [
        'tags' => 'array',
        'data_publicacao' => 'datetime',
        'destaque_principal' => 'boolean',
    ];
}
