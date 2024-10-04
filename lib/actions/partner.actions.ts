"use server";
const { PARTNER_COLLECTIONS_ID, DATABASE_ID, PRODUCT_COLLECTIONS_ID } = process.env;

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringfy } from "../utils";

export const getProduct = async (partnerId: string) => {
  try {
    const { database } = await createAdminClient();
    const product = await database.listDocuments(DATABASE_ID!, PRODUCT_COLLECTIONS_ID!, [Query.equal("partnerId", [partnerId])]);
    if (!product) throw Error;
    return parseStringfy(product.documents[0]);
  } catch (error) {
    console.log("Error while get product by partner Id", error);
  }
};

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

export const createNewProduct = async (product: NewProductParams) => {
  const { partnerId, productData } = product;
  try {
    const { database } = await createAdminClient();
    const product = await database.createDocument(DATABASE_ID!, PRODUCT_COLLECTIONS_ID!, ID.unique(), {
      ...productData,
      partnerId,
    });
    if (product) {
      return parseStringfy(product);
    } else {
      throw Error;
    }
  } catch (error) {
    console.log("Error while create a new product", error);
  }
};
export const getAllPartners = async () => {
  try {
    const { database } = await createAdminClient();
    const partners = await database.listDocuments(DATABASE_ID!, PARTNER_COLLECTIONS_ID!, [Query.orderDesc("$updatedAt")]);
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

export const updatePartner = async (updateData: UpdatePartnerParams) => {
  const { partner, formData } = updateData;
  const partnerId = formData.get("partnerId") as string;
  const address = formData.get("address") as string;
  let addressValue = address;
  if (!address) {
    addressValue = partner?.address!;
  }
  const city = formData.get("city") as string;
  let cityValue = city;
  if (!city) {
    cityValue = partner?.city!;
  }
  const country = formData.get("country") as string;
  let countryValue = country;
  if (!country) {
    countryValue = partner?.country!;
  }

  const packageType = formData.get("packageType") as string;
  let packageTypeValue = packageType;
  if (!packageType) {
    packageTypeValue = partner?.packageType!;
  }
  const shippingOption = formData.get("shippingOption") as string;
  let shippingOptionValue = shippingOption;
  if (!shippingOption) {
    shippingOptionValue = partner?.shippingOption!;
  }
  const tags = formData.getAll("tags") as string[];
  let tagsValue: string[] = tags;
  if (!tags) {
    tagsValue = partner?.tags!;
  }
  const bookingType = formData.get("bookingType") as string;
  let bookingTypeValue = bookingType;
  if (!bookingType) {
    bookingTypeValue = partner?.bookingType!;
  }
  const payment = formData.get("payment") as string;
  let paymentValue = payment;
  if (!payment) {
    paymentValue = partner?.payment!;
  }
  const redeemInfo = formData.get("redeemInfo") as string;
  let redeemInfoValue = redeemInfo;
  if (!redeemInfo) {
    redeemInfoValue = partner?.redeemInfo!;
  }
  const notes = formData.get("notes") as string;
  const email = formData.get("email") as string;
  let emailValue = email;
  if (!email) {
    emailValue = partner?.email!;
  }
  const phoneNumber = formData.get("phoneNumber") as string;
  let phoneNumberValue = phoneNumber;
  if (!phoneNumber) {
    phoneNumberValue = partner?.phone!;
  }
  const fee = Number(formData.get("fee"));
  let feeValue = fee;
  if (!fee) {
    feeValue = partner?.fee!;
  }
  const pocEmail = formData.get("pocEmail") as string;
  let pocEmailValue = pocEmail;
  if (!pocEmail) {
    pocEmailValue = partner?.pocEmail!;
  }
  const website = formData.get("website") as string;
  let websiteValue = website;
  if (!website) {
    websiteValue = partner?.website!;
  }
  try {
    const { database } = await createAdminClient();
    const updatedPartner = await database.updateDocument(DATABASE_ID!, PARTNER_COLLECTIONS_ID!, partnerId, {
      ...partner,
      address: addressValue,
      city: cityValue,
      country: countryValue,
      packageType: packageTypeValue,
      shippingOption: shippingOptionValue,
      bookingType: bookingTypeValue,
      tags: tagsValue,
      payment: paymentValue,
      redeemInfo: redeemInfoValue,
      email: emailValue,
      phoneNumber: phoneNumberValue,
      fee: feeValue,
      notes,
      pocEmail: pocEmailValue,
      website: websiteValue,
    });
    if (!updatedPartner) {
      throw Error;
    }
    console.log(updatedPartner);
    return parseStringfy(updatedPartner);
  } catch (error) {
    console.log("Error while update partner", error);
  }
};

export const deletePartner = async (partnerId: string) => {
  try {
    const { database } = await createAdminClient();
    await database.deleteDocument(DATABASE_ID!, PARTNER_COLLECTIONS_ID!, partnerId);
  } catch (error) {
    console.log("Error while delete this partner", error);
  }
};
