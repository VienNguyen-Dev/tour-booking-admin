"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/hooks/use-toast";
import { editProductSchema } from "@/components/validations";
import CustomFormField from "@/components/CustomFormField";
import { convertToUpperCase } from "@/lib/utils";
import { getAllPartners } from "@/lib/actions/partner.actions";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Items } from "@/app/constants";
import CardItem from "./CardItem";
import { updateProduct } from "@/lib/actions/product.actions";

const EditProduct = ({ onClose, product, refreshUserList }: { onClose: () => void; refreshUserList: () => void; product?: Product }) => {
  const [bookingFields, setBookingFields] = useState<string[]>([]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [fields, setFields] = useState<string[]>([]);
  const [field, setField] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState(product as Product);
  const [partners, setPartners] = useState([] as Partner[]);
  const [partnerId, setPartnerId] = useState("");

  useEffect(() => {
    const fetchPartner = async () => {
      const res = await getAllPartners();
      setPartners(res);
    };
    fetchPartner();
  }, []);

  const form = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      status: updatedProduct?.status,
      type: updatedProduct?.type,
      fieldType: "Select a field type",
      fieldName: "Select a field name",
      variantPrice: updatedProduct?.variantPrice,
      bookingType: updatedProduct?.bookingType,
      avatar: updatedProduct?.avatar,
      partnerProduct: updatedProduct?.partnerId.partnerProduct,
      description: updatedProduct?.description,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof editProductSchema>) {
    const formData = new FormData();
    formData.append("variantPrice", data.variantPrice.toString());
    formData.append("bookingType", data.bookingType);
    formData.append("partnerProduct", data.partnerProduct);
    formData.append("status", data.status);
    formData.append("description", data.description!);
    formData.append("type", data.type);
    try {
      setIsSubmiting(true);
      const updateProductData = {
        ...updatedProduct,
        productId: product?.$id!,
        formData,
      };
      const result = await updateProduct(updateProductData);

      if (result) {
        setUpdatedProduct(result);
        toast({
          title: "Success",
          description: "Product updated successfully",
          variant: "default",
        });
        refreshUserList();
        onClose();
      } else {
        toast({
          title: "Error while updating product",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmiting(false);
    }
  }

  // click button => add field
  useEffect(() => {
    const savedFields = localStorage.getItem("bookingFields");
    if (savedFields) {
      setBookingFields(JSON.parse(savedFields));
    }
  }, []);
  // click button => add field
  useEffect(() => {
    const savedFields = localStorage.getItem("fieldVariant");
    if (savedFields) {
      setFields(JSON.parse(savedFields));
    }
  }, []);
  const handleFieldChange = (value: string) => {
    setField(value);
  };
  const handleAddField = () => {
    if (!fields.includes(field)) {
      const updatedFields = [...fields, field.replace(/\s+/g, "")];
      setFields(updatedFields);
      localStorage.setItem("fieldVariant", JSON.stringify(updatedFields));
    }
  };

  //Handle add booking field
  useEffect(() => {
    const savedBookingFields = localStorage.getItem("bookingFields");
    if (savedBookingFields) {
      setBookingFields(JSON.parse(savedBookingFields));
    }
  }, []);

  const handleAddBookingField = () => {
    if (!fields.includes(field)) {
      const updatedFields = [...bookingFields, field];
      setBookingFields(updatedFields);
      localStorage.setItem("bookingFields", JSON.stringify(updatedFields));
    }
  };
  const handleRemoveBookingField = (field: string) => {
    const updatedFields = bookingFields.filter((f) => f !== field);
    setBookingFields(updatedFields);
    localStorage.setItem("bookingFields", JSON.stringify(updatedFields));
  };

  const handleRemoveField = (field: string) => {
    const updatedFields = fields.filter((f) => f !== field);
    setFields(updatedFields);
    localStorage.setItem("fieldVariant", JSON.stringify(updatedFields));
  };

  const handleChangePartner = (id: string) => {
    setPartnerId(id);
  };

  const items = Items("product");
  return (
    <div className="xl:max-w-[400px] h-fit">
      <Sheet open={true} onOpenChange={onClose}>
        <SheetContent side={"right"} className="flex flex-col border-none rounded-xl bg-white gap-2 w-full mt-16 mr-12 overflow-y-auto pb-10">
          <SheetHeader className="flex items-center justify-center border-b p-2 border-gradient-custom">
            <SheetTitle className="text-[#014C46] text-lg font-bold h-[30px]">{`Product List > ${product?.name.slice(0, 6)}... > Edit`}</SheetTitle>
          </SheetHeader>
          {items.map((item, index) => {
            let subtitle: any;
            switch (item.title) {
              case "category":
                subtitle = product?.categories!;
                break;
              case "partners":
                subtitle = product?.partnerId.partnerProduct!;
                break;
              case "price":
                subtitle = product?.price;
                break;
              case "url":
                subtitle = product?.url!;
                break;
              case "e voucher":
                subtitle = product?.eVoucher!;
                break;
              default:
                subtitle = "";
                break;
            }
            return <CardItem key={index} title={item.title} icon={item.icon} subtitle={subtitle!} pageType="product" />;
          })}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {/* Product info */}
              <div
                className="md:min-w-[300px] w-full flex-col gap-4 justify-center items-center space-y-2 h-fit p-[22px] rounded-xl bg-white "
                style={{
                  boxShadow: "0px 3px 12px 0px #2F2B3D24",
                }}
              >
                <h2 className="text-[#014C46] font-bold text-[24px]">Product Info</h2>
                <CustomFormField name="status" label="Product Status" control={form.control} placeholder="Select a product status" />
                <CustomFormField name="type" label="Product Type" control={form.control} placeholder="Select a product type" />
                <CustomFormField
                  name="partnerProduct"
                  label="Parner"
                  control={form.control}
                  placeholder="Select a partner product"
                  onValueChange={handleChangePartner}
                  partners={partners.map((partner) => ({ label: partner.partnerProduct, value: partner.$id }))}
                />
              </div>
              {/* Variant Field */}
              <div
                className="md:min-w-[300px] w-full flex-col justify-center items-center space-y-2 h-fit p-[22px] rounded-xl bg-white "
                style={{
                  boxShadow: "0px 3px 12px 0px #2F2B3D24",
                }}
              >
                <h2 className="text-[#014C46] font-bold text-[24px]">Product Variants</h2>
                <div className="flex gap-1">
                  <CustomFormField name="fieldVariant" label="Variant Name" control={form.control} placeholder="Select a variant name" onValueChange={handleFieldChange} />
                  <Button onClick={handleAddField} type="button" className=" border mt-8 hover:bg-blue-300">
                    <Image src={"/assets/icons/plus.png"} alt="plus" width={24} height={24} className="w-6 h-6" />
                  </Button>
                </div>
                {fields.length > 0 &&
                  fields.map((field: string, index) => {
                    field === "variant Price" ? field.split(" ") : field;
                    const placeholder = field === "variantPrice" ? "AE$, USA$" : field === "description" ? "Description" : "";
                    return (
                      <div className="flex gap-6 " key={index}>
                        <CustomFormField name={field} label={convertToUpperCase(field)} control={form.control} placeholder={placeholder} />
                        <Button onClick={() => handleRemoveField(field)} type="button" className=" border mt-8 hover:bg-red-300">
                          <Image src={"/assets/icons/delete.png"} alt="delete" width={24} height={24} className="w-6 h-6" />
                        </Button>
                      </div>
                    );
                  })}
              </div>
              {/* Booking Field */}
              <div
                className="md:min-w-[300px] w-full flex-col justify-center items-center space-y-2 h-fit p-[22px] rounded-xl bg-white "
                style={{
                  boxShadow: "0px 3px 12px 0px #2F2B3D24",
                }}
              >
                <h2 className="text-[#014C46] font-bold text-[24px]">Bookings Fields</h2>
                <div className="flex gap-1">
                  <CustomFormField name="bookingField" label="Booking Field" control={form.control} placeholder="Select a booking field" onValueChange={handleFieldChange} />
                  <Button onClick={handleAddBookingField} type="button" className=" border mt-8 hover:bg-blue-300">
                    <Image src={"/assets/icons/plus.png"} alt="plus" width={24} height={24} className="w-6 h-6" />
                  </Button>
                </div>
                {bookingFields.length > 0 &&
                  bookingFields.map((field: string, index) => {
                    const placeholder = field === "bookingType" ? "Type..." : "";
                    return (
                      <div className="flex gap-6 " key={index}>
                        <CustomFormField name={field} label={convertToUpperCase(field)} control={form.control} placeholder={placeholder} />
                        <Button onClick={() => handleRemoveBookingField(field)} type="button" className=" border mt-8 hover:bg-red-300">
                          <Image src={"/assets/icons/delete.png"} alt="delete" width={24} height={24} className="w-6 h-6" />
                        </Button>
                      </div>
                    );
                  })}
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="flex gap-1 h-10 py-2 px-5 rounded-[4px]   border border-[#0D062D1A] cursor-pointer text-sm font-medium  hover:bg-blue-500/20 ">
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditProduct;
