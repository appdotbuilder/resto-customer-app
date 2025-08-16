<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     */
    public function index()
    {
        $user = Auth::user();
        /** @var \App\Models\Restaurant|null $restaurant */
        $restaurant = $user->restaurants()->first();

        if ($restaurant) {
            // Restaurant owner view
            $orders = Order::with(['customer', 'orderItems'])
                ->where('restaurant_id', $restaurant->id)
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return Inertia::render('orders/restaurant-index', [
                'orders' => $orders,
                'restaurant' => $restaurant
            ]);
        } else {
            // Customer view
            $orders = Order::with(['restaurant', 'orderItems', 'payment'])
                ->where('customer_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return Inertia::render('orders/customer-index', [
                'orders' => $orders
            ]);
        }
    }

    /**
     * Show the form for creating a new order.
     */
    public function create()
    {
        $restaurants = Restaurant::with(['menuItems.menuCategory'])
            ->active()
            ->get();

        return Inertia::render('orders/create', [
            'restaurants' => $restaurants
        ]);
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();
        
        return DB::transaction(function () use ($data) {
            // Create order
            $order = Order::create([
                'restaurant_id' => $data['restaurant_id'],
                'customer_id' => Auth::id(),
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'subtotal' => $data['subtotal'],
                'tax_amount' => $data['tax_amount'],
                'total_amount' => $data['total_amount'],
                'notes' => $data['notes'] ?? null,
            ]);

            // Create order items
            foreach ($data['items'] as $item) {
                $menuItem = MenuItem::find($item['menu_item_id']);
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $menuItem->id,
                    'item_name' => $menuItem->name,
                    'item_price' => $menuItem->price,
                    'quantity' => $item['quantity'],
                    'total_price' => $menuItem->price * $item['quantity'],
                    'special_instructions' => $item['special_instructions'] ?? null,
                ]);

                // Update stock
                $menuItem->decrement('stock', $item['quantity']);
            }

            return redirect()->route('orders.show', $order)
                ->with('success', 'Order placed successfully.');
        });
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        $order->load(['restaurant', 'customer', 'orderItems.menuItem', 'payment']);

        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }

    /**
     * Show the form for editing the specified order.
     */
    public function edit(Order $order)
    {
        return Inertia::render('orders/edit', [
            'order' => $order
        ]);
    }

    /**
     * Update the specified order in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $order->update($request->validated());

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified order from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('orders.index')
            ->with('success', 'Order cancelled successfully.');
    }
}