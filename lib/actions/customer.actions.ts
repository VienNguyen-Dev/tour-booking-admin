"use server";
const { CUSTOMER_COLLECTIONS_ID, DATABASE_ID, ORDER_COLLECTIONS_ID } = process.env;
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringfy } from "../utils";

export const getAllCustomer = async () => {
  try {
    const { database } = await createAdminClient();
    const customers = await database.listDocuments(DATABASE_ID!, CUSTOMER_COLLECTIONS_ID!, [Query.orderDesc("$updatedAt")]);
    return parseStringfy(customers.documents);
  } catch (error) {
    console.log("Error while get all customer", error);
  }
};

//Ý tưởng:
// User => tạo đơn hàng thành công => tạo order and customer => Problem: Create Order.
//Customer List and customer order list

export const createNewCustomer = async (customerData: CreateNewCustomerParams) => {
  try {
    const { database } = await createAdminClient();
    const newCustomer = await database.createDocument(DATABASE_ID!, CUSTOMER_COLLECTIONS_ID!, ID.unique(), customerData);
    return parseStringfy(newCustomer);
  } catch (error) {
    console.log("Error while create new customer", error);
  }
};

export const deleteCustomer = async (customerId: string) => {
  try {
    const { database } = await createAdminClient();
    await database.deleteDocument(DATABASE_ID!, CUSTOMER_COLLECTIONS_ID!, customerId);
  } catch (error) {
    console.log("Error while delete this customer", error);
  }
};
