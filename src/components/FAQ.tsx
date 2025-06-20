import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqData: FAQItem[] = [
    {
      question: 'What is the application process timeline?',
      answer: 'The application process typically takes 2-4 weeks from submission to interview scheduling. After the interview, successful candidates will undergo document verification which may take an additional 1-2 weeks.'
    },
    {
      question: 'Is the $20 application fee refundable?',
      answer: 'No, the application fee is non-refundable as it covers the administrative costs of processing your application regardless of the outcome.'
    },
    {
      question: 'What documents will I need for employment?',
      answer: 'Required documents typically include a valid passport, educational certificates, professional certifications, work experience letters, and any required visas or work permits for the destination country.'
    },
    {
      question: 'How are agency fees handled?',
      answer: 'Agency fees are typically deducted from your first 1-3 months\' salary after employment begins, depending on the position and contract terms. The exact structure will be clearly outlined in your employment contract.'
    },
    {
      question: 'Can I apply for multiple positions?',
      answer: 'Yes, you may apply for multiple positions, but each application requires a separate submission and application fee. We recommend focusing on positions that best match your qualifications.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-slate-800 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;