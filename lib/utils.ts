import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseStringfy(value: any) {
  return JSON.parse(JSON.stringify(value));
}

export function encryptPassword(password: string) {
  // Sử dụng một phương pháp mã hóa đơn giản (ví dụ Base64) hoặc thư viện mã hóa
  return btoa(password); // Base64 encoding
}

export function decryptPassword(encryptedPassword: string) {
  return atob(encryptedPassword); // Base64 decoding
}
