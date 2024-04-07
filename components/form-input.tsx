import { ComponentPropsWithRef } from "react";

interface FormInputProps extends ComponentPropsWithRef<"input"> {
  errors?: string[];
}
export default function FormInput({ errors = [], ...rest }: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md w-full h-10 focus:outline ring-1 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        {...rest}
      />
      {errors.map((error, index) => {
        return (
          <span key={index} className="text-red-500 font-medium">
            {error}
          </span>
        );
      })}
    </div>
  );
}
