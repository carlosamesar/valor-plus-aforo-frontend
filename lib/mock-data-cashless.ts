import type { Wallet, Transaction, Vendor, WalletStats, PromoCode } from '@/types/cashless';

export const mockWallet: Wallet = {
  id: 'wallet-current-user',
  userId: 'current-user',
  balance: 75000,
  currency: 'COP',
  isActive: true,
  createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  updatedAt: new Date().toISOString()
};

export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    walletId: 'wallet-current-user',
    type: 'payment',
    amount: -15000,
    currency: 'COP',
    description: 'Café + Croissant',
    vendorId: 'vendor-1',
    vendorName: 'Café del Evento',
    vendorLocation: 'Nivel 2 - Zona Food',
    status: 'completed',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    reference: 'PAY-001234'
  },
  {
    id: 'tx-2',
    walletId: 'wallet-current-user',
    type: 'payment',
    amount: -25000,
    currency: 'COP',
    description: 'Almuerzo Ejecutivo',
    vendorId: 'vendor-2',
    vendorName: 'Restaurante Principal',
    vendorLocation: 'Nivel 1',
    status: 'completed',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    reference: 'PAY-001235'
  },
  {
    id: 'tx-3',
    walletId: 'wallet-current-user',
    type: 'recharge',
    amount: 100000,
    currency: 'COP',
    description: 'Recarga con tarjeta de crédito',
    status: 'completed',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    reference: 'RCH-001100'
  },
  {
    id: 'tx-4',
    walletId: 'wallet-current-user',
    type: 'payment',
    amount: -8000,
    currency: 'COP',
    description: 'Bebida Energética',
    vendorId: 'vendor-3',
    vendorName: 'Snack Bar',
    vendorLocation: 'Nivel 2',
    status: 'completed',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    reference: 'PAY-001236'
  },
  {
    id: 'tx-5',
    walletId: 'wallet-current-user',
    type: 'payment',
    amount: -35000,
    currency: 'COP',
    description: 'Camiseta Oficial del Evento',
    vendorId: 'vendor-4',
    vendorName: 'Merchandising',
    vendorLocation: 'Hall Principal',
    status: 'completed',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    reference: 'PAY-001237'
  },
  {
    id: 'tx-6',
    walletId: 'wallet-current-user',
    type: 'payment',
    amount: -12000,
    currency: 'COP',
    description: 'Snack',
    vendorId: 'vendor-3',
    vendorName: 'Snack Bar',
    vendorLocation: 'Nivel 2',
    status: 'completed',
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    reference: 'PAY-001238'
  }
];

export const mockVendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Café del Evento',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CE',
    category: 'drink',
    location: 'Nivel 2 - Zona Food',
    description: 'Café de especialidad, bebidas calientes y frías, pastelería',
    qrCode: 'VENDOR-001-' + Date.now(),
    acceptsCashless: true,
    isActive: true
  },
  {
    id: 'vendor-2',
    name: 'Restaurante Principal',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=RP',
    category: 'food',
    location: 'Nivel 1',
    description: 'Almuerzos ejecutivos, platos a la carta, menú del día',
    qrCode: 'VENDOR-002-' + Date.now(),
    acceptsCashless: true,
    isActive: true
  },
  {
    id: 'vendor-3',
    name: 'Snack Bar',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SB',
    category: 'food',
    location: 'Nivel 2',
    description: 'Snacks, bebidas, dulces y refrigerios rápidos',
    qrCode: 'VENDOR-003-' + Date.now(),
    acceptsCashless: true,
    isActive: true
  },
  {
    id: 'vendor-4',
    name: 'Merchandising',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=MC',
    category: 'merchandise',
    location: 'Hall Principal',
    description: 'Productos oficiales del evento: camisetas, gorras, stickers',
    qrCode: 'VENDOR-004-' + Date.now(),
    acceptsCashless: true,
    isActive: true
  },
  {
    id: 'vendor-5',
    name: 'TechCorp Stand',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
    category: 'sponsor',
    location: 'Zona de Patrocinadores',
    description: 'Stand del patrocinador principal - sorteos y regalos',
    qrCode: 'VENDOR-005-' + Date.now(),
    acceptsCashless: true,
    isActive: true
  }
];

export const mockWalletStats: WalletStats = {
  totalRecharges: 100000,
  totalSpent: 95000,
  transactionCount: 6,
  averageTransaction: 15833,
  favoriteVendor: 'Restaurante Principal'
};

export const mockPromoCodes: PromoCode[] = [
  {
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    minAmount: 20000,
    maxDiscount: 5000,
    expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
    isActive: true
  },
  {
    code: 'COFFEE5',
    discount: 5000,
    type: 'fixed',
    minAmount: 10000,
    expiresAt: new Date(Date.now() + 86400000 * 3).toISOString(),
    isActive: true
  }
];

// Helper functions
export function formatCurrency(amount: number, currency: string = 'COP'): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(Math.abs(amount));
}

export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((acc, tx) => {
    if (tx.status === 'completed') {
      return acc + tx.amount;
    }
    return acc;
  }, 0);
}
