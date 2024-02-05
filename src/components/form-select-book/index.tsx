import React from "react";
import { FormSelectDropdown } from "@/components/form-select-dropdown";
import { useGetAllBooks } from "@/hooks/use-get-all-books";
import { mapBooksToOptions } from "@/helpers/admin/options";
import { ControllerRenderProps } from "react-hook-form";

interface Props extends ControllerRenderProps {
  label: string;
  size?: "sm" | "md" | "lg";
}

export const FormSelectBook: React.FC<Props> = ({
  label,
  size = "sm",
  ...rest
}) => {
  const { books, hasNextPage, fetchMore, loading } = useGetAllBooks();

  return (
    <div data-testid="book-select">
      <FormSelectDropdown
        label={label}
        options={mapBooksToOptions(books)}
        hasNext={hasNextPage}
        loading={loading}
        loadNext={fetchMore}
        size={size}
        {...rest}
      />
    </div>
  );
};
