import { TextFilterField } from "../../shared/text-filter-field";
import { SelectFilterField } from "../../shared/select-filter-field";
import { useForm } from "react-hook-form";
import {
  buildUserFilters,
  FilterUserFormValues,
} from "@/helpers/admin/filter/user-filter/form";
import { useAdminContext } from "@/hooks/use-admin-context";
import {
  getUserStatusOptions,
  mapBooksToOptions,
} from "@/helpers/admin/filter/user-filter/options";
import { useFilter } from "@/hooks/use-filter-context";

export const FilterUser = () => {
  const { books } = useAdminContext();
  const { applyFilters, setPageNumber } = useFilter("user");
  const { handleSubmit, register, reset } = useForm<FilterUserFormValues>({
    defaultValues: {
      email: null,
      book: "any",
      status: "any",
    },
  });

  const clearFilters = () => {
    reset();
    applyFilters(null);
    setPageNumber(1);
  };

  return (
    <form
      className="menu bg-base-100 w-70 p-3 pt-0 rounded-box shadow-xl mt-5"
      onSubmit={handleSubmit((values) => {
        applyFilters(buildUserFilters(values));
        setPageNumber(1);
      })}
    >
      <TextFilterField
        label="Filter by email"
        placeholder="Search by email"
        {...register("email")}
      />
      <SelectFilterField
        label="Filter by assigned book"
        options={mapBooksToOptions(books)}
        {...register("book")}
      />
      <SelectFilterField
        label="Filter by user status"
        options={getUserStatusOptions()}
        {...register("status")}
      />

      <div className="flex mt-5 flex-col lg:flex-row md:justify-end">
        <button
          className="btn btn-secondary lg:mr-2 mb-2 lg:mb-0"
          type="button"
          onClick={clearFilters}
        >
          Clear filter
        </button>
        <button className="btn btn-primary" type="submit">
          Filter
        </button>
      </div>
    </form>
  );
};
