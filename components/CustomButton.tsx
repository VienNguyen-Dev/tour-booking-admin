import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const CustomButton = ({ title, otherStyles, isLoading }: CustomButtonProps) => {
  return (
    <Button disabled={isLoading} variant={"outline"} className="primary-btn" type="submit">
      {isLoading ? (
        <>
          <Loader2 className=" animate-spin mr-2" />
          Loading...
        </>
      ) : (
        `${title}`
      )}
    </Button>
  );
};

export default CustomButton;
