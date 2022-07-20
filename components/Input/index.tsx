import { ChangeEvent } from "react";

interface Props {
  id: string;
  label?: string;
  className?: string;
  type: "text" | "number" | "search";
  onChange: ((e: ChangeEvent<HTMLInputElement>) => void) | (() => void);
  [x: string]: any;
}

export default function Input({
  id,
  label,
  className,
  type,
  onChange,
  ...rest
}: Props) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={`border border-slate-300 focus:border-sky-500 placeholder-slate-400 rounded-md shadow-sm ${className}`}
        type={type}
        onChange={onChange}
        {...rest}
      />
    </>
  );
}
