import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface MenuCategory {
    id: number;
    name: string;
    description: string | null;
}

interface MenuItem {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    price: string;
    stock: number;
    is_available: boolean;
    status: string;
    menu_category: MenuCategory;
}

interface Restaurant {
    id: number;
    name: string;
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
    menuItems: {
        data: MenuItem[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    categories: MenuCategory[];
    restaurant: Restaurant;
    [key: string]: unknown;
}

export default function MenuItemsIndex({ menuItems, categories, restaurant }: Props) {
    return (
        <AppShell>
            <Head title="Menu Management - RestaurantHub" />
            
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                📋 Menu Management
                            </h1>
                            <p className="text-gray-600">
                                Manage your restaurant's menu items for <strong>{restaurant.name}</strong>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/menu-categories/create">
                                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                    📂 Add Category
                                </Button>
                            </Link>
                            <Link href="/menu-items/create">
                                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                                    ➕ Add Menu Item
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Categories Overview */}
                {categories.length > 0 && (
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">📂</span>
                            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <div 
                                    key={category.id}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Menu Items Grid */}
                {menuItems.data.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">No Menu Items Yet</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Start building your menu by adding your first menu item. Don't forget to create categories to organize your items!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            {categories.length === 0 && (
                                <Link href="/menu-categories/create">
                                    <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                        📂 Create Category First
                                    </Button>
                                </Link>
                            )}
                            <Link href="/menu-items/create">
                                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                                    ➕ Add Your First Menu Item
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {menuItems.data.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                                <div className="relative">
                                    {item.image ? (
                                        <img 
                                            src={`/storage/${item.image}`}
                                            alt={item.name}
                                            className="w-full h-48 object-cover rounded-t-xl"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gradient-to-r from-orange-100 to-red-100 rounded-t-xl flex items-center justify-center">
                                            <span className="text-4xl">🍽️</span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        {!item.is_available && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                Unavailable
                                            </span>
                                        )}
                                        {item.stock === 0 && (
                                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                                        <span className="text-lg font-bold text-orange-600">
                                            ${parseFloat(item.price).toFixed(2)}
                                        </span>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                            {item.menu_category.name}
                                        </span>
                                    </div>
                                    
                                    {item.description && (
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}
                                    
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm text-gray-500">
                                            Stock: {item.stock}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            item.status === 'active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <Link href={`/menu-items/${item.id}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full">
                                                👁️ View
                                            </Button>
                                        </Link>
                                        <Link href={`/menu-items/${item.id}/edit`} className="flex-1">
                                            <Button size="sm" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                                                ✏️ Edit
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {menuItems.data.length > 0 && menuItems.links && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex space-x-1">
                            {menuItems.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 text-sm rounded-lg ${
                                        link.active
                                            ? 'bg-orange-500 text-white'
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