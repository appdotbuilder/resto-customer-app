<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'reservation_date' => 'required|date|after_or_equal:today',
            'reservation_time' => 'required|date_format:H:i',
            'guest_count' => 'required|integer|min:1|max:20',
            'special_requests' => 'nullable|string',
            'status' => 'in:pending,confirmed,cancelled,completed',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'customer_name.required' => 'Customer name is required.',
            'customer_email.required' => 'Email address is required.',
            'customer_email.email' => 'Please provide a valid email address.',
            'reservation_date.required' => 'Reservation date is required.',
            'reservation_date.after_or_equal' => 'Reservation date must be today or a future date.',
            'reservation_time.required' => 'Reservation time is required.',
            'reservation_time.date_format' => 'Reservation time must be in HH:MM format.',
            'guest_count.required' => 'Number of guests is required.',
            'guest_count.min' => 'At least 1 guest is required.',
            'guest_count.max' => 'Maximum 20 guests allowed.',
        ];
    }
}