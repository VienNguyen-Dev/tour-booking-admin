"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { menuItems } from "@/app/constants";
import Setting from "./Setting";
import RatingAndReview from "./RatingAndReview";
import { blockUser, logout } from "@/lib/actions/user.actions";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import SvgIcon from "./SvgIcon";
import DeleteItem from "./DeleteItem";
import AddNewProduct from "./AddNewProduct";
import EditProduct from "./EditProduct";

const DropdownMenuAction = ({
  orderId,
  type,
  user,
  refreshUserList,
  partner,
  partnerId,
  order,
  customer,
  product,
  productId,
}: {
  orderId?: string;
  type?: string;
  user?: User;
  order?: Order;
  customer?: Customer;
  refreshUserList?: () => void | undefined;
  partner?: Partner;
  partnerId?: string;
  customerId?: string;
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const menuItem = menuItems(type || "user");
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(user?.status === "active" ? "Block" : "Unblock");
  const [isDelete, setIsDelete] = useState(false);
  const [isBlocked, setIsBlocked] = useState(user?.status !== "active");
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);
  const userId = user?.$id!;
  const action = updateTitle;
  const handleBlockUser = useCallback(async () => {
    const res = await blockUser({ userId, action });
    if (res) {
      setUpdatedUser({
        ...updatedUser,
        status: res.status,
      } as User);
      setIsBlocked(res.status !== "active");
    }
    if (refreshUserList) {
      refreshUserList();
    }
  }, []);
  const handleAction = (title: string) => {
    if (title === "View Details" && type === "redeem") router.push(`/admin/redeems-exchanges/${orderId}`);

    if (title === "View Details" && type === "order") router.push(`/admin/orders/${orderId}`);
    if (title === "Setting") {
      setIsSettingOpen(true);
    }

    if (title === "Rating & Review") {
      setIsRatingOpen(true);
    }

    if (title === "Logout") {
      handleLogout();
    }
    if (type === "product" && title === "Add") {
      setIsAddProductOpen(true);
    }

    if (type === "product" && title === "Edit") {
      setIsEditProductOpen(true);
    }

    // Xử lý thêm user/partner khi không bị block
    if (title === "Add" && !isBlocked) {
      if (type === "user") {
        setIsAddUserOpen(true);
      } else if (type === "partner") {
        router.replace("/admin/partners/create");
      }
    }

    // Xử lý edit user/partner khi không bị block
    if (title === "Edit" && !isBlocked) {
      if (type === "user") {
        setIsEditUserOpen(true);
      } else if (type === "partner" && partnerId) {
        router.replace(`/admin/partners/${partnerId}/edit`);
      } else if (type === "product") {
        setIsEditProductOpen(true);
      }
    }
    if (title === "Block") {
      //
      //permission: SupperAdmn and Admin
      //Write a information send to user that: You have been block and need contact addmin to unBlock
      //If block => title ="Unblock" and else
      //problem: updated success => show immediately
      //I want when I click block button => refetchUSerList()
      setUpdateTitle("Unblock");
      handleBlockUser();
    } else if (title === "Unblock") {
      console.log(title);
      setUpdateTitle("Block");
      handleBlockUser();
    }

    if (title === "Delete") {
      setIsDelete(true);
    }
  };
  const itemId = type === "user" ? user?.$id : type === "customer" ? customer?.$id : type === "product" ? product?.$id : "";
  let typePage = "";
  switch (type) {
    case "user":
      typePage = "user";
      break;
    case "partner":
      typePage = "partner";
      break;
    case "order":
      typePage = "order";
      break;
    case "customer":
      typePage = "customer";
      break;
    case "redeem":
      typePage = "redeem";
      break;
    case "product":
      typePage = "product";
      break;
    default:
      break;
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {type === "action" || type === "user" || type === "partner" || type === "order" || type === "customer" || type === "product" ? (
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Image src={"/assets/icons/action.png"} width={24} height={24} alt="action" />
            </Button>
          ) : (
            <div className="relative">
              <img src={user?.avatar} alt={user?.username} width={38} height={38} className=" cursor-pointer rounded-full w-10 h-10" />
              {user && (
                <div className=" absolute bottom-0.5 right-0 border-0.5 rounded-full bg-white flex items-center justify-center w-3 h-3">
                  <SvgIcon path="/assets/icons/point-active.svg" width={8} height={8} color={user ? "#28C76F" : "gray"} />
                </div>
              )}
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white max-w-[240px] h-fit rounded-xl w-full mt-1"
          style={{
            boxShadow: "0px 4px 4px 0px #00000040",
          }}
        >
          {type === "action" && <DropdownMenuLabel className="text-[#014C46] border-b border-[#014C461A] ">Action</DropdownMenuLabel>}
          {menuItem.map((item, index) => {
            const iconAction = item.label === "Block" ? `/assets/icons/${updateTitle === "Block" ? "lock.svg" : "unlock.svg"}` : item.icon;
            return (
              <div
                key={index}
                className={` flex mr-1 w-full justify-center items-center ${
                  isBlocked && (type === "user" || type === "partner") && (item.label === "Edit" || item.label === "Add") ? "cursor-not-allowed bg-slate-300 opacity-50" : "hover:bg-[#57d7cd]"
                } `}
              >
                {/* type !== "action" && */}
                <Image src={iconAction} width={20} height={20} alt={item.label} className="w-[20px] h-[20px] " />
                <DropdownMenuItem onClick={() => handleAction(item.label)} className={` cursor-pointer  border-b border-[#014C461A]   h-[60px] px-[8px] w-full  `}>
                  {`${item.label === "Block" ? updateTitle : item.label}`}
                </DropdownMenuItem>
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      {isSettingOpen && <Setting user={updatedUser!} onClose={() => setIsSettingOpen(false)} refreshUserList={refreshUserList!} />}
      {isRatingOpen && <RatingAndReview user={user!} onClose={() => setIsRatingOpen(false)} />}
      {isAddUserOpen && <AddUser onClose={() => setIsAddUserOpen(false)} refreshUserList={refreshUserList!} />}
      {isEditUserOpen && <EditUser user={updatedUser} onClose={() => setIsEditUserOpen(false)} onUserUpdate={setUpdatedUser} refreshUserList={refreshUserList!} />}
      {isDelete && typePage && <DeleteItem type={typePage} itemId={itemId!} onClose={() => setIsDelete(false)} />}
      {isAddProductOpen && <AddNewProduct onClose={() => setIsAddProductOpen(false)} refreshUserList={refreshUserList!} />}
      {isEditProductOpen && <EditProduct product={product} refreshUserList={refreshUserList!} onClose={() => setIsEditProductOpen(false)} />}
    </>
  );
};

export default DropdownMenuAction;
