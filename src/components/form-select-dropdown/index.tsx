import React, { useRef } from "react";
import { useVirtualizer } from "@/helpers/virtual";
import { useClickAway, useDebounce, useToggle } from "react-use";
import { assureNumber } from "@/helpers/number";
import {
  isSelectableOption,
  SelectableOption,
  SelectOption,
  SelectOptions,
} from "@/helpers/form";
import { switchCaseReturn } from "@/helpers/array";
import { ControllerRenderProps } from "react-hook-form";

interface Props extends ControllerRenderProps {
  options: SelectOption[];
  size?: "sm" | "md" | "lg";
  hasNext?: boolean;
  loading?: boolean;
  loadNext?: () => void;
  label: string;
}

export const FormSelectDropdown: React.FC<Props> = ({
  label,
  size,
  options,
  hasNext,
  loadNext,
  loading,
  value: selectedOption,
  onChange,
  onBlur,
  name,
  ref,
}) => {
  const [isOpen, toggleOpen] = useToggle(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: hasNext ? options.length + 1 : options.length,
    getScrollElement: () => scrollerRef.current,
    estimateSize: () => 32,
    overscan: 5,
  });

  useClickAway(parentRef, () => {
    toggleOpen(false);
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

  const selectOption = (option: SelectOption) => {
    onChange(option);
    toggleOpen(false);
  };

  return (
    <div>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>

      <div className="relative w-full" ref={parentRef}>
        <input
          type="hidden"
          name={name}
          ref={ref}
          value={selectedOption}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button
          type="button"
          data-testid="dropdown-button"
          className={`input input-bordered input-${size} w-full flex flex-row pl-3 pr-4`}
          onClick={() => toggleOpen()}
        >
          <p className="flex-grow text-left h-full flex items-center">
            {switchCaseReturn(
              selectedOption,
              {
                case: SelectOptions.ANY_DEFAULT,
                return: "Any",
              },
              {
                case: null,
                return: (opt) => {
                  return (opt as SelectableOption)?.label;
                },
              }
            )}
          </p>
          <div className="h-full flex flex-col justify-center">
            <svg height="8" width="8" viewBox="0 0 96.154 96.154">
              <g>
                <path
                  d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
		c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
		c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"
                />
              </g>
            </svg>
          </div>
        </button>
        {isOpen && (
          <div
            ref={scrollerRef}
            className="absolute z-10 w-full bg-base-100 rounded-b-box shadow max-h-32 overflow-y-auto"
          >
            <ul
              className="p-2 w-full"
              style={{ height: `${virtualizer.getTotalSize()}px` }}
              data-testid="dropdown-list"
            >
              {virtualizer.getVirtualItems().map((item, index) => {
                if (item.index === options.length)
                  return (
                    <li
                      className="w-full"
                      style={{
                        height: `${item.size}px`,
                        transform: `translateY(${
                          item.start - index * item.size
                        }px)`,
                      }}
                    >
                      <div className="loading loading-dots loading-sm"></div>
                    </li>
                  );

                const option = options[item.index];
                if (!option) return null;

                return switchCaseReturn(
                  option,
                  {
                    case: SelectOptions.ANY_DEFAULT,
                    return: (
                      <li
                        key="any-default"
                        data-testid="dropdown-option"
                        className="w-full hover:bg-base-200 cursor-pointer"
                        style={{
                          height: `${item.size}px`,
                          transform: `translateY(${
                            item.start - index * item.size
                          }px)`,
                        }}
                        onClick={() => selectOption(SelectOptions.ANY_DEFAULT)}
                      >
                        <div className="flex flex-row items-center">
                          <div className="flex-grow">
                            <span className="font-normal">Any</span>
                          </div>
                          {selectedOption === SelectOptions.ANY_DEFAULT && (
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          )}
                        </div>
                      </li>
                    ),
                  },
                  {
                    case: null,
                    return: (opt) => {
                      if (!isSelectableOption(opt)) return null;
                      return (
                        <li
                          key={opt.uniqueKey}
                          data-testid="dropdown-option"
                          className="w-full hover:bg-base-200 cursor-pointer"
                          style={{
                            height: `${item.size}px`,
                            transform: `translateY(${
                              item.start - index * item.size
                            }px)`,
                          }}
                          onClick={() => selectOption(opt)}
                        >
                          <div className="flex flex-row items-center">
                            <div className="flex-grow">
                              <span className="font-normal">{opt.label}</span>
                            </div>
                            {opt.uniqueKey ===
                              (selectedOption as SelectableOption)
                                ?.uniqueKey && (
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            )}
                          </div>
                        </li>
                      );
                    },
                  }
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
