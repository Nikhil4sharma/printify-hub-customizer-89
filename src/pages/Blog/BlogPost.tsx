
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, User, Tag, Clock, Facebook, Twitter, Linkedin, Copy, ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { fadeIn, staggerChildren, itemFadeIn } from '@/utils/transitions';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // This would typically come from an API call based on the slug
  // For demo purposes, we're using hardcoded data
  const post = {
    title: "10 Essential Tips for High-Quality Business Card Printing",
    content: `
      <p>In today's digital age, business cards remain a tangible representation of your professional identity. A well-designed and professionally printed business card can make a lasting impression on potential clients and partners.</p>

      <h2>Why Business Cards Still Matter</h2>
      <p>Despite the rise of digital communication, business cards continue to serve as important networking tools. They provide a physical reminder of your meeting and contain essential contact information in a compact format.</p>
      
      <p>Here are our top 10 tips for creating business cards that stand out:</p>
      
      <h3>1. Choose the Right Paper Stock</h3>
      <p>The weight and finish of your card communicate quality before anyone reads a word. Consider these options:</p>
      <ul>
        <li><strong>14pt or 16pt:</strong> Standard thickness for professional cards</li>
        <li><strong>18pt or 32pt:</strong> Premium thickness that makes a statement</li>
        <li><strong>Matte vs. Glossy:</strong> Matte finishes look sophisticated while glossy finishes make colors pop</li>
      </ul>
      
      <h3>2. Select Appropriate Dimensions</h3>
      <p>While the standard size (3.5" x 2") works for most businesses, consider how your card will be stored and used. Unconventional sizes might stand out but may not fit in standard card holders.</p>
      
      <h3>3. Maintain a Clean Design</h3>
      <p>Avoid cluttering your business card with too much information. Include only the essentials:</p>
      <ul>
        <li>Your name and title</li>
        <li>Company name and logo</li>
        <li>Contact information (phone, email, website)</li>
        <li>Social media handles (if relevant)</li>
      </ul>
      
      <h3>4. Use Proper Typography</h3>
      <p>Typography plays a crucial role in readability and brand identity:</p>
      <ul>
        <li>Limit yourself to two fonts maximum</li>
        <li>Ensure text is at least 8pt size for readability</li>
        <li>Create hierarchy with font weights and sizes</li>
      </ul>
      
      <h3>5. Include White Space</h3>
      <p>Don't feel compelled to fill every inch of your card. Strategic white space makes your card more readable and elegant.</p>
    `,
    author: "Priya Sharma",
    authorAvatar: "https://i.pravatar.cc/150?img=45",
    authorBio: "Priya is a print production expert with over 15 years of experience in the industry. She specializes in helping businesses optimize their print materials for maximum impact.",
    date: "April 15, 2025",
    readingTime: "5 min read",
    category: "printing-tips",
    categoryName: "Printing Tips",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&auto=format&fit=crop",
    tags: ["business cards", "printing tips", "design", "branding"],
  };

  const relatedPosts = [
    {
      id: 1,
      title: "The Psychology of Business Card Design: Colors and Shapes",
      slug: "psychology-business-card-design",
      image: "https://images.unsplash.com/photo-1609266256476-6945d18ef83d?w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Digital vs. Traditional Business Cards: Finding the Right Balance",
      slug: "digital-vs-traditional-business-cards",
      image: "https://images.unsplash.com/photo-1589384267710-7a25bc5b4862?w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Eco-Friendly Business Card Options for Sustainable Brands",
      slug: "eco-friendly-business-cards",
      image: "https://images.unsplash.com/photo-1595079695170-bae8e0b4b93b?w=800&auto=format&fit=crop"
    },
  ];

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <motion.div variants={fadeIn}>
        <Link to="/blog" className="text-muted-foreground hover:text-primary inline-flex items-center mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all posts
        </Link>
        
        <div className="mb-2">
          <Link 
            to={`/category/${post.category}`}
            className="text-sm inline-flex items-center text-primary font-medium hover:underline"
          >
            <Tag className="h-4 w-4 mr-1" />
            {post.categoryName}
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readingTime}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </button>
            <button 
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </button>
            <button 
              onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </button>
            <button 
              onClick={copyLinkToClipboard}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Copy link"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Featured Image */}
      <motion.div 
        className="mb-8 overflow-hidden rounded-lg"
        variants={fadeIn}
      >
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-auto object-cover" 
        />
      </motion.div>
      
      {/* Article Content */}
      <motion.div 
        className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80"
        variants={fadeIn}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {/* Tags */}
      <motion.div 
        className="mt-8 flex flex-wrap gap-2"
        variants={fadeIn}
      >
        {post.tags.map((tag, index) => (
          <Link 
            key={index}
            to={`/tag/${tag.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-xs bg-secondary px-2 py-1 rounded-full hover:bg-primary/10 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </motion.div>
      
      {/* Feedback and Sharing */}
      <motion.div 
        className="mt-8 flex items-center justify-between"
        variants={fadeIn}
      >
        <Button variant="ghost" size="sm" className="gap-2">
          <ThumbsUp className="h-4 w-4" />
          Helpful
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Share:</span>
          <button 
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            aria-label="Share on Facebook"
          >
            <Facebook className="h-4 w-4" />
          </button>
          <button 
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            aria-label="Share on Twitter"
          >
            <Twitter className="h-4 w-4" />
          </button>
          <button 
            onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </button>
          <button 
            onClick={copyLinkToClipboard}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            aria-label="Copy link"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
      
      <Separator className="my-12" />
      
      {/* Author Bio */}
      <motion.div 
        className="mb-12"
        variants={fadeIn}
      >
        <Card className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={post.authorAvatar} alt={post.author} />
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
            <p className="text-muted-foreground mb-4">{post.authorBio}</p>
            <Button variant="outline" size="sm">View all articles</Button>
          </div>
        </Card>
      </motion.div>
      
      {/* Related Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerChildren}
        >
          {relatedPosts.map((post) => (
            <motion.div key={post.id} variants={itemFadeIn}>
              <Link to={`/post/${post.slug}`} className="group">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Post Navigation */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t">
        <Link to="/post/previous-post" className="flex items-center hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous Post
        </Link>
        <Link to="/post/next-post" className="flex items-center hover:text-primary transition-colors">
          Next Post
          <ChevronRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
