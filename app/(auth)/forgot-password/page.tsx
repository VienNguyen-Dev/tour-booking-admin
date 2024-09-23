"use client";
import AuthHeader from "@/components/AuthHeader";
import CustomFormField from "@/components/CustomFormField";
import Header from "@/components/Header";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/components/validations";
import { forgotPassword } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ForgotPassword = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    const { email } = values;
    try {
      setIsSending(true);

      const res = await forgotPassword(email);
      if (res) setIsSuccess(true);
    } catch (error) {
      toast({
        title: "Change password error",
        description: "Please check your email and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  }
  return (
    <div className="dialog-forgot-password">
      <Header title="Wellcome to" subtitle="Tour Dubai" />
      <AuthHeader
        title="Reset Password?"
        subtitle="Enter your account's email address, and we'll send you a link to
          reset your password."
      />
      {!isSuccess ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex gap-4 justify-center w-full">
            <div className="w-full max-w-[445px]">
              <CustomFormField control={form.control} name="email" label="Email" placeholder="Enter your email..." />
            </div>
            <div className="mt-1.5">
              <Button disabled={isSending} type="submit" className="bg-[#014C46] text-white hover:bg-[#014C46]/80 ">
                {isSending ? (
                  <>
                    <Loader2 className=" animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col gap-6 justify-center items-center">
          <h2 className="text-blue-400">A password reset link has been sent to your email.</h2>
        </div>
      )}
      <div className="flex gap-2 mt-12">
        <p className="text-label">Remember password?</p>
        <Link href="sign-in" className="text-link">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
