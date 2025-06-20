import React from 'react';
import { JobCategory } from '../types';

interface JobCategoriesProps {
  onApplyClick: (jobTitle: string) => void;
}

const JobCategories: React.FC<JobCategoriesProps> = ({ onApplyClick }) => {
  const jobCategories: JobCategory[] = [
    {
      title: 'Cooks',
      qualifications: [
        'Proven experience in cooking (home or professional)',
        'Knowledge of various cuisines is a plus',
        'Food safety certification preferred',
        'Ability to work in fast-paced environments'
      ]
    },
    {
      title: 'Drivers',
      qualifications: [
        'Valid driver\'s license (local or international)',
        'Clean driving record',
        'Experience with different vehicle types',
        'Defensive driving certification (advantageous)'
      ]
    },
    {
      title: 'Gardeners',
      qualifications: [
        'Experience in landscape maintenance',
        'Knowledge of plants and gardening techniques',
        'Ability to operate gardening equipment',
        'Physical stamina for outdoor work'
      ]
    },
    {
      title: 'Nurses',
      qualifications: [
        'Valid nursing license/certification',
        'Minimum 2 years clinical experience',
        'BLS/ACLS certification',
        'Excellent patient care skills'
      ]
    },
    {
      title: 'Electricians',
      qualifications: [
        'Certified electrician license',
        '3+ years of electrical work experience',
        'Knowledge of electrical codes',
        'Troubleshooting skills'
      ]
    },
    {
      title: 'Caregivers',
      qualifications: [
        'Compassionate and patient',
        'Experience with elderly or disabled care',
        'First aid/CPR certification',
        'Good communication skills'
      ]
    }
  ];

  return (
    <section id="jobs" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
          Job Categories & Qualifications
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobCategories.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-4 text-slate-800">{job.title}</h3>
              <h6 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                Qualifications:
              </h6>
              <ul className="space-y-2 mb-6">
                {job.qualifications.map((qualification, qualIndex) => (
                  <li key={qualIndex} className="text-gray-600 flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {qualification}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onApplyClick(job.title)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                APPLY NOW
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
            View All 15 Job Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobCategories;