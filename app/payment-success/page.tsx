"use client";
import { createNewCustomer } from "@/lib/actions/customer.actions";
import { getOrderByCustomerId, updateOrderStatus } from "@/lib/actions/order.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";

export default function PaymentSuccess({ searchParams: { amount, redirect_status, orderId, userId } }: { searchParams: { amount: string; redirect_status: string; orderId: string; userId: string } }) {
  const [currentUser, setCurrentUser] = useState({} as User);
  const [orders, setOrders] = useState([] as Order[]);
  const [quantityOrder, setQuantityOrder] = useState(0);

  useEffect(() => {
    const fetchOrderByUserId = async () => {
      const { data, quantityOrder } = await getOrderByCustomerId(userId);
      const res = await getUserById(userId);
      setOrders(data);
      setQuantityOrder(quantityOrder);
      setCurrentUser(res);
    };
    fetchOrderByUserId();
  }, [userId]);

  const customerType = orders.length === 1 ? "first-time" : orders.length > 1 && orders.length <= 5 ? "repeated" : "loyalty";
  useEffect(() => {
    const handleUpdateOrderStatus = async () => {
      try {
        switch (redirect_status) {
          case "succeeded":
            // Cập nhật trạng thái đơn hàng thành 'received' theo orderId
            await updateOrderStatus({ orderId, status: "received" });
            console.log("Order updated to received");
            break;
          case "failed":
            await updateOrderStatus({ orderId, status: "failed" });
            console.log("Order updated to failed");
            break;
          case "canceled":
            await updateOrderStatus({ orderId, status: "canceled" });
            console.log("Order updated to canceled");
            break;
          case "refund":
            await updateOrderStatus({ orderId, status: "refunded" }); // Cập nhật trạng thái hoàn tiền
            console.log("Order updated to refunded");
            break;
          default:
            console.log("Unknown payment status");
            break;
        }
      } catch (error) {
        console.error("Error updating order status", error);
      }
    };

    // Gọi hàm khi redirect_status thay đổi
    if (redirect_status && orderId) {
      handleUpdateOrderStatus();
    }
  }, [redirect_status, orderId]);
  //
  let totalSpent = 0;
  orders.forEach((order) => {
    return (totalSpent += order.product.price);
  });
  const customerData = {
    name: currentUser.username,
    email: currentUser.email,
    quantityOrder: quantityOrder,
    contact: currentUser.phoneNumber,
    address: "",
    city: "",
    country: "",
    type: "standardPackage",
    shippingOption: "standard",
    customerType: customerType,
    loyaltyPoints: orders.length,
    totalSpent: totalSpent,
    orderId,
    avatar: currentUser.avatar,
  };
  useEffect(() => {
    const createCustomer = async () => {
      await createNewCustomer(customerData);
    };
    createCustomer();
  }, []);
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully Payment for this order</h2>
        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">${amount}</div>
      </div>
    </main>
  );
}
