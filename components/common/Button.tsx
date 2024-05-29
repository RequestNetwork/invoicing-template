import React from "react";

interface ButtonProps {
  text: string;
  color?: string;
  padding?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: {
    class: string;
    style: React.CSSProperties;
  };
  type?: "button" | "submit" | "reset";
}

const Button = ({
  text,
  color = "bg-green",
  padding = "px-[28px] py-[8px]",
  onClick,
  disabled = false,
  className = "",
  icon,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-[10px] disabled:cursor-not-allowed disabled:bg-grey disabled:text-dark-grey text-white rounded-[8px] hover:bg-dark-green transition-all text-[14px] ${className} ${color} ${padding}`}
    >
      {icon && <i className={icon.class} style={icon.style}></i>}
      {text}
    </button>
  );
};

export default Button;
