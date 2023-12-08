<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request){
        $credentials = $request->only('email', 'password');

        if(!Auth::attempt($credentials)){
            return $this->error('',"Credentials dont match", 401);
        }
        
        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user'=> $user,
            'token'=> $user->createToken('Api Token of user')->plainTextToken
        ]);
    }

    public function register(StoreUserRequest $request){
        $request->validated($request->all());
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=> Hash::make($request->password)
        ]);
        
        return $this->success([
            'user'=> $user,
            'token' => $user->createToken('API token')->plainTextToken
        ]);
    }

    public function logout(){
        return 'this is the logout api';
    }
}
