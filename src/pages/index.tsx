import Layout from "@/layout/Layout";
import React, { ReactElement, useEffect, useState } from "react";
import { useBookContext } from "@/hooks/use-book-context";
import { QuestionAnswerPanel } from "@/components/question-answer-panel";
import { useGetQuestionsAsync } from "@/hooks/use-get-questions-async";
import { SidedQuestionFilter } from "@/components/question-filter";
import { useGetMe } from "@/hooks/use-get-user";
import { usePersistSelectedChapters } from "@/hooks/use-persist-selected-chapters";

export default function Home() {
  const { selectedChapters } = useBookContext();
  const [shouldShowQuestions, setShouldShowQuestions] = useState(false);
  const { getQuestions, selectedQuestions } = useGetQuestionsAsync();
  const { saveSelectedChapters, loading: loadSelectedChapters } =
    usePersistSelectedChapters();
  const { me, isAdmin, loading: loadGetMe } = useGetMe();

  useEffect(() => {
    setShouldShowQuestions(false);
  }, [selectedChapters]);

  useEffect(() => {
    if (shouldShowQuestions) {
      getQuestions(selectedChapters);
    }
  }, [shouldShowQuestions, getQuestions, selectedChapters]);

  if (loadSelectedChapters || loadGetMe) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Loading</h1>
            <p className="py-6">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

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

  const startQuiz = () => {
    setShouldShowQuestions(true);
    saveSelectedChapters(selectedChapters);
  };

  if (!shouldShowQuestions) {
    return (
      <div className="grid grid-cols-5 h-fullpage">
        <SidedQuestionFilter />
        <div className="hero col-span-4">
          <div className="text-center hero-content">
            <button
              className="btn"
              disabled={selectedChapters.length === 0}
              onClick={startQuiz}
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
