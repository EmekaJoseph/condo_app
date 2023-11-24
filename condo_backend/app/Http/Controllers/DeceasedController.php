<?php

namespace App\Http\Controllers;

use App\Models\Deceased;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeceasedController extends Controller
{


    public function store(Request $request): JsonResponse
    {
        /*
    admin_id,
    deceased,
    birth_date,
    death_date,
    display_photo,
    background_song,
    biography,
    life_history?,
    */
        return response()->json(0);
    }


    public function search($string): JsonResponse
    {
        $query = Deceased::select(
            'id',
            'deceased',
            'display_photo',
            'birth_date',
            'death_date'
        )->where('deceased', 'LIKE', "%{$string}%")->get();
        return response()->json($query, 200);
    }

    public function details($id): JsonResponse
    {
        $query = Deceased::with('photos')->where('id', $id)->get();
        return response()->json($query, 200);
    }

    public function deleteRecord($id): JsonResponse
    {
        $deceased = Deceased::find($id);
        $deceased->photos()->delete();
        $deceased->condolences()->delete();
        $deceased->delete();
        return response()->json('Record deleted successfully', 200);
    }
}
