import { bookDatabase } from "@/components/admin/Table/AdminBookTable";
import React, { useState } from "react";
import { filteredInputInitial, SharedContext } from "@/layout/AdminLayout";
interface PropType {
  setFilteredInput: any;
  filteredQuestions: any;
}
const FilterQuestion: React.FC<PropType> = ({
  setFilteredInput,
  filteredQuestions,
}) => {
  const [selectedBook, setSelectedBook] = useState<string>(
    filteredQuestions.book
  );
  const [selectedChapter, setSelectedChapter] = useState<string>(
    filteredQuestions.chapter
  );
  const handleFilter = () => {
    setFilteredInput((prevState: SharedContext["filteredInput"]) => {
      return {
        ...prevState,
        filteredQuestion: {
          isFiltering: selectedBook != "any",
          book: selectedBook,
          chapter: selectedChapter,
        },
      };
    });
  };

  const clearFilter = () => {
    setSelectedBook(filteredInputInitial.filteredQuestion.book);
    setSelectedChapter(filteredInputInitial.filteredQuestion.chapter);

    setFilteredInput((prevState: SharedContext["filteredInput"]) => {
      return {
        ...prevState,
        filteredQuestion: filteredInputInitial.filteredQuestion,
      };
    });
  };

  return (
    <div className="menu bg-base-100 w-70 p-3 pt-0 rounded-box shadow-xl mt-5">
      <label className="label">
        <span className="label-text">Filter by book</span>
      </label>
      <select
        className="select select-bordered select-sm w-full"
        onChange={(event) => {
          setSelectedBook(event.target.value);
          setSelectedChapter(filteredInputInitial.filteredQuestion.chapter);
        }}
        defaultValue={selectedBook}
        value={selectedBook}
      >
        <option defaultChecked={selectedBook == "any"} value={"any"}>
          Any
        </option>
        {bookDatabase.map((book) => (
          <option
            key={book.name}
            value={book.name}
            defaultChecked={selectedBook == book.name}
          >
            {book.name}
          </option>
        ))}
      </select>
      <label className="label">
        <span className="label-text">Filter by chapter</span>
      </label>
      <select
        className="select select-bordered select-sm w-full"
        onChange={(event) => setSelectedChapter(event.target.value)}
        defaultValue={selectedChapter}
        value={selectedChapter}
      >
        <option defaultChecked={selectedChapter == "any"} value={"any"}>
          Any
        </option>
        {selectedBook != "any" &&
          bookDatabase
            .filter((book) => book.name == selectedBook)
            .map((each) =>
              each.chapter.map((chapter) => (
                <option
                  key={chapter}
                  defaultChecked={selectedChapter == chapter}
                >
                  {chapter}
                </option>
              ))
            )}
      </select>
      <div className={"flex mt-3 justify-end"}>
        <button className="btn btn-secondary mr-2" onClick={clearFilter}>
          Clear filter
        </button>
        <button className="btn btn-primary" onClick={handleFilter}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterQuestion;
