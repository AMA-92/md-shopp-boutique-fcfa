
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Phone, Mail, MapPin, Package, Clock, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  paymentMethod: 'wave' | 'orange';
  phoneNumber: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  date: string;
}

interface OrdersTabProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: number, status: Order['status']) => void;
}

const OrdersTab = ({ orders, onUpdateOrderStatus }: OrdersTabProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
      delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800' },
    };

    return (
      <Badge className={statusConfig[status].color}>
        {statusConfig[status].label}
      </Badge>
    );
  };

  const handleStatusUpdate = (orderId: number, newStatus: Order['status']) => {
    onUpdateOrderStatus(orderId, newStatus);
    toast({
      title: "Statut mis à jour",
      description: `La commande #${orderId} a été mise à jour`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des commandes</h2>
        <div className="text-sm text-gray-600">
          {orders.length} commande{orders.length > 1 ? 's' : ''} au total
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.phoneNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className={order.paymentMethod === 'wave' ? 'text-blue-600' : 'text-orange-600'} />
                      <span className="capitalize">{order.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">
                    {formatPrice(order.total)}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-sm">{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye size={16} className="mr-1" />
                            Voir
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Détails de la commande #{order.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              {/* Informations client */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <h4 className="font-semibold">Informations client</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium">Nom:</span>
                                      <span>{selectedOrder.customer.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Phone size={16} />
                                      <span>{selectedOrder.phoneNumber}</span>
                                    </div>
                                    {selectedOrder.customer.email && (
                                      <div className="flex items-center space-x-2">
                                        <Mail size={16} />
                                        <span>{selectedOrder.customer.email}</span>
                                      </div>
                                    )}
                                    <div className="flex items-start space-x-2">
                                      <MapPin size={16} className="mt-0.5" />
                                      <span>{selectedOrder.customer.address}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <h4 className="font-semibold">Détails de la commande</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium">Date:</span>
                                      <span>{formatDate(selectedOrder.date)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium">Paiement:</span>
                                      <span className="capitalize">{selectedOrder.paymentMethod}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium">Statut:</span>
                                      {getStatusBadge(selectedOrder.status)}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Articles commandés */}
                              <div>
                                <h4 className="font-semibold mb-3">Articles commandés</h4>
                                <div className="border rounded-lg overflow-hidden">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Produit</TableHead>
                                        <TableHead>Quantité</TableHead>
                                        <TableHead>Prix unitaire</TableHead>
                                        <TableHead>Total</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {selectedOrder.items.map((item) => (
                                        <TableRow key={item.id}>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell>{item.quantity}</TableCell>
                                          <TableCell>{formatPrice(item.price)}</TableCell>
                                          <TableCell className="font-medium">
                                            {formatPrice(item.price * item.quantity)}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                      <TableRow>
                                        <TableCell colSpan={3} className="font-bold">Total</TableCell>
                                        <TableCell className="font-bold text-green-600">
                                          {formatPrice(selectedOrder.total)}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>

                              {/* Actions de statut */}
                              <div>
                                <h4 className="font-semibold mb-3">Modifier le statut</h4>
                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    onClick={() => handleStatusUpdate(selectedOrder.id, 'confirmed')}
                                    disabled={selectedOrder.status === 'confirmed'}
                                    className="bg-blue-600 hover:bg-blue-700"
                                    size="sm"
                                  >
                                    <CheckCircle size={16} className="mr-1" />
                                    Confirmer
                                  </Button>
                                  <Button
                                    onClick={() => handleStatusUpdate(selectedOrder.id, 'delivered')}
                                    disabled={selectedOrder.status === 'delivered'}
                                    className="bg-green-600 hover:bg-green-700"
                                    size="sm"
                                  >
                                    <Package size={16} className="mr-1" />
                                    Marquer comme livrée
                                  </Button>
                                  <Button
                                    onClick={() => handleStatusUpdate(selectedOrder.id, 'cancelled')}
                                    disabled={selectedOrder.status === 'cancelled'}
                                    variant="destructive"
                                    size="sm"
                                  >
                                    <X size={16} className="mr-1" />
                                    Annuler
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
