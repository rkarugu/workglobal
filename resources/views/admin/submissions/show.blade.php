<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Submission Details') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200 space-y-6">
                    <div>
                        <h3 class="text-lg font-medium text-gray-900">Applicant Info</h3>
                        

<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>
                                <span class="font-semibold">Full Name:</span>
                                <span>{{ $submission->full_name }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Email:</span>
                                <span>{{ $submission->email }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Phone:</span>
                                <span>{{ $submission->phone ?? '-' }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Status:</span>
                                <span>{{ $submission->status }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Nationality:</span>
                                <span>{{ $submission->nationality ?? '-' }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Date of Birth:</span>
                                <span>{{ $submission->date_of_birth ?? '-' }}</span>
                            </div>
                            <div class="md:col-span-2">
                                <span class="font-semibold">Address:</span>
                                <span>{{ $submission->address_line ?? '-' }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">City:</span>
                                <span>{{ $submission->city ?? '-' }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">State:</span>
                                <span>{{ $submission->state ?? '-' }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">ZIP:</span>
                                <span>{{ $submission->zip ?? '-' }}</span>
                            </div>
                            <div class="md:col-span-2">
                                <span class="font-semibold">Desired Position:</span>
                                <span>{{ $submission->desired_position ?? '-' }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Years Experience:</span>
                                <span>{{ $submission->years_experience ?? '-' }}</span>
                            </div>
                            <div class="md:col-span-2">
                                <span class="font-semibold">Highest Education Level:</span>
                                <span>{{ $submission->education_level ?? '-' }}</span>
                            </div>
                            <div class="md:col-span-2">
                                <span class="font-semibold">Certifications (text):</span>
                                <span>{{ $submission->certifications_text ?? '-' }}</span>
                            </div>
                            <div class="md:col-span-2">
                                <span class="font-semibold">Employment History:</span>
                                <span>{{ $submission->employment_history ?? '-' }}</span>
                            </div>
                            <div class="md:col-span-2">
                                <span class="font-semibold">References:</span>
                                <span>{{ $submission->references_text ?? '-' }}</span>
                            </div>
                            <div class="md:col-span-2">
                                <span class="font-semibold">Submitted At:</span>
                                <span>{{ $submission->created_at->format('d M Y, H:i') }}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Resume</h3>
                        @if($submission->resume_path)
                            <a href="{{ route('admin.submissions.resume', $submission) }}" target="_blank" class="text-indigo-600 hover:underline">Download Resume</a>

                            @php $isPdf = \Illuminate\Support\Str::endsWith(strtolower($submission->resume_path), '.pdf'); @endphp
                            @if($isPdf)
                                <div class="mt-4 border rounded" style="height:700px">
                                    <iframe src="{{ route('admin.submissions.resume', $submission) }}" style="width:100%;height:100%" frameborder="0"></iframe>
                                </div>
                            @endif
                        @else
                            <p>-</p>
                        @endif
                    </div>

                    <div class="border-t pt-6 space-y-4">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Additional Attachments</h3>
                        <ul class="list-disc list-inside space-y-2 text-sm">
                            @foreach (['ID/Passport' => $submission->id_copy_path, 'Certification' => $submission->certification_path] as $label => $path)
                                @if($path)
                                    <li>
                                        <span class="font-semibold">{{ $label }}:</span>
                                        <a href="{{ asset('storage/'.$path) }}" target="_blank" class="text-indigo-600 hover:underline">Download</a>
                                        @php $isPdf = \Illuminate\Support\Str::endsWith(strtolower($path), '.pdf'); @endphp
                                        @if($isPdf)
                                            <div class="mt-2 border rounded" style="height:500px">
                                                <iframe src="{{ asset('storage/'.$path) }}" style="width:100%;height:100%" frameborder="0"></iframe>
                                            </div>
                                        @endif
                                    </li>
                                @endif
                            @endforeach
                        </ul>
                    </div>

                    <div class="flex space-x-3">
                        @if($submission->status !== 'APPROVED')
                            <form method="POST" action="{{ route('admin.submissions.approve', $submission) }}">
                                @csrf
                                <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Approve</button>
                            </form>
                        @endif
                        @if($submission->status !== 'REJECTED')
                            <form method="POST" action="{{ route('admin.submissions.reject', $submission) }}">
                                @csrf
                                <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded">Reject</button>
                            </form>
                        @endif
                        <a href="{{ route('admin.submissions.index') }}" class="px-4 py-2 bg-gray-200 text-gray-700 rounded">Back</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
