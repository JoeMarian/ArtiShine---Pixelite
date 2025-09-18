import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import { motion, AnimatePresence } from 'framer-motion';

const ProductManagementCard = ({ product, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative card-warm card-hover group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square">
        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/80 flex items-center justify-center space-x-4"
            >
              <PrimaryButton onClick={onEdit} variant="outline" size="sm" icon={<Edit className="h-4 w-4" />}>
                Edit
              </PrimaryButton>
              <PrimaryButton onClick={onDelete} variant="wood" size="sm" icon={<Trash2 className="h-4 w-4" />}>
                Delete
              </PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4">
        <h3 className="font-serif font-bold text-lg mb-1">{product.title}</h3>
        <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          <span className="text-xs text-muted-foreground">ID: {product.id}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementCard;


