import React from 'react';

const AboutUs: React.FC = () => (
  <div>
    {/* Hero Section */}
    <section className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white py-16 md:py-24"
      style={{
        backgroundImage: `linear-gradient(rgba(44, 62, 80, 0.9), rgba(44, 62, 80, 0.9)), url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
          Bridging the gap between skilled professionals and global employment opportunities
        </p>
      </div>
    </section>

    {/* Content Sections */}
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">Company Overview</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Workforce International Limited is a premier international recruitment agency dedicated to bridging the gap between skilled professionals and global employment opportunities. Headquartered in New York, USA, we specialize in connecting highly qualified candidates with top-tier employers across industries such as healthcare, engineering, IT, finance, hospitality, domestic, and more. Our mission is to facilitate seamless, ethical, and efficient recruitment processes while ensuring compliance with international labor standards.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Vision</h2>
          <p className="text-lg text-slate-600">
            To be the leading global recruitment partner, transforming workforce mobility through innovation, integrity, and inclusivity.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Mission</h2>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              Provide tailored recruitment solutions that meet the evolving demands of the global job market.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              Ensure fair and ethical employment practices for all candidates.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              Build long-term partnerships with employers by delivering top-tier talent.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              Promote cross-border workforce integration with compliance and efficiency.
            </li>
          </ul>
        </section>
      </div>

      <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Integrity', desc: 'Upholding transparency and fairness in all dealings' },
            { title: 'Excellence', desc: 'Delivering high-quality recruitment services' },
            { title: 'Innovation', desc: 'Leveraging technology for smarter hiring solutions' },
            { title: 'Diversity & Inclusion', desc: 'Promoting equal opportunities for all professionals' },
            { title: 'Client-Centric', desc: 'Prioritizing employer and candidate satisfaction' },
          ].map((value, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold mb-2 text-slate-800">{value.title}</h3>
              <p className="text-slate-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800">For Employers</h3>
            <ul className="space-y-3">
              {[
                'Global Talent Acquisition – Sourcing skilled professionals from key markets',
                'Executive Search – High-level recruitment for leadership roles',
                'Contract Staffing – Flexible workforce solutions for short-term projects',
                'Compliance & Visa Support – Assisting with work permits and legal requirements',
                'Employer Branding – Enhancing company reputation to attract top talent',
              ].map((service, index) => (
                <li key={index} className="flex items-start text-slate-600">
                  <span className="text-blue-500 mr-2">🔹</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800">For Job Seekers</h3>
            <ul className="space-y-3">
              {[
                'International Job Placements – Access to exclusive global opportunities',
                'Career Counseling – Personalized guidance for career growth',
                'Resume & Interview Preparation – Professional support for job applications',
                'Relocation Assistance – Help with visas, housing, and cultural integration',
                'Skill Development Programs – Training for in-demand job competencies',
              ].map((service, index) => (
                <li key={index} className="flex items-start text-slate-600">
                  <span className="text-blue-500 mr-2">🔹</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Industries We Serve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Healthcare',
            'Engineering & Construction',
            'Information Technology',
            'Finance & Accounting',
            'Hospitality & Tourism',
            'Oil & Gas',
            'Maritime & Logistics',
            'Domestic & Support Staff',
            'Professional Services',
          ].map((industry, index) => (
            <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="text-slate-700">{industry}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'From Africa: Nurse in the UAE',
              quote: 'Workforce International placed me as a nurse in a top Dubai hospital. The process was smooth, and I now earn 3x my previous salary in Kenya.',
              author: 'Jane M., Nairobi'
            },
            {
              title: 'From Asia: Electrician in Canada',
              quote: 'I struggled to find overseas work until Workforce International secured me a job in Toronto. Their visa support was invaluable.',
              author: 'Raj P., India'
            },
            {
              title: 'From South America: Chef in Qatar',
              quote: 'As a chef from Brazil, I dreamed of working abroad. Workforce International made it happen with a 5-star hotel placement.',
              author: 'Carlos L., São Paulo'
            },
            {
              title: 'Employer Testimonial: Saudi Construction Firm',
              quote: 'We hired 50 skilled electricians and drivers through Workforce International. Their candidates are pre-screened and reliable.',
              author: 'Al-Rashid Group, Riyadh'
            }
          ].map((story, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="font-semibold mb-3 text-slate-800">{story.title}</h3>
              <p className="italic text-slate-600 mb-2">"{story.quote}"</p>
              <p className="text-sm text-slate-500">— {story.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Why Choose Workforce International?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🌐', title: 'Global Network', desc: 'Strong partnerships with employers in the USA, Europe, Middle East, and Asia' },
            { icon: '⚖️', title: 'Ethical Recruitment', desc: 'Zero tolerance for exploitation or unfair practices' },
            { icon: '⚡', title: 'Streamlined Process', desc: 'Efficient matching using AI-driven recruitment tools' },
            { icon: '📜', title: 'Legal Compliance', desc: 'Expertise in international labor laws and visa regulations' },
            { icon: '🎯', title: 'Proven Success', desc: 'Thousands of successful placements worldwide' },
          ].map((feature, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold mb-2 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Future Goals & Expansion Plans</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: '🌱', title: 'Market Expansion', desc: 'Expand operations into emerging labor markets' },
            { icon: '🤖', title: 'Technology Innovation', desc: 'Develop AI-powered recruitment platforms for faster candidate matching' },
            { icon: '🤝', title: 'Government Partnerships', desc: 'Strengthen partnerships with government agencies for smoother visa processing' },
            { icon: '📚', title: 'Skills Development', desc: 'Launch upskilling programs to enhance candidate employability' },
          ].map((goal, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <div className="text-3xl mb-3">{goal.icon}</div>
              <h3 className="font-semibold mb-2 text-slate-800">{goal.title}</h3>
              <p className="text-slate-600">{goal.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default AboutUs; 