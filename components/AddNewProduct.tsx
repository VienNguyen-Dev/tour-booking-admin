"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/hooks/use-toast";
import { productSchema } from "@/components/validations";
import CustomFormField from "@/components/CustomFormField";
import { convertToUpperCase } from "@/lib/utils";
import { createNewProduct, getAllPartners } from "@/lib/actions/partner.actions";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Input } from "./ui/input";

const AddNewProduct = ({ onClose, refreshUserList }: { onClose: () => void; refreshUserList: () => void }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [fieldType, setFieldType] = useState("");
  const [fields, setFields] = useState<string[]>([]);
  const [field, setField] = useState("");
  const [product, setProduct] = useState({} as Product);
  const [partners, setPartners] = useState([] as Partner[]);
  const [partnerId, setPartnerId] = useState("");

  useEffect(() => {
    const fetchPartner = async () => {
      const res = await getAllPartners();
      setPartners(res);
    };
    fetchPartner();
  }, []);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: "",
      type: "",
      fieldType: "",
      fieldName: "",
      price: 0,
      name: "",
      categories: "",
      url: "",
      eVoucher: "",
      avatar: "",
      partnerProduct: "",
    },
  });

  console.log(form.formState.errors);
  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof productSchema>) {
    const formData = new FormData();
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("categories", JSON.stringify(data.categories));
    formData.append("url", data.url);
    formData.append("eVoucher", data.eVoucher.toString());
    formData.append("status", data.status);
    formData.append("type", data.type);
    try {
      setIsSubmiting(true);

      formData.append("partnerId", partnerId);

      const newProduct = await createNewProduct(formData);

      if (newProduct) {
        setProduct(newProduct);
        toast({
          title: "Success",
          description: "Product created successfully",
          variant: "default",
        });
        refreshUserList();
        form.reset();
      } else {
        toast({
          title: "Error while creating a new product",
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
    const savedFields = localStorage.getItem("productFields");
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
      localStorage.setItem("productFields", JSON.stringify(updatedFields));
    }
  };

  const handleRemoveField = (field: string) => {
    const updatedFields = fields.filter((f) => f !== field);
    setFields(updatedFields);
    localStorage.setItem("productFields", JSON.stringify(updatedFields));
  };

  const handleValueChange = (value: string) => {
    setFieldType(value);
  };
  const handleChangePartner = (id: string) => {
    setPartnerId(id);
  };
  return (
    <div className="xl:max-w-[400px] h-fit">
      <Sheet open={true} onOpenChange={onClose}>
        <SheetContent side={"right"} className="flex flex-col border-none rounded-xl bg-white gap-2 w-full mt-16 mr-12 overflow-y-auto pb-10">
          <SheetHeader className="flex items-center justify-center border-b p-2 border-gradient-custom">
            <SheetTitle className="text-[#014C46] text-lg font-bold h-[30px]">{`Product List > Add New Product`}</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div
                className="md:min-w-[300px] w-full flex-col justify-center items-center space-y-2 h-fit p-[22px] rounded-xl bg-white "
                style={{
                  boxShadow: "0px 3px 12px 0px #2F2B3D24",
                }}
              >
                <h2 className="text-[#014C46] font-bold text-[24px]">Product Info</h2>
                <CustomFormField name="status" label="Product Status" control={form.control} placeholder="Select a product status" />
                <CustomFormField name="type" label="Product Type" control={form.control} placeholder="Select a product type" />
                <CustomFormField name="fieldType" label="Field Type" control={form.control} placeholder="Select a field type" onValueChange={handleValueChange} />
                <div className="flex gap-6 ">
                  <CustomFormField fieldType={fieldType} name="fieldName" label="Field Name" control={form.control} placeholder="Select a field name" onValueChange={handleFieldChange} />
                  <Button onClick={handleAddField} type="button" className=" border mt-8 hover:bg-blue-300">
                    <Image src={"/assets/icons/plus.png"} alt="plus" width={24} height={24} className="w-6 h-6" />
                  </Button>
                </div>
                {fields.length > 0 &&
                  fields.map((field: string, index) => {
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
                      <div className="flex gap-6 " key={index}>
                        <CustomFormField name={fieldName} label={convertToUpperCase(field)} control={form.control} placeholder={placeholder} />

                        <Button onClick={() => handleRemoveField(field)} type="button" className=" border mt-8 hover:bg-red-300">
                          <Image src={"/assets/icons/delete.png"} alt="delete" width={24} height={24} className="w-6 h-6" />
                        </Button>
                      </div>
                    );
                  })}
                <CustomFormField
                  name="partnerProduct"
                  label="Parner"
                  control={form.control}
                  placeholder="Select a partner product"
                  onValueChange={handleChangePartner}
                  partners={partners.map((partner) => ({ label: partner.partnerProduct, value: partner.$id }))}
                />
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field: { value, onChange, ref, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel className="text-form-label">Picture</FormLabel>
                      <FormControl>
                        <div className="flex justify-center items-center ">
                          <Input
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files && event.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                // reader.onloadend = () => {
                                //   setPreviewImage(reader.result as string);
                                // };
                                reader.readAsDataURL(file);
                                onChange(file);
                              }
                            }}
                            type="file"
                            {...fieldProps}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-error-message" />
                    </FormItem>
                  )}
                />
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

export default AddNewProduct;
