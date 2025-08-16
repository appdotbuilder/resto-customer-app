<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $order = Order::factory()->create();
        $paymentMethods = ['cash', 'credit_card', 'debit_card', 'bank_transfer', 'e_wallet'];

        return [
            'order_id' => $order->id,
            'customer_id' => $order->customer_id,
            'payment_method' => $this->faker->randomElement($paymentMethods),
            'amount' => $order->total_amount,
            'status' => $this->faker->randomElement(['pending', 'completed', 'failed', 'refunded']),
            'transaction_id' => 'TXN-' . strtoupper($this->faker->unique()->bothify('??########')),
            'payment_details' => $this->faker->optional()->sentence(),
            'paid_at' => $this->faker->optional()->dateTimeThisMonth(),
        ];
    }
}