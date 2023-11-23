<?php

namespace Database\Seeders;

use App\Models\Deceased;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeceasedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Deceased::factory(1000)->create();

        // $list = Deceased::all();
        // foreach ($list as $deceased) {
        //     $age = $deceased['death_date']->diffInDays($deceased['birth_date']);
        //     $deceased->setAttribute('age', $age);
        //     $deceased->save();
        // }
    }
}
