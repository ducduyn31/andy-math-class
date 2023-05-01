import { Chapter } from "@/models";
import { questionDatabase } from "@/components/admin/Table/AdminQuestionTable";
import { useState } from "react";
import { Question } from "@/models/question";

export const useGetQuestionsAsync = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const getQuestions = (selectedChapters: Chapter[]) => {
    const matchedQuestions = questionDatabase.filter((question) => {
      return selectedChapters.some((chapter) => {
        return question.chapter?.id === chapter.id;
      });
    });
    setQuestions(matchedQuestions);
  };

  return {
    selectedQuestions: questions,
    getQuestions,
  };
};
