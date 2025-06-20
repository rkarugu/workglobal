import jsPDF from 'jspdf';
import { ApplicationFormData } from '../types';

export const generateApplicationPDF = (formData: ApplicationFormData): void => {
  const doc = new jsPDF();
  
  // Add title and header
  doc.setFontSize(20);
  doc.setTextColor(44, 62, 80);
  doc.text('Workforce International', 105, 20, { align: 'center' });
  doc.setFontSize(16);
  doc.text('Application Form', 105, 30, { align: 'center' });
  
  // Add line
  doc.setDrawColor(44, 62, 80);
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);
  
  // Add applicant information
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  let yPosition = 45;
  const lineHeight = 10;
  
  const addField = (label: string, value: string) => {
    doc.text(`${label}: ${value}`, 20, yPosition);
    yPosition += lineHeight;
  };
  
  addField('Full Name', formData.fullName || 'Not provided');
  addField('Position Applied', formData.position || 'Not specified');
  addField('Application Date', new Date().toLocaleDateString());
  addField('Email', formData.email || 'Not provided');
  addField('Phone', formData.phone || 'Not provided');
  addField('Nationality', formData.nationality || 'Not provided');
  addField('Years of Experience', formData.experience?.toString() || '0');
  addField('Education Level', formData.education || 'Not specified');
  
  if (formData.certifications) {
    yPosition += 5;
    doc.text('Certifications:', 20, yPosition);
    yPosition += lineHeight;
    const certLines = doc.splitTextToSize(formData.certifications, 170);
    doc.text(certLines, 20, yPosition);
    yPosition += certLines.length * lineHeight;
  }
  
  if (formData.employmentHistory) {
    yPosition += 5;
    doc.text('Employment History:', 20, yPosition);
    yPosition += lineHeight;
    const historyLines = doc.splitTextToSize(formData.employmentHistory, 170);
    doc.text(historyLines, 20, yPosition);
  }
  
  // Save the PDF
  const fileName = `Workforce_Application_${formData.fullName.replace(/\s+/g, '_') || 'Unknown'}.pdf`;
  doc.save(fileName);
};