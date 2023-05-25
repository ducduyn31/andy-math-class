import React from "react";

interface Props {
  label: string;
  placeholder?: string;
}

export const TextFilterField = React.forwardRef<HTMLInputElement, Props>(
  function TextField({ label, placeholder, ...rest }, ref) {
    return (
      <div>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type="text"
          placeholder={placeholder}
          className="input w-full input-sm input-bordered"
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);
