import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: (value: string) => void;
  placeholder: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ placeholder, setValue, ...props }, ref) => {
    return (
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <input
            ref={ref}
            placeholder={placeholder}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-10 placeholder:text-[#60758a] p-4 text-base font-normal leading-normal"
            onChange={e => setValue(e.target.value)}
            {...props}
          />
        </label>
      </div>
    );
  }
);