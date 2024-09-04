import React from "react";

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div>
      <p className="my-6 text-regular text-center">
        {title} <span className="text-bold mt-2 text-[#0D062D] text-center">{subtitle}</span>
      </p>
    </div>
  );
};

export default AuthHeader;
