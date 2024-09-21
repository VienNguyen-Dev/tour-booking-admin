"use client";

import DropdownMenuAction from "@/components/DropdownMenuAction";
import SvgIcon from "@/components/SvgIcon";
import BadgeType from "@/components/TypeBadge";
import { cn, formatDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

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
              <>
                <div className="p-4 flex flex-col  text-left ">
                  <p className="text-[#2F2B3D] font-medium text-[15px] capitalize">{row.original.customer.name}</p>
                  <p className=" lowercase text-[#2F2B3DB2] font-normal text-sm">{row.original.customer.email}</p>
                </div>
              </>
            );
          },
        },
        {
          accessorKey: "product",
          header: () => <div className=" uppercase text-header-data-table">Product</div>,
          cell: ({ row }) => {
            const product = row.original.product;
            return (
              <>
                <div className=" text-left flex flex-col  gap-2">
                  <BadgeType type={product.type} />
                  <p className=" capitalize text-[#2F2B3D] text-sm font-normal">{product.name}</p>
                </div>
              </>
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
              <>
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
              </>
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
          header: () => <div className=" uppercase text-header-data-table">Users</div>,
          cell: ({ row }) => {
            const user = row.original;
            return (
              <>
                <div className="flex gap-2  py-4">
                  <img src={user?.avatar} alt={user?.username} width={36} height={36} className=" cursor-pointer rounded-full w-10 h-10" />
                  <div className="text-[#2F2B3D] flex flex-col  text-left ">
                    <p className="text-[#2F2B3D] font-medium text-sm capitalize">{row.original.username}</p>
                    <p className=" lowercase text-[#2F2B3DB2] font-normal text-sm">{row.original.email}</p>
                  </div>
                </div>
              </>
            );
          },
        },
        {
          accessorKey: "status",
          header: () => <div className=" p-4 uppercase text-header-data-table">Status</div>,
          cell: ({ row }) => {
            return <BadgeType type={row.original.status} />;
          },
        },
        {
          accessorKey: "role",
          header: () => <div className=" uppercase text-header-data-table">Permissions</div>,
          cell: ({ row }) => {
            return <BadgeType type={row.original.role} />;
          },
          filterFn: (row, id, value) => {
            const user = row.getValue(id) as { username: string; status: string; role: string };
            return (
              user.username.toLowerCase().includes(value.toLowerCase()) ||
              user.status.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
              user.role.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            );
          },
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

    // case "order":
    // case "customer":
  }
  return [];
};
