import FilterUser from "@/components/admin/FilterUser";
import FilterBook from "@/components/admin/FilterBook";
import { useState } from "react";

interface PropType {
  setFilterInput: any;
  currentMenu: number;
  filteredInput: any;
}
const AdminFilter: React.FC<PropType> = ({
  setFilterInput,
  currentMenu,
  filteredInput,
}) => {
  const render = () => {
    switch (currentMenu) {
      case 0:
        return (
          <FilterUser
            setFilteredInput={setFilterInput}
            filteredUsers={filteredInput.filteredUsers}
          />
        );
      case 1:
        return (
          <FilterBook
            setFilteredInput={setFilterInput}
            filteredBooks={filteredInput.filteredBooks}
          />
        );
    }
  };

  return <>{render()}</>;
};

export default AdminFilter;
