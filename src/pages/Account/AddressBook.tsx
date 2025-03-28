
import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Mock address data
const initialAddresses = [
  {
    id: 1,
    type: 'home',
    isDefault: true,
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    type: 'office',
    isDefault: false,
    name: 'John Doe',
    street: '456 Business Ave, Suite 200',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    country: 'United States',
    phone: '+1 (555) 987-6543'
  }
];

interface Address {
  id: number;
  type: 'home' | 'office' | 'other';
  isDefault: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

const AddressBook: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { toast } = useToast();
  
  // Function to add a new address
  const handleAddAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = {
      ...address,
      id: addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1
    };
    
    // If this is the first address or marked as default, update all others
    let updatedAddresses = [...addresses];
    if (newAddress.isDefault || addresses.length === 0) {
      updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
    }
    
    setAddresses([...updatedAddresses, newAddress]);
    toast({
      title: "Address added",
      description: "Your new address has been added successfully.",
    });
  };
  
  // Function to update an existing address
  const handleUpdateAddress = (updatedAddress: Address) => {
    let newAddresses = [...addresses];
    
    // If setting as default, update all others
    if (updatedAddress.isDefault) {
      newAddresses = newAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === updatedAddress.id
      }));
    } else {
      // Ensure at least one address is default
      const hasDefault = newAddresses.some(
        addr => addr.id !== updatedAddress.id && addr.isDefault
      );
      
      if (!hasDefault) {
        toast({
          title: "Default address required",
          description: "At least one address must be set as default.",
          variant: "destructive"
        });
        return;
      }
      
      newAddresses = newAddresses.map(addr => 
        addr.id === updatedAddress.id ? updatedAddress : addr
      );
    }
    
    setAddresses(newAddresses);
    setEditingAddress(null);
    toast({
      title: "Address updated",
      description: "Your address has been updated successfully."
    });
  };
  
  // Function to delete an address
  const handleDeleteAddress = (id: number) => {
    const addressToDelete = addresses.find(addr => addr.id === id);
    
    // Check if deleting the default address
    if (addressToDelete?.isDefault && addresses.length > 1) {
      toast({
        title: "Cannot delete default address",
        description: "Please set another address as default before deleting this one.",
        variant: "destructive"
      });
      return;
    }
    
    const newAddresses = addresses.filter(addr => addr.id !== id);
    
    // If we deleted the only address, there's nothing more to do
    if (newAddresses.length === 0) {
      setAddresses([]);
      toast({
        title: "Address deleted",
        description: "Your address has been removed successfully."
      });
      return;
    }
    
    // If we deleted the default address, set the first one as default
    if (addressToDelete?.isDefault) {
      newAddresses[0].isDefault = true;
    }
    
    setAddresses(newAddresses);
    toast({
      title: "Address deleted",
      description: "Your address has been removed successfully."
    });
  };
  
  // Function to set an address as default
  const handleSetDefault = (id: number) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    
    setAddresses(updatedAddresses);
    toast({
      title: "Default address updated",
      description: "Your default shipping address has been updated."
    });
  };
  
  const AddressForm = ({ address, onSubmit, closeDialog }: { 
    address?: Address, 
    onSubmit: (address: any) => void,
    closeDialog: () => void
  }) => {
    const [formData, setFormData] = useState<any>({
      type: address?.type || 'home',
      isDefault: address?.isDefault || false,
      name: address?.name || '',
      street: address?.street || '',
      city: address?.city || '',
      state: address?.state || '',
      zipCode: address?.zipCode || '',
      country: address?.country || 'United States',
      phone: address?.phone || ''
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleRadioChange = (value: string) => {
      setFormData(prev => ({ ...prev, type: value }));
    };
    
    const handleDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, isDefault: e.target.checked }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(address ? { ...formData, id: address.id } : formData);
      closeDialog();
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input 
              id="street" 
              name="street" 
              value={formData.street} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input 
                id="state" 
                name="state" 
                value={formData.state} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              <Input 
                id="zipCode" 
                name="zipCode" 
                value={formData.zipCode} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                name="country" 
                value={formData.country} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Address Type</Label>
            <RadioGroup value={formData.type} onValueChange={handleRadioChange} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id="home" />
                <Label htmlFor="home">Home</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="office" id="office" />
                <Label htmlFor="office">Office</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={handleDefaultChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="isDefault">Set as default shipping address</Label>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">{address ? 'Update Address' : 'Add Address'}</Button>
        </DialogFooter>
      </form>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Address Book</h1>
          <p className="text-muted-foreground">Manage your shipping and billing addresses</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <AddressForm 
              onSubmit={handleAddAddress}
              closeDialog={() => {}}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <Separator />
      
      {addresses.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No addresses yet</h3>
          <p className="mt-1 text-muted-foreground">Add your first shipping address to get started</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-6">
                <Plus className="mr-2 h-4 w-4" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <AddressForm 
                onSubmit={handleAddAddress}
                closeDialog={() => {}}
              />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <span className="capitalize">{address.type} Address</span>
                  {address.isDefault && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      Default
                    </span>
                  )}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setEditingAddress(address)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px]">
                      <DialogHeader>
                        <DialogTitle>Edit Address</DialogTitle>
                      </DialogHeader>
                      <AddressForm 
                        address={address} 
                        onSubmit={handleUpdateAddress}
                        closeDialog={() => setEditingAddress(null)}
                      />
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <p className="font-medium">{address.name}</p>
                  <p className="text-sm text-muted-foreground">{address.street}</p>
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-sm text-muted-foreground">{address.country}</p>
                  <p className="text-sm">{address.phone}</p>
                  
                  {!address.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-4" 
                      onClick={() => handleSetDefault(address.id)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Set as Default
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBook;
