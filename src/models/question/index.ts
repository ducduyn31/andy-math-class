import { Book, Chapter, createFullChapter, mapBook } from "@/models";
import { Maybe } from "@/models/types";
import {
  AnswersInQuestionFragment,
  GetAnswersForQuestionQuery,
  GetQuestionsForChaptersQuery,
  GetQuestionsQuery,
  ImagesOfQuestionFragment,
} from "@/gql/types";
import { assureNonNull } from "@/helpers/array";

export interface QuestionImage {
  path: string;
  order?: Maybe<number>;
}

export interface Question {
  id: Maybe<string>;
  name: string;
  book: Maybe<Book>;
  chapter: Maybe<Chapter>;
  description: Maybe<string>;
  questionImages: QuestionImage[];
  answerImages: QuestionImage[];
}

export interface Answer {
  id: Maybe<string>;
  name: string;
  question?: Question;
}

const mapQuestionImagesFromImagesOfQuestionFragment = (
  questionImagesConnection: Maybe<ImagesOfQuestionFragment>
): QuestionImage[] => {
  const imageNodes = questionImagesConnection?.edges?.map((edge) => edge?.node);

  return assureNonNull(
    imageNodes?.map((imageNode) => ({
      path: imageNode?.image || "",
      order: imageNode?.order,
    }))
  );
};

const mapAnswerImagesFromAnswersInQuestionFragment = (
  answerImagesConnection: Maybe<AnswersInQuestionFragment>
): QuestionImage[] => {
  const imageNodes = answerImagesConnection?.edges?.map((edge) => edge?.node);

  return assureNonNull(
    imageNodes?.map((imageNode) => ({
      path: imageNode?.image || "",
      order: imageNode?.order,
    }))
  );
};

export const mapQuestionsFromQuery = (
  response?: GetQuestionsQuery
): Question[] => {
  if (!response) return [];

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
