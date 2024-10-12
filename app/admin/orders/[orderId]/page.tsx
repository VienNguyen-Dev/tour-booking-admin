"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import OrderDetailForm from "@/components/OrderDetailForm";
import { getOrderById } from "@/lib/actions/order.actions";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({} as Order);
  // Write a function to handle server side to take order by orderId
  useEffect(() => {
    const fetchOrderById = async () => {
      const res = await getOrderById(orderId as string);
      if (res) setOrder(res);
    };
    fetchOrderById();
  }, [orderId]);

  return (
    <section className="flex flex-col w-full space-y-6 p-[22px]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg xl:text-xl font-bold  text-[#014C46]">{`Order List- ${orderId}`}</h2>
      </div>
      <OrderDetailForm order={order} pageType="order" />
    </section>
  );
};

export default OrderDetailPage;
