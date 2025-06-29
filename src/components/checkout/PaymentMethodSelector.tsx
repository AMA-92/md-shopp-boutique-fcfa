
import React from 'react';
import { Phone, Truck } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type PaymentMethod = 'wave' | 'orange' | 'cash_on_delivery';

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod;
  phoneNumber: string;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onPhoneNumberChange: (phone: string) => void;
  total: number;
}

const PaymentMethodSelector = ({ 
  paymentMethod, 
  phoneNumber, 
  onPaymentMethodChange, 
  onPhoneNumberChange,
  total 
}: PaymentMethodSelectorProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Méthode de paiement</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onPaymentMethodChange('wave')}
          className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-all ${
            paymentMethod === 'wave'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Phone size={16} className="text-white" />
          </div>
          <span className="font-medium">Wave</span>
        </button>
        <button
          onClick={() => onPaymentMethodChange('orange')}
          className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-all ${
            paymentMethod === 'orange'
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
            <Phone size={16} className="text-white" />
          </div>
          <span className="font-medium">Orange Money</span>
        </button>
        <button
          onClick={() => onPaymentMethodChange('cash_on_delivery')}
          className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-all ${
            paymentMethod === 'cash_on_delivery'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <Truck size={16} className="text-white" />
          </div>
          <div className="text-left">
            <div className="font-medium text-sm">Paiement</div>
            <div className="text-xs text-gray-600">à la livraison</div>
          </div>
        </button>
      </div>

      {(paymentMethod === 'wave' || paymentMethod === 'orange') && (
        <div>
          <Label htmlFor="phone">Numéro de téléphone *</Label>
          <Input
            id="phone"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            placeholder="+221 77 876 20 82"
          />
          <p className="text-sm text-gray-600 mt-1">
            Vous recevrez un SMS pour confirmer le paiement {paymentMethod.toUpperCase()}
          </p>
        </div>
      )}

      {paymentMethod === 'cash_on_delivery' && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 text-green-800">
            <Truck size={20} />
            <span className="font-medium">Paiement à la livraison</span>
          </div>
          <p className="text-sm text-green-700 mt-2">
            Vous paierez en espèces lors de la réception de votre commande. 
            Assurez-vous d'avoir le montant exact : <strong>{formatPrice(total)}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
