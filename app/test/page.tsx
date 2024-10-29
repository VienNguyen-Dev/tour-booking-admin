"use client";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { autoLogin, createUser, login, signUpWithGoogle, uploadAvatar } from "@/lib/actions/user.actions";
import { useToast } from "@/components/hooks/use-toast";
import { Loader2 } from "lucide-react";
import CustomFormField from "@/components/CustomFormField";

const TestPage = () => {
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  const router = useRouter();
  const formSchema = z.object({
    avatar: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    // const avatarUrl = await uploadAvatar(data.avatar);
    // if (avatarUrl) console.log("success");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 lg:space-y-2 2xl:space-y-6">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { value, onChange, ref, ...fieldProps } }) => (
            <FormItem>
              <FormControl>
                <div className="flex justify-center items-center ">
                  <div onClick={handleAvatarClick} className=" xl:w-[100px] xl:h-[100px] 2xl:w-[80px] 2xl:h-[80px] relative overflow-hidden rounded-full cursor-pointer">
                    <img src={previewImage} alt="avatar" width={80} height={80} className=" cursor-pointer rounded-full object-cover w-20 h-20" />

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
        {/* <CustomFormField name="partner" label="Partners" control={form.control} placeholder="Select a partner type" /> */}
        <Button type="submit" variant={"outline"} className="secondary-btn">
          <Image src={"/assets/icons/google.png"} width={28} height={28} alt="google-icon" />
          Click
        </Button>
      </form>
    </Form>
  );
};

export default TestPage;

//  <Form {...form}>
//    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 lg:space-y-2 2xl:space-y-6">
//      <AuthHeader title={`${type === "sign-in" ? " Please Log In to your account and start a" : "Create a new account and start a"} `} subtitle="“New Journey”." />
//      {type === "sign-up" && (
//        <FormField
//          control={form.control}
//          name="username"
//          render={({ field }) => (
//            <FormItem>
//              <FormLabel className="text-form-label">Username</FormLabel>
//              <FormControl>
//                <Input {...field} className="text-input border-0 border-b rounded-none border-[#014C46]  focus-visible:ring-0 focus:ring-transparent" />
//              </FormControl>

//              <FormMessage className="text-error-message" />
//            </FormItem>
//          )}
//        />
//      )}
//      <FormField
//        control={form.control}
//        name="email"
//        render={({ field }) => (
//          <FormItem>
//            <FormLabel className="text-form-label">Email</FormLabel>
//            <FormControl>
//              <Input {...field} className="text-input border-0 border-b rounded-none border-[#014C46]  focus-visible:ring-0 focus:ring-transparent" />
//            </FormControl>

//            <FormMessage className="text-error-message" />
//          </FormItem>
//        )}
//      />
//      <FormField
//        control={form.control}
//        name="password"
//        render={({ field }) => (
//          <FormItem>
//            <FormLabel className="text-form-label">Password</FormLabel>
//            <FormControl>
//              <div className=" relative">
//                <Input type={`${showPassword ? "password" : "text"}`} {...field} className="text-input border-0 border-b rounded-none border-[#014C46]  focus-visible:ring-0 focus:ring-transparent" />
//                {showPassword ? (
//                  <Image onClick={() => setShowPassword(false)} src={"/assets/icons/eye.png"} alt="eye" className="absolute right-6 top-1 cursor-pointer" width={20} height={20} color="black" />
//                ) : (
//                  <Image
//                    onClick={() => setShowPassword(true)}
//                    src={"/assets/icons/eye-hide.png"}
//                    alt="eye-hide"
//                    className="absolute right-6 top-2 cursor-pointer"
//                    width={20}
//                    height={20}
//                    color="black"
//                  />
//                )}
//              </div>
//            </FormControl>
//            <FormMessage className="text-error-message" />
//          </FormItem>
//        )}
//      />

//      {/* Neu remember:
//     1. show email and password
//     2. checkbox => ok
//     */}
//      {type === "sign-in" && (
//        <div className="flex justify-between items-center">
//          <FormField
//            control={form.control}
//            name="remember"
//            render={({ field }) => (
//              <FormItem className="flex flex-row items-center justify-center space-x-3">
//                <FormControl className="mt-1.5">
//                  <Checkbox defaultChecked={form.getValues("remember")} checked={form.getValues("remember")} onCheckedChange={field.onChange} />
//                </FormControl>
//                <div className=" leading-none">
//                  <FormLabel className="text-label">Remember</FormLabel>
//                </div>
//              </FormItem>
//            )}
//          />

//          <Link href={"/forgot-password"} className="text-link">
//            Forget password?
//          </Link>
//        </div>
//      )}
//      <CustomButton isLoading={isLoading} title={authLabel} />
//      <div className="flex justify-center items-center gap-2">
//        <p className="text-label">{type === "sign-in" ? "Don't have an account?" : "Already have an account?"}</p>
//        <Link href={`/${type === "sign-in" ? "sign-up" : "sign-in"}`}>
//          <p className="text-link">{type === "sign-in" ? "Sign up" : "Sign in"}</p>
//        </Link>
//      </div>
//      <div className=" flex items-center">
//        <hr className="max-w-[280px] w-full h-[1px] bg-[#0D062D] mr-2" />
//        <span className="text-center text-xl text-[#0D062D]">Or</span>
//        <hr className="max-w-[288px] w-full h-[1px] bg-[#0D062D] ml-2" />
//      </div>
//      <Button type="button" onClick={handleLoginWithGoogle} variant={"outline"} className="secondary-btn">
//        <Image src={"/assets/icons/google.png"} width={28} height={28} alt="google-icon" />
//        {isGoogleLoging ? (
//          <>
//            <Loader2 className=" animate-spin mr-2" />
//            Signing...
//          </>
//        ) : (
//          `${type === "sign-in" ? "Log In " : "Sign Up "} with Google`
//        )}
//      </Button>
//    </form>
//  </Form>;
