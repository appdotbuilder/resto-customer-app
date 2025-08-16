import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Restaurant {
    id: number;
    name: string;
}

interface OrderItem {
    id: number;
    item_name: string;
    item_price: string;
    quantity: number;
    total_price: string;
}

interface Payment {
    id: number;
    status: string;
    payment_method: string;
}

interface Order {
    id: number;
    order_number: string;
    total_amount: string;
    status: string;
    created_at: string;
    restaurant: Restaurant;
    order_items: OrderItem[];
    payment: Payment | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

interface Props {
    orders: {
        data: Order[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

export default function CustomerOrdersIndex({ orders }: Props) {
    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            preparing: 'bg-blue-100 text-blue-800',
            ready: 'bg-green-100 text-green-800',
            delivered: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusEmoji = (status: string) => {
        const emojis = {
            pending: '⏳',
            preparing: '👨‍🍳',
            ready: '✅',
            delivered: '🎉',
            cancelled: '❌',
        };
        return emojis[status as keyof typeof emojis] || '📦';
    };

    return (
        <AppShell>
            <Head title="My Orders - RestaurantHub" />
            
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                🛒 My Orders
                            </h1>
                            <p className="text-gray-600">
                                Track your food orders and delivery status
                            </p>
                        </div>
                        <Link href="/orders/create">
                            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                ➕ Order Food
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Orders List */}
                {orders.data.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            You haven't placed any orders yet. Start by exploring restaurants and their delicious menus!
                        </p>
                        <Link href="/orders/create">
                            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                🍽️ Explore Restaurants
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.data.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {order.order_number}
                                                </h3>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                    {getStatusEmoji(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-sm space-x-4">
                                                <span>🏪 {order.restaurant.name}</span>
                                                <span>📅 {new Date(order.created_at).toLocaleDateString()}</span>
                                                <span>💰 ${parseFloat(order.total_amount).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {order.payment && (
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    order.payment.status === 'completed' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    💳 {order.payment.status}
                                                </span>
                                            )}
                                            <Link href={`/orders/${order.id}`}>
                                                <Button variant="outline" size="sm">
                                                    👁️ View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Order Items Preview */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {order.order_items.slice(0, 3).map((item) => (
                                                <div key={item.id} className="flex items-center space-x-3">
                                                    <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-medium text-orange-600">
                                                        {item.quantity}x
                                                    </span>
                                                    <div className="flex-grow min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {item.item_name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            ${parseFloat(item.total_price).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            {order.order_items.length > 3 && (
                                                <div className="flex items-center justify-center text-sm text-gray-500">
                                                    +{order.order_items.length - 3} more items
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {orders.data.length > 0 && orders.links && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex space-x-1">
                            {orders.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 text-sm rounded-lg ${
                                        link.active
                                            ? 'bg-blue-500 text-white'
                                            : link.url
                                            ? 'bg-white border text-gray-700 hover:bg-gray-50'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}