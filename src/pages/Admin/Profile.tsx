
import React, { useState } from 'react';
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
import { ProfileForm } from '@/components/Admin/ProfileForm';
import { PasswordChangeSection } from '@/components/Admin/PasswordChangeSection';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Clock, 
  Terminal, 
  Settings, 
  BellRing, 
  History,
  User,
  Lock,
  Bell,
  LayoutGrid,
  Monitor,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!admin) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Session Expired</CardTitle>
            <CardDescription>
              Please login again to access your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate('/admin/login')}>
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl px-4 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Profile</h1>
        <p className="text-muted-foreground">
          Manage your admin account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar with Profile Summary */}
        <Card className="lg:col-span-4 h-fit bg-card shadow-md border border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-primary">
                  <AvatarImage src="" alt={admin?.name || 'Admin'} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {admin?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold">{admin?.name}</h3>
                <div className="flex items-center justify-center mt-1">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {admin?.role}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{admin?.email}</p>
              </div>
              
              <Separator className="my-2" />
              
              <div className="w-full space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Role</p>
                    <p className="text-sm text-muted-foreground capitalize">{admin?.role}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Terminal className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Permissions</p>
                    <p className="text-sm text-muted-foreground">Full Access</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Last Login</p>
                    <p className="text-sm text-muted-foreground">
                      {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Quick Access Links */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Quick Access</h4>
              
              {['account', 'security', 'preferences'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full flex items-center justify-between p-3 rounded-md text-left transition-colors ${
                    activeTab === tab 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center">
                    {tab === 'account' && <User className="h-4 w-4 mr-3" />}
                    {tab === 'security' && <Lock className="h-4 w-4 mr-3" />}
                    {tab === 'preferences' && <Settings className="h-4 w-4 mr-3" />}
                    <span className="capitalize">{tab}</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </div>

            <Separator className="my-6" />

            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <div className="lg:col-span-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <div className="space-y-6">
                <ProfileForm />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Log</CardTitle>
                    <CardDescription>
                      Recent account activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: 'Login', date: new Date().toLocaleString(), ip: '192.168.1.1', device: 'Chrome / Windows' },
                        { action: 'Password Changed', date: new Date(Date.now() - 86400000).toLocaleString(), ip: '192.168.1.1', device: 'Chrome / Windows' },
                        { action: 'Login', date: new Date(Date.now() - 172800000).toLocaleString(), ip: '192.168.1.1', device: 'Safari / macOS' },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <History className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-muted-foreground">{activity.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">{activity.ip}</p>
                            <p className="text-xs text-muted-foreground">{activity.device}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="ghost" size="sm" className="mt-4">
                      View Full Activity Log
                    </Button>
                  </CardContent>
                </Card>
              </div>
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
                    <div className="flex items-center justify-between space-x-4 p-4 bg-muted/50 rounded-lg border border-border/50">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Authenticator App</p>
                          <p className="text-sm text-muted-foreground">
                            Use an authenticator app to generate one-time codes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="authenticator" />
                        <Label htmlFor="authenticator" className="sr-only">Enable authenticator app</Label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between space-x-4 p-4 bg-muted/50 rounded-lg border border-border/50">
                      <div className="flex items-start space-x-3">
                        <Bell className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">SMS Authentication</p>
                          <p className="text-sm text-muted-foreground">
                            Receive a code via SMS to verify your identity
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="sms-auth" />
                        <Label htmlFor="sms-auth" className="sr-only">Enable SMS authentication</Label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                      <div className="flex items-start space-x-3">
                        <Lock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Recovery Codes</p>
                          <p className="text-sm text-muted-foreground">
                            Generate backup codes to use when you can't access other methods
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Generate Codes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Active Sessions</CardTitle>
                      <CardDescription>
                        Manage your active login sessions
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                      Logout All Devices
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Monitor className="h-5 w-5 text-primary" />
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium">Current Session</p>
                                <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                                  Active
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Started {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            End
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted/50 border border-border/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Monitor className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Chrome on Windows</p>
                              <p className="text-sm text-muted-foreground">
                                Last active: {new Date(Date.now() - 86400000).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            End
                          </Button>
                        </div>
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
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                        <div className="flex items-start space-x-3">
                          <Monitor className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Dark Mode</p>
                            <p className="text-sm text-muted-foreground">
                              Toggle between light and dark mode
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="dark-mode" />
                          <Label htmlFor="dark-mode" className="sr-only">Toggle dark mode</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Notifications</h3>
                    <div className="grid gap-4">
                      {[
                        { 
                          title: 'New Orders', 
                          description: 'Get notified when new orders are placed',
                          icon: <BellRing className="h-5 w-5 text-primary mt-0.5" />,
                          defaultChecked: true
                        },
                        { 
                          title: 'Low Stock Alerts', 
                          description: 'Get notified when product stock is low',
                          icon: <BellRing className="h-5 w-5 text-primary mt-0.5" />,
                          defaultChecked: true
                        },
                        { 
                          title: 'User Registrations', 
                          description: 'Get notified when new users register',
                          icon: <BellRing className="h-5 w-5 text-primary mt-0.5" />,
                          defaultChecked: false
                        }
                      ].map((notification, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                          <div className="flex items-start space-x-3">
                            {notification.icon}
                            <div>
                              <p className="font-medium">{notification.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {notification.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id={`notification-${i}`} defaultChecked={notification.defaultChecked} />
                            <Label htmlFor={`notification-${i}`} className="sr-only">
                              Toggle {notification.title}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Dashboard Layout</h3>
                    <div className="grid gap-4">
                      {[
                        { 
                          title: 'Compact View', 
                          description: 'Show more information in less space',
                          icon: <LayoutGrid className="h-5 w-5 text-primary mt-0.5" />,
                          defaultChecked: false
                        },
                        { 
                          title: 'Sidebar Collapsed by Default', 
                          description: 'Start with a collapsed sidebar for more screen space',
                          icon: <LayoutGrid className="h-5 w-5 text-primary mt-0.5" />,
                          defaultChecked: false
                        }
                      ].map((setting, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                          <div className="flex items-start space-x-3">
                            {setting.icon}
                            <div>
                              <p className="font-medium">{setting.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {setting.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id={`setting-${i}`} defaultChecked={setting.defaultChecked} />
                            <Label htmlFor={`setting-${i}`} className="sr-only">
                              Toggle {setting.title}
                            </Label>
                          </div>
                        </div>
                      ))}
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
