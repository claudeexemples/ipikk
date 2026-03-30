<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('news_items', function (Blueprint $table): void {
            $table->id();
            $table->string('categoria')->default('DESTAQUE');
            $table->string('titulo');
            $table->string('resumo')->nullable();
            $table->longText('descricao');
            $table->string('midia')->nullable();
            $table->string('tipo')->default('imagem');
            $table->dateTime('data_publicacao')->nullable();
            $table->string('autor')->default('IPIKK');
            $table->unsignedInteger('visualizacoes')->default(0);
            $table->json('tags')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news_items');
    }
};
