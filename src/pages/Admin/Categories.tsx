
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Edit,
  Trash2,
  ImagePlus,
  CheckCircle2,
  XCircle,
  Eye,
  FolderPlus,
  Search,
  Image,
  ArrowUpDown,
  Tag,
  Filter
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminCategories = () => {
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [categoryImage, setCategoryImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSingleDeleteDialogOpen, setIsSingleDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [sortBy, setSortBy] = useState('name-asc');
  
  // Mock category data - would be fetched from API in a real application
  const [categories, setCategories] = useState([
    { id: 1, name: 'Business Cards', products: 12, image: 'businesscard.jpg', featured: true, description: 'Professional business cards for your brand identity', lastUpdated: '2023-10-15', status: 'active' },
    { id: 2, name: 'Stationery', products: 18, image: 'stationery.jpg', featured: true, description: 'Complete stationery solutions for your business', lastUpdated: '2023-11-03', status: 'active' },
    { id: 3, name: 'Carry Bags', products: 8, image: 'carrybags.jpg', featured: false, description: 'Custom printed paper bags for retail and promotions', lastUpdated: '2023-09-22', status: 'active' },
    { id: 4, name: 'Boxes', products: 15, image: 'boxes.jpg', featured: true, description: 'Packaging boxes for products of all sizes', lastUpdated: '2023-12-01', status: 'active' },
    { id: 5, name: 'Posters', products: 7, image: 'posters.jpg', featured: false, description: 'High-quality printed posters in various sizes', lastUpdated: '2023-11-15', status: 'draft' },
    { id: 6, name: 'Banners', products: 10, image: 'banners.jpg', featured: true, description: 'Durable outdoor and indoor banners', lastUpdated: '2023-10-28', status: 'active' },
  ]);

  const filteredCategories = categories
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'products-asc') return a.products - b.products;
      if (sortBy === 'products-desc') return b.products - a.products;
      if (sortBy === 'updated-asc') return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
      if (sortBy === 'updated-desc') return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      return 0;
    });

  const handleEditCategory = (category: any) => {
    setCurrentCategory(category);
    setCategoryImage(category.image || '');
    setIsEditOpen(true);
  };

  const handleAddNewCategory = () => {
    setCurrentCategory(null);
    setCategoryImage('');
    setIsEditOpen(true);
  };

  const handleDeleteCategory = (category: any) => {
    setCategoryToDelete(category);
    setIsSingleDeleteDialogOpen(true);
  };

  const confirmDeleteCategory = () => {
    if (!categoryToDelete) return;
    
    // In a real app, this would delete the category from the database
    setCategories(prev => prev.filter(cat => cat.id !== categoryToDelete.id));
    
    toast({
      title: "Category deleted",
      description: `The category "${categoryToDelete.name}" has been deleted.`,
      variant: "destructive",
    });
    
    setIsSingleDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleSaveCategory = () => {
    // Get form values
    const formName = (document.getElementById('category-name') as HTMLInputElement)?.value;
    const formDescription = (document.getElementById('category-description') as HTMLTextAreaElement)?.value;
    const formFeatured = (document.getElementById('featured') as HTMLInputElement)?.checked;
    const formStatus = (document.getElementById('category-status') as HTMLSelectElement)?.value;
    
    if (!formName) {
      toast({
        title: "Missing information",
        description: "Please provide a category name.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentCategory) {
      // Update existing category
      setCategories(prev => prev.map(cat => 
        cat.id === currentCategory.id 
          ? { 
              ...cat, 
              name: formName,
              description: formDescription || cat.description,
              featured: formFeatured !== undefined ? formFeatured : cat.featured,
              image: categoryImage || cat.image,
              lastUpdated: new Date().toISOString().split('T')[0],
              status: formStatus || cat.status
            } 
          : cat
      ));
      
      toast({
        title: "Category updated",
        description: "The category has been successfully updated.",
      });
    } else {
      // Create new category
      const newCategory = {
        id: categories.length + 1,
        name: formName,
        description: formDescription || '',
        featured: formFeatured || false,
        image: categoryImage || '',
        products: 0,
        lastUpdated: new Date().toISOString().split('T')[0],
        status: formStatus || 'draft'
      };
      
      setCategories(prev => [...prev, newCategory]);
      
      toast({
        title: "Category created",
        description: "The new category has been successfully created.",
      });
    }
    
    setIsEditOpen(false);
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSelectAllCategories = (checked: boolean | string) => {
    if (checked) {
      setSelectedCategories(categories.map(cat => cat.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleBulkDelete = () => {
    // In a real application, this would delete multiple categories
    setCategories(prev => prev.filter(cat => !selectedCategories.includes(cat.id)));
    
    toast({
      title: "Categories deleted",
      description: `${selectedCategories.length} categories have been deleted.`,
      variant: "destructive",
    });
    setSelectedCategories([]);
    setIsDeleteDialogOpen(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to your storage and return a URL
      // For now, we'll use a local URL
      const imageUrl = URL.createObjectURL(file);
      setCategoryImage(imageUrl);
      
      toast({
        title: "Image uploaded",
        description: "Image has been temporarily uploaded.",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Category Management</CardTitle>
            <CardDescription>Organize and manage your product categories</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleAddNewCategory} className="whitespace-nowrap">
              <FolderPlus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search categories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured" />
                      <Label htmlFor="featured">Featured only</Label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="with-image" />
                      <Label htmlFor="with-image">With image</Label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="with-products" />
                      <Label htmlFor="with-products">With products</Label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-active" />
                      <Label htmlFor="status-active">Active</Label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-draft" />
                      <Label htmlFor="status-draft">Draft</Label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-archived" />
                      <Label htmlFor="status-archived">Archived</Label>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <span>Sort by</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="products-desc">Most products</SelectItem>
                  <SelectItem value="products-asc">Fewest products</SelectItem>
                  <SelectItem value="updated-desc">Recently updated</SelectItem>
                  <SelectItem value="updated-asc">Oldest updated</SelectItem>
                </SelectContent>
              </Select>

              {selectedCategories.length > 0 && (
                <Button 
                  variant="destructive" 
                  className="whitespace-nowrap"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete ({selectedCategories.length})
                </Button>
              )}
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCategories.length === categories.length}
                      onCheckedChange={handleSelectAllCategories}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Tag className="h-8 w-8 mb-2" />
                        <p>No categories found matching your search criteria.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleSelectCategory(category.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{category.name}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-xs">
                            {category.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{category.products}</Badge>
                      </TableCell>
                      <TableCell>
                        {category.image ? (
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                            <img 
                              src={`/placeholder.svg`} 
                              alt={category.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                            <Image className="h-5 w-5" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(category.status)}
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
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(category.lastUpdated).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View category</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleEditCategory(category)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit category</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-destructive"
                                  onClick={() => handleDeleteCategory(category)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete category</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      {/* Category Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentCategory ? `Edit Category: ${currentCategory.name}` : 'Add New Category'}</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name*</Label>
                <Input 
                  id="category-name" 
                  defaultValue={currentCategory?.name} 
                  placeholder="Enter category name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category-description">Description</Label>
                <Textarea 
                  id="category-description" 
                  rows={4}
                  defaultValue={currentCategory?.description}
                  placeholder="Category description..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category-status">Status</Label>
                <Select defaultValue={currentCategory?.status || "draft"}>
                  <SelectTrigger id="category-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Only active categories are displayed to customers
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  defaultChecked={currentCategory?.featured}
                />
                <Label htmlFor="featured">Featured category (shown on homepage)</Label>
              </div>
            </TabsContent>
            
            <TabsContent value="image" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Category Image</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Input 
                      id="image"
                      value={categoryImage}
                      onChange={(e) => setCategoryImage(e.target.value)}
                      placeholder="Image URL"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended size: 800x600 pixels
                    </p>
                  </div>
                  
                  <div className="w-full aspect-square rounded-md border flex items-center justify-center bg-muted overflow-hidden">
                    {categoryImage ? (
                      <img 
                        src={`/placeholder.svg`} 
                        alt="Category"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground">
                        <ImagePlus className="h-8 w-8 mb-2" />
                        <span className="text-xs">No image selected</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <input
                    id="category-image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => document.getElementById('category-image-upload')?.click()}
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveCategory}>
              {currentCategory ? 'Save Changes' : 'Create Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>Are you sure you want to delete {selectedCategories.length} selected categories?</p>
            <p className="text-muted-foreground text-sm mt-2">This action cannot be undone. Products in these categories may become uncategorized.</p>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" onClick={handleBulkDelete}>
              Yes, Delete Categories
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Single Category Delete Confirmation Dialog */}
      <Dialog open={isSingleDeleteDialogOpen} onOpenChange={setIsSingleDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Delete Category
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>Are you sure you want to delete the category "{categoryToDelete?.name}"?</p>
            <p className="text-muted-foreground text-sm mt-2">This action cannot be undone. Products in this category may become uncategorized.</p>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" onClick={confirmDeleteCategory}>
              Yes, Delete Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminCategories;
