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
import { Textarea } from "./ui/textarea";
import { convertToLoweCase } from "@/lib/utils";
import { SelectLabel } from "@radix-ui/react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns/addMonths";

interface CustomFormFieldProps<T extends z.ZodTypeAny> {
  control: Control<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  label?: string;
  placeholder?: string;
  type?: string;
  fieldType?: string;
  onValueChange?: (value: string) => void;
  dateRange?: [Date | null, Date | null];
  onDateRangeChange?: (dateRange: [Date | null, Date | null]) => void;
  partners?: { label: string; value: string }[];
}

const CustomFormField = <T extends z.ZodTypeAny>({ control, name, label, placeholder, type, fieldType, onValueChange, dateRange, onDateRangeChange, partners = [] }: CustomFormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(true);

  const typeInput = name === "password" ? "password" : name === "email" || name === "pocEmail" ? "email" : name === "price" ? "number" : "text";
  const items: string[] =
    name === "fieldType"
      ? ["Number", "Text", "File"]
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
      : name === "tags"
      ? ["Adventure", "Culture", "Sports", "Family", "Other", "Nature", "Historical"]
      : name === "payment"
      ? ["Daily", "Weekly", "Monthly"]
      : name === "shippingOption"
      ? ["Standard", "Express", "Same day", "Overnight"]
      : name === "bookingType"
      ? ["Instant", "Request", "Scheduled", "On-demand", "Pre-booking"]
      : name === "fieldVariant"
      ? ["Variant Price", "Description"]
      : name === "variantPrice"
      ? ["AE$", "USA$"]
      : name === "bookingField"
      ? ["bookingType"]
      : [];
  const nameValues = ["role", "status", "type", "partnerProduct", "fieldName", "fieldType", "variantPrice", "fieldVariant", "tags", "bookingType", "payment", "shippingOption", "bookingField"];
  const types = ["name", "categories", "eVoucher", "url", "price"];
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>(dateRange || [null, null]);

  const handleDateRangeChange = (range: [Date | null, Date | null]) => {
    setSelectedRange(range);
    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-form-label">{label}</FormLabel>
          <FormControl>
            {name === "dateRange" ? (
              <DatePicker
                selected={selectedRange[0]}
                onChange={(update: [Date | null, Date | null]) => handleDateRangeChange(update)}
                startDate={selectedRange[0]!}
                endDate={selectedRange[1]!}
                selectsRange
                selectsEnd
                selectsStart
                dateFormat="Pp"
                showDateSelect
                showIcon
                maxDate={addMonths(new Date(), 5)}
                showDisabledMonthNavigation
                minDate={new Date()}
                className="border border-gray-400 rounded-md w-full max-w-[300px] ml-2 p-4"
                placeholderText="Select date"
                // excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
                selectsDisabledDaysInRange
              />
            ) : !nameValues.includes(name) ? (
              <div className="relative">
                {name === "redeemInfo" || name === "notes" || name === "description" ? (
                  <Textarea placeholder={placeholder} {...field} />
                ) : name !== "phoneNumber" || types.includes(name) ? (
                  <Input
                    type={typeInput === "password" && showPassword ? "password" : typeInput}
                    min={name === "price" ? 0 : undefined}
                    step={name === "price" ? 0.1 : undefined}
                    max={name === "price" ? 10000 : undefined}
                    placeholder={placeholder}
                    {...field}
                    className={`${type === "auth" ? "input-class" : ""}`}
                    name={name}
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
                    {name !== "partnerProduct"
                      ? items.map((item: string, index: number) => (
                          <SelectItem key={index} value={convertToLoweCase(item)} className=" capitalize">
                            {item}
                          </SelectItem>
                        ))
                      : partners.map((partner, index) => (
                          <SelectItem key={index} value={partner.value} className=" capitalize">
                            {partner.label}
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
