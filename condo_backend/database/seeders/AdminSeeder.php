<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::create([
            'id' => uniqid(),
            'email' => 'admin@demo.com',
            'password' => Hash::make('password'),
            'level' => 1
        ]);

        Admin::factory(10)->create();
    }
}
