
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Lock, Eye, Server, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { fadeIn, staggerChildren, itemFadeIn } from '@/utils/transitions';

const PrivacyPolicy: React.FC = () => {
  return (
    <motion.div 
      className="container max-w-4xl mx-auto py-12 px-4"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <motion.div 
        className="flex items-center justify-center mb-8"
        variants={fadeIn}
        custom={1}
      >
        <div className="bg-primary/10 p-3 rounded-full mr-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
      </motion.div>
      
      <motion.div variants={itemFadeIn}>
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Last Updated: April 10, 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              At Printify, we respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you 
              use our website and services.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        className="space-y-8"
        variants={staggerChildren}
      >
        <motion.div variants={itemFadeIn}>
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">Personal Information</h3>
              <p className="text-muted-foreground">When you create an account, place an order, or fill out forms on our website, we may collect:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Contact information (name, email address, phone number, shipping/billing address)</li>
                <li>Account credentials (username, password)</li>
                <li>Payment information (credit card details, bank details)</li>
                <li>Order history and preferences</li>
                <li>Communication and customer service correspondence</li>
              </ul>
              
              <Separator />
              
              <h3 className="font-semibold">Technical Information</h3>
              <p className="text-muted-foreground">When you browse our website, we automatically collect:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Time zone setting and location</li>
                <li>Operating system and platform</li>
                <li>Pages visited and interaction information</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemFadeIn}>
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use your personal information for the following purposes:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">Essential Services</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Process and fulfill your orders</li>
                    <li>Manage your account</li>
                    <li>Process payments and refunds</li>
                    <li>Provide customer support</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">Improving Our Services</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Analyze website usage and trends</li>
                    <li>Develop new products and features</li>
                    <li>Improve user experience</li>
                    <li>Troubleshoot technical issues</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">Communications</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Send order confirmations and updates</li>
                    <li>Respond to your inquiries</li>
                    <li>Provide information about products and services</li>
                    <li>Send marketing communications (with consent)</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">Legal and Security</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Comply with legal obligations</li>
                    <li>Enforce our terms and conditions</li>
                    <li>Prevent fraud and abuse</li>
                    <li>Protect our rights and property</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemFadeIn}>
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We implement appropriate security measures to protect your personal information 
                from unauthorized access, alteration, disclosure, or destruction. These include:
              </p>
              
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication procedures</li>
                <li>Secure data storage systems</li>
                <li>Staff training on data protection</li>
              </ul>
              
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-300">
                  <strong>Note:</strong> While we take all reasonable steps to protect your information, 
                  no method of transmission over the Internet or electronic storage is 100% secure. 
                  We cannot guarantee absolute security of your data.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemFadeIn}>
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Your Privacy Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You have certain rights regarding your personal information:</p>
              
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You can ask us to rectify inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.</li>
                <li><strong>Restriction:</strong> You can ask us to restrict processing of your information.</li>
                <li><strong>Objection:</strong> You can object to our processing of your information in certain cases.</li>
                <li><strong>Data portability:</strong> You can request transfer of your information in a machine-readable format.</li>
                <li><strong>Withdraw consent:</strong> You can withdraw consent for marketing communications at any time.</li>
              </ul>
              
              <p>To exercise any of these rights, please contact us at privacy@printify.com.</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-8 text-center"
        variants={fadeIn}
        transition={{ delay: 0.6 }}
      >
        <p className="text-muted-foreground">
          By using our website and services, you consent to the terms of this Privacy Policy. 
          We may update this policy occasionally, and any changes will be posted on this page.
        </p>
        <p className="mt-4">
          <strong>Questions about our Privacy Policy?</strong> Contact our Privacy Officer at privacy@printify.com
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Visit our <a href="https://blog.printify.com/privacy" className="text-primary hover:underline">blog</a> for more information about data privacy and security best practices.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;
