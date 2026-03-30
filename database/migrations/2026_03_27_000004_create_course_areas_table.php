<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('course_areas', function (Blueprint $table): void {
            $table->id();
            $table->string('nome');
            $table->text('descricao')->nullable();
            $table->string('cor')->default('#003072');
            $table->string('icone')->default('fa-graduation-cap');
            $table->string('classe_botao')->default('botao-azul');
            $table->string('slug')->nullable()->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_areas');
    }
};
