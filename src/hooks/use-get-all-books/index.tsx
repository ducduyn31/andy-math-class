import {
  GetBooksQueryVariables,
  Maybe,
  useGetBooksLazyQuery,
} from "@/gql/types";
import { Book, mapBooksFromGetBooksQuery } from "@/models";
import { useState } from "react";
import { useEffectOnce } from "@/hooks/use-effect-once";
import { isNullOrUndefined } from "@/helpers/valid";

interface UseGetAllBookArgs {
  lazy?: boolean;
}

interface FilterBooksArgs {
  name?: Maybe<string>;
  ids?: Maybe<string[]>;
}

export const useGetAllBooks = (args?: UseGetAllBookArgs) => {
  const [result, setResult] = useState<Book[]>([]);
  const [getBooks, { data, loading, fetchMore }] = useGetBooksLazyQuery({
    variables: {
      limit: 20,
      bookName: {
        startsWith: "",
      },
    },
    onCompleted: (result) => {
      setResult(mapBooksFromGetBooksQuery(result));
    },
  });

  useEffectOnce(() => {
    if (!args?.lazy) {
      getBooks();
    }
  });

  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const fetchNextPage = async () => {
    setFetchMoreLoading(true);
    await fetchMore({
      variables: {
        cursor: data?.booksCollection?.pageInfo.endCursor,
      },
    }).finally(() => setFetchMoreLoading(false));
  };

  const filterBooks = (args?: FilterBooksArgs) => {
    const { name, ids } = args || {};

    const filterObject: Partial<GetBooksQueryVariables> = {};

    if (!isNullOrUndefined(name)) {
      filterObject.bookName = {
        startsWith: name,
      };
    }

    if (!isNullOrUndefined(ids)) {
      filterObject.bookIds = {
        in: ids,
      };
    }

    getBooks({
      variables: {
        ...filterObject,
        limit: 30,
      },
    });
  };

  return {
    books: result,
    loading: loading || fetchMoreLoading,
    fetchMore: fetchNextPage,
    hasNextPage: data?.booksCollection?.pageInfo.hasNextPage,
    filterBooks,
  };
};
