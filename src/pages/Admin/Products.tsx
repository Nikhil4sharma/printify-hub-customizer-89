
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ProductsTable from '@/components/admin/products/ProductsTable';
import ProductFilters from '@/components/admin/products/ProductFilters';
import ProductPreviewDialog from '@/components/admin/products/ProductPreviewDialog';
import ProductEditDialog from '@/components/admin/products/ProductEditDialog';

const AdminProducts = () => {
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  
  // Mock product data with better image URLs
  const productsData = [
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
      images: [
        'https://images.unsplash.com/photo-1616793944642-81493deb9b5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1609209120115-619e31588ab8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1576466759225-c6154466f4dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568205631288-1469d8298ce0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1546422401-68b415cbf8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591197172062-c718f82aba20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1616628188804-7e95a06697e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
    },
    { 
      id: 5, 
      name: 'Envelopes', 
      category: 'Stationery', 
      price: '₹450.00',
      sku: 'ENV-STD-01',
      featured: false,
      sizeOptions: ['DL', 'C4', 'C5'],
      thicknessOptions: ['100 GSM', '120 GSM'],
      quantityOptions: [100, 250, 500, 1000],
      images: [
        'https://images.unsplash.com/photo-1579213838826-dabf29071388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
    },
    { 
      id: 6, 
      name: 'Gift Boxes', 
      category: 'Boxes', 
      price: '₹850.00',
      sku: 'BOX-GFT-01',
      featured: true,
      sizeOptions: ['Small', 'Medium', 'Large'],
      thicknessOptions: ['300 GSM', '400 GSM'],
      treatmentOptions: ['Matte Lamination', 'Glossy Lamination', 'None'],
      quantityOptions: [50, 100, 250, 500],
      images: [
        'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const categories = [
    { id: 1, name: 'Business Cards' },
    { id: 2, name: 'Stationery' },
    { id: 3, name: 'Carry Bags' },
    { id: 4, name: 'Boxes' },
  ];

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let result = [...productsData];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      const categoryName = categories.find(c => c.id.toString() === selectedCategory)?.name;
      if (categoryName) {
        result = result.filter(product => product.category === categoryName);
      }
    }
    
    // Apply sorting
    switch (sortOption) {
      case "newest":
        result = result.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result = result.sort((a, b) => a.id - b.id);
        break;
      case "priceLow":
        result = result.sort((a, b) => 
          parseFloat(a.price.replace('₹', '')) - parseFloat(b.price.replace('₹', ''))
        );
        break;
      case "priceHigh":
        result = result.sort((a, b) => 
          parseFloat(b.price.replace('₹', '')) - parseFloat(a.price.replace('₹', ''))
        );
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortOption]);

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    setIsEditOpen(true);
  };

  const handlePreviewProduct = (product: any) => {
    setCurrentProduct(product);
    setIsPreviewOpen(true);
  };

  const handleDeleteProduct = (product: any) => {
    // In a real app, this would delete the product from the database
    // For now, we'll just filter it out from our local array
    setFilteredProducts(prev => prev.filter(p => p.id !== product.id));
    
    toast({
      title: "Product deleted",
      description: `${product.name} has been successfully deleted`,
    });
  };

  const handleSaveProduct = (updatedProduct: any) => {
    // In a real app, this would update the product in the database
    // For now, we'll just update our local array
    setFilteredProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    
    toast({
      title: "Product updated",
      description: "The product has been successfully updated",
    });
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

      <ProductFilters 
        categories={categories} 
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortOption}
      />
      
      <ProductsTable 
        products={filteredProducts} 
        onEdit={handleEditProduct}
        onPreview={handlePreviewProduct}
        onDelete={handleDeleteProduct}
      />

      <ProductEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        product={currentProduct}
        categories={categories}
        onSave={handleSaveProduct}
      />

      <ProductPreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        product={currentProduct}
      />
    </div>
  );
};

export default AdminProducts;
