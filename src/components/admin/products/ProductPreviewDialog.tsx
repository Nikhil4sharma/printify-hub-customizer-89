
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ImagePlus, IndianRupee } from 'lucide-react';

interface Product {
  name: string;
  price?: string;
  category?: string;
  images?: string[];
  sizeOptions?: string[];
  thicknessOptions?: string[];
  orientationOptions?: string[];
  treatmentOptions?: string[];
  quantityOptions?: number[];
}

interface ProductPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

const ProductPreviewDialog: React.FC<ProductPreviewDialogProps> = ({ open, onOpenChange, product }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Preview: {product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div>
            {product.images && product.images.length > 0 ? (
              <div className="aspect-square rounded-md overflow-hidden border">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-md bg-muted flex items-center justify-center">
                <ImagePlus className="h-16 w-16 text-muted-foreground/50" />
              </div>
            )}
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {product.images.map((image, i) => (
                  <div key={i} className="aspect-square rounded-md overflow-hidden border">
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${i+1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            
            <div className="flex items-center">
              <IndianRupee className="h-5 w-5 mr-1 text-foreground" />
              <span className="text-2xl font-bold">{product.price?.replace('₹', '')}</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Category: {product.category}
            </p>
            
            <h3 className="font-medium mt-2">Available Options</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Sizes:</p>
                <p>{product.sizeOptions?.join(', ')}</p>
              </div>
              
              <div>
                <p className="font-medium">Paper Thickness:</p>
                <p>{product.thicknessOptions?.join(', ')}</p>
              </div>
              
              <div>
                <p className="font-medium">Orientation:</p>
                <p>{product.orientationOptions?.join(', ')}</p>
              </div>
              
              <div>
                <p className="font-medium">Treatment:</p>
                <p>{product.treatmentOptions?.join(', ')}</p>
              </div>
              
              <div>
                <p className="font-medium">Quantities:</p>
                <p>{product.quantityOptions?.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button>Close Preview</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPreviewDialog;
