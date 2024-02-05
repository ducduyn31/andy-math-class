import React from "react";
import { useModal } from "@/hooks/use-modal";
import { QuestionModificationModal } from "@/components/admin/table/questions-table/components/question-edit";
import { QuestionsTable } from "@/components/admin/table/questions-table/components/questions-table";
import { QuestionsProvider } from "@/components/admin/table/questions-table/components/questions-provider";
import { QuestionsFilter } from "@/components/admin/table/questions-table/components/questions-filter";

export const AdminQuestionTable: React.FC = () => {
  const { openModal } = useModal(QuestionModificationModal);

  return (
    <QuestionsProvider>
      <div className="flex flex-col gap-y-3">
        <QuestionsFilter />
        <QuestionsTable />
        <div className="flex sm:flex-row flex-col sm:justify-between">
          <label
            htmlFor="question-modification-modal"
            className={"btn btn-primary mt-2 sm:mt-0"}
            onClick={() => openModal({ question: null })}
          >
            Add question
          </label>
        </div>
      </div>
    </QuestionsProvider>
  );
};
