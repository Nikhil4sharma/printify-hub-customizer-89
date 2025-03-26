
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { IndianRupee, Check, ChevronRight, MapPin, PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(6, 'Postal code must be at least 6 characters'),
  country: z.string().min(1, 'Country is required'),
  isDefault: z.boolean().optional(),
});

const checkoutSchema = z.object({
  addressId: z.string().min(1, 'Please select an address'),
  paymentMethod: z.enum(['cash', 'online', 'upi'], {
    required_error: "Please select a payment method",
  }),
});

const NewAddressForm = ({ onAddAddress, onCancel }: { onAddAddress: (address: any) => void, onCancel: () => void }) => {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      isDefault: false,
    },
  });

  const onSubmit = (data: z.infer<typeof addressSchema>) => {
    onAddAddress(data);
    form.reset();
  };

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">Add New Address</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="street" className="text-sm font-medium">Street Address</label>
              <input
                {...form.register('street')}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your street address"
              />
              {form.formState.errors.street && (
                <p className="text-sm text-red-500">{form.formState.errors.street.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">City</label>
              <input
                {...form.register('city')}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your city"
              />
              {form.formState.errors.city && (
                <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium">State</label>
              <input
                {...form.register('state')}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your state"
              />
              {form.formState.errors.state && (
                <p className="text-sm text-red-500">{form.formState.errors.state.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="postalCode" className="text-sm font-medium">Postal Code</label>
              <input
                {...form.register('postalCode')}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your postal code"
              />
              {form.formState.errors.postalCode && (
                <p className="text-sm text-red-500">{form.formState.errors.postalCode.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">Country</label>
              <input
                {...form.register('country')}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your country"
                defaultValue="India"
              />
              {form.formState.errors.country && (
                <p className="text-sm text-red-500">{form.formState.errors.country.message}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="isDefault"
                {...form.register('isDefault')}
                className="rounded border-gray-300"
              />
              <label htmlFor="isDefault" className="text-sm font-medium">
                Set as default address
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save Address</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const CheckoutPage = () => {
  const { items, clearCart, totalPrice } = useCart();
  const { user, addAddress } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cash',
      addressId: user?.addresses.find(addr => addr.isDefault)?.id || '',
    },
  });

  const handleAddAddress = (addressData: any) => {
    addAddress(addressData);
    setShowAddressForm(false);
    toast({
      title: "Address added",
      description: "Your new address has been added successfully",
    });
  };

  const handlePlaceOrder = (values: z.infer<typeof checkoutSchema>) => {
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
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Shipping Address
              </h3>
              
              {user && user.addresses.length > 0 ? (
                <>
                  <Form {...form}>
                    <form>
                      <FormField
                        control={form.control}
                        name="addressId"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-3"
                              >
                                {user.addresses.map((address) => (
                                  <FormItem
                                    key={address.id}
                                    className="flex items-start space-x-3 space-y-0 border p-4 rounded-md"
                                  >
                                    <FormControl>
                                      <RadioGroupItem value={address.id} />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer flex-1">
                                      <div className="flex justify-between">
                                        <div>
                                          <p className="font-medium">{user.name}</p>
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {address.street}, {address.city}, {address.state} - {address.postalCode}
                                          </p>
                                          <p className="text-sm text-muted-foreground">
                                            {address.country}
                                          </p>
                                        </div>
                                        {address.isDefault && (
                                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                            Default
                                          </span>
                                        )}
                                      </div>
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="flex items-center"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      {showAddressForm ? "Cancel" : "Add New Address"}
                    </Button>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-muted-foreground mb-4">No saved addresses found. Please add a new address.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Address
                  </Button>
                </div>
              )}
              
              {showAddressForm && (
                <NewAddressForm 
                  onAddAddress={handleAddAddress}
                  onCancel={() => setShowAddressForm(false)}
                />
              )}
            </CardContent>
          </Card>
          
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
                    <IndianRupee className="h-4 w-4 mr-1 inline-block" />
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
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePlaceOrder)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md">
                              <FormControl>
                                <RadioGroupItem value="cash" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Cash on Delivery
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md">
                              <FormControl>
                                <RadioGroupItem value="online" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Credit/Debit Card
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md">
                              <FormControl>
                                <RadioGroupItem value="upi" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                UPI Payment
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        <span>{totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        <span>{(totalPrice > 0 ? 150 : 0).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        <span>{(totalPrice + (totalPrice > 0 ? 150 : 0)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    type="submit"
                    disabled={!form.formState.isValid || user?.addresses.length === 0}
                  >
                    Place Order
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
