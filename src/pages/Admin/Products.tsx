
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
import { Search, Plus, Edit, Trash2, ImagePlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminProducts = () => {
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [productImages, setProductImages] = useState<string[]>([]);

  // Mock product data - would be fetched from API in a real application
  const products = [
    { id: 1, name: 'Standard Business Cards', category: 'Business Cards', price: '₹48.75', stock: 'In Stock', variants: 4, images: ['https://images.unsplash.com/photo-1589998059171-988d887df646', 'https://images.unsplash.com/photo-1609209120115-619e31588ab8'] },
    { id: 2, name: 'Premium Letterheads', category: 'Stationery', price: '₹36.20', stock: 'In Stock', variants: 2, images: ['https://images.unsplash.com/photo-1568205631288-1469d8298ce0'] },
    { id: 3, name: 'Paper Carry Bags', category: 'Carry Bags', price: '₹24.50', stock: 'Low Stock', variants: 3, images: ['https://images.unsplash.com/photo-1591197172062-c718f82aba20'] },
    { id: 4, name: 'Custom Packaging Boxes', category: 'Boxes', price: '₹75.00', stock: 'In Stock', variants: 6, images: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f'] },
    { id: 5, name: 'Luxury Business Cards', category: 'Business Cards', price: '₹65.30', stock: 'Out of Stock', variants: 3, images: ['https://images.unsplash.com/photo-1616793944642-81493deb9b5e'] },
    { id: 6, name: 'Envelopes', category: 'Stationery', price: '₹18.90', stock: 'In Stock', variants: 4, images: ['https://images.unsplash.com/photo-1579213838826-dabf29071388'] },
    { id: 7, name: 'Gift Boxes', category: 'Boxes', price: '₹42.99', stock: 'In Stock', variants: 5, images: ['https://images.unsplash.com/photo-1513201099705-a9746e1e201f'] },
  ];

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    setProductImages(product.images || []);
    setIsEditOpen(true);
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

  const getStockColor = (stock: string) => {
    switch(stock) {
      case 'In Stock': return 'text-green-600';
      case 'Low Stock': return 'text-yellow-600';
      case 'Out of Stock': return 'text-red-600';
      default: return '';
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

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead>Images</TableHead>
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
                <TableCell className={getStockColor(product.stock)}>{product.stock}</TableCell>
                <TableCell>{product.variants}</TableCell>
                <TableCell>{product.images?.length || 0}</TableCell>
                <TableCell className="text-right">
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Product: {currentProduct?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  defaultValue={currentProduct?.name} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  defaultValue={currentProduct?.category} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input 
                  id="price" 
                  defaultValue={currentProduct?.price?.replace('₹', '')} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Status</Label>
                <Input 
                  id="stock" 
                  defaultValue={currentProduct?.stock} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variants">Variants</Label>
                <Input 
                  id="variants" 
                  type="number"
                  defaultValue={currentProduct?.variants} 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Product Images (Up to 4)</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddImage}
                  disabled={productImages.length >= 4}
                >
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
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
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  rows={5}
                  placeholder="Product description..."
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
