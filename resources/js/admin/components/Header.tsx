import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // If already on home page, just scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Globe className="w-6 h-6" />
            <Link to="/" className="font-bold text-lg">Workforce International</Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/"
              className="hover:text-blue-300 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about"
              className="hover:text-blue-300 transition-colors font-medium"
            >
              About Us
            </Link>
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
            <Link 
              to="/"
              className="block w-full text-left hover:text-blue-300 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about"
              className="block w-full text-left hover:text-blue-300 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
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