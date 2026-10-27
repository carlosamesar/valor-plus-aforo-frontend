export type CertificateStatus = 'available' | 'downloaded' | 'shared' | 'verified';

export interface Certificate {
  id: string;
  attendeeId: string;
  attendeeName: string;
  attendeeEmail: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventDuration: number; // hours
  organizerName: string;
  organizerLogo?: string;
  certificateNumber: string;
  issueDate: string;
  verificationCode: string;
  status: CertificateStatus;
  downloadUrl?: string;
  activities: string[];
  hoursAttended: number;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  isPremium: boolean;
}

export interface VerificationResult {
  isValid: boolean;
  certificate?: Certificate;
  message: string;
  verifiedAt: string;
}
