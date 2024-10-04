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

export const partnerInfoSchema = z.object({
  partnerName: z.string().min(3, { message: "Name must be at least 3 characters" }).max(50, { message: "Name must be at most 50 characters" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number must be at most 15 digits" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  website: z.string().max(100, { message: "Website URL must be at most 100 characters" }).optional(),
  pocEmail: z.string().email({ message: "Please enter a valid email" }).optional(), // Trường này là tùy chọn
  pocPhone: z.string().min(10, { message: "POC phone number must be at least 10 digits" }).max(15, { message: "POC phone number must be at most 15 digits" }).optional(),
  redeemInfo: z.string().max(500, { message: "Redeem info must be at most 500 characters" }).optional(),

  status: z.string({ required_error: "Please select a status" }),
  type: z.string({ required_error: "Please select a type" }),
  partner: z.string({ required_error: "Please select a partner" }),
  fieldType: z.string({ required_error: "Please select a field type" }),

  // Tách riêng fieldName và value
  fieldName: z.string({ required_error: "Please select a field name" }),
  price: z.coerce.number().min(0, { message: "Price must be at least 0" }).max(1000, { message: "Price must be at most 1000" }),
  // .nonnegative("Price must be a positive number")
  // .refine((val) => !isNaN(val), { message: "Price must be a valid number" }),
  name: z.string().min(3).max(100),
  categories: z.string().min(3).max(25),
  url: z.string().url(),
  eVoucher: z.string().min(6).max(6),
});

export const editPartnerSchema = z.object({
  address: z.string().min(3, { message: "Address must be at least 3 characters" }).max(200, { message: "Name must be at most 200 characters" }).optional(),
  city: z.string().min(3, { message: "City must be at least 3 characters" }).max(25, { message: "City must be at most 25 characters" }).optional(),
  country: z.string().min(3, { message: "Country must be at least 3 characters" }).max(25, { message: "Country must be at most 25 characters" }).optional(),
  packageType: z.string().min(3, { message: "Package type must be at least 3 characters" }).max(25, { message: "Package type must be at most 25 characters" }).optional(),
  shippingOption: z.string({ required_error: "Please select a option" }).optional(),
  tags: z.array(z.string()).nonempty("You must select at least one tag").optional(),
  redeemInfo: z.string().max(500, { message: "Redeem info must be at most 500 characters" }).optional(),
  bookingType: z.string({ required_error: "Please select a booking type" }).optional(),
  payment: z.string({ required_error: "Please select a Payment Term" }).optional(),
  notes: z.string().max(300, { message: "Notes  must be at most 300 characters" }).optional(),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number must be at most 15 digits" }).optional(),
  website: z.string().max(100, { message: "Website URL must be at most 100 characters" }).optional(),
  pocEmail: z.string().email({ message: "Please enter a valid email" }).optional(),
  fee: z.coerce.number().min(0, { message: "Fee must be at least 0" }).max(100, { message: "Price must be at most 100" }).optional(),
});
