<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomersRequest;
use App\Http\Requests\UpdateCustomersRequest;
use App\Http\Resources\CustomersResource;
use App\Models\Customers;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
    public function __construct()
    {   
        $this->authorizeResource(Customers::class, ['customer', 'user']);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $userCustomers = $user->customers()->get();
        
        return CustomersResource::collection($userCustomers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomersRequest $request)
    {
        $customer = Customers::create($request->validated());
        return CustomersResource::make($customer);

    }

    /**
     * Display the specified resource.
     */
    public function show(Customers $customer)
    {
        $user = auth()->user();
        if ($user->can('view', $customer)){
            
            return CustomersResource::make($customer);
        }
        
        return abort(404);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomersRequest $request, Customers $customer)
    {
        $user = auth()->user();

        if ($user->can('update', $customer)){
            $customer->update($request->validated());
            return CustomersResource::make($customer);
        }
        return abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customers $customer)
    {
        $user = auth()->user();
        if ($user->can('delete', $customer)){
            $customer->delete();
            return response()->noContent();
        }

        return abort(404);

    }
}
