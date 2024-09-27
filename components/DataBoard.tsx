import React, { useState } from "react";
import Search from "./Search";
import DataTrigger from "./DataTrigger";
import OrderCard from "./OrderCard";
import UserCard from "./UserCard";
import PartnerCard from "./PartnerCard";
interface DataBoardProps {
  value: string;
  data: (Order | User | Product | Partner)[];
  pageType: string;
}

const DataBoard = ({ value, data, pageType }: DataBoardProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = (item: Order | User | Product | Partner) => {
    const searchLower = searchTerm.toLowerCase();
    switch (pageType) {
      case "redeem":
        const order = item as Order;
        return order.product.name.toLowerCase().includes(searchLower) || order.product.type.toLowerCase().includes(searchLower);
      case "user":
        const user = item as User;
        return user.username.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower);
      case "product":
        const product = item as Product;
        return product.name.toLowerCase().includes(searchLower) || product.categories.toLowerCase().includes(searchLower);
      case "partner":
        const partner = item as Partner;
        return partner.name.toLowerCase().includes(searchLower) || partner.email.toLowerCase().includes(searchLower);
      default:
        return [];
    }
  };

  const filteredData = data.filter(filterData);

  const renderCards = () => {
    switch (pageType) {
      case "redeem":
        const orderStatus = ["received", "processing", "booking", "canceled", "voucher", "refunded"];
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {orderStatus.map((status) => {
              const orders = (filteredData as Order[]).filter((order) => order.status === status);
              return <OrderCard key={status} orders={orders} status={status} />;
            })}
          </div>
        );
      case "user":
        const userStatus = ["active", "block"];
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userStatus.map((status) => {
              const users = (filteredData as User[]).filter((user) => user.status === status);
              return <UserCard key={status} users={users} status={status} />;
            })}
          </div>
        );
      // case "product":
      // return (
      //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      //     {(filteredData as Product[]).map((product) => (
      //       <ProductCard key={product.name} product={product} />
      //     ))}
      //   </div>
      // );
      case "partner":
        const partnerTypes = ["email", "phone", "website", "social media"];
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {partnerTypes.map((type) => {
              const partners = (filteredData as Partner[]).filter((partner) => partner.type === type);
              return <PartnerCard key={type} partners={partners} type={type} />;
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between w-full gap-2 items-center">
        <Search value={searchTerm} onChange={setSearchTerm} />
        <DataTrigger value={value} />
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-6">{renderCards()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBoard;
