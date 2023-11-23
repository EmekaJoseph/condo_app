<?php

namespace Database\Factories;

use App\Models\Deceased;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Condolence>
 */
class CondolenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $relationships = ['Brother', 'Sister', 'Son', 'Daughter', 'Friend'];
        return [
            'id' => uniqid(),
            'deceased_id' => Deceased::inRandomOrder()->first()->id,
            'condo_name' => $this->faker->name(),
            'condolence' => $this->faker->realText(100, 2),
            'relationship' => $relationships[array_rand($relationships)],
        ];
    }
}
