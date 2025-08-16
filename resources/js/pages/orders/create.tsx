import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface MenuCategory {
    id: number;
    name: string;
}

interface MenuItem {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    price: string;
    stock: number;
    is_available: boolean;
    menu_category: MenuCategory;
}

interface Restaurant {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    cuisine_type: string | null;
    menu_items: MenuItem[];
}

interface Props {
    restaurants: Restaurant[];
    [key: string]: unknown;
}

interface CartItem extends MenuItem {
    quantity: number;
    special_instructions?: string;
}

export default function CreateOrder({ restaurants }: Props) {
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [processing, setProcessing] = useState(false);

    const addToCart = (menuItem: MenuItem) => {
        const existingItem = cart.find(item => item.id === menuItem.id);
        
        if (existingItem) {
            setCart(cart.map(item => 
                item.id === menuItem.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...menuItem, quantity: 1 }]);
        }
    };

    const removeFromCart = (menuItemId: number) => {
        setCart(cart.filter(item => item.id !== menuItemId));
    };

    const updateQuantity = (menuItemId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(menuItemId);
        } else {
            setCart(cart.map(item => 
                item.id === menuItemId 
                    ? { ...item, quantity }
                    : item
            ));
        }
    };

    const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    const taxAmount = subtotal * 0.1;
    const total = subtotal + taxAmount;

    const handlePlaceOrder = () => {
        if (!selectedRestaurant || cart.length === 0) return;

        setProcessing(true);
        
        const orderData = {
            restaurant_id: selectedRestaurant.id,
            subtotal: subtotal,
            tax_amount: taxAmount,
            total_amount: total,
            items: cart.map(item => ({
                menu_item_id: item.id,
                quantity: item.quantity,
                special_instructions: item.special_instructions || null,
            }))
        };

        router.post('/orders', orderData, {
            onFinish: () => setProcessing(false),
        });
    };

    const categories = selectedRestaurant 
        ? Array.from(new Set(selectedRestaurant.menu_items.map(item => item.menu_category.name)))
        : [];

    const filteredMenuItems = selectedRestaurant
        ? selectedRestaurant.menu_items.filter(item => 
            selectedCategory === 'all' || item.menu_category.name === selectedCategory
          )
        : [];

    return (
        <AppShell>
            <Head title="Order Food - RestaurantHub" />
            
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🛒 Order Food
                    </h1>
                    <p className="text-gray-600">
                        Choose a restaurant and add items to your cart
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Restaurant Selection */}
                        {!selectedRestaurant ? (
                            <div className="bg-white rounded-xl p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    🏪 Choose a Restaurant
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {restaurants.map((restaurant) => (
                                        <div 
                                            key={restaurant.id}
                                            className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
                                            onClick={() => setSelectedRestaurant(restaurant)}
                                        >
                                            <div className="flex items-start gap-4">
                                                {restaurant.logo ? (
                                                    <img 
                                                        src={`/storage/${restaurant.logo}`}
                                                        alt={restaurant.name}
                                                        className="w-16 h-16 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                                                        <span className="text-2xl">🏪</span>
                                                    </div>
                                                )}
                                                <div className="flex-grow">
                                                    <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                                                    {restaurant.cuisine_type && (
                                                        <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mt-1">
                                                            {restaurant.cuisine_type}
                                                        </span>
                                                    )}
                                                    {restaurant.description && (
                                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                            {restaurant.description}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-blue-600 mt-2">
                                                        {restaurant.menu_items.length} menu items
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Selected Restaurant Header */}
                                <div className="bg-white rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            {selectedRestaurant.logo ? (
                                                <img 
                                                    src={`/storage/${selectedRestaurant.logo}`}
                                                    alt={selectedRestaurant.name}
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-2xl">🏪</span>
                                                </div>
                                            )}
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900">
                                                    {selectedRestaurant.name}
                                                </h2>
                                                {selectedRestaurant.cuisine_type && (
                                                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                                        {selectedRestaurant.cuisine_type}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Button 
                                            variant="outline" 
                                            onClick={() => {
                                                setSelectedRestaurant(null);
                                                setCart([]);
                                                setSelectedCategory('all');
                                            }}
                                        >
                                            🔄 Change Restaurant
                                        </Button>
                                    </div>

                                    {/* Category Filter */}
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedCategory('all')}
                                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                                                selectedCategory === 'all'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            All Items
                                        </button>
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium ${
                                                    selectedCategory === category
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="bg-white rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        📋 Menu Items
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {filteredMenuItems.map((item) => (
                                            <div key={item.id} className="border rounded-lg p-4">
                                                <div className="flex gap-4">
                                                    {item.image ? (
                                                        <img 
                                                            src={`/storage/${item.image}`}
                                                            alt={item.name}
                                                            className="w-20 h-20 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                                                            <span className="text-2xl">🍽️</span>
                                                        </div>
                                                    )}
                                                    <div className="flex-grow">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                            <span className="text-lg font-bold text-orange-600">
                                                                ${parseFloat(item.price).toFixed(2)}
                                                            </span>
                                                        </div>
                                                        {item.description && (
                                                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-sm text-gray-500">
                                                                Stock: {item.stock}
                                                                {!item.is_available && (
                                                                    <span className="ml-2 text-red-500">(Unavailable)</span>
                                                                )}
                                                            </div>
                                                            <Button 
                                                                size="sm"
                                                                onClick={() => addToCart(item)}
                                                                disabled={!item.is_available || item.stock === 0}
                                                                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                                            >
                                                                ➕ Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Cart Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                🛒 Your Cart
                            </h3>
                            
                            {cart.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">🍽️</div>
                                    <p className="text-gray-500">Your cart is empty</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                                        {cart.map((item) => (
                                            <div key={item.id} className="border-b pb-3">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-medium text-gray-900 text-sm">
                                                        {item.name}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <span className="font-medium text-gray-900">
                                                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Order Summary */}
                                    <div className="border-t pt-4">
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-sm">
                                                <span>Subtotal:</span>
                                                <span>${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Tax (10%):</span>
                                                <span>${taxAmount.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                                <span>Total:</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        
                                        <Button 
                                            onClick={handlePlaceOrder}
                                            disabled={processing || cart.length === 0}
                                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                                        >
                                            {processing ? 'Processing...' : '🎯 Place Order'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}