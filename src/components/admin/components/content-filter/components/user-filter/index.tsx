import { TextFilterField } from "../../shared/text-filter-field";
import { SelectFilterField } from "../../shared/select-filter-field";
import { Controller, useForm } from "react-hook-form";
import {
  buildUserFilters,
  FilterUserFormValues,
  mapFilterToUserFormValues,
} from "@/helpers/admin/filter/user-filter/form";
import { useAdminContext } from "@/hooks/use-admin-context";
import {
  getUserStatusOptions,
  mapBooksToOptions,
} from "@/helpers/admin/filter/user-filter/options";
import { useFilter } from "@/hooks/use-filter-context";
import { useEffectOnceLoad } from "@/hooks/use-effect-once-load";

export const FilterUser = () => {
  const { books } = useAdminContext();
  const { applyFilters, setPageNumber, currentFilter } = useFilter("user");
  const { control, handleSubmit, reset } = useForm<FilterUserFormValues>({
    defaultValues: {
      email: "",
      book: "any",
      status: "any",
    },
  });

  useEffectOnceLoad(() => {
    reset(mapFilterToUserFormValues(currentFilter));
  }, [currentFilter]);

  const clearFilters = () => {
    reset({
      email: "",
      book: "any",
      status: "any",
    });
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
      <Controller
        control={control}
        render={({ field }) => (
          <TextFilterField
            label="Filter by email"
            placeholder="Search by email"
            {...field}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        name="book"
        render={({ field }) => (
          <SelectFilterField
            label="Filter by assigned book"
            options={mapBooksToOptions(books)}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <SelectFilterField
            label="Filter by user status"
            options={getUserStatusOptions()}
            {...field}
          />
        )}
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
