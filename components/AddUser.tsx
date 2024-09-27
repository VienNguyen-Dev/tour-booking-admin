"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { addUser } from "@/lib/actions/user.actions";
import { toast } from "./hooks/use-toast";
import CustomFormField from "./CustomFormField";
import { addUserSchema } from "./validations";

const AddUser = ({ onClose, refreshUserList }: { onClose: () => void; refreshUserList: () => void }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
      role: "user",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof addUserSchema>) {
    try {
      setIsSubmiting(true);
      const res = await addUser(data);
      if (res) {
        toast({
          title: "Success",
          description: "User added successfully",
          variant: "default",
        });
        refreshUserList();
      } else {
        toast({
          title: "Add a new user Error",
          description: "This email have been already. Please try again another email.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Add a new user Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmiting(false);
    }
  }
  return (
    <div className="xl:max-w-[400px] xl:max-h-[718px]">
      <Sheet open={true} onOpenChange={onClose}>
        <SheetContent side={"right"} className="flex flex-col border-none rounded-xl bg-white gap-6  w-full p- mt-16 mr-12">
          <SheetHeader className="flex items-center justify-center border-b p-2 border-gradient-custom">
            <SheetTitle className="text-[#014C46] text-lg xl:text-2xl font-bold h-[30px]">{`Users List > Add User`}</SheetTitle>
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
                <CustomFormField name="email" label="Email" placeholder="Enter your email..." control={form.control} />
                <CustomFormField name="role" label="Permission" control={form.control} />
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

export default AddUser;
