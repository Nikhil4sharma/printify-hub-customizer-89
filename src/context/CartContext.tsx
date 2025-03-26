
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CustomizationOptions {
  size: string;
  orientation: 'Horizontal' | 'Vertical';
  material: string;
  addons: string[];
  quantity?: number;
  designFile?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customization: CustomizationOptions;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  hasItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem('cart');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    // Check if item with same product ID and exact same customization already exists
    const existingItemIndex = items.findIndex(
      (i) => 
        i.productId === item.productId && 
        i.customization.size === item.customization.size &&
        i.customization.orientation === item.customization.orientation &&
        i.customization.material === item.customization.material &&
        JSON.stringify(i.customization.addons.sort()) === JSON.stringify(item.customization.addons.sort()) &&
        i.customization.quantity === item.customization.quantity
    );

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setItems(updatedItems);
    } else {
      // Add new item with unique ID
      const newItem: CartItem = {
        ...item,
        id: Math.random().toString(36).substring(2, 11),
      };
      setItems([...items, newItem]);
    }
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const hasItems = items.length > 0;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        hasItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
