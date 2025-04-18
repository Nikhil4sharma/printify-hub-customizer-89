
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Grid2x2,
  User,
  Download,
  UploadCloud
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';

// These interfaces are prepared for real data integration
interface AdminPageData {
  totalUsers?: number;
  totalOrders?: number;
  totalProducts?: number;
  pendingOrders?: number;
}

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // This state will be replaced with real data from a database
  const [pageData, setPageData] = useState<AdminPageData>({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0
  });

  // This function will be replaced with real data fetching
  // For now it's just a placeholder that would be called in useEffect
  const fetchDashboardData = async () => {
    // When connected to Supabase or another backend, this will be replaced with:
    // const { data, error } = await supabase.from('users').select('count')
    // const { data: orderData, error: orderError } = await supabase.from('orders').select('count')
    // etc.
    
    // For now, we'll just use mock data
    setPageData({
      totalUsers: 120,
      totalOrders: 345,
      totalProducts: 67,
      pendingOrders: 12
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin', icon: Home, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/categories', icon: Grid2x2, label: 'Categories' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <Link to="/admin" className="font-bold text-lg">Print Admin</Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Admin Profile Section */}
          {admin && (
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{admin.name}</p>
                  <p className="text-xs text-muted-foreground">{admin.role}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Add ScrollArea component for navigation */}
          <ScrollArea className="flex-1">
            <nav className="px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              ))}
              
              {/* Profile Link */}
              <Link
                to="/admin/profile"
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === '/admin/profile'
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </Link>
              
              {/* Data Management Section - for future functionality */}
              <div className="pt-4 mt-4 border-t border-border">
                <p className="px-3 text-xs font-medium text-muted-foreground mb-2">Data Management</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs mb-2" 
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs" 
                >
                  <UploadCloud className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
              </div>
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="h-16 border-b border-border flex items-center justify-between px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(true)}
            className={cn("md:hidden", sidebarOpen && "hidden")}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle variant="icon" />
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
