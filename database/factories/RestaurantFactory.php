<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restaurant>
 */
class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cuisineTypes = [
            'Italian', 'Chinese', 'Japanese', 'Mexican', 'Indian', 'French', 
            'Thai', 'American', 'Mediterranean', 'Korean', 'Vietnamese', 'Greek'
        ];

        return [
            'user_id' => User::factory(),
            'name' => $this->faker->company() . ' Restaurant',
            'description' => $this->faker->paragraph(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->companyEmail(),
            'address' => $this->faker->address(),
            'cuisine_type' => $this->faker->randomElement($cuisineTypes),
            'opening_time' => '09:00',
            'closing_time' => '22:00',
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}