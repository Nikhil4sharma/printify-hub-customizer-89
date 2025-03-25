
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  BadgeIndianRupee,
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
} from 'lucide-react';

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  content: string;
}

interface ProductSpec {
  dimensions?: string;
  material?: string;
  printing?: string;
  finish?: string;
  packaging?: string;
  [key: string]: string | undefined;
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

interface ProductAddon {
  id: string;
  name: string;
  price: number;
}

interface ProductOptions {
  sizes?: string[];
  materials?: string[];
  orientations?: string[];
  finishes?: string[];
  addons?: ProductAddon[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  image: string;
  gallery?: string[];
  rating: number;
  reviewsCount: number;
  specs?: ProductSpec;
  variants?: ProductVariant[];
  options?: ProductOptions;
  featured: boolean;
  inStock: boolean;
  relatedProducts?: string[];
  reviews?: Review[];
}

// Mock product data - in a real app, this would come from an API
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Business Cards',
    description: 'High-quality business cards printed on premium stock. Perfect for making a lasting impression in any professional setting.',
    longDescription: 'Make a lasting impression with our Premium Business Cards. These high-quality cards are printed on premium 350 GSM art card stock with a matte, gloss, or silk finish of your choice. Each card is carefully crafted to showcase your brand identity with precise color reproduction and crisp details. Whether you\'re networking at an event or sharing your contact information with a potential client, these business cards are designed to make you stand out from the crowd.',
    price: 1250,
    originalPrice: 1500,
    category: 'business-cards',
    tags: ['premium', 'business', 'cards'],
    image: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    rating: 4.8,
    reviewsCount: 128,
    specs: {
      dimensions: '90 x 55 mm (Standard)',
      material: '350 GSM Art Card',
      printing: 'Full Color (CMYK)',
      finish: 'Matte / Gloss / Silk',
      packaging: 'Box of 100 cards',
    },
    variants: [
      { id: '1a', name: 'Standard', price: 1250, inStock: true },
      { id: '1b', name: 'Premium', price: 1850, inStock: true },
    ],
    options: {
      sizes: ['Standard (90 x 55 mm)', 'Square (55 x 55 mm)', 'Mini (70 x 28 mm)'],
      materials: ['350 GSM Art Card', '400 GSM Art Card', '450 GSM Art Card'],
      orientations: ['Horizontal', 'Vertical'],
      finishes: ['Matte', 'Gloss', 'Silk'],
      addons: [
        { id: 'spot-uv', name: 'Spot UV', price: 250 },
        { id: 'embossing', name: 'Embossing', price: 350 },
        { id: 'foil-stamping', name: 'Foil Stamping', price: 450 },
      ],
    },
    featured: true,
    inStock: true,
    relatedProducts: ['2', '3', '5'],
    reviews: [
      {
        id: 'r1',
        user: 'Rahul Sharma',
        rating: 5,
        date: '2023-05-15',
        content: 'Excellent quality business cards. The print quality is outstanding and the card stock feels premium. Highly recommended!',
      },
      {
        id: 'r2',
        user: 'Priya Patel',
        rating: 4,
        date: '2023-04-20',
        content: 'Very good cards. The colors came out perfectly and the cards arrived well before the expected delivery date.',
      },
      {
        id: 'r3',
        user: 'Amit Singh',
        rating: 5,
        date: '2023-03-08',
        content: 'These cards have helped me make a great impression with clients. The embossing option adds a touch of luxury.',
      },
    ],
  },
  {
    id: '2',
    name: 'Luxury Wedding Cards',
    description: 'Elegant wedding invitations with premium finishes',
    price: 1825,
    category: 'wedding-cards',
    tags: ['wedding', 'luxury', 'cards'],
    image: '/placeholder.svg',
    rating: 4.9,
    reviewsCount: 256,
    variants: [
      { id: '2a', name: 'Standard', price: 1825, inStock: true },
      { id: '2b', name: 'Gold Foil', price: 2450, inStock: true },
    ],
    featured: true,
    inStock: true,
    relatedProducts: ['1', '5'],
  },
  {
    id: '3',
    name: 'Custom Letterheads',
    description: 'Professional letterheads for your business',
    price: 950,
    category: 'stationery',
    tags: ['letterhead', 'stationery', 'business'],
    image: '/placeholder.svg',
    rating: 4.7,
    reviewsCount: 89,
    variants: [
      { id: '3a', name: 'Basic', price: 950, inStock: true },
      { id: '3b', name: 'Premium', price: 1450, inStock: true },
    ],
    featured: false,
    inStock: true,
    relatedProducts: ['1', '4'],
  },
  {
    id: '4',
    name: 'Paper Carry Bags',
    description: 'Eco-friendly paper bags for retail',
    price: 750,
    category: 'carry-bags',
    tags: ['bags', 'retail', 'eco-friendly'],
    image: '/placeholder.svg',
    rating: 4.5,
    reviewsCount: 65,
    variants: [
      { id: '4a', name: 'Small', price: 750, inStock: true },
      { id: '4b', name: 'Medium', price: 950, inStock: true },
      { id: '4c', name: 'Large', price: 1150, inStock: true },
    ],
    featured: false,
    inStock: true,
    relatedProducts: ['3', '5'],
  },
  {
    id: '5',
    name: 'Custom Packaging Boxes',
    description: 'Branded packaging boxes for products',
    price: 1550,
    category: 'boxes',
    tags: ['boxes', 'packaging', 'branded'],
    image: '/placeholder.svg',
    rating: 4.6,
    reviewsCount: 42,
    variants: [
      { id: '5a', name: 'Small', price: 1550, inStock: true },
      { id: '5b', name: 'Medium', price: 1950, inStock: true },
    ],
    featured: true,
    inStock: true,
    relatedProducts: ['1', '4', '2'],
  },
];

const ProductDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // Find the product based on the ID from the URL
  const product = allProducts.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    size: '',
    material: '',
    orientation: 'Horizontal' as 'Horizontal' | 'Vertical',
    finish: '',
  });
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});

  // Set initial values when product loads
  React.useEffect(() => {
    if (product) {
      setSelectedOptions({
        size: product.options?.sizes?.[0] || '',
        material: product.options?.materials?.[0] || '',
        orientation: product.options?.orientations?.[0] as 'Horizontal' | 'Vertical' || 'Horizontal',
        finish: product.options?.finishes?.[0] || '',
      });
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0].id);
      }
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Button onClick={() => navigate('/products/all')}>Browse All Products</Button>
      </div>
    );
  }

  // Find related products
  const relatedProducts = product.relatedProducts
    ? product.relatedProducts.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[]
    : [];

  const totalPrice = () => {
    let price = product.price;
    
    // Add addon prices
    if (product.options?.addons) {
      product.options.addons.forEach(addon => {
        if (selectedAddons[addon.id]) {
          price += addon.price;
        }
      });
    }
    
    return price * quantity;
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      customization: {
        size: selectedOptions.size,
        orientation: selectedOptions.orientation,
        material: selectedOptions.material,
        addons: Object.entries(selectedAddons)
          .filter(([_, selected]) => selected)
          .map(([id]) => id),
      },
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to="/products/all" className="hover:text-foreground">Products</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to={`/products/${product.category}`} className="hover:text-foreground capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground truncate max-w-[150px]">{product.name}</span>
      </div>

      {/* Product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product images */}
        <div className="space-y-4">
          <div className="bg-muted rounded-lg overflow-hidden aspect-square">
            <img
              src={product.gallery?.[activeImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.gallery && product.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-muted rounded overflow-hidden cursor-pointer border-2 ${index === activeImage ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>
              
              {product.inStock ? (
                <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>
              ) : (
                <Badge variant="outline" className="text-red-500 border-red-500">Out of Stock</Badge>
              )}
            </div>
            
            <div className="flex items-baseline mt-4">
              <div className="flex items-center">
                <BadgeIndianRupee className="h-5 w-5 mr-1" />
                <span className="text-2xl font-bold">{product.price.toFixed(2)}</span>
              </div>
              
              {product.originalPrice && (
                <>
                  <div className="flex items-center ml-3 text-muted-foreground line-through">
                    <BadgeIndianRupee className="h-3 w-3 mr-1" />
                    <span>{product.originalPrice.toFixed(2)}</span>
                  </div>
                  <Badge className="ml-3 bg-red-500 hover:bg-red-600">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                  </Badge>
                </>
              )}
            </div>
            
            <p className="mt-4 text-muted-foreground">
              {product.description}
            </p>
            
            <Separator className="my-6" />
            
            {/* Product Options */}
            <div className="space-y-6">
              {/* Variants */}
              {product.variants && product.variants.length > 1 && (
                <div>
                  <Label htmlFor="variant" className="block mb-2">Variant</Label>
                  <RadioGroup
                    value={selectedVariant || product.variants[0].id}
                    onValueChange={setSelectedVariant}
                    className="grid grid-cols-2 gap-2"
                  >
                    {product.variants.map((variant) => (
                      <div key={variant.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={variant.id} id={variant.id} />
                        <Label htmlFor={variant.id} className="flex justify-between w-full">
                          <span>{variant.name}</span>
                          <div className="flex items-center">
                            <BadgeIndianRupee className="h-3 w-3 mr-1" />
                            <span>{variant.price.toFixed(2)}</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              {/* Size */}
              {product.options?.sizes && (
                <div>
                  <Label htmlFor="size" className="block mb-2">Size</Label>
                  <Select
                    defaultValue={selectedOptions.size}
                    onValueChange={(value) => setSelectedOptions({...selectedOptions, size: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.options.sizes.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Material */}
              {product.options?.materials && (
                <div>
                  <Label htmlFor="material" className="block mb-2">Material</Label>
                  <Select
                    defaultValue={selectedOptions.material}
                    onValueChange={(value) => setSelectedOptions({...selectedOptions, material: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.options.materials.map((material) => (
                        <SelectItem key={material} value={material}>{material}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Orientation */}
              {product.options?.orientations && (
                <div>
                  <Label htmlFor="orientation" className="block mb-2">Orientation</Label>
                  <RadioGroup
                    defaultValue={selectedOptions.orientation}
                    onValueChange={(value: 'Horizontal' | 'Vertical') => setSelectedOptions({...selectedOptions, orientation: value})}
                    className="grid grid-cols-2 gap-2"
                  >
                    {product.options.orientations.map((orientation) => (
                      <div key={orientation} className="flex items-center space-x-2">
                        <RadioGroupItem value={orientation} id={`orientation-${orientation.toLowerCase()}`} />
                        <Label htmlFor={`orientation-${orientation.toLowerCase()}`}>{orientation}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              {/* Addons */}
              {product.options?.addons && (
                <div>
                  <Label className="block mb-2">Addons</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {product.options.addons.map((addon) => (
                      <div key={addon.id} className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox
                          id={addon.id}
                          checked={selectedAddons[addon.id] || false}
                          onCheckedChange={(checked) => 
                            setSelectedAddons({...selectedAddons, [addon.id]: !!checked})
                          }
                        />
                        <div className="flex flex-1 items-center justify-between">
                          <Label htmlFor={addon.id} className="flex-1">
                            {addon.name}
                          </Label>
                          <div className="flex items-center">
                            <BadgeIndianRupee className="h-3 w-3 mr-1" />
                            <span>{addon.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div>
                <Label htmlFor="quantity" className="block mb-2">Quantity</Label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-16 text-center">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-8">
              <div className="flex items-center">
                <BadgeIndianRupee className="h-5 w-5 mr-1" />
                <span className="text-2xl font-bold">{totalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button 
                className="flex-1" 
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                <Heart className="h-5 w-5 mr-2" />
                Save for Later
              </Button>
            </div>
            
            <div className="mt-6 text-sm space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Free delivery for orders above ₹2000
              </div>
              <div className="flex items-center text-muted-foreground">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Secure payment options
              </div>
              <div className="flex items-center text-muted-foreground">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                7-day return policy
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-6">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product details tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="mb-6">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="text-muted-foreground">
          <Card>
            <CardContent className="p-6">
              <p>{product.longDescription || product.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="specifications">
          <Card>
            <CardContent className="p-6">
              {product.specs ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <span className="font-medium capitalize">{key}: </span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No specifications available for this product.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6">
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Customer Reviews</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm">
                          Based on {product.reviews.length} reviews
                        </span>
                      </div>
                    </div>
                    <Button>Write a Review</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{review.user}</span>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-muted-foreground">{review.content}</p>
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
                  <p className="text-muted-foreground mb-4">Be the first to review this product</p>
                  <Button>Write a Review</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/products/${relatedProduct.category}/${relatedProduct.id}`}>
                <Card className="h-full transition-all hover:shadow-md">
                  <div className="relative h-48 bg-muted">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {!relatedProduct.inStock && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <BadgeIndianRupee className="h-4 w-4 mr-1" />
                        <span className="font-semibold">{relatedProduct.price.toFixed(2)}</span>
                      </div>
                      <div className="text-sm text-yellow-500 flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 mr-1" />
                        <span>{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
