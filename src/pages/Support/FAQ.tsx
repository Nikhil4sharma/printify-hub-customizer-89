
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, scaleIn } from '@/utils/transitions';

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
    <motion.div 
      className="container max-w-4xl mx-auto py-12 px-4"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <motion.div 
        className="flex items-center justify-center mb-12"
        variants={scaleIn}
      >
        <div className="bg-primary/10 p-3 rounded-full mr-3">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
      </motion.div>
      
      <motion.div variants={fadeIn}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Common Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
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
      </motion.div>

      <motion.div 
        className="mt-16 text-center"
        variants={fadeIn}
        transition={{ delay: 0.4 }}
      >
        <p className="text-muted-foreground mb-2">Still have questions?</p>
        <h3 className="text-2xl font-bold mb-6">We're here to help</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Card className="flex-1 hover-scale transition-all">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="bg-primary/10 p-1.5 rounded-full">
                  <HelpCircle className="h-4 w-4 text-primary" />
                </span>
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Our customer service team is available from 9am to 6pm.</p>
              <p className="font-medium">Email: support@printify.com</p>
              <p className="font-medium">Phone: +91 98765 43210</p>
              <div className="mt-4">
                <a 
                  href="/contact" 
                  className="text-primary font-medium inline-flex items-center hover:underline"
                >
                  Contact us <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 hover-scale transition-all">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="bg-primary/10 p-1.5 rounded-full">
                  <HelpCircle className="h-4 w-4 text-primary" />
                </span>
                Visit Help Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Explore our detailed guides and resources.</p>
              <a href="/help-center" className="text-primary font-medium inline-flex items-center hover:underline">
                Browse Help Articles <ArrowRight className="h-4 w-4 ml-1" />
              </a>
              <div className="mt-4">
                <a 
                  href="https://blog.printify.com/support" 
                  className="text-primary font-medium inline-flex items-center hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Read our blog <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;
