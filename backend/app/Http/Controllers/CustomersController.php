<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomersRequest;
use App\Http\Requests\UpdateCustomersRequest;
use App\Http\Resources\CustomersResource;
use App\Models\Customers;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
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
        $userCustomer = $user->customers()->find($customer->id);

        return CustomersResource::make($userCustomer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomersRequest $request, Customers $customer)
    {
        $user = auth()->user();
        $userCustomer = $user->customers()->find($customer->id);

        $userCustomer->update($request->validated());
        return CustomersResource::make($userCustomer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customers $customer)
    {
        $user = auth()->user();
        $userCustomer = $user->customers()->find($customer->id);
        $userCustomer->delete();
        return response()->noContent();
    }
}
