
import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Card } from "@/components/ui/card";
import { CreditCard, ShoppingBag } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle variant="switch" />
      </div>
      
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-primary hover:underline font-medium flex items-center">
          <span className="mr-2">←</span> Back to Home
        </Link>
      </div>
      
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            {title.includes("Login") || title.includes("Register") ? (
              <ShoppingBag className="h-8 w-8 text-primary" />
            ) : (
              <CreditCard className="h-8 w-8 text-primary" />
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        
        <Card className="overflow-hidden border-border shadow-lg">
          <div className="p-6">
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
