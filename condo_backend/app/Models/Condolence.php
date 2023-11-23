<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Condolence extends Model
{
    use HasFactory, HasUlids;
    protected $guarded = ['id'];
    public $primaryKey = 'id';

    public function deceased()
    {
        return $this->belongsTo(Deceased::class);
    }
}
