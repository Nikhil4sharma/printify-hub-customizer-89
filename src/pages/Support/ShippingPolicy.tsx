
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Truck, PackageCheck, AlertTriangle, Clock, BadgeIndianRupee } from 'lucide-react';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-primary/10 p-3 rounded-full mr-3">
          <Truck className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Shipping Policy</h1>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Delivery Timeframes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We aim to deliver your products as quickly and efficiently as possible. Please note that delivery times may vary based on your location and the shipping method chosen.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Standard Shipping</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Metro Cities: 3-5 business days</li>
                  <li>Other Cities: 5-7 business days</li>
                  <li>Remote Areas: 7-10 business days</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Express Shipping</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Metro Cities: 1-2 business days</li>
                  <li>Other Cities: 2-3 business days</li>
                  <li>Remote Areas: 3-5 business days</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeIndianRupee className="h-5 w-5" />
              Shipping Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Our shipping costs are calculated based on the weight, dimensions, and delivery location of your order.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/60">
                    <th className="border p-2 text-left">Order Value</th>
                    <th className="border p-2 text-left">Standard Shipping</th>
                    <th className="border p-2 text-left">Express Shipping</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Below ₹500</td>
                    <td className="border p-2">₹80</td>
                    <td className="border p-2">₹150</td>
                  </tr>
                  <tr>
                    <td className="border p-2">₹500 - ₹1000</td>
                    <td className="border p-2">₹60</td>
                    <td className="border p-2">₹120</td>
                  </tr>
                  <tr>
                    <td className="border p-2">₹1000 - ₹2000</td>
                    <td className="border p-2">₹40</td>
                    <td className="border p-2">₹100</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Above ₹2000</td>
                    <td className="border p-2 font-medium text-green-600">FREE</td>
                    <td className="border p-2">₹80</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageCheck className="h-5 w-5" />
              Tracking Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Once your order is dispatched, you will receive a tracking number via email and SMS. You can track your order in the following ways:</p>
            
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Through your account on our website under "My Orders"</li>
              <li>By clicking the tracking link in the dispatch confirmation email</li>
              <li>By contacting our customer service with your order number</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-4 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Please Note:</h3>
              <ul className="list-disc list-inside space-y-2 text-yellow-700 dark:text-yellow-400">
                <li>Orders are processed and shipped on business days only (Monday to Friday, excluding holidays)</li>
                <li>Delivery timeframes are estimates and may be affected by factors beyond our control</li>
                <li>For bulk orders or custom print jobs, delivery times may be longer</li>
                <li>We currently ship only within India</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2">Order Cancellation</h3>
              <p className="text-muted-foreground">You can cancel your order before it enters the "Processing" stage. Once an order is in processing, it cannot be cancelled, especially for custom print orders.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Shipping Address Changes</h3>
              <p className="text-muted-foreground">To change your shipping address, please contact our customer service team as soon as possible. Address changes can only be accommodated if the order has not yet been dispatched.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">If you have any questions about our shipping policy, please contact us at <span className="font-medium">support@printify.com</span></p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
