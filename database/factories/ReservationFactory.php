<?php

namespace Database\Factories;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $customer = User::factory()->create();

        return [
            'restaurant_id' => Restaurant::factory(),
            'customer_id' => $customer->id,
            'customer_name' => $customer->name,
            'customer_email' => $customer->email,
            'customer_phone' => $this->faker->phoneNumber(),
            'reservation_date' => $this->faker->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'reservation_time' => $this->faker->time('H:i'),
            'guest_count' => $this->faker->numberBetween(1, 8),
            'special_requests' => $this->faker->optional()->sentence(),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled', 'completed']),
        ];
    }
}