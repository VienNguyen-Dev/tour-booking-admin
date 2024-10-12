"use server";
const { PRODUCT_COLLECTIONS_ID, DATABASE_ID, APPWRITE_STORAGE_BUCKET_ID } = process.env;

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringfy } from "../utils";

export const getAllProducts = async () => {
  try {
    const { database } = await createAdminClient();
    const products = await database.listDocuments(DATABASE_ID!, PRODUCT_COLLECTIONS_ID!, [Query.orderDesc("$updatedAt")]);
    return parseStringfy(products.documents);
  } catch (error) {
    console.log("Error while get all products", error);
  }
};

export const getProductById = async (productId: string) => {
  try {
    const { database } = await createAdminClient();
    const product = await database.listDocuments(DATABASE_ID!, PRODUCT_COLLECTIONS_ID!, [Query.equal("$id", [productId])]);
    return parseStringfy(product.documents[0]);
  } catch (error) {
    console.log("Error while get product by Id", error);
  }
};
