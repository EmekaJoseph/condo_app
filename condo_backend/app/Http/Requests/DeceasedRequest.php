<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeceasedRequest extends FormRequest
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
            // 'deceased' => 'required|string|unique:deceaseds',
            'deceased' => 'required|string',
            'birth_date' => 'required|date',
            'death_date' => 'required|date',
            'background_song' => 'nullable|string',
            'biography' => 'required|string',
            'life_history' => 'nullable|string',
        ];
    }
}
