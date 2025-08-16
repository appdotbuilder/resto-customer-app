<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentRequest;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of payments.
     */
    public function index()
    {
        $user = Auth::user();
        /** @var \App\Models\Restaurant|null $restaurant */
        $restaurant = $user->restaurants()->first();

        if ($restaurant) {
            // Restaurant owner view
            $payments = Payment::with(['order', 'customer'])
                ->whereHas('order', function ($query) use ($restaurant) {
                    $query->where('restaurant_id', $restaurant->id);
                })
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return Inertia::render('payments/restaurant-index', [
                'payments' => $payments,
                'restaurant' => $restaurant
            ]);
        } else {
            // Customer view
            $payments = Payment::with(['order.restaurant'])
                ->where('customer_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return Inertia::render('payments/customer-index', [
                'payments' => $payments
            ]);
        }
    }

    /**
     * Show the form for creating a new payment.
     */
    public function create()
    {
        $orders = Order::with(['restaurant'])
            ->where('customer_id', Auth::id())
            ->whereDoesntHave('payment')
            ->get();

        return Inertia::render('payments/create', [
            'orders' => $orders
        ]);
    }

    /**
     * Store a newly created payment in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        $data = $request->validated();
        $data['customer_id'] = Auth::id();
        $data['transaction_id'] = 'TXN-' . strtoupper(uniqid());
        $data['paid_at'] = now();
        $data['status'] = 'completed';

        $payment = Payment::create($data);

        return redirect()->route('payments.show', $payment)
            ->with('success', 'Payment processed successfully.');
    }

    /**
     * Display the specified payment.
     */
    public function show(Payment $payment)
    {
        $payment->load(['order.restaurant', 'customer']);

        return Inertia::render('payments/show', [
            'payment' => $payment
        ]);
    }
}