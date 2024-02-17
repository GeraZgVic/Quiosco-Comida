<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegistroRequest;

class AuthController extends Controller
{
    public function register(RegistroRequest $request){
        // Validar el registro
        $data = $request->validated();

        // Crear un usuario
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);


        // Retornar una respuesta
        return [
            'token' => $user->createToken('tokenUser')->plainTextToken,
            'user' => $user
        ];
        
        
    }
    public function login(LoginRequest $request){
        // Validar login
        $data = $request->validated();

        // Revisar las credenciales
        if(!Auth::attempt($data)) {
            return response([
                'errors' => ['El email o el password son incorrectos']
            ],422);
        }

        // Autenticar al usuario via token personal sanctum
        $user = Auth::user(); // Retorna la informacion del usuario

        return [
            'token' => $user->createToken('tokenUser')->plainTextToken,
            'user' => $user // se retorna el usuario para saber quien inicia session
        ];

    }

    
    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return [
            'user' => null
        ];
    }
}
