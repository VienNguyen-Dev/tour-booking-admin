"use server";

import { cookies, headers } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { ID, OAuthProvider, Query } from "node-appwrite";
import { decryptPassword, encryptPassword, parseStringfy } from "../utils";
import { redirect } from "next/navigation";
const { NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT, USER_COLLECTIONS_ID, DATABASE_ID, NEXT_APPWRITE_KEY } = process.env;

//Create new User:
//1. Credential by email and password
//2. Oauth

export async function createUser(userData: CreateNewAccountParams) {
  const { email, password, username } = userData;
  try {
    const { account, database } = await createAdminClient();
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw Error;
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const newUser = await database.createDocument(DATABASE_ID!, USER_COLLECTIONS_ID!, ID.unique(), {
      username,
      accountId: newAccount.$id,
      email,
    });
    return parseStringfy(newUser);
  } catch (error) {
    console.log(error, "Error while create user");
  }
}
export const rememberMe = async ({ email, password, remember }: SignInParams) => {
  try {
    if (remember) {
      cookies().set("rememberMe", "true", { path: "/" });
      cookies().set("email", email, { path: "/" });
      cookies().set("password", encryptPassword(password), { path: "/" }); //Can phai ma hoa truoc khi luu vao côokie
    } else {
      cookies().delete("rememberMe");
      cookies().delete("email");
      cookies().delete("password");
    }
  } catch (error) {
    console.log(error);
  }
};
export async function login({ email, password, remember }: SignInParams) {
  try {
    const { account, database } = await createAdminClient();
    const rememberMeValue = cookies().get("rememberMe")?.value;

    if (remember) {
      await rememberMe({ email, password, remember });
    }
    if (rememberMeValue === "true") {
      email = cookies().get("email")?.value!;
      password = decryptPassword(cookies().get("password")?.value!);
      remember = true;
    }
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    const userInfo = await getUserInfo(session.userId);
    const userId = userInfo[0].$id;
    const user = await database.updateDocument(DATABASE_ID!, USER_COLLECTIONS_ID!, userId, { remember });
    if (!user) {
      console.log("Error while update user");
    }
    return parseStringfy(user);
  } catch (error) {
    console.log(error, "Error while you are try login your account");
  }
}

export async function autoLogin() {
  try {
    const rememberMeCookie = cookies().get("rememberMe")?.value;
    if (rememberMeCookie === "true") {
      const email = cookies().get("email")?.value!;
      const encryptedPassword = cookies().get("password")?.value!;
      const password = decryptPassword(encryptedPassword);

      // Gọi hàm login với thông tin từ cookie
      const response = await login({ email, password, remember: true });
      return parseStringfy(response);
    }
  } catch (error) {
    console.log("Error while trying to auto login", error);
  }
}
// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    const userInfo = await getUserInfo(user.$id);
    return parseStringfy(userInfo);
  } catch (error) {
    return null;
  }
}

export const getUserInfo = async (accountId: string) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(DATABASE_ID!, USER_COLLECTIONS_ID!, [Query.equal("accountId", [accountId])]);

    return parseStringfy(user.documents);
  } catch (error) {
    console.log("Error while get user info", error);
  }
};

///Oauth Provider
//1. Tao phuong thuc xac thuc bang Google bang cach tao oauth2Totken
//1.1 Neu thanhf cong thi no se chuyen den trang success => xu ly tiep oauth callback
//1.2 Neu that bai thi quay tro lai trang truoc do
export async function signUpWithGogole() {
  const { account } = await createAdminClient();
  const origin = headers().get("origin");
  const redirectUrl = await account.createOAuth2Token(OAuthProvider.Google, `${origin}/oauth`, `${origin}/signup`);
  return redirect(redirectUrl);
}
