import { NextRequest } from "next/server";

export const matchPath = (path: string, route: string) => {
  return path.startsWith(route);
};

export const classNameForPath = (
  path: string,
  route: string,
  ...values: string[]
) => {
  return matchPath(path, route) ? values.join(" ") : "";
};

export const matchPathsFromReq = (req: NextRequest, routes: string[]) => {
  return routes.some((route) => matchPath(req.nextUrl.pathname, route));
};
