"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteUser } from "@/lib/actions/user.actions";
import { deletePartner } from "@/lib/actions/partner.actions";

const DeleteItem = ({ itemId, onClose, type }: { itemId: string; onClose: () => void; type: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (type === "user") {
        await deleteUser(itemId);
      } else if (type === "partner") {
        await deletePartner(itemId);
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white text-[#014C46]">
        <DialogHeader className="text-[#014C46]">
          <DialogTitle className="text-xl lg:text-2xl font-bold">{`Are you sure delete this ${type === "user" ? "user" : "partner"}?`}</DialogTitle>
          <DialogDescription className="text-sm lg:text-xl font-medium">
            {" "}
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} className="bg-[#014C46] text-white hover:bg-[#014C46]/80">
            Submit
          </Button>
          <Button onClick={onClose} className="bg-red-500 text-white hover:bg-[#014C46]/80">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItem;
