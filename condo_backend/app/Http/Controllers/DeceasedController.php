<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeceasedRequest;
use App\Models\Admin;
use App\Models\Deceased;
use App\Models\SurvivedBy;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeceasedController extends Controller
{
    private $dp_folder_name = 'deceased_dps';


    public function saveNew(DeceasedRequest $request): JsonResponse
    {
        $validatedData = $request->validated();
        $adminId = Auth::id();
        $displayPhoto = null;

        if (Deceased::where('deceased', $request->deceased)->where('admin_id', Auth::id())->exists()) {
            return response()->json('exists', 202);
        }

        if ($request->hasFile("display_photo")) {
            $image = $request->file("display_photo");
            $displayPhoto = HelperUploadImage($this->dp_folder_name, $image, 130, 130, 'dp-');
        }

        $birth_date = Carbon::parse($request->birth_date);
        $death_date = Carbon::parse($request->death_date);

        $deceased = Deceased::create(array_merge($validatedData, [
            "admin_id" => $adminId,
            "display_photo" => $displayPhoto,
            "birth_date" => $birth_date,
            "death_date" => $death_date,
            // 'age' => $birth_date->diffInYears($death_date)
        ]));

        Admin::find($adminId)->increment("deceased_uploads");

        $this->saveSurvivedBys($deceased->id, $request);

        return response()->json($deceased, 201);
    }

    public function uploadsList(Request $request)
    {
        if (Auth::user()->level != 1)
            $uploads = Deceased::with(['admin'])->where('admin_id', Auth::id())->sortByDesc('created_date')
                ->when($request->searchString, function ($query) use ($request) {
                    $query->where('deceased', 'LIKE', "%{$request->searchString}%");
                })

                ->paginate(15);
        else
            $uploads = Deceased::with(['admin'])
                ->when($request->searchString, function ($query) use ($request) {
                    $query->where('deceased', 'LIKE', "%{$request->searchString}%");
                })
                ->paginate(15);
        return response()->json($uploads, 201);
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
                    'survived_by' => $data->survived_by,
                    'relationship' => $data->relationship,
                    'age' => $data->age ?? null,
                ];

                SurvivedBy::create($toSave);
            }
        }
    }
}
