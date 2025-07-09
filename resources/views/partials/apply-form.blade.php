<div id="apply" class="max-w-3xl mx-auto p-6">
    <h2 class="text-2xl font-semibold mb-6 text-center">Online Application Form</h2>

    @if(session('success'))
        <div class="mb-4 p-4 bg-green-100 text-green-700 rounded">
            {{ session('success') }}
        </div>
    @endif

    <form method="POST" action="{{ route('apply.submit') }}" enctype="multipart/form-data" class="space-y-6">
        @csrf
        <div>
            <label class="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="full_name" value="{{ old('full_name') }}" class="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" required>
            @error('full_name') <p class="text-red-600 text-sm mt-1">{{ $message }}</p> @enderror
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value="{{ old('email') }}" class="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" required>
                @error('email') <p class="text-red-600 text-sm mt-1">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Phone (07XXXXXXXX)</label>
                <input type="text" name="phone" value="{{ old('phone') }}" class="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" required>
                @error('phone') <p class="text-red-600 text-sm mt-1">{{ $message }}</p> @enderror
            </div>
        </div>

        <!-- Terms & Payment -->
        <div class="border rounded-md p-4 bg-gray-50 space-y-4">
            <p class="font-semibold text-gray-800">Application Fee: <span class="text-blue-600">Ksh&nbsp;5,200</span> (non-refundable)</p>
            <div class="flex items-start space-x-2">
                <input type="checkbox" id="terms" class="mt-1" />
                <label for="terms" class="text-sm text-gray-700">I have read and accept the <a href="#" class="text-blue-600 underline">terms and conditions</a>.</label>
            </div>
            <button id="payBtn" type="button" class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed" disabled>
                Pay with M-Pesa
            </button>
            <p id="paymentStatus" class="text-sm text-gray-600"></p>
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
