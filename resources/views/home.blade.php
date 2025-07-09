<x-guest-layout>
    <title>Workforce International - Recruitment Portal</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @csrf
    <!-- Hero Section -->
    <section class="bg-cover bg-center h-72 flex items-center" style="background-image: url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80');">
        <div class="w-full text-center text-white">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">International Recruitment Portal</h1>
            <div class="space-x-4">
                <a href="#apply" class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">Apply Now</a>
                <a href="#contact" class="px-6 py-2 bg-white text-indigo-600 hover:bg-gray-100 rounded">Contact Us</a>
            </div>
        </div>
    </section>

    <!-- About Workforce International -->
    <section class="py-12 bg-white" id="about">
        <div class="max-w-4xl mx-auto px-4">
            <h2 class="text-2xl font-bold mb-4 text-center">About Workforce International Limited</h2>
            <p class="text-lg text-gray-700 mb-4 text-center">
                Workforce International Limited is a premier international recruitment agency dedicated to bridging the gap between skilled professionals and global employment opportunities.
            </p>
            <p class="text-gray-700 mb-2">
                Headquartered in New York, USA, we specialize in connecting highly qualified candidates with top-tier employers across industries such as healthcare, engineering, IT, finance, hospitality, domestic, and more.
            </p>
            <p class="text-gray-700 mb-2">
                Our mission is to facilitate seamless, ethical, and efficient recruitment processes while ensuring compliance with international labor standards.
            </p>
            <p class="text-gray-700 mb-2">
                With a commitment to excellence, Workforce International has built a reputation for reliability, transparency, and personalized service.
            </p>
            <p class="text-gray-700 mb-2">
                We leverage cutting-edge technology, industry expertise, and a vast global network to match the right talent with the right opportunities - fostering long-term success for both employers and job seekers.
            </p>
        </div>
    </section>

    <!-- Job Categories -->
    <section class="py-12" id="categories">
        <h2 class="text-center text-2xl font-semibold mb-8">Job Categories & Qualifications</h2>
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            @foreach([['Code','Bachelors Degree'],['Chef','Diploma / 3yrs+'],['Driver','Valid License'],['Nurse','B.Sc Nursing'],['Technician','Trade Cert'],['Carpenter','Apprenticeship']] as $card)
                <div class="border rounded shadow p-6 text-center">
                    <h3 class="font-bold mb-2">{{ $card[0] }}</h3>
                    <p class="text-sm mb-4">{{ $card[1] }}</p>
                    <a href="#apply" class="w-full inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Apply Position</a>
                </div>
            @endforeach
        </div>
    </section>

    <!-- Application Form -->
    @include('partials.apply-form')

    <!-- How To Apply -->
    <section class="py-12 bg-gray-50" id="how-to-apply">
        <h2 class="text-center text-2xl font-semibold mb-8">How to Apply</h2>
        <div class="max-w-md mx-auto bg-blue-50 p-6 rounded shadow">
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
                <li>Prepare your resume and supporting documents (PDF/DOC).</li>
                <li>Fill in the online application form.</li>
                <li>Upload your documents and submit.</li>
                <li>Wait for our recruitment team to review.</li>
                <li>Receive email confirmation with next steps.</li>
            </ol>
        </div>
    </section>

    <!-- Contact & Message -->
    <section class="py-12" id="contact">
        <h2 class="text-center text-2xl font-semibold mb-8">Contact Us</h2>
        <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 class="font-bold mb-4">Office Address</h3>
                <p>123 Workforce Ave<br>Dubai, UAE</p>
                <h3 class="font-bold mt-6 mb-2">Phone</h3>
                <p>+971 55 123 4567</p>
                <h3 class="font-bold mt-6 mb-2">Email</h3>
                <p>info@example.com</p>
            </div>
            <form method="POST" action="#" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" class="mt-1 block w-full rounded-md border-gray-300" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" class="mt-1 block w-full rounded-md border-gray-300" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Message</label>
                    <textarea rows="4" class="mt-1 block w-full rounded-md border-gray-300" required></textarea>
                </div>
                <button type="submit" class="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Send Message</button>
            </form>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-12 bg-gray-50" id="faq">
        <h2 class="text-center text-2xl font-semibold mb-8">Frequently Asked Questions</h2>
        <div class="max-w-3xl mx-auto space-y-4">
            @foreach([
                'What documents do I need?' => 'A resume, passport copy, and relevant certificates.',
                'How long is the recruitment process?' => 'Typically 2-4 weeks after submission.',
                'Can I apply for multiple positions?' => 'Yes, indicate your preferred positions in the form.',
                'Will I be notified if unsuccessful?' => 'Yes, all applicants receive email updates.',
            ] as $q => $a)
                <details class="bg-white p-4 rounded shadow">
                    <summary class="font-medium cursor-pointer">{{ $q }}</summary>
                    <p class="mt-2 text-gray-700">{{ $a }}</p>
                </details>
            @endforeach
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-300 py-6 text-center">
        <p>&copy; {{ date('Y') }} Workforce International. All rights reserved.</p>
    </footer>
</x-guest-layout>
