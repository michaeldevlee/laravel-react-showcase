<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = ['cost', 'customers_id'];

    public function customer() {
        return $this->belongsTo(Customers::class);
    }

    public function items(){
        return $this->hasMany(Item::class);
    }
}
