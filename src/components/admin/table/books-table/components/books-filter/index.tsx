import React from "react";
import { FilterBookFormValues } from "@/helpers/admin/filter/book-filter/form";
import { Controller, useForm } from "react-hook-form";
import { TextFilterField } from "@/components/text-filter-field";
import { useBooksContext } from "@/components/admin/table/books-table/components/books-provider";

interface Props {}

export const BooksFilter: React.FC<Props> = () => {
  const { filterBooks } = useBooksContext();
  const { control, reset, handleSubmit } = useForm<FilterBookFormValues>({
    defaultValues: {
      title: "",
    },
  });

  const clearFilter = () => {
    reset();
    filterBooks?.();
  };

  return (
    <div
      className="collapse collapse-arrow bg-base-100 rounded-box shadow-xl"
      data-testid="filter"
    >
      <input type="checkbox" className="peer" />
      <p className="font-semibold collapse-title">Filter Books</p>
      <form
        className="collapse-content"
        onSubmit={handleSubmit((values) => {
          if (!values.title) return;
          filterBooks?.({
            name: values.title,
          });
        })}
      >
        <Controller
          control={control}
          render={({ field }) => (
            <TextFilterField
              label="Filter by title"
              placeholder="Search by book name"
              {...field}
            />
          )}
          name="title"
        />

        <div className="flex flex-col lg:flex-row md:justify-end mt-3">
          <button
            type="button"
            className="btn btn-secondary lg:mr-2 mb-2 lg:mb-0"
            onClick={clearFilter}
          >
            Clear filter
          </button>
          <button type="submit" className="btn btn-primary">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};
