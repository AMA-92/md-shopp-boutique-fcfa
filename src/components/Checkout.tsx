
import React, { useState } from 'react';
import { X, CreditCard, Phone, CheckCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

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

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

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
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <h2 className="text-xl font-semibold">Finaliser la commande</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-6">
            {/* Résumé de la commande */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Résumé de la commande</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Informations client */}
            <div className="space-y-4">
              <h3 className="font-semibold">Informations de livraison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Adresse de livraison *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  placeholder="Votre adresse complète"
                />
              </div>
            </div>

            {/* Méthode de paiement */}
            <div className="space-y-4">
              <h3 className="font-semibold">Méthode de paiement</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('wave')}
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
                  onClick={() => setPaymentMethod('orange')}
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
                  onClick={() => setPaymentMethod('cash_on_delivery')}
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
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
          </div>

          {/* Footer */}
          <div className="border-t p-6">
            <Button
              onClick={handlePayment}
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;
