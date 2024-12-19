<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminsListController extends Controller
{
    public function adminsList(Request $request)
    {
        $query = Admin::select('*');

        $users = $query->when($request->searchString, function ($query) use ($request) {
            $query->where('email', 'LIKE', "%{$request->searchString}%");
        })->orderByDesc('created_at')->paginate(15);

        return response()->json($users, 201);
    }


    public function deleteAdmin($id): JsonResponse
    {
        $user = Admin::find($id);
        $user->delete();
        return response()->json('Record deleted successfully', 200);
    }
}
