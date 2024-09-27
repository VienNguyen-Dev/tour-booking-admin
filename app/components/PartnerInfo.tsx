"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/hooks/use-toast";
import * as XLSX from "xlsx";

// import { partnerInfoSchema } from "@/components/validations";
import CustomFormField from "@/components/CustomFormField";
import { convertToLoweCase, convertToUpperCase } from "@/lib/utils";
import { createNewPartner } from "@/lib/actions/partner.actions";
import { createNewProduct } from "@/lib/actions/product.actions";
export const partnerInfoSchema = z.object({
  partnerName: z.string().min(3, { message: "Name must be at least 3 characters" }).max(50, { message: "Name must be at most 50 characters" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number must be at most 15 digits" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  website: z.string().max(100, { message: "Website URL must be at most 100 characters" }).optional(),
  pocEmail: z.string().email({ message: "Please enter a valid email" }).optional(), // Trường này là tùy chọn
  pocPhone: z.string().min(10, { message: "POC phone number must be at least 10 digits" }).max(15, { message: "POC phone number must be at most 15 digits" }).optional(),
  redeemInfo: z.string().max(300, { message: "Redeem info must be at most 300 characters" }).optional(),

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
  eVoucher: z.string().min(3).max(6),
});
const PartnerInfo = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [fieldType, setFieldType] = useState("");
  const [fields, setFields] = useState<string[]>([]);
  console.log(fields);
  const [field, setField] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partner, setPartner] = useState<Partner>({} as Partner);

  const form = useForm<z.infer<typeof partnerInfoSchema>>({
    resolver: zodResolver(partnerInfoSchema),
    defaultValues: {
      partnerName: "",
      phoneNumber: "",
      email: "",
      website: "",
      pocEmail: "",
      pocPhone: "",
      redeemInfo: "",
      price: 0,
    },
  });
  console.log(form.formState.errors);
  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof partnerInfoSchema>) {
    console.log("start");
    const partnerData = {
      tags: ["adventure"],
      type: data.partner,
      payment: "monthly",
      redeemInfo: data.redeemInfo,
      rating: 5,
      name: data.partnerName,
      email: data.email,
      phone: data.phoneNumber,
      website: data.website,
      pocEmail: data.pocEmail,
      pocPhone: data.pocPhone,
    };

    const productData = {
      name: data.name,
      price: data.price,
      categories: data.categories,
      url: data.url,
      eVoucher: data.eVoucher,
      status: data.status,
      type: data.type,
    } as Product;
    try {
      setIsSubmiting(true);
      const newPartner = await createNewPartner(partnerData);
      if (newPartner) {
        toast({
          title: "Success",
          description: "Partner created successfully",
          variant: "default",
        });
        setPartner(newPartner);
        form.reset();
      } else if (!newPartner) {
        toast({
          title: "Error while create a new partner",
          description: "Please try again.",
          variant: "destructive",
        });
      }

      const newProduct = await createNewProduct(productData);
      if (newProduct) {
        toast({
          title: "Success",
          description: "Product created successfully",
          variant: "default",
        });
        form.reset();
      } else if (!newProduct) {
        toast({
          title: "Error while create a new product",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmiting(false);
    }
  }

  // click button => add field
  useEffect(() => {
    const savedFields = localStorage.getItem("fields");
    if (savedFields) {
      setFields(JSON.parse(savedFields));
    }
  }, []);
  const handleFieldChange = (value: string) => {
    setField(value);
  };
  const handleAddField = () => {
    if (!fields.includes(field)) {
      const updatedFields = [...fields, field];
      setFields(updatedFields);
      localStorage.setItem("fields", JSON.stringify(updatedFields));
    }
  };

  const handleRemoveField = (field: string) => {
    const updatedFields = fields.filter((f) => f !== field);
    setFields(updatedFields);
    localStorage.setItem("fields", JSON.stringify(updatedFields));
  };

  const handleValueChange = (value: string) => {
    setFieldType(value);
  };
  //Handle archive
  const formRef = useRef<HTMLDivElement>(null);
  const handleArchive = async () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([
      {
        ID: partner.$id,
        Partner_Name: partner.name,
        Phone: partner.phone,
        Email: partner.email,
        Website: partner.website,
        POCEmail: partner.pocEmail,
        POCPhone: partner.pocPhone,
        Redeem_steps: partner.redeemInfo,
        Product_name: partner.product?.name,
        Product_type: partner.product?.type,
        Partner: partner.product?.partner,
        Price: partner.product?.price,
        Product_status: partner.product?.status,
        Product_categories: partner.product?.categories,
        Product_Url: partner.product?.url,
        Product_Voucher: partner.product?.eVoucher,

        // Add any other user properties you want to include
      },
    ]);

    XLSX.utils.book_append_sheet(workbook, worksheet, "User Info");
    XLSX.writeFile(workbook, `${partner.name}_info.xlsx`);
  };

  const handleDelete = () => {
    localStorage.removeItem("fields");

    // Reset state về mặc định
    setFields([]); // Đặt lại danh sách các trường đã thêm

    // Reset form (nếu dùng react-hook-form)
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-4 justify-between w-full" ref={formRef}>
          {/* Partner info */}

          <div className="flex flex-col gap-5 w-full xl:max-w-[853px]">
            <div
              className="rounded-xl bg-white w-full p-5 flex flex-col gap-6 h-fit"
              style={{
                boxShadow: "0px 3px 12px 0px #2F2B3D24",
              }}
            >
              <h2 className="text-[#014C46] font-bold text-lg xl:text-xl">Partner Additional Info</h2>
              <div className="flex gap-6">
                <CustomFormField name="partnerName" label="Name" placeholder="Johan Stevenson" control={form.control} />
                <CustomFormField name="phoneNumber" label="Phone" placeholder="(+971) 58479365746" control={form.control} />
              </div>
              <div className="flex gap-6">
                <CustomFormField name="email" label="Email" placeholder="example@gmail.com" control={form.control} />
                <CustomFormField name="website" label="Website" placeholder="tourbooking.com" control={form.control} />
              </div>
              <div className="flex gap-6">
                <CustomFormField name="pocEmail" label="POC Email" placeholder="example@gmail.com" control={form.control} />
                <CustomFormField name="pocPhone" label="POC Phone" placeholder="(+971) 87495486385" control={form.control} />
              </div>
            </div>
            <div
              className="rounded-xl bg-white w-full p-5 flex flex-col gap-4 h-fit"
              style={{
                boxShadow: "0px 3px 12px 0px #2F2B3D24",
              }}
            >
              <h2 className="text-[#014C46] font-bold text-lg xl:text-xl">Redeem Info</h2>
              <CustomFormField name="redeemInfo" label="Redeem Steps" control={form.control} />
            </div>
            <div className="flex gap-4 justify-end">
              <Button onClick={handleArchive} className="flex gap-1 h-10 py-2 px-5 rounded-[4px]  border border-[#0D062D1A] cursor-pointer text-sm font-medium items-center hover:bg-orange-200">
                <Image src={"/assets/icons/archive-user-info.png"} width={20} height={20} alt="archive" />
                Archive
              </Button>
              {/* This is delete content  */}
              <Button onClick={handleDelete} className="flex gap-1 h-10 py-2 px-5 rounded-[4px] border border-[#0D062D1A] cursor-pointer text-sm font-medium items-center hover:bg-red-400">
                <Image src={"/assets/icons/delete.png"} width={20} height={20} alt="archive" />
                Delete
              </Button>
            </div>
          </div>
          {/* Product info */}
          {/* 1. chon field type
          2. chon field name
          2.1. Voi moi filed name => CustomFormField
          2.2. Cai nao chon roi thi remove khoi select
          2.3 lay gia tri cua cac truong filed type va field name
          */}
          <div
            className=" rounded-xl flex flex-col gap-5 w-full xl:max-w-[500px] p-5 h-fit"
            style={{
              boxShadow: "0px 3px 12px 0px #2F2B3D24",
            }}
          >
            <h2 className="text-[#014C46] font-bold text-lg xl:text-xl">Product Info</h2>
            <CustomFormField name="status" label="Product Status" control={form.control} placeholder="Select a product status" />
            <CustomFormField name="type" label="Product Type" control={form.control} placeholder="Select a product type" />
            <CustomFormField name="partner" label="Partners" control={form.control} placeholder="Select a partner type" />
            <CustomFormField name="fieldType" label="Field Type" control={form.control} placeholder="Select a field type" onValueChange={handleValueChange} />
            <div className="flex gap-6 ">
              <CustomFormField fieldType={fieldType} name="fieldName" label="Field Name" control={form.control} placeholder="Select a field name" onValueChange={handleFieldChange} />

              <Button onClick={handleAddField} type="button" className=" border mt-8 hover:bg-blue-300">
                <Image src={"/assets/icons/plus.png"} alt="plus" width={24} height={24} className="w-6 h-6" />
              </Button>
            </div>
            {fields.length > 0 &&
              fields.map((field: string) => {
                const fieldName = field === "e-Voucher" ? "eVoucher" : field;
                const placeholder =
                  field === "e-Voucher"
                    ? "DUBAITOUR2024"
                    : field === "price"
                    ? "$200.00"
                    : field === "categories"
                    ? "SPA"
                    : field === "url"
                    ? "https://hotelcheaper.com"
                    : field === "name"
                    ? "Dubai Hotel"
                    : "";
                return (
                  <div className="flex gap-6 ">
                    <CustomFormField name={fieldName} label={convertToUpperCase(field)} control={form.control} placeholder={placeholder} />
                    <Button onClick={() => handleRemoveField(field)} type="button" className=" border mt-8 hover:bg-red-300">
                      <Image src={"/assets/icons/delete.png"} alt="delete" width={24} height={24} className="w-6 h-6" />
                    </Button>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" className="flex gap-1 h-10 py-2 px-5 rounded-[4px]  border border-[#0D062D1A] cursor-pointer text-sm font-medium  hover:bg-blue-500/20 ">
            {isSubmiting ? (
              <>
                <Loader2 className=" animate-spin mr-2" />
                Loading...
              </>
            ) : (
              <>
                <Image src={"/assets/icons/Check.png"} width={20} height={20} alt="Check" />
                Submit
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PartnerInfo;
