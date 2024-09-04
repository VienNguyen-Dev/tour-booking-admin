import React from "react";

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="header-2 text-[#0D062D] capitalize mb-2">{title}</h2>
      <h1 className="header uppercase text-[#014C46]">{subtitle}</h1>
    </div>
  );
};

export default Header;
