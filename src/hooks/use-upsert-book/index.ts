import {
  useCreateNewBooksMutation,
  useCreateNewChaptersMutation,
  useRemoveChaptersMutation,
  useUpdateChapterOrderMutation,
  useUpdateExistingBookMutation,
} from "@/gql/types";
import {
  FormChapterValue,
  UpsertBookFormValues,
} from "@/helpers/admin/books/form";
import { useCallback, useMemo } from "react";
import { Book, convertBook, createFullChapter } from "@/models";
import { Maybe } from "@/models/types";
import { assureNumber } from "@/helpers/number";
import {
  updateCacheOnInsertChapters,
  updateCacheOnRemoveChapters,
  updateCacheOnUpdateChapterOrder,
} from "@/hooks/use-upsert-book/cache-updater/chapters";
import {
  updateCacheOnInsertBook,
  updateCacheOnUpdateBook,
} from "@/hooks/use-upsert-book/cache-updater/books";

interface UpsertBookHookArgs {
  onSuccess?: () => void;
}

interface UpsertBookHookResult {
  upsertBook: (formValues: UpsertBookFormValues) => void;
  book: Maybe<Book>;
  loading: boolean;
}

export const useUpsertBook = (
  args?: UpsertBookHookArgs
): UpsertBookHookResult => {
  const [
    createNewBookGQL,
    { data: insertBookData, loading: insertBookLoading },
  ] = useCreateNewBooksMutation({
    update: updateCacheOnInsertBook,
    refetchQueries: ["CountRecords"],
  });
  const [updateBookGQL, { data: updateBookData, loading: updateBookLoading }] =
    useUpdateExistingBookMutation({
      update: updateCacheOnUpdateBook,
    });
  const [
    createNewChaptersGQL,
    { data: insertChaptersData, loading: insertChaptersLoading },
  ] = useCreateNewChaptersMutation({
    update: updateCacheOnInsertChapters,
  });
  const [
    removeChaptersGQL,
    { data: removeChaptersData, loading: removeChaptersLoading },
  ] = useRemoveChaptersMutation({
    update: updateCacheOnRemoveChapters,
  });
  const [updateChapterOrderGQL, { loading: updateChapterOrderLoading }] =
    useUpdateChapterOrderMutation({
      update: updateCacheOnUpdateChapterOrder,
    });

  const createOrUpdateBook = async (formValues: UpsertBookFormValues) => {
    if (!formValues.id) {
      const result = await createNewBookGQL({
        variables: {
          booksInput: [
            {
              name: formValues.name,
            },
          ],
        },
      });
      return result.data?.insertIntobooksCollection?.records[0];
    }
    const result = await updateBookGQL({
      variables: {
        bookId: formValues.id,
        updatedBook: {
          name: formValues.name,
        },
      },
    });
    return result.data?.updatebooksCollection.records[0];
  };

  const updateChapterOrder = async (formValues: UpsertBookFormValues) => {
    const orderUpdatedChapters = formValues.chapters.filter(
      (chapter) => chapter.order !== chapter.originalOrder
    );
    if (orderUpdatedChapters.length > 0) {
      const updatingPromises = orderUpdatedChapters.map((chapter) =>
        updateChapterOrderGQL({
          variables: {
            chapterId: chapter.id,
            order: chapter.order || 1,
          },
        })
      );

      await Promise.all(updatingPromises);
    }
  };
  const isNewChapter = (chapter: FormChapterValue) => !!chapter.isNew;

  const upsertBook = async (formValues: UpsertBookFormValues) => {
    const theBook = await createOrUpdateBook(formValues);
    if (assureNumber(formValues.removeChapters?.length) > 0) {
      await removeChaptersGQL({
        variables: {
          chapterIds: formValues.removeChapters,
        },
      });
    }
    if (formValues.chapters.filter(isNewChapter).length > 0) {
      await createNewChaptersGQL({
        variables: {
          chaptersInput: formValues.chapters
            .filter(isNewChapter)
            .map((chapter) => ({
              id: chapter.id,
              book: theBook?.id,
              name: chapter.name,
              parent: chapter.parentId,
              order: chapter.order,
            })),
        },
      });
    }
    await updateChapterOrder(formValues);
    args?.onSuccess?.();
  };

  const getGqlBook = useCallback(() => {
    if (insertBookData) {
      return insertBookData.insertIntobooksCollection?.records[0];
    }
    if (updateBookData) {
      return updateBookData.updatebooksCollection.records[0];
    }
    return null;
  }, [insertBookData, updateBookData]);

  const getGqlChapters = useCallback(() => {
    const newChapters =
      insertChaptersData?.insertIntochaptersCollection?.records?.map(
        (gqlChapter) => ({
          id: gqlChapter.id,
          name: gqlChapter.name || "",
        })
      ) || [];
    const existingChapters =
      updateBookData?.updatebooksCollection?.records?.[0]?.chaptersCollection?.edges?.map(
        (gqlChapterEdge) =>
          createFullChapter({
            id: gqlChapterEdge.node.id,
            name: gqlChapterEdge.node.name || "",
          })
      ) || [];
    const removedChaptersID =
      removeChaptersData?.deleteFromchaptersCollection?.records?.map(
        (gqlChapter) => gqlChapter.id
      ) || [];
    return [...existingChapters, ...newChapters].filter(
      (chapter) => !removedChaptersID.includes(chapter.id)
    );
  }, [insertChaptersData, updateBookData, removeChaptersData]);

  return {
    upsertBook,
    loading:
      insertBookLoading ||
      updateBookLoading ||
      insertChaptersLoading ||
      removeChaptersLoading ||
      updateChapterOrderLoading,
    book: useMemo(() => {
      const gqlBook = getGqlBook();
      const gqlChapters = getGqlChapters();
      if (!gqlBook) return null;
      return convertBook({
        id: gqlBook.id,
        name: gqlBook.name || "",
        color: gqlBook.color,
        chapters: gqlChapters?.map((gqlChapter) =>
          createFullChapter({
            id: gqlChapter.id,
            name: gqlChapter.name || "",
          })
        ),
      });
    }, [getGqlBook, getGqlChapters]),
  };
};
