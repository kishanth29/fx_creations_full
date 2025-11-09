<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\BookingServiceController;

// ------------------------
// Public Routes (no auth)
Route::get('/albums-with-images', [AlbumController::class, 'getAlbumsWithImages']);
// ------------------------

// Webhook route
Route::post('/webhook', [WebhookController::class, 'handle']);

// Contact form routes
Route::apiResource('contacts', ContactController::class);
Route::put('/contacts/{id}/status', [ContactController::class, 'updateStatus']);

// User registration & login
Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);

// Public videos for homepage (no token)
Route::get('/public/videos', [VideoController::class, 'publicIndex']);

// Public service list (optional, if services are public)
Route::get('/services', [BookingServiceController::class, 'index']);

// ------------------------
// Protected Routes (require Sanctum token)
// ------------------------
Route::middleware('auth:sanctum')->group(function () {

    // Get authenticated user info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Logout
    Route::post('/logout', [UserController::class, 'logout']);

    // Bookings CRUD
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::put('/bookings/{id}', [BookingController::class, 'update']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);

    // Video CRUD (admin)
    Route::apiResource('videos', VideoController::class);

    // Albums CRUD
    Route::post('/albums', [AlbumController::class, 'store']);
    Route::get('/albums', [AlbumController::class, 'index']);
    Route::get('/albums/images', [AlbumController::class, 'getAllAlbumImages']);
    Route::get('/albums/{id}', [AlbumController::class, 'show']);
    Route::delete('/albums/{id}', [AlbumController::class, 'destroy']);
    Route::put('/albums/{id}', [AlbumController::class, 'update']);
    Route::post('/albums/{id}/upload-image', [AlbumController::class, 'uploadToAlbum']);
    Route::get('/albums/{id}/image', [AlbumController::class, 'getImageInalbum']);
    Route::put('/albums/images/{imageId}', [AlbumController::class, 'updateImage']);
    Route::delete('/albums/images/{imageId}', [AlbumController::class, 'destroyImage']);



    // Services CRUD (admin)
    Route::post('/services', [BookingServiceController::class, 'store']);
    Route::put('/services/{bookingService}', [BookingServiceController::class, 'update']);
    Route::delete('/services/{bookingService}', [BookingServiceController::class, 'destroy']);
});
