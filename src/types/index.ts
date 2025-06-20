export interface JobCategory {
  title: string;
  qualifications: string[];
}

export interface ApplicationFormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Job Application Details
  position: string;
  experience: number;
  education: string;
  certifications: string;
  employmentHistory: string;
  references: string;
  
  // Files
  resume?: File;
  idCopy?: File;
  certFiles?: FileList;
  
  // Payment
  cardNumber: string;
  expiry: string;
  cvv: string;
  
  // Declaration
  declaration: boolean;
}

// Backend submission model used in admin dashboard
export interface Submission {
  id: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  resumePath?: string | null;
  idCopyPath?: string | null;
  certPaths?: string[] | null;
  paymentInfo?: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  } | null;
  formData?: any; // raw JSON captured from form
  createdAt?: string;
  updatedAt?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}