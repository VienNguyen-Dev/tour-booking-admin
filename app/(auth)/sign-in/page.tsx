import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import React from "react";

const SignIn = () => {
  return (
    <div className="flex flex-col my-4 mx-6 lg:my-12 lg:mx-8 2xl:my-20 2xl:mx-10  items-center flex-1 max-w-[414px] 2xl:max-w-[800px] w-full xl:max-w-[616px]">
      <div className="mb-12">
        <Header title="Wellcome to" subtitle="Tour Dubai" />
        <AuthForm type="sign-in" />
      </div>
    </div>
  );
};

export default SignIn;
