import { Answer, answersDatabase } from "@/models/question";
import { useState } from "react";
import { Maybe } from "@/models/types";

export const useGetAnswersAsync = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const getAnswers = (questionId: Maybe<string>) => {
    if (!questionId) return setAnswers([]);
    const matchedAnswers = answersDatabase.filter(
      (answer) => answer.question.id === questionId
    );
    setAnswers(matchedAnswers);
  };

  return {
    answers,
    getAnswers,
  };
};
