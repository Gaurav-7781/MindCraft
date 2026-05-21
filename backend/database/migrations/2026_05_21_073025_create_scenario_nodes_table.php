<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scenario_nodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scenario_id')->constrained()->onDelete('cascade');
            $table->string('character_name')->nullable();
            $table->text('text');
            $table->boolean('is_end')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scenario_nodes');
    }
};
