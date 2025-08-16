<?php

namespace Database\Seeders;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test users
        $restaurantOwner = User::factory()->create([
            'name' => 'Restaurant Owner',
            'email' => 'owner@restaurant.com',
        ]);

        $customer = User::factory()->create([
            'name' => 'John Customer',
            'email' => 'customer@example.com',
        ]);

        // Create additional users
        User::factory(10)->create();

        // Create restaurants
        $restaurant = Restaurant::factory()->create([
            'user_id' => $restaurantOwner->id,
            'name' => 'The Golden Spoon',
            'description' => 'Fine dining experience with international cuisine',
            'cuisine_type' => 'International',
            'phone' => '+1 (555) 123-4567',
            'email' => 'info@goldenspoon.com',
            'address' => '123 Main Street, Downtown City',
            'status' => 'active',
        ]);

        // Create additional restaurants
        Restaurant::factory(5)->create();

        // Create menu categories for the main restaurant
        $appetizers = MenuCategory::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Appetizers',
            'description' => 'Start your meal with our delicious appetizers',
            'sort_order' => 1,
        ]);

        $mainCourse = MenuCategory::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Main Course',
            'description' => 'Our signature main dishes',
            'sort_order' => 2,
        ]);

        $desserts = MenuCategory::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Desserts',
            'description' => 'Sweet endings to your perfect meal',
            'sort_order' => 3,
        ]);

        $beverages = MenuCategory::factory()->create([
            'restaurant_id' => $restaurant->id,
            'name' => 'Beverages',
            'description' => 'Refresh yourself with our drink selection',
            'sort_order' => 4,
        ]);

        // Create menu items for each category
        $menuItems = [
            // Appetizers
            [
                'category' => $appetizers,
                'items' => [
                    ['name' => 'Caesar Salad', 'description' => 'Fresh romaine lettuce with parmesan cheese and croutons', 'price' => 12.99, 'stock' => 50],
                    ['name' => 'Bruschetta', 'description' => 'Toasted bread with fresh tomatoes and basil', 'price' => 9.99, 'stock' => 30],
                    ['name' => 'Stuffed Mushrooms', 'description' => 'Button mushrooms stuffed with herbs and cheese', 'price' => 11.99, 'stock' => 25],
                ]
            ],
            // Main Course
            [
                'category' => $mainCourse,
                'items' => [
                    ['name' => 'Grilled Salmon', 'description' => 'Fresh Atlantic salmon with lemon butter sauce', 'price' => 28.99, 'stock' => 20],
                    ['name' => 'Beef Tenderloin', 'description' => 'Premium cut with red wine reduction', 'price' => 35.99, 'stock' => 15],
                    ['name' => 'Chicken Alfredo', 'description' => 'Creamy pasta with grilled chicken breast', 'price' => 22.99, 'stock' => 30],
                    ['name' => 'Vegetarian Risotto', 'description' => 'Creamy arborio rice with seasonal vegetables', 'price' => 19.99, 'stock' => 25],
                ]
            ],
            // Desserts
            [
                'category' => $desserts,
                'items' => [
                    ['name' => 'Tiramisu', 'description' => 'Classic Italian dessert with coffee and mascarpone', 'price' => 8.99, 'stock' => 20],
                    ['name' => 'Chocolate Lava Cake', 'description' => 'Warm chocolate cake with molten center', 'price' => 9.99, 'stock' => 15],
                    ['name' => 'Crème Brûlée', 'description' => 'Vanilla custard with caramelized sugar top', 'price' => 7.99, 'stock' => 18],
                ]
            ],
            // Beverages
            [
                'category' => $beverages,
                'items' => [
                    ['name' => 'House Wine', 'description' => 'Selected red or white wine', 'price' => 8.00, 'stock' => 50],
                    ['name' => 'Fresh Juice', 'description' => 'Orange, apple, or mixed berry', 'price' => 4.99, 'stock' => 40],
                    ['name' => 'Artisan Coffee', 'description' => 'Freshly roasted coffee beans', 'price' => 3.99, 'stock' => 100],
                ]
            ],
        ];

        foreach ($menuItems as $categoryData) {
            foreach ($categoryData['items'] as $itemData) {
                MenuItem::factory()->create([
                    'restaurant_id' => $restaurant->id,
                    'menu_category_id' => $categoryData['category']->id,
                    'name' => $itemData['name'],
                    'description' => $itemData['description'],
                    'price' => $itemData['price'],
                    'stock' => $itemData['stock'],
                    'is_available' => true,
                    'status' => 'active',
                ]);
            }
        }

        // Create additional menu items for other restaurants
        MenuItem::factory(50)->create();

        // Create sample reservations
        Reservation::factory()->create([
            'restaurant_id' => $restaurant->id,
            'customer_id' => $customer->id,
            'customer_name' => $customer->name,
            'customer_email' => $customer->email,
            'customer_phone' => '+1 (555) 987-6543',
            'reservation_date' => now()->addDays(3)->format('Y-m-d'),
            'reservation_time' => '19:00',
            'guest_count' => 4,
            'special_requests' => 'Window table preferred',
            'status' => 'confirmed',
        ]);

        Reservation::factory(20)->create();

        // Create sample orders
        $order = Order::factory()->create([
            'restaurant_id' => $restaurant->id,
            'customer_id' => $customer->id,
            'order_number' => 'ORD-' . strtoupper(uniqid()),
            'subtotal' => 45.97,
            'tax_amount' => 4.60,
            'total_amount' => 50.57,
            'status' => 'delivered',
        ]);

        // Create order items
        $salmon = MenuItem::where('name', 'Grilled Salmon')->first();
        $tiramisu = MenuItem::where('name', 'Tiramisu')->first();

        if ($salmon) {
            OrderItem::factory()->create([
                'order_id' => $order->id,
                'menu_item_id' => $salmon->id,
                'item_name' => $salmon->name,
                'item_price' => $salmon->price,
                'quantity' => 1,
                'total_price' => $salmon->price,
            ]);
        }

        if ($tiramisu) {
            OrderItem::factory()->create([
                'order_id' => $order->id,
                'menu_item_id' => $tiramisu->id,
                'item_name' => $tiramisu->name,
                'item_price' => $tiramisu->price,
                'quantity' => 2,
                'total_price' => (float) $tiramisu->price * 2,
            ]);
        }

        Order::factory(30)->create();

        // Create sample payment
        Payment::factory()->create([
            'order_id' => $order->id,
            'customer_id' => $customer->id,
            'payment_method' => 'credit_card',
            'amount' => $order->total_amount,
            'status' => 'completed',
            'transaction_id' => 'TXN-' . strtoupper(uniqid()),
            'paid_at' => now(),
        ]);

        Payment::factory(25)->create();
    }
}
