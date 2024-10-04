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
import { editPartnerSchema } from "@/components/validations";
import CustomFormField from "@/components/CustomFormField";
import { updatePartner } from "@/lib/actions/partner.actions";
import { Items } from "@/app/constants";

const EditPartnerForm = ({ partner, product }: { partner: Partner; product: Product }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [fields, setFields] = useState<string[]>([]);
  useEffect(() => {
    if (partner?.tags) {
      setFields(partner.tags);
    }
  }, [partner.tags]);
  const [field, setField] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isEditting, setIsEditting] = useState(false);
  const [updatedPartner, setUpdatedPartner] = useState(partner);
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<z.infer<typeof editPartnerSchema>>({
    resolver: zodResolver(editPartnerSchema),
    defaultValues: {
      redeemInfo: partner && partner.redeemInfo,
      email: partner && partner.email,
      phoneNumber: partner && partner.phone,
      website: partner && partner.website,
      pocEmail: partner && partner.pocEmail,
      address: partner && partner.payment,
      city: partner && partner.city,
      country: partner && partner.country,
      packageType: partner && partner.packageType,
      shippingOption: partner && partner.shippingOption,
      bookingType: partner && partner.bookingType,
      payment: partner ? partner.payment : "",
      notes: partner && partner.notes,
      fee: (partner && partner.fee) || 0,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof editPartnerSchema>) {
    const formData = new FormData();
    if (data.address) {
      formData.append("address", data.address || partner.address || "");
    }
    if (data.city) {
      formData.append("city", data.city || partner.city || "");
    }
    if (data.country) {
      formData.append("country", data.country || partner.country || "");
    }
    if (data.packageType) {
      formData.append("packageType", data.packageType || partner.packageType || "");
    }
    if (data.shippingOption) {
      formData.append("shippingOption", data.shippingOption || partner.shippingOption || "");
    }

    if (data.tags) {
      data.tags.forEach((tag) => {
        formData.append("tags[]", tag); // Thêm từng tag vào FormData
      });
    }
    if (data.bookingType) {
      formData.append("bookingType", data.bookingType || partner.bookingType || "");
    }
    if (data.payment) {
      formData.append("payment", data.payment || partner.payment || "");
    }
    if (data.redeemInfo) {
      formData.append("redeemInfo", data.redeemInfo || partner.redeemInfo || "");
    }
    if (data.notes) {
      formData.append("notes", data.notes || partner.notes || "");
    }
    if (data.redeemInfo) {
      formData.append("redeemInfo", data.redeemInfo || partner.redeemInfo || "");
    }
    if (data.email) {
      formData.append("email", data.email || partner.email || "");
    }
    if (data.phoneNumber) {
      formData.append("phoneNumber", data.phoneNumber || partner.phone || "");
    }
    if (data.email) {
      formData.append("email", data.email || partner.email || "");
    }
    if (data.fee) {
      formData.append("fee", String(data.fee) || String(partner.fee) || "0");
    }
    if (data.pocEmail) {
      formData.append("pocEmail", data.pocEmail || partner.pocEmail || "");
    }
    if (data.bookingType) {
      formData.append("bookingType", data.bookingType || partner.bookingType || "");
    }
    if (data.website) {
      formData.append("website", data.website || partner.website || "");
    }
    formData.append("partnerId", partner.$id || "");
    const partnerData = {
      ...updatedPartner,
      formData,
    };
    try {
      setIsSubmiting(true);
      const res = await updatePartner(partnerData);
      if (res) {
        setUpdatedPartner(res);
        // refreshUserList();
        toast({
          title: "Success",
          description: "Partner updated successfully",
          variant: "default",
        });
      } else {
        throw new Error(res.error || "An error occurred while updating partner");
      }
    } catch (error: any) {
      console.error("Update partner error:", error);
      toast({
        title: "Update partner Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmiting(false);
    }
  }

  useEffect(() => {
    const savedFields = localStorage.getItem("tags");
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
      localStorage.setItem("tags", JSON.stringify(updatedFields));
    }
  };

  const handleRemoveField = (field: string) => {
    const updatedFields = fields.filter((f) => f !== field);
    setFields(updatedFields);
    localStorage.setItem("tags", JSON.stringify(updatedFields));
  };

  //Handle archive
  const formRef = useRef<HTMLDivElement>(null);

  // Hàm xử lý Archive
  const handleArchive = async () => {
    const fileName = "Partner_Data.xlsx";
    let existingData: any[] = [];

    // Kiểm tra xem file đã tồn tại chưa
    try {
      const file = await fetch(fileName);
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets["Partner Info"];
      existingData = XLSX.utils.sheet_to_json(worksheet);
    } catch (error) {
      console.log("File does not exist, creating a new one.");
    }

    // Thêm dữ liệu mới của đối tác
    const newPartnerData = {
      ID: partner.$id,
      Partner_Name: partner.name,
      Phone: partner.phone,
      Email: partner.email,
      Website: partner.website,
      POCEmail: partner.pocEmail,
      POCPhone: partner.pocPhone,
      Redeem_steps: partner.redeemInfo,
      note: partner.notes,
      bookingType: partner.bookingType,
      payment: partner.payment,
      fee: partner.fee,
      Product_name: product?.name,
      Product_type: product?.type,
      Partner: product?.partner,
      Price: product?.price,
      Product_status: product?.status,
      Product_categories: product?.categories,
      Product_Url: product?.url,
      Product_Voucher: product?.eVoucher,
    };

    // Nối dữ liệu mới vào dữ liệu hiện có
    const updatedData = [...existingData, newPartnerData];

    // Tạo worksheet và workbook mới với tất cả dữ liệu
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(updatedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Partner Info");

    // Ghi lại file Excel
    XLSX.writeFile(workbook, fileName);

    console.log("Data has been archived successfully.");
  };

  const handleDelete = () => {
    localStorage.removeItem("fields");

    // Reset state về mặc định
    setFields([]); // Đặt lại danh sách các trường đã thêm

    // Reset form (nếu dùng react-hook-form)
    form.reset();
  };
  const items = Items("partner");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex xl:gap-8 gap-4 w-full" ref={formRef}>
          <div className="flex flex-col gap-5 w-full xl:min-w-[663px]">
            {/* Payment info */}
            <div
              className="rounded-xl bg-white w-full p-2 lg:p-5 flex flex-col lg:gap-6 gap-2 h-fit"
              style={{
                boxShadow: "0px 3px 12px 0px #2F2B3D24",
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[#014C46] font-bold text-sm xl:text-xl">Payment Info</h2>
                <div className=" p-1 lg:p-5 cursor-pointer">
                  {!isEditting ? (
                    <Image src={"/assets/icons/edit.png"} width={14} height={14} alt="edit-partner" onClick={() => setIsEditting(true)} />
                  ) : (
                    <Image src={"/assets/icons/square-check.svg"} width={14} height={14} alt="square-check" onClick={() => setIsEditting(false)} />
                  )}
                </div>
              </div>
              {isEditting ? (
                <>
                  <div className="flex sm:gap-6 flex-col sm:flex-row gap-2">
                    <CustomFormField name="address" label="Address" placeholder="PO Box 944881, Meadows 8 - Street 2 Villa 15" control={form.control} />
                    <CustomFormField name="city" label="City" placeholder="Dubai" control={form.control} />
                  </div>
                  <div className="flex sm:gap-6 flex-col sm:flex-row gap-2">
                    <CustomFormField name="country" label="Country" placeholder="Arab Emirates" control={form.control} />
                    <CustomFormField name="packageType" label="Package Type" placeholder="Gift" control={form.control} />
                  </div>
                  <div className="flex sm:gap-6 flex-col sm:flex-row gap-2">
                    <CustomFormField name="shippingOption" label="Shipping Option" placeholder="Standard" control={form.control} />
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 lg:gap-4">
                  {/* Address */}
                  <div className="flex gap-2 ">
                    <h3 className="text-[#014C46] font-bold text-sm 2xl:text-xl">Address</h3>
                    <p className="text-xs font-normal text-[#014C46] 2xl:text-lg capitalize">{partner.address}</p>
                  </div>
                  {/* City */}
                  <div className="flex gap-2 ">
                    <h3 className="text-[#014C46] font-bold text-sm 2xl:text-xl">City </h3>
                    <p className="text-xs font-normal text-[#014C46] 2xl:text-lg text-wrap">{partner.city}</p>
                  </div>
                  {/* Country */}
                  <div className="flex gap-2 ">
                    <h3 className="text-[#014C46] font-bold text-sm 2xl:text-xl">Country </h3>
                    <p className="text-xs font-normal text-[#014C46] 2xl:text-lg capitalize">{partner.country}</p>
                  </div>
                  {/* Pakage type */}
                  <div className="flex gap-2 ">
                    <h3 className="text-[#014C46] font-bold text-sm 2xl:text-xl">Package Type </h3>
                    <p className="text-xs font-normal text-[#014C46] 2xl:text-lg capitalize">{partner.packageType}</p>
                  </div>
                  {/* "Shipping" */}

                  <div className="flex gap-2 ">
                    <h3 className="text-[#014C46] font-bold text-sm 2xl:text-xl"> Shipping Option </h3>
                    <p className="text-xs font-normal text-[#014C46] 2xl:text-lg capitalize">{partner.shippingOption} Shipping</p>
                  </div>
                </div>
              )}
            </div>
            {/* Partner Adddition Info */}
            <div
              className="rounded-xl bg-white w-full p-5 flex flex-col gap-4 h-fit"
              style={{
                boxShadow: "0px 3px 12px 0px #2F2B3D24",
              }}
            >
              <h2 className="text-[#014C46] font-bold text-lg xl:text-xl">Partner Additional Info</h2>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
                {/* Tags and booking type and payment */}
                <div className="flex flex-col gap-4 max-w-[356px] w-full">
                  <div className="flex gap-2">
                    {/* CustomFormField để nhập tag */}
                    <CustomFormField name="tags" label="Tags" control={form.control} placeholder="Select a tag" onValueChange={handleFieldChange} />

                    <Button onClick={handleAddField} type="button" className="border mt-8 hover:bg-blue-300">
                      <Image src={"/assets/icons/plus.png"} alt="plus" width={24} height={24} className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Hiển thị danh sách các tag đã thêm */}
                  {fields && fields.length > 0 && (
                    <div className="border bg-[#06dcca] rounded-xl p-2 flex gap-1 flex-wrap overflow-hidden">
                      {fields.map((field: string, index: number) => {
                        return (
                          <div key={index} className="flex items-center justify-center border px-2 rounded-xl gap-2 border-[#014C46] text-white">
                            <span className=" capitalize text-white">{field}</span>
                            {/* Nút để xóa tag */}
                            <span className="cursor-pointer" onClick={() => handleRemoveField(field)}>
                              X
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <CustomFormField name="bookingType" label="Booking Type" control={form.control} placeholder="Select a booking type" />
                  <CustomFormField name="payment" label="Payment Terms" control={form.control} placeholder="Select a payment" />
                </div>
                {/* Redeem Steps and steps  */}
                <div className="flex flex-col gap-4 w-full">
                  <CustomFormField name="redeemInfo" label="Redeem Steps" control={form.control} placeholder="Provider for us some steps..." />
                  <CustomFormField name="notes" label="Notes" control={form.control} placeholder="Write some notes here..." />
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
          <div className="flex gap-4 flex-col w-full max-w-[300px]">
            <div className="flex flex-col gap-4 ">
              {items.map((item) => {
                const subtitleMap: { [key: string]: string } = {
                  "total orders": "2000",
                  "total redeems": "1000",
                  email: partner.email,
                  "contact no": partner.phone,
                  fee: (partner.fee ? partner.fee.toString()! : "0")!,
                  "poc contact": partner.pocEmail!,
                  website: partner.website!,
                };
                const placeholderMap: { [key: string]: string } = {
                  email: "example.@gmail.com",
                  "poc contact": "example.@gmail.com",
                  fee: "$123",
                  website: "https://domain.com",
                  "contact no": "(+971)8578493657",
                };
                const subtitle = subtitleMap[item.title];
                const placeholder = placeholderMap[item.title];
                return (
                  <>
                    <div
                      className=" md:w-full max-md:max-w-[300px] rounded-xl border p-2 flex gap-2 border-[#014C461A] bg-white items-center justify-between"
                      style={{
                        boxShadow: "0px 4px 4px 0px #00000040",
                      }}
                    >
                      <div className="flex gap-2 flex-col lg:flex-row">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-[10px] p-2 flex items-center justify-center bg-[#014C4633]">
                          <Image src={item.icon} alt={item.title} width={22} height={22} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-sm lg:text-[16px] font-bold text-[#014C46] capitalize">{item.title}</h2>
                          <p className={`${isEdit && "hidden"} text-xs`}>
                            {subtitle}
                            {`${item.title === "fee" ? "%" : ""}`}
                          </p>
                          {isEdit && editingField === item.title && item.title !== "total orders" && item.title !== "total redeems" && (
                            <CustomFormField name={item.title} control={form.control} placeholder={placeholder} />
                          )}
                        </div>
                      </div>

                      {item.title !== "total orders" &&
                        item.title !== "total redeems" &&
                        (isEdit && editingField === item.title ? (
                          <Image
                            onClick={() => {
                              setIsEdit(false), setEditingField(null);
                            }}
                            src={"/assets/icons/square-check.svg"}
                            alt={item.title}
                            width={16}
                            height={16}
                            className=" cursor-pointer hover:opacity-75"
                          />
                        ) : (
                          <Image
                            onClick={() => {
                              setIsEdit(true), setEditingField(item.title);
                            }}
                            src={"/assets/icons/edit.png"}
                            alt={item.title}
                            width={16}
                            height={16}
                            className=" cursor-pointer hover:opacity-75"
                          />
                        ))}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditPartnerForm;
