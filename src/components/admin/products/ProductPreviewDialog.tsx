
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ImageIcon, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;
  
  const hasImages = product.images && product.images.length > 0;
  
  const handlePrevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images!.length - 1 : prev - 1
      );
    }
  };
  
  const handleNextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => 
        prev === product.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) setCurrentImageIndex(0);
      onOpenChange(newOpen);
    }}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Preview: {product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div>
            {hasImages ? (
              <div className="relative aspect-square rounded-md overflow-hidden border">
                <img 
                  src={product.images[currentImageIndex]} 
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1546422401-68b415cbf8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                {product.images.length > 1 && (
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full bg-background/80 backdrop-blur-sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full bg-background/80 backdrop-blur-sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square rounded-md bg-muted flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
              </div>
            )}
            
            {hasImages && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {product.images.map((image, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-md overflow-hidden border cursor-pointer ${i === currentImageIndex ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setCurrentImageIndex(i)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${i+1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1546422401-68b415cbf8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
                      }}
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
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div>
                  <p className="font-medium">Sizes:</p>
                  <p>{product.sizeOptions.join(', ')}</p>
                </div>
              )}
              
              {product.thicknessOptions && product.thicknessOptions.length > 0 && (
                <div>
                  <p className="font-medium">Paper Thickness:</p>
                  <p>{product.thicknessOptions.join(', ')}</p>
                </div>
              )}
              
              {product.orientationOptions && product.orientationOptions.length > 0 && (
                <div>
                  <p className="font-medium">Orientation:</p>
                  <p>{product.orientationOptions.join(', ')}</p>
                </div>
              )}
              
              {product.treatmentOptions && product.treatmentOptions.length > 0 && (
                <div>
                  <p className="font-medium">Treatment:</p>
                  <p>{product.treatmentOptions.join(', ')}</p>
                </div>
              )}
              
              {product.quantityOptions && product.quantityOptions.length > 0 && (
                <div>
                  <p className="font-medium">Quantities:</p>
                  <p>{product.quantityOptions.join(', ')}</p>
                </div>
              )}
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
