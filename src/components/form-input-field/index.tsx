import React, { forwardRef } from "react";
import { Maybe } from "@/models/types";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: Maybe<string>;
  inline?: boolean;
}

export const FormInputField = forwardRef<HTMLInputElement, Props>(
  function FormInputField(
    { label, type, errorMessage, inline, ...props },
    ref
  ) {
    return (
      <div className={inline ? "flex flex-row items-center gap-x-2" : ""}>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type={type}
          placeholder="Type here"
          className="input input-bordered"
          {...props}
          ref={ref}
        />
        {errorMessage && (
          <span className="text-xs text-error mt-1">{errorMessage}</span>
        )}
      </div>
    );
  }
);
