import React, { useMemo, useRef } from "react";
import { AdminBookRow } from "@/components/admin/table/books-table/components/book-row";
import { useVirtualizer } from "@/helpers/virtual";
import { useBooksContext } from "@/components/admin/table/books-table/components/books-provider";
import { useDebounce } from "react-use";
import { assureNumber } from "@/helpers/number";
import { EmptyTable } from "@/components/admin/table/empty-table";
import { Loading } from "@/components/loading";

interface Props {}

export const BooksTable: React.FC<Props> = () => {
  const {
    books,
    externalLoadComplete,
    externalLoading,
    loadFromExternalSource,
  } = useBooksContext();

  const rowSize = 97;
  const headerSize = 48;
  const containerSize = useMemo(() => {
    if (!externalLoadComplete || externalLoading) return 650 - headerSize;
    return Math.min(books.length * rowSize + headerSize, 650);
  }, [books, externalLoadComplete, externalLoading]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: !externalLoadComplete ? books.length + 1 : books.length,
    getScrollElement: () => scrollerRef.current,
    estimateSize: () => rowSize,
    overscan: 5,
    initialOffset: headerSize,
  });

  useDebounce(
    () => {
      if (externalLoadComplete || externalLoading) return;
      if (
        assureNumber(virtualizer.getVirtualItems().at(-1)?.index) < books.length
      )
        return;
      loadFromExternalSource?.();
    },
    500,
    [
      externalLoadComplete,
      externalLoading,
      loadFromExternalSource,
      books.length,
      virtualizer.getVirtualItems(),
    ]
  );

  if (books.length === 0 && externalLoadComplete && !externalLoading) {
    return <EmptyTable columns={["Name", "Chapter", "Action"]} />;
  }

  return (
    <div
      className="card bg-base-100 drop-shadow-xl mt-5 md:mt-0 overflow-auto"
      style={{ height: `${containerSize}px` }}
      ref={scrollerRef}
    >
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table className="table w-full">
          {/* head */}
          <thead
            className="sticky top-0 bg-primary z-50 text-primary-content"
            style={{
              height: `${headerSize}px`,
            }}
          >
            <tr>
              <th>Name</th>
              <th>Chapter</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="bg-base-100 text-base-content">
            {virtualizer.getVirtualItems().map((row, index) => {
              if (row.index === books.length) {
                return (
                  <Loading
                    type="table-button"
                    key="load-more"
                    colSpan={3}
                    style={{
                      height: row.size,
                      transform: `translateY(${
                        row.start - index * row.size
                      }px)`,
                    }}
                    loading={externalLoading}
                    onClick={() => loadFromExternalSource?.()}
                  />
                );
              }
              const book = books[row.index];

              if (!book) return null;

              return (
                <AdminBookRow
                  key={book.id}
                  index={index}
                  book={book}
                  rowConfig={row}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
