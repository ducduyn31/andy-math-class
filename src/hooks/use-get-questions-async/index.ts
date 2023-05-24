import { Chapter, mapQuestionsFromGetQuestionsByChapters } from "@/models";
import { useCallback, useMemo } from "react";
import { useGetQuestionsForChaptersLazyQuery } from "@/gql/types";
import { shuffle } from "@/helpers/array";

export const useGetQuestionsAsync = () => {
  const [getQuestionsByChaptersGQL, { data }] =
    useGetQuestionsForChaptersLazyQuery();
  const getQuestions = useCallback(
    async (selectedChapters: Chapter[]) => {
      const chapterIds = selectedChapters.map((chapter) => chapter.id);

      await getQuestionsByChaptersGQL({
        variables: {
          chapterIds,
        },
      });
    },
    [getQuestionsByChaptersGQL]
  );

  const questions = useMemo(() => {
    if (!data?.questionsCollection?.edges?.length) return [];
    return shuffle(mapQuestionsFromGetQuestionsByChapters(data));
  }, [data]);

  return {
    selectedQuestions: questions,
    getQuestions,
  };
};
