import React from "react";
import { useGetAllBooks } from "@/hooks/use-get-all-books";
import { Controller, useFormContext } from "react-hook-form";
import { UpdateUserFormValues } from "@/helpers/admin/users/form";
import { MultiSelectDropdown } from "@/components/multi-select-dropdown";
import { mapBooksToOptions } from "@/helpers/admin/options";

interface Props {
  label: string;
}

export const AssignBooksField: React.FC<Props> = ({ label }) => {
  const { books, loading, hasNextPage, fetchMore, filterBooks } =
    useGetAllBooks();

  const { control } = useFormContext<UpdateUserFormValues>();

  if (!books) return null;

  return (
    <div>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <Controller
        control={control}
        name="assignedBookIds"
        render={({ field }) => (
          <MultiSelectDropdown
            options={mapBooksToOptions(books, true)}
            hasNext={hasNextPage}
            loading={loading}
            loadNext={fetchMore}
            onSearch={(term) =>
              filterBooks?.({
                name: term,
              })
            }
            {...field}
          />
        )}
      />
    </div>
  );
};
