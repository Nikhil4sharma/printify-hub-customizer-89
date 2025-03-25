
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Check, Pencil, User, X } from 'lucide-react';
import AccountLayout from './AccountLayout';

const ProfilePage = () => {
  const { user, updateProfile, addAddress } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  });
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: true,
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      mobile: formData.mobile,
    });
    
    setEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleAddAddress = () => {
    addAddress(newAddress);
    setShowAddressForm(false);
    setNewAddress({
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      isDefault: true,
    });
    
    toast({
      title: "Address Added",
      description: "Your address has been added successfully.",
    });
  };

  return (
    <AccountLayout>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setEditing(!editing)}
              >
                {editing ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-muted mx-auto mb-4">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{user?.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mobile Number</p>
                      <p className="font-medium">{user?.mobile || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {editing && (
              <CardFooter className="justify-end space-x-2">
                <Button onClick={handleSave}>
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="addresses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Saved Addresses</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAddressForm(!showAddressForm)}
              >
                {showAddressForm ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    Add New
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {showAddressForm ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Textarea
                      id="street"
                      name="street"
                      value={newAddress.street}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={newAddress.postalCode}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={newAddress.country}
                        onChange={handleAddressChange}
                        disabled
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddAddress} className="w-full">
                    Add Address
                  </Button>
                </div>
              ) : (
                <div>
                  {user?.addresses && user.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map((address, index) => (
                        <div key={address.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <h3 className="font-medium">Address {index + 1}</h3>
                              {address.isDefault && (
                                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.postalCode}</p>
                          <p>{address.country}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">You haven't added any addresses yet.</p>
                      <Button onClick={() => setShowAddressForm(true)}>
                        Add Your First Address
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AccountLayout>
  );
};

export default ProfilePage;
