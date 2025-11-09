<?php

namespace App\Http\Controllers;

use App\Models\BookingService;
use App\Models\BookingImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookingServiceController extends Controller
{
    public function index()
    {
        return BookingService::with('images')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'type' => 'required',
            'date' => 'required',
            'time' => 'required',
            'images.*' => 'required|image|max:2048'
        ]);

        $service = BookingService::create($request->only(['name', 'price', 'type', 'date', 'time']));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Destination = frontend/public/uploads/booking_services
                $destinationPath = base_path('../frontend/public/uploads/booking_services');

                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }

                $fileName = time() . '_' . $image->getClientOriginalName();
                $image->move($destinationPath, $fileName);

                BookingImage::create([
                    'booking_service_id' => $service->id,
                    'image_path' => 'uploads/booking_services/' . $fileName, // relative path for frontend
                ]);
            }
        }

        return response()->json(['message' => 'Service created']);
    }

    public function update(Request $request, BookingService $bookingService)
    {
        $bookingService->update($request->only(['name', 'price', 'type', 'date', 'time']));

        if ($request->hasFile('images')) {
            // delete old images
            foreach ($bookingService->images as $img) {
                $filePath = base_path('../frontend/public/' . $img->image_path);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
                $img->delete();
            }

            // upload new images
            foreach ($request->file('images') as $image) {
                $destinationPath = base_path('../frontend/public/uploads/booking_services');

                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }

                $fileName = time() . '_' . $image->getClientOriginalName();
                $image->move($destinationPath, $fileName);

                BookingImage::create([
                    'booking_service_id' => $bookingService->id,
                    'image_path' => 'uploads/booking_services/' . $fileName,
                ]);
            }
        }

        return response()->json(['message' => 'Service updated']);
    }

    public function destroy(BookingService $bookingService)
    {
        foreach ($bookingService->images as $img) {
            Storage::disk('public')->delete($img->image_path);
            $img->delete();
        }

        $bookingService->delete();

        return response()->json(['message' => 'Service deleted']);
    }
}

