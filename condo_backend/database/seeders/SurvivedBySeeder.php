<?php

namespace Database\Seeders;

use App\Models\SurvivedBy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SurvivedBySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SurvivedBy::factory(1000)->create();
    }
}
