
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
import { Switch } from '@/components/ui/switch';
import { Search } from 'lucide-react';

const AdminUsers = () => {
  // Mock user data - would be fetched from API in a real application
  const users = [
    { id: 1, name: 'John Smith', email: 'john@example.com', mobile: '+1234567890', orders: 12, active: true },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', mobile: '+1987654321', orders: 8, active: true },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', mobile: '+1122334455', orders: 5, active: false },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', mobile: '+1567891234', orders: 15, active: true },
    { id: 5, name: 'David Lee', email: 'david@example.com', mobile: '+1321654987', orders: 3, active: true },
    { id: 6, name: 'Jennifer Taylor', email: 'jennifer@example.com', mobile: '+1654789321', orders: 7, active: true },
    { id: 7, name: 'Robert Miller', email: 'robert@example.com', mobile: '+1789456123', orders: 0, active: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">View and manage user accounts</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-8" />
        </div>
        <Button>Export Data</Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell className="text-center">{user.orders}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <Switch checked={user.active} />
                  </div>
                </TableCell>
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

export default AdminUsers;
