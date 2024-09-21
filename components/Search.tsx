import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableProps } from "./DataTable";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}
const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className="relative w-full min-w-[140px]">
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name or type"
        className="max-w-[360px] w-full min-h-[46px] rounded-[8px] py-[12px] pl-[34px] pr-[14px] text-lg font-normal flex items-center gap-2 placeholder:text-[16px]"
      />
      <Image src={"/assets/icons/search.png"} alt="search" width={20} height={20} className="absolute left-2 top-3 mr-2 cursor-pointer" />
    </div>
  );
};

export default Search;
