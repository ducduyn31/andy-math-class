import Layout from "@/layout/Layout";
import React, { ReactElement, useEffect, useState } from "react";
import { useBookContext } from "@/hooks/use-book-context";
import { QuestionAnswerPanel } from "@/components/question-answer-panel";
import { useGetQuestionsAsync } from "@/hooks/use-get-questions-async";
import { SidedQuestionFilter } from "@/components/question-filter";
import { useGetMe } from "@/hooks/use-get-user";

export default function Home() {
  const { selectedChapters } = useBookContext();
  const [shouldShowQuestions, setShouldShowQuestions] = useState(false);
  const { getQuestions, selectedQuestions } = useGetQuestionsAsync();
  const { me, isAdmin } = useGetMe();

  useEffect(() => {
    setShouldShowQuestions(false);
  }, [selectedChapters]);

  useEffect(() => {
    if (shouldShowQuestions) {
      getQuestions(selectedChapters);
    }
  }, [shouldShowQuestions, getQuestions, selectedChapters]);

  if (!isAdmin && !me?.isEnabled) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              You aren&apos;t activated. Please contact Andy to proceed!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!shouldShowQuestions) {
    return (
      <div className="grid grid-cols-5 h-fullpage">
        <SidedQuestionFilter />
        <div className="hero col-span-4">
          <div className="text-center hero-content">
            <button
              className={`btn ${
                selectedChapters.length === 0 ? "btn-disabled" : ""
              }`}
              onClick={() => setShouldShowQuestions(true)}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 h-fullpage">
      <SidedQuestionFilter />
      <div className="col-span-4 mt-5">
        <QuestionAnswerPanel questions={selectedQuestions} />
      </div>
    </div>
  );
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
