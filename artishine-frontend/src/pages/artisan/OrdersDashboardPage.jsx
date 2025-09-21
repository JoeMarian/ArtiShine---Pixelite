import React, { useState } from 'react';
import sampleData from '../../data/sampleData';
import OrderCard from '../../components/OrderCard';
import Navigation from '../../components/Navigation';
import { Package } from 'lucide-react';

const OrdersDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [orders, setOrders] = useState(sampleData.orders);

  const tabs = [
    { id: 'new', label: 'New', count: orders.filter((o) => o.status === 'new').length },
    { id: 'progress', label: 'In Progress', count: orders.filter((o) => o.status === 'progress').length },
    { id: 'completed', label: 'Completed', count: orders.filter((o) => o.status === 'completed').length },
  ];

  const filteredOrders = orders.filter((order) => order.status === activeTab);
  const handleStatusUpdate = (orderId, newStatus) => setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));

  return (
    <div className="min-h-screen  pb-20 pt-20">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2 text-white">Orders Dashboard</h1>
            <p className="text-muted-foreground">Manage your incoming orders</p>
          </div>

          <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeTab === tab.id ? 'bg-primary text-primary-foreground shadow-warm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => <OrderCard key={order.id} order={order} onStatusUpdate={handleStatusUpdate} />)
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold mb-2">No orders in this category</h3>
                <p className="text-muted-foreground">Orders will appear here when customers place them</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Navigation userRole="artisan" />
    </div>
  );
};

export default OrdersDashboardPage;


