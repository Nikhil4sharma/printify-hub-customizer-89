
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  ArrowUp, 
  ArrowDown
} from 'lucide-react';

const AdminDashboard = () => {
  // These would come from API calls in a real application
  const stats = [
    { 
      title: 'Total Users', 
      value: '3,854', 
      icon: Users, 
      change: '+12%', 
      trend: 'up' 
    },
    { 
      title: 'Total Orders', 
      value: '12,543', 
      icon: ShoppingCart, 
      change: '+18%', 
      trend: 'up' 
    },
    { 
      title: 'Products', 
      value: '542', 
      icon: Package, 
      change: '+6%', 
      trend: 'up' 
    },
    { 
      title: 'Revenue', 
      value: '$125,430', 
      icon: Package, 
      change: '-3%', 
      trend: 'down' 
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Smith', product: 'Business Cards', total: '$48.75', status: 'Delivered' },
    { id: 'ORD-002', customer: 'Sarah Johnson', product: 'Letterheads', total: '$36.20', status: 'Processing' },
    { id: 'ORD-003', customer: 'Michael Brown', product: 'Carry Bags', total: '$124.50', status: 'Pending' },
    { id: 'ORD-004', customer: 'Emma Wilson', product: 'Custom Boxes', total: '$215.00', status: 'Shipped' },
    { id: 'ORD-005', customer: 'David Lee', product: 'Business Cards', total: '$65.30', status: 'Delivered' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your printing business</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === 'up' ? (
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium py-2">Order</th>
                    <th className="text-left font-medium py-2">Customer</th>
                    <th className="text-left font-medium py-2">Product</th>
                    <th className="text-left font-medium py-2">Total</th>
                    <th className="text-left font-medium py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2">{order.id}</td>
                      <td className="py-2">{order.customer}</td>
                      <td className="py-2">{order.product}</td>
                      <td className="py-2">{order.total}</td>
                      <td className="py-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New product added</p>
                  <p className="text-xs text-muted-foreground">Premium Business Cards</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-xs text-muted-foreground">Order #ORD-006</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">Jane Cooper</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
