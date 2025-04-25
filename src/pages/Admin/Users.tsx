
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
  AlertCircle,
  ShieldCheck
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminUsers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSingleDeleteDialogOpen, setIsSingleDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  // Mock user data - would be fetched from API in a real application
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', mobile: '+1234567890', orders: 12, active: true, role: 'customer' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', mobile: '+1987654321', orders: 8, active: true, role: 'customer' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', mobile: '+1122334455', orders: 5, active: false, role: 'staff' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', mobile: '+1567891234', orders: 15, active: true, role: 'customer' },
    { id: 5, name: 'David Lee', email: 'david@example.com', mobile: '+1321654987', orders: 3, active: true, role: 'staff' },
    { id: 6, name: 'Jennifer Taylor', email: 'jennifer@example.com', mobile: '+1654789321', orders: 7, active: true, role: 'customer' },
    { id: 7, name: 'Robert Miller', email: 'robert@example.com', mobile: '+1789456123', orders: 0, active: false, role: 'customer' },
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user: any) => {
    setCurrentUser(user);
    setIsUserDialogOpen(true);
  };

  const handleToggleUserStatus = (userId: number, currentStatus: boolean) => {
    // Update the user status in our state
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, active: !currentStatus } : user
    ));
    
    // Show a toast notification
    toast({
      title: `User ${currentStatus ? 'deactivated' : 'activated'}`,
      description: `User status has been changed successfully.`,
    });
  };

  const handleSaveUser = () => {
    if (!currentUser) return;
    
    const formName = (document.getElementById('name') as HTMLInputElement)?.value;
    const formEmail = (document.getElementById('email') as HTMLInputElement)?.value;
    const formPhone = (document.getElementById('phone') as HTMLInputElement)?.value;
    const formActive = (document.getElementById('user-status') as HTMLInputElement)?.checked;
    const formRole = (document.getElementById('user-role') as HTMLSelectElement)?.value;
    
    // In a real application, this would update the user data in the database
    setUsers(prev => prev.map(user => 
      user.id === currentUser.id 
        ? { 
            ...user, 
            name: formName || user.name,
            email: formEmail || user.email,
            mobile: formPhone || user.mobile,
            active: formActive !== undefined ? formActive : user.active,
            role: formRole || user.role
          } 
        : user
    ));
    
    toast({
      title: "User updated",
      description: "User information has been updated successfully.",
    });
    setIsUserDialogOpen(false);
  };
  
  const handleCreateUser = () => {
    const formName = (document.getElementById('name') as HTMLInputElement)?.value;
    const formEmail = (document.getElementById('email') as HTMLInputElement)?.value;
    const formPhone = (document.getElementById('phone') as HTMLInputElement)?.value;
    const formActive = (document.getElementById('user-status') as HTMLInputElement)?.checked;
    const formRole = (document.getElementById('user-role') as HTMLSelectElement)?.value;
    
    if (!formName || !formEmail) {
      toast({
        title: "Missing information",
        description: "Please provide at least a name and email.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would create a user in the database
    const newUser = {
      id: users.length + 1,
      name: formName,
      email: formEmail,
      mobile: formPhone || '',
      orders: 0,
      active: formActive !== undefined ? formActive : true,
      role: formRole || 'customer'
    };
    
    setUsers(prev => [...prev, newUser]);
    
    toast({
      title: "User created",
      description: "New user has been created successfully.",
    });
    setIsUserDialogOpen(false);
  };

  const handleDeleteSingleUser = (user: any) => {
    setUserToDelete(user);
    setIsSingleDeleteDialogOpen(true);
  };

  const confirmDeleteSingleUser = () => {
    if (!userToDelete) return;
    
    // In a real application, this would delete the user from the database
    setUsers(prev => prev.filter(user => user.id !== userToDelete.id));
    
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully.",
      variant: "destructive",
    });
    
    setIsSingleDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAllUsers = (checked: boolean | string) => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkDelete = () => {
    // In a real application, this would delete multiple users
    setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
    
    toast({
      title: "Users deleted",
      description: `${selectedUsers.length} users have been deleted.`,
      variant: "destructive",
    });
    setSelectedUsers([]);
    setIsDeleteDialogOpen(false);
  };
  
  const handleAddUser = () => {
    setCurrentUser(null);
    setIsUserDialogOpen(true);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-500">Admin</Badge>;
      case 'staff':
        return <Badge className="bg-blue-500">Staff</Badge>;
      default:
        return <Badge variant="outline">Customer</Badge>;
    }
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
            <Button onClick={handleAddUser} className="whitespace-nowrap">
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
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-customer" />
                      <Label htmlFor="role-customer">Customers</Label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-staff" />
                      <Label htmlFor="role-staff">Staff</Label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-admin" />
                      <Label htmlFor="role-admin">Admins</Label>
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
                  <TableHead className="text-center">Role</TableHead>
                  <TableHead className="text-center">Orders</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
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
                        {getRoleBadge(user.role)}
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
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDeleteSingleUser(user)}
                            >
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
              <Label htmlFor="user-role" className="text-right">
                Role
              </Label>
              <Select defaultValue={currentUser?.role || "customer"}>
                <SelectTrigger id="user-role" className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="user-status" defaultChecked={currentUser?.active} />
                <Label htmlFor="user-status">Account active</Label>
              </div>
            </div>
            
            {currentUser?.role === 'staff' && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Permissions</Label>
                <div className="space-y-2 col-span-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-orders" defaultChecked />
                    <Label htmlFor="perm-orders">View orders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-customers" defaultChecked />
                    <Label htmlFor="perm-customers">View customers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-products" />
                    <Label htmlFor="perm-products">Manage products</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-settings" />
                    <Label htmlFor="perm-settings">Access settings</Label>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              onClick={currentUser ? handleSaveUser : handleCreateUser}
            >
              {currentUser ? 'Save Changes' : 'Create User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
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
      
      {/* Single User Delete Confirmation Dialog */}
      <Dialog open={isSingleDeleteDialogOpen} onOpenChange={setIsSingleDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Delete User
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>Are you sure you want to delete the user "{userToDelete?.name}"?</p>
            <p className="text-muted-foreground text-sm mt-2">This action cannot be undone.</p>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" onClick={confirmDeleteSingleUser}>
              Yes, Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminUsers;
