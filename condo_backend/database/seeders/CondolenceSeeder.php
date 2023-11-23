<?php

namespace Database\Seeders;

use App\Models\Condolence;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CondolenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Condolence::factory(5000)->create();
    }
}
