<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('gallery_items', function (Blueprint $table): void {
            $table->id();
            $table->string('tipo')->default('imagem');
            $table->string('categoria')->default('fotos-gerais');
            $table->string('legenda')->nullable();
            $table->string('url');
            $table->unsignedInteger('ordem')->default(1);
            $table->string('estado')->default('publicado');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery_items');
    }
};
