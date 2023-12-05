<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    private $gal_folder = 'galleries';


    public function index(Request $request)
    {
    }
    public function store(Request $request)
    {
        $request->validate([
            'images' => 'required',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($request->hasfile('images')) {
            foreach ($request->file('images') as $image) {
                $data[] =  HelperUploadImage($this->gal_folder, $image, 200, 200, 'gal-');
            }
        }

        $image = new Gallery();
        $image->image_path = json_encode($data);
        $image->save();

        return response()->json(['success' => 'Images uploaded successfully']);
    }


    public function update(Request $request, $id)
    {
    }
    public function destroy($id)
    {
    }
}
