<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('news_items')) {
            return;
        }

        Schema::table('news_items', function (Blueprint $table): void {
            if (!Schema::hasColumn('news_items', 'estado')) {
                $table->string('estado')->default('publicada');
            }
            if (!Schema::hasColumn('news_items', 'destaque_principal')) {
                $table->boolean('destaque_principal')->default(false);
            }
            if (!Schema::hasColumn('news_items', 'imagem')) {
                $table->string('imagem')->nullable();
            }
            if (!Schema::hasColumn('news_items', 'video_url')) {
                $table->string('video_url')->nullable();
            }
            if (!Schema::hasColumn('news_items', 'alt')) {
                $table->string('alt')->nullable();
            }
        });
    }

    public function down(): void
    {
        // sem rollback destrutivo
    }
};
