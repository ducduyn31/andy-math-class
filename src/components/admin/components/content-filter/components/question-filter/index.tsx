import React, { useMemo } from "react";
import { SelectFilterField } from "@/components/admin/components/content-filter/shared/select-filter-field";
import { Controller, useForm } from "react-hook-form";
import {
  buildQuestionFilters,
  FilterQuestionFormValues,
  mapFilterToQuestionFormValues,
} from "@/helpers/admin/filter/question-filter/form";
import { mapBooksToOptions } from "@/helpers/admin/filter/user-filter/options";
import { useAdminContext } from "@/hooks/use-admin-context";
import { mapChaptersToOptions } from "@/helpers/admin/filter/question-filter/options";
import { useFilter } from "@/hooks/use-filter-context";
import { useEffectOnceLoad } from "@/hooks/use-effect-once-load";

export const FilterQuestion: React.FC = () => {
  const { books } = useAdminContext();
  const { applyFilters, setPageNumber, currentFilter } = useFilter("question");
  const { control, reset, watch, handleSubmit } =
    useForm<FilterQuestionFormValues>({
      defaultValues: {
        book: "any",
        chapter: "any",
      },
    });

  useEffectOnceLoad(() => {
    reset(mapFilterToQuestionFormValues(currentFilter));
  }, [currentFilter]);

  const clearFilter = () => {
    reset({});
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
      <Controller
        name="book"
        control={control}
        render={({ field }) => (
          <SelectFilterField
            label="Filter by book"
            options={mapBooksToOptions(books)}
            {...field}
          />
        )}
      />
      <Controller
        name="chapter"
        control={control}
        render={({ field }) => (
          <SelectFilterField
            label="Filter by chapter"
            options={mapChaptersToOptions(chaptersOfSelectedBook)}
            {...field}
          />
        )}
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
