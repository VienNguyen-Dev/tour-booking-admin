"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  // const router = useRouter();
  redirect("/sign-in");
  return <div></div>;
};

export default Home;
