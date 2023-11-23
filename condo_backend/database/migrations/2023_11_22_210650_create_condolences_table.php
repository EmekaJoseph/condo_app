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
        Schema::create('condolences', function (Blueprint $table) {
            $table->string('id')->unique();
            $table->string('deceased_id');
            $table->string('condo_name')->default('anonymous');
            $table->string('relationship')->nullable();
            $table->text('condolence');
            $table->string('email')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('condolences');
    }
};
