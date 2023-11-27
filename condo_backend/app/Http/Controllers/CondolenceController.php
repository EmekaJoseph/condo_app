<?php

namespace App\Http\Controllers;

use App\Models\Condolence;
use Illuminate\Http\Request;

class CondolenceController extends Controller
{
    public function getCondolences($deceased_id)
    {
        $condos = Condolence::select('id', 'condolence', 'condo_name', 'relationship', 'created_at')
            ->where("deceased_id", $deceased_id)
            ->orderBy("created_at", "DESC")
            ->get();

        return response()->json($condos);
    }


    public function postCondolence(Request $request)
    {
        $data = [
            "deceased_id" => $request->deceased_id,
            "condolence" => $request->condolence,
            "condo_name" => $request->condo_name,
            "relationship" => $request->relationship
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
