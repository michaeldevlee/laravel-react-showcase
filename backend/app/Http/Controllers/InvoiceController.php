<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Customers;
use App\Models\Invoice;

class InvoiceController extends Controller
{
    public function __construct()
    {   
        $this->authorizeResource(Invoice::class, ['invoice', 'customer', 'user']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Customers $customer)
    {
        
        $user = auth()->user();
        if ($user->can('view', $customer)){
            return InvoiceResource::collection($customer->invoices()->get());
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {
        $invoice = Invoice::create($request->validated());
        return InvoiceResource::make($invoice);
    }

    /**
     * Display the specified resource.
     */
    public function show(Customers $customer, Invoice $invoice)
    {
        $user = auth()->user();
        if ($user->id === $customer->user_id && $customer->id === $invoice->customers_id){
            return InvoiceResource::make($invoice);
        }

        return abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Customers $customer, Invoice $invoice)
    {
        $user = auth()->user();
        if ($user->id === $customer->user_id && $customer->id === $invoice->customers_id){
            $invoice->update($request->validated());
            return InvoiceResource::make($invoice);
        }

        return abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customers $customer, Invoice $invoice)
    {
        $user = auth()->user();
        if ($user->id === $customer->user_id && $customer->id === $invoice->customers_id){
            $invoice->delete();
            return response()->noContent();
        }

        return abort(404);
    }
}
