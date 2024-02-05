import React, { PropsWithChildren } from "react";

interface Props<T> extends PropsWithChildren {
  of: T[] | undefined | null;
  render: (element: T, index: number) => React.ReactNode;
  empty?: React.ReactElement;
  clamp?: number;
  expandClampElement?: React.ReactElement;
}

export const Each = <T,>({
  of,
  render,
  clamp,
  empty,
  expandClampElement,
  children,
}: Props<T>) => {
  if (!of || of.length === 0) {
    return empty || null;
  }
  const length = clamp ? Math.min(of.length, clamp) : of.length;
  return (
    <>
      {of.slice(0, length).map((each, i) => (
        <React.Fragment key={i}>{render(each, i)}</React.Fragment>
      ))}
      {clamp && of.length > clamp && expandClampElement}
      {children}
    </>
  );
};
