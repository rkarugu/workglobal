import React from 'react';
import { Search, FileText, CreditCard, Clock } from 'lucide-react';

const HowToApply: React.FC = () => {
  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Browse job categories',
      description: 'Review our available positions and qualifications to find the best match for your skills.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Fill out the application form',
      description: 'Complete all required fields in our online application form with accurate information.'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Pay the application fee',
      description: 'Submit the non-refundable $20 application fee through our secure payment gateway.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Wait for interview scheduling',
      description: 'Our recruitment team will review your application and contact you to schedule an interview.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg">
            <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
              How to Apply
            </h2>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-blue-600">
                        {step.icon}
                      </div>
                      <h5 className="text-xl font-semibold text-slate-800">
                        {step.title}
                      </h5>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-white rounded-xl p-6 shadow-md border border-blue-100">
              <h5 className="text-lg font-semibold text-slate-800 mb-4">Important Notes:</h5>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Salary will be discussed upon contract signing.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Agency fees will be deducted after employment.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  All applications are subject to verification.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToApply;