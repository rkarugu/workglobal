import React from 'react';
import { CheckCircle, X, Download } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPDF: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onDownloadPDF }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-in">
        {/* Header */}
        <div className="bg-green-500 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Application Submitted Successfully!</h3>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Thank you for applying with Workforce International. We have received your application and payment.
          </p>
          <p className="text-gray-700 leading-relaxed">
            A confirmation email has been sent to your registered email address with a copy of your application.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our recruitment team will review your application and contact you within 2-3 weeks if you are shortlisted.
          </p>
          
          <div className="pt-4">
            <button
              onClick={onDownloadPDF}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Application PDF</span>
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;