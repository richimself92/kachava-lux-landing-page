export type ExperienceOption = 'golf' | 'massage';

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  arrivalDate: string;
  guestCount: number;
  experienceChoice: ExperienceOption;
  notes: string;
}

export interface InquirySubmissionResponse {
  success: boolean;
  inquiryId?: string;
  message?: string;
  errors?: Record<string, string>;
  inquiry?: InquiryRecord;
}

export interface InquiryRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  arrivalDate: string;
  guestCount: number;
  experienceChoice: ExperienceOption;
  notes?: string;
  status: 'new' | 'contacted' | 'reserved' | 'archived';
  packagePrice: number;
  currency: string;
  createdAt: string;
}
