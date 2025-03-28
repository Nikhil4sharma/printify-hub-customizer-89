
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { ProfileForm } from '@/components/Admin/ProfileForm';
import { PasswordChangeSection } from '@/components/Admin/PasswordChangeSection';

const AdminProfile = () => {
  return (
    <div className="container max-w-4xl">
      <div className="flex flex-col gap-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your admin account settings
          </p>
        </div>
        
        <ProfileForm />
        <PasswordChangeSection />
      </div>
    </div>
  );
};

export default AdminProfile;
