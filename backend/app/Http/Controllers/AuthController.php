<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(){
        return 'this is the login api';
    }

    public function register(){
        return 'this is the register api';
    }

    public function logout(){
        return 'this is the register api';
    }
}
