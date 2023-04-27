import { ChangeEvent, useRef, useState } from "react";
import { filteredInputInitial, SharedContext } from "@/layout/AdminLayout";

interface PropType {
  setFilteredInput: any;
  filteredBooks: any;
}

const FilterBook = ({ setFilteredInput, filteredBooks }: PropType) => {
  const bookFilterInputRef = useRef<HTMLInputElement>(null);
  const [localFilterValue, setLocalFilterValue] =
    useState<SharedContext["filteredInput"]["filteredBooks"]>(filteredBooks);

  const handleLocalFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalFilterValue(
      (prevState): SharedContext["filteredInput"]["filteredBooks"] => {
        return {
          ...prevState,
          isFiltering: true,
          name: event.target.value,
        };
      }
    );
  };
  const handleFilter = () => {
    setFilteredInput(
      (prevState: SharedContext["filteredInput"]["filteredBooks"]) => {
        return {
          ...prevState,
          filteredBooks: localFilterValue,
        };
      }
    );
  };

  const clearFilter = () => {
    setLocalFilterValue((prevState) => {
      return {
        ...prevState,
        ...filteredInputInitial.filteredBooks,
      };
    });

    setFilteredInput((prevState: SharedContext["filteredInput"]) => {
      return {
        ...prevState,
        filteredBooks: filteredInputInitial.filteredBooks,
      };
    });
  };

  return (
    <div className="menu bg-base-100 w-70 p-3 pt-0 rounded-box shadow-xl mt-5">
      <label className="label">
        <span className="label-text">Filter by book name</span>
      </label>
      <input
        type="text"
        placeholder="Search by book name"
        className="input w-full input-sm input-bordered"
        ref={bookFilterInputRef}
        onChange={handleLocalFilter}
        defaultValue={localFilterValue?.name}
      />

      <div className={"flex mt-5 flex-col lg:flex-row md:justify-end"}>
        <button
          className="btn btn-secondary lg:mr-2 mb-2 lg:mb-0"
          onClick={clearFilter}
        >
          Clear filter
        </button>
        <button className="btn btn-primary" onClick={handleFilter}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBook;
