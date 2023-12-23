<?php

namespace App\Services;

use App\Models\Customers;
use App\Models\Invoice;

class InvoiceService{

    public function getAllCustomerInvoices(Customers $customer){
        // Get the authenticated user
        $user = auth()->user();

        if ($user->id === $customer->user_id){
            $invoices = $customer->invoices()->get();
            return $invoices;
        }

        return response()->json([], 404);
    }



    public function addAllItems(Invoice $invoice){
        // Retrieve the total invoice amount for the specified customer
        return $invoice->items()->sum('cost');
    }
}