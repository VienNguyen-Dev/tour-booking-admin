"use client";
import React, { useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "./hooks/use-toast";
import { Loader2 } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { updateUser } from "@/lib/actions/user.actions";
import CustomFormField from "./CustomFormField";
import { editProfileSchema } from "./validations";

const Setting = ({ user, onClose, refreshUserList }: { user: User; onClose: () => void; refreshUserList: () => void }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.avatar);

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      avatar: updatedUser?.avatar,
      email: updatedUser?.email,
      phoneNumber: updatedUser?.phoneNumber,
      username: updatedUser.username,
    },
  });

  async function onSubmit(data: z.infer<typeof editProfileSchema>) {
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
    if (data.username) {
      formData.append("username", data.username || user?.username || "");
    }

    formData.append("userId", user?.$id || "");

    // Handle avatar
    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }

    const userData = {
      ...updatedUser,
      formData,
    };
    try {
      setIsSaving(true);
      const res = await updateUser(userData);
      if (res) {
        setUpdatedUser(res);
        setIsEditing(false);
        toast({
          title: "Success",
          description: "Profile updated successfully",
          variant: "default",
        });
        if (typeof refreshUserList === "function") {
          refreshUserList();
        } else {
          console.warn("refreshUserList is not a function");
        }

        onClose();
      } else {
        throw new Error(res.error || "An error occurred while updating user");
      }
      console.log(typeof refreshUserList);
    } catch (error: any) {
      console.error("Update user error:", error);
      toast({
        title: "Update user Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="xl:min-w-[400px] xl:max-h-[718px] w-full">
      <Sheet open={true} onOpenChange={onClose}>
        <SheetContent side={"right"} className=" border-none rounded-xl bg-white flex mt-14 flex-col w-fit p-5 mr-12 gap-4">
          <SheetHeader className="flex items-center justify-center border-b p-2 border-gradient-custom">
            <SheetTitle className="text-[#014C46] text-lg xl:text-2xl font-bold h-[30px]">Settings</SheetTitle>
          </SheetHeader>
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                <div className="rounded-xl border boder-[#014C461A] p-4">
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field: { value, onChange, ref, ...fieldProps } }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex justify-center items-center ">
                            <div onClick={handleAvatarClick} className=" xl:w-[312px] xl:h-[312px]  relative overflow-hidden rounded-full cursor-pointer">
                              <img src={previewImage} alt={user?.username} width={312} height={312} className=" cursor-pointer rounded-full object-cover w-[312px] h-[312px]" />

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
                  <CustomFormField name="username" placeholder="Username" control={form.control} label="Username" />
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
                </div>
                <div className=" flex justify-end ">
                  {isEditing && (
                    <Button
                      disabled={isSaving}
                      type="submit"
                      className={`hover:bg-orange-200
                        transition-opacity flex gap-2 items-center justify-center  border rounded-[4px] border-[#0D062D1A] py-2 px-5 w-[90px]`}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className=" animate-spin mr-2" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <Image src={`/assets/icons/Check.png`} alt={`save-setting`} width={20} height={20} />
                          <p className="text-[#0D062D] text-sm font-medium">Save</p>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          ) : (
            <>
              <div className="rounded-xl border boder-[#014C461A] p-4">
                <div className="flex flex-col gap-2 w-full justify-center items-center ">
                  <div className=" w-full mt-2">
                    <img src={user?.avatar} alt={user?.username} width={312} height={312} className=" cursor-pointer rounded-[150px] object-cover w-[312px] h-[312px]" />
                  </div>
                  <h1 className="text-[#014C46] text-3xl font-bold">{user.username}</h1>
                  <p className="text-xl font-medium text-[#0D062D] capitalize">{user.role}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Image src={"/assets/icons/call.png"} alt="call" width={20} height={20} />
                    <p className=" font-medium text-[16px] text-[#0D062D]">{user.phoneNumber}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Image src={"/assets/icons/email-white.png"} alt="call" width={20} height={20} />
                    <p className=" font-medium text-[16px] text-[#0D062D]">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                {!isEditing && !isSaving && (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className={`hover:bg-blue-200 transition-opacity flex gap-2 items-center justify-center  border rounded-[4px] border-[#0D062D1A] py-2 px-5 w-[90px]`}
                  >
                    <Image src={"/assets/icons/edit-setting.png"} width={20} height={20} alt="edit-setting" />
                    Edit
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Setting;
