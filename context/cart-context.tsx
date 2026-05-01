'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { MenuItem } from '@/types/types';

type CartItem = {
  product: MenuItem;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  updateQuantity: (product: MenuItem, quantity: number) => void;
  addToCart: (product: MenuItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: MenuItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const updateQuantity = useCallback((product: MenuItem, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.product.id === product.id ? { ...item, quantity } : item))
    );
  }, []);

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        updateQuantity,
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
