"use client";

import DropdownMenuAction from "@/components/DropdownMenuAction";
import SvgIcon from "@/components/SvgIcon";
import BadgeType from "@/components/TypeBadge";
import { cn, formatAmount, formatDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const getColumnsByType = (pageType: string, refreshUserList: () => void): ColumnDef<any>[] => {
  switch (pageType) {
    case "redeem":
      return [
        {
          accessorKey: "orderId",
          header: () => <div className=" uppercase text-header-data-table">Order Id</div>,
          cell: ({ row }) => {
            return <div className="text-[#2F2B3D] text-sm text-left font-medium">{row.original.$id}</div>;
          },
        },
        {
          accessorKey: "date",
          header: () => <div className=" uppercase text-header-data-table">Date</div>,
          cell: ({ row }) => {
            return <div className=" p-4 text-[#2F2B3D] text-sm text-left font-medium">{formatDateTime(new Date(row.original.date)).dateTime}</div>;
          },
        },
        {
          accessorKey: "customer",
          header: () => <div className=" p-4 uppercase text-header-data-table">Customer</div>,
          cell: ({ row }) => {
            return (
              <div className="p-4 flex flex-col  text-left ">
                <p className="text-[#2F2B3D] font-medium text-[15px] capitalize">{row.original.customer.name}</p>
                <p className=" lowercase text-[#2F2B3DB2] font-normal text-sm">{row.original.customer.email}</p>
              </div>
            );
          },
        },
        {
          accessorKey: "product",
          id: "product",
          header: () => <div className=" uppercase text-header-data-table">Product</div>,
          cell: ({ row }) => {
            const product = row.original.product;
            return (
              <div className=" text-left flex flex-col  gap-2">
                <BadgeType type={product.type} />
                <p className=" capitalize text-[#2F2B3D] text-sm font-normal">{product.name}</p>
              </div>
            );
          },
          filterFn: (row, id, value) => {
            const product = row.getValue(id) as { name: string; type: string };
            return product.name.toLowerCase().includes(value.toLowerCase()) || product.type.toLocaleLowerCase().includes(value.toLocaleLowerCase());
          },
        },

        {
          accessorKey: "status",
          header: () => <div className=" uppercase text-header-data-table">Status</div>,
          cell: ({ row }) => {
            const statusColor = row.original.status;
            return (
              <div className="flex items-center gap-2">
                <SvgIcon
                  path="/assets/icons/status-point.svg"
                  width={8}
                  height={8}
                  color={cn("", {
                    "#2F2B3D": statusColor === "received",
                    "#F09000": statusColor === "processing",
                    "#005928": statusColor === "booking",
                    "#CF0000": statusColor === "canceled",
                  })}
                />
                <p className=" font-normal text-sm text-black capitalize">{row.original.status}</p>
              </div>
            );
          },
        },
        {
          id: "action",
          enableHiding: false,
          header: () => <div className=" uppercase text-header-data-table max-sm:hidden">Action</div>,
          cell: ({ row }) => {
            return <DropdownMenuAction orderId={row.original.$id} type="action" refreshUserList={refreshUserList} />;
          },
        },
      ] as ColumnDef<Order>[];

    case "user":
      return [
        {
          accessorKey: "userId",
          header: () => <div className=" uppercase text-header-data-table">ID #</div>,
          cell: ({ row }) => {
            return <div className="text-[#2F2B3D] text-sm text-left font-medium">{row.original.$id}</div>;
          },
        },
        {
          accessorKey: "username",
          id: "username",
          header: () => <div className=" uppercase text-header-data-table">Users</div>,
          cell: ({ row }) => {
            const user = row.original;
            return (
              <div className="flex gap-2  py-4">
                <div className="w-10 h-10">
                  <img src={user?.avatar} alt={user?.username} width={38} height={38} className=" cursor-pointer rounded-full w-10 h-10" />
                </div>
                <div className="text-[#2F2B3D] flex flex-col  text-left ">
                  <p className="text-[#2F2B3D] font-medium text-sm capitalize">{row.original.username}</p>
                  <p className=" lowercase text-[#2F2B3DB2] font-normal text-sm">{row.original.email}</p>
                </div>
              </div>
            );
          },
          filterFn: "includesString",
        },
        {
          accessorKey: "status",
          header: () => <div className=" p-4 uppercase text-header-data-table">Status</div>,
          cell: ({ row }) => {
            return <BadgeType type={row.original.status} />;
          },
          filterFn: "includesString",
        },
        {
          accessorKey: "role",
          header: () => <div className=" uppercase text-header-data-table">Permissions</div>,
          cell: ({ row }) => {
            return <BadgeType type={row.original.role} />;
          },
          filterFn: "includesString",
        },
        {
          id: "action",
          enableHiding: false,
          header: () => <div className=" uppercase text-header-data-table max-sm:hidden">Action</div>,
          cell: ({ row }) => {
            return <DropdownMenuAction user={row.original} orderId={row.original.$id} type="user" refreshUserList={refreshUserList} />;
          },
        },
      ] as ColumnDef<User>[];
    case "partner":
      return [
        {
          accessorKey: "partnerId",
          header: () => <div className=" uppercase text-header-data-table">ID #</div>,
          cell: ({ row }) => {
            return <div className="text-[#2F2B3D] text-sm text-left font-medium">{row.original.$id}</div>;
          },
        },
        {
          accessorKey: "name",
          header: () => <div className=" uppercase text-header-data-table">Partners</div>,
          cell: ({ row }) => {
            const partnerInfo = row.original;
            return (
              <div className="flex gap-2 py-4">
                <img src={partnerInfo?.avatar} alt={partnerInfo?.name} width={38} height={38} className=" cursor-pointer rounded-full w-10 h-10" />
                <div className="text-[#2F2B3D] flex flex-col  text-left ">
                  <p className="text-[#2F2B3D] font-medium text-sm capitalize">{partnerInfo.name}</p>
                  <p className=" lowercase text-[#2F2B3DB2] font-normal text-sm">{partnerInfo.email}</p>
                </div>
              </div>
            );
          },
          filterFn: "includesString",
        },
        {
          accessorKey: "tags",
          header: () => <div className=" p-4 uppercase text-header-data-table">Tags</div>,
          cell: ({ row }) => {
            const { tags } = row.original;
            return (
              <div className="flex flex-col justify-center items-center gap-1">
                {tags.map((tag: string, index) => (
                  <BadgeType key={index} type={tag} />
                ))}
              </div>
            );
          },
        },
        {
          accessorKey: "type",
          id: "type",
          header: () => <div className=" uppercase text-header-data-table">Type</div>,
          cell: ({ row }) => {
            return <BadgeType type={row.original.type} />;
          },
        },
        {
          accessorKey: "payment",
          header: () => <div className=" uppercase text-header-data-table">Payment Terms</div>,
          cell: ({ row }) => {
            return <BadgeType type={row.original.payment} />;
          },
        },
        {
          accessorKey: "rating",
          header: () => <div className=" uppercase text-header-data-table">Ratings</div>,
          cell: ({ row }) => {
            const { rating } = row.original;
            return (
              <div className="flex  items-center gap-2  rounded-[100px] bg-white">
                <p className="text-[#2F2B3D] text-xs font-bold">{rating.toFixed(1)}</p>

                {[1, 2, 3, 4, 5].map((star, index) => {
                  const starValue = Math.min(Math.max(rating - star + 1, 0), 1);
                  return (
                    <div key={index} className="relative">
                      <SvgIcon path="/assets/icons/star-white.svg" width={16} height={16} color="#FFB849" />
                      <div className="absolute inset-0 overflow-hidden" style={{ width: `${starValue * 100}%` }}>
                        <SvgIcon path="/assets/icons/star.svg" width={16} height={16} color="#FFB849" />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          },
        },
        {
          accessorKey: "orders",
          header: () => <div className=" uppercase text-header-data-table">Orders</div>,
          cell: ({ row }) => {
            return (
              <div className="flex flex-col justify-center items-center gap-1 text-[#2F2B3D] text-xs font-medium">
                <p>Order: 30</p>
                <p>Cancel: 2</p>
                <p>Total: 32</p>
              </div>
            );
          },
        },
        {
          id: "action",
          enableHiding: false,
          header: () => <div className=" uppercase text-header-data-table max-sm:hidden">Action</div>,
          cell: ({ row }) => {
            return <DropdownMenuAction partner={row.original} partnerId={row.original.$id} type="partner" refreshUserList={refreshUserList} />;
          },
        },
      ] as ColumnDef<Partner>[];
    // case "order":
    case "order":
      return [
        {
          accessorKey: "orderId",
          header: () => <div className=" uppercase text-header-data-table">Order Id</div>,
          cell: ({ row }) => {
            return <div className="text-[#2F2B3D] text-sm text-left font-medium">{row.original.$id}</div>;
          },
        },
        {
          accessorKey: "date",
          header: () => <div className=" uppercase text-header-data-table">Date</div>,
          cell: ({ row }) => {
            return <div className="flex gap-2  py-4">{formatDateTime(new Date(row.original.date)).dateTime}</div>;
          },
        },
        {
          accessorKey: "customer",
          id: "customer",
          header: () => <div className=" p-4 uppercase text-header-data-table">Customer</div>,
          cell: ({ row }) => {
            const { customer } = row.original;
            const textColor = customer.customerType || "First-Time";
            return (
              <div className="flex flex-col justify-center items-center gap-1">
                <p className="font-medium text-[13px] text-[#2F2B3D] "> {customer.email}</p>
                <p
                  className={cn("font-medium text-[13px]", {
                    "text-[#28C76F]": textColor.toLocaleLowerCase() === "loyalty",
                    "text-[#F09000]": textColor.toLocaleLowerCase() === "repeated",
                    "text-[#2c51c3]": textColor.toLocaleLowerCase() === "first-time",
                  })}
                >
                  {`${textColor} Customer`}
                </p>
              </div>
            );
          },
        },
        {
          accessorKey: "price",
          id: "price",
          header: () => <div className=" uppercase text-header-data-table">Price</div>,
          cell: ({ row }) => {
            return <p className=" font-medium text-sm text-[#2F2B3D]">AE{formatAmount(row.original.product.price)}</p>;
          },
        },
        {
          accessorKey: "type",
          header: () => <div className=" uppercase text-header-data-table">Type</div>,
          cell: ({ row }) => {
            return <BadgeType type={row.original.type} />;
          },
        },
        {
          accessorKey: "product",
          id: "product",
          header: () => <div className=" uppercase text-header-data-table">Product</div>,
          cell: ({ row }) => {
            const { product } = row.original;
            return <p>{product.name}</p>;
          },
          filterFn: (row, id, value) => {
            const product = row.getValue(id) as { name: string; type: string };
            return product.name.toLowerCase().includes(value.toLowerCase());
          },
        },
        {
          accessorKey: "status",
          header: () => <div className=" uppercase text-header-data-table">Status</div>,
          cell: ({ row }) => {
            const statusColor = row.original.status;
            return (
              <div className="flex items-center gap-2">
                <SvgIcon
                  path="/assets/icons/status-point.svg"
                  width={8}
                  height={8}
                  color={cn("", {
                    "#2F2B3D": statusColor === "received",
                    "#F09000": statusColor === "processing",
                    "#005928": statusColor === "booking",
                    "#CF0000": statusColor === "canceled",
                  })}
                />
                <p className=" font-normal text-sm text-black capitalize">{row.original.status}</p>
              </div>
            );
          },
        },
        {
          id: "action",
          enableHiding: false,
          header: () => <div className=" uppercase text-header-data-table max-sm:hidden">Action</div>,
          cell: ({ row }) => {
            return <DropdownMenuAction order={row.original} orderId={row.original.$id} type="order" refreshUserList={refreshUserList} />;
          },
        },
      ] as ColumnDef<Order>[];
    //case customer
    case "customer":
      return [
        {
          accessorKey: "customerId",
          header: () => <div className=" uppercase text-header-data-table">Customer Id</div>,
          cell: ({ row }) => {
            return <div className="text-[#2F2B3D] text-sm text-left font-medium">{row.original.$id}</div>;
          },
        },
        {
          accessorKey: "date",
          header: () => <div className=" uppercase text-header-data-table">Date</div>,
          cell: ({ row }) => {
            return <div className="flex gap-2 py-4 max-w-[200px]">{formatDateTime(new Date(row.original.orderId[0].date)).dateTime}</div>;
          },
        },
        {
          accessorKey: "customer",
          id: "customer",
          header: () => <div className=" p-4 uppercase text-header-data-table">Customer</div>,
          cell: ({ row }) => {
            const textColor = row.original.customerType || "First-Time";
            return (
              <div className="flex items-center gap-2">
                <img src={row.original.avatar} alt={row.original.name} width={38} height={38} className="rounded-full" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-[13px] text-[#2F2B3D] "> {row.original.name}</p>
                  <p className="font-medium text-[13px] text-[#2F2B3D] "> {row.original.email}</p>
                  <p
                    className={cn("font-medium text-[13px]", {
                      "text-[#28C76F]": textColor.toLocaleLowerCase() === "loyalty",
                      "text-[#F09000]": textColor.toLocaleLowerCase() === "repeated",
                      "text-[#2c51c3]": textColor.toLocaleLowerCase() === "first-time",
                    })}
                  >
                    {`${textColor} Customer`}
                  </p>
                </div>
              </div>
            );
          },
        },
        {
          accessorKey: "price",
          id: "price",
          header: () => <div className=" uppercase text-header-data-table">Price</div>,
          cell: ({ row }) => {
            return <p className=" font-medium text-sm text-[#2F2B3D]">AE{formatAmount(row.original.orderId[0].product.price)}</p>;
          },
        },

        {
          accessorKey: "product",
          id: "product",
          header: () => <div className=" uppercase text-header-data-table">Product</div>,
          cell: ({ row }) => {
            return <p>{row.original.orderId[0].product.name}</p>;
          },
          filterFn: (row, id, value) => {
            const product = row.getValue(id) as { name: string; type: string };
            return product.name.toLowerCase().includes(value.toLowerCase());
          },
        },
        {
          accessorKey: "country",
          id: "country",
          header: () => <div className=" uppercase text-header-data-table">Country</div>,
          cell: ({ row }) => {
            return <p>{row.original.country}</p>;
          },
        },
        {
          accessorKey: "orders",
          id: "orders",
          header: () => <div className=" uppercase text-header-data-table">Orders</div>,
          cell: ({ row }) => {
            return <p>{row.original.quantityOrder}</p>;
          },
        },
        {
          accessorKey: "spents",
          id: "spents",
          header: () => <div className=" uppercase text-header-data-table">Total Spents</div>,
          cell: ({ row }) => {
            return <p>{formatAmount(row.original.totalSpent)}</p>;
          },
        },

        {
          accessorKey: "status",
          header: () => <div className=" uppercase text-header-data-table">Status</div>,
          cell: ({ row }) => {
            const statusColor = row.original.orderId[0].status;
            return (
              <div className="flex items-center gap-2">
                <SvgIcon
                  path="/assets/icons/status-point.svg"
                  width={8}
                  height={8}
                  color={cn("", {
                    "#2F2B3D": statusColor === "received",
                    "#F09000": statusColor === "processing",
                    "#005928": statusColor === "booking",
                    "#CF0000": statusColor === "canceled",
                  })}
                />
                <p className=" font-normal text-sm text-black capitalize">{row.original.orderId[0].status}</p>
              </div>
            );
          },
        },
        {
          id: "action",
          enableHiding: false,
          header: () => <div className=" uppercase text-header-data-table max-sm:hidden">Action</div>,
          cell: ({ row }) => {
            return <DropdownMenuAction customer={row.original} customerId={row.original.$id} type="customer" refreshUserList={refreshUserList} />;
          },
        },
      ] as ColumnDef<Customer>[];
    //case product
    case "product":
      return [
        {
          accessorKey: "productId",
          header: () => <div className=" uppercase text-header-data-table">Product Id</div>,
          cell: ({ row }) => {
            return <div className="text-[#2F2B3D] text-sm text-left font-medium">{row.original.$id}</div>;
          },
        },
        {
          accessorKey: "product",
          id: "product",
          header: () => <div className=" p-4 uppercase text-header-data-table">Product</div>,
          cell: ({ row }) => {
            const { name, avatar } = row.original;
            return (
              <div className="flex gap-2  py-4 max-w-[230px]">
                <img src={avatar as string} alt={name} width={36} height={36} className=" cursor-pointer rounded-full w-10 h-10" />
                <div className="text-[#2F2B3D] flex flex-col  text-left ">
                  <p className="text-[#2F2B3D] font-medium text-sm capitalize">{row.original.name}</p>
                </div>
              </div>
            );
          },
          filterFn: (row, id, value) => {
            const product = row.getValue(id) as { name: string; type: string };
            return product.name.toLowerCase().includes(value.toLowerCase());
          },
        },
        {
          accessorKey: "status",
          header: () => <div className=" uppercase text-header-data-table">Status</div>,
          cell: ({ row }) => {
            const { status } = row.original;
            return (
              <div className="flex items-center gap-2">
                <BadgeType type={status} />
              </div>
            );
          },
        },
        {
          accessorKey: "categories",
          header: () => <div className=" uppercase text-header-data-table">Categories</div>,
          cell: ({ row }) => {
            const { categories } = row.original;
            return <BadgeType type={categories} />;
          },
        },
        {
          accessorKey: "partner",
          id: "partner",
          header: () => <div className=" p-4 uppercase text-header-data-table">Partner</div>,
          cell: ({ row }) => {
            return (
              <div className="flex items-center gap-2">
                <p>{row.original.partnerId.partnerProduct}</p>
              </div>
            );
          },
        },
        {
          accessorKey: "type",

          id: "type",
          header: () => <div className=" uppercase text-header-data-table">Type</div>,
          cell: ({ row }) => {
            const { type } = row.original;
            return <BadgeType type={type} />;
          },
        },

        {
          accessorKey: "price",
          id: "price",
          header: () => <div className=" uppercase text-header-data-table">Price</div>,
          cell: ({ row }) => {
            return <p className=" font-medium text-sm text-black">{formatAmount(row.original.price)}</p>;
          },
        },

        {
          id: "action",
          enableHiding: false,
          header: () => <div className=" uppercase text-header-data-table max-sm:hidden">Action</div>,
          cell: ({ row }) => {
            return <DropdownMenuAction product={row.original} productId={row.original.$id} type="product" refreshUserList={refreshUserList} />;
          },
        },
      ] as ColumnDef<Product>[];
  }

  return [];
};
