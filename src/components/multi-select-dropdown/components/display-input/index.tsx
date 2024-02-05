import React from "react";
import { useDropdownContext } from "@/components/multi-select-dropdown/components/dropdown-provider";
import { isSelectableOption } from "@/helpers/form";

interface Props {}

export const DisplayInput: React.FC<Props> = ({}) => {
  const { setShowDropdown, selectedOptions } = useDropdownContext();

  const text =
    selectedOptions
      ?.map((opt) => {
        if (isSelectableOption(opt)) return opt.label;
      })
      ?.join(", ") || "None";

  return (
    <button
      type="button"
      className="input input-bordered w-full cursor-pointer truncate text-left"
      onClick={() => setShowDropdown(true)}
    >
      {text}
    </button>
  );
};
