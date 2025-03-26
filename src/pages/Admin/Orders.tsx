
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, FileText } from 'lucide-react';
import { toast } from "sonner";

// Extended order type to include file information
interface OrderFile {
  name: string;
  url: string;
  type: string;
}

interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  total: string;
  status: string;
  designFile?: OrderFile;
}

const AdminOrders = () => {
  // Mock order data with design files - would be fetched from API in a real application
  const initialOrders: Order[] = [
    { 
      id: 'ORD-001', 
      customer: 'John Smith', 
      product: 'Business Cards', 
      date: '2023-06-15', 
      total: '₹48.75', 
      status: 'Delivered',
      designFile: {
        name: 'business-card-design.pdf',
        url: 'https://example.com/files/business-card-design.pdf',
        type: 'pdf'
      }
    },
    { 
      id: 'ORD-002', 
      customer: 'Sarah Johnson', 
      product: 'Letterheads', 
      date: '2023-06-16', 
      total: '₹36.20', 
      status: 'Processing',
      designFile: {
        name: 'letterhead-design.ai',
        url: 'https://example.com/files/letterhead-design.ai',
        type: 'ai'
      }
    },
    { 
      id: 'ORD-003', 
      customer: 'Michael Brown', 
      product: 'Carry Bags', 
      date: '2023-06-17', 
      total: '₹124.50', 
      status: 'Pending',
      designFile: {
        name: 'carry-bag-design.psd',
        url: 'https://example.com/files/carry-bag-design.psd',
        type: 'psd'
      }
    },
    { 
      id: 'ORD-004', 
      customer: 'Emma Wilson', 
      product: 'Custom Boxes', 
      date: '2023-06-18', 
      total: '₹215.00', 
      status: 'Shipped' 
    },
    { 
      id: 'ORD-005', 
      customer: 'David Lee', 
      product: 'Business Cards', 
      date: '2023-06-19', 
      total: '₹65.30', 
      status: 'Delivered',
      designFile: {
        name: 'premium-business-card.pdf',
        url: 'https://example.com/files/premium-business-card.pdf',
        type: 'pdf'
      }
    },
    { 
      id: 'ORD-006', 
      customer: 'Jennifer Taylor', 
      product: 'Stationery Set', 
      date: '2023-06-20', 
      total: '₹87.15', 
      status: 'Processing' 
    },
    { 
      id: 'ORD-007', 
      customer: 'Robert Miller', 
      product: 'Gift Boxes', 
      date: '2023-06-21', 
      total: '₹158.90', 
      status: 'Pending',
      designFile: {
        name: 'gift-box-template.svg',
        url: 'https://example.com/files/gift-box-template.svg',
        type: 'svg'
      }
    },
  ];

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleDownloadFile = (order: Order) => {
    if (order.designFile) {
      // In a real application, this would trigger the actual file download
      // For demonstration purposes, we'll just show a toast notification
      toast.success(`Downloading ${order.designFile.name}`);
      
      // In a production environment, you would use something like:
      // window.open(order.designFile.url, '_blank');
      // or implement a more secure download mechanism through your API
    }
  };

  const getFileIcon = (fileType?: string) => {
    return <FileText className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Pending': 
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">View and manage customer orders</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select 
            defaultValue="all"
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export</Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Design Files</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  {order.designFile ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleDownloadFile(order)}
                    >
                      {getFileIcon(order.designFile.type)}
                      <span className="ml-1 max-w-[100px] truncate">{order.designFile.name}</span>
                      <Download className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <span className="text-muted-foreground text-sm">No file</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Select 
                    defaultValue={order.status.toLowerCase()}
                    onValueChange={(value) => handleStatusChange(order.id, value.charAt(0).toUpperCase() + value.slice(1))}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrders;
