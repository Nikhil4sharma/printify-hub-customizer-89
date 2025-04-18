
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
import MainLayout from "@/components/layout/MainLayout";

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
import AddressBook from "./pages/Account/AddressBook";
import ProductsListing from "./pages/Products/ProductsListing";
import ProductDetail from "./pages/Products/ProductDetail";
import Contact from "./pages/Contact";
import AccountLayout from "./pages/Account/AccountLayout";
import FAQ from "./pages/Support/FAQ";
import ShippingPolicy from "./pages/Support/ShippingPolicy";
import PrivacyPolicy from "./pages/Support/PrivacyPolicy";
import TermsOfService from "./pages/Support/TermsOfService";
import HelpCenter from "./pages/Support/HelpCenter";

// Blog pages
import BlogLayout from "./pages/Blog/BlogLayout";
import BlogHome from "./pages/Blog/BlogHome";
import BlogPost from "./pages/Blog/BlogPost";
import BlogCategory from "./pages/Blog/BlogCategory";

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

// Check if we're on the blog subdomain
const isBlogSubdomain = () => {
  const hostname = window.location.hostname;
  return hostname.startsWith('blog.') || hostname.includes('blog.localhost');
};

const App = () => {
  // Render blog routes if on blog subdomain
  if (isBlogSubdomain()) {
    return (
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<BlogLayout><BlogHome /></BlogLayout>} />
                  <Route path="/post/:slug" element={<BlogLayout><BlogPost /></BlogLayout>} />
                  <Route path="/category/:category" element={<BlogLayout><BlogCategory /></BlogLayout>} />
                  <Route path="*" element={<BlogLayout><NotFound /></BlogLayout>} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </React.StrictMode>
    );
  }

  // Render main application routes
  return (
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
                      <Route path="/" element={
                        <MainLayout>
                          <Index />
                        </MainLayout>
                      } />
                      
                      <Route path="/products/:category" element={
                        <MainLayout>
                          <ProductsListing />
                        </MainLayout>
                      } />
                      
                      <Route path="/products/:category/:id" element={
                        <MainLayout>
                          <ProductDetail />
                        </MainLayout>
                      } />
                      
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      
                      <Route path="/cart" element={
                        <MainLayout>
                          <Cart />
                        </MainLayout>
                      } />
                      
                      <Route path="/checkout" element={
                        <MainLayout>
                          <Checkout />
                        </MainLayout>
                      } />
                      
                      {/* Support pages */}
                      <Route path="/faq" element={
                        <MainLayout>
                          <FAQ />
                        </MainLayout>
                      } />
                      
                      <Route path="/shipping-policy" element={
                        <MainLayout>
                          <ShippingPolicy />
                        </MainLayout>
                      } />
                      
                      <Route path="/privacy-policy" element={
                        <MainLayout>
                          <PrivacyPolicy />
                        </MainLayout>
                      } />
                      
                      <Route path="/terms-of-service" element={
                        <MainLayout>
                          <TermsOfService />
                        </MainLayout>
                      } />
                      
                      <Route path="/help-center" element={
                        <MainLayout>
                          <HelpCenter />
                        </MainLayout>
                      } />
                      
                      {/* User account routes */}
                      <Route path="/account" element={
                        <AuthRoute>
                          <MainLayout>
                            <AccountLayout />
                          </MainLayout>
                        </AuthRoute>
                      }>
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="orders" element={<OrdersPage />} />
                        <Route path="addresses" element={<AddressBook />} />
                      </Route>
                      
                      <Route path="/contact" element={
                        <MainLayout>
                          <Contact />
                        </MainLayout>
                      } />
                      
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
                      
                      <Route path="*" element={
                        <MainLayout>
                          <NotFound />
                        </MainLayout>
                      } />
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
};

export default App;
