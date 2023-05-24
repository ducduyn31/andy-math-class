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
import { assureNonNull, zip } from "@/helpers/array";
import { createNewQuestionInCache } from "@/hooks/use-upsert-questions/cache-updater/questions";
import {
  addAnswerImagesToCache,
  addQuestionImagesToCache,
  removeAnswerImagesFromCache,
  removeQuestionImagesFromCache,
} from "@/hooks/use-upsert-questions/cache-updater/images";
import {
  FileState,
  getDeletingFiles,
  getNewFileStates,
  NewFileState,
} from "@/helpers/admin/questions/file-action";

interface UpsertQuestionsArgs {
  onSuccess?: () => void;
}

type ImagePathAndOrder = [string, number];

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
    async (
      fileStates: FileState[],
      storageName: string,
      uploadPrefix: string
    ): Promise<[string, NewFileState][]> => {
      const newFileStates = getNewFileStates(fileStates);
      const files = Array.from(newFileStates.map((state) => state.value));

      const uploadFilePromises = files.map((file) => {
        return storage
          .from(storageName)
          .upload(`${uploadPrefix}/${generateUUID()}-${file.name}`, file);
      });
      const uploadResults = await Promise.all(uploadFilePromises);
      const uploadPaths = assureNonNull(
        uploadResults.map((result) => result?.data?.path)
      );
      return zip(uploadPaths, newFileStates);
    },
    [storage]
  );

  const uploadQuestionAnswerImages = useCallback(
    async (
      values: UpsertQuestionFormValues
    ): Promise<{
      questionImages: ImagePathAndOrder[];
      answerImages: ImagePathAndOrder[];
    }> => {
      const [questionUploads, answerUploads] = await Promise.all([
        uploadImages(
          values.questionImages,
          "class-questions",
          "question-images"
        ),
        uploadImages(values.answerImages, "class-questions", "answer-images"),
      ]);

      return {
        questionImages: questionUploads.map(([path, state]) => [
          path,
          state.order,
        ]),
        answerImages: answerUploads.map(([path, state]) => [path, state.order]),
      };
    },
    [uploadImages]
  );

  const linkQuestionsAnswers = useCallback(
    async ({
      questionId,
      uploadQuestions,
      uploadAnswers,
    }: {
      questionId: string;
      uploadQuestions: ImagePathAndOrder[];
      uploadAnswers: ImagePathAndOrder[];
    }) => {
      const linkQuestionsImagesPromise =
        uploadQuestions.length > 0
          ? linkQuestionsImagesGQL({
              variables: {
                questionImages: uploadQuestions.map(([path, order]) => ({
                  order,
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
                answerImages: uploadAnswers.map(([path, order]) => ({
                  order,
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
      const uploadImagesPromise = uploadQuestionAnswerImages(values);
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
    [createQuestionsGQL, linkQuestionsAnswers, uploadQuestionAnswerImages]
  );

  const removeQuestionImagesIfNeeded = useCallback(
    async (values: UpsertQuestionFormValues) => {
      const deleteQuestionImages = getDeletingFiles(values.questionImages);
      const deleteAnswerImages = getDeletingFiles(values.answerImages);
      const shouldRunPromises: Promise<any>[] = [];
      if (deleteQuestionImages.length > 0) {
        shouldRunPromises.push(
          removeQuestionImagesGQL({
            variables: {
              questionId: values.id,
              imagePaths: deleteQuestionImages.map((file) => file.value),
            },
          })
        );
      }
      if (deleteAnswerImages.length > 0) {
        shouldRunPromises.push(
          removeAnswerImagesGQL({
            variables: {
              questionId: values.id,
              imagePaths: deleteAnswerImages.map((file) => file.value),
            },
          })
        );
      }
      await Promise.all(shouldRunPromises);
    },
    [removeAnswerImagesGQL, removeQuestionImagesGQL]
  );

  const updateQuestion = useCallback(
    async (values: UpsertQuestionFormValues) => {
      const uploadImagesPromise = uploadQuestionAnswerImages(values);
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
      await removeQuestionImagesIfNeeded(values);
      await linkQuestionsAnswers({
        questionId: values.id!,
        uploadQuestions: questionImages,
        uploadAnswers: answerImages,
      });
    },
    [
      linkQuestionsAnswers,
      removeQuestionImagesIfNeeded,
      updateQuestionsGQL,
      uploadQuestionAnswerImages,
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
