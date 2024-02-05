import React, { useEffect, useMemo } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { isSelectableOption, SelectOption } from "@/helpers/form";
import { FormSelectDropdown } from "@/components/form-select-dropdown";
import { mapChaptersToOptions } from "@/helpers/admin/options";
import { useGetAllBooks } from "@/hooks/use-get-all-books";

interface Props extends ControllerRenderProps {
  label: string;
  size?: "sm" | "md" | "lg";
  bookSelection?: SelectOption;
}

export const FormSelectChapter: React.FC<Props> = ({
  label,
  bookSelection,
  size = "sm",
  ...rest
}) => {
  const {
    books: resultBooks,
    loading,
    filterBooks,
  } = useGetAllBooks({ lazy: true });

  useEffect(() => {
    if (bookSelection && isSelectableOption(bookSelection)) {
      filterBooks({
        ids: [bookSelection.value],
      });
    }
  }, [bookSelection]);

  const chapters = useMemo(() => {
    if (!bookSelection || !isSelectableOption(bookSelection) || !resultBooks) {
      return [];
    }

    return resultBooks.map((book) => book.chapters).flat();
  }, [resultBooks, bookSelection]);

  return (
    <div data-testid="chapter-select">
      <FormSelectDropdown
        label={label}
        options={mapChaptersToOptions(chapters)}
        loading={loading}
        size={size}
        {...rest}
      />
    </div>
  );
};
