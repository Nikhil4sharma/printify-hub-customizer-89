
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, User, ChevronRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeIn, staggerChildren, itemFadeIn } from '@/utils/transitions';

const BlogCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  // This would typically come from an API call based on the category
  // For demo purposes, we're using hardcoded data
  const categories: Record<string, { name: string, description: string }> = {
    'printing-tips': {
      name: 'Printing Tips',
      description: 'Expert advice and technical tips to help you achieve the best printing results for your business materials.'
    },
    'design-inspiration': {
      name: 'Design Inspiration',
      description: 'Creative ideas and inspiration for designing eye-catching print materials that stand out from the competition.'
    },
    'business-growth': {
      name: 'Business Growth',
      description: 'Strategies and tactics to grow your business using effective print marketing and promotional materials.'
    },
    'industry-news': {
      name: 'Industry News',
      description: 'Latest developments, trends, and innovations in the printing and design industry.'
    },
    'case-studies': {
      name: 'Case Studies',
      description: 'Real-world examples of businesses achieving success through strategic print solutions.'
    }
  };

  const categoryInfo = categories[category || ''] || {
    name: 'Unknown Category',
    description: 'Category not found'
  };

  // Mock posts for this category
  const posts = [
    {
      id: 1,
      title: "10 Essential Tips for High-Quality Business Card Printing",
      excerpt: "Learn the insider secrets to creating premium business cards that leave a lasting impression on your clients and partners.",
      slug: "business-card-printing-tips",
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&auto=format&fit=crop",
      author: "Priya Sharma",
      date: "April 15, 2025"
    },
    {
      id: 2,
      title: "Understanding Paper Types and Weights for Different Print Projects",
      excerpt: "A comprehensive guide to selecting the right paper stock for various printing needs, from business cards to brochures.",
      slug: "paper-types-weights-guide",
      image: "https://images.unsplash.com/photo-1517686748843-bb360cfc62b3?w=800&auto=format&fit=crop",
      author: "Michael Chen",
      date: "April 10, 2025"
    },
    {
      id: 3,
      title: "Troubleshooting Common Printing Problems and How to Avoid Them",
      excerpt: "Learn how to identify and resolve the most common issues that can affect the quality of your print products.",
      slug: "troubleshooting-printing-problems",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
      author: "Alex Johnson",
      date: "April 5, 2025"
    },
    {
      id: 4,
      title: "How to Choose the Right Printing Method for Your Project",
      excerpt: "Compare digital, offset, letterpress, and other printing methods to determine which is best for your specific needs.",
      slug: "choose-right-printing-method",
      image: "https://images.unsplash.com/photo-1600835805258-a9565170e45b?w=800&auto=format&fit=crop",
      author: "Sara Ahmed",
      date: "March 28, 2025"
    },
    {
      id: 5,
      title: "Color Management in Print: Getting What You See on Screen",
      excerpt: "Understand the complexities of color management and how to ensure your printed materials match your digital designs.",
      slug: "color-management-print",
      image: "https://images.unsplash.com/photo-1614036417651-efe5928e421f?w=800&auto=format&fit=crop",
      author: "David Thompson",
      date: "March 20, 2025"
    },
    {
      id: 6,
      title: "The Ultimate Guide to Print Finishes and Special Effects",
      excerpt: "Explore embossing, foil stamping, spot UV, and other special finishes that can elevate your print materials.",
      slug: "print-finishes-special-effects",
      image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&auto=format&fit=crop",
      author: "Nina Patel",
      date: "March 15, 2025"
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-10">
      <motion.div 
        className="mb-12"
        variants={fadeIn}
      >
        <div className="mb-2 flex items-center">
          <Tag className="h-4 w-4 mr-2 text-primary" />
          <span className="text-primary font-medium">Category</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryInfo.name}</h1>
        <p className="text-muted-foreground max-w-2xl">{categoryInfo.description}</p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerChildren}
      >
        {posts.map((post) => (
          <motion.article 
            key={post.id} 
            className="group"
            variants={itemFadeIn}
          >
            <Link to={`/post/${post.slug}`} className="block mb-4 overflow-hidden rounded-lg">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </Link>
            <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              <Link to={`/post/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-3.5 w-3.5 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-3.5 w-3.5 mr-1" />
                {post.date}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
      
      <motion.div 
        className="flex justify-center mt-12"
        variants={fadeIn}
      >
        <Button variant="outline" size="lg" className="gap-2">
          Load More Articles
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default BlogCategory;
