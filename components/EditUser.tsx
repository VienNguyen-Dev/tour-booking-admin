"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import "react-phone-input-2/lib/style.css";
import * as XLSX from "xlsx";
import React, { useRef, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import PhoneInput from "react-phone-input-2";
import PasswordRecover from "./PasswordRecover";
import { Loader2 } from "lucide-react";
import { toast } from "./hooks/use-toast";
import { updateUser } from "@/lib/actions/user.actions";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const formSchema = z.object({
  avatar: z.any().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  phoneNumber: z.string().optional().nullable(),
  role: z.string().optional(),
});
const EditUser = ({ user, onClose, onUserUpdate, refreshUserList }: { user?: User; onClose: () => void; onUserUpdate: (updatedUser: User) => void; refreshUserList: () => void }) => {
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [updatedUser, setUpdatedUser] = useState(user);
  const [previewImage, setPreviewImage] = useState(user?.avatar);
  const [isPasswordrecoverOpen, setIsPasswordrecoverOpen] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: updatedUser?.avatar,
      email: updatedUser?.email,
      phoneNumber: updatedUser?.phoneNumber,
      role: updatedUser?.role,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    //1. lay du lieu tu client => cu va moi
    //2. chuyen du lieu cua avatar tu lieu file sang string
    //3. Update
    const formData = new FormData();
    if (data.email) {
      formData.append("email", data.email || user?.email || "");
    }
    if (data.phoneNumber) {
      formData.append("phoneNumber", data.phoneNumber || user?.phoneNumber || "");
    }
    if (data.role) {
      formData.append("role", data.role || user?.role || "");
    }

    formData.append("userId", user?.$id || "");

    // Handle avatar
    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }
    //   // If previewImage has changed but is not a File object
    //   formData.append("avatar", previewImage || "");
    // } else {
    //   // If no changes, use the original avatar
    //   formData.append("avatar", user?.avatar || "");
    // }
    const userData = {
      ...updatedUser,
      formData,
    };
    try {
      setIsSubmiting(true);
      const res = await updateUser(userData);
      if (res) {
        setUpdatedUser(res);
        onUserUpdate(res);
        onClose();
        refreshUserList();
        toast({
          title: "Success",
          description: "User updated successfully",
          variant: "default",
        });
      } else {
        throw new Error(res.error || "An error occurred while updating user");
      }
    } catch (error: any) {
      console.error("Update user error:", error);
      toast({
        title: "Update user Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmiting(false);
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handlePasswordRecover = () => {
    setIsPasswordrecoverOpen(true);
  };

  const handleArchive = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([
      {
        ID: updatedUser?.$id,
        Name: updatedUser?.username,
        Email: updatedUser?.email,
        Role: updatedUser?.role,
        Phone: updatedUser?.phoneNumber,
        // Add any other user properties you want to include
      },
    ]);

    XLSX.utils.book_append_sheet(workbook, worksheet, "User Info");
    XLSX.writeFile(workbook, `${updatedUser?.username}_info.xlsx`);
  };
  return (
    <div className="xl:max-w-[400px] xl:max-h-[718px] ">
      <Sheet open={true} onOpenChange={onClose}>
        <SheetContent side={"right"} className="flex flex-col border-none rounded-xl bg-white gap-6  w-full p-5 mt-16 mr-12">
          <SheetHeader className="flex items-center justify-center border-b p-2 border-gradient-custom">
            <SheetTitle className="text-[#014C46] text-[16px]  font-bold h-[30px]">{`Users List > ${user?.username} > Edit User`}</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div
                className="md:min-w-[300px] w-full flex-col justify-center items-center space-y-6 h-fit p-[22px] rounded-xl bg-white "
                style={{
                  boxShadow: "0px 3px 12px 0px #2F2B3D24",
                }}
              >
                <h2 className="text-[#014C46] font-bold text-[16px]">Contact Info</h2>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field: { value, onChange, ref, ...fieldProps } }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-center items-center ">
                          <div onClick={handleAvatarClick} className=" xl:w-[100px] xl:h-[100px] 2xl:w-[80px] 2xl:h-[80px] relative overflow-hidden rounded-full cursor-pointer">
                            <img src={previewImage} alt={user?.username} width={80} height={80} className=" cursor-pointer rounded-full object-cover w-20 h-20" />

                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <p className="text-white text-xs text-center">Click to change</p>
                            </div>
                          </div>
                          <Input
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files && event.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setPreviewImage(reader.result as string);
                                };
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

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-[#014C46] text-sm">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage className="text-error-message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-[#014C46] text-sm">Permission</FormLabel>
                      <FormControl>
                        <Select defaultValue={updatedUser?.role} onValueChange={field.onChange}>
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
                      </FormControl>
                      <FormMessage className="text-error-message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-[#014C46] text-sm">Phone</FormLabel>
                      <FormControl>
                        <PhoneInput inputStyle={{ width: "100%" }} placeholder="(+971) 5372948395" country={"ae"} value={field.value || ""} onChange={(value) => field.onChange(value || null)} />
                      </FormControl>
                      <FormMessage className="text-error-message" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    disabled={isSubmiting}
                    type="submit"
                    className="flex gap-1 h-10 py-2 px-5 rounded-[4px]   border border-[#0D062D1A] cursor-pointer text-sm font-medium  hover:bg-blue-500/20 "
                  >
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
            </form>
          </Form>
          <div className="flex flex-col justify-end items-end gap-4 w-full">
            <Button
              type="button"
              onClick={handlePasswordRecover}
              className="flex gap-1 h-10 py-2 px-5 rounded-[4px]   border border-[#0D062D1A] cursor-pointer text-sm font-medium  hover:bg-purple-500/20"
            >
              <Image src={"/assets/icons/password-recover.png"} width={20} height={20} alt="password-recover" />
              Password Recover
            </Button>
          </div>
          {isPasswordrecoverOpen && <PasswordRecover userId={user?.$id!} email={user?.email!} onClose={() => setIsPasswordrecoverOpen(false)} />}
          <div className="flex gap-2">
            <Button onClick={handleArchive} type="button" className="flex gap-1 h-10 py-2 px-5 rounded-[4px]   border border-[#0D062D1A] cursor-pointer text-sm font-medium  hover:bg-blue-500/20 ">
              <Image src={"/assets/icons/archive-user-info.png"} width={20} height={20} alt="archive-user-info" />
              Archive
            </Button>
            <SheetClose asChild>
              <Button type="button" className="flex gap-1 h-10 py-2 px-5 rounded-[4px]   border border-[#0D062D1A] cursor-pointer text-sm font-medium  hover:bg-red-500/20 ">
                <Image src={"/assets/icons/delete.png"} width={20} height={20} alt="Cancel" />
                Cancel
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditUser;
