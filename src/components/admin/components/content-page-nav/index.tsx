import React, { useMemo } from "react";
import { FilterType } from "@/hooks/use-filter-context/types";
import { useFilter } from "@/hooks/use-filter-context";

interface Props {
  filterType: FilterType;
}

export const AdminContentPageNav: React.FC<Props> = ({ filterType }) => {
  const { totalSize, perPageSize, pageSize, page, setPageNumber } =
    useFilter(filterType);

  const pages = useMemo(() => {
    const allPages = [...Array(Math.ceil(totalSize / perPageSize))].map(
      (_, i) => i
    );
    if (allPages.length <= pageSize) return allPages;
    const pageFrom = Math.max(
      0,
      Math.min(page - Math.floor(pageSize / 2), allPages.length - pageSize)
    );
    const pageTo = Math.min(allPages.length, pageFrom + pageSize);
    return allPages.slice(pageFrom, pageTo);
  }, [page, totalSize, perPageSize, pageSize]);

  const inFirstInterval = useMemo(() => {
    return pages[0] === 0;
  }, [pages]);

  const inLastInterval = useMemo(() => {
    return pages[pages.length - 1] === Math.ceil(totalSize / perPageSize) - 1;
  }, [pages, totalSize, perPageSize]);

  return (
    <div className="btn-group sm:justify-start justify-center">
      {!inFirstInterval && (
        <>
          <input
            type="radio"
            name="options"
            data-title="1"
            className="btn flex-grow"
            onChange={() => setPageNumber(1)}
          />
          <div className="btn btn-disabled flex-grow">...</div>
        </>
      )}
      {pages.map((i) => (
        <input
          key={i}
          type="radio"
          name="options"
          data-title={i + 1}
          className="btn flex-grow"
          checked={page === i + 1}
          onChange={() => setPageNumber(i + 1)}
        />
      ))}
      {!inLastInterval && (
        <>
          <div className="btn btn-disabled flex-grow">...</div>
          <input
            type="radio"
            name="options"
            data-title={Math.ceil(totalSize / perPageSize)}
            className="btn flex-grow"
            onChange={() => setPageNumber(Math.ceil(totalSize / perPageSize))}
          />
        </>
      )}
    </div>
  );
};
