"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authSchema } from "./validations";
import CustomButton from "./CustomButton";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { autoLogin, createUser, login, signUpWithGoogle } from "@/lib/actions/user.actions";
import { useToast } from "@/components/hooks/use-toast";
import AuthHeader from "./AuthHeader";
import { Loader2 } from "lucide-react";
import CustomFormField from "./CustomFormField";

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [checkedRemember, setcheckedRemember] = useState(false);
  const [isGoogleLoging, setIsGoogleLogging] = useState(false);
  const authFormSchema = authSchema(type);

  useEffect(() => {
    const res = async () => {
      const response = await autoLogin();
      if (response) {
        router.push("/admin/redeems-exchanges");
      }
    };
    res();
  }, []);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      remember: checkedRemember,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof authFormSchema>) {
    const createUserData = {
      email: data.email,
      password: data.password,
      username: data.username!,
      role: "user",
    };
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const response = await createUser(createUserData);
        if (response) {
          router.push("/admin/redeems-exchanges");
          toast({
            title: "Success",
            description: "User created successfully",
            variant: "default",
          });
        }
      } else if (type === "sign-in") {
        const response = await login({ email: data.email, password: data.password, remember: data.remember });
        if (response) {
          router.push("/admin/redeems-exchanges");
          setcheckedRemember(response.remember);

          toast({
            title: "Success",
            description: "Login account successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description: response.error.message,
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Authetication Error",
        description: `Fail to ${type === "sign-up" ? "sign up" : "sign in"}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleLoginWithGoogle = async () => {
    try {
      setIsGoogleLogging(true);
      const result = await signUpWithGoogle();
      if (result && result.url) window.location.href = result.url;
    } catch (error: any) {
      toast({
        title: "Authetication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGoogleLogging(false);
    }
  };

  const authLabel = type === "sign-up" ? "Sign Up" : "Sign In";
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 lg:space-y-4 xl:space-y-6 2xl:space-y-8">
        <AuthHeader title={`${type === "sign-in" ? " Please Log In to your account and start a" : "Create a new account and start a"} `} subtitle="“New Journey”." />
        {type === "sign-up" && (
          <CustomFormField name="username" control={form.control} label="Username" placeholder="Enter your username..." type="auth" />

          //   name="username"
          //   render={({ field }) => (
          //     <FormItem>
          //       <FormLabel className="text-form-label">Username</FormLabel>
          //       <FormControl>
          //         <Input {...field} className="text-input border-0 border-b rounded-none border-[#014C46]  focus-visible:ring-0 focus:ring-transparent" />
          //       </FormControl>

          //       <FormMessage className="text-error-message" />
          //     </FormItem>
          //   )}
          // />
        )}
        <CustomFormField name="email" control={form.control} label="Email" placeholder="Enter your email..." type="auth" />

        <CustomFormField name="password" control={form.control} label="Password" placeholder="Enter your password..." type="auth" />

        {/* Neu remember: 
    1. show email and password
    2. checkbox => ok
    */}
        {type === "sign-in" && (
          <div className="flex justify-between items-center">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-center space-x-3">
                  <FormControl className="mt-1.5">
                    <Checkbox defaultChecked={form.getValues("remember")} checked={form.getValues("remember")} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className=" leading-none">
                    <FormLabel className="text-label">Remember</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Link href={"/forgot-password"} className="text-link">
              Forget password?
            </Link>
          </div>
        )}
        <CustomButton isLoading={isLoading} title={authLabel} />
        <div className="flex justify-center items-center gap-2">
          <p className="text-label">{type === "sign-in" ? "Don't have an account?" : "Already have an account?"}</p>
          <Link href={`/${type === "sign-in" ? "sign-up" : "sign-in"}`}>
            <p className="text-link">{type === "sign-in" ? "Sign up" : "Sign in"}</p>
          </Link>
        </div>
        <div className=" flex items-center">
          <hr className="max-w-[280px] w-full h-[1px] bg-[#0D062D] mr-2" />
          <span className="text-center text-xl text-[#0D062D]">Or</span>
          <hr className="max-w-[288px] w-full h-[1px] bg-[#0D062D] ml-2" />
        </div>
        <Button type="button" onClick={handleLoginWithGoogle} variant={"outline"} className="secondary-btn">
          <Image src={"/assets/icons/google.png"} width={28} height={28} alt="google-icon" />
          {isGoogleLoging ? (
            <>
              <Loader2 className=" animate-spin mr-2" />
              Signing...
            </>
          ) : (
            `${type === "sign-in" ? "Log In " : "Sign Up "} with Google`
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
