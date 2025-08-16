<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\MenuCategory
 *
 * @property int $id
 * @property int $restaurant_id
 * @property string $name
 * @property string|null $description
 * @property int $sort_order
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Restaurant $restaurant
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MenuItem> $menuItems
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MenuCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuCategory active()
 * @method static \Database\Factories\MenuCategoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MenuCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'restaurant_id',
        'name',
        'description',
        'sort_order',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the restaurant that owns the menu category.
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Get the menu items for the category.
     */
    public function menuItems(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }

    /**
     * Scope a query to only include active categories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}