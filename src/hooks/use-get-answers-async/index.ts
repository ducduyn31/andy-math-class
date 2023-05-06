import { mapAnswersFromGetAnswersByQuestions } from "@/models";
import { useMemo } from "react";
import { Maybe } from "@/models/types";
import { useGetAnswersForQuestionLazyQuery } from "@/gql/types";

export const useGetAnswersAsync = () => {
  const [getAnswersByQuestion, { data }] = useGetAnswersForQuestionLazyQuery();
  const getAnswers = async (questionId: Maybe<string>) => {
    if (!questionId) return;
    await getAnswersByQuestion({
      variables: {
        questionId,
      },
    });
  };

  const answers = useMemo(() => {
    if (!data) return [];
    return mapAnswersFromGetAnswersByQuestions(data);
  }, [data]);

  return {
    answers,
    getAnswers,
  };
};
