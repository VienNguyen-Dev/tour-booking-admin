"use server";
const { TOUR_COLLECTIONS_ID, DATABASE_ID, PRODUCT_COLLECTIONS_ID } = process.env;

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringfy } from "../utils";

export const getAllTours = async () => {
  try {
    const { database } = await createAdminClient();
    const tours = await database.listDocuments(DATABASE_ID!, TOUR_COLLECTIONS_ID!, [Query.orderDesc("$updatedAt")]);
    return parseStringfy(tours.documents);
  } catch (error) {
    console.log("Error while get all tour", error);
  }
};
