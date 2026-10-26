export const siteConfig = {
  name: 'Aforo',
  description: 'Descubre y participa en los mejores eventos',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/aforo',
    github: 'https://github.com/aforo',
  },
  keywords: [
    'eventos',
    'conferencias',
    'talleres',
    'networking',
    'tickets',
    'webinars',
  ],
};

export const navConfig = {
  mainNav: [
    {
      title: 'Eventos',
      href: '/eventos',
    },
    {
      title: 'Categorías',
      href: '/categorias',
    },
    {
      title: 'Calendario',
      href: '/calendario',
    },
    {
      title: 'Organizadores',
      href: '/organizadores',
    },
  ],
};

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  endpoints: {
    events: '/events',
    eventDetail: (slug: string) => `/events/${slug}`,
    categories: '/categories',
    organizers: '/organizers',
  },
};
