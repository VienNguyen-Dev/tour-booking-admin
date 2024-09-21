"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const StarProgress = ({ value }: { value: number }) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => setProgress(66), 500);
  //   return () => clearTimeout(timer);
  // }, []);

  return <Progress value={value} className=" bg-[#014C4633] h-[12px]" indicatorClassName="bg-[#014C46]" />;
};

export default StarProgress;
