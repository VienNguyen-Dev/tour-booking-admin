import React, { createContext, useState, ReactNode } from "react";

interface Tour {
  nameProduct: string;
  typeProduct: string;
  date: string;
  voucher?: string;
  price: number;
}

interface CartContextProps {
  cart: Tour[];
  addToCart: (tour: Tour) => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Tour[]>([]);

  const addToCart = (tour: Tour) => {
    setCart([...cart, tour]);
  };

  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
};
