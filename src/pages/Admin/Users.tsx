
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Search, 
  Download, 
  UserPlus, 
  Filter,
  FileText,
  Mail,
  Phone,
  UserCog,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AdminUsers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user: any) => {
    setCurrentUser(user);
    setIsUserDialogOpen(true);
  };

  const handleToggleUserStatus = (userId: number, currentStatus: boolean) => {
    // In a real application, this would update the user status in the database
    toast({
      title: `User ${currentStatus ? 'deactivated' : 'activated'}`,
      description: `User status has been changed successfully.`,
    });
  };

  const handleSaveUser = () => {
    // In a real application, this would update the user data in the database
    toast({
      title: "User updated",
      description: "User information has been updated successfully.",
    });
    setIsUserDialogOpen(false);
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Fixed this function to accept a boolean or string value instead of an event
  const handleSelectAllUsers = (checked: boolean | string) => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkDelete = () => {
    // In a real application, this would delete multiple users
    toast({
      title: "Users deleted",
      description: `${selectedUsers.length} users have been deleted.`,
      variant: "destructive",
    });
    setSelectedUsers([]);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">User Management</CardTitle>
            <CardDescription>View and manage your customer accounts</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsUserDialogOpen(true)} className="whitespace-nowrap">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="active" />
                      <Label htmlFor="active">Active users</Label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="inactive" />
                      <Label htmlFor="inactive">Inactive users</Label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="with-orders" />
                      <Label htmlFor="with-orders">With orders</Label>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" className="whitespace-nowrap">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>

              {selectedUsers.length > 0 && (
                <Button 
                  variant="destructive" 
                  className="whitespace-nowrap"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete ({selectedUsers.length})
                </Button>
              )}
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      onCheckedChange={handleSelectAllUsers}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-center">Orders</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2" />
                        <p>No users found matching your search criteria.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleSelectUser(user.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {user.mobile}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {user.orders > 0 ? (
                          <Badge variant="secondary">{user.orders}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">No orders</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Switch 
                            checked={user.active} 
                            onCheckedChange={() => handleToggleUserStatus(user.id, user.active)}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <UserCog className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              Edit user
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View orders
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete user
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      {/* User Edit Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentUser ? `Edit User: ${currentUser.name}` : 'Add New User'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={currentUser?.name}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={currentUser?.email}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                defaultValue={currentUser?.mobile}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="user-status" defaultChecked={currentUser?.active} />
                <Label htmlFor="user-status">Account active</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveUser}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>Are you sure you want to delete {selectedUsers.length} selected users?</p>
            <p className="text-muted-foreground text-sm mt-2">This action cannot be undone.</p>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" onClick={handleBulkDelete}>
              Delete Users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminUsers;
