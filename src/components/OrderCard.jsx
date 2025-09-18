import React from 'react';
import { CheckCircle, Clock, MessageCircle, Package } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

const OrderCard = ({ order, onStatusUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <Clock className="h-4 w-4" />;
      case 'progress':
        return <Package className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="card-warm p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-serif font-bold text-lg mb-1">{order.productTitle}</h3>
          <p className="text-muted-foreground text-sm">Order #{order.id}</p>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          <span className="capitalize">{order.status}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Customer:</span>
          <span className="font-medium">{order.buyerName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Address:</span>
          <span className="font-medium text-right max-w-48 truncate">{order.buyerAddress}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Amount:</span>
          <span className="font-bold text-primary">₹{order.amount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Date:</span>
          <span className="font-medium">{order.orderDate}</span>
        </div>
      </div>

      {order.status !== 'completed' && (
        <div className="flex space-x-2 pt-2">
          <PrimaryButton onClick={() => onStatusUpdate?.(order.id, 'progress')} variant="terracotta" size="sm" className="flex-1">
            Accept Order
          </PrimaryButton>
          <PrimaryButton onClick={() => {}} variant="outline" size="sm" icon={<MessageCircle className="h-4 w-4" />}>
            Contact
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default OrderCard;


