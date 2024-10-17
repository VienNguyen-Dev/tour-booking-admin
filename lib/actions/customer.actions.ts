"use server";
const { CUSTOMER_COLLECTIONS_ID, DATABASE_ID, ORDER_COLLECTIONS_ID } = process.env;
import { Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringfy } from "../utils";

export const getAllCustomer = async () => {
  try {
    const { database } = await createAdminClient();
    const customers = await database.listDocuments(DATABASE_ID!, CUSTOMER_COLLECTIONS_ID!, [Query.orderDesc("$updatedAt")]);
    return parseStringfy(customers);
  } catch (error) {
    console.log("Error while get all customer", error);
  }
};

//Ý tưởng:
// User => tạo đơn hàng thành công => tạo order and customer => Problem: Create Order
//Customer List and customer order list
