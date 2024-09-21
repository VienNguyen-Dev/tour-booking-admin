"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TypesData } from "@/app/constants";
import { DataTable } from "./DataTable";
import DataBoard from "./DataBoard";
// import { columns } from "@/app/orders/columns";
import { useRouter, useSearchParams } from "next/navigation";
import { getColumnsByType } from "@/app/orders/columns";
interface DataTabsProps {
  data: (Order | User | Product | Partner)[];
  pageType: string;
  refreshUserList: () => void;
}

const TabsData = ({ data, pageType, refreshUserList }: DataTabsProps) => {
  const [triggerValue, setTriggerValue] = useState("board");
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramsUrl = new URLSearchParams(searchParams);
  const handleTabChange = (value: string) => {
    setTriggerValue(value);
    refreshUserList;
    paramsUrl.set("page", "1");
    router.push(`?${paramsUrl.toString()}`);
  };
  const [updateData, setupdateData] = useState(data);

  const columns = getColumnsByType(pageType, refreshUserList);

  useEffect(() => {
    const getData = () => {
      switch (pageType) {
        case "redeem":
          return data as Order[];
        case "user":
          return data as User[];
        case "product":
          return data as Product[];
        case "partner":
          return data as Partner[];
        default:
          return [];
      }
    };
    setupdateData(getData());
  }, [pageType, data]);

  return (
    <Tabs defaultValue="board" className="w-full space-y-8" onValueChange={handleTabChange}>
      {TypesData.map((type, index: number) => (
        <TabsContent key={index} value={type.title}>
          {type.title === "board" ? (
            <DataBoard value={triggerValue} data={updateData} pageType={pageType} />
          ) : (
            <DataTable columns={columns} data={updateData} value={triggerValue} pageType={pageType} refreshUserList={refreshUserList} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsData;
