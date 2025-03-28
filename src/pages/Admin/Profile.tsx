
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Shield, Clock, Terminal, Settings, BellRing } from 'lucide-react';
import { ProfileForm } from '@/components/Admin/ProfileForm';
import { PasswordChangeSection } from '@/components/Admin/PasswordChangeSection';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AdminProfile = () => {
  const { admin } = useAdminAuth();

  return (
    <div className="container max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Profile</h1>
        <p className="text-muted-foreground">
          Manage your admin account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={admin?.name || 'Admin'} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {admin?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-semibold">{admin?.name}</h3>
                <p className="text-sm text-muted-foreground">{admin?.role}</p>
              </div>
              
              <Separator className="my-2" />
              
              <div className="w-full space-y-3">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Role</p>
                    <p className="text-sm text-muted-foreground capitalize">{admin?.role}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Terminal className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Permissions</p>
                    <p className="text-sm text-muted-foreground">Full Access</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Last Login</p>
                    <p className="text-sm text-muted-foreground">
                      {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-3">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <ProfileForm />
            </TabsContent>
            
            <TabsContent value="security">
              <div className="space-y-6">
                <PasswordChangeSection />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Authenticator App</p>
                        <p className="text-sm text-muted-foreground">
                          Use an authenticator app to generate one-time codes
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="authenticator" />
                        <Label htmlFor="authenticator" className="sr-only">Enable authenticator app</Label>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Receive a code via SMS to verify your identity
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="sms-auth" />
                        <Label htmlFor="sms-auth" className="sr-only">Enable SMS authentication</Label>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Recovery Codes</p>
                        <p className="text-sm text-muted-foreground">
                          Generate backup codes to use when you can't access other methods
                        </p>
                      </div>
                      <div>
                        <button className="text-sm text-primary hover:underline">
                          Generate Codes
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Login Sessions</CardTitle>
                    <CardDescription>
                      Manage your active sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            Started {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            Active Now
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-end">
                        <button className="text-sm text-destructive hover:underline">
                          Logout All Other Sessions
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Interface Preferences</CardTitle>
                  <CardDescription>
                    Customize your admin dashboard experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Theme</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">
                          Toggle between light and dark mode
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="dark-mode" />
                        <Label htmlFor="dark-mode" className="sr-only">Toggle dark mode</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Orders</p>
                          <p className="text-sm text-muted-foreground">
                            Get notified when new orders are placed
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="new-orders" defaultChecked />
                          <Label htmlFor="new-orders" className="sr-only">Toggle new order notifications</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Low Stock Alerts</p>
                          <p className="text-sm text-muted-foreground">
                            Get notified when product stock is low
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="low-stock" defaultChecked />
                          <Label htmlFor="low-stock" className="sr-only">Toggle low stock notifications</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">User Registrations</p>
                          <p className="text-sm text-muted-foreground">
                            Get notified when new users register
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="user-reg" />
                          <Label htmlFor="user-reg" className="sr-only">Toggle user registration notifications</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Dashboard Layout</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Compact View</p>
                          <p className="text-sm text-muted-foreground">
                            Show more information in less space
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="compact-view" />
                          <Label htmlFor="compact-view" className="sr-only">Toggle compact view</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sidebar Collapsed by Default</p>
                          <p className="text-sm text-muted-foreground">
                            Start with a collapsed sidebar for more screen space
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="sidebar-collapsed" />
                          <Label htmlFor="sidebar-collapsed" className="sr-only">Toggle sidebar collapse</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
