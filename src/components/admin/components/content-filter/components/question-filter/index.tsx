import React, { useMemo } from "react";
import { SelectFilterField } from "@/components/admin/components/content-filter/shared/select-filter-field";
import { useForm } from "react-hook-form";
import {
  buildQuestionFilters,
  FilterQuestionFormValues,
} from "@/helpers/admin/filter/question-filter/form";
import { useFilter } from "@/hooks/use-filter-context";
import { mapBooksToOptions } from "@/helpers/admin/filter/user-filter/options";
import { useAdminContext } from "@/hooks/use-admin-context";
import { mapChaptersToOptions } from "@/helpers/admin/filter/question-filter/options";

export const FilterQuestion: React.FC = () => {
  const { books } = useAdminContext();
  const { register, reset, watch, handleSubmit } =
    useForm<FilterQuestionFormValues>({
      defaultValues: {
        book: "any",
        chapter: "any",
      },
    });
  const { applyFilters, setPageNumber } = useFilter("question");

  const clearFilter = () => {
    reset();
    applyFilters(null);
    setPageNumber(1);
  };

  const selectedBookId = watch("book");
  const chaptersOfSelectedBook = useMemo(() => {
    if (!selectedBookId) return [];
    return books.flatMap((book) => {
      if (book.id === selectedBookId) return book.chapters;
      return [];
    });
  }, [books, selectedBookId]);

  return (
    <form
      className="menu bg-base-100 w-70 p-3 pt-0 rounded-box shadow-xl mt-5"
      onSubmit={handleSubmit((values) => {
        applyFilters(buildQuestionFilters(values));
        setPageNumber(1);
      })}
    >
      <SelectFilterField
        label="Filter by book"
        options={mapBooksToOptions(books)}
        {...register("book")}
      />
      <SelectFilterField
        label="Filter by chapter"
        options={mapChaptersToOptions(chaptersOfSelectedBook)}
        {...register("chapter")}
      />
      <div className={"flex mt-5 flex-col lg:flex-row md:justify-end"}>
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
  );
};
