import {
  GetQuestionsQueryVariables,
  Maybe,
  useGetQuestionsLazyQuery,
} from "@/gql/types";
import { mapQuestionsFromQuery, Question } from "@/models";
import { useState } from "react";
import { useEffectOnce } from "@/hooks/use-effect-once";
import { isNullOrUndefined } from "@/helpers/valid";

interface UseGetAllQuestionsArgs {
  lazy?: boolean;
}

interface FilterQuestionsArgs {
  bookId?: Maybe<string>;
  chapterId?: Maybe<string>;
}

export const useGetAllQuestions = (args?: UseGetAllQuestionsArgs) => {
  const [result, setResult] = useState<Question[]>([]);
  const [
    getQuestions,
    { data: questionsData, loading: getQuestionsLoading, fetchMore },
  ] = useGetQuestionsLazyQuery({
    variables: {
      limit: 50,
    },
    onCompleted: (result) => {
      setResult(mapQuestionsFromQuery(result));
    },
  });

  useEffectOnce(() => {
    if (!args?.lazy) {
      getQuestions();
    }
  });

  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const fetchNextPage = async () => {
    setFetchMoreLoading(true);
    await fetchMore({
      variables: {
        cursor: questionsData?.questionsCollection?.pageInfo?.endCursor,
      },
    }).finally(() => setFetchMoreLoading(false));
  };

  const filterQuestions = (args?: FilterQuestionsArgs) => {
    const { bookId, chapterId } = args || {};

    const filterObject: Partial<GetQuestionsQueryVariables> = {};

    if (!isNullOrUndefined(bookId)) {
      filterObject.bookId = {
        eq: bookId,
      };
    }

    if (!isNullOrUndefined(chapterId)) {
      filterObject.chapterId = {
        eq: chapterId,
      };
    }

    getQuestions({
      variables: {
        ...filterObject,
        limit: 50,
      },
    });
  };

  return {
    questions: result,
    loading: getQuestionsLoading || fetchMoreLoading,
    fetchMore: fetchNextPage,
    hasNextPage: questionsData?.questionsCollection?.pageInfo.hasNextPage,
    filterQuestions,
  };
};
