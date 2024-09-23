import { z } from "zod";

export const authSchema = (type: "sign-in" | "sign-up") => {
  return z.object({
    username: type === "sign-in" ? z.string().optional() : z.string().min(2).max(50),
    email: z.string().email("Please enter an email valid"),
    password: z.string().min(8, "Password at least 8 characters"),
    remember: type === "sign-up" ? z.boolean().optional() : z.boolean(),
  });
};

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter an email valid",
  }),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8).max(25),
  confirmPassword: z.string().min(8).max(25),
});

export const editProfileSchema = z.object({
  avatar: z.any().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  phoneNumber: z.string().optional().nullable(),
  username: z.string().min(3).max(25),
});

export const passwordRecoverySchema = z.object({
  password: z.string().min(8).max(25),
  confirmPassword: z.string().min(8).max(25),
});

export const addUserSchema = z.object({
  email: z.string().email("Please enter an email valid"),
  role: z.enum(["user", "admin", "superAdmin"], {
    message: "Please select a role",
  }),
});
