<?php

namespace App\Http\Controllers;

use App\Models\Condolence;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CondolenceController extends Controller
{
    public function getCondolences($deceased_id)
    {
        $condos = Condolence::select('id', 'condolence', 'condo_name', 'relationship', 'created_at')
            ->where("deceased_id", $deceased_id)
            ->orderBy("created_at", "DESC")
            ->get()
            ->map(function ($item) {
                $item->created = Carbon::parse($item->created_at)->diffForHumans();
                unset($item->created_at);
                return $item;
            });

        return response()->json($condos);
    }


    public function postCondolence(Request $request)
    {
        $data = [
            "deceased_id" => $request->deceased_id,
            "condolence" => $request->condolence,
            "condo_name" => $request->input("condo_name", null),
            "relationship" => $request->input("relationship", null),
        ];

        Condolence::firstOrCreate([$data, $data]);

        return response()->json("saved", 201);
    }

    public function removeCondolence($condolence_id)
    {
        Condolence::find($condolence_id)->delete();
        return response()->json("deleted", 201);
    }
}
