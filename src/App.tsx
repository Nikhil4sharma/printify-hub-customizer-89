
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminOrders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/Products";
import AdminCategories from "./pages/Admin/Categories";
import AdminSettings from "./pages/Admin/Settings";
import AdminLogin from "./pages/Admin/Login";

const queryClient = new QueryClient();

// Admin route guard component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, this would check for admin authentication
  const isAdmin = localStorage.getItem('adminAuth') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Customer facing routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/products/:category" element={<div>Product Listing Page</div>} />
                  <Route path="/products/:category/:id" element={<div>Product Detail Page</div>} />
                  
                  <Route path="/login" element={<div>Login Page</div>} />
                  <Route path="/register" element={<div>Register Page</div>} />
                  <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
                  
                  <Route path="/cart" element={<div>Cart Page</div>} />
                  <Route path="/checkout" element={<div>Checkout Page</div>} />
                  
                  <Route path="/account/profile" element={<div>Profile Page</div>} />
                  <Route path="/account/orders" element={<div>Orders Page</div>} />
                  
                  <Route path="/contact" element={<div>Contact Page</div>} />
                  
                  {/* Admin routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
