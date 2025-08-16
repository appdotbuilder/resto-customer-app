<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuItemRequest;
use App\Http\Requests\UpdateMenuItemRequest;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    /**
     * Display a listing of menu items.
     */
    public function index()
    {
        /** @var \App\Models\Restaurant|null $restaurant */
        $restaurant = Auth::user()->restaurants()->first();
        
        if (!$restaurant) {
            return redirect()->route('restaurant.create')
                ->with('error', 'Please create your restaurant profile first.');
        }

        $menuItems = MenuItem::with(['menuCategory'])
            ->where('restaurant_id', $restaurant->id)
            ->orderBy('sort_order')
            ->paginate(12);

        $categories = MenuCategory::where('restaurant_id', $restaurant->id)
            ->active()
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('menu-items/index', [
            'menuItems' => $menuItems,
            'categories' => $categories,
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Show the form for creating a new menu item.
     */
    public function create()
    {
        /** @var \App\Models\Restaurant|null $restaurant */
        $restaurant = Auth::user()->restaurants()->first();
        
        if (!$restaurant) {
            return redirect()->route('restaurant.create');
        }

        $categories = MenuCategory::where('restaurant_id', $restaurant->id)
            ->active()
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('menu-items/create', [
            'categories' => $categories,
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Store a newly created menu item in storage.
     */
    public function store(StoreMenuItemRequest $request)
    {
        /** @var \App\Models\Restaurant|null $restaurant */
        $restaurant = Auth::user()->restaurants()->first();
        if (!$restaurant) {
            return redirect()->route('restaurant.create');
        }
        
        $data = $request->validated();
        $data['restaurant_id'] = $restaurant->id;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('menu-items', 'public');
        }

        $menuItem = MenuItem::create($data);

        return redirect()->route('menu-items.show', $menuItem)
            ->with('success', 'Menu item created successfully.');
    }

    /**
     * Display the specified menu item.
     */
    public function show(MenuItem $menuItem)
    {
        $menuItem->load(['menuCategory', 'restaurant']);

        return Inertia::render('menu-items/show', [
            'menuItem' => $menuItem
        ]);
    }

    /**
     * Show the form for editing the specified menu item.
     */
    public function edit(MenuItem $menuItem)
    {
        /** @var \App\Models\Restaurant|null $restaurant */
        $restaurant = Auth::user()->restaurants()->first();
        if (!$restaurant) {
            return redirect()->route('restaurant.create');
        }
        
        $categories = MenuCategory::where('restaurant_id', $restaurant->id)
            ->active()
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('menu-items/edit', [
            'menuItem' => $menuItem,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified menu item in storage.
     */
    public function update(UpdateMenuItemRequest $request, MenuItem $menuItem)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($menuItem->image) {
                Storage::disk('public')->delete($menuItem->image);
            }
            $data['image'] = $request->file('image')->store('menu-items', 'public');
        }

        $menuItem->update($data);

        return redirect()->route('menu-items.show', $menuItem)
            ->with('success', 'Menu item updated successfully.');
    }

    /**
     * Remove the specified menu item from storage.
     */
    public function destroy(MenuItem $menuItem)
    {
        if ($menuItem->image) {
            Storage::disk('public')->delete($menuItem->image);
        }
        
        $menuItem->delete();

        return redirect()->route('menu-items.index')
            ->with('success', 'Menu item deleted successfully.');
    }
}