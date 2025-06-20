import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { postSubmission } from "./utils/api";
import Hero from './components/Hero';
import JobCategories from './components/JobCategories';
import ApplicationForm from './components/ApplicationForm';
import HowToApply from './components/HowToApply';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SuccessModal from './components/SuccessModal';
import { ApplicationFormData } from './types';
import { generateApplicationPDF } from './utils/pdf';

function App() {
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState<ApplicationFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleJobApply = (jobTitle: string) => {
    setSelectedPosition(jobTitle);
    // Scroll to application form
    const element = document.getElementById('apply');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (formData: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await postSubmission(formData);
      // Store the form data for PDF generation
      setSubmittedFormData(formData);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      setSubmitError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
    
    // Reset selected position
    setSelectedPosition('');
  };

  const handleDownloadPDF = () => {
    if (submittedFormData) {
      generateApplicationPDF(submittedFormData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmittedFormData(null);
  };

  // Clear selected position when navigating away from form
  useEffect(() => {
    const handleScroll = () => {
      const applySection = document.getElementById('apply');
      if (applySection) {
        const rect = applySection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        if (!isVisible && selectedPosition) {
          // Only clear if user scrolled significantly away from the form
          if (rect.top > window.innerHeight * 1.5 || rect.bottom < -window.innerHeight * 0.5) {
            setSelectedPosition('');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPosition]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <JobCategories onApplyClick={handleJobApply} />
      <ApplicationForm 
        onSubmit={handleFormSubmit} 
        selectedPosition={selectedPosition}
      />

      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 shadow-xl">Submitting…</div>
        </div>
      )}
      {submitError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {submitError}
        </div>
      )}
      <HowToApply />
      <Contact />
      <FAQ />
      <Footer />
      
      <SuccessModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDownloadPDF={handleDownloadPDF}
      />
    </div>
  );
}

export default App;