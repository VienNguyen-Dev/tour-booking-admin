import AuthForm from "@/components/AuthForm";
import AuthHeader from "@/components/AuthHeader";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";

const SignUp = () => {
  return (
    <div className="flex">
      <div className="flex flex-col my-20 mx-10 items-center flex-1 max-w-[414px] xl:max-w-[616px]">
        <div className="mb-12">
          <Header title="Wellcome to" subtitle="Tour Dubai" />
          <AuthForm type="sign-up" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
