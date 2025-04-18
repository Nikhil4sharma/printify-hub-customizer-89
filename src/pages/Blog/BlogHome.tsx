
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeIn, staggerChildren, itemFadeIn } from '@/utils/transitions';

// Sample blog posts data
const featuredPosts = [
  {
    id: 1,
    title: "10 Essential Tips for High-Quality Business Card Printing",
    excerpt: "Learn the insider secrets to creating premium business cards that leave a lasting impression on your clients and partners.",
    slug: "business-card-printing-tips",
    category: "printing-tips",
    categoryName: "Printing Tips",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&auto=format&fit=crop",
    author: "Priya Sharma",
    date: "April 15, 2025"
  },
  {
    id: 2,
    title: "Color Psychology in Branding: Choose the Right Colors for Your Print Materials",
    excerpt: "Discover how different colors affect customer perception and how to strategically use color in your print designs.",
    slug: "color-psychology-branding",
    category: "design-inspiration",
    categoryName: "Design Inspiration",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop",
    author: "Alex Johnson",
    date: "April 10, 2025"
  },
  {
    id: 3,
    title: "Sustainable Printing: Eco-Friendly Options for Your Business",
    excerpt: "Explore environmentally responsible printing solutions that reduce your carbon footprint while maintaining quality.",
    slug: "sustainable-printing-options",
    category: "industry-news",
    categoryName: "Industry News",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop",
    author: "Sam Wilson",
    date: "April 5, 2025"
  },
];

const recentPosts = [
  {
    id: 4,
    title: "How to Design Effective Product Packaging That Sells",
    excerpt: "Learn the key elements of packaging design that captures attention and drives purchasing decisions.",
    slug: "effective-product-packaging-design",
    category: "design-inspiration",
    categoryName: "Design Inspiration",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&auto=format&fit=crop",
    author: "Nina Patel",
    date: "April 3, 2025"
  },
  {
    id: 5,
    title: "Print Marketing in 2025: What's Working Now",
    excerpt: "Discover the latest trends and strategies in print marketing that are delivering results for businesses.",
    slug: "print-marketing-trends-2025",
    category: "business-growth",
    categoryName: "Business Growth",
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop",
    author: "Michael Chen",
    date: "March 28, 2025"
  },
  {
    id: 6,
    title: "Case Study: How Company X Increased Sales with Custom Packaging",
    excerpt: "See how strategic packaging redesign helped this company boost sales by 45% in just three months.",
    slug: "custom-packaging-case-study",
    category: "case-studies",
    categoryName: "Case Studies",
    image: "https://images.unsplash.com/photo-1574241298600-78e7e4843233?w=800&auto=format&fit=crop",
    author: "Sara Ahmed",
    date: "March 25, 2025"
  },
  {
    id: 7,
    title: "Choosing the Right Paper: A Guide for Different Print Projects",
    excerpt: "Navigate the world of paper stocks, weights, and finishes to select the perfect option for any printing job.",
    slug: "choosing-right-paper-guide",
    category: "printing-tips",
    categoryName: "Printing Tips",
    image: "https://images.unsplash.com/photo-1517686748843-bb360cfc62b3?w=800&auto=format&fit=crop",
    author: "David Thompson",
    date: "March 20, 2025"
  },
  {
    id: 8,
    title: "Digital vs. Offset Printing: When to Use Each Method",
    excerpt: "Understand the pros and cons of digital and offset printing to make informed decisions for your projects.",
    slug: "digital-vs-offset-printing",
    category: "printing-tips",
    categoryName: "Printing Tips",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
    author: "Jennifer Lopez",
    date: "March 18, 2025"
  },
];

const BlogHome: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12"
        variants={fadeIn}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Printify Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Expert printing tips, design inspiration, and business growth strategies for print entrepreneurs
        </p>
      </motion.div>
      
      {/* Featured Posts */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Articles</h2>
          <Link to="/category/featured" className="text-primary hover:underline flex items-center text-sm font-medium">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerChildren}
        >
          {featuredPosts.map((post) => (
            <motion.div key={post.id} variants={itemFadeIn}>
              <Card className="h-full hover:shadow-md transition-all overflow-hidden group">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <Link 
                    to={`/category/${post.category}`}
                    className="absolute top-4 left-4 bg-primary text-xs font-medium px-2 py-1 rounded-full text-white"
                  >
                    {post.categoryName}
                  </Link>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="font-bold">
                    <Link to={`/post/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-2 flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-1" />
                    {post.author}
                  </div>
                  <div className="ml-4 flex items-center">
                    <CalendarDays className="h-3.5 w-3.5 mr-1" />
                    {post.date}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Recent Articles</h2>
          <Link to="/archive" className="text-primary hover:underline flex items-center text-sm font-medium">
            Browse archive <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerChildren}
        >
          {recentPosts.map((post) => (
            <motion.div key={post.id} variants={itemFadeIn}>
              <article className="flex flex-col md:flex-row gap-6 group">
                <div className="md:w-1/3 overflow-hidden rounded-md">
                  <Link to={`/post/${post.slug}`}>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </Link>
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <div className="mb-2">
                    <Link 
                      to={`/category/${post.category}`}
                      className="text-xs inline-flex items-center text-primary font-medium hover:underline"
                    >
                      <Tag className="h-3.5 w-3.5 mr-1" />
                      {post.categoryName}
                    </Link>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    <Link to={`/post/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-3.5 w-3.5 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-3.5 w-3.5 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" className="gap-2">
            Load More Articles
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <motion.section 
        className="mt-20 bg-primary/10 rounded-lg p-8 text-center"
        variants={fadeIn}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-3">Join our Newsletter</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-6">
          Get the latest printing tips, design inspiration, and business strategies delivered straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 h-10 px-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </motion.section>
    </div>
  );
};

export default BlogHome;
