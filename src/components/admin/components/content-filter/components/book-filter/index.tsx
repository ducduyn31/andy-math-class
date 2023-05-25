import { TextFilterField } from "@/components/admin/components/content-filter/shared/text-filter-field";
import { useForm } from "react-hook-form";
import {
  buildBookFilters,
  FilterBookFormValues,
} from "@/helpers/admin/filter/book-filter/form";
import { useFilter } from "@/hooks/use-filter-context";

export const FilterBook = () => {
  const { register, reset, handleSubmit } = useForm<FilterBookFormValues>({
    defaultValues: {
      title: null,
    },
  });
  const { applyFilters, setPageNumber } = useFilter("book");

  const clearFilter = () => {
    reset();
    applyFilters(null);
    setPageNumber(1);
  };

  return (
    <form
      className="menu bg-base-100 w-70 p-3 pt-0 rounded-box shadow-xl mt-5"
      onSubmit={handleSubmit((values) => {
        applyFilters(buildBookFilters(values));
        setPageNumber(1);
      })}
    >
      <TextFilterField
        label="Filter by book"
        placeholder="Search by book name"
        {...register("title")}
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
