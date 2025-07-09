<x-guest-layout>


<div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-6">Job Application Form</h1>

    @if(session('success'))
        <div
            x-data="{ show: true }"
            x-show="show"
            x-transition
            class="mb-4 p-4 bg-green-100 text-green-700 rounded flex justify-between items-start"
        >
            <span>{{ session('success') }}</span>
            <button x-on:click="show = false; window.location.reload();" class="ml-4 font-semibold">&times;</button>
        </div>
    @endif

    <form method="POST" action="{{ route('apply.submit') }}" enctype="multipart/form-data" class="space-y-6">
        @csrf
        <div>
            <label class="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="full_name" value="{{ old('full_name') }}" class="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" required>
            @error('full_name') <p class="text-red-600 text-sm mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value="{{ old('email') }}" class="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" required>
            @error('email') <p class="text-red-600 text-sm mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" name="phone" value="{{ old('phone') }}" class="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
            @error('phone') <p class="text-red-600 text-sm mt-1">{{ $message }}</p> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Resume (PDF/DOC, max 2 MB)</label>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" class="mt-1 block w-full">
            @error('resume') <p class="text-red-600 text-sm mt-1">{{ $message }}</p> @enderror
        </div>

        <button type="submit" class="inline-flex items-center px-6 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit Application
        </button>
    </form>
</div>
</x-guest-layout>
