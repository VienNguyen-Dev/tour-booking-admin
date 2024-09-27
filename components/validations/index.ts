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

// export const partnerInfoSchema = z.object({
//   partnerName: z.string().min(3, { message: "Name must be at least 3 characters" }).max(50, { message: "Name must be at most 50 characters" }),
//   phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number must be at most 15 digits" }),
//   email: z.string().email({ message: "Please enter a valid email" }),
//   website: z.string().max(100, { message: "Website URL must be at most 100 characters" }).optional(),
//   pocEmail: z.string().email({ message: "Please enter a valid email" }).optional(), // Trường này là tùy chọn
//   pocPhone: z.string().min(10, { message: "POC phone number must be at least 10 digits" }).max(15, { message: "POC phone number must be at most 15 digits" }).optional(),
//   redeemInfo: z.string().max(300, { message: "Redeem info must be at most 300 characters" }).optional(),
//   product: z.object({
//     status: z.enum(["live", "close"], {
//       errorMap: () => ({ message: "Status must be 'live' or 'close'" }),
//     }),
//     type: z.enum(["staycation", "collection", "default"], {
//       errorMap: () => ({ message: "Type must be 'staycation', 'collection', or 'default'" }),
//     }),
//     partner: z.enum(["email", "phone", "website", "socialMedia"], {
//       errorMap: () => ({ message: "Partner must be one of 'email', 'phone', 'website', or 'socialMedia'" }),
//     }),
//     fieldType: z.enum(["number", "text"], {
//       errorMap: () => ({ message: "Field type must be 'number' or 'text'" }),
//     }),

//     // Tách riêng fieldName và value
//     fieldName: z.enum(["name", "price", "categories", "url", "eVoucher"]),
//     value: z.union([
//       z.object({
//         fieldName: z.literal("name"),
//         value: z.string().min(1, { message: "Name is required" }).max(50),
//       }),
//       z.object({
//         fieldName: z.literal("price"),
//         value: z.number().min(1, { message: "Price must be at greater 0" }).max(10000, { message: "Price must not be greater than 10000" }),
//       }),
//       z.object({
//         fieldName: z.literal("categories"),
//         value: z.array(z.string()).min(1, { message: "At least one category is required" }),
//       }),
//       z.object({
//         fieldName: z.literal("url"),
//         value: z.string().url({ message: "Invalid URL format" }),
//       }),
//       z.object({
//         fieldName: z.literal("eVoucher"),
//         value: z.string().min(1, { message: "eVoucher is required" }),
//       }),
//     ]),
//   }),
// });
