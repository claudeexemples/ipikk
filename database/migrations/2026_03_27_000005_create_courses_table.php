<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('area_id')->nullable()->constrained('course_areas')->nullOnDelete();
            $table->string('nome');
            $table->string('duracao')->nullable();
            $table->unsignedInteger('vagas')->default(0);
            $table->string('estado')->default('ativo');
            $table->string('descricao_curta')->nullable();
            $table->longText('descricao_longa')->nullable();
            $table->string('icone')->default('fa-graduation-cap');
            $table->boolean('destaque')->default(false);
            $table->text('objetivo')->nullable();
            $table->text('competencias')->nullable();
            $table->string('certificacao')->nullable();
            $table->string('slug')->nullable()->unique();
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
