"use server";
const { PARTNER_COLLECTIONS_ID, DATABASE_ID } = process.env;

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringfy } from "../utils";

export const createNewPartner = async (partnerData: NewPartnerParams) => {
  try {
    const avatarUrl = `https://ui-avatars.com/api/?name=${partnerData.name!.charAt(0)}&background=random&color=fff`;
    const { database } = await createAdminClient();
    const existPartner = await database.listDocuments(DATABASE_ID!, PARTNER_COLLECTIONS_ID!, [Query.equal("email", partnerData.email) || Query.equal("pocEmail", partnerData.pocEmail!)]);
    if (existPartner.documents[0]) {
      throw new Error("Email or POC Email have been used with another account. Please try again.");
    }
    const newPartner = await database.createDocument(DATABASE_ID!, PARTNER_COLLECTIONS_ID!, ID.unique(), {
      ...partnerData,
      avatar: avatarUrl,
    });

    return parseStringfy(newPartner);
  } catch (error) {
    console.log("Error while ctrate a new partner", error);
  }
};

export const getAllPartners = async () => {
  try {
    const { database } = await createAdminClient();
    const partners = await database.listDocuments(DATABASE_ID!, PARTNER_COLLECTIONS_ID!);
    return parseStringfy(partners.documents);
  } catch (error) {
    console.log("Error while get all partners", error);
  }
};

export const getPartnerById = async (partnerId: string) => {
  try {
    const { database } = await createAdminClient();
    const partner = await database.listDocuments(DATABASE_ID!, PARTNER_COLLECTIONS_ID!, [Query.equal("$id", [partnerId])]);
    return parseStringfy(partner.documents[0]);
  } catch (error) {
    console.log("Error while get partner by Id", error);
  }
};

export const updatePartner = async ({ partnerId, updateData }: { partnerId: string; updateData: Partner }) => {
  try {
    const { database } = await createAdminClient();
    const updatedPartner = await database.updateDocument(DATABASE_ID!, PARTNER_COLLECTIONS_ID!, partnerId, updateData);
    return parseStringfy(updatedPartner);
  } catch (error) {
    console.log("Error while update partner", error);
  }
};
