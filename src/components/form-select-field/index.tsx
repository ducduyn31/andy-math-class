import React, { forwardRef } from "react";

export interface Optionable {
  value: any;
  label: string;
  id: string;
}

interface Props {
  label: string;
  errorMessage?: string;
  options?: Optionable[];
}

export const FormSelectField = forwardRef<HTMLSelectElement, Props>(
  function FormSelectField({ label, errorMessage, options, ...rest }, ref) {
    return (
      <>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <select className="select select-bordered" {...rest} ref={ref}>
          {options?.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <span className="text-xs text-error mt-1">{errorMessage}</span>
        )}
      </>
    );
  }
);
