
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { DollarSign, Check, ChevronRight } from 'lucide-react';

const CheckoutPage = () => {
  const { items, clearCart, totalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Simulate order placement
    clearCart();
    toast({
      title: "Order placed successfully",
      description: "Your order has been placed successfully",
    });
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button onClick={() => navigate('/products/all')}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              {items.map((cartItem) => (
                <div key={cartItem.id} className="flex flex-col md:flex-row md:items-center justify-between py-5 border-b gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden shrink-0">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{cartItem.name}</h4>
                      <div className="text-sm text-muted-foreground space-y-1 mt-1">
                        <p>Size: {cartItem.customization.size}</p>
                        <p>Material: {cartItem.customization.material}</p>
                        <p>Orientation: {cartItem.customization.orientation}</p>
                        {cartItem.customization.addons?.length > 0 && (
                          <p>Treatment: {cartItem.customization.addons[0]}</p>
                        )}
                        {cartItem.customization.quantity && (
                          <p>Quantity: {cartItem.customization.quantity} pcs</p>
                        )}
                        {cartItem.customization.designFile && (
                          <p>Design file: {cartItem.customization.designFile}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 inline-block" />
                    {(cartItem.price * cartItem.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              
              <div className="mt-4">
                <Button onClick={() => navigate('/cart')}>Edit Cart</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{(totalPrice > 0 ? 150 : 0).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{(totalPrice + (totalPrice > 0 ? 150 : 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
