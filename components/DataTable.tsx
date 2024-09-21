"use client";

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
import Search from "./Search";
import { useState } from "react";
import DataTrigger from "./DataTrigger";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SvgIcon from "./SvgIcon";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  value: string;
  pageType?: string;
  refreshUserList: () => void;
}

export function DataTable<TData, TValue>({ columns, data, value, pageType }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [page, setPage] = useState(1);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: pageType === "redeem" ? 4 : pageType === "user" ? 6 : 0, //con xu ly tiep voi cac pageType khac
      },
    },
  });

  const router = useRouter();
  router.push(`?page=${page}`);
  const paramsUrl = new URLSearchParams();
  paramsUrl.set("page", page.toString());

  //  if (columns) {
  //   onDataChange()
  //  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <Search
            value={((table.getColumn("product")?.getFilterValue() as string) || (table.getColumn("username")?.getFilterValue() as string)) ?? ""}
            onChange={(value: string) => table.getColumn("product")?.setFilterValue(value) || table.getColumn("username")?.setFilterValue(value)}
          />
          <div className="flex items-center justify-center gap-2">
            <DataTrigger value={value} />
            {value === "table" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="w-[40px] h-[40px] border-[#014C461A] rounded-[4px] border-[1px] cursor-pointer items-center justify-center flex">
                    <SvgIcon width={20} height={20} color={"#014C46"} path={"/assets/icons/filter.svg"} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        {pageType && <h1 className="text-lg font-bold text-[#2F2B3DE5] capitalize w-full mb-2">Recent devices</h1>}
        <div className="rounded-md border shadow-md shadow-[rgba(47, 43, 61, 0.14)]">
          <Table>
            <TableHeader className="bg-[#014C4633] p-4 h-[44px]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end py-4 mr-2">
        <Button
          variant="outline"
          onClick={() => {
            table.previousPage();
            setPage(page - 1);
          }}
          disabled={!table.getCanPreviousPage()}
          className={`${!table.getCanPreviousPage() ? "bg-white text-[#014C46]" : "bg-[#014C46] text-white"} h-[40px] rounded-tl-[4px] rounded-bl-[4px] rounded-tr-none rounded-br-none`}
        >
          Previous
        </Button>
        <Button variant="outline" size="sm" className="rounded-none h-[40px] w-[40px] text-[#014C46] text-sm font-medium">
          {page || 1}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            table.nextPage();
            setPage(page + 1);
          }}
          disabled={!table.getCanNextPage()}
          className={`${!table.getCanNextPage() ? "bg-white text-[#014C46]" : "bg-[#014C46] text-white"} h-[40px] rounded-tr-[4px] rounded-br-[4px] rounded-tl-none rounded-bl-none`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
