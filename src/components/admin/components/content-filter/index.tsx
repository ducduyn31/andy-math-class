import { FilterUser } from "@/components/admin/components/content-filter/components/user-filter";
import { FilterBook } from "@/components/admin/components/content-filter/components/book-filter";
import { FilterQuestion } from "@/components/admin/components/content-filter/components/question-filter";
import { useRouter } from "next/router";
import { matchPath } from "@/helpers/path";

interface PropType {
  setFilterInput: any;
  filteredInput: any;
}

export const AdminFilter: React.FC<PropType> = ({
  setFilterInput,
  filteredInput,
}) => {
  const router = useRouter();
  const path = router.asPath;

  if (matchPath(path, "/admin/users")) {
    return (
      <FilterUser
        setFilteredInput={setFilterInput}
        filteredUsers={filteredInput.filteredUsers}
      />
    );
  }

  if (matchPath(path, "/admin/books")) {
    return (
      <FilterBook
        setFilteredInput={setFilterInput}
        filteredBooks={filteredInput.filteredBooks}
      />
    );
  }

  if (matchPath(path, "/admin/questions")) {
    return (
      <FilterQuestion
        setFilteredInput={setFilterInput}
        filteredQuestions={filteredInput.filteredQuestion}
      />
    );
  }
  return null;
};
