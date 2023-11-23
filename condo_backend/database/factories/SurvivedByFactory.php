<?php

namespace Database\Factories;

use App\Models\Deceased;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SurvivedByFactory extends Factory
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
            'survived_by' => $this->faker->name(),
            'relationship' => $relationships[array_rand($relationships)],
            'age' => rand(1, 120),
        ];
    }
}
