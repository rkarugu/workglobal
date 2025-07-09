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
import About from './components/About';
import AboutUs from './components/AboutUs';
import { Routes, Route, useLocation } from 'react-router-dom';
import TermsAndPayment from './components/TermsAndPayment';

function App() {
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState<ApplicationFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [userDetails, setUserDetails] = useState<{ fullName: string; email: string; phone: string } | undefined>(undefined);
  const location = useLocation();

  const handleJobApply = (jobTitle: string) => {
    setSelectedPosition(jobTitle);
    // Scroll to payment section if not verified, otherwise to application form
    const elementId = paymentVerified ? 'apply' : 'payment';
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePaymentVerified = (details: { name: string; email: string; phone: string }) => {
    setPaymentVerified(true);
    setUserDetails({
      fullName: details.name,
      email: details.email,
      phone: details.phone
    });
    // Scroll to application form after payment
    const element = document.getElementById('apply');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (formData: ApplicationFormData) => {
    if (!paymentVerified) {
      setSubmitError('Please complete the payment first');
      return;
    }

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

  // Handle scrolling to section when navigating from another page
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure the content is rendered
    }
  }, [location]);

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

  const MainContent = () => (
    <>
      <Hero />
      <About />
      <JobCategories onApplyClick={handleJobApply} />
      <HowToApply />
      <section id="payment" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {!paymentVerified && (
              <TermsAndPayment 
                onPaid={handlePaymentVerified}
                fullName={userDetails?.fullName}
                email={userDetails?.email}
                phone={userDetails?.phone}
              />
            )}
          </div>
        </div>
      </section>
      {paymentVerified && (
      <ApplicationForm 
        onSubmit={handleFormSubmit} 
        selectedPosition={selectedPosition}
          userDetails={userDetails}
      />
      )}
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
      <Contact />
      <FAQ />
      <Footer />
      <SuccessModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDownloadPDF={handleDownloadPDF}
      />
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/" element={<MainContent />} />
      </Routes>
    </div>
  );
}

export default App;