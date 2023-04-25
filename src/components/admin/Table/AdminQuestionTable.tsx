import AdminQuestionRow from "@/components/admin/Table/AdminQuestionRow";
import { Book, bookDatabase } from "@/components/admin/Table/AdminBookTable";
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import { SharedContext } from "@/layout/AdminLayout";

interface Question {
  id?: number;
  name: string;
  book: Book;
  chapter: string | null;
}
const questionDatabase = [...Array(100).keys()].map((i) => {
  const selectedBook =
    bookDatabase[
      faker.datatype.number({ min: 0, max: bookDatabase.length - 1 })
    ];
  const selectedChapter =
    selectedBook.chapter.length > 0
      ? selectedBook.chapter[
          faker.datatype.number({
            min: 0,
            max: selectedBook.chapter.length - 1,
          })
        ]
      : null;
  return {
    id: i,
    name: `Question ${i % 10}`,
    book: selectedBook,
    chapter: selectedChapter,
  };
});

const itemPerPage = 10;

interface Props {
  setQuestionModification: SharedContext["setQuestionModification"];
}
const AdminQuestionTable: React.FC<Props> = ({ setQuestionModification }) => {
  const [page, setPage] = useState(0);
  const [dataset, setDataset] = useState<Question[]>([]);
  const updatePaginationItem = () => {
    const start = page * itemPerPage;
    setDataset(questionDatabase.slice(start, start + itemPerPage));
  };

  useEffect(() => {
    updatePaginationItem();
  }, [page]);

  return (
    <>
      <div className="card bg-base-100 drop-shadow-xl mt-5 md:mt-0">
        <div className={"overflow-x-auto"}>
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Book</th>
                <th>Chapter</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataset.map((question) => (
                <AdminQuestionRow
                  key={question.id}
                  question={question}
                  setQuestionModification={setQuestionModification}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={"flex justify-between mt-5"}>
        <div className="btn-group">
          {[...Array(Math.ceil(questionDatabase.length / itemPerPage))].map(
            (_, i) => (
              <input
                key={i}
                type={"radio"}
                name={"options"}
                data-title={i + 1}
                className={`btn`}
                defaultChecked={i == page}
                onChange={() => setPage(i)}
              />
            )
          )}
        </div>
        <label
          htmlFor="question-modification-modal"
          className={"btn btn-primary"}
          onClick={() =>
            setQuestionModification((prevState: Question) => {
              return {
                ...prevState,
                name: "",
                book: bookDatabase[0],
                chapter: null,
              };
            })
          }
        >
          Add question
        </label>
      </div>
    </>
  );
};

export default AdminQuestionTable;
export { questionDatabase };

export type { Question };
