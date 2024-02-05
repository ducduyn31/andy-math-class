import React from "react";
import { DropdownSection } from "@/components/multi-select-dropdown/components/dropdown-section";
import { DropdownProvider } from "@/components/multi-select-dropdown/components/dropdown-provider";
import { DisplayInput } from "@/components/multi-select-dropdown/components/display-input";
import { SelectOption } from "@/helpers/form";
import { ControllerRenderProps } from "react-hook-form";

interface Props extends ControllerRenderProps {
  options: SelectOption[];
  placeholder?: string;
  hasNext?: boolean;
  loading?: boolean;
  loadNext?: () => Promise<void>;
  onSearch?: (searchTerm: string) => Promise<void> | void;
}

export const MultiSelectDropdown: React.FC<Props> = (props) => {
  return (
    <DropdownProvider {...props}>
      <div className="dropdown dropdown-bottom w-full">
        <DisplayInput />
        <DropdownSection />
      </div>
    </DropdownProvider>
  );
};
