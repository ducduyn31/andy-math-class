export const assureNonNull = <T>(array?: (T | null | undefined)[]): T[] => {
  if (!array) return [];
  return array.filter((item) => !!item) as T[];
};
