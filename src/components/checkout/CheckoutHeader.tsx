
import React from 'react';
import { X } from 'lucide-react';

interface CheckoutHeaderProps {
  onClose: () => void;
}

const CheckoutHeader = ({ onClose }: CheckoutHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <h2 className="text-xl font-semibold">Finaliser la commande</h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-white/20 rounded-full transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CheckoutHeader;
