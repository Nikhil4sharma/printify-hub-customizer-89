
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "You can place an order by browsing our products, selecting the items you want, and proceeding to checkout. Follow the steps to provide your shipping and payment details to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, UPI, net banking, and popular wallets like PayTM and PhonePe."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within major cities, and 5-7 business days for other areas. Express shipping options are available at checkout for faster delivery."
    },
    {
      question: "Can I customize my print orders?",
      answer: "Yes! We offer customization options for most of our print products. You can upload your designs or use our design templates and customize them according to your requirements."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy for products with manufacturing defects. Custom print orders cannot be returned unless there's a quality issue or printing error from our side."
    },
    {
      question: "Do you offer bulk order discounts?",
      answer: "Yes, we offer special pricing for bulk orders. Please contact our customer service team for a custom quote based on your requirements."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your order through our website or the courier partner's website."
    },
    {
      question: "What file formats do you accept for printing?",
      answer: "We accept high-resolution PDF, AI, PSD, JPG, and PNG files. For best results, we recommend vector formats like PDF or AI with text converted to outlines."
    },
  ];

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-primary/10 p-3 rounded-full mr-3">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Common Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-2">Still have questions?</p>
        <h3 className="text-2xl font-bold mb-4">We're here to help</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Our customer service team is available from 9am to 6pm.</p>
              <p className="font-medium">Email: support@printify.com</p>
              <p className="font-medium">Phone: +91 98765 43210</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg">Visit Help Center</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Explore our detailed guides and resources.</p>
              <a href="/help-center" className="text-primary font-medium hover:underline">
                Browse Help Articles →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
