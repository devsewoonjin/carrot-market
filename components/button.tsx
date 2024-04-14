"use client";
import { ComponentPropsWithRef } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
export default function Button({
  className,
  disabled,
  children,

  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`primary-btn disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed ${className}`}
      disabled={pending}
    >
      {pending ? "로딩중" : children}
    </button>
  );
}
