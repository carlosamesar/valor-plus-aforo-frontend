import type { CheckInRecord, DigitalBadge, AccessZone, CheckInStats } from '@/types/checkin';

export const mockCheckInRecords: CheckInRecord[] = [
  {
    id: 'checkin-1',
    ticketId: 'ticket-001',
    attendeeName: 'Juan Pérez',
    attendeeEmail: 'juan.perez@example.com',
    ticketType: 'General',
    eventId: '1',
    eventName: 'TechConf 2024',
    checkInTime: new Date().toISOString(),
    checkInBy: 'Staff Member #1',
    status: 'checked_in',
    accessLevel: ['main_hall', 'workshops', 'food_area'],
    notes: 'Check-in completado sin problemas'
  }
];

export const mockDigitalBadge: DigitalBadge = {
  id: 'badge-current-user',
  attendeeName: 'Juan Pérez',
  attendeeEmail: 'juan.perez@example.com',
  company: 'MyCompany',
  badgeType: 'general',
  eventName: 'TechConf 2024',
  eventLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
  qrCode: 'BADGE-' + Date.now(),
  accessLevel: ['main_hall', 'workshops', 'food_area'],
  validFrom: new Date().toISOString(),
  validUntil: new Date(Date.now() + 86400000 * 3).toISOString(),
  isActive: true
};

export const mockAccessZones: AccessZone[] = [
  {
    id: 'zone-1',
    name: 'Salón Principal',
    description: 'Conferencias principales y keynotes',
    requiredLevel: ['main_hall'],
    currentCapacity: 847,
    maxCapacity: 1000,
    isOpen: true
  },
  {
    id: 'zone-2',
    name: 'Talleres Prácticos',
    description: 'Salas de workshops y actividades hands-on',
    requiredLevel: ['workshops'],
    currentCapacity: 123,
    maxCapacity: 200,
    isOpen: true
  },
  {
    id: 'zone-3',
    name: 'Zona VIP',
    description: 'Área exclusiva para asistentes VIP',
    requiredLevel: ['vip'],
    currentCapacity: 45,
    maxCapacity: 50,
    isOpen: true
  },
  {
    id: 'zone-4',
    name: 'Backstage',
    description: 'Área restringida - Solo speakers y staff',
    requiredLevel: ['backstage'],
    currentCapacity: 12,
    maxCapacity: 30,
    isOpen: false
  }
];

export const mockCheckInStats: CheckInStats = {
  totalAttendees: 1284,
  checkedIn: 847,
  pending: 437,
  checkInRate: 65.96,
  peakHour: '09:00 - 10:00',
  averageCheckInTime: 45 // seconds
};

export const badgeTypeLabels = {
  general: 'General',
  vip: 'VIP',
  staff: 'Staff',
  speaker: 'Speaker',
  press: 'Prensa'
};

export const badgeTypeColors = {
  general: 'bg-blue-500',
  vip: 'bg-purple-500',
  staff: 'bg-green-500',
  speaker: 'bg-orange-500',
  press: 'bg-red-500'
};
