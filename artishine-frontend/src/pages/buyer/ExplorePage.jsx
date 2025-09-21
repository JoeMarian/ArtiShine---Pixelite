import React, { useState } from 'react';
import sampleData from '../../data/sampleData';
import TinderCard from 'react-tinder-card';
import ProductDiscoveryCard from '../../components/ProductDiscoveryCard';
import PrimaryButton from '../../components/PrimaryButton';
import Navigation from '../../components/Navigation';
import { Heart, Sparkles, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ExplorePage = () => {
  const [currentProducts, setCurrentProducts] = useState(sampleData.products);
  const [cartItems, setCartItems] = useState([]);
  const [lastDirection, setLastDirection] = useState('');

  const swiped = (direction, productId) => {
    setLastDirection(direction);
    if (direction === 'right') {
      const product = currentProducts.find((p) => p.id === productId);
      if (product) setCartItems((prev) => [...prev, product]);
    }
  };

  const outOfFrame = (productId) => setCurrentProducts((prev) => prev.filter((p) => p.id !== productId));

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    setCurrentProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Discover Crafts</h1>
            <p className="text-muted-foreground">Swipe right to add to cart, left to skip</p>
          </div>
          <div className="relative h-[85vh] mb-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <TinderCard key={product.id} onSwipe={(dir) => swiped(dir, product.id)} onCardLeftScreen={() => outOfFrame(product.id)} preventSwipe={['up', 'down']} className="absolute inset-0">
                  <ProductDiscoveryCard product={product} onAddToCart={() => addToCart(product)} />
                </TinderCard>
              ))
            ) : (
              <div className="card-warm h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Sparkles className="h-16 w-16 text-primary" />
                <h2 className="text-2xl font-serif font-bold">You've explored all crafts!</h2>
                <p className="text-muted-foreground">Check back later for new artisan creations</p>
                <PrimaryButton onClick={() => setCurrentProducts(sampleData.products)}>Restart Discovery</PrimaryButton>
              </div>
            )}
          </div>
          {currentProducts.length > 0 && (
            <div className="flex items-center justify-center space-x-8">
              <button onClick={() => swiped('left', currentProducts[currentProducts.length - 1]?.id)} className="w-16 h-16 rounded-full bg-card border-2 border-red-200 flex items-center justify-center hover:bg-red-50 transition-all duration-300 hover:scale-110 shadow-elegant">
                <X className="h-8 w-8 text-red-500" />
              </button>
              <button onClick={() => swiped('right', currentProducts[currentProducts.length - 1]?.id)} className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-110 shadow-warm">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </button>
            </div>
          )}
          {cartItems.length > 0 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed top-6 right-6 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-warm z-10">
              {cartItems.length}
            </motion.div>
          )}
        </div>
      </div>
      <Navigation userRole="buyer" />
    </div>
  );
};

export default ExplorePage;


