import { createAdminClient } from "@/lib/appwrite.config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return NextResponse.redirect("/sign-in?error=Invalid OAuth response");
  }

  try {
    const { account, database, user } = await createAdminClient();

    // Create a session for the user
    const session = await account.createSession(userId, secret);

    // Check if the user already exists in your database
    const existingUser = await database.listDocuments(process.env.DATABASE_ID!, process.env.USER_COLLECTIONS_ID!, [Query.equal("accountId", [userId])]);

    if (existingUser.total === 0) {
      // If user doesn't exist, fetch user info from Appwrite
      const userInfo = await user.get(userId);
      const avatarUrl = `https://ui-avatars.com/api/?name=${userInfo.name.charAt(0)}&background=random&color=fff`;
      // Create a new user document if it doesn't exist
      await database.createDocument(process.env.DATABASE_ID!, process.env.USER_COLLECTIONS_ID!, ID.unique(), {
        username: userInfo.name,
        accountId: userInfo.$id,
        email: userInfo.email,
        role: "user",
        status: "active",
        avatar: avatarUrl,
      });
    }

    // Set the session cookie
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.redirect(`${request.nextUrl.origin}/admin/redeems-exchanges`);
  } catch (error) {
    console.error("Error in Google OAuth callback:", error);
    return NextResponse.redirect("/sign-in?error=Authentication failed");
  }
}
