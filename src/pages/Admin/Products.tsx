
import React from 'react';
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
import { Search, Plus } from 'lucide-react';

const AdminProducts = () => {
  // Mock product data - would be fetched from API in a real application
  const products = [
    { id: 1, name: 'Standard Business Cards', category: 'Business Cards', price: '$48.75', stock: 'In Stock', variants: 4 },
    { id: 2, name: 'Premium Letterheads', category: 'Stationery', price: '$36.20', stock: 'In Stock', variants: 2 },
    { id: 3, name: 'Paper Carry Bags', category: 'Carry Bags', price: '$24.50', stock: 'Low Stock', variants: 3 },
    { id: 4, name: 'Custom Packaging Boxes', category: 'Boxes', price: '$75.00', stock: 'In Stock', variants: 6 },
    { id: 5, name: 'Luxury Business Cards', category: 'Business Cards', price: '$65.30', stock: 'Out of Stock', variants: 3 },
    { id: 6, name: 'Envelopes', category: 'Stationery', price: '$18.90', stock: 'In Stock', variants: 4 },
    { id: 7, name: 'Gift Boxes', category: 'Boxes', price: '$42.99', stock: 'In Stock', variants: 5 },
  ];

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
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProducts;
