<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'create_user',
        'update_user',
        'category',
        'amount',
        'date',
        'store_name',
        'group_id',
        'is_private',
    ];

    protected $guarded = [
        'created_at',
        'updated_at',
    ];
}
