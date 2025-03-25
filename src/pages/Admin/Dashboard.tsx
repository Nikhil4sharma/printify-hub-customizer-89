
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  ArrowUp, 
  ArrowDown,
  IndianRupee,
  BarChart3,
  CalendarDays,
  Clock,
  TrendingUp,
  FileText,
  Printer,
  ShoppingBag,
  Layers,
  CheckCircle
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AdminDashboard = () => {
  // These would come from API calls in a real application
  const stats = [
    { 
      title: 'Total Orders', 
      value: '12,543', 
      icon: ShoppingCart, 
      change: '+18%', 
      trend: 'up',
      color: 'bg-blue-500/10 text-blue-500'
    },
    { 
      title: 'Revenue', 
      value: '₹1,25,430', 
      icon: IndianRupee, 
      change: '+24%', 
      trend: 'up',
      color: 'bg-green-500/10 text-green-500'
    },
    { 
      title: 'Products', 
      value: '542', 
      icon: Package, 
      change: '+6%', 
      trend: 'up',
      color: 'bg-amber-500/10 text-amber-500' 
    },
    { 
      title: 'Customers', 
      value: '3,854', 
      icon: Users, 
      change: '+12%', 
      trend: 'up',
      color: 'bg-purple-500/10 text-purple-500'
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Smith', product: 'Business Cards', total: '₹4,875', status: 'Delivered', date: '2 hours ago' },
    { id: 'ORD-002', customer: 'Sarah Johnson', product: 'Letterheads', total: '₹3,620', status: 'Processing', date: '5 hours ago' },
    { id: 'ORD-003', customer: 'Michael Brown', product: 'Carry Bags', total: '₹12,450', status: 'Pending', date: '8 hours ago' },
    { id: 'ORD-004', customer: 'Emma Wilson', product: 'Custom Boxes', total: '₹21,500', status: 'Shipped', date: '1 day ago' },
    { id: 'ORD-005', customer: 'David Lee', product: 'Business Cards', total: '₹6,530', status: 'Delivered', date: '1 day ago' },
  ];

  const activities = [
    { icon: ShoppingCart, title: 'New order received', description: 'Order #ORD-006 from Priya Mehta', time: '2 hours ago', color: 'bg-blue-500/10 text-blue-500' },
    { icon: Package, title: 'New product added', description: 'Premium Business Cards', time: '4 hours ago', color: 'bg-amber-500/10 text-amber-500' },
    { icon: Users, title: 'New user registered', description: 'Jane Cooper (jane@example.com)', time: '6 hours ago', color: 'bg-purple-500/10 text-purple-500' },
    { icon: CheckCircle, title: 'Order completed', description: 'Order #ORD-001 has been delivered', time: '1 day ago', color: 'bg-green-500/10 text-green-500' },
    { icon: FileText, title: 'Customer uploaded file', description: 'business_card_design.pdf for Order #ORD-007', time: '1 day ago', color: 'bg-indigo-500/10 text-indigo-500' },
  ];

  const popularProducts = [
    { name: 'Standard Business Cards', orders: 324, revenue: '₹4,05,000', trend: '+12%' },
    { name: 'Premium Letterheads', orders: 218, revenue: '₹2,07,100', trend: '+8%' },
    { name: 'Luxury Business Cards', orders: 186, revenue: '₹3,39,450', trend: '+15%' },
    { name: 'Paper Carry Bags', orders: 152, revenue: '₹1,14,000', trend: '+5%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your printing business</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`rounded-full p-2 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
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

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="products">Popular Products</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest orders from your customers</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-3 px-2">Order</th>
                      <th className="text-left font-medium py-3 px-2">Customer</th>
                      <th className="text-left font-medium py-3 px-2">Product</th>
                      <th className="text-left font-medium py-3 px-2">Total</th>
                      <th className="text-left font-medium py-3 px-2">Date</th>
                      <th className="text-left font-medium py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-2 font-medium">{order.id}</td>
                        <td className="py-3 px-2">{order.customer}</td>
                        <td className="py-3 px-2">{order.product}</td>
                        <td className="py-3 px-2">{order.total}</td>
                        <td className="py-3 px-2 text-muted-foreground">{order.date}</td>
                        <td className="py-3 px-2">
                          <Badge className={`
                            ${order.status === 'Delivered' ? 'bg-green-500 hover:bg-green-600' : 
                            order.status === 'Shipped' ? 'bg-blue-500 hover:bg-blue-600' : 
                            order.status === 'Processing' ? 'bg-amber-500 hover:bg-amber-600' : 
                            'bg-slate-500 hover:bg-slate-600'}`}>
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Popular Products</CardTitle>
                  <CardDescription>Your top selling products</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-3 px-2">Product</th>
                      <th className="text-left font-medium py-3 px-2">Orders</th>
                      <th className="text-left font-medium py-3 px-2">Revenue</th>
                      <th className="text-left font-medium py-3 px-2">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularProducts.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-2 font-medium">{product.name}</td>
                        <td className="py-3 px-2">{product.orders}</td>
                        <td className="py-3 px-2">{product.revenue}</td>
                        <td className="py-3 px-2 text-green-500 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {product.trend}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-500/10 p-2 rounded-full mr-3">
                      <Layers className="h-4 w-4 text-blue-500" />
                    </div>
                    <span>Business Cards</span>
                  </div>
                  <span className="font-medium">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-500/10 p-2 rounded-full mr-3">
                      <FileText className="h-4 w-4 text-green-500" />
                    </div>
                    <span>Stationery</span>
                  </div>
                  <span className="font-medium">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-amber-500/10 p-2 rounded-full mr-3">
                      <ShoppingBag className="h-4 w-4 text-amber-500" />
                    </div>
                    <span>Carry Bags</span>
                  </div>
                  <span className="font-medium">18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-500/10 p-2 rounded-full mr-3">
                      <Package className="h-4 w-4 text-purple-500" />
                    </div>
                    <span>Boxes</span>
                  </div>
                  <span className="font-medium">12%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Production Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-500/10 p-2 rounded-full mr-3">
                      <Clock className="h-4 w-4 text-blue-500" />
                    </div>
                    <span>Pending</span>
                  </div>
                  <Badge variant="outline">24 orders</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-amber-500/10 p-2 rounded-full mr-3">
                      <Printer className="h-4 w-4 text-amber-500" />
                    </div>
                    <span>Printing</span>
                  </div>
                  <Badge variant="outline">18 orders</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-500/10 p-2 rounded-full mr-3">
                      <Package className="h-4 w-4 text-purple-500" />
                    </div>
                    <span>Packaging</span>
                  </div>
                  <Badge variant="outline">12 orders</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-500/10 p-2 rounded-full mr-3">
                      <ShoppingCart className="h-4 w-4 text-green-500" />
                    </div>
                    <span>Ready for Delivery</span>
                  </div>
                  <Badge variant="outline">8 orders</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest activities across your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center pt-2">
                        <CalendarDays className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                    {index < activities.length - 1 && <Separator className="absolute left-[36px] h-[calc(100%-50px)] w-[1px] translate-y-[25px]" orientation="vertical" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
