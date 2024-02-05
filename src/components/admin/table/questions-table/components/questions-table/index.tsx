import React, { useMemo, useRef } from "react";
import { AdminQuestionRow } from "@/components/admin/table/questions-table/components/question-row";
import { useVirtualizer } from "@/helpers/virtual";
import { useQuestionsContext } from "@/components/admin/table/questions-table/components/questions-provider";
import { useDebounce } from "react-use";
import { assureNumber } from "@/helpers/number";
import { EmptyTable } from "@/components/admin/table/empty-table";
import { Loading } from "@/components/loading";

interface Props {}

export const QuestionsTable: React.FC<Props> = () => {
  const {
    questions,
    externalLoadComplete,
    externalLoading,
    loadFromExternalSource,
  } = useQuestionsContext();

  const rowSize = 97;
  const headerSize = 48;
  const containerSize = useMemo(() => {
    if (!externalLoadComplete || externalLoading) return 650 - headerSize;
    return Math.min(questions.length * rowSize + headerSize, 650);
  }, [questions, externalLoadComplete, externalLoading]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: !externalLoadComplete ? questions.length + 1 : questions.length,
    getScrollElement: () => scrollerRef.current,
    estimateSize: () => rowSize,
    overscan: 5,
    initialOffset: headerSize,
  });

  useDebounce(
    () => {
      if (externalLoadComplete || externalLoading) return;
      if (
        assureNumber(virtualizer.getVirtualItems().at(-1)?.index) <
        questions.length
      )
        return;
      loadFromExternalSource?.();
    },
    500,
    [
      externalLoadComplete,
      externalLoading,
      loadFromExternalSource,
      questions.length,
      virtualizer.getVirtualItems(),
    ]
  );

  if (questions.length === 0 && externalLoadComplete && !externalLoading) {
    return <EmptyTable columns={["Name", "Book", "Chapter", "Action"]} />;
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
              <th>Book</th>
              <th>Chapter</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="bg-base-100 text-base-content">
            {virtualizer.getVirtualItems().map((row, index) => {
              if (row.index === questions.length) {
                return (
                  <Loading
                    type="table-button"
                    key="load-more"
                    style={{
                      height: row.size,
                      transform: `translateY(${
                        row.start - index * row.size
                      }px)`,
                    }}
                    onClick={() => loadFromExternalSource?.()}
                  />
                );
              }

              const question = questions[row.index];

              if (!question) return null;

              return (
                <AdminQuestionRow
                  key={question.id}
                  index={index}
                  question={question}
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
