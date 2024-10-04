"use server";

import { cookies, headers } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { ID, OAuthProvider, Query } from "node-appwrite";
import { decryptPassword, encryptPassword, parseStringfy } from "../utils";
const { USER_COLLECTIONS_ID, DATABASE_ID, APPWRITE_STORAGE_BUCKET_ID } = process.env;
import { revalidatePath } from "next/cache";

//Create new User:
//1. Credential by email and password
//2. Oauth

export const getUserInfo = async (accountId: string) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(DATABASE_ID!, USER_COLLECTIONS_ID!, [Query.equal("accountId", [accountId])]);

    return parseStringfy(user.documents[0]);
  } catch (error) {
    console.log("Error while get user info", error);
  }
};
export async function createUser(userData: CreateNewAccountParams) {
  const { email, password, username, role } = userData;
  try {
    const { account, database } = await createAdminClient();
    const newAccount = await account.create(ID.unique(), email, password!, username);
    if (!newAccount) throw Error;
    const session = await account.createEmailPasswordSession(email, password!);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const avatarUrl = `https://ui-avatars.com/api/?name=${username!.charAt(0)}&background=random&color=fff`;

    const newUser = await database.createDocument(DATABASE_ID!, USER_COLLECTIONS_ID!, ID.unique(), {
      username,
      accountId: newAccount.$id,
      email,
      role,
      status: "active",
      avatar: avatarUrl,
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
    if (rememberMeValue === "true") {
      const userId = userInfo.$id;
      const user = await database.updateDocument(DATABASE_ID!, USER_COLLECTIONS_ID!, userId, { remember });
      if (!user) {
        console.log("Error while update user");
      }
      return parseStringfy(user);
    }

    return parseStringfy(userInfo);
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

///Oauth Provider
//1. Tao phuong thuc xac thuc bang Google bang cach tao oauth2Totken
//1.1 Neu thanhf cong thi no se chuyen den trang success => xu ly tiep oauth callback
//1.2 Neu that bai thi quay tro lai trang truoc do
export async function signUpWithGoogle() {
  try {
    const { account } = await createAdminClient();
    const origin = headers().get("origin");
    const redirectUrl = await account.createOAuth2Token(OAuthProvider.Google, `${origin}/api/oauth/callback/google`, `${origin}/sign-in`);
    return { url: redirectUrl };
  } catch (error) {
    console.log("Error while login with google", error);
  }
}

export const logout = async () => {
  try {
    const { account } = await createSessionClient();
    // const session = await cookies().get("apwrite-session");
    await account.deleteSession("current");
    cookies().delete("appwrite-session");
  } catch (error) {
    console.log("Error while log out", error);
  }
};

export const createPasswordRecovery = async (email: string) => {
  try {
    const { account } = await createSessionClient();
    const createRecover = await account.createRecovery(email, "http://localhost:3000/account/recovery");

    if (!createRecover) {
      throw new Error("Error while create a password recovery");
    }
    const secret = createRecover.secret;

    return parseStringfy(secret);
  } catch (error) {
    console.log("Error while create password recover", error);
  }
};

export const passwordRecover = async ({ userId, secret, password }: PasswordRecoveryParams) => {
  try {
    const { account } = await createSessionClient();
    const updaterePassword = await account.updateRecovery(userId, secret, password);
    if (!updaterePassword) throw new Error("Error while update new password");
    return parseStringfy(updaterePassword);
  } catch (error) {
    console.log("Error while password recover", error);
  }
};
export const forgotPassword = async (email: string) => {
  try {
    const { account } = await createAdminClient();
    const createRecover = await account.createRecovery(email, "http://localhost:3000/account/password-reset");
    if (!createRecover) {
      throw new Error("Error while create a password recovery");
    }
    const seret = createRecover.secret;
    return parseStringfy(seret);
  } catch (error) {
    console.log("Error while create password recover", error);
  }
};

export const passwordReset = async ({ userId, secret, password }: PasswordRecoveryParams) => {
  try {
    const { account } = await createAdminClient();
    const updaterePassword = await account.updateRecovery(userId, secret, password);
    if (!updaterePassword) throw new Error("Error while update new password");
    return parseStringfy(updaterePassword);
  } catch (error) {
    console.log("Error while password reset", error);
  }
};

export const getAllUsers = async () => {
  try {
    const { database } = await createAdminClient();
    const users = await database.listDocuments(DATABASE_ID!, USER_COLLECTIONS_ID!);
    return parseStringfy(users.documents);
  } catch (error) {
    console.log("Error while get all users", error);
  }
};

export const addUser = async ({ email, role }: { email: string; role: string }) => {
  try {
    const { database } = await createAdminClient();
    const existingUser = await database.listDocuments(DATABASE_ID!, USER_COLLECTIONS_ID!, [Query.equal("email", [email])]);
    if (existingUser.documents[0]) {
      throw new Error("This email allready. Please try again with another email");
    }
    const avatarUrl = `https://ui-avatars.com/api/?name=${email!.charAt(0)}&background=random&color=fff`;
    const newUser = await database.createDocument(DATABASE_ID!, USER_COLLECTIONS_ID!, ID.unique(), {
      email,
      username: email.slice(0, 3),
      role,
      status: "active",
      avatar: avatarUrl,
    });
    return parseStringfy(newUser);
  } catch (error) {
    console.log("Error while add user", error);
  }
};

export async function updateUser(userData: UserUpdateParams) {
  const { user, formData } = userData;
  try {
    const userId = formData.get("userId") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const role = formData.get("role") as string;
    let roleValue: string | undefined = role;
    if (!role) {
      roleValue = user?.role;
    }
    const username = formData.get("username") as string;
    let userValue = username;
    if (!username) {
      userValue = user?.username!;
    }
    const avatar = formData.get("avatar") as File | null;
    let avatarUrl: string | undefined;
    if (avatar) {
      //neu avatar thay doi
      // Handle avatar upload
      avatarUrl = await uploadAvatar(avatar);
    } else {
      avatarUrl = user?.avatar;
    }
    const { database } = await createAdminClient();
    const updatedUser = await database.updateDocument(DATABASE_ID!, USER_COLLECTIONS_ID!, userId, {
      ...user,
      avatar: avatarUrl,
      email,
      phoneNumber,
      role: roleValue,
      username: userValue,
    });

    revalidatePath("/users"); // Revalidate the users page

    return parseStringfy(updatedUser);
  } catch (error: any) {
    console.error("Server-side update user error:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}

async function uploadAvatar(avatar: File): Promise<string | undefined> {
  try {
    const { storage } = await createAdminClient();
    const file = await storage.createFile(APPWRITE_STORAGE_BUCKET_ID!, ID.unique(), avatar);

    // Construct the URL for the uploaded file
    const fileId = file.$id;
    const avatarUrl = `https://cloud.appwrite.io/v1/storage/buckets/${APPWRITE_STORAGE_BUCKET_ID}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;

    return avatarUrl;
  } catch (error) {
    console.log("Error while uploading avatar", error);
    return undefined;
  }
}
export async function blockUser({ userId, action }: BlockUserParams) {
  let status: string;
  if (action === "Block") {
    status = "block";
  } else {
    status = "active";
  }
  try {
    const { database } = await createAdminClient();
    const res = await database.updateDocument(DATABASE_ID!, USER_COLLECTIONS_ID!, userId, {
      status,
    });
    return parseStringfy(res);
  } catch (error) {
    console.log("Error while block user", error);
  }
}

export const getUserById = async (userId: string) => {
  try {
    const { database } = await createAdminClient();
    const user = await database.listDocuments(DATABASE_ID!, USER_COLLECTIONS_ID!, [Query.equal("$id", userId)]);
    return parseStringfy(user.documents);
  } catch (error) {
    console.log("Error while get user", error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { database } = await createAdminClient();
    await database.deleteDocument(DATABASE_ID!, USER_COLLECTIONS_ID!, userId);
  } catch (error) {
    console.log("Error while delete user", error);
  }
};

//moi User se co mot mang thong bao nhan duoc. Su kien duc truyen tu user den Admin va superAdmin va nguoc lai.
//Cu the khi user book tour => notification => admin va superADmin.
// Neu superAdmin nang hay ha vai tro cua user va Admin -> notification
//Xac nhan book => success=> notification
declare type CreateNotificationProps = {
  sender: User;
  title: string;
  content: string;
  receiver: User;
};
export const createNotification = async ({ sender, title, content, receiver }: CreateNotificationProps) => {
  try {
    const { database } = await createAdminClient();
    if (sender.role === "user") {
      if (receiver.role === "superAdmin" || receiver.role === "admin") {
        const user = await database.listDocuments(DATABASE_ID!, USER_COLLECTIONS_ID!, [Query.equal("$id", [receiver.$id])]);
        const existNotifications = user.documents[0].notifications;
        await database.updateDocument(DATABASE_ID!, USER_COLLECTIONS_ID!, receiver.$id, {
          notifications: [
            ...existNotifications,
            {
              sender,
              title,
              content,
            },
          ],
        });
      }
    } else if (sender.role === "superAdmin" || sender.role === "admin") {
      const user = await database.listDocuments(DATABASE_ID!, USER_COLLECTIONS_ID!, [Query.equal("$id", [receiver.$id])]);
      const existNotifications = user.documents[0].notifications;
      await database.updateDocument(DATABASE_ID!, USER_COLLECTIONS_ID!, receiver.$id, {
        notifications: [
          ...existNotifications,
          {
            sender,
            title,
            content,
          },
        ],
      });
    }
  } catch (error) {
    console.log("Error while create notification", error);
  }
};
