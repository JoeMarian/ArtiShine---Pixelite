import React, { useState } from 'react';
import sampleData from '../../data/sampleData';
import { Trash2, ShoppingCart } from 'lucide-react';
import PrimaryButton from '../../components/PrimaryButton';
import Navigation from '../../components/Navigation';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([sampleData.products[0], sampleData.products[2]]);
  const removeFromCart = (productId) => setCartItems((prev) => prev.filter((i) => i.id !== productId));
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen  pb-20">
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Your Cart</h1>
            <p className="text-muted-foreground">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} selected</p>
          </div>

          {cartItems.length > 0 ? (
            <div className="space-y-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="card-warm p-4 flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.category}</p>
                      <p className="text-primary font-bold">₹{item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-2">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="card-warm p-6 space-y-4">
                <h3 className="font-serif font-bold text-xl">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{total}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-primary">₹{total}</span></div>
                  </div>
                </div>
                <PrimaryButton size="lg" className="w-full" onClick={() => alert('Proceeding to checkout...')}>
                  Proceed to Checkout
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Discover beautiful crafts in the explore section</p>
              <PrimaryButton onClick={() => (window.location.href = '/explore')}>Start Shopping</PrimaryButton>
            </div>
          )}
        </div>
      </div>
      <Navigation userRole="buyer" />
    </div>
  );
};

export default CartPage;


