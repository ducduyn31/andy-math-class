import { AdminQuestionRow } from "@/components/admin/table/questions-table/components/question-row";
import React, { useCallback, useEffect, useState } from "react";
import { SharedContext } from "@/layout/AdminLayout";
import { Question } from "@/models";
import { useAdminContext } from "@/hooks/use-admin-context";
import { useModal } from "@/hooks/use-modal";
import { QuestionModificationModal } from "@/components/admin/table/questions-table/components/question-edit";

const itemPerPage = 10;

interface Props {
  filteredInput: SharedContext["filteredInput"];
}

export const AdminQuestionTable: React.FC<Props> = ({ filteredInput }) => {
  const { openModal } = useModal(QuestionModificationModal);
  const [page, setPage] = useState(0);
  const [dataset, setDataset] = useState<Question[]>([]);
  const { filteredQuestion } = filteredInput;
  const { questions, totalQuestions, books } = useAdminContext();
  const updatePaginationItem = useCallback(() => {
    const start = page * itemPerPage;
    setDataset(questions.slice(start, start + itemPerPage));
  }, [questions, page]);

  useEffect(() => {
    updatePaginationItem();
  }, [page, updatePaginationItem]);

  useEffect(() => {
    if (
      !filteredQuestion.isFiltering ||
      (filteredQuestion.book == "any" && filteredQuestion.chapter == "any")
    ) {
      return updatePaginationItem();
    }
    setDataset(() =>
      questions.filter((question) => {
        return (
          (filteredQuestion.book == "any" ||
            filteredQuestion.book == question.book?.name) &&
          (filteredQuestion.chapter == "any" ||
            filteredQuestion.chapter == question.chapter?.name)
        );
      })
    );
  }, [questions, filteredQuestion, updatePaginationItem]);

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
                <AdminQuestionRow key={question.id} question={question} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={"flex sm:flex-row flex-col sm:justify-between mt-5"}>
        <div className="btn-group sm:justify-start justify-center">
          {[...Array(Math.ceil(totalQuestions / itemPerPage))].map((_, i) => (
            <input
              key={i}
              type={"radio"}
              name={"options"}
              data-title={i + 1}
              className={`btn ${
                filteredQuestion.isFiltering ? "btn-disabled" : ""
              } flex-grow`}
              defaultChecked={i == page}
              onChange={() => setPage(i)}
            />
          ))}
        </div>
        <label
          htmlFor="question-modification-modal"
          className={"btn btn-primary mt-2 sm:mt-0"}
          onClick={() => openModal({ question: null, books })}
        >
          Add question
        </label>
      </div>
    </>
  );
};
