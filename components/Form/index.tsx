import { ReactNode, FormEvent } from "react";

interface Props {
  children: ReactNode;
  onSubmit?: (e: FormEvent) => void;
  className?: string;
}
const Form = ({ children, onSubmit, className }: Props) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default Form;
