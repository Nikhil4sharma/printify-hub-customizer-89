
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your website settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Basic information about your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="site-name">
                  Site Name
                </label>
                <Input id="site-name" defaultValue="Modern Printing Co." />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="site-description">
                  Site Description
                </label>
                <Textarea id="site-description" defaultValue="Premium printing services for businesses and individuals." />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="contact-email">
                  Contact Email
                </label>
                <Input id="contact-email" type="email" defaultValue="contact@modernprinting.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="contact-phone">
                  Contact Phone
                </label>
                <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="dark-mode-default">
                    Use Dark Mode as Default
                  </label>
                  <Switch id="dark-mode-default" />
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, the website will load in dark mode by default.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="allow-theme-switching">
                    Allow Theme Switching
                  </label>
                  <Switch id="allow-theme-switching" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, users can switch between light and dark mode.
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Homepage Banner</CardTitle>
              <CardDescription>Manage your homepage banner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="show-banner">
                    Show Banner
                  </label>
                  <Switch id="show-banner" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="banner-text">
                  Banner Text
                </label>
                <Input id="banner-text" defaultValue="Special Offer: 20% off all Business Cards!" />
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your website for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="meta-title">
                  Meta Title
                </label>
                <Input id="meta-title" defaultValue="Modern Printing Co. | Premium Printing Services" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="meta-description">
                  Meta Description
                </label>
                <Textarea id="meta-description" defaultValue="High-quality printing services for businesses and individuals. Order business cards, stationery, carry bags, and custom packaging boxes." />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="meta-keywords">
                  Meta Keywords
                </label>
                <Input id="meta-keywords" defaultValue="printing, business cards, stationery, packaging, boxes" />
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="enable-cod">
                    Cash on Delivery
                  </label>
                  <Switch id="enable-cod" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="enable-upi">
                    UPI Payments
                  </label>
                  <Switch id="enable-upi" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="enable-cards">
                    Card Payments
                  </label>
                  <Switch id="enable-cards" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
