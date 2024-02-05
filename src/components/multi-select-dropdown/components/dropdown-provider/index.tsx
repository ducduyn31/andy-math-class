import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useDebounce } from "react-use";
import { DispatchEventArgs } from "@/components/admin/table/users-table/components/user-edit/components/assign-books-field/types";
import { ControllerRenderProps } from "react-hook-form";
import {
  isSelectableOption,
  SelectableOption,
  SelectOption,
} from "@/helpers/form";

type DropdownContextType = {
  showDropdown: boolean;
  options: SelectOption[];
  selectedOptions: SelectOption[];
  selectedOptionsSet: Set<string>;
  setShowDropdown: (show: boolean) => void;
  hasNext?: boolean;
  loading?: boolean;
  loadNext?: () => Promise<void>;
  searchTerm?: string;
  setSearchTerm?: (searchTerm: string) => void;
  dispatchSelectEvent: (args: DispatchEventArgs) => void;
};

const defaultDropdownContext: DropdownContextType = {
  options: [],
  selectedOptions: [],
  selectedOptionsSet: new Set(),
  showDropdown: false,
  setShowDropdown: () => {},
  hasNext: true,
  loading: false,
  dispatchSelectEvent: () => {},
};

const DropdownContext = createContext<DropdownContextType>(
  defaultDropdownContext
);

interface Props extends PropsWithChildren, ControllerRenderProps {
  options: SelectOption[];
  hasNext?: boolean;
  loading?: boolean;
  loadNext?: () => Promise<void>;
  onSearch?: (searchTerm: string) => Promise<void> | void;
}

export const DropdownProvider: React.FC<Props> = ({
  children,
  loadNext,
  loading,
  hasNext,
  options,
  onSearch,
  value,
  onChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedOptionsSet = useMemo(() => {
    const set = new Set<string>();
    value?.forEach((option: SelectOption) => {
      if (isSelectableOption(option)) {
        set.add(option.uniqueKey);
      }
    });
    return set;
  }, [value]);

  useDebounce(
    () => {
      onSearch?.(searchTerm);
    },
    500,
    [searchTerm]
  );

  const dispatchSelectEvent = useCallback(
    ({ selectedOption, type }: DispatchEventArgs) => {
      if (type === "select") {
        onChange?.([...(value || []), selectedOption]);
      } else {
        const newValue = value?.filter(
          (opt: SelectableOption) =>
            opt.uniqueKey !== (selectedOption as SelectableOption).uniqueKey
        );
        onChange?.(newValue);
      }
    },
    [onChange, value]
  );

  return (
    <DropdownContext.Provider
      value={{
        options,
        selectedOptions: value,
        selectedOptionsSet,
        showDropdown,
        setShowDropdown,
        hasNext,
        loading,
        loadNext,
        searchTerm,
        setSearchTerm,
        dispatchSelectEvent,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdownContext = () => React.useContext(DropdownContext);
