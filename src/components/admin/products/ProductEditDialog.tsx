import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ImagePlus, Plus, Trash2, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id?: number;
  name: string;
  category?: string;
  price?: string;
  sku?: string;
  featured?: boolean;
  sizeOptions?: string[];
  thicknessOptions?: string[];
  orientationOptions?: string[];
  treatmentOptions?: string[];
  quantityOptions?: number[];
  images?: string[];
}

interface Category {
  id: number;
  name: string;
}

interface ProductEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  categories: Category[];
  onSave: (product: Product) => void;
}

const ProductEditDialog: React.FC<ProductEditDialogProps> = ({ 
  open, 
  onOpenChange, 
  product, 
  categories,
  onSave
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [productImages, setProductImages] = useState<string[]>(product?.images || []);

  const handleSave = () => {
    if (product) {
      onSave(product);
      onOpenChange(false);
      toast({
        title: "Product updated",
        description: "The product has been successfully updated",
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (productImages.length < 4) {
        setProductImages([...productImages, imageUrl]);
      } else {
        toast({
          title: "Maximum image limit reached",
          description: "You can only add up to 4 images per product",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product: {product.name}</DialogTitle>
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
                <Input id="name" defaultValue={product.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" defaultValue={product.sku} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={product.category}>
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
                    defaultValue={product.price?.replace('₹', '')} 
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
                checked={product.featured}
              />
              <Label htmlFor="featured">Featured product (shown on homepage)</Label>
            </div>
          </TabsContent>
          
          <TabsContent value="options" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Size Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.sizeOptions?.map((size: string, i: number) => (
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
                {product.thicknessOptions?.map((thickness: string, i: number) => (
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
                {product.orientationOptions?.map((orientation: string, i: number) => (
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
                {product.treatmentOptions?.map((treatment: string, i: number) => (
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
                {product.quantityOptions?.map((quantity: number, i: number) => (
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
                      onChange={(e) => {
                        const newImages = [...productImages];
                        newImages[index] = e.target.value;
                        setProductImages(newImages);
                      }}
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
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditDialog;
