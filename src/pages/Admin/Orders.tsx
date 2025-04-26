
import React, { useState } from 'react';
import OrdersFilter from '@/components/admin/orders/OrdersFilter';
import OrdersTable from '@/components/admin/orders/OrdersTable';
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
      toast.success(`Downloading ${order.designFile.name}`);
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

      <OrdersFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
      />

      <OrdersTable 
        orders={filteredOrders}
        onStatusChange={handleStatusChange}
        onDownloadFile={handleDownloadFile}
      />
    </div>
  );
};

export default AdminOrders;
