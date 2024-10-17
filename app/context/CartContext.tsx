"use client";
import { Tour } from "@/components/BookingCard";
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface CartContextProps {
  cart: Tour[];
  addToCart: (tour: Tour) => void;
  removeFromCart: (id: string) => void;
  totalOrder: number;
  updateTotalOrder: (total: number) => void;
  resetCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  totalOrder: 0,
  updateTotalOrder: () => {},
  resetCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Tour[]>([]);
  const [totalOrder, setTotalOrder] = useState<number>(0);
  //Khi add hoac remove => tu dong cap nhat gio hang
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  // Cập nhật localStorage mỗi khi giỏ hàng thay đổi
  const addToCart = (tour: Tour) => {
    const updatedCart = [...cart, tour];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.$id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const updateTotalOrder = (newTotal: number) => {
    setTotalOrder(newTotal);
  };
  const resetCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalOrder, updateTotalOrder, resetCart }}>{children}</CartContext.Provider>;
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
