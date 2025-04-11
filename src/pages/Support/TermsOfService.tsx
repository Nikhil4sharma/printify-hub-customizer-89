
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Scale, AlertCircle, Pencil } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const TermsOfService: React.FC = () => {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-primary/10 p-3 rounded-full mr-3">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Terms of Service</h1>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Last Updated: April 10, 2025</CardTitle>
          <CardDescription>
            Please read these terms carefully before using our services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            These Terms of Service ("Terms") govern your access to and use of Printify's website, 
            products, and services. By accessing or using our services, you agree to be bound by 
            these Terms. If you do not agree to these Terms, please do not use our services.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5" />
              1. Account Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To access certain features of our website, you may need to create an account. When creating an account, you agree to:
            </p>
            
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your account and password</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            
            <p className="text-muted-foreground">
              We reserve the right to terminate accounts, remove content, or cancel orders at our discretion, 
              including for violations of these Terms or for any other reason we deem appropriate.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              2. Products and Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">2.1 Custom Print Orders</h3>
            <p className="text-muted-foreground">
              For custom print orders, you represent that you own or have permission to use any content 
              you submit for printing. You are solely responsible for ensuring that your submitted content 
              does not infringe on any third-party rights, including copyright, trademark, or privacy rights.
            </p>
            
            <Separator className="my-4" />
            
            <h3 className="font-semibold">2.2 Product Information</h3>
            <p className="text-muted-foreground">
              We strive to provide accurate product information, including pricing and availability. 
              However, we do not warrant that product descriptions or other content on the site is accurate, 
              complete, reliable, current, or error-free. Colors in particular may vary depending on display 
              settings and printing processes.
            </p>
            
            <Separator className="my-4" />
            
            <h3 className="font-semibold">2.3 Pricing and Payment</h3>
            <p className="text-muted-foreground">
              All prices are in Indian Rupees (₹) and subject to change without notice. We reserve the right 
              to refuse or cancel orders, including after an order has been confirmed and payment has been processed.
            </p>
            
            <Separator className="my-4" />
            
            <h3 className="font-semibold">2.4 Order Acceptance</h3>
            <p className="text-muted-foreground">
              Your order is an offer to purchase our products. We are not obligated to accept your order and 
              may refuse or limit orders at our discretion. Receipt of an order confirmation does not constitute 
              acceptance of your order.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              3. Limitations and Disclaimers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-4 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Disclaimer of Warranties:</h3>
              <p className="text-amber-700 dark:text-amber-400">
                OUR SERVICES AND PRODUCTS ARE PROVIDED "AS IS" WITHOUT ANY WARRANTIES, EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.
              </p>
            </div>
            
            <h3 className="font-semibold">3.1 Limitation of Liability</h3>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, Printify shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages arising out of or relating to 
              your use of our services or products.
            </p>
            
            <h3 className="font-semibold">3.2 Force Majeure</h3>
            <p className="text-muted-foreground">
              We shall not be liable for any failure or delay in performance due to circumstances 
              beyond our reasonable control, including but not limited to acts of God, natural disasters, 
              pandemic, civil unrest, terrorism, or governmental actions.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>4. Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of India, 
              without regard to its conflict of law provisions. Any legal action or proceeding arising 
              out of or relating to these Terms shall be exclusively brought in the courts located in Mumbai, 
              Maharashtra, India.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>5. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to update or modify these Terms at any time without prior notice. 
              Your continued use of our services after any changes to the Terms constitutes your 
              acceptance of those changes. It is your responsibility to review these Terms periodically.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
        </p>
        <p className="mt-4">
          <strong>Questions about our Terms of Service?</strong> Contact our legal team at legal@printify.com
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
