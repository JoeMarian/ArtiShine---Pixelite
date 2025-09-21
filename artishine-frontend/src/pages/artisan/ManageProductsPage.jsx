import React, { useState } from 'react';
import sampleData from '../../data/sampleData';
import PrimaryButton from '../../components/PrimaryButton';
import ProductManagementCard from '../../components/ProductManagementCard';
import Navigation from '../../components/Navigation';
import { Plus } from 'lucide-react';

const ManageProductsPage = () => {
  const [products] = useState(sampleData.products);
  return (
    <div className="min-h-screen  pb-20 pt-20">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2 text-white">My Products</h1>
              <p className="text-muted-foreground">Manage your digital storefront</p>
            </div>
            <PrimaryButton onClick={() => (window.location.href = '/upload')} icon={<Plus className="h-5 w-5" />}>
              Add Product
            </PrimaryButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductManagementCard key={product.id} product={product} onEdit={() => alert(`Edit ${product.title}`)} onDelete={() => alert(`Delete ${product.title}`)} />
            ))}
          </div>
        </div>
      </div>
      <Navigation userRole="artisan" />
    </div>
  );
};

export default ManageProductsPage;


