<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */


    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'resume_path',
        'id_copy_path',
        'certification_path',
        'date_of_birth',
        'gender',
        'nationality',
        'address_line',
        'city',
        'state',
        'zip',
        'desired_position',
        'years_experience',
        'education_level',
        'certifications_text',
        'employment_history',
        'references_text',
        'status',
    ];


}

