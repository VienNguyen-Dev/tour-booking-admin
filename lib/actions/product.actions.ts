"use server";
const { PRODUCT_COLLECTIONS_ID, DATABASE_ID, APPWRITE_STORAGE_BUCKET_ID } = process.env;

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringfy } from "../utils";
