
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CustomerInfo {
  name: string;
  email: string;
  address: string;
}

interface CustomerInfoFormProps {
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (info: CustomerInfo) => void;
}

const CustomerInfoForm = ({ customerInfo, onCustomerInfoChange }: CustomerInfoFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Informations de livraison</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            value={customerInfo.name}
            onChange={(e) => onCustomerInfoChange({...customerInfo, name: e.target.value})}
            placeholder="Votre nom complet"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => onCustomerInfoChange({...customerInfo, email: e.target.value})}
            placeholder="votre@email.com"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="address">Adresse de livraison *</Label>
        <Input
          id="address"
          value={customerInfo.address}
          onChange={(e) => onCustomerInfoChange({...customerInfo, address: e.target.value})}
          placeholder="Votre adresse complète"
        />
      </div>
    </div>
  );
};

export default CustomerInfoForm;
