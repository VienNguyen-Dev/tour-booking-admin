"use client";
import React, { EventHandler, useState } from "react";
import { Control, FieldPath } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import * as z from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Textarea } from "./ui/textarea";
import { convertToLoweCase } from "@/lib/utils";
import { SelectLabel } from "@radix-ui/react-select";

interface CustomFormFieldProps<T extends z.ZodTypeAny> {
  control: Control<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  label?: string;
  placeholder?: string;
  type?: string;
  fieldType?: string;
  onValueChange?: (value: string) => void;
}

const CustomFormField = <T extends z.ZodTypeAny>({ control, name, label, placeholder, type, fieldType, onValueChange }: CustomFormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(true);
  const typeInput = name === "password" ? "password" : name === "email" || name === "pocEmail" ? "email" : name === "price" ? "number" : "text";
  const items: string[] =
    name === "fieldType"
      ? ["Number", "Text"]
      : name === "fieldName" && fieldType === "number"
      ? ["Price"]
      : name === "fieldName" && fieldType === "text"
      ? ["Name", "Categories", "Url", "E-Voucher"]
      : name === "status"
      ? ["Live", "Close"]
      : name === "type"
      ? ["Staycation", "Collection", "Default"]
      : name === "partner"
      ? ["Email", "Phone", "Website", "Social Media"]
      : name === "role"
      ? ["User", "Admin", "Super Admin"]
      : [];
  const nameValues = ["role", "status", "type", "partner", "fieldName", "fieldType"];
  const types = ["name", "categories", "eVoucher", "url", "price"];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-form-label">{label}</FormLabel>
          <FormControl>
            {!nameValues.includes(name) ? (
              <div className="relative">
                {name === "redeemInfo" ? (
                  <Textarea placeholder={placeholder} {...field} />
                ) : name !== "phoneNumber" || types.includes(name) ? (
                  <Input
                    type={typeInput || (typeInput && typeInput === "password" && showPassword ? "password" : "text")}
                    min={1}
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
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onValueChange) {
                    onValueChange(value);
                  }
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Select a value</SelectLabel>
                    {items.map((item: string, index: number) => (
                      <SelectItem key={index} value={convertToLoweCase(item)} className=" capitalize">
                        {item}
                      </SelectItem>
                    ))}
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
