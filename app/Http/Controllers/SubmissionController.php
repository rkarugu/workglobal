<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Submission;
use App\Http\Resources\SubmissionResource;
use App\Mail\SubmissionStatusUpdated;
use Illuminate\Support\Facades\Mail;

class SubmissionController extends Controller
{
    public function index()
    {
        $submissions = Submission::orderBy('id', 'asc')->get();
        $resourceCollection = SubmissionResource::collection($submissions);
        return response()->json($resourceCollection->resolve());
    }

    public function create()
    {
        return view('apply');
    }

    public function store(Request $request)
    {
        // When submitted via React, non-file fields arrive as a JSON string under `formData`.
        // Map React field names to Laravel expected ones
        $possibleName = $request->input('full_name') ?? $request->input('name') ?? $request->input('fullName');
        if (!$request->has('full_name') && $possibleName) {
            $request->merge(['full_name' => $possibleName]);
        }

        if ($request->has('formData')) {
            $decoded = json_decode($request->input('formData'), true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                // Merge decoded values into the request for validation.
                $request->merge($decoded);

                // Map front-end field names to backend column names
                $fieldMap = [
                    'dateOfBirth'       => 'date_of_birth',
                    'address'           => 'address_line',
                    'zipCode'           => 'zip',
                    'position'          => 'desired_position',
                    'experience'        => 'years_experience',
                    'education'         => 'education_level',
                    'certifications'    => 'certifications_text',
                    'employmentHistory' => 'employment_history',
                    'references'        => 'references_text',
                ];

                foreach ($fieldMap as $frontKey => $backKey) {
                    if (!$request->has($backKey) && $request->has($frontKey)) {
                        $request->merge([$backKey => $request->input($frontKey)]);
                    }
                }
            }
        }

        // Re-run mapping after potential JSON decode
        $possibleName = $request->input('full_name') ?? $request->input('name') ?? $request->input('fullName');
        if (!$request->has('full_name') && $possibleName) {
            $request->merge(['full_name' => $possibleName]);
        }

        // Build validator manually so we can control error responses
        $validator = Validator::make($request->all(), [
            'full_name'         => 'required|string|max:255',
            'email'             => 'required|email|max:255',
            'phone'             => 'nullable|string|max:50',
            'date_of_birth'     => 'nullable|date',
            'gender'            => 'nullable|string|max:20',
            'nationality'       => 'nullable|string|max:100',
            'address_line'      => 'nullable|string|max:255',
            'city'              => 'nullable|string|max:100',
            'state'             => 'nullable|string|max:100',
            'zip'               => 'nullable|string|max:20',
            'desired_position'  => 'nullable|string|max:255',
            'years_experience'  => 'nullable|integer|min:0',
            'education_level'   => 'nullable|string|max:255',
            'certifications_text'=> 'nullable|string',
            'employment_history'=> 'nullable|string',
            'references_text'   => 'nullable|string',
            // files
            'resume'            => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'idCopy'            => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'certification'     => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        // Handle file uploads
        $resumePath = $idCopyPath = $certPath = null;
        if ($request->hasFile('resume')) {
            $resumePath = $request->file('resume')->store('uploads', 'public');
        }
        if ($request->hasFile('idCopy')) {
            $idCopyPath = $request->file('idCopy')->store('uploads', 'public');
        }
        if ($request->hasFile('certification')) {
            $certPath = $request->file('certification')->store('uploads', 'public');
        }

        $submission = Submission::create([
            'full_name'          => $validated['full_name'],
            'email'              => $validated['email'],
            'phone'              => $validated['phone'] ?? null,
            'resume_path'        => $resumePath,
            'id_copy_path'       => $idCopyPath,
            'certification_path' => $certPath,
            'date_of_birth'      => $validated['date_of_birth'] ?? null,
            'gender'             => $validated['gender'] ?? null,
            'nationality'        => $validated['nationality'] ?? null,
            'address_line'       => $validated['address_line'] ?? null,
            'city'               => $validated['city'] ?? null,
            'state'              => $validated['state'] ?? null,
            'zip'                => $validated['zip'] ?? null,
            'desired_position'   => $validated['desired_position'] ?? null,
            'years_experience'   => $validated['years_experience'] ?? null,
            'education_level'    => $validated['education_level'] ?? null,
            'certifications_text'=> $validated['certifications_text'] ?? null,
            'employment_history' => $validated['employment_history'] ?? null,
            'references_text'    => $validated['references_text'] ?? null,
        ]);

        // If the request expects JSON (API), return JSON; otherwise redirect.
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json(['success' => true, 'message' => 'Application submitted successfully.']);
        }

        return redirect()->route('apply.form')->with('success', 'Application submitted successfully!');
    }

    public function show(Submission $submission)
    {
        return new SubmissionResource($submission);
    }

    public function approve(Submission $submission)
    {
        $submission->status = 'APPROVED';
        $submission->save();

        Mail::to($submission->email)->send(new SubmissionStatusUpdated($submission, 'APPROVED'));

        return new SubmissionResource($submission);
    }

    public function reject(Submission $submission)
    {
        $submission->status = 'REJECTED';
        $submission->save();

        Mail::to($submission->email)->send(new SubmissionStatusUpdated($submission, 'REJECTED'));

        return new SubmissionResource($submission);
    }
}
