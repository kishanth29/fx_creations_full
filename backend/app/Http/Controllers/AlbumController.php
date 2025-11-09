<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewAdvertise;
use App\Models\AlbumImage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AlbumController extends Controller
{

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'images' => 'required|array|min:1',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:20480',
            ]);

            $images = $request->file('images');

            if (!$images || count($images) === 0) {
                return response()->json(['error' => 'No images uploaded'], 400);
            }

            // Save preview image
            $previewPath = $images[0]->store('album_images', 'public');
            $previewUrl = asset('storage/' . $previewPath);

            $album = NewAdvertise::create([
                'name' => $request->name,
                'preview_image' => $previewUrl,
            ]);

            // Save all images
            foreach ($images as $image) {
                $path = $image->store('album_images', 'public');
                $url = asset('storage/' . $path);

                AlbumImage::create([
                    'album_id' => $album->id,
                    'image_path' => $url,
                ]);
            }

            return response()->json(['message' => 'Album created successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function uploadToAlbum(Request $request, $id)
    {
        $request->validate([
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:20480',
        ]);

        $album = NewAdvertise::findOrFail($id);
        $images = $request->file('images');

        foreach ($images as $image) {
            $path = $image->store('album_images', 'public');
            $url = asset('storage/' . $path);

            AlbumImage::create([
                'album_id' => $album->id,
                'image_path' => $url,
            ]);
        }

        return response()->json(['message' => 'Images uploaded to album']);
    }

    public function getAllAlbumImages()
    {
        $allImages = AlbumImage::all();

        return response()->json([
            'status' => 'success',
            'data' => $allImages,
        ]);
    }

    public function getImageInalbum($id)
    {
        try {
            $album = NewAdvertise::findOrFail($id);

            $images = AlbumImage::where('album_id', $id)
                ->select('id', 'image_path')
                ->get();

            return response()->json([
                'album_id' => $id,
                'images' => $images
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch images',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        return NewAdvertise::with('images')->get();
    }

    public function show($id)
    {
        return NewAdvertise::with('images')->findOrFail($id);
    }

    public function destroy($id)
    {
        try {
            $album = NewAdvertise::findOrFail($id);

            foreach ($album->images as $image) {
                $this->deleteFileFromStorage($image->image_path);
                $image->delete();
            }

            $this->deleteFileFromStorage($album->preview_image);

            $album->delete();

            return response()->json(['message' => 'Album deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete album', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroyImage($imageId)
    {
        try {
            $image = AlbumImage::findOrFail($imageId);

            $this->deleteFileFromStorage($image->image_path);

            $image->delete();

            return response()->json(['message' => 'Image deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete image', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $album = NewAdvertise::findOrFail($id);

            $request->validate([
                'name' => 'sometimes|string|max:255',
                'preview_image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:20480',
                'images' => 'sometimes|array',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:20480',
                'removed_images' => 'sometimes|array',
                'removed_images.*' => 'integer|exists:album_images,id',
            ]);

            if ($request->has('name')) {
                $album->name = $request->name;
            }

            if ($request->hasFile('preview_image')) {
                $this->deleteFileFromStorage($album->preview_image);

                $previewPath = $request->file('preview_image')->store('album_images', 'public');
                $album->preview_image = asset('storage/' . $previewPath);
            }

            $album->save();

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('album_images', 'public');
                    $url = asset('storage/' . $path);

                    AlbumImage::create([
                        'album_id' => $album->id,
                        'image_path' => $url,
                    ]);
                }
            }

            if ($request->has('removed_images')) {
                foreach ($request->removed_images as $imageId) {
                    $image = AlbumImage::find($imageId);
                    if ($image) {
                        $this->deleteFileFromStorage($image->image_path);
                        $image->delete();
                    }
                }
            }

            return response()->json(['message' => 'Album updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update album', 'message' => $e->getMessage()], 500);
        }
    }

    public function updateImage(Request $request, $imageId)
    {
        Log::info('Files:', $request->allFiles());
        Log::info('Has file: ' . ($request->hasFile('image') ? 'true' : 'false'));

        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:20480',
            ]);

            $imageModel = AlbumImage::findOrFail($imageId);

            $this->deleteFileFromStorage($imageModel->image_path);

            $newPath = $request->file('image')->store('album_images', 'public');
            $imageModel->image_path = asset('storage/' . $newPath);
            $imageModel->save();

            return response()->json(['message' => 'Image updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update image', 'message' => $e->getMessage()], 500);
        }
    }

    private function deleteFileFromStorage($url)
    {
        $relativePath = str_replace(asset('storage/'), '', $url);
        Storage::disk('public')->delete($relativePath);
    }
}
