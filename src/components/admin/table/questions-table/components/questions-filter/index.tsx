import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FilterQuestionFormValues } from "@/helpers/admin/filter/question-filter/form";
import { isSelectableOption, SelectOptions } from "@/helpers/form";
import { useQuestionsContext } from "@/components/admin/table/questions-table/components/questions-provider";
import { FormSelectBook } from "@/components/form-select-book";
import { FormSelectChapter } from "@/components/form-select-chapter";

interface Props {}

export const QuestionsFilter: React.FC<Props> = () => {
  const { filterQuestions } = useQuestionsContext();
  const { control, reset, watch, handleSubmit, setValue } =
    useForm<FilterQuestionFormValues>({
      defaultValues: {
        book: SelectOptions.ANY_DEFAULT,
        chapter: SelectOptions.ANY_DEFAULT,
      },
    });
  const clearFilters = () => {
    reset();
    filterQuestions?.();
  };

  useEffect(() => {
    setValue("chapter", SelectOptions.ANY_DEFAULT);
  }, [setValue, watch("book")]);

  return (
    <div
      className="collapse collapse-arrow bg-base-100 rounded-box shadow-xl"
      data-testid="filter"
    >
      <input type="checkbox" className="peer" />
      <p className="font-semibold collapse-title">Filter Questions</p>
      <form
        className="collapse-content"
        onSubmit={handleSubmit((values) => {
          filterQuestions?.({
            bookId: isSelectableOption(values.book) ? values.book.value : null,
            chapterId: isSelectableOption(values.chapter)
              ? values.chapter.value
              : null,
          });
        })}
      >
        <Controller
          name="book"
          control={control}
          render={({ field }) => (
            <FormSelectBook label="Filter by book" {...field} />
          )}
        />
        <Controller
          name="chapter"
          control={control}
          render={({ field }) => (
            <FormSelectChapter
              label="Filter by chapter"
              bookSelection={watch("book")}
              {...field}
            />
          )}
        />

        <div className={"flex mt-5 flex-col lg:flex-row md:justify-end"}>
          <button
            type="button"
            className="btn btn-secondary lg:mr-2 mb-2 lg:mb-0"
            onClick={clearFilters}
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
