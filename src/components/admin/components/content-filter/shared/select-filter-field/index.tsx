import React from "react";
import { switchCaseReturn } from "@/helpers/array";

interface SelectableOption {
  value: any;
  label: string;
  isDefault?: boolean;
}

export enum SelectOptions {
  ANY_DEFAULT,
  DISABLED,
}

export type SelectOption = SelectableOption | SelectOptions;

interface Props {
  label: string;
  options: SelectOption[];
}

export const SelectFilterField = React.forwardRef<HTMLSelectElement, Props>(
  function SelectField({ label, options, ...rest }, ref) {
    return (
      <div>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <select
          className="select select-bordered select-sm w-full"
          ref={ref}
          {...rest}
        >
          {options.map((option) =>
            switchCaseReturn(
              option,
              {
                case: SelectOptions.ANY_DEFAULT,
                return: (
                  <option value="any" defaultChecked>
                    Any
                  </option>
                ),
              },
              {
                case: SelectOptions.DISABLED,
                return: <option disabled>──────────</option>,
              },
              {
                case: null,
                return: (opt) => (
                  <option
                    key={(opt as SelectableOption).value}
                    value={(opt as SelectableOption).value}
                    defaultChecked={(opt as SelectableOption).isDefault}
                  >
                    {(opt as SelectableOption).label}
                  </option>
                ),
              }
            )
          )}
        </select>
      </div>
    );
  }
);
