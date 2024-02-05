import React, { useRef } from "react";
import { useVirtualizer } from "@/helpers/virtual";
import { useClickAway, useDebounce } from "react-use";
import { assureNumber } from "@/helpers/number";
import { useDropdownContext } from "@/components/multi-select-dropdown/components/dropdown-provider";
import { switchCaseReturn } from "@/helpers/array";
import { SelectableOption, SelectOptions } from "@/helpers/form";

interface Props {}

export const DropdownSection: React.FC<Props> = ({}) => {
  const {
    showDropdown,
    setShowDropdown,
    hasNext,
    options,
    selectedOptionsSet,
    loading,
    loadNext,
    dispatchSelectEvent,
    searchTerm,
    setSearchTerm,
  } = useDropdownContext();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useClickAway(scrollerRef, () => {
    setShowDropdown(false);
  });

  const virtualizer = useVirtualizer({
    count: hasNext ? options.length + 1 : options.length,
    getScrollElement: () => scrollerRef.current,
    estimateSize: () => 50,
    initialOffset: 48,
    overscan: 5,
  });

  useDebounce(
    () => {
      if (!hasNext || loading) return;
      if (
        assureNumber(virtualizer.getVirtualItems().at(-1)?.index) <
        options.length
      )
        return;
      loadNext?.();
    },
    500,
    [hasNext, loading, virtualizer.getVirtualItems(), options.length, loadNext]
  );

  if (!showDropdown) return null;

  return (
    <div
      className="dropdown-content menu menu-md p-2 shadow bg-base-100 rounded-box w-full z-50 h-[300px] overflow-y-auto"
      ref={scrollerRef}
    >
      <ul
        tabIndex={0}
        style={{ height: `${virtualizer.getTotalSize()}px` }}
        className="relative"
      >
        <li className="top-0">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm?.(e.target.value);
            }}
          />
        </li>
        {virtualizer.getVirtualItems().map((item, index) => {
          if (item.index === options.length) {
            return (
              <li
                key="load-more"
                className="mb-2 loading loading-dots"
                style={{
                  height: item.size,
                  transform: `translateY(${item.start - index * item.size}px)`,
                }}
              />
            );
          }

          const option = options[item.index];
          if (!option) return null;

          return switchCaseReturn(
            option,
            {
              case: SelectOptions.ANY_DEFAULT,
              return: null,
            },
            {
              case: null,
              return: (o) => {
                const opt = o as SelectableOption;
                return (
                  <li
                    key={opt.uniqueKey}
                    className="py-2"
                    style={{
                      height: item.size,
                      transform: `translateY(${
                        item.start - index * item.size
                      }px)`,
                    }}
                  >
                    <p>
                      {opt.label}
                      <input
                        type="checkbox"
                        className="checkbox checkbox-accent absolute right-5 border-2"
                        checked={selectedOptionsSet.has(opt.uniqueKey)}
                        onChange={(e) => {
                          dispatchSelectEvent?.({
                            selectedOption: option,
                            type: e.target.checked ? "select" : "deselect",
                          });
                        }}
                      />
                    </p>
                  </li>
                );
              },
            }
          );
        })}
      </ul>
    </div>
  );
};
