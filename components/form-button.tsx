import { ComponentPropsWithRef } from "react";

interface FormButtonProps extends ComponentPropsWithRef<"button"> {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}
export default function FormButton({
  className,
  children,
  isLoading,
  ...rest
}: FormButtonProps) {
  return (
    <button
      className={`primary-btn disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? "로딩중" : children}
    </button>
  );
}
