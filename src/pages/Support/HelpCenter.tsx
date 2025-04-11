
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  BookOpen,
  FileQuestion,
  LifeBuoy,
  MessageCircle,
  Package,
  Phone,
  Printer,
  Search,
  ShoppingBag,
  Truck,
  UserCog,
  Wallet
} from 'lucide-react';
import { toast } from 'sonner';

const HelpCenter: React.FC = () => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Search functionality will be implemented soon!");
  };

  const helpCategories = [
    { 
      title: 'Account & Orders', 
      icon: UserCog,
      topics: [
        { title: 'Create or Edit Account', link: '/faq#account' },
        { title: 'Order Status & History', link: '/faq#orders' },
        { title: 'Cancel or Modify Order', link: '/faq#cancel-order' },
        { title: 'Returns & Refunds', link: '/faq#returns' },
      ]
    },
    { 
      title: 'Shipping & Delivery', 
      icon: Truck,
      topics: [
        { title: 'Shipping Methods', link: '/shipping-policy#methods' },
        { title: 'Delivery Timeframes', link: '/shipping-policy#timeframes' },
        { title: 'Track Your Package', link: '/shipping-policy#tracking' },
        { title: 'International Shipping', link: '/shipping-policy#international' },
      ]
    },
    { 
      title: 'Print & Design', 
      icon: Printer,
      topics: [
        { title: 'File Requirements', link: '/faq#file-requirements' },
        { title: 'Design Templates', link: '/faq#templates' },
        { title: 'Custom Design Services', link: '/faq#custom-design' },
        { title: 'Color Matching', link: '/faq#color-matching' },
      ]
    },
    { 
      title: 'Payment', 
      icon: Wallet,
      topics: [
        { title: 'Payment Methods', link: '/faq#payment' },
        { title: 'Invoicing', link: '/faq#invoicing' },
        { title: 'Bulk Order Pricing', link: '/faq#bulk-pricing' },
        { title: 'GST & Taxation', link: '/faq#taxation' },
      ]
    },
  ];

  const popularArticles = [
    {
      title: 'How to track my order?',
      excerpt: 'Learn how to use our order tracking system and get real-time updates on your shipment.',
      link: '/faq#track-order'
    },
    {
      title: 'What file formats do you accept?',
      excerpt: 'We accept PDF, AI, PSD, JPG, and PNG files. For best results, we recommend vector formats.',
      link: '/faq#file-formats'
    },
    {
      title: 'Return policy for custom prints',
      excerpt: 'Custom print orders can be returned only if there's a quality issue or printing error from our side.',
      link: '/faq#return-policy'
    },
    {
      title: 'Bulk order discounts',
      excerpt: 'Learn about our special pricing for bulk orders and how to request a custom quote.',
      link: '/faq#bulk-discounts'
    },
  ];

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-primary/10 p-3 rounded-full mr-3">
          <LifeBuoy className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Help Center</h1>
      </div>
      
      <div className="bg-muted/30 border rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">How can we help you?</h2>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span>Help Categories</span>
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Popular Articles</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Contact Us</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.topics.map((topic, i) => (
                      <li key={i}>
                        <a 
                          href={topic.link}
                          className="text-muted-foreground hover:text-primary hover:underline flex items-center gap-2"
                        >
                          <FileQuestion className="h-4 w-4" />
                          {topic.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View all articles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline">
              <a href="/faq">View all FAQs</a>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="popular">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {popularArticles.map((article, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted/20 pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileQuestion className="h-5 w-5 text-primary" />
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">{article.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="text-primary">
                    <a href={article.link}>Read more</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline">
              <a href="/faq">Browse all articles</a>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For order inquiries, technical issues, or general questions.
                </p>
                <p className="font-medium">support@printify.com</p>
                <p className="text-sm text-muted-foreground mt-1">Response time: 24-48 hours</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => window.location.href = 'mailto:support@printify.com'}>
                  Send Email
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For urgent inquiries and immediate assistance.
                </p>
                <p className="font-medium">+91 98765 43210</p>
                <p className="text-sm text-muted-foreground mt-1">Monday to Friday, 9am - 6pm IST</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => window.location.href = 'tel:+919876543210'}>
                  Call Now
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Order Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For problems with your delivered order or product quality.
                </p>
                <p className="font-medium">orders@printify.com</p>
                <p className="text-sm text-muted-foreground mt-1">Please include your order number</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => window.location.href = 'mailto:orders@printify.com'}>
                  Report Issue
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              For business inquiries and partnerships, please contact us at <span className="font-medium">business@printify.com</span>
            </p>
            <Button asChild variant="outline">
              <a href="/contact">Visit Contact Page</a>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-12" />
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Our customer service team is ready to assist you with any questions or concerns you may have.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild>
            <a href="/contact">Contact Us</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/faq">View FAQs</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
