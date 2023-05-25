import { AdminQuestionRow } from "@/components/admin/table/questions-table/components/question-row";
import React from "react";
import { useAdminContext } from "@/hooks/use-admin-context";
import { useModal } from "@/hooks/use-modal";
import { QuestionModificationModal } from "@/components/admin/table/questions-table/components/question-edit";
import { useFilter } from "@/hooks/use-filter-context";

export const AdminQuestionTable: React.FC = () => {
  const { openModal } = useModal(QuestionModificationModal);
  const { filteredQuestions, page, pageSize, totalSize, setPageNumber } =
    useFilter("question");
  const { books } = useAdminContext();

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
              {filteredQuestions.map((question) => (
                <AdminQuestionRow key={question.id} question={question} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col sm:justify-between mt-5">
        <div className="btn-group sm:justify-start justify-center">
          {[...Array(Math.ceil(totalSize / pageSize))].map((_, i) => (
            <input
              key={i}
              type="radio"
              name="options"
              data-title={i + 1}
              className="btn flex-grow"
              defaultChecked={i + 1 === page}
              onChange={() => setPageNumber(i + 1)}
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
