import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const TodoList = ({ children, className }: Props) => {
  return <ul className={className}>{children}</ul>;
};

export default TodoList;
