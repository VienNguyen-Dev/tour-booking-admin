"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import TabsData from "@/components/DataTabs";
import { getAllUsers } from "@/lib/actions/user.actions";
import SvgIcon from "@/components/SvgIcon";

const User = () => {
  const [data, setData] = useState([]);
  const refreshUserList = async () => {
    const res = await getAllUsers();
    setData(res);
  };

  // Initial fetch of user data
  useEffect(() => {
    refreshUserList();
  }, []);
  const exportToExcel = (data: any[]) => {
    // Tạo worksheet từ dữ liệu
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Tạo workbook và thêm worksheet vào
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Redeems & Exchange");

    // Xuất file Excel
    XLSX.writeFile(workbook, "redeems_and_exchanges.xlsx");
  };

  return (
    <section className="flex flex-col w-full space-y-6 p-[22px]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg xl:text-xl font-bold  text-[#014C46]">Users List</h2>
        <Button onClick={() => exportToExcel([1, 2, 3, 4])} variant={"outline"} className="flex gap-2 items-center justify-center min-h-[40px] rounded-[4px] p-[10px] hover:bg-slate-300">
          <SvgIcon width={20} height={20} path={"/assets/icons/Upload.svg"} color="#0D062D" />
          <p className="text-[13px] xl:text-[16px] font-medium text-[#0D062D]">Export</p>
        </Button>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex-1 w-full">
          <TabsData data={data} pageType="user" refreshUserList={refreshUserList} />
        </div>
      </div>
    </section>
  );
};

export default User;
