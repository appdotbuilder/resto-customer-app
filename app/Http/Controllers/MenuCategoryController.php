<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuCategoryRequest;
use App\Http\Requests\UpdateMenuCategoryRequest;
use App\Models\MenuCategory;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MenuCategoryController extends Controller
{
    /**
     * Display a listing of menu categories.
     */
    public function index()
    {
        /** @var \App\Models\Restaurant|null $restaurant */
        $restaurant = Auth::user()->restaurants()->first();
        
        if (!$restaurant) {
            return redirect()->route('restaurant.create');
        }

        $categories = MenuCategory::where('restaurant_id', $restaurant->id)
            ->withCount('menuItems')
            ->orderBy('sort_order')
            ->paginate(10);

        return Inertia::render('menu-categories/index', [
            'categories' => $categories,
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Show the form for creating a new menu category.
     */
    public function create()
    {
        return Inertia::render('menu-categories/create');
    }

    /**
     * Store a newly created menu category in storage.
     */
    public function store(StoreMenuCategoryRequest $request)
    {
        /** @var \App\Models\Restaurant|null $restaurant */
        $restaurant = Auth::user()->restaurants()->first();
        if (!$restaurant) {
            return redirect()->route('restaurant.create');
        }
        
        $data = $request->validated();
        $data['restaurant_id'] = $restaurant->id;

        $category = MenuCategory::create($data);

        return redirect()->route('menu-categories.show', $category)
            ->with('success', 'Menu category created successfully.');
    }

    /**
     * Display the specified menu category.
     */
    public function show(MenuCategory $menuCategory)
    {
        $menuCategory->load(['restaurant']);
        $menuCategory->loadCount('menuItems');

        return Inertia::render('menu-categories/show', [
            'category' => $menuCategory
        ]);
    }

    /**
     * Show the form for editing the specified menu category.
     */
    public function edit(MenuCategory $menuCategory)
    {
        return Inertia::render('menu-categories/edit', [
            'category' => $menuCategory
        ]);
    }

    /**
     * Update the specified menu category in storage.
     */
    public function update(UpdateMenuCategoryRequest $request, MenuCategory $menuCategory)
    {
        $menuCategory->update($request->validated());

        return redirect()->route('menu-categories.show', $menuCategory)
            ->with('success', 'Menu category updated successfully.');
    }

    /**
     * Remove the specified menu category from storage.
     */
    public function destroy(MenuCategory $menuCategory)
    {
        $menuCategory->delete();

        return redirect()->route('menu-categories.index')
            ->with('success', 'Menu category deleted successfully.');
    }
}