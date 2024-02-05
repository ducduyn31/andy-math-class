import { useRemoveBookMutation } from "@/gql/types";

interface Args {
  onSuccess?: () => void;
}

export const useRemoveBook = (args?: Args) => {
  const [remove, { loading }] = useRemoveBookMutation({
    onCompleted: () => {
      if (args?.onSuccess) {
        args.onSuccess();
      }
    },
    refetchQueries: ["CountRecords"],
    update: (cache, { data }) => {
      if (!data?.deleteFrombooksCollection?.records?.[0]) return;

      data?.deleteFrombooksCollection.records[0].chaptersCollection?.edges.forEach(
        (edge) => {
          cache.evict({
            id: cache.identify(edge.node),
          });
        }
      );

      data?.deleteFrombooksCollection.records[0].user_books_assignationCollection?.edges.forEach(
        (edge) => {
          cache.evict({
            id: cache.identify(edge.node),
          });
        }
      );

      cache.evict({
        id: cache.identify(data?.deleteFrombooksCollection.records[0]),
      });
    },
  });
  const removeBook = async (bookId: string) => {
    await remove({
      variables: {
        bookId,
      },
    });
  };

  return {
    loading,
    removeBook,
  };
};
