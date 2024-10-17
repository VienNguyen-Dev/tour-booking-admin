import { formatAmount } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

const Cart = () => {
  const router = useRouter();

  const { userId } = useParams();
  const { cart, updateTotalOrder } = useCart();
  const [deliveryOptions, setDeliveryOptions] = useState<{ [key: number]: string }>({});

  const handleOptionChange = (index: number, value: string) => {
    setDeliveryOptions({ ...deliveryOptions, [index]: value });
  };

  const getDeliveryFee = (optionValue: string) => {
    switch (optionValue) {
      case "express":
        return 3.99;
      case "same-day":
        return 9.99;
      case "overnight":
        return 15.9;
      default:
        return 0; // "standard" or any other case
    }
  };

  let totalPrice: number = 0;
  let totalFee: number = 0;

  cart.forEach((tour, index) => {
    totalPrice += tour.product.price;
    const optionValue = deliveryOptions[index] || "standard"; // Mặc định là "standard"
    totalFee += getDeliveryFee(optionValue);
  });
  const { removeFromCart } = useCart();
  const totalOrder = totalPrice + totalFee;

  useEffect(() => {
    // Cập nhật tổng đơn hàng vào Context mỗi khi giá trị thay đổi
    updateTotalOrder(totalOrder);
  }, [totalOrder]);

  const handleRemoveFromCart = (tourId: string) => {
    removeFromCart(tourId);
  };

  return (
    <div className="w-full h-fit text-black">
      <h2 className=" font-bold text-4xl text-[#014C46] mb-10">
        Your Cart - {cart.length} {cart.length > 1 ? "Items" : "Item"}
      </h2>
      <div className="flex gap-4">
        <div
          className="md:min-w-[700px] w-full flex-col justify-center items-center space-y-6 h-fit p-[22px] rounded-xl bg-white "
          style={{
            boxShadow: "0px 3px 12px 0px #2F2B3D24",
          }}
        >
          <ul className="flex flex-col gap-4">
            {cart.length === 0 ? (
              <div className=" text-xl font-semibold">No item in cart.</div>
            ) : (
              cart.map((tour, index) => {
                return (
                  <li key={index} className="flex gap-8">
                    <div className="flex flex-col gap-2">
                      <h2 className=" font-bold text-xl">{tour.product.name}</h2>
                      <img src={tour.image} width={200} height={200} alt={tour.product.name} className="rounded-sm" />
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-center">
                      <div className="flex gap-2">
                        <p className="font-semibold text-xl">{formatAmount(tour.product.price)}</p>
                        <select
                          className="border p-2 rounded-md"
                          name="option"
                          id="option"
                          value={deliveryOptions[index] || "standard"}
                          onChange={(event) => handleOptionChange(index, event.target.value)}
                        >
                          <option value="standard">Standard (9 days) - FREE</option>
                          <option value="express">Express (5 days) - $3.99</option>
                          <option value="same-day">Same-day (1 day) - $9.99</option>
                          <option value="overnight">Overnight (12 hours) - $15.90</option>
                        </select>
                        <Button variant={"outline"} className="hover:bg-red-500 font-bold bg-red-200" onClick={() => handleRemoveFromCart(tour.$id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div
          className="md:min-w-[300px] w-full flex-col justify-center items-center space-y-6 h-fit p-[22px] rounded-xl bg-white "
          style={{
            boxShadow: "0px 3px 12px 0px #2F2B3D24",
          }}
        >
          <h2 className=" font-bold text-xl ">Total Order: </h2>
          <p>Total price: {formatAmount(totalPrice)}</p>
          <p>Fee delivery: {formatAmount(totalFee)}</p>
          <p>Tax: 2%</p>
          <p className="font-bold">{formatAmount(totalOrder + totalOrder * 0.02)}</p>
          <Button
            disabled={cart.length === 0}
            variant={"outline"}
            className="hover:bg-blue-500 font-bold bg-blue-200"
            onClick={() => router.push(`/cart/${userId}/checkout?productId=${cart[0].product.$id}`)}
          >
            Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
