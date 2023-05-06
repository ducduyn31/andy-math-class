import { filteredInputInitial, SharedContext } from "@/layout/AdminLayout";
import { bookDatabase } from "@/components/admin/table/books-table";
import { useRef, useState } from "react";

export const FilterUser = ({
  setFilteredInput,
  filteredUsers,
}: {
  setFilteredInput: any;
  filteredUsers: any;
}) => {
  const filterBook = useRef<HTMLSelectElement>(null);
  const filterEmail = useRef<HTMLInputElement>(null);
  const filterStatus = useRef<HTMLSelectElement>(null);

  const [localFilter, setLocalFilter] =
    useState<SharedContext["filteredInput"]["filteredUsers"]>(filteredUsers);
  const filterInput = () => {
    setLocalFilter(
      (prevState: SharedContext["filteredInput"]["filteredUsers"]) => {
        return {
          ...prevState,
          isFiltering: true,
          email: filterEmail.current!.value,
          book: filterBook.current!.value,
          enabled: filterStatus.current!.value,
        };
      }
    );
  };

  const clearFilter = () => {
    filterEmail.current!.value = "";
    filterBook.current!.value = "any";
    filterStatus.current!.value = "any";

    setLocalFilter(
      (prevState: SharedContext["filteredInput"]["filteredUsers"]) => {
        return {
          ...prevState,
          ...filteredInputInitial.filteredUsers,
        };
      }
    );

    setFilteredInput((prevState: SharedContext["filteredInput"]) => {
      return {
        ...prevState,
        filteredUsers: filteredInputInitial.filteredUsers,
      };
    });
  };
  const handleFilter = () => {
    setFilteredInput((prevState: SharedContext["filteredInput"]) => {
      return {
        ...prevState,
        filteredUsers: localFilter,
      };
    });
  };

  return (
    <div className="menu bg-base-100 w-70 p-3 pt-0 rounded-box shadow-xl mt-5">
      <label className="label">
        <span className="label-text">Filter by email</span>
      </label>
      <input
        type="text"
        placeholder="Search by email"
        className="input w-full input-sm input-bordered"
        ref={filterEmail}
        onChange={filterInput}
        defaultValue={filteredUsers.email}
      />

      <label className={"label"}>
        <span className={"label-text"}>Filter by assigned book</span>
      </label>
      <select
        className="select select-bordered select-sm w-full"
        onChange={filterInput}
        ref={filterBook}
        defaultValue={filteredUsers.book}
      >
        <option defaultChecked={true} value={"any"}>
          Any
        </option>

        <option value={"notAssigned"}>No book assigned</option>
        <option disabled>──────────</option>

        {bookDatabase.map((book, i) => (
          <option key={i} value={book.name.toLowerCase()}>
            {book.name}
          </option>
        ))}
      </select>

      <label className={"label"}>
        <span className={"label-text"}>Filter by user status</span>
      </label>

      <select
        className="select select-bordered select-sm w-full"
        onChange={filterInput}
        ref={filterStatus}
        defaultValue={filteredUsers.enabled}
      >
        <option defaultChecked={true} value={"any"}>
          Any
        </option>
        <option disabled>──────────</option>
        <option value={"true"}>Enabled</option>
        <option value={"false"}>Disabled</option>
      </select>

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