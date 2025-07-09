<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Submissions') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            @if(session('success'))
                <div class="mb-4 p-4 bg-green-100 text-green-700 rounded">
                    {{ session('success') }}
                </div>
            @endif

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <div class="mb-4 flex justify-between items-center">
                        <form method="GET" action="" class="flex items-center space-x-2">
                            <select name="status" class="border-gray-300 rounded">
                                <option value="">All Statuses</option>
                                <option value="PENDING" {{ $status === 'PENDING' ? 'selected' : '' }}>Pending</option>
                                <option value="APPROVED" {{ $status === 'APPROVED' ? 'selected' : '' }}>Approved</option>
                                <option value="REJECTED" {{ $status === 'REJECTED' ? 'selected' : '' }}>Rejected</option>
                            </select>
                            <button type="submit" class="px-3 py-1 bg-indigo-600 text-white rounded">Filter</button>
                        </form>
                        <span class="text-sm text-gray-600">Total: {{ $submissions->total() }}</span>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                @forelse($submissions as $submission)
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $submission->full_name }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $submission->email }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $submission->phone }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {{ match($submission->status){
                                                'APPROVED' => 'bg-green-100 text-green-800',
                                                'REJECTED' => 'bg-red-100 text-red-800',
                                                default => 'bg-yellow-100 text-yellow-800'
                                            } }}">
                                                {{ $submission->status }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            @if($submission->resume_path)
                                                <a href="{{ route('admin.submissions.show', $submission) }}" class="text-indigo-600 hover:underline">View</a>
                                            @else
                                                -
                                            @endif
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex space-x-2">
                                                @if($submission->status !== 'APPROVED')
                                                    <form method="POST" action="{{ route('admin.submissions.approve', $submission) }}">
                                                        @csrf
                                                        <button type="submit" class="px-3 py-1 bg-green-600 text-white text-xs rounded">Approve</button>
                                                    </form>
                                                @endif
                                                @if($submission->status !== 'REJECTED')
                                                    <form method="POST" action="{{ route('admin.submissions.reject', $submission) }}">
                                                        @csrf
                                                        <button type="submit" class="px-3 py-1 bg-red-600 text-white text-xs rounded">Reject</button>
                                                    </form>
                                                @endif
                                            </div>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="6" class="px-6 py-4 text-center">No submissions found.</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-6">
                        {{ $submissions->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
