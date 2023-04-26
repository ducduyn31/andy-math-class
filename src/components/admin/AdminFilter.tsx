import FilterUser from "@/components/admin/FilterUser";
import FilterBook from "@/components/admin/FilterBook";
import { useState } from "react";
import FilterQuestion from "@/components/admin/FilterQuestion";

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
      case 2:
        return (
          <FilterQuestion
            setFilteredInput={setFilterInput}
            filteredQuestions={filteredInput.filteredQuestion}
          />
        );
    }
  };

  return <>{render()}</>;
};

export default AdminFilter;
