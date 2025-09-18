import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import { Settings, Sparkles, Star, User, ShoppingCart } from 'lucide-react';

const ProductDiscoveryCard = ({ product, onAddToCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 50);
  };

  return (
    <div className="h-[85vh] w-full max-w-sm mx-auto card-warm overflow-hidden">
      <div className="h-full overflow-y-auto custom-scrollbar" onScroll={handleScroll}>
        <div className="relative h-96">
          <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 image-overlay"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-serif font-bold mb-2">{product.tagline}</h2>
            <p className="text-sm opacity-90">{product.forWhom}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">{product.title}</h1>
            <div className="flex items-center text-muted-foreground text-sm">
              <span className="bg-accent/20 text-accent px-2 py-1 rounded-full">{product.category}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-serif font-bold text-lg mb-2 flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" /> Who Made It?
              </h3>
              <p className="text-muted-foreground leading-relaxed">{product.whoMadeIt}</p>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg mb-2 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary" /> Made Of
              </h3>
              <p className="text-muted-foreground leading-relaxed">{product.madeOf}</p>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg mb-2 flex items-center">
                <Settings className="mr-2 h-5 w-5 text-primary" /> How It's Made
              </h3>
              <p className="text-muted-foreground leading-relaxed">{product.howItsMade}</p>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg mb-2 flex items-center">
                <Star className="mr-2 h-5 w-5 text-primary" /> Cultural Significance
              </h3>
              <p className="text-muted-foreground leading-relaxed">{product.culturalSignificance}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              <span className="text-sm text-muted-foreground">Handcrafted with love</span>
            </div>
            <PrimaryButton onClick={onAddToCart} size="lg" className="w-full" icon={<ShoppingCart className="h-5 w-5" />}>
              Add to Cart
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDiscoveryCard;


