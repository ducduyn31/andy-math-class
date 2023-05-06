import { Book, Chapter, createFullChapter, mapBook } from "@/models";
import { Maybe } from "@/models/types";
import {
  AnswersInQuestionFragment,
  GetAllForAdminQuery,
  GetAnswersForQuestionQuery,
  GetQuestionsForChaptersQuery,
  ImagesOfQuestionFragment,
} from "@/gql/types";
import { assureNonNull } from "@/helpers/array";

export interface Question {
  id: Maybe<string>;
  name: string;
  book: Maybe<Book>;
  chapter: Maybe<Chapter>;
  description: Maybe<string>;
  questionImages: string[];
  answerImages: string[];
}

export interface Answer {
  id: Maybe<string>;
  name: string;
  question?: Question;
}

const mapQuestionImagesFromImagesOfQuestionFragment = (
  questionImagesConnection: Maybe<ImagesOfQuestionFragment>
): string[] => {
  const imageNodes = questionImagesConnection?.edges?.map((edge) => edge?.node);

  return assureNonNull(imageNodes?.map((imageNode) => imageNode?.image));
};

const mapAnswerImagesFromAnswersInQuestionFragment = (
  answerImagesConnection: Maybe<AnswersInQuestionFragment>
): string[] => {
  const imageNodes = answerImagesConnection?.edges?.map((edge) => edge?.node);

  return assureNonNull(imageNodes?.map((imageNode) => imageNode?.image));
};

export const mapQuestionFromGetAdminStat = (
  response: GetAllForAdminQuery
): Question[] => {
  const questionNodes =
    response?.questionsCollection?.edges?.map((edge) => edge.node) || [];

  return questionNodes.map((questionNode) => {
    const question: Question = {
      id: questionNode?.id,
      name: questionNode?.name || "",
      book: questionNode?.books ? mapBook(questionNode.books) : null,
      chapter: questionNode?.chapters
        ? createFullChapter(questionNode.chapters)
        : null,
      description: questionNode?.description,
      questionImages: mapQuestionImagesFromImagesOfQuestionFragment(
        questionNode?.question_imagesCollection
      ),
      answerImages: mapAnswerImagesFromAnswersInQuestionFragment(
        questionNode?.answerCollection
      ),
    };
    return question;
  });
};

export const mapQuestionsFromGetQuestionsByChapters = (
  response: GetQuestionsForChaptersQuery
): Question[] => {
  const questionNodes =
    response?.questionsCollection?.edges?.map((edge) => edge.node) || [];

  return questionNodes.map((questionNode) => {
    const question: Question = {
      id: questionNode?.id,
      name: questionNode?.name || "",
      book: null,
      chapter: null,
      description: questionNode?.description,
      questionImages: mapQuestionImagesFromImagesOfQuestionFragment(
        questionNode?.question_imagesCollection
      ),
      answerImages: [],
    };
    return question;
  });
};

export const mapAnswersFromGetAnswersByQuestions = (
  response: GetAnswersForQuestionQuery
): Answer[] => {
  const answerNodes =
    response?.answerCollection?.edges?.map((edge) => edge.node) || [];

  return answerNodes.map((answerNode) => {
    const answer: Answer = {
      id: answerNode?.id,
      name: answerNode?.image || "",
    };
    return answer;
  });
};
