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

        return CustomersResource::collection(Customers::all());
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

        return CustomersResource::make($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomersRequest $request, Customers $customer)
    {
        $customer->update($request->validated());
        return CustomersResource::make($customer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customers $customer)
    {
        $customer->delete();
        return response()->noContent();
    }
}
