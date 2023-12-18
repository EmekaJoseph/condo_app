<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\Admin;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Deceased>
 */
class DeceasedFactory extends Factory
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
            'admin_id' => Admin::inRandomOrder()->first()->id,
            'deceased' => $this->faker->name(),
            'biography' => $this->faker->paragraph(5),
            'life_history' => $this->faker->paragraph(5),
            'birth_date' => Carbon::now()->subYears(rand(10, 100)),
            'death_date' => Carbon::now()->addYears(rand(-10, 0)),
            'display_photo' => 'default_photo.png',
            'background_song' => 'default_song.mp3',
        ];
    }
}
