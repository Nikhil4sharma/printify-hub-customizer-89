import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ImagePlus,
  FileImage,
  IndianRupee,
  Eye,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminProducts = () => {
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('general');

  // Mock product data - would be fetched from API in a real application
  const products = [
    { 
      id: 1, 
      name: 'Standard Business Cards', 
      category: 'Business Cards', 
      price: '₹1250.00',
      sku: 'BC-STD-01',
      featured: true,
      sizeOptions: ['90x55 mm', '85x55 mm'],
      thicknessOptions: ['300 GSM', '600 GSM'],
      orientationOptions: ['Landscape', 'Portrait'],
      treatmentOptions: ['Spot UV Single Side', 'Spot UV Both Sides', 'None'],
      quantityOptions: [100, 250, 500, 750, 1000, 2000, 5000, 10000],
      images: ['https://images.unsplash.com/photo-1589998059171-988d887df646', 'https://images.unsplash.com/photo-1609209120115-619e31588ab8'],
      customerFiles: [
        { id: 'file1', fileName: 'business_card_design.pdf', customerName: 'Rahul Sharma', uploadDate: '2023-05-15' },
        { id: 'file2', fileName: 'logo_for_cards.ai', customerName: 'Priya Patel', uploadDate: '2023-05-20' }
      ]
    },
    { 
      id: 2, 
      name: 'Premium Letterheads', 
      category: 'Stationery', 
      price: '₹950.00',
      sku: 'LH-PRM-01',
      featured: false,
      sizeOptions: ['A4', 'A5'],
      thicknessOptions: ['100 GSM', '120 GSM'],
      orientationOptions: ['Portrait'],
      treatmentOptions: ['None'],
      quantityOptions: [100, 250, 500, 1000, 2000],
      images: ['https://images.unsplash.com/photo-1568205631288-1469d8298ce0'],
      customerFiles: [
        { id: 'file3', fileName: 'letterhead_final.pdf', customerName: 'Amit Singh', uploadDate: '2023-05-18' }
      ]
    },
    { 
      id: 3, 
      name: 'Paper Carry Bags', 
      category: 'Carry Bags', 
      price: '₹750.00',
      sku: 'BAG-PAP-01',
      featured: true,
      sizeOptions: ['Small', 'Medium', 'Large'],
      thicknessOptions: ['150 GSM', '200 GSM'],
      orientationOptions: ['Portrait'],
      treatmentOptions: ['None', 'Lamination'],
      quantityOptions: [100, 250, 500, 1000],
      images: ['https://images.unsplash.com/photo-1591197172062-c718f82aba20'],
      customerFiles: []
    },
    { 
      id: 4, 
      name: 'Luxury Business Cards', 
      category: 'Business Cards', 
      price: '₹1825.00',
      sku: 'BC-LUX-01',
      featured: true,
      sizeOptions: ['90x55 mm', '85x55 mm'],
      thicknessOptions: ['300 GSM', '600 GSM'],
      orientationOptions: ['Landscape', 'Portrait'],
      treatmentOptions: ['Foiling Single Side', 'Foiling Both Sides', 'None'],
      quantityOptions: [100, 250, 500, 750, 1000, 2000, 5000],
      images: ['https://images.unsplash.com/photo-1616793944642-81493deb9b5e'],
      customerFiles: [
        { id: 'file5', fileName: 'gold_foil_design.ai', customerName: 'Vikram Patel', uploadDate: '2023-05-25' }
      ]
    },
    { 
      id: 6, 
      name: 'Envelopes', 
      category: 'Stationery', 
      price: '₹450.00',  
      variants: 4, 
      images: ['https://images.unsplash.com/photo-1579213838826-dabf29071388'],
      customerFiles: []
    },
    { 
      id: 7, 
      name: 'Gift Boxes', 
      category: 'Boxes', 
      price: '₹850.00',  
      variants: 5, 
      images: ['https://images.unsplash.com/photo-1513201099705-a9746e1e201f'],
      customerFiles: [
        { id: 'file6', fileName: 'gift_box_artwork.pdf', customerName: 'Sanjay Mehta', uploadDate: '2023-05-30' }
      ]
    },
  ];

  const categories = [
    { id: 1, name: 'Business Cards' },
    { id: 2, name: 'Stationery' },
    { id: 3, name: 'Carry Bags' },
    { id: 4, name: 'Boxes' },
  ];

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    setProductImages(product.images || []);
    setIsEditOpen(true);
    setActiveTab('general');
  };

  const handlePreviewProduct = (product: any) => {
    setCurrentProduct(product);
    setIsPreviewOpen(true);
  };

  const handleAddImage = () => {
    if (productImages.length < 4) {
      setProductImages([...productImages, '']);
    } else {
      toast({
        title: "Maximum image limit reached",
        description: "You can only add up to 4 images per product",
        variant: "destructive",
      });
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...productImages];
    newImages[index] = value;
    setProductImages(newImages);
  };

  const handleRemoveImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  const handleSaveProduct = () => {
    // In a real app, this would update the product in the database
    toast({
      title: "Product updated",
      description: "The product has been successfully updated",
    });
    setIsEditOpen(false);
  };
  
  const handleDownloadFile = (fileName: string) => {
    // In a real app, this would fetch the file from storage and trigger download
    toast({
      title: "Downloading file",
      description: `Downloading ${fileName}`,
    });
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return <File className="h-4 w-4 text-red-500" />;
    if (fileName.endsWith('.ai')) return <File className="h-4 w-4 text-amber-500" />;
    if (fileName.endsWith('.cdr')) return <FileImage className="h-4 w-4 text-blue-500" />;
    return <FileImage className="h-4 w-4" />;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to your storage and return a URL
      // For now, we'll use a local URL
      const imageUrl = URL.createObjectURL(file);
      handleImageChange(productImages.length, imageUrl);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">View and manage products</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-8" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="priceLow">Price: Low to High</SelectItem>
              <SelectItem value="priceHigh">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileImage className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  {product.featured ? (
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Yes
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      <XCircle className="h-3 w-3 mr-1" />
                      No
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handlePreviewProduct(product)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Product Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product: {currentProduct?.name}</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4 w-full">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    defaultValue={currentProduct?.name} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input 
                    id="sku" 
                    defaultValue={currentProduct?.sku} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue={currentProduct?.category}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="price" 
                      className="pl-8"
                      defaultValue={currentProduct?.price?.replace('₹', '')} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  rows={4}
                  placeholder="Product description..."
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={currentProduct?.featured}
                />
                <Label htmlFor="featured">Featured product (shown on homepage)</Label>
              </div>
            </TabsContent>
            
            <TabsContent value="options" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Size Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProduct?.sizeOptions.map((size: string, i: number) => (
                    <div key={`size-${i}`} className="flex items-center space-x-2">
                      <Input defaultValue={size} />
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="md:col-span-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Size Option
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Paper Thickness Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProduct?.thicknessOptions.map((thickness: string, i: number) => (
                    <div key={`thickness-${i}`} className="flex items-center space-x-2">
                      <Input defaultValue={thickness} />
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="md:col-span-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Thickness Option
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Orientation Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProduct?.orientationOptions.map((orientation: string, i: number) => (
                    <div key={`orientation-${i}`} className="flex items-center space-x-2">
                      <Input defaultValue={orientation} />
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="md:col-span-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Orientation Option
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Treatment Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProduct?.treatmentOptions.map((treatment: string, i: number) => (
                    <div key={`treatment-${i}`} className="flex items-center space-x-2">
                      <Input defaultValue={treatment} />
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="md:col-span-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Treatment Option
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Quantity Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProduct?.quantityOptions.map((quantity: number, i: number) => (
                    <div key={`quantity-${i}`} className="flex items-center space-x-2">
                      <Input defaultValue={quantity.toString()} type="number" />
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="md:col-span-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Quantity Option
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="images" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Product Images (Up to 4)</Label>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => document.getElementById('image-upload')?.click()}
                    disabled={productImages.length >= 4}
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                {productImages.map((image, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="flex-1">
                      <Input 
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                      />
                    </div>
                    {image && (
                      <div className="w-16 h-16 rounded overflow-hidden border">
                        <img 
                          src={image} 
                          alt={`Product image ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                    )}
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input 
                  id="seo-title" 
                  placeholder="SEO optimized title (for search engines)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seo-description">SEO Description</Label>
                <Textarea 
                  id="seo-description" 
                  rows={3}
                  placeholder="SEO optimized description (for search engines)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input 
                  id="meta-keywords" 
                  placeholder="Comma separated keywords"
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="custom-url">Custom URL</Label>
                <Input 
                  id="custom-url" 
                  placeholder="e.g., premium-business-cards"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to use the product name
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Product Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Preview: {currentProduct?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              {currentProduct?.images && currentProduct.images.length > 0 ? (
                <div className="aspect-square rounded-md overflow-hidden border">
                  <img 
                    src={currentProduct.images[0]} 
                    alt={currentProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-md bg-muted flex items-center justify-center">
                  <ImagePlus className="h-16 w-16 text-muted-foreground/50" />
                </div>
              )}
              
              {currentProduct?.images && currentProduct.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {currentProduct.images.map((image: string, i: number) => (
                    <div key={i} className="aspect-square rounded-md overflow-hidden border">
                      <img 
                        src={image} 
                        alt={`${currentProduct.name} thumbnail ${i+1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{currentProduct?.name}</h2>
              
              <div className="flex items-center">
                <IndianRupee className="h-5 w-5 mr-1 text-foreground" />
                <span className="text-2xl font-bold">{currentProduct?.price?.replace('₹', '')}</span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Category: {currentProduct?.category}
              </p>
              
              <h3 className="font-medium mt-2">Available Options</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Sizes:</p>
                  <p>{currentProduct?.sizeOptions.join(', ')}</p>
                </div>
                
                <div>
                  <p className="font-medium">Paper Thickness:</p>
                  <p>{currentProduct?.thicknessOptions.join(', ')}</p>
                </div>
                
                <div>
                  <p className="font-medium">Orientation:</p>
                  <p>{currentProduct?.orientationOptions.join(', ')}</p>
                </div>
                
                <div>
                  <p className="font-medium">Treatment:</p>
                  <p>{currentProduct?.treatmentOptions.join(', ')}</p>
                </div>
                
                <div>
                  <p className="font-medium">Quantities:</p>
                  <p>{currentProduct?.quantityOptions.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button>Close Preview</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
