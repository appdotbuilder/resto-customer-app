<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRestaurantRequest;
use App\Http\Requests\UpdateRestaurantRequest;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    /**
     * Display the restaurant profile.
     */
    public function index()
    {
        /** @var \App\Models\Restaurant|null $restaurant */
        $restaurant = Auth::user()->restaurants()->first();
        
        return Inertia::render('restaurant/profile', [
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Show the form for creating a new restaurant.
     */
    public function create()
    {
        return Inertia::render('restaurant/create');
    }

    /**
     * Store a newly created restaurant in storage.
     */
    public function store(StoreRestaurantRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('restaurant-logos', 'public');
        }

        $restaurant = Restaurant::create($data);

        return redirect()->route('restaurant.show', $restaurant)
            ->with('success', 'Restaurant profile created successfully.');
    }

    /**
     * Display the specified restaurant.
     */
    public function show(Restaurant $restaurant)
    {
        return Inertia::render('restaurant/show', [
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Show the form for editing the restaurant.
     */
    public function edit(Restaurant $restaurant)
    {
        return Inertia::render('restaurant/edit', [
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Update the restaurant in storage.
     */
    public function update(UpdateRestaurantRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            if ($restaurant->logo) {
                Storage::disk('public')->delete($restaurant->logo);
            }
            $data['logo'] = $request->file('logo')->store('restaurant-logos', 'public');
        }

        $restaurant->update($data);

        return redirect()->route('restaurant.show', $restaurant)
            ->with('success', 'Restaurant profile updated successfully.');
    }

    /**
     * Remove the restaurant from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        if ($restaurant->logo) {
            Storage::disk('public')->delete($restaurant->logo);
        }
        
        $restaurant->delete();

        return redirect()->route('restaurant.index')
            ->with('success', 'Restaurant deleted successfully.');
    }
}