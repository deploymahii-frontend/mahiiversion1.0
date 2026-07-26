import React from "react";
import clsx from "clsx";

const Card = ({
  children,
  hover = true,
  padding = "md",
  shadow = "md",
  border = true,
  className = "",
  onClick,
}) => {
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-xl",
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-white rounded-2xl transition-all duration-300",
        paddings[padding],
        shadows[shadow],
        border && "border border-slate-200",
        hover && "hover:-translate-y-1 hover:shadow-xl cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
