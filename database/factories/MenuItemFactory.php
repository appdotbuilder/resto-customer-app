<?php

namespace Database\Factories;

use App\Models\MenuCategory;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MenuItem>
 */
class MenuItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $menuItems = [
            'Grilled Salmon', 'Caesar Salad', 'Margherita Pizza', 'Chicken Alfredo',
            'Beef Burger', 'Fish & Chips', 'Pad Thai', 'Sushi Roll', 'Tiramisu',
            'Chocolate Cake', 'Fresh Juice', 'Coffee', 'Wine Selection', 'Soup of the Day'
        ];

        return [
            'restaurant_id' => Restaurant::factory(),
            'menu_category_id' => MenuCategory::factory(),
            'name' => $this->faker->randomElement($menuItems),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 5, 50),
            'stock' => $this->faker->numberBetween(0, 100),
            'is_available' => $this->faker->boolean(85),
            'sort_order' => $this->faker->numberBetween(0, 20),
            'status' => 'active',
        ];
    }
}