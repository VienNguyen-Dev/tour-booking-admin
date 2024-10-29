"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteUser } from "@/lib/actions/user.actions";
import { deletePartner } from "@/lib/actions/partner.actions";
import { deleteCustomer } from "@/lib/actions/customer.actions";
import { deleteOrder } from "@/lib/actions/order.actions";
import { deleteProduct } from "@/lib/actions/product.actions";
import { Loader2 } from "lucide-react";

const DeleteItem = ({ itemId, onClose, type }: { itemId: string; onClose: () => void; type: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (type === "user") {
        await deleteUser(itemId);
      } else if (type === "partner") {
        await deletePartner(itemId);
      } else if (type === "customer") {
        await deleteCustomer(itemId);
      } else if (type === "order" || type === "redeem") {
        await deleteOrder(itemId);
      } else if (type === "product") {
        await deleteProduct(itemId);
      }
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  let titleDelete = "";
  switch (type) {
    case "user":
      titleDelete = "User";
      break;
    case "partner":
      titleDelete = "Partner";
      break;
    case "redeem":
      titleDelete = "Order";
      break;
    case "order":
      titleDelete = "Order";
      break;
    case "customer":
      titleDelete = "Customer";
      break;
    case "product":
      titleDelete = "Product";
      break;
    default:
      break;
  }
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white text-[#014C46]">
        <DialogHeader className="text-[#014C46]">
          <DialogTitle className="text-xl lg:text-2xl font-bold">{`Are you sure delete this ${titleDelete}`}</DialogTitle>
          <DialogDescription className="text-sm lg:text-xl font-medium">
            {" "}
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} type="button" onClick={handleSubmit} className="bg-[#014C46] text-white hover:bg-[#014C46]/80">
            {isLoading ? (
              <>
                <Loader2 className=" animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Submit"
            )}
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
