'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper';
import { AttendeeForm } from '@/components/checkout/AttendeeForm';
import { PaymentMethods } from '@/components/checkout/PaymentMethods';
import { BillingForm } from '@/components/checkout/BillingForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCartStore } from '@/lib/store/useCartStore';
import { generateMockOrder } from '@/lib/mock-data-tickets';
import type { AttendeeInfo, PaymentMethodType } from '@/types/ticket';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    eventId,
    checkoutStep,
    attendees,
    paymentMethod,
    billing,
    setCheckoutStep,
    setAttendees,
    setPaymentMethod,
    setBilling,
    setCurrentOrder,
    clearCart,
    getTotalTickets
  } = useCartStore();

  const [currentAttendeeIndex, setCurrentAttendeeIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalTickets = getTotalTickets();

  // Redirect si no hay items en el carrito
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/eventos');
    }
  }, [cart, router]);

  if (cart.length === 0) {
    return null; // Loading hasta que redirija
  }

  // Handler: Guardar datos de un asistente
  const handleSaveAttendee = (data: AttendeeInfo) => {
    const newAttendees = [...attendees];
    newAttendees[currentAttendeeIndex] = data;
    setAttendees(newAttendees);

    // Si hay más asistentes, ir al siguiente
    if (currentAttendeeIndex < totalTickets - 1) {
      setCurrentAttendeeIndex(currentAttendeeIndex + 1);
    } else {
      // Todos los asistentes completados, ir a pago
      setCheckoutStep('payment');
      setCurrentAttendeeIndex(0);
    }
  };

  // Handler: Llenar "Soy yo" con datos del primer asistente
  const handleFillWithMe = () => {
    if (attendees.length > 0 && attendees[0]) {
      const newAttendees = [...attendees];
      newAttendees[currentAttendeeIndex] = attendees[0];
      setAttendees(newAttendees);
    }
  };

  // Handler: Seleccionar método de pago
  const handleSelectPayment = (method: PaymentMethodType) => {
    setPaymentMethod(method);
  };

  // Handler: Continuar después de seleccionar pago
  const handleContinueFromPayment = () => {
    if (!paymentMethod) {
      alert('Selecciona un método de pago');
      return;
    }
    setCheckoutStep('review');
  };

  // Handler: Confirmar orden
  const handleConfirmOrder = async (billingData: typeof billing) => {
    if (!eventId || !paymentMethod) return;

    setIsProcessing(true);

    try {
      // Simular delay de procesamiento
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generar orden mock
      const order = generateMockOrder(eventId, cart, attendees);
      order.billing = billingData!;
      order.payment.method = paymentMethod;

      // Guardar orden en store
      setCurrentOrder(order);

      // Limpiar carrito
      clearCart();

      // Redirigir a confirmación
      router.push(`/confirmacion?orderId=${order.id}`);
    } catch (error) {
      console.error('Error al procesar orden:', error);
      alert('Hubo un error al procesar tu orden. Por favor intenta de nuevo.');
      setIsProcessing(false);
    }
  };

  // Handler: Volver al paso anterior
  const handleBack = () => {
    if (checkoutStep === 'payment') {
      setCheckoutStep('attendees');
    } else if (checkoutStep === 'review') {
      setCheckoutStep('payment');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-background/50 py-8">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <button
              onClick={() => router.back()}
              className="mb-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>

            <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
              Checkout Seguro
            </Badge>
            <h1 className="text-3xl font-bold md:text-4xl">Finalizar Compra</h1>

            {/* Stepper */}
            <div className="mt-8">
              <CheckoutStepper currentStep={checkoutStep} />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {/* Left: Forms (2 columns) */}
          <div className="lg:col-span-2">
            {/* STEP 1: Datos de Asistentes */}
            {checkoutStep === 'attendees' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Datos de los Asistentes</h2>
                  <p className="mt-1 text-muted-foreground">
                    Completa los datos de cada asistente ({currentAttendeeIndex + 1} de{' '}
                    {totalTickets})
                  </p>
                </div>

                <AttendeeForm
                  attendeeIndex={currentAttendeeIndex}
                  totalAttendees={totalTickets}
                  initialData={attendees[currentAttendeeIndex]}
                  onSubmit={handleSaveAttendee}
                  onFillWithMe={currentAttendeeIndex > 0 ? handleFillWithMe : undefined}
                />

                {/* Progress indicator */}
                {totalTickets > 1 && (
                  <div className="rounded-lg border border-border/40 bg-card/50 p-4 text-sm">
                    <p className="font-medium">Progreso</p>
                    <div className="mt-2 flex gap-1">
                      {Array.from({ length: totalTickets }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full ${
                            i < attendees.filter(Boolean).length
                              ? 'bg-primary'
                              : i === currentAttendeeIndex
                              ? 'bg-primary/50'
                              : 'bg-border/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Método de Pago */}
            {checkoutStep === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Método de Pago</h2>
                  <p className="mt-1 text-muted-foreground">
                    Selecciona cómo deseas pagar tus tickets
                  </p>
                </div>

                <PaymentMethods selectedMethod={paymentMethod} onSelect={handleSelectPayment} />

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    Atrás
                  </Button>
                  <Button onClick={handleContinueFromPayment} className="flex-1">
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Revisar y Confirmar */}
            {checkoutStep === 'review' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Revisar y Confirmar</h2>
                  <p className="mt-1 text-muted-foreground">
                    Completa la información de facturación y confirma tu orden
                  </p>
                </div>

                <BillingForm
                  initialData={
                    billing ||
                    (attendees[0]
                      ? {
                          fullName: attendees[0].name,
                          email: attendees[0].email,
                          phone: attendees[0].phone,
                          documentType: 'CC' as const,
                          documentNumber: '',
                          address: '',
                          city: 'Bogotá',
                          country: 'Colombia'
                        }
                      : undefined)
                  }
                  onSubmit={handleConfirmOrder}
                  onBack={handleBack}
                />

                {isProcessing && (
                  <div className="rounded-lg border border-border/40 bg-card/50 p-6 text-center">
                    <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="font-medium">Procesando tu pago...</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      No cierres esta ventana
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Order Summary (Sticky) */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <OrderSummary />
          </div>
        </div>
      </section>
    </div>
  );
}
