
import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Share2,
  FileImage,
  FilePdf,
  FileAi,
  UploadCloud,
  Check,
  Rupee,
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

interface ProductOptions {
  sizes?: string[];
  thicknesses?: string[];
  orientations?: string[];
  treatments?: string[];
  quantities?: number[];
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
  specs?: ProductSpec;
  options?: ProductOptions;
  featured: boolean;
  relatedProducts?: string[];
  reviews?: Review[];
}

// Mock product data
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Business Cards',
    description: 'High-quality business cards printed on premium stock. Perfect for making a lasting impression in any professional setting.',
    longDescription: 'Make a lasting impression with our Premium Business Cards. These high-quality cards are printed on premium stock with a matte, gloss, or silk finish of your choice. Each card is carefully crafted to showcase your brand identity with precise color reproduction and crisp details.',
    price: 1250,
    originalPrice: 1500,
    category: 'business-cards',
    tags: ['premium', 'business', 'cards'],
    image: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    specs: {
      dimensions: '90 x 55 mm (Standard)',
      material: '350 GSM Art Card',
      printing: 'Full Color (CMYK)',
      finish: 'Matte / Gloss / Silk',
      packaging: 'Box of 100 cards',
    },
    options: {
      sizes: ['Standard (90 x 55 mm)', 'Square (55 x 55 mm)', 'Mini (70 x 28 mm)'],
      thicknesses: ['300 GSM', '600 GSM'],
      orientations: ['Horizontal', 'Vertical'],
      treatments: ['None', 'Spot UV (Single Side)', 'Spot UV (Both Sides)'],
      quantities: [100, 250, 500, 750, 1000, 2000, 5000, 10000],
    },
    featured: true,
    relatedProducts: ['2', '3', '5'],
  },
  {
    id: '2',
    name: 'Luxury Foiling Business Cards',
    description: 'Elegant business cards with premium foiling finishes',
    price: 1825,
    category: 'business-cards',
    tags: ['luxury', 'foiling', 'cards'],
    image: '/placeholder.svg',
    options: {
      sizes: ['Standard (90 x 55 mm)', 'Square (55 x 55 mm)'],
      thicknesses: ['300 GSM', '600 GSM'],
      orientations: ['Horizontal', 'Vertical'],
      treatments: ['None', 'Gold Foiling (Single Side)', 'Gold Foiling (Both Sides)', 'Silver Foiling (Single Side)', 'Silver Foiling (Both Sides)'],
      quantities: [100, 250, 500, 750, 1000, 2000, 5000],
    },
    featured: true,
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
    options: {
      sizes: ['A4 (210 x 297 mm)', 'US Letter (216 x 279 mm)'],
      thicknesses: ['100 GSM', '120 GSM'],
      orientations: ['Portrait', 'Landscape'],
      treatments: ['None', 'Watermark', 'Embossing'],
      quantities: [100, 250, 500, 1000, 2000],
    },
    featured: false,
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
    options: {
      sizes: ['Small (20 x 25 cm)', 'Medium (30 x 40 cm)', 'Large (40 x 50 cm)'],
      thicknesses: ['150 GSM', '200 GSM'],
      treatments: ['None', 'Gloss Lamination', 'Matte Lamination'],
      quantities: [100, 250, 500, 1000, 2000],
    },
    featured: false,
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
    options: {
      sizes: ['Small (10 x 10 x 5 cm)', 'Medium (15 x 15 x 10 cm)', 'Large (20 x 20 x 15 cm)'],
      thicknesses: ['300 GSM', '350 GSM'],
      treatments: ['None', 'Spot UV', 'Foil Stamping'],
      quantities: [100, 250, 500, 1000],
    },
    featured: true,
    relatedProducts: ['1', '4', '2'],
  },
];

const ProductDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Find the product based on the ID from the URL
  const product = allProducts.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState<number>(100);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({
    size: '',
    thickness: '',
    orientation: 'Horizontal' as 'Horizontal' | 'Vertical',
    treatment: '',
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');

  // Set initial values when product loads
  React.useEffect(() => {
    if (product) {
      setSelectedOptions({
        size: product.options?.sizes?.[0] || '',
        thickness: product.options?.thicknesses?.[0] || '',
        orientation: (product.options?.orientations?.[0] as 'Horizontal' | 'Vertical') || 'Horizontal',
        treatment: product.options?.treatments?.[0] || '',
      });
      if (product.options?.quantities && product.options.quantities.length > 0) {
        setQuantity(product.options.quantities[0]);
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

  const calculatePrice = () => {
    let price = product.price;
    
    // Adjust price based on quantity
    if (quantity > 100) {
      if (quantity <= 500) {
        price = price * 1.2; // 20% increase for 250-500
      } else if (quantity <= 1000) {
        price = price * 1.5; // 50% increase for 750-1000
      } else if (quantity <= 5000) {
        price = price * 2.2; // 120% increase for 2000-5000
      } else {
        price = price * 3; // 200% increase for 10000
      }
    }
    
    // Add premium for 600 GSM
    if (selectedOptions.thickness === '600 GSM') {
      price = price * 1.3; // 30% premium for thicker paper
    }
    
    // Add price for treatments
    if (selectedOptions.treatment && selectedOptions.treatment !== 'None') {
      if (selectedOptions.treatment.includes('Both Sides')) {
        price = price * 1.4; // 40% premium for both sides treatment
      } else if (selectedOptions.treatment.includes('Single Side')) {
        price = price * 1.25; // 25% premium for single side treatment
      }
    }
    
    return price;
  };

  const totalPrice = () => {
    return calculatePrice();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setFileError('');
    
    if (files && files.length > 0) {
      const file = files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      // Check file type
      if (fileExtension === 'pdf' || fileExtension === 'cdr' || fileExtension === 'ai') {
        // Check file size (max 10MB)
        if (file.size <= 10 * 1024 * 1024) {
          setUploadedFile(file);
        } else {
          setFileError('File size exceeds 10MB limit');
        }
      } else {
        setFileError('Please upload a PDF, CDR, or AI file');
      }
    }
  };

  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FilePdf className="h-5 w-5 text-red-500" />;
      case 'ai':
        return <FileAi className="h-5 w-5 text-amber-500" />;
      case 'cdr':
        return <FileImage className="h-5 w-5 text-blue-500" />;
      default:
        return <FileImage className="h-5 w-5" />;
    }
  };

  const handleAddToCart = () => {
    if (!uploadedFile) {
      setFileError('Please upload your design file');
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: totalPrice(),
      image: product.image,
      quantity: 1, // This is 1 order, not the quantity of items
      customization: {
        size: selectedOptions.size,
        orientation: selectedOptions.orientation,
        material: selectedOptions.thickness,
        addons: [selectedOptions.treatment],
        quantity: quantity,
        designFile: uploadedFile.name,
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
        <div className="space-y-6">
          <div className="bg-muted rounded-lg overflow-hidden aspect-square shadow-md">
            <img
              src={product.gallery?.[activeImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.gallery && product.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-muted rounded-md overflow-hidden cursor-pointer border-2 transition-all ${index === activeImage ? 'border-primary scale-105' : 'border-transparent hover:border-muted-foreground'}`}
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
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            
            <div className="flex items-baseline mb-4">
              <span className="flex items-center text-2xl font-bold">
                <Rupee className="h-5 w-5 mr-1" />
                <span>{totalPrice().toFixed(2)}</span>
              </span>
              
              {product.originalPrice && (
                <div className="flex items-center ml-3 text-muted-foreground line-through">
                  <Rupee className="h-3 w-3 mr-1" />
                  <span>{product.originalPrice.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>
            
            <Separator className="my-6" />
            
            {/* Product Options */}
            <div className="space-y-6">
              {/* Size */}
              {product.options?.sizes && (
                <div>
                  <Label htmlFor="size" className="block mb-2 font-medium">Size</Label>
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
              
              {/* Paper Thickness */}
              {product.options?.thicknesses && (
                <div>
                  <Label htmlFor="thickness" className="block mb-2 font-medium">Paper Thickness</Label>
                  <Select
                    defaultValue={selectedOptions.thickness}
                    onValueChange={(value) => setSelectedOptions({...selectedOptions, thickness: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select thickness" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.options.thicknesses.map((thickness) => (
                        <SelectItem key={thickness} value={thickness}>{thickness}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Orientation */}
              {product.options?.orientations && (
                <div>
                  <Label htmlFor="orientation" className="block mb-2 font-medium">Orientation</Label>
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
              
              {/* Treatment (Spot UV or Foiling) */}
              {product.options?.treatments && (
                <div>
                  <Label htmlFor="treatment" className="block mb-2 font-medium">Treatment</Label>
                  <Select
                    defaultValue={selectedOptions.treatment}
                    onValueChange={(value) => setSelectedOptions({...selectedOptions, treatment: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select treatment" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.options.treatments.map((treatment) => (
                        <SelectItem key={treatment} value={treatment}>{treatment}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Quantity */}
              {product.options?.quantities && (
                <div>
                  <Label htmlFor="quantity" className="block mb-2 font-medium">Quantity</Label>
                  <Select
                    defaultValue={quantity.toString()}
                    onValueChange={(value) => setQuantity(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.options.quantities.map((qty) => (
                        <SelectItem key={qty} value={qty.toString()}>{qty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* File Upload */}
              <div>
                <Label className="block mb-2 font-medium">Upload Design File</Label>
                <div className="mt-1 space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.cdr,.ai"
                    onChange={handleFileUpload}
                  />
                  
                  {uploadedFile ? (
                    <div className="flex items-center p-3 bg-muted rounded-md">
                      {getFileIcon(uploadedFile.name)}
                      <span className="ml-2 flex-1 truncate">{uploadedFile.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleTriggerFileInput}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-8 flex flex-col items-center justify-center border-dashed"
                      onClick={handleTriggerFileInput}
                    >
                      <UploadCloud className="h-8 w-8 mb-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Upload PDF, CDR, or AI file</span>
                      <span className="text-xs text-muted-foreground mt-1">Max file size: 10MB</span>
                    </Button>
                  )}
                  
                  {fileError && (
                    <p className="text-sm text-destructive mt-1">{fileError}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <FilePdf className="h-3 w-3" /> PDF
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <FileAi className="h-3 w-3" /> AI
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <FileImage className="h-3 w-3" /> CDR
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                className="w-full py-6"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
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
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/products/${relatedProduct.category}/${relatedProduct.id}`}>
                <Card className="h-full transition-all hover:shadow-md">
                  <div className="relative h-48 bg-muted">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        <Rupee className="h-4 w-4 mr-1" />
                        <span className="font-semibold">{relatedProduct.price.toFixed(2)}</span>
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
