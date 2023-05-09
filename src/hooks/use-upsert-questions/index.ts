import {
  useCreateNewQuestionMutation,
  useLinkAnswerImagesMutation,
  useLinkQuestionsImagesMutation,
  useRemoveAnswersFromQuestionMutation,
  useRemoveImagesFromQuestionMutation,
  useUpdateExistingQuestionMutation,
} from "@/gql/types";
import { UpsertQuestionFormValues } from "@/helpers/admin/questions/form";
import { useSupabaseContext } from "@/hooks/use-supabase-context";
import { generateUUID } from "@/helpers/string";
import { useCallback } from "react";
import { assureNonNull } from "@/helpers/array";
import { createNewQuestionInCache } from "@/hooks/use-upsert-questions/cache-updater/questions";
import {
  addAnswerImagesToCache,
  addQuestionImagesToCache,
  removeAnswerImagesFromCache,
  removeQuestionImagesFromCache,
} from "@/hooks/use-upsert-questions/cache-updater/images";

interface UpsertQuestionsArgs {
  onSuccess?: () => void;
}

export const useUpsertQuestions = (args?: UpsertQuestionsArgs) => {
  const [createQuestionsGQL, { loading: insertQuestionsLoading }] =
    useCreateNewQuestionMutation({
      update: createNewQuestionInCache,
    });
  const [updateQuestionsGQL, { loading: updateQuestionsLoading }] =
    useUpdateExistingQuestionMutation();
  const [linkQuestionsImagesGQL, { loading: linkQuestionsImagesLoading }] =
    useLinkQuestionsImagesMutation({
      update: addQuestionImagesToCache,
    });
  const [linkAnswersImagesGQL, { loading: linkAnswersImagesLoading }] =
    useLinkAnswerImagesMutation({
      update: addAnswerImagesToCache,
    });
  const [removeQuestionImagesGQL, { loading: removeQuestionImagesLoading }] =
    useRemoveImagesFromQuestionMutation({
      update: removeQuestionImagesFromCache,
    });
  const [removeAnswerImagesGQL, { loading: removeAnswerImagesLoading }] =
    useRemoveAnswersFromQuestionMutation({
      update: removeAnswerImagesFromCache,
    });
  const { storage } = useSupabaseContext();

  const uploadImages = useCallback(
    async (values: UpsertQuestionFormValues) => {
      const { questionImages, answerImages } = values;
      const questionImagesArray = Array.from(questionImages);
      const answerImagesArray = Array.from(answerImages);

      const questionImagesPromise = Promise.all(
        questionImagesArray.map((image) => {
          return storage
            .from("class-questions")
            .upload(`question-images/${generateUUID()}-${image.name}`, image);
        })
      );
      const answerImagesPromise = Promise.all(
        answerImagesArray.map((image) => {
          return storage
            .from("class-questions")
            .upload(`answer-images/${generateUUID()}-${image.name}`, image);
        })
      );
      const [questionResult, answerResult] = await Promise.all([
        questionImagesPromise,
        answerImagesPromise,
      ]);

      const questionPaths = assureNonNull(
        questionResult.map((result) => result?.data?.path)
      );
      const answerPaths = assureNonNull(
        answerResult.map((result) => result?.data?.path)
      );
      return {
        questionImages: questionPaths,
        answerImages: answerPaths,
      };
    },
    [storage]
  );

  const linkQuestionsAnswers = useCallback(
    async ({
      questionId,
      uploadQuestions,
      uploadAnswers,
    }: {
      questionId: string;
      uploadQuestions: string[];
      uploadAnswers: string[];
    }) => {
      const linkQuestionsImagesPromise =
        uploadQuestions.length > 0
          ? linkQuestionsImagesGQL({
              variables: {
                questionImages: uploadQuestions.map((path) => ({
                  image: path,
                  question: questionId,
                })),
              },
            })
          : Promise.resolve([]);
      const linkAnswersImagesPromise =
        uploadAnswers.length > 0
          ? linkAnswersImagesGQL({
              variables: {
                answerImages: uploadAnswers.map((path) => ({
                  image: path,
                  question: questionId,
                })),
              },
            })
          : Promise.resolve([]);

      return await Promise.all([
        linkQuestionsImagesPromise,
        linkAnswersImagesPromise,
      ]);
    },
    [linkQuestionsImagesGQL, linkAnswersImagesGQL]
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
      await linkQuestionsAnswers({
        questionId: questionId!,
        uploadQuestions: questionImages,
        uploadAnswers: answerImages,
      });
    },
    [createQuestionsGQL, linkQuestionsAnswers, uploadImages]
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
      const [{ questionImages, answerImages }] = await Promise.all([
        uploadImagesPromise,
        updateQuestionsPromise,
      ]);
      if (values.deleteQuestionImages.length > 0) {
        await removeQuestionImagesGQL({
          variables: {
            questionId: values.id,
            imagePaths: values.deleteQuestionImages,
          },
        });
      }
      if (values.deleteAnswerImages.length > 0) {
        await removeAnswerImagesGQL({
          variables: {
            questionId: values.id,
            imagePaths: values.deleteAnswerImages,
          },
        });
      }
      await linkQuestionsAnswers({
        questionId: values.id!,
        uploadQuestions: questionImages,
        uploadAnswers: answerImages,
      });
    },
    [
      linkQuestionsAnswers,
      removeAnswerImagesGQL,
      removeQuestionImagesGQL,
      updateQuestionsGQL,
      uploadImages,
    ]
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
      linkQuestionsImagesLoading ||
      linkAnswersImagesLoading ||
      updateQuestionsLoading ||
      removeQuestionImagesLoading ||
      removeAnswerImagesLoading,
    upsertQuestions,
  };
};
