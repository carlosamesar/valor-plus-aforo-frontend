'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Transaction } from '@/types/cashless';
import { formatCurrency } from '@/lib/mock-data-cashless';
import { ArrowDownLeft, ArrowUpRight, MapPin, Calendar, Download } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TransactionListProps {
  transactions: Transaction[];
  onExport?: () => void;
}

type FilterType = 'all' | 'payment' | 'recharge';

export function TransactionList({ transactions, onExport }: TransactionListProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'payment':
        return <ArrowUpRight className="h-5 w-5 text-red-500" />;
      case 'recharge':
        return <ArrowDownLeft className="h-5 w-5 text-green-500" />;
      case 'refund':
        return <ArrowDownLeft className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    const variants = {
      completed: { label: 'Completada', className: 'bg-green-500/10 text-green-500' },
      pending: { label: 'Pendiente', className: 'bg-yellow-500/10 text-yellow-500' },
      failed: { label: 'Fallida', className: 'bg-red-500/10 text-red-500' },
      cancelled: { label: 'Cancelada', className: 'bg-gray-500/10 text-gray-500' }
    };

    const variant = variants[status];
    return (
      <Badge variant="outline" className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todas
          </Button>
          <Button
            variant={filter === 'payment' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('payment')}
          >
            Pagos
          </Button>
          <Button
            variant={filter === 'recharge' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('recharge')}
          >
            Recargas
          </Button>
        </div>

        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No hay transacciones</p>
            </CardContent>
          </Card>
        ) : (
          filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    {getTransactionIcon(transaction.type)}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="mb-1 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{transaction.description}</h3>
                        {transaction.vendorName && (
                          <p className="text-sm text-muted-foreground">
                            {transaction.vendorName}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                          }`}
                        >
                          {transaction.amount < 0 ? '-' : '+'}
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {format(new Date(transaction.timestamp), "d MMM yyyy, HH:mm", {
                            locale: es
                          })}
                        </span>
                      </div>

                      {transaction.vendorLocation && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{transaction.vendorLocation}</span>
                        </div>
                      )}

                      {transaction.reference && (
                        <div className="font-mono">
                          Ref: {transaction.reference}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
