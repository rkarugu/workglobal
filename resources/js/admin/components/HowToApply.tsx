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
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Pay via M-Pesa',
      description: (
        <>Go to Lipa na M-Pesa → Buy Goods, pay KES 5,200 to till number <strong>{import.meta.env.VITE_MPESA_ENV === 'sandbox' ? '174379' : '493969'}</strong>, then keep the confirmation code for verification.</>
      )
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Fill out the application form',
      description: 'Complete all required fields in our online application form with accurate information.'
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
        <h2 className="text-3xl font-bold text-center mb-12">How to Apply</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                        {step.icon}
                      </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToApply;