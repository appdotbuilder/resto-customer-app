<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Reservation;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of reservations.
     */
    public function index()
    {
        /** @var \App\Models\Restaurant|null $restaurant */
        $restaurant = Auth::user()->restaurants()->first();
        
        if (!$restaurant) {
            return redirect()->route('restaurant.create');
        }

        $reservations = Reservation::with(['customer'])
            ->where('restaurant_id', $restaurant->id)
            ->orderBy('reservation_date')
            ->orderBy('reservation_time')
            ->paginate(10);

        return Inertia::render('reservations/index', [
            'reservations' => $reservations,
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Show the form for creating a new reservation.
     */
    public function create()
    {
        $restaurants = Restaurant::active()->get();
        
        return Inertia::render('reservations/create', [
            'restaurants' => $restaurants
        ]);
    }

    /**
     * Store a newly created reservation in storage.
     */
    public function store(StoreReservationRequest $request)
    {
        $data = $request->validated();
        $data['customer_id'] = Auth::id();

        $reservation = Reservation::create($data);

        return redirect()->route('reservations.show', $reservation)
            ->with('success', 'Reservation created successfully.');
    }

    /**
     * Display the specified reservation.
     */
    public function show(Reservation $reservation)
    {
        $reservation->load(['restaurant', 'customer']);

        return Inertia::render('reservations/show', [
            'reservation' => $reservation
        ]);
    }

    /**
     * Show the form for editing the specified reservation.
     */
    public function edit(Reservation $reservation)
    {
        return Inertia::render('reservations/edit', [
            'reservation' => $reservation
        ]);
    }

    /**
     * Update the specified reservation in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        $reservation->update($request->validated());

        return redirect()->route('reservations.show', $reservation)
            ->with('success', 'Reservation updated successfully.');
    }

    /**
     * Remove the specified reservation from storage.
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return redirect()->route('reservations.index')
            ->with('success', 'Reservation cancelled successfully.');
    }
}