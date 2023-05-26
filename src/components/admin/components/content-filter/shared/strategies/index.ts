import { createMapper, Mappers } from "@/helpers/mappers";

export type FilterStrategy<T> =
  | TextFilterStrategy<T>
  | SelectFilterStrategy<T>
  | IncludeFilterStrategy<T>;

interface TextFilterStrategy<T> {
  type: FilterStrategyCategory.TEXT;
  params: {
    match: string | null;
    mapper: Mappers;
  };
}

interface SelectFilterStrategy<T> {
  type: FilterStrategyCategory.SELECT;
  params: {
    match: string;
    mapper: Mappers;
  };
}

interface IncludeFilterStrategy<T> {
  type: FilterStrategyCategory.INCLUDE;
  params: {
    match: string;
    mapper: Mappers;
  };
}

export enum FilterStrategyCategory {
  TEXT = "text",
  SELECT = "select",
  INCLUDE = "include",
}

export const createTextFilterHandler = <T>(strategy: FilterStrategy<T>) => {
  if (strategy.type !== FilterStrategyCategory.TEXT) return () => true;
  const {
    params: { match, mapper },
  } = strategy;
  return (check: T) =>
    match === null
      ? true
      : createMapper(mapper)(check).toLowerCase().includes(match.toLowerCase());
};

export const createIncludeFilterHandler = <T>(strategy: FilterStrategy<T>) => {
  if (strategy.type !== FilterStrategyCategory.INCLUDE) return () => true;

  const {
    params: { match, mapper },
  } = strategy;

  if (match === "any") return () => true;

  return (check: T) => createMapper(mapper)(check).includes(match);
};

export const createSelectFilterHandler = <T>(strategy: FilterStrategy<T>) => {
  if (strategy.type !== FilterStrategyCategory.SELECT) return () => true;

  const {
    params: { mapper, match },
  } = strategy;

  if (match === "any") return () => true;

  return (check: T) => createMapper(mapper)(check) === match;
};
