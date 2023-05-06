import {
  useCreateNewQuestionMutation,
  useLinkQuestionsAnswersMutation,
  useUpdateExistingQuestionMutation,
} from "@/gql/types";
import { UpsertQuestionFormValues } from "@/helpers/admin/questions/form";
import { useSupabaseContext } from "@/hooks/use-supabase-context";
import { generateUUID } from "@/helpers/string";
import { useCallback } from "react";
import { assureNonNull } from "@/helpers/array";

interface UpsertQuestionsArgs {
  onSuccess?: () => void;
}

export const useUpsertQuestions = (args?: UpsertQuestionsArgs) => {
  const [createQuestionsGQL, { loading: insertQuestionsLoading }] =
    useCreateNewQuestionMutation();
  const [updateQuestionsGQL, { loading: updateQuestionsLoading }] =
    useUpdateExistingQuestionMutation();
  const [linkQuestionsAnswersGQL, { loading: linkQuestionsAnswersLoading }] =
    useLinkQuestionsAnswersMutation();
  const { client } = useSupabaseContext();

  const uploadImages = useCallback(
    async (values: UpsertQuestionFormValues) => {
      const { questionImages, answerImages } = values;
      const questionImagesArray = Array.from(questionImages);
      const answerImagesArray = Array.from(answerImages);

      const questionImagesPromise = Promise.all(
        questionImagesArray.map((image) => {
          return client.storage
            .from("class-questions")
            .upload(`question-images/${generateUUID()}-${image.name}`, image);
        })
      );
      const answerImagesPromise = Promise.all(
        answerImagesArray.map((image) => {
          return client.storage
            .from("class-questions")
            .upload(`answer-images/${generateUUID()}-${image.name}`, image);
        })
      );
      const [questionResult, answerResult] = await Promise.all([
        questionImagesPromise,
        answerImagesPromise,
      ]);

      const questionPaths = assureNonNull(
        questionResult.map((result) => result.data?.path)
      );
      const answerPaths = assureNonNull(
        answerResult.map((result) => result.data?.path)
      );
      return {
        questionImages: questionPaths,
        answerImages: answerPaths,
      };
    },
    [client]
  );

  const createNewQuestion = useCallback(
    async (values: UpsertQuestionFormValues) => {
      const uploadImagesPromise = uploadImages(values);
      const createQuestionsPromise = createQuestionsGQL({
        variables: {
          newQuestion: {
            name: values.name,
            description: values.description,
            book: values.bookId,
            chapter: values.chapterId,
          },
        },
      });
      const [{ questionImages, answerImages }, createQuestionResult] =
        await Promise.all([uploadImagesPromise, createQuestionsPromise]);
      const questionId =
        createQuestionResult.data?.insertIntoquestionsCollection?.records?.[0]
          .id;
      await linkQuestionsAnswersGQL({
        variables: {
          questionImages: questionImages.map((path) => ({
            image: path,
            question: questionId,
          })),
          answerImages: answerImages.map((path) => ({
            image: path,
            question: questionId,
          })),
        },
      });
    },
    [createQuestionsGQL, linkQuestionsAnswersGQL, uploadImages]
  );

  const updateQuestion = useCallback(
    async (values: UpsertQuestionFormValues) => {
      const uploadImagesPromise = uploadImages(values);
      const updateQuestionsPromise = updateQuestionsGQL({
        variables: {
          questionID: values.id,
          question: {
            name: values.name,
            description: values.description,
            book: values.bookId,
            chapter: values.chapterId,
          },
        },
      });
      const [{ questionImages, answerImages }, updateQuestionResult] =
        await Promise.all([uploadImagesPromise, updateQuestionsPromise]);
      if (questionImages.length === 0 && answerImages.length === 0) return;
      const questionId =
        updateQuestionResult.data?.updatequestionsCollection?.records?.[0].id;
      await linkQuestionsAnswersGQL({
        variables: {
          questionImages: questionImages.map((path) => ({
            image: path,
            question: questionId,
          })),
          answerImages: answerImages.map((path) => ({
            image: path,
            question: questionId,
          })),
        },
      });
    },
    [linkQuestionsAnswersGQL, updateQuestionsGQL, uploadImages]
  );

  const upsertQuestions = async (values: UpsertQuestionFormValues) => {
    if (!values.id) {
      await createNewQuestion(values);
    } else {
      await updateQuestion(values);
    }
    args?.onSuccess?.();
  };

  return {
    loading:
      insertQuestionsLoading ||
      linkQuestionsAnswersLoading ||
      updateQuestionsLoading,
    upsertQuestions,
  };
};
