import { NextRequest } from "next/server";

export const matchPath = (path: string, route: string) => {
  return path.startsWith(route);
};

export const matchPathsFromReq = (req: NextRequest, routes: string[]) => {
  return routes.some((route) => matchPath(req.nextUrl.pathname, route));
};
