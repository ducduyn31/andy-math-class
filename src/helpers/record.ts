export const getValueFromPath = <T>(
  target: Record<any, any>,
  path: string
): T | undefined => {
  const pathArray = path.split(".");
  let result = target;
  for (let i = 0; i < pathArray.length; i++) {
    if (!result) return undefined;
    result = result[pathArray[i]];
  }
  return result as T;
};
