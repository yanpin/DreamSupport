<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = ['name', 'status', 'type', 'order', 'travel_id', 'remark', 'lat', 'lng', 'icon'];
}
