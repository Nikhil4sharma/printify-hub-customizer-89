
import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MoonIcon, SunIcon } from "lucide-react";

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
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        
        <div className="bg-card shadow-lg rounded-lg border border-border p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
