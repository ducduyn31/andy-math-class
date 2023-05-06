import { NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import * as jwt from "jsonwebtoken";
import { JWT, JWTDecodeParams } from "next-auth/jwt";
import { createClientWithSession } from "@/hooks/use-supabase-context";
import { matchPathsFromReq } from "@/helpers/path";

const allowedPaths = ["/_next", "/public", "/favicon.ico", "/api"];
const publicOnlyPaths = ["/register", "/login"];
const adminOnlyPaths = ["/admin"];

const middleware = async (req: NextRequestWithAuth) => {
  const res = NextResponse.next();

  if (matchPathsFromReq(req, allowedPaths)) return res;

  const session = req.nextauth.token;

  const url = req.nextUrl.clone();

  const isLoggedInButOnPublicOnlyPath =
    !!session && matchPathsFromReq(req, publicOnlyPaths);
  const isNotLoggedInButOnPrivatePath =
    !session && !matchPathsFromReq(req, publicOnlyPaths);
  const isNotAdminButOnAdminPath =
    !session?.isAdmin && matchPathsFromReq(req, adminOnlyPaths);

  if (isNotLoggedInButOnPrivatePath) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isLoggedInButOnPublicOnlyPath || isNotAdminButOnAdminPath) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname === "/admin") {
    url.pathname = "/admin/users";
    return NextResponse.redirect(url);
  }

  return res;
};

const replaceJwtDecodeWithDBSearch = async ({
  token,
}: JWTDecodeParams): Promise<JWT | null> => {
  const supabase = createClientWithSession({
    options: { db: { schema: "next_auth" } },
  });
  const { data } = await supabase
    .from("sessions")
    .select("userId")
    .eq("sessionToken", token)
    .gt("expires", "now()")
    .single();
  if (!data) return null;
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("id", data.userId)
    .single();
  if (!userData) return null;
  return {
    name: userData?.firstName,
    email: userData?.email,
    picture: userData?.image,
    isAdmin: !!userData?.isAdmin,
  };
};

const tryJwtDecode = async ({
  token,
  secret,
}: JWTDecodeParams): Promise<JWT | null> => {
  try {
    if (!token) throw new Error("No token");
    const decodedToken = (await jwt.decode(token)) as JWT;
    if (!decodedToken) throw new Error("No token");
    return decodedToken;
  } catch (e) {
    return replaceJwtDecodeWithDBSearch({ token, secret });
  }
};

export default withAuth(middleware, {
  callbacks: {
    authorized: async ({ req, token }) => {
      return (!token && matchPathsFromReq(req, publicOnlyPaths)) || !!token;
    },
  },
  jwt: {
    decode: tryJwtDecode,
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
});

export const config = {
  matcher: "/:path*",
};
