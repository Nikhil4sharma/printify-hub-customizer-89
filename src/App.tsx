
import React from "react";
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
import AdminProfile from "./pages/Admin/Profile";
import AdminLogin from "./pages/Admin/Login";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProfilePage from "./pages/Account/Profile";
import OrdersPage from "./pages/Account/Orders";
import ProductsListing from "./pages/Products/ProductsListing";
import ProductDetail from "./pages/Products/ProductDetail";
import Contact from "./pages/Contact";

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Admin route guard component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, this would check for admin authentication
  const isAdmin = localStorage.getItem('adminAuth') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
};

// Auth route guard component
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, this would check for user authentication
  const isAuth = localStorage.getItem('user') !== null;
  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <React.StrictMode>
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
                    <Route path="/products/:category" element={<ProductsListing />} />
                    <Route path="/products/:category/:id" element={<ProductDetail />} />
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    
                    <Route path="/account/profile" element={
                      <AuthRoute>
                        <ProfilePage />
                      </AuthRoute>
                    } />
                    <Route path="/account/orders" element={
                      <AuthRoute>
                        <OrdersPage />
                      </AuthRoute>
                    } />
                    
                    <Route path="/contact" element={<Contact />} />
                    
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
                      <Route path="profile" element={<AdminProfile />} />
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
  </React.StrictMode>
);

export default App;
