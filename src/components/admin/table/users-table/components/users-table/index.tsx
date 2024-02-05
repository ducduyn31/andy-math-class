import React, { useMemo, useRef } from "react";
import { AdminUserRow } from "@/components/admin/table/users-table/components/user-row";
import { useVirtualizer } from "@/helpers/virtual";
import { useUsersContext } from "@/components/admin/table/users-table/components/users-provider";
import { useDebounce } from "react-use";
import { assureNumber } from "@/helpers/number";
import { EmptyTable } from "@/components/admin/table/empty-table";
import { Loading } from "@/components/loading";

interface Props {}

export const UsersTable: React.FC<Props> = ({}) => {
  const {
    users,
    externalLoadComplete,
    externalLoading,
    loadFromExternalSource,
  } = useUsersContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const rowSize = 97;
  const headerSize = 48;
  const containerSize = useMemo(() => {
    if (!externalLoadComplete || externalLoading) return 650 - headerSize;
    return Math.min(users.length * rowSize + headerSize, 650);
  }, [users, externalLoadComplete, externalLoading]);

  const virtualizer = useVirtualizer({
    count: !externalLoadComplete ? users.length + 1 : users.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowSize,
    overscan: 5,
    initialOffset: headerSize,
  });

  useDebounce(
    () => {
      if (externalLoadComplete || externalLoading) return;
      if (
        assureNumber(virtualizer.getVirtualItems().at(-1)?.index) < users.length
      )
        return;
      loadFromExternalSource?.();
    },
    500,
    [
      externalLoadComplete,
      externalLoading,
      loadFromExternalSource,
      users.length,
      virtualizer.getVirtualItems(),
    ]
  );

  if (users.length === 0 && externalLoadComplete && !externalLoading) {
    return (
      <EmptyTable
        columns={["Name", "Email", "Assigned Books", "Actions", "Enabled"]}
      />
    );
  }

  return (
    <div
      className="card bg-base-100 drop-shadow-xl mt-5 md:mt-0 overflow-auto"
      style={{ height: `${containerSize}px` }}
      ref={scrollRef}
    >
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table className="table w-full">
          {/* head */}
          <thead className="sticky top-0 bg-primary z-50 text-primary-content">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Assigned Books</th>
              <th>Actions</th>
              <th>Enabled</th>
            </tr>
          </thead>
          <tbody className="bg-base-100 text-base-content">
            {virtualizer.getVirtualItems().map((row, index) => {
              if (row.index === users.length) {
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
                    loading={externalLoading}
                    onClick={() => loadFromExternalSource?.()}
                  />
                );
              }

              const user = users[row.index];

              if (!user) return null;

              return (
                <AdminUserRow
                  key={user.id}
                  index={index}
                  user={user}
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
