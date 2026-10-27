'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WalletCard } from '@/components/cashless/WalletCard';
import { TransactionList } from '@/components/cashless/TransactionList';
import { RechargeModal } from '@/components/cashless/RechargeModal';
import { VendorList } from '@/components/cashless/VendorList';
import {
  mockWallet,
  mockTransactions,
  mockWalletStats,
  mockVendors
} from '@/lib/mock-data-cashless';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { ArrowLeft, Wallet, History, Store, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'wallet' | 'transactions' | 'vendors' | 'stats';

export default function CashlessPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('wallet');
  const [showRechargeModal, setShowRechargeModal] = useState(false);

  const event = MOCK_EVENTS.find((e) => e.id === resolvedParams.id);

  if (!event) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold">Evento no encontrado</h1>
      </div>
    );
  }

  const tabs = [
    {
      id: 'wallet' as Tab,
      label: 'Mi Billetera',
      icon: Wallet
    },
    {
      id: 'transactions' as Tab,
      label: 'Historial',
      icon: History
    },
    {
      id: 'vendors' as Tab,
      label: 'Puntos de venta',
      icon: Store
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div>
              <button
                onClick={() => router.back()}
                className="mb-2 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </button>
              <h1 className="text-2xl font-bold">{event.title}</h1>
              <p className="text-sm text-muted-foreground">Cashless - Billetera Digital</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border/40 bg-background">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-8">
        {activeTab === 'wallet' && (
          <div className="mx-auto max-w-2xl">
            <WalletCard
              wallet={mockWallet}
              stats={mockWalletStats}
              onRecharge={() => setShowRechargeModal(true)}
            />

            {/* Tips */}
            <div className="mt-8 space-y-4">
              <h3 className="font-semibold">💡 Consejos para usar tu billetera</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="mb-2 font-medium">✅ Sin comisiones</h4>
                  <p className="text-sm text-muted-foreground">
                    Todas las recargas y pagos son sin costo adicional
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="mb-2 font-medium">⚡ Pagos instantáneos</h4>
                  <p className="text-sm text-muted-foreground">
                    Escanea el QR y paga en segundos sin hacer fila
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="mb-2 font-medium">🔒 100% seguro</h4>
                  <p className="text-sm text-muted-foreground">
                    Tus datos están protegidos con encriptación de nivel bancario
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="mb-2 font-medium">💸 Reembolso garantizado</h4>
                  <p className="text-sm text-muted-foreground">
                    El saldo no usado se devuelve automáticamente al finalizar
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="mx-auto max-w-3xl">
            <TransactionList
              transactions={mockTransactions}
              onExport={() => console.log('Export transactions')}
            />
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="mx-auto max-w-4xl">
            <VendorList
              vendors={mockVendors}
              onScan={(vendorId) => {
                if (vendorId) {
                  console.log('Pay at vendor:', vendorId);
                } else {
                  console.log('Open QR scanner');
                }
                alert('Scanner QR - En producción abrirá la cámara para escanear');
              }}
            />
          </div>
        )}
      </section>

      {/* Recharge Modal */}
      {showRechargeModal && (
        <RechargeModal
          onRecharge={(amount, method) => {
            console.log('Recharge:', amount, method);
            alert(`Recarga exitosa de $${amount.toLocaleString()} vía ${method}`);
          }}
          onClose={() => setShowRechargeModal(false)}
        />
      )}
    </div>
  );
}
