export type FilterStrategy<T> =
  | TextFilterStrategy<T>
  | SelectFilterStrategy<T>
  | IncludeFilterStrategy<T>;

interface TextFilterStrategy<T> {
  type: FilterStrategyCategory.TEXT;
  params: {
    mapper: (input: T) => string;
    match: string | null;
  };
}

interface SelectFilterStrategy<T> {
  type: FilterStrategyCategory.SELECT;
  params: {
    match: string;
    mapper: (input: T) => string;
  };
}

interface IncludeFilterStrategy<T> {
  type: FilterStrategyCategory.INCLUDE;
  params: {
    match: string;
    mapper: (input: T) => string[];
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
      : mapper(check).toLowerCase().includes(match.toLowerCase());
};

export const createIncludeFilterHandler = <T>(strategy: FilterStrategy<T>) => {
  if (strategy.type !== FilterStrategyCategory.INCLUDE) return () => true;

  const {
    params: { match, mapper },
  } = strategy;

  if (match === "any") return () => true;

  return (check: T) => mapper(check).includes(match);
};

export const createSelectFilterHandler = <T>(strategy: FilterStrategy<T>) => {
  if (strategy.type !== FilterStrategyCategory.SELECT) return () => true;

  const {
    params: { mapper, match },
  } = strategy;

  if (match === "any") return () => true;

  return (check: T) => mapper(check) === match;
};
