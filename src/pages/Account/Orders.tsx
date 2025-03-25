
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
import { BadgeIndianRupee, ExternalLink, FileText, Search } from 'lucide-react';
import AccountLayout from './AccountLayout';

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

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = React.useState<string | null>(null);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const findOrder = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <AccountLayout>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      
      <div className="space-y-6">
        {selectedOrder ? (
          <div>
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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">{order.id}</h2>
                      <p className="text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} px-3 py-1 font-normal text-sm`}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Order Items</h3>
                    <div className="border rounded-md">
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
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                      <p>123 Main Street</p>
                      <p>Mumbai, Maharashtra 400001</p>
                      <p>India</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
                      <p>Credit Card</p>
                      <p className="text-muted-foreground">xxxx-xxxx-xxxx-1234</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Download Invoice
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Track Order
                    </Button>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <>
            {orders.length > 0 ? (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell className="flex items-center">
                          <BadgeIndianRupee className="h-4 w-4 mr-1" />
                          {order.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)}`}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedOrder(order.id)}
                          >
                            View
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
                <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                <Link to="/products/all">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </AccountLayout>
  );
};

export default OrdersPage;
