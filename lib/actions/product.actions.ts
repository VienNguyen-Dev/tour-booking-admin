"use server";
const { PRODUCT_COLLECTIONS_ID, DATABASE_ID } = process.env;

import { Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringfy } from "../utils";
import { updatePartner } from "./partner.actions";

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
    const product = await database.listDocuments(DATABASE_ID!, PRODUCT_COLLECTIONS_ID!, [Query.equal("$id", productId)]);
    return parseStringfy(product.documents[0]);
  } catch (error) {
    console.log("Error while get product by Id", error);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const { database } = await createAdminClient();
    await database.deleteDocument(DATABASE_ID!, PRODUCT_COLLECTIONS_ID!, productId);
  } catch (error) {
    console.log("Error while delete this product", error);
  }
};

export const updateProduct = async (updateProductData: EditProductDataParams) => {
  const { formData, product, productId } = updateProductData;
  try {
    const { database } = await createAdminClient();

    const variantPrice = formData.get("variantPrice") as string;
    const bookingType = formData.get("bookingType") as string;
    const status = formData.get("status") as string;
    let statusValue: string = status;
    if (!status) {
      statusValue = product?.status!;
    }
    const partnerProduct = formData.get("partnerProduct") as string;
    let partnerProductValue: string = partnerProduct;
    if (!partnerProduct) {
      partnerProductValue = product?.partnerId.partnerProduct!;
    }
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    let typeValue: string = type;
    if (!type) {
      typeValue = product?.type!;
    }
    const updatedProduct = await database.updateDocument(DATABASE_ID!, PRODUCT_COLLECTIONS_ID!, productId, {
      ...product,

      variantPrice,
      bookingType,
      status: statusValue,
      description,
      type: typeValue,
    });
    if (!updatedProduct) throw Error;
    return parseStringfy(updatedProduct);
  } catch (error) {
    console.log("Error while updating product", error);
  }
};
