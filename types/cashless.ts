export type TransactionType = 'recharge' | 'payment' | 'refund';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
export type RechargeMethod = 'card' | 'transfer' | 'cash';

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  vendorId?: string;
  vendorName?: string;
  vendorLocation?: string;
  status: TransactionStatus;
  timestamp: string;
  reference?: string;
}

export interface Vendor {
  id: string;
  name: string;
  logo?: string;
  category: 'food' | 'drink' | 'merchandise' | 'sponsor' | 'other';
  location: string;
  description?: string;
  qrCode: string;
  acceptsCashless: boolean;
  isActive: boolean;
}

export interface RechargeRequest {
  amount: number;
  method: RechargeMethod;
  cardLast4?: string;
  reference?: string;
}

export interface PaymentRequest {
  vendorId: string;
  amount: number;
  description?: string;
}

export interface WalletStats {
  totalRecharges: number;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
  favoriteVendor?: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
  maxDiscount?: number;
  expiresAt: string;
  isActive: boolean;
}
