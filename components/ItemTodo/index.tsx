import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const ItemTodo = ({ children, className }: Props) => {
  return (
    <li className={`flex justify-between items-center ${className}`}>
      {children}
    </li>
  );
};

export default ItemTodo;
