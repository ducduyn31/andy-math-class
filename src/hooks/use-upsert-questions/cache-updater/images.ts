import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from "@apollo/client";
import {
  AnswerInsertInput,
  Exact,
  LinkAnswerImagesMutation,
  LinkQuestionsImagesMutation,
  Question_ImagesInsertInput,
  RemoveAnswersFromQuestionMutation,
  RemoveImagesFromQuestionMutation,
  Scalars,
} from "@/gql/types";

export const removeQuestionImagesFromCache: MutationUpdaterFunction<
  RemoveImagesFromQuestionMutation,
  Exact<{
    imagePaths: Array<Scalars["String"]> | Scalars["String"];
    questionId: Scalars["UUID"];
  }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (!data?.deleteFromquestion_imagesCollection.records) return;
  const removedImages = data.deleteFromquestion_imagesCollection.records;
  removedImages.forEach((image) => {
    cache.evict({
      id: cache.identify(image),
    });
  });
};

export const removeAnswerImagesFromCache: MutationUpdaterFunction<
  RemoveAnswersFromQuestionMutation,
  Exact<{
    imagePaths: Array<Scalars["String"]> | Scalars["String"];
    questionId: Scalars["UUID"];
  }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (!data?.deleteFromanswerCollection.records) return;
  const removedImages = data.deleteFromanswerCollection.records;
  const questionId = removedImages[0].question;
  removedImages.forEach((image) => {
    cache.evict({
      id: cache.identify(image),
    });
  });
  cache.modify({
    id: cache.identify({
      __typename: "questions",
      id: questionId,
    }),
    fields: {
      answerCollection: (existingCollection) => {
        return {
          ...existingCollection,
          edges: existingCollection.edges?.filter(
            (edge: { node: { id: string } }) =>
              !removedImages.some(
                (image) => cache.identify(edge.node) === cache.identify(image)
              )
          ),
        };
      },
    },
  });
};

export const addQuestionImagesToCache: MutationUpdaterFunction<
  LinkQuestionsImagesMutation,
  Exact<{
    questionImages:
      | Array<Question_ImagesInsertInput>
      | Question_ImagesInsertInput;
  }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (!data?.insertIntoquestion_imagesCollection?.records) return;
  const addedImages = data.insertIntoquestion_imagesCollection.records;
  const questionId = addedImages[0].question;

  cache.modify({
    id: cache.identify({
      __typename: "questions",
      id: questionId,
    }),
    fields: {
      question_imagesCollection: (existingCollection) => {
        console.log(existingCollection);
        return {
          ...existingCollection,
          edges: [
            ...(existingCollection.edges || []),
            addedImages.map((image) => ({
              __typename: "question_imagesEdge",
              node: cache.identify(image),
            })),
          ],
        };
      },
    },
  });
};

export const addAnswerImagesToCache: MutationUpdaterFunction<
  LinkAnswerImagesMutation,
  Exact<{
    answerImages: Array<AnswerInsertInput> | AnswerInsertInput;
  }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (!data?.insertIntoanswerCollection?.records) return;
  const addedImages = data.insertIntoanswerCollection.records;
  const questionId = addedImages[0].question;

  cache.modify({
    id: cache.identify({
      __typename: "questions",
      id: questionId,
    }),
    fields: {
      answerCollection: (existingCollection) => {
        return {
          ...existingCollection,
          edges: [
            ...(existingCollection.edges || []),
            addedImages.map((image) => ({
              __typename: "answerEdge",
              node: cache.identify(image),
            })),
          ],
        };
      },
    },
  });
};
