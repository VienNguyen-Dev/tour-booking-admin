"use client";
import React, { useState } from "react";
import { Control, FieldPath } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import * as z from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface CustomFormFieldProps<T extends z.ZodTypeAny> {
  control: Control<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  label?: string;
  placeholder?: string;
  type?: string;
}

const CustomFormField = <T extends z.ZodTypeAny>({ control, name, label, placeholder, type }: CustomFormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(true);
  const typeInput = name === "password" ? "password" : name === "email" ? "email" : "text";
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-form-label">{label}</FormLabel>
          <FormControl>
            {name !== "role" ? (
              <div className="relative">
                {name !== "phoneNumber" ? (
                  <Input
                    type={typeInput && (typeInput === "password" && showPassword ? "password" : "text")}
                    placeholder={placeholder}
                    {...field}
                    className={`${type === "auth" ? "input-class" : ""} `}
                  />
                ) : (
                  <PhoneInput inputStyle={{ width: "100%" }} placeholder="(+971) 5372948395" country={"ae"} value={field.value || ""} onChange={(value) => field.onChange(value || null)} />
                )}

                {name === "password" &&
                  (showPassword ? (
                    <Image onClick={() => setShowPassword(false)} src={"/assets/icons/eye.png"} alt="eye" className="absolute right-6 top-1 cursor-pointer" width={20} height={20} color="black" />
                  ) : (
                    <Image
                      onClick={() => setShowPassword(true)}
                      src={"/assets/icons/eye-hide.png"}
                      alt="eye-hide"
                      className="absolute right-6 top-2 cursor-pointer"
                      width={20}
                      height={20}
                      color="black"
                    />
                  ))}
              </div>
            ) : (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="superAdmin">Super admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </FormControl>
          <FormMessage className="text-error-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
