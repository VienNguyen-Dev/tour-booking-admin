"use client";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordRecover, passwordReset } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  password: z.string().min(8).max(25),
  confirmPassword: z.string().min(8).max(25),
});

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const url = useSearchParams();

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const userId = url.get("userId") as string;
    const secret = url.get("secret") as string;
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast({
        title: " Error",
        description: "Password do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsResetting(true);

      const res = await passwordReset({
        userId,
        secret,
        password,
      });
      if (res) {
        toast({
          title: "Password reset success",
          description: "Password reset successfully.",
          variant: "default",
        });
        router.back();
      }
    } catch (error: any) {
      toast({
        title: "Password reset error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  }

  return (
    <div className="max-w-2xl w-full mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Password Reset</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-form-label">Password</FormLabel>
                <FormControl>
                  <div className=" relative">
                    <Input
                      type={`${showPassword ? "password" : "text"}`}
                      {...field}
                      className="text-input border-0 border-b rounded-none border-[#014C46]  focus-visible:ring-0 focus:ring-transparent"
                    />
                    {showPassword ? (
                      <Image onClick={() => setShowPassword(false)} src={"/assets/icons/eye.png"} alt="eye" className="absolute right-6 top-1 cursor-pointer" width={20} height={20} color="black" />
                    ) : (
                      <Image
                        onClick={() => setShowPassword(true)}
                        src={"/assets/icons/eye-hide.png"}
                        alt="eye-hide"
                        className="absolute right-6 top-2 cursor-pointer"
                        width={20}
                        height={20}
                        color="black"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-error-message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-form-label">Confirm Password</FormLabel>
                <FormControl>
                  <div className=" relative">
                    <Input
                      type={`${showPassword ? "password" : "text"}`}
                      {...field}
                      className="text-input border-0 border-b rounded-none border-[#014C46]  focus-visible:ring-0 focus:ring-transparent"
                    />
                    {showPassword ? (
                      <Image onClick={() => setShowPassword(false)} src={"/assets/icons/eye.png"} alt="eye" className="absolute right-6 top-1 cursor-pointer" width={20} height={20} color="black" />
                    ) : (
                      <Image
                        onClick={() => setShowPassword(true)}
                        src={"/assets/icons/eye-hide.png"}
                        alt="eye-hide"
                        className="absolute right-6 top-2 cursor-pointer"
                        width={20}
                        height={20}
                        color="black"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-error-message" />
              </FormItem>
            )}
          />

          <Button disabled={isResetting} type="submit" className="bg-[#014C46] text-white hover:bg-[#014C46]/80 justify-end">
            {isResetting ? (
              <>
                <Loader2 className=" animate-spin mr-2" />
                Resetting...
              </>
            ) : (
              "Reset"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PasswordReset;
