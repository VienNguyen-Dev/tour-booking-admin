"use client";
import AuthHeader from "@/components/AuthHeader";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col my-20 mx-10 items-center flex-1 max-w-[414px] xl:max-w-[616px]">
      <Header title="Wellcome to" subtitle="Tour Dubai" />
      <AuthHeader
        title="Reset Password?"
        subtitle="Enter your account's email address, and we'll send you a link to
          reset your password."
      />

      <div className="flex gap-2 items-center mt-10 mb-20 w-full">
        <Input type="email" className="min-h-14 w-full text-input" placeholder="Enter your email" />
        <Button onClick={() => {}} type="button" variant={"outline"} className="primary-btn max-w-[140px]">
          Send
        </Button>
      </div>

      <div className="flex gap-2">
        <p className="text-label">Remember password?</p>
        <Link href="sign-in" className="text-link">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
