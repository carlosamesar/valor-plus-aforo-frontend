'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Wallet, WalletStats } from '@/types/cashless';
import { formatCurrency } from '@/lib/mock-data-cashless';
import { Wallet as WalletIcon, Plus, Eye, EyeOff, TrendingUp, CreditCard } from 'lucide-react';

interface WalletCardProps {
  wallet: Wallet;
  stats: WalletStats;
  onRecharge?: () => void;
}

export function WalletCard({ wallet, stats, onRecharge }: WalletCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="space-y-4">
      {/* Main Wallet Card */}
      <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <WalletIcon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Mi Billetera Digital
                </span>
              </div>
              {wallet.isActive ? (
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Activa
                </Badge>
              ) : (
                <Badge variant="outline" className="border-red-500 text-red-500">
                  Inactiva
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-sm text-muted-foreground">Saldo disponible</p>
            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold">
                {showBalance ? formatCurrency(wallet.balance, wallet.currency) : '$ •••••'}
              </p>
              {wallet.balance < 10000 && (
                <Badge variant="outline" className="border-amber-500 text-amber-500">
                  Saldo bajo
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={onRecharge} className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              Recargar
            </Button>
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Historial
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Gastado</p>
                <p className="text-xl font-bold text-red-500">
                  {formatCurrency(stats.totalSpent, wallet.currency)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Transacciones</p>
                <p className="text-xl font-bold">{stats.transactionCount}</p>
              </div>
              <CreditCard className="h-8 w-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Promedio</p>
                <p className="text-xl font-bold">
                  {formatCurrency(stats.averageTransaction, wallet.currency)}
                </p>
              </div>
              <WalletIcon className="h-8 w-8 text-green-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Favorite Vendor */}
      {stats.favoriteVendor && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <p className="mb-1 text-xs font-medium text-muted-foreground">
              Tu lugar favorito
            </p>
            <p className="font-semibold">🏆 {stats.favoriteVendor}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
