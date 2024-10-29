"use server";
const { PARTNER_COLLECTIONS_ID, DATABASE_ID, ORDER_COLLECTIONS_ID } = process.env;
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringfy } from "../utils";

export async function getData() {
  const data = [
    {
      orderId: "728ed52f1",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "default",
        price: 123,
      },

      status: "received",
    },
    {
      orderId: "728ed52f2",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "staycation",
        price: 123,
      },

      status: "booking",
    },
    {
      orderId: "728ed52f3",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "collection",
        price: 123,
      },

      status: "canceled",
    },
    {
      orderId: "728ed52f4",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Private Helicopter Tour Dubai",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "default",
        price: 123,
      },

      status: "processing",
    },
    {
      orderId: "728ed52f5",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "default",
        price: 123,
      },

      status: "received",
    },
    {
      orderId: "728ed52f6",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "staycation",
        price: 123,
      },

      status: "booking",
    },
    {
      orderId: "728ed52f7",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "collection",
        price: 123,
      },

      status: "canceled",
    },
    {
      orderId: "728ed52f8",
      date: new Date(Date.now()).toString(),
      customer: {
        name: "Vien",
        email: "vien@gmail.com",
        orderCount: 4,
        contact: "05894989333",
        shippingInfo: {
          address: "1234 Nguyen Anh Thu",
          city: "Ho CHi Minh",
          country: "VN",
          packageType: "Gift",
          shippingOption: "standard",
        },
      },
      product: {
        name: "Muong Thanh Hotel",
        status: "live",
        categories: "SPA",
        partner: {
          name: "Teo",
          email: "teo@gmail.com",
          phone: "0943974857",
        },
        type: "default",
        price: 123,
      },

      status: "processing",
    },
    // ...
  ];
  return data;
}

export const createNewOrder = async (orderData: CreateNewOrderParams) => {
  try {
    const { database } = await createAdminClient();
    const newOrder = await database.createDocument(DATABASE_ID!, ORDER_COLLECTIONS_ID!, ID.unique(), orderData);
    return parseStringfy(newOrder);
  } catch (error) {
    console.log("Error while create a new order", error);
  }
};

export const getAllOrders = async () => {
  try {
    const { database } = await createAdminClient();
    const orders = await database.listDocuments(DATABASE_ID!, ORDER_COLLECTIONS_ID!, [Query.orderDesc("$createdAt")]);

    return parseStringfy(orders.documents);
  } catch (error) {
    console.log("Error while get all orders", error);
  }
};

declare type UpdateOrderStatusParams = {
  orderId: string;
  status: string;
};
export const updateOrderStatus = async ({ orderId, status }: UpdateOrderStatusParams) => {
  try {
    const { database } = await createAdminClient();
    const result = await database.updateDocument(DATABASE_ID!, ORDER_COLLECTIONS_ID!, orderId, {
      status,
    });
    return parseStringfy(result);
  } catch (error) {
    console.log("Error while update order status", error);
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const { database } = await createAdminClient();
    const order = await database.listDocuments(DATABASE_ID!, ORDER_COLLECTIONS_ID!, [Query.equal("$id", [orderId])]);

    if (!order) throw Error;
    return parseStringfy(order);
  } catch (error) {
    console.log("Error while get order by Id", error);
  }
};

export const getOrderByCustomerId = async (customerId: string) => {
  try {
    const { database } = await createAdminClient();
    const orders = await database.listDocuments(DATABASE_ID!, ORDER_COLLECTIONS_ID!, [Query.equal("customer", [customerId])]);
    return parseStringfy({
      data: orders.documents,
      quantityOrder: orders.documents.length,
    });
  } catch (error) {
    console.log("Error while get all orders by Id", error);
  }
};

export const getOrderByProductId = async (productId: string) => {
  try {
    const { database } = await createAdminClient();
    const order = await database.listDocuments(DATABASE_ID!, ORDER_COLLECTIONS_ID!, [Query.equal("product", [productId])]);
    console.log(order.documents[0]);
    return parseStringfy(order.documents[0]);
  } catch (error) {
    console.log("Error while get order by product id", error);
  }
};

export const getAllOrderByStatus = async () => {
  try {
    const { database } = await createAdminClient();
    const orderByStatus = await database.listDocuments(DATABASE_ID!, ORDER_COLLECTIONS_ID!, [Query.equal("status", ["received"])]);
    return parseStringfy(orderByStatus.documents);
  } catch (error) {
    console.log("Error while get all order by status", error);
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const { database } = await createAdminClient();
    await database.deleteDocument(DATABASE_ID!, ORDER_COLLECTIONS_ID!, orderId);
  } catch (error) {
    console.log("Error while delete this order", error);
  }
};
