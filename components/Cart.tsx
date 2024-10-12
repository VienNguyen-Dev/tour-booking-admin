import { CartContext } from "@/app/context/CartContext";
import React, { useContext } from "react";

const Cart: React.FC = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((tour, index) => (
          <li key={index}>
            {tour.nameProduct} - {tour.typeProduct} - {tour.date} - {tour.price}$
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
