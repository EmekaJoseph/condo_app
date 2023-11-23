<?php

namespace Database\Factories;

use App\Models\Deceased;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PhotoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => uniqid(),
            'deceased_id' => Deceased::inRandomOrder()->first()->id,
            'photo' => 'default_photo',
            'photo_name' =>  $this->faker->name(),
        ];
    }
}
