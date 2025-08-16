<?php

namespace Database\Factories;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MenuCategory>
 */
class MenuCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Salads', 
            'Soups', 'Pasta', 'Pizza', 'Seafood', 'Vegetarian', 'Specials'
        ];

        return [
            'restaurant_id' => Restaurant::factory(),
            'name' => $this->faker->randomElement($categories),
            'description' => $this->faker->sentence(),
            'sort_order' => $this->faker->numberBetween(0, 10),
            'status' => 'active',
        ];
    }
}