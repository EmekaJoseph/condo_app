<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeceasedRequest;
use App\Models\Admin;
use App\Models\Deceased;
use App\Models\SurvivedBy;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class DeceasedController extends Controller
{
    private $dp_folder_name = 'deceased_dps';


    public function saveNew(DeceasedRequest $request): JsonResponse
    {
        $validatedData = $request->validated();
        $adminId = Auth::id();
        $displayPhoto = null;

        if ($request->hasFile("display_photo")) {
            $image = $request->file("display_photo");
            $displayPhoto = HelperUploadImage($this->dp_folder_name, $image, 130, 130, 'dp-');
        }

        $deceased = Deceased::create(array_merge($validatedData, [
            "admin_id" => $adminId,
            "display_photo" => $displayPhoto,
        ]));

        Admin::find($adminId)->increment("deceased_uploads");

        $this->saveSurvivedBys($deceased->id, $request);

        return response()->json($deceased, 201);
    }


    public function update(DeceasedRequest $request, $id): JsonResponse
    {

        $deceased = Deceased::find($id);

        $dataToUpdate = $request->validated();

        if ($request->hasFile("display_photo")) {
            HelperUnlinkFile($this->dp_folder_name, $deceased->display_photo);

            $dataToUpdate = array_merge(
                $request->validated(),
                ['display_photo' =>  HelperUploadImage($this->dp_folder_name, $request->file("display_photo"), 130, 130, 'dp-')]
            );
        }

        $deceased->update($dataToUpdate);

        $deceased->survivedBys()->delete();
        $this->saveSurvivedBys($deceased->id, $request);

        return response()->json(['status' => 'success', 'message' => "Record updated!"], 200);
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

    public function recents(): JsonResponse
    {
        $query = Deceased::select(
            'id',
            'deceased',
            'display_photo',
            'birth_date',
            'death_date',
            'created_at'
        )->orderBy('created_at', 'DESC')->limit(6)->get();
        return response()->json($query, 200);
    }

    public function details($id): JsonResponse
    {
        $query = Deceased::with('gallery', 'survivedBys')->find($id);
        return response()->json($query, 200);
    }

    public function deleteRecord($id): JsonResponse
    {
        $deceased = Deceased::find($id);
        $deceased->gallery()->delete();
        $deceased->condolences()->delete();
        $deceased->survivedBys()->delete();
        HelperUnlinkFile($this->dp_folder_name, $deceased->display_photo);
        $deceased->delete();

        return response()->json('Record deleted successfully', 200);
    }

    public function saveSurvivedBys($deceased_id, $request)
    {
        if ($request->survivedBys) {
            $decoded = json_decode($request->survivedBys);

            foreach ($decoded as $data) {
                $toSave = [
                    'deceased_id' => $deceased_id,
                    'survived_by' => $data->survived_by ?? null,
                    'relationship' => $data->relationship ?? null,
                    'age' => $data->age ?? null,
                ];

                SurvivedBy::create($toSave);
            }
        }
    }
}
