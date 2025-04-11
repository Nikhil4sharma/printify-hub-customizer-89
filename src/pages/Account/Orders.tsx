
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle,
  BadgeIndianRupee, 
  CreditCard,
  ExternalLink, 
  FileText, 
  Filter, 
  Package, 
  Search, 
  Truck, 
  User
} from 'lucide-react';
import { toast } from 'sonner';

// Mock order data
const orders = [
  { 
    id: 'ORD-001', 
    date: '2023-06-15', 
    total: 2487.50, 
    status: 'Delivered',
    items: [
      { id: 1, name: 'Premium Business Cards', quantity: 1, price: 1250 },
      { id: 2, name: 'Custom Letterheads', quantity: 1, price: 1237.50 }
    ]
  },
  { 
    id: 'ORD-002', 
    date: '2023-06-28', 
    total: 3650, 
    status: 'Processing',
    items: [
      { id: 3, name: 'Luxury Wedding Cards', quantity: 2, price: 1825 }
    ]
  },
  { 
    id: 'ORD-003', 
    date: '2023-07-10', 
    total: 750, 
    status: 'Shipped',
    items: [
      { id: 4, name: 'Standard Business Cards', quantity: 1, price: 750 }
    ]
  },
];

const OrdersPage: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || order.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <Package className="h-4 w-4 mr-1" />;
      case 'Shipped':
        return <Truck className="h-4 w-4 mr-1" />;
      case 'Processing':
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return <Package className="h-4 w-4 mr-1" />;
    }
  };

  const findOrder = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const handleTrackOrder = (orderId: string) => {
    toast.info(`Tracking order ${orderId}. You will receive updates via email.`);
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast.success(`Invoice for ${orderId} downloaded successfully.`);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      
      <div className="space-y-6">
        {selectedOrder ? (
          <div className="animate-fade-in">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedOrder(null)} 
              className="mb-4"
            >
              ← Back to Orders
            </Button>
            
            {/* Order Details */}
            {(() => {
              const order = findOrder(selectedOrder);
              
              if (!order) return <div>Order not found</div>;
              
              return (
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-bold">{order.id}</h2>
                          <p className="text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <Badge className={`${getStatusColor(order.status)} flex items-center px-3 py-1 font-normal text-sm`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Tabs defaultValue="items">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="items">Order Items</TabsTrigger>
                      <TabsTrigger value="shipping">Shipping Details</TabsTrigger>
                      <TabsTrigger value="billing">Billing Details</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="items" className="mt-4">
                      <Card>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.items.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell className="font-medium">{item.name}</TableCell>
                                  <TableCell className="text-center">{item.quantity}</TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end">
                                      <BadgeIndianRupee className="h-4 w-4 mr-1" />
                                      <span>{item.price.toFixed(2)}</span>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell colSpan={2} className="text-right font-semibold">Subtotal</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end">
                                    <BadgeIndianRupee className="h-4 w-4 mr-1" />
                                    <span>{order.total.toFixed(2)}</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={2} className="text-right font-semibold">Shipping</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end">
                                    <BadgeIndianRupee className="h-4 w-4 mr-1" />
                                    <span>150.00</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={2} className="text-right font-semibold">Total</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end font-bold">
                                    <BadgeIndianRupee className="h-4 w-4 mr-1" />
                                    <span>{(order.total + 150).toFixed(2)}</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="shipping" className="mt-4">
                      <Card>
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Delivery Address</h3>
                              <div className="mt-2 space-y-1 text-muted-foreground">
                                <p>John Doe</p>
                                <p>123 Main Street</p>
                                <p>Mumbai, Maharashtra 400001</p>
                                <p>India</p>
                                <p>Phone: +91 98765 43210</p>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              <Truck className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Delivery Method</h3>
                              <div className="mt-2 space-y-1 text-muted-foreground">
                                <p>Standard Shipping</p>
                                <p>Estimated delivery: 3-5 business days</p>
                                {order.status === 'Shipped' && (
                                  <p className="text-primary">Tracking #: SHIP123456789</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="billing" className="mt-4">
                      <Card>
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              <CreditCard className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Payment Method</h3>
                              <div className="mt-2 space-y-1 text-muted-foreground">
                                <p>Credit Card</p>
                                <p className="text-muted-foreground">xxxx-xxxx-xxxx-1234</p>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Billing Address</h3>
                              <div className="mt-2 space-y-1 text-muted-foreground">
                                <p>John Doe</p>
                                <p>123 Main Street</p>
                                <p>Mumbai, Maharashtra 400001</p>
                                <p>India</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => handleDownloadInvoice(order.id)}
                    >
                      <FileText className="h-4 w-4" />
                      Download Invoice
                    </Button>
                    {order.status !== 'Delivered' && (
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => handleTrackOrder(order.id)}
                      >
                        <Search className="h-4 w-4" />
                        Track Order
                      </Button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search orders..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setFilter('all')}>
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
                
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                
                <Button
                  variant={filter === 'processing' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('processing')}
                >
                  Processing
                </Button>
                
                <Button
                  variant={filter === 'shipped' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('shipped')}
                >
                  Shipped
                </Button>
              </div>
            </div>
            
            {filteredOrders.length > 0 ? (
              <div className="overflow-hidden border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString('en-IN')}</TableCell>
                        <TableCell className="flex items-center">
                          <BadgeIndianRupee className="h-4 w-4 mr-1" />
                          {order.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedOrder(order.id)}
                            className="hover:bg-primary/10"
                          >
                            View Details
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-xl font-medium mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria.</p>
                <Button onClick={() => { setSearchQuery(''); setFilter('all'); }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
