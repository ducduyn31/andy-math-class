import React, { PropsWithChildren } from "react";
import { Question } from "@/models";
import { useGetAllQuestions } from "@/hooks/use-get-all-questions";
import { Maybe } from "@/gql/types";

interface SupportedFilter {
  bookId?: Maybe<string>;
  chapterId?: Maybe<string>;
}

type QuestionContextType = {
  questions: Question[];
  externalLoadComplete?: boolean;
  externalLoading?: boolean;
  loadFromExternalSource?: () => Promise<void>;
  filterQuestions?: (args?: SupportedFilter) => void;
};

const defaultContext: QuestionContextType = {
  questions: [],
  externalLoadComplete: true,
  externalLoading: false,
};

const QuestionContext =
  React.createContext<QuestionContextType>(defaultContext);

interface Props extends PropsWithChildren {}

export const QuestionsProvider: React.FC<Props> = ({ children }) => {
  const { questions, hasNextPage, loading, fetchMore, filterQuestions } =
    useGetAllQuestions();

  return (
    <QuestionContext.Provider
      value={{
        questions,
        externalLoadComplete: !hasNextPage,
        externalLoading: loading,
        loadFromExternalSource: fetchMore,
        filterQuestions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionsContext = () => React.useContext(QuestionContext);
