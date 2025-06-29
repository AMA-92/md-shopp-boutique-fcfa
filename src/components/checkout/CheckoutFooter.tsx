
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PaymentMethod = 'wave' | 'orange' | 'cash_on_delivery';

interface CheckoutFooterProps {
  total: number;
  paymentMethod: PaymentMethod;
  isProcessing: boolean;
  onPayment: () => void;
}

const CheckoutFooter = ({ total, paymentMethod, isProcessing, onPayment }: CheckoutFooterProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  return (
    <div className="border-t p-6">
      <Button
        onClick={onPayment}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-lg font-semibold"
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Traitement en cours...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <CheckCircle size={20} />
            <span>
              {paymentMethod === 'cash_on_delivery' 
                ? `Commander - ${formatPrice(total)}` 
                : `Confirmer la commande - ${formatPrice(total)}`
              }
            </span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default CheckoutFooter;
