<?php

namespace Database\Factories;

use App\Models\MenuItem;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $menuItem = MenuItem::factory()->create();
        $quantity = $this->faker->numberBetween(1, 3);
        $totalPrice = (float) $menuItem->price * $quantity;

        return [
            'order_id' => Order::factory(),
            'menu_item_id' => $menuItem->id,
            'item_name' => $menuItem->name,
            'item_price' => $menuItem->price,
            'quantity' => $quantity,
            'total_price' => $totalPrice,
            'special_instructions' => $this->faker->optional()->sentence(),
        ];
    }
}