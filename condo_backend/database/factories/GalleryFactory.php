<?php

namespace Database\Factories;

use App\Models\Deceased;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Gallery>
 */
class GalleryFactory extends Factory
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
            'gallery' => 'default_photo.png',
            'gallery_name' =>  $this->faker->name(),
        ];
    }
}
