<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubmissionResource extends JsonResource
{
    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // The frontend modal expects an array for certification paths.
        $certPaths = $this->certification_path ? [asset('storage/' . $this->certification_path)] : [];

        return [
            'id' => $this->id,
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),

            // Provide full, absolute URLs for documents
            'resumePath' => $this->resume_path ? asset('storage/' . $this->resume_path) : null,
            'idCopyPath' => $this->id_copy_path ? asset('storage/' . $this->id_copy_path) : null,
            'certPaths' => $certPaths,

            // Nested object for the frontend modal's main display loop.
            // Keys are camelCase, which the frontend will format into titles.
            'formData' => [
                'fullName' => $this->full_name,
                'email' => $this->email,
                'phone' => $this->phone,
                'dateOfBirth' => $this->date_of_birth,
                'gender' => $this->gender,
                'nationality' => $this->nationality,
                'address' => $this->address_line,
                'city' => $this->city,
                'state' => $this->state,
                'zipCode' => $this->zip,
                'desiredPosition' => $this->desired_position,
                'yearsExperience' => $this->years_experience,
                'educationLevel' => $this->education_level,
                'certifications' => $this->certifications_text,
                'employmentHistory' => $this->employment_history,
                'references' => $this->references_text,
            ],
        ];
    }
}
