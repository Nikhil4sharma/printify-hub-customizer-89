
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import FormField from '@/components/auth/FormField';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for password reset
    try {
      // In a real app, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast({
        title: "Reset email sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (err) {
      toast({
        title: "Failed to send reset email",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Reset Your Password" 
      subtitle="Enter your email to receive a password reset link"
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            autoComplete="email"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
          
          <div className="text-center">
            <Link to="/login" className="text-primary hover:underline text-sm inline-flex items-center">
              <ArrowLeft className="mr-1 h-3 w-3" /> Back to login
            </Link>
          </div>
        </form>
      ) : (
        <div className="text-center py-4 space-y-4">
          <div className="bg-primary/10 text-primary rounded-full p-3 inline-flex items-center justify-center">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold">Check Your Email</h3>
          <p className="text-muted-foreground text-sm">
            We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="mt-4"
            >
              Try another email
            </Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or{' '}
            <button 
              className="text-primary hover:underline" 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              try again
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link to="/register" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
