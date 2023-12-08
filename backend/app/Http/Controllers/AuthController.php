<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(){
        return 'this is the login api';
    }

    public function register(UserStoreRequest $request){
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
