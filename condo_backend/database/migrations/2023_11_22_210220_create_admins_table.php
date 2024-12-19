<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->string('id')->unique();
            $table->string('email');
            $table->string('name')->nullable();
            $table->string('password');
            $table->dateTime('email_verified_at')->nullable();
            $table->string('phone')->nullable();
            $table->string('code')->nullable();
            $table->string('status')->nullable();
            $table->integer('level')->default(2);
            $table->integer('deceased_uploads')->default(0);
            // $table->integer('deceased_uploads')->virtualAs("DB::raw('SELECT COUNT(*) FROM deceaseds WHERE admin_id = admins.id')");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
