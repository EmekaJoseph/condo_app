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
        Schema::create('deceaseds', function (Blueprint $table) {
            $table->string('id')->unique();
            $table->string('admin_id');
            $table->string('deceased');
            $table->dateTime('birth_date')->nullable();
            $table->dateTime('death_date')->nullable();
            $table->integer('age')->virtualAs("YEAR(death_date) - YEAR(birth_date)")->nullable();
            $table->string('display_photo')->nullable();
            $table->string('background_song')->nullable();
            $table->text('biography')->nullable();
            $table->text('life_history')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deceaseds');
    }
};
