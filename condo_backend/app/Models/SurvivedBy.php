<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurvivedBy extends Model
{
    use HasFactory, HasUlids;
    protected $table = 'survived_bys';
    protected $guarded = ['id'];
    public $primaryKey = 'id';

    public function deceased()
    {
        return $this->belongsTo(Deceased::class);
    }
}
