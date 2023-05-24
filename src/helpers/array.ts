import { IndexMap } from "@/helpers/index-map";

export const assureNonNull = <T>(array?: (T | null | undefined)[]): T[] => {
  if (!array) return [];
  return array.filter((item) => !!item) as T[];
};

export const assureNonDuplicate = <T>(array: T[]): T[] =>
  Array.from(new Set(array));

export const shuffle = <T>(array: T[]): T[] => {
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
};

export const isArrayTypeOfRecord = <T extends Record<string, unknown>>(
  array: unknown[]
): array is T[] => {
  return array.every((item) => typeof item === "object");
};

export const zip = <T, U>(array1: T[], array2: U[]): [T, U][] => {
  const zippedArray: [T, U][] = [];
  const length = Math.min(array1.length, array2.length);
  for (let i = 0; i < length; i++) {
    zippedArray.push([array1[i], array2[i]]);
  }
  return zippedArray;
};

export const createSortedArrayFromIndexMap = <T>(
  objects: T[],
  field?: keyof T
): T[] => {
  const indexMap = new IndexMap(objects);
  if (field) indexMap.sortByField(field as string);
  const sortedArray = [];
  for (let i = 0; i < indexMap.size; i++) {
    sortedArray.push(indexMap.getByIndex(i));
  }
  return sortedArray as T[];
};

interface SwitchCaseType<T, R> {
  case: T | T[] | ((value: T) => boolean) | null | undefined;
  return: R;
}

export const switchCaseReturn = <T, R>(
  value: T,
  ...cases: SwitchCaseType<T, R>[]
): R | null => {
  const nullCase = cases.find((item) => item.case === null);
  for (const { case: caseValue, return: returnValue } of cases) {
    if (
      (Array.isArray(caseValue) && caseValue.includes(value)) ||
      caseValue === value ||
      // @ts-ignore
      (typeof caseValue === "function" && caseValue(value))
    )
      return returnValue;
  }
  return nullCase?.return || null;
};
