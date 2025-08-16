import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Restaurant {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    cuisine_type: string | null;
    opening_time: string | null;
    closing_time: string | null;
    status: string;
}

interface Props {
    restaurant: Restaurant | null;
    [key: string]: unknown;
}

export default function RestaurantProfile({ restaurant }: Props) {
    if (!restaurant) {
        return (
            <AppShell>
                <Head title="Restaurant Profile" />
                
                <div className="max-w-4xl mx-auto p-6">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏪</div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Create Your Restaurant Profile
                        </h1>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            Welcome to RestaurantHub! Let's get started by setting up your restaurant profile. 
                            This will help customers discover and connect with your restaurant.
                        </p>
                        <Link href="/restaurant/create">
                            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-3">
                                🚀 Create Restaurant Profile
                            </Button>
                        </Link>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <Head title={`${restaurant.name} - Restaurant Profile`} />
            
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex-shrink-0">
                            {restaurant.logo ? (
                                <img 
                                    src={`/storage/${restaurant.logo}`}
                                    alt={restaurant.name}
                                    className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-100"
                                />
                            ) : (
                                <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center">
                                    <span className="text-3xl">🏪</span>
                                </div>
                            )}
                        </div>
                        <div className="flex-grow">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                            {restaurant.cuisine_type && (
                                <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                                    {restaurant.cuisine_type}
                                </div>
                            )}
                            {restaurant.description && (
                                <p className="text-gray-600 mb-4">{restaurant.description}</p>
                            )}
                            <div className="flex items-center gap-2">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                    restaurant.status === 'active' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {restaurant.status === 'active' ? '✅ Active' : '⏸️ Inactive'}
                                </span>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href={`/restaurant/${restaurant.id}/edit`}>
                                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                                    ✏️ Edit Profile
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Restaurant Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="text-2xl mr-2">📞</span>
                            Contact Information
                        </h2>
                        <div className="space-y-3">
                            {restaurant.phone && (
                                <div className="flex items-center">
                                    <span className="text-gray-500 w-16">Phone:</span>
                                    <span className="text-gray-900">{restaurant.phone}</span>
                                </div>
                            )}
                            {restaurant.email && (
                                <div className="flex items-center">
                                    <span className="text-gray-500 w-16">Email:</span>
                                    <span className="text-gray-900">{restaurant.email}</span>
                                </div>
                            )}
                            {restaurant.address && (
                                <div className="flex items-start">
                                    <span className="text-gray-500 w-16 pt-1">Address:</span>
                                    <span className="text-gray-900">{restaurant.address}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="text-2xl mr-2">🕐</span>
                            Operating Hours
                        </h2>
                        <div className="space-y-3">
                            {restaurant.opening_time && restaurant.closing_time ? (
                                <div className="flex items-center">
                                    <span className="text-gray-500 w-20">Daily:</span>
                                    <span className="text-gray-900">
                                        {restaurant.opening_time} - {restaurant.closing_time}
                                    </span>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Operating hours not set</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        🚀 Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/menu-items">
                            <Button variant="outline" className="w-full flex flex-col items-center py-4 h-auto">
                                <span className="text-2xl mb-1">📋</span>
                                <span>Manage Menu</span>
                            </Button>
                        </Link>
                        <Link href="/menu-categories">
                            <Button variant="outline" className="w-full flex flex-col items-center py-4 h-auto">
                                <span className="text-2xl mb-1">📂</span>
                                <span>Categories</span>
                            </Button>
                        </Link>
                        <Link href="/orders">
                            <Button variant="outline" className="w-full flex flex-col items-center py-4 h-auto">
                                <span className="text-2xl mb-1">📦</span>
                                <span>View Orders</span>
                            </Button>
                        </Link>
                        <Link href="/reservations">
                            <Button variant="outline" className="w-full flex flex-col items-center py-4 h-auto">
                                <span className="text-2xl mb-1">📅</span>
                                <span>Reservations</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}