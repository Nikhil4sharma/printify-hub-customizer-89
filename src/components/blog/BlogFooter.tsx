
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BlogFooterProps {
  categories: Array<{ name: string; slug: string }>;
}

const BlogFooter: React.FC<BlogFooterProps> = ({ categories }) => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Printify Blog</h3>
            <p className="text-muted-foreground">Expert printing tips, design inspiration, and business growth strategies for print entrepreneurs.</p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com/printify" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/printify" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/printify" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/printify" className="text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link to={`/category/${category.slug}`} className="text-muted-foreground hover:text-primary">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://printify.com/faq" className="text-muted-foreground hover:text-primary">FAQs</a></li>
              <li><a href="https://printify.com/help-center" className="text-muted-foreground hover:text-primary">Help Center</a></li>
              <li><a href="https://printify.com/shipping-policy" className="text-muted-foreground hover:text-primary">Shipping Policy</a></li>
              <li><a href="https://printify.com/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Subscribe to our Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Stay updated with our latest articles, printing tips, and industry news</p>
            <form className="space-y-2">
              <Input placeholder="Your email address" />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Printify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;
