<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the restaurants for the user.
     */
    public function restaurants(): HasMany
    {
        return $this->hasMany(\App\Models\Restaurant::class);
    }

    /**
     * Get the orders for the user (as customer).
     */
    public function orders(): HasMany
    {
        return $this->hasMany(\App\Models\Order::class, 'customer_id');
    }

    /**
     * Get the reservations for the user (as customer).
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(\App\Models\Reservation::class, 'customer_id');
    }

    /**
     * Get the payments for the user (as customer).
     */
    public function payments(): HasMany
    {
        return $this->hasMany(\App\Models\Payment::class, 'customer_id');
    }
}
