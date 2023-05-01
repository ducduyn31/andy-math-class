import Layout from "@/layout/Layout";
import { ReactElement, useEffect, useState } from "react";
import { useBookContext } from "@/hooks/use-book-context";
import { QuestionAnswerPanel } from "@/components/question-answer-panel";
import { useGetQuestionsAsync } from "@/hooks/use-get-questions-async";

export default function Home() {
  const { selectedChapters } = useBookContext();
  const [shouldShowQuestions, setShouldShowQuestions] = useState(false);
  const { getQuestions, selectedQuestions } = useGetQuestionsAsync();

  useEffect(() => {
    setShouldShowQuestions(false);
  }, [selectedChapters]);

  useEffect(() => {
    if (shouldShowQuestions) {
      getQuestions(selectedChapters);
    }
  }, [shouldShowQuestions, getQuestions, selectedChapters]);

  if (!shouldShowQuestions) {
    return (
      <div className="hero">
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
    );
  }

  return <QuestionAnswerPanel questions={selectedQuestions} />;
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
