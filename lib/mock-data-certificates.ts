import type { Certificate, CertificateTemplate } from '@/types/certificate';

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    attendeeId: 'current-user',
    attendeeName: 'Juan Pérez',
    attendeeEmail: 'juan.perez@example.com',
    eventId: '1',
    eventName: 'TechConf 2024 - Conferencia Internacional de Tecnología',
    eventDate: new Date(Date.now() - 86400000).toISOString(),
    eventDuration: 16,
    organizerName: 'Aforo Events',
    organizerLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=AE',
    certificateNumber: 'CERT-2024-001234',
    issueDate: new Date().toISOString(),
    verificationCode: 'TC24-VRF-8X9K2L',
    status: 'available',
    activities: [
      'Keynote: El Futuro de la IA',
      'Workshop: Desarrollo con Next.js 14',
      'Panel: Tendencias Tecnológicas 2024',
      'Networking Session'
    ],
    hoursAttended: 16
  },
  {
    id: 'cert-2',
    attendeeId: 'current-user',
    attendeeName: 'Juan Pérez',
    attendeeEmail: 'juan.perez@example.com',
    eventId: '2',
    eventName: 'Marketing Digital Summit 2024',
    eventDate: new Date(Date.now() - 86400000 * 30).toISOString(),
    eventDuration: 8,
    organizerName: 'Aforo Events',
    organizerLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=AE',
    certificateNumber: 'CERT-2024-000987',
    issueDate: new Date(Date.now() - 86400000 * 29).toISOString(),
    verificationCode: 'MDS24-VRF-3P7M1Q',
    status: 'downloaded',
    activities: [
      'Growth Hacking Masterclass',
      'SEO Avanzado 2024',
      'Social Media Strategy'
    ],
    hoursAttended: 8
  }
];

export const mockCertificateTemplates: CertificateTemplate[] = [
  {
    id: 'template-1',
    name: 'Clásico Elegante',
    description: 'Diseño tradicional con bordes dorados',
    previewImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    isPremium: false
  },
  {
    id: 'template-2',
    name: 'Moderno Minimalista',
    description: 'Diseño limpio y contemporáneo',
    previewImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400',
    isPremium: false
  },
  {
    id: 'template-3',
    name: 'Premium Corporativo',
    description: 'Diseño profesional con logo prominente',
    previewImage: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400',
    isPremium: true
  }
];

export function generateCertificatePDF(certificate: Certificate): void {
  // Mock: En producción, esto generaría un PDF real
  console.log('Generating PDF for certificate:', certificate.id);
  alert(`Descargando certificado ${certificate.certificateNumber}.pdf`);
}

export function verifyCertificate(code: string): { isValid: boolean; message: string } {
  // Mock verification
  const isValid = code.startsWith('TC24-VRF-') || code.startsWith('MDS24-VRF-');
  return {
    isValid,
    message: isValid
      ? 'Certificado válido y verificado'
      : 'Código de verificación inválido'
  };
}
