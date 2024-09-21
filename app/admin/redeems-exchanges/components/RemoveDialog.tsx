import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const RemoveDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex gap-1 h-10 py-2 px-5 rounded-[4px] border border-[#0D062D1A] cursor-pointer text-sm font-medium items-center hover:bg-red-400">
          <Image src={"/assets/icons/delete.png"} width={20} height={20} alt="archive" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#014C46] text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure remove this redeem?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-black/20">Cancel</AlertDialogCancel>
          <AlertDialogAction className="hover:bg-blue-300 border">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDialog;
