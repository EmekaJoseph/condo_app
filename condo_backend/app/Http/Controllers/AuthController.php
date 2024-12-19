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
            'name' => 'nullable|string',

        ]);

        // Check if email already exists
        $emailExists = Admin::where('email', $request->email)
            ->whereNotNull('email_verified_at')->exists();
        if ($emailExists) {
            return response()->json(['message' => 'This email already exists.'], 422);
        }

        // Create user if email doesn't exist
        $admin = Admin::create([
            'email' => $request->email,
            'name' => $request->name,
            'password' => Hash::make($request->input('password')),
        ]);

        // Generate API token and return response
        $token = $admin->createToken('my-api-token');

        $data = [
            'token' =>  $token->plainTextToken,
            'level' => '2'
        ];

        return response()->json($data, 201);
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            // Authenticated user, generate API token
            $token = $request->user()->createToken('my-api-token');
            $data = [
                'token' =>  $token->plainTextToken,
                'level' => $request->user()->level
            ];

            return response()->json($data, 200);
        } else {
            return response()->json(['message' => 'Invalid credentials.'], 401);
        }
    }


    public function profile()
    {
        $admin = Admin::find(Auth::id());
        return response()->json($admin, 200);
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
