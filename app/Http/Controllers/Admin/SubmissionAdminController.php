<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\SubmissionReviewed;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SubmissionAdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of submissions.
     */
    public function index(Request $request): View
    {
        $status = $request->query('status');
        $query = Submission::query()->latest();
        if ($status) {
            $query->where('status', $status);
        }
        $submissions = $query->paginate(20)->withQueryString();

        return view('admin.submissions.index', compact('submissions', 'status'));
    }

    /**
     * Approve a submission.
     */
    public function approve(Submission $submission): RedirectResponse
    {
        $submission->update(['status' => 'APPROVED']);

        // Send notification email
        $reviewer = auth()->user()->name ?? 'Administrator';
        Mail::to($submission->email)->send(new SubmissionReviewed($submission, $reviewer));

        return back()->with('success', 'Submission approved and applicant notified.');
    }

    /**
     * Reject a submission.
     */
    /**
     * Display the submission details page.
     */
    public function show(Submission $submission): View
    {
        return view('admin.submissions.show', compact('submission'));
    }

    /**
     * Stream the applicant's resume.
     */
    public function resume(Submission $submission)
    {
        if (!$submission->resume_path) {
            abort(404);
        }
        $path = storage_path('app/public/' . $submission->resume_path);
        if (!file_exists($path)) {
            abort(404);
        }
        return response()->file($path);
    }

    public function reject(Submission $submission): RedirectResponse
    {
        $submission->update(['status' => 'REJECTED']);
        // TODO: dispatch email notification
        return back()->with('success', 'Submission rejected.');
    }
}
