<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomersRequest;
use App\Http\Requests\UpdateCustomersRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customers;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CustomerResource::collection(Customers::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomersRequest $request)
    {
        $customer = Customers::create($request->validated());
        return CustomerResource::make($customer);

    }

    /**
     * Display the specified resource.
     */
    public function show(Customers $customers)
    {
        return CustomerResource::make($customers);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomersRequest $request, Customers $customers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customers $customers)
    {
        //
    }
}
