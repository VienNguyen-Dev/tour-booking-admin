import { z } from "zod";

export const authSchema = (type: "sign-in" | "sign-up") => {
  return z.object({
    username: type === "sign-in" ? z.string().optional() : z.string().min(2).max(50),
    email: z.string().email("Please enter an email valid"),
    password: z.string().min(8, "Password at least 8 characters"),
    remember: type === "sign-up" ? z.boolean().optional() : z.boolean(),
  });
};
