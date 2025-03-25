
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
  Plus, 
  Edit,
  Trash2,
  ImagePlus,
  CheckCircle2,
  XCircle,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

const AdminCategories = () => {
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [categoryImage, setCategoryImage] = useState('');
  
  // Mock category data - would be fetched from API in a real application
  const categories = [
    { id: 1, name: 'Business Cards', products: 12, image: 'businesscard.jpg', featured: true, description: 'Professional business cards for your brand identity' },
    { id: 2, name: 'Stationery', products: 18, image: 'stationery.jpg', featured: true, description: 'Complete stationery solutions for your business' },
    { id: 3, name: 'Carry Bags', products: 8, image: 'carrybags.jpg', featured: false, description: 'Custom printed paper bags for retail and promotions' },
    { id: 4, name: 'Boxes', products: 15, image: 'boxes.jpg', featured: true, description: 'Packaging boxes for products of all sizes' },
  ];

  const handleEditCategory = (category: any) => {
    setCurrentCategory(category);
    setCategoryImage(category.image || '');
    setIsEditOpen(true);
  };

  const handleSaveCategory = () => {
    // In a real app, this would update the category in the database
    toast({
      title: "Category updated",
      description: "The category has been successfully updated",
    });
    setIsEditOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>
          <p className="text-muted-foreground">View and manage product categories</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.products}</TableCell>
                <TableCell>
                  {category.image ? (
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-muted">
                      <img 
                        src={`/placeholder.svg`} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">No image</span>
                  )}
                </TableCell>
                <TableCell>
                  {category.featured ? (
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
                  <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
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

      {/* Category Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Category: {currentCategory?.name}</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input 
                  id="name" 
                  defaultValue={currentCategory?.name} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  rows={4}
                  defaultValue={currentCategory?.description}
                  placeholder="Category description..."
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={currentCategory?.featured}
                />
                <Label htmlFor="featured">Featured category (shown on homepage)</Label>
              </div>
            </TabsContent>
            
            <TabsContent value="image" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Category Image</Label>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <Input 
                      id="image"
                      value={categoryImage}
                      onChange={(e) => setCategoryImage(e.target.value)}
                      placeholder="Image URL"
                    />
                  </div>
                  
                  <div className="w-24 h-24 rounded-md border flex items-center justify-center bg-muted overflow-hidden">
                    {categoryImage ? (
                      <img 
                        src={`/placeholder.svg`} 
                        alt="Category"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImagePlus className="h-8 w-8 text-muted-foreground/50" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended size: 800x600 pixels
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="seo" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input 
                  id="seo-title" 
                  placeholder="SEO optimized title"
                  defaultValue={currentCategory?.name}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seo-description">SEO Description</Label>
                <Textarea 
                  id="seo-description" 
                  rows={3}
                  placeholder="SEO optimized description"
                  defaultValue={currentCategory?.description}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="custom-url">Custom URL</Label>
                <Input 
                  id="custom-url" 
                  placeholder="e.g., business-cards"
                  defaultValue={currentCategory?.name?.toLowerCase().replace(/ /g, '-')}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to use the category name
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategories;
