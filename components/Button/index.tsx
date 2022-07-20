import { ReactNode } from "react";

type TButtonColors = "primary" | "error" | "success";
type TButtonRounded = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface Props {
  type: "button" | "submit";
  children: ReactNode;
  color?: TButtonColors;
  rounded?: TButtonRounded;
  className?: string;
  onClick?: () => void;
  [x: string]: any;
}

const buttonColors = {
  primary: "bg-red-500 hover:bg-red-600 active:bg-red-700",
  error: "bg-red-500 hover:bg-red-600 active:bg-red-700",
  success: "bg-green-500 hover:bg-green-600 active:bg-green-700",
};

const buttonRounded = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

export default function Button({
  type = "button",
  color = "primary",
  rounded = "sm",
  className,
  children,
  onClick,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={`${className} 
      ${buttonColors[color]}
      ${buttonRounded[rounded]}
      `}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
