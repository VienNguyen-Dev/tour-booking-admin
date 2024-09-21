"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "./hooks/use-toast";
import { Loader2 } from "lucide-react";
import { createPasswordRecovery } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter an email valid",
  }),
});

declare type PasswordRecoverProps = {
  email: string;
  userId: string;
  onClose: () => void;
};
const PasswordRecover = ({ email, userId, onClose }: PasswordRecoverProps) => {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email } = values;
    try {
      setIsSending(true);
      const res = await createPasswordRecovery(email);
      if (res) setIsSuccess(true);
    } catch (error) {
      toast({
        title: "Creare recovery error",
        description: "Please check your email and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  }
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white text-[#014C46]">
        <DialogHeader className="text-[#014C46]">
          <DialogTitle className="text-xl lg:text-2xl font-bold">{isSuccess ? "Email Sent" : "Password Reset"}</DialogTitle>
          <DialogDescription className="text-sm lg:text-xl font-medium">
            {isSuccess ? "A password reset link has been sent to your email." : "Enter your email to password recovery."}
          </DialogDescription>
        </DialogHeader>
        {!isSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>

                    <FormMessage className="text-error-message " />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button disabled={isSending} type="submit" className="bg-[#014C46] text-white hover:bg-[#014C46]/80">
                  {isSending ? (
                    <>
                      <Loader2 className=" animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    "Send"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <DialogFooter>
            <Button onClick={onClose} className="bg-[#014C46] text-white hover:bg-[#014C46]/80">
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PasswordRecover;
