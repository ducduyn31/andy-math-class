import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FilterUserFormValues } from "@/helpers/admin/filter/user-filter/form";
import { TextFilterField } from "@/components/text-filter-field";
import { getUserStatusOptions } from "@/helpers/admin/options";
import { SelectableOption, SelectOptions } from "@/helpers/form";
import { FormSelectDropdown } from "@/components/form-select-dropdown";
import { useUsersContext } from "@/components/admin/table/users-table/components/users-provider";

interface Props {}

export const UsersFilter: React.FC<Props> = ({}) => {
  const { filterUsers } = useUsersContext();
  const { control, handleSubmit, reset } = useForm<FilterUserFormValues>({
    defaultValues: {
      email: "",
      status: SelectOptions.ANY_DEFAULT,
    },
  });

  const clearFilters = () => {
    reset({
      email: "",
      status: SelectOptions.ANY_DEFAULT,
    });
    filterUsers?.();
  };
  return (
    <div
      className="collapse collapse-arrow bg-base-100 rounded-box shadow-xl"
      data-testid="filter"
    >
      <input type="checkbox" className="peer" />
      <p className="font-semibold collapse-title">Filter Users</p>
      <form
        className="collapse-content"
        onSubmit={handleSubmit((values) => {
          filterUsers?.({
            email: values.email,
            status:
              values.status === SelectOptions.ANY_DEFAULT
                ? null
                : (values.status as SelectableOption).value === "true",
          });
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
          name="status"
          render={({ field }) => (
            <FormSelectDropdown
              label="Filter by user status"
              size="sm"
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
    </div>
  );
};
