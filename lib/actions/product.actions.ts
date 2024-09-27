"use server";
const { PRODUCT_COLLECTIONS_ID, DATABASE_ID, APPWRITE_STORAGE_BUCKET_ID } = process.env;

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringfy } from "../utils";

export const createNewProduct = async (productData: NewProductParams) => {
  try {
    const { database } = await createAdminClient();
    const product = await database.createDocument(DATABASE_ID!, PRODUCT_COLLECTIONS_ID!, ID.unique(), productData);
    if (product) {
      return parseStringfy(product);
    } else {
      throw Error;
    }
  } catch (error) {
    console.log("Error while create a new product", error);
  }
};
