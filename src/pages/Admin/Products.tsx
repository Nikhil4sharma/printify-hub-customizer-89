import React, { useState } from 'react';
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
    },
    { 
      id: 6, 
      name: 'Envelopes', 
      category: 'Stationery', 
      price: '₹450.00',  
      variants: 4, 
      images: ['https://images.unsplash.com/photo-1579213838826-dabf29071388'],
    },
    { 
      id: 7, 
      name: 'Gift Boxes', 
      category: 'Boxes', 
      price: '₹850.00',  
      variants: 5, 
      images: ['https://images.unsplash.com/photo-1513201099705-a9746e1e201f'],
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
    setIsEditOpen(true);
  };

  const handlePreviewProduct = (product: any) => {
    setCurrentProduct(product);
    setIsPreviewOpen(true);
  };

  const handleSaveProduct = (updatedProduct: any) => {
    // In a real app, this would update the product in the database
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

      <ProductFilters categories={categories} />
      <ProductsTable 
        products={products} 
        onEdit={handleEditProduct}
        onPreview={handlePreviewProduct}
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
