<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
        ]);

        // Check if email already exists
        if (Admin::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'Email already exists.'], 422);
        }

        // Create user if email doesn't exist
        $admin = Admin::create([
            'email' => $request->email,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'phone' => $request->input('phone', null),
            'password' => Hash::make($request->input('password')),
        ]);

        // Generate API token and return response
        $token = $admin->createToken('my-api-token');

        return response()->json(['access_token' => $token->plainTextToken], 201);
    }



    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authenticated user, generate API token
            $token = $request->user()->createToken('my-api-token');

            return response()->json(['access_token' => $token->plainTextToken], 200);
        } else {
            return response()->json(['message' => 'Invalid credentials.'], 401);
        }
    }


    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string|min:6',
            'new_password' => 'required|string|min:6',
        ]);

        $user = Admin::find(Auth::id());

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect.'], 401);
        }

        if (strcmp($request->get('current_password'), $request->get('new_password')) == 0) {
            return response()->json(['message' => 'New password cannot be the same as the current password.'], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password successfully changed.'], 200);
    }


    public function logout(Request $request)
    {
        // $request->user()->tokens()->delete();
        $request->user()->currentAccessToken()->delete();

        return response()->json('Successfully logged out', 200);
    }
}
