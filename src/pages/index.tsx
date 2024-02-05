import Layout from "@/layout/Layout";
import React, { ReactElement, useEffect, useState } from "react";
import { useBookContext } from "@/hooks/use-book-context";
import { QuestionAnswerPanel } from "@/components/question-answer-panel";
import { useGetQuestionsAsync } from "@/hooks/use-get-questions-async";
import { SidedQuestionFilter } from "@/components/question-filter";
import { useGetMe } from "@/hooks/use-get-user";
import { usePersistSelectedChapters } from "@/hooks/use-persist-selected-chapters";
import { Loading } from "@/components/loading";
import { useSidebarToggle } from "@/components/navbar/components/sidebar-toggle";
import { switchCaseReturn } from "@/helpers/array";
import { hotjar } from "react-hotjar";

export default function Home() {
  const { selectedChapters } = useBookContext();
  const [shouldShowQuestions, setShouldShowQuestions] = useState(false);
  const { getQuestions, selectedQuestions } = useGetQuestionsAsync();
  const { saveSelectedChapters, loading: loadSelectedChapters } =
    usePersistSelectedChapters();
  const { me, isAdmin, loading: loadGetMe } = useGetMe();
  const [isToggled, setToggle] = useSidebarToggle();

  useEffect(() => {
    setShouldShowQuestions(false);
  }, [selectedChapters]);

  useEffect(() => {
    if (shouldShowQuestions) {
      getQuestions(selectedChapters);
    }
  }, [shouldShowQuestions, getQuestions, selectedChapters]);

  useEffect(() => {
    if (hotjar.initialized() && me?.id) {
      hotjar.identify(me.id, {
        email: me.email,
      });
    }
  }, [me.email, me.id]);

  if (loadSelectedChapters || loadGetMe) {
    return <Loading type="page" />;
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

  return (
    <div className="grid grid-cols-5 h-screen drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isToggled}
      />
      <div className="drawer-side pt-16">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => setToggle(false)}
        />
        <SidedQuestionFilter />
      </div>
      {switchCaseReturn(
        shouldShowQuestions,
        {
          case: true,
          return: (
            <div className="pt-16 drawer-content col-span-5">
              <QuestionAnswerPanel questions={selectedQuestions} />
            </div>
          ),
        },
        {
          case: false,
          return: (
            <div className="hero drawer-content col-span-5">
              <div className="text-center hero-content">
                <button
                  className="btn btn-primary"
                  disabled={selectedChapters.length === 0}
                  onClick={startQuiz}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ),
        }
      )}
    </div>
  );
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
