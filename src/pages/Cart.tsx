
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { BadgeIndianRupee, MinusCircle, PlusCircle, ShoppingBag, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some products to your cart",
        variant: "destructive",
      });
      return;
    }
    navigate('/checkout');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products/all">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {items.map((cartItem) => (
            <motion.div key={cartItem.id} variants={item} className="mb-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{cartItem.name}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            <p>Size: {cartItem.customization.size}</p>
                            <p>Material: {cartItem.customization.material}</p>
                          </div>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                          <BadgeIndianRupee className="h-4 w-4 mr-1" />
                          <span className="font-semibold">{cartItem.price.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(cartItem.id, Math.max(1, cartItem.quantity - 1))}
                            className="h-8 w-8"
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center">{cartItem.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(cartItem.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
            <Link to="/products/all">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </motion.div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <div className="flex items-center">
                    <BadgeIndianRupee className="h-4 w-4 mr-1" />
                    <span>{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <div className="flex items-center">
                    <BadgeIndianRupee className="h-4 w-4 mr-1" />
                    <span>{(totalPrice > 0 ? 150 : 0).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <div className="flex items-center">
                    <BadgeIndianRupee className="h-4 w-4 mr-1" />
                    <span>{(totalPrice + (totalPrice > 0 ? 150 : 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
