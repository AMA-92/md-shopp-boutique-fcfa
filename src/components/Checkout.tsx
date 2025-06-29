
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import CheckoutHeader from './checkout/CheckoutHeader';
import OrderSummary from './checkout/OrderSummary';
import CustomerInfoForm from './checkout/CustomerInfoForm';
import PaymentMethodSelector from './checkout/PaymentMethodSelector';
import CheckoutFooter from './checkout/CheckoutFooter';

interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CheckoutItem[];
  onOrderComplete: (order: any) => void;
}

const Checkout = ({ isOpen, onClose, items, onOrderComplete }: CheckoutProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'wave' | 'orange' | 'cash_on_delivery'>('wave');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.address) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Vérifier le numéro de téléphone pour les paiements mobiles
    if ((paymentMethod === 'wave' || paymentMethod === 'orange') && !phoneNumber) {
      toast({
        title: "Numéro de téléphone requis",
        description: "Veuillez saisir votre numéro de téléphone pour le paiement mobile",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulation du processus de commande
    setTimeout(() => {
      const order = {
        id: Date.now(),
        items,
        total,
        customer: customerInfo,
        paymentMethod,
        phoneNumber: paymentMethod === 'cash_on_delivery' ? customerInfo.name : phoneNumber,
        status: 'pending',
        date: new Date().toISOString(),
      };

      onOrderComplete(order);
      setIsProcessing(false);
      
      if (paymentMethod === 'cash_on_delivery') {
        toast({
          title: "Commande créée",
          description: "Votre commande a été créée. Vous paierez à la livraison.",
        });
      } else {
        toast({
          title: "Commande créée",
          description: `Votre commande a été créée. Vous recevrez un SMS sur le ${phoneNumber} pour confirmer le paiement ${paymentMethod.toUpperCase()}.`,
        });
      }

      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl overflow-y-auto">
        <div className="flex flex-col h-full">
          <CheckoutHeader onClose={onClose} />

          <div className="flex-1 p-6 space-y-6">
            <OrderSummary items={items} />
            
            <CustomerInfoForm 
              customerInfo={customerInfo}
              onCustomerInfoChange={setCustomerInfo}
            />

            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              phoneNumber={phoneNumber}
              onPaymentMethodChange={setPaymentMethod}
              onPhoneNumberChange={setPhoneNumber}
              total={total}
            />
          </div>

          <CheckoutFooter
            total={total}
            paymentMethod={paymentMethod}
            isProcessing={isProcessing}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
