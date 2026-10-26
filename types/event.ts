export type EventType = 'virtual' | 'presencial' | 'hibrido';
export type EventCategory = 'conferencia' | 'taller' | 'networking' | 'webinar' | 'festival' | 'otro';
export type EventStatus = 'publicado' | 'borrador' | 'cancelado' | 'finalizado';

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  type: EventType;
  category: EventCategory;
  status: EventStatus;

  // Date & Time
  startDate: string;
  endDate: string;
  timezone: string;

  // Location
  location?: EventLocation;

  // Media
  coverImage: string;
  gallery?: string[];

  // Pricing & Tickets
  isFree: boolean;
  price?: number;
  currency: string;
  capacity?: number;
  availableTickets?: number;

  // Metadata
  featured: boolean;
  tags: string[];
  organizerId: string;
  speakers?: Speaker[];

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Social Proof
  attendeesCount?: number;
  rating?: number;
  reviewsCount?: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface EventLocation {
  type: 'physical' | 'online' | 'hybrid';
  venue?: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  onlineUrl?: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface EventFilters {
  category?: EventCategory[];
  type?: EventType[];
  dateFrom?: string;
  dateTo?: string;
  priceMin?: number;
  priceMax?: number;
  isFree?: boolean;
  search?: string;
  city?: string;
}

export interface EventsResponse {
  events: Event[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
