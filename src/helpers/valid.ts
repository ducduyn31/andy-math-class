export const isNullOrUndefined = (
  value: unknown
): value is null | undefined => {
  return value === null || value === undefined;
};

export const isEmpty = (value: unknown): boolean => {
  return isNullOrUndefined(value) || value === "";
};
