<?php

namespace Database\Factories;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = $this->faker->randomFloat(2, 15, 100);
        $taxAmount = $subtotal * 0.1;
        $totalAmount = $subtotal + $taxAmount;

        return [
            'restaurant_id' => Restaurant::factory(),
            'customer_id' => User::factory(),
            'order_number' => 'ORD-' . strtoupper($this->faker->unique()->bothify('??####')),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'status' => $this->faker->randomElement(['pending', 'preparing', 'ready', 'delivered', 'cancelled']),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}