import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { BadgeIndianRupee, Check, CreditCard, MapPin } from 'lucide-react';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  
  const shippingCost = items.length > 0 ? 150 : 0;
  const totalWithShipping = totalPrice + shippingCost;
  
  // If cart is empty, redirect to cart page
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success message
      clearCart();
      
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed successfully. Thank you for shopping with us!",
      });
      
      // Redirect to order success page
      navigate('/account/orders');
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  1
                </div>
                <h2 className="text-xl font-semibold">Shipping Information</h2>
              </div>
              
              {(step === 1 || step > 1) && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        defaultValue={user?.name.split(' ')[0] || ''} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        defaultValue={user?.name.split(' ')[1] || ''} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue={user?.email || ''} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      defaultValue={user?.mobile || ''} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      required 
                      defaultValue={user?.addresses?.[0]?.street || ''}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        required 
                        defaultValue={user?.addresses?.[0]?.city || ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select defaultValue={user?.addresses?.[0]?.state || "Delhi"}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                          <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="Karnataka">Karnataka</SelectItem>
                          <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input 
                        id="postalCode" 
                        required 
                        defaultValue={user?.addresses?.[0]?.postalCode || ''}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea id="notes" placeholder="Notes about your order, e.g. special delivery instructions" />
                  </div>
                  
                  {step === 1 && (
                    <Button className="w-full mt-2" onClick={() => setStep(2)}>
                      Continue to Payment
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className={step < 2 ? 'opacity-70' : undefined}>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>
              
              {step === 2 && (
                <div className="space-y-6">
                  <RadioGroup 
                    defaultValue={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="cursor-pointer">UPI Payment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="cursor-pointer">Cash On Delivery</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mt-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input id="nameOnCard" required />
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 mt-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input id="upiId" placeholder="example@upi" required />
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full" 
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-muted rounded-md overflow-hidden flex-shrink-0 mr-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3 w-3 mr-1" />
                      <span>{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
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
                      <span>{shippingCost.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-4 w-4 mr-1" />
                      <span>{totalWithShipping.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-3 rounded-lg mt-4">
                  <div className="flex items-center mb-2">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <p className="text-sm font-medium">Free returns within 30 days</p>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-primary mr-2" />
                    <p className="text-sm text-muted-foreground">Estimated delivery: 3-5 business days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
