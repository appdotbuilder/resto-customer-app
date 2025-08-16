import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Restaurant {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    cuisine_type: string | null;
    opening_time: string | null;
    closing_time: string | null;
}

interface Props {
    restaurants: Restaurant[];
    [key: string]: unknown;
}



export default function CreateReservation({ restaurants }: Props) {
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    
    const { data, setData, post, processing, errors } = useForm({
        restaurant_id: 0,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        reservation_date: '',
        reservation_time: '',
        guest_count: 1,
        special_requests: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reservations');
    };

    const handleRestaurantSelect = (restaurant: Restaurant) => {
        setSelectedRestaurant(restaurant);
        setData('restaurant_id', restaurant.id);
    };

    const timeSlots = [
        '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
        '20:00', '20:30', '21:00', '21:30', '22:00'
    ];

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <AppShell>
            <Head title="Make Reservation - RestaurantHub" />
            
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        📞 Make a Reservation
                    </h1>
                    <p className="text-gray-600">
                        Book a table at your favorite restaurant
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Restaurant Selection */}
                    <div className="lg:col-span-2">
                        {!selectedRestaurant ? (
                            <div className="bg-white rounded-xl p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    🏪 Choose a Restaurant
                                </h2>
                                <div className="space-y-4">
                                    {restaurants.map((restaurant) => (
                                        <div 
                                            key={restaurant.id}
                                            className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow hover:border-orange-200"
                                            onClick={() => handleRestaurantSelect(restaurant)}
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
                                                    <h3 className="font-bold text-gray-900 text-lg">{restaurant.name}</h3>
                                                    {restaurant.cuisine_type && (
                                                        <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mt-1">
                                                            {restaurant.cuisine_type}
                                                        </span>
                                                    )}
                                                    {restaurant.description && (
                                                        <p className="text-gray-600 mt-2 line-clamp-2">
                                                            {restaurant.description}
                                                        </p>
                                                    )}
                                                    {restaurant.opening_time && restaurant.closing_time && (
                                                        <div className="flex items-center text-sm text-gray-500 mt-2">
                                                            <span className="mr-1">🕐</span>
                                                            {restaurant.opening_time} - {restaurant.closing_time}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-blue-600 font-medium">
                                                    Select →
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-6">
                                {/* Selected Restaurant */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            {selectedRestaurant.logo ? (
                                                <img 
                                                    src={`/storage/${selectedRestaurant.logo}`}
                                                    alt={selectedRestaurant.name}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-xl">🏪</span>
                                                </div>
                                            )}
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-900">
                                                    {selectedRestaurant.name}
                                                </h2>
                                                {selectedRestaurant.cuisine_type && (
                                                    <span className="text-sm text-orange-600">
                                                        {selectedRestaurant.cuisine_type}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => setSelectedRestaurant(null)}
                                        >
                                            🔄 Change
                                        </Button>
                                    </div>
                                </div>

                                {/* Reservation Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        📝 Reservation Details
                                    </h3>

                                    {/* Personal Information */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.customer_name}
                                                onChange={e => setData('customer_name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                            {errors.customer_name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                value={data.customer_email}
                                                onChange={e => setData('customer_email', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="Enter your email"
                                                required
                                            />
                                            {errors.customer_email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.customer_phone}
                                            onChange={e => setData('customer_phone', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.customer_phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>
                                        )}
                                    </div>

                                    {/* Date and Time */}
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Date *
                                            </label>
                                            <input
                                                type="date"
                                                value={data.reservation_date}
                                                onChange={e => setData('reservation_date', e.target.value)}
                                                min={today}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                required
                                            />
                                            {errors.reservation_date && (
                                                <p className="text-red-500 text-sm mt-1">{errors.reservation_date}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Time *
                                            </label>
                                            <select
                                                value={data.reservation_time}
                                                onChange={e => setData('reservation_time', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                required
                                            >
                                                <option value="">Select time</option>
                                                {timeSlots.map(time => (
                                                    <option key={time} value={time}>{time}</option>
                                                ))}
                                            </select>
                                            {errors.reservation_time && (
                                                <p className="text-red-500 text-sm mt-1">{errors.reservation_time}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Guests *
                                            </label>
                                            <select
                                                value={data.guest_count}
                                                onChange={e => setData('guest_count', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                required
                                            >
                                                {Array.from({length: 20}, (_, i) => i + 1).map(num => (
                                                    <option key={num} value={num}>
                                                        {num} {num === 1 ? 'Guest' : 'Guests'}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.guest_count && (
                                                <p className="text-red-500 text-sm mt-1">{errors.guest_count}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Special Requests */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Special Requests
                                        </label>
                                        <textarea
                                            value={data.special_requests}
                                            onChange={e => setData('special_requests', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Any special requests? (dietary restrictions, seating preferences, etc.)"
                                        />
                                        {errors.special_requests && (
                                            <p className="text-red-500 text-sm mt-1">{errors.special_requests}</p>
                                        )}
                                    </div>

                                    <Button 
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-3 text-lg"
                                    >
                                        {processing ? 'Processing...' : '📞 Make Reservation'}
                                    </Button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Reservation Info Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                💡 Reservation Tips
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="text-xl">📅</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Best Times</h4>
                                        <p className="text-sm text-gray-600">
                                            Peak hours are 7-9 PM. Consider early dining for better availability.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="text-xl">🕐</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Timing</h4>
                                        <p className="text-sm text-gray-600">
                                            Please arrive within 15 minutes of your reservation time.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="text-xl">👥</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Party Size</h4>
                                        <p className="text-sm text-gray-600">
                                            Large groups (8+) may require special arrangements.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="text-xl">📞</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Changes</h4>
                                        <p className="text-sm text-gray-600">
                                            Need to modify? Contact the restaurant directly.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {selectedRestaurant && selectedRestaurant.opening_time && selectedRestaurant.closing_time && (
                                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Operating Hours</h4>
                                    <div className="text-sm text-gray-700">
                                        🕐 {selectedRestaurant.opening_time} - {selectedRestaurant.closing_time}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}