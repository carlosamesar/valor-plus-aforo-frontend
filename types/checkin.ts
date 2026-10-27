export type CheckInStatus = 'pending' | 'checked_in' | 'denied' | 'expired';
export type BadgeType = 'general' | 'vip' | 'staff' | 'speaker' | 'press';

export interface CheckInRecord {
  id: string;
  ticketId: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketType: string;
  eventId: string;
  eventName: string;
  checkInTime: string;
  checkInBy?: string; // Staff member who checked in
  status: CheckInStatus;
  accessLevel: string[];
  notes?: string;
}

export interface DigitalBadge {
  id: string;
  attendeeName: string;
  attendeeEmail: string;
  company?: string;
  badgeType: BadgeType;
  eventName: string;
  eventLogo?: string;
  qrCode: string;
  accessLevel: string[];
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface AccessZone {
  id: string;
  name: string;
  description: string;
  requiredLevel: string[];
  currentCapacity: number;
  maxCapacity: number;
  isOpen: boolean;
}

export interface CheckInStats {
  totalAttendees: number;
  checkedIn: number;
  pending: number;
  checkInRate: number;
  peakHour: string;
  averageCheckInTime: number;
}
