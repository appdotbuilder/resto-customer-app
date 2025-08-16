import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="RestaurantHub - Complete Restaurant Platform" />
            
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
                {/* Header */}
                <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">🍽️</span>
                                </div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                    RestaurantHub
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href="/login">
                                    <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Complete Restaurant 
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Platform</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                                🚀 Manage your restaurant or discover amazing dining experiences with our modern, real-time platform. 
                                Built for restaurant owners and food lovers alike!
                            </p>
                        </div>

                        {/* Platform Types */}
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                            {/* Restaurant Partner App */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">👨‍🍳</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Restaurant Partners</h3>
                                <p className="text-gray-600 mb-6">
                                    Complete restaurant management solution with modern tools and real-time updates
                                </p>
                                <Link href="/register">
                                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                                        Start Managing Restaurant
                                    </Button>
                                </Link>
                            </div>

                            {/* Customer App */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">🍽️</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Food Lovers</h3>
                                <p className="text-gray-600 mb-6">
                                    Discover amazing restaurants, order food, and make reservations seamlessly
                                </p>
                                <Link href="/register">
                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                        Start Exploring Food
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                🌟 Powerful Features for Everyone
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Modern, intuitive tools designed for the restaurant industry
                            </p>
                        </div>

                        {/* Restaurant Partner Features */}
                        <div className="mb-20">
                            <h3 className="text-2xl font-bold text-center mb-12 text-orange-600">
                                🏪 For Restaurant Partners
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">📋</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Menu Management</h4>
                                    <p className="text-gray-600">Add, edit, delete menu items with images, prices, and stock tracking</p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">🏪</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Restaurant Profile</h4>
                                    <p className="text-gray-600">Manage your restaurant info, upload logo, set hours and location</p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">📅</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Reservation System</h4>
                                    <p className="text-gray-600">View and manage incoming reservations with guest details</p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">📦</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Order Management</h4>
                                    <p className="text-gray-600">Track orders from pending to delivered with real-time updates</p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">💳</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Payment Tracking</h4>
                                    <p className="text-gray-600">Monitor payments and transaction history</p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">⚡</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h4>
                                    <p className="text-gray-600">Instant notifications and live data synchronization</p>
                                </div>
                            </div>
                        </div>

                        {/* Customer Features */}
                        <div>
                            <h3 className="text-2xl font-bold text-center mb-12 text-blue-600">
                                🍽️ For Food Lovers
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">📱</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Browse Menu</h4>
                                    <p className="text-gray-600">Explore restaurant menus with photos and descriptions</p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">🛒</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Easy Ordering</h4>
                                    <p className="text-gray-600">Place orders with just a few clicks</p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">💰</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h4>
                                    <p className="text-gray-600">Multiple payment options with secure processing</p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">📞</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Table Reservations</h4>
                                    <p className="text-gray-600">Book tables with date, time, and guest count</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technology Stack */}
                <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            ⚡ Modern Technology Stack
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                            Built with cutting-edge technologies for performance and reliability
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <div className="text-2xl mb-2">⚛️</div>
                                <div className="font-semibold text-gray-900">React</div>
                                <div className="text-sm text-gray-600">Modern UI</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <div className="text-2xl mb-2">🐘</div>
                                <div className="font-semibold text-gray-900">Laravel</div>
                                <div className="text-sm text-gray-600">Robust Backend</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <div className="text-2xl mb-2">🗄️</div>
                                <div className="font-semibold text-gray-900">MySQL</div>
                                <div className="text-sm text-gray-600">Reliable Database</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <div className="text-2xl mb-2">📡</div>
                                <div className="font-semibold text-gray-900">Inertia.js</div>
                                <div className="text-sm text-gray-600">Real-time Updates</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            🚀 Ready to Transform Your Restaurant Experience?
                        </h2>
                        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                            Join hundreds of restaurants and thousands of food lovers on our platform
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                                    🏪 Register as Restaurant Partner
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                                >
                                    🍽️ Join as Food Lover
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">🍽️</span>
                                </div>
                                <span className="text-xl font-bold">RestaurantHub</span>
                            </div>
                            <div className="text-center md:text-right">
                                <p className="text-gray-400">
                                    © 2024 RestaurantHub. Built with ❤️ for the restaurant industry.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}