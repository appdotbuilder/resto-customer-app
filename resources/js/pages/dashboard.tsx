import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';

interface User {
    name: string;
    email: string;
}

interface AuthProps {
    user: User;
}

interface PageProps {
    auth: AuthProps;
    [key: string]: unknown;
}

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
    
    return (
        <AppShell>
            <Head title="Dashboard - RestaurantHub" />
            
            <div className="max-w-7xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {auth.user.name}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Choose how you'd like to use RestaurantHub today
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                    {/* Restaurant Partner Dashboard */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">👨‍🍳</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant Partner</h2>
                            <p className="text-gray-600">
                                Manage your restaurant, menu, orders and reservations
                            </p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">🏪</span>
                                <span className="text-gray-700">Restaurant Profile Management</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">📋</span>
                                <span className="text-gray-700">Menu & Category Management</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">📦</span>
                                <span className="text-gray-700">Order Tracking & Management</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">📅</span>
                                <span className="text-gray-700">Reservation Management</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">💳</span>
                                <span className="text-gray-700">Payment History</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link href="/restaurant">
                                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                                    🏪 Manage Restaurant
                                </Button>
                            </Link>
                            <Link href="/menu-items">
                                <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                                    📋 Manage Menu
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Customer Dashboard */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">🍽️</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Food Lover</h2>
                            <p className="text-gray-600">
                                Explore restaurants, order food and make reservations
                            </p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">🔍</span>
                                <span className="text-gray-700">Browse Restaurant Menus</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">🛒</span>
                                <span className="text-gray-700">Place Food Orders</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">📞</span>
                                <span className="text-gray-700">Make Table Reservations</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">💰</span>
                                <span className="text-gray-700">Secure Payments</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">📊</span>
                                <span className="text-gray-700">Order & Payment History</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link href="/orders/create">
                                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                    🛒 Order Food
                                </Button>
                            </Link>
                            <Link href="/reservations/create">
                                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                                    📞 Make Reservation
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
                        <div className="text-2xl mb-2">🏪</div>
                        <div className="text-2xl font-bold text-gray-900">500+</div>
                        <div className="text-sm text-gray-600">Partner Restaurants</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
                        <div className="text-2xl mb-2">👥</div>
                        <div className="text-2xl font-bold text-gray-900">10K+</div>
                        <div className="text-sm text-gray-600">Happy Customers</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
                        <div className="text-2xl mb-2">📦</div>
                        <div className="text-2xl font-bold text-gray-900">50K+</div>
                        <div className="text-sm text-gray-600">Orders Delivered</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
                        <div className="text-2xl mb-2">⭐</div>
                        <div className="text-2xl font-bold text-gray-900">4.9</div>
                        <div className="text-sm text-gray-600">Average Rating</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">🚀 Ready to get started?</h2>
                        <p className="mb-6 text-orange-100">
                            Whether you're managing a restaurant or looking for great food, we've got you covered!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/orders">
                                <Button className="bg-white text-orange-600 hover:bg-gray-100">
                                    📊 View All Orders
                                </Button>
                            </Link>
                            <Link href="/reservations">
                                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                                    📅 View All Reservations
                                </Button>
                            </Link>
                            <Link href="/payments">
                                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                                    💳 Payment History
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}