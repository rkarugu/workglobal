import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Globe className="w-6 h-6" />
            <span className="font-bold text-lg">Workforce International</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="hover:text-blue-300 transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('jobs')}
              className="hover:text-blue-300 transition-colors font-medium"
            >
              Job Categories
            </button>
            <button 
              onClick={() => scrollToSection('apply')}
              className="hover:text-blue-300 transition-colors font-medium"
            >
              Apply Now
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-blue-300 transition-colors font-medium"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="hover:text-blue-300 transition-colors font-medium"
            >
              FAQ
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-700 rounded-lg mt-2 p-4 space-y-3">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left hover:text-blue-300 transition-colors font-medium py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('jobs')}
              className="block w-full text-left hover:text-blue-300 transition-colors font-medium py-2"
            >
              Job Categories
            </button>
            <button 
              onClick={() => scrollToSection('apply')}
              className="block w-full text-left hover:text-blue-300 transition-colors font-medium py-2"
            >
              Apply Now
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left hover:text-blue-300 transition-colors font-medium py-2"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left hover:text-blue-300 transition-colors font-medium py-2"
            >
              FAQ
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;