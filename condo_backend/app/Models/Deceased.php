<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Deceased extends Model
{
    use HasFactory, HasUlids, SoftDeletes;
    protected $guarded = ['id'];
    public $primaryKey = 'id';

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function gallery()
    {
        return $this->hasMany(Gallery::class);
    }

    public function condolences()
    {
        return $this->hasMany(Condolence::class);
    }

    public function survivedBys()
    {
        return $this->hasMany(SurvivedBy::class);
    }
}
