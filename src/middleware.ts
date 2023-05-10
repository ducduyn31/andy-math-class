import { NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import * as jose from "jose";
import { JWT, JWTDecodeParams } from "next-auth/jwt";
import { matchPathsFromReq } from "@/helpers/path";
import { isEmpty } from "@/helpers/valid";
import { createServerAuthClient } from "@/lib/supabase";

const allowedPaths = ["/_next", "/public", "/favicon.ico", "/api"];
const preparePaths = ["/register"];
const publicOnlyPaths = ["/login"];
const adminOnlyPaths = ["/admin"];

const middleware = async (req: NextRequestWithAuth) => {
  const res = NextResponse.next();

  if (matchPathsFromReq(req, allowedPaths)) return res;

  const token = req.nextauth.token;

  const url = req.nextUrl.clone();

  const haveNotCompleteSignUpButOnPrivatePath =
    !!token && isEmpty(token.name) && !matchPathsFromReq(req, preparePaths);
  const haveCompletedSignUpButOnPreparePath =
    !!token && !isEmpty(token.name) && matchPathsFromReq(req, preparePaths);
  const isNotLoggedInButOnPrivatePath =
    !token && !matchPathsFromReq(req, publicOnlyPaths);
  const isNotAdminButOnAdminPath =
    !token?.isAdmin && matchPathsFromReq(req, adminOnlyPaths);

  if (isNotLoggedInButOnPrivatePath) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (haveNotCompleteSignUpButOnPrivatePath) {
    url.pathname = "/register";
    return NextResponse.redirect(url);
  }

  if (isNotAdminButOnAdminPath || haveCompletedSignUpButOnPreparePath) {
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
  if (typeof window !== "undefined") return null;

  const authClient = createServerAuthClient({
    options: {
      global: {
        headers: {
          authorization: `Bearer ${process.env.NEXT_PRIVATE_SERVICE_ROLE_KEY!}`,
        },
      },
    },
  });
  const { data } =
    (await authClient
      ?.from("sessions")
      .select("userId")
      .eq("sessionToken", token)
      .gt("expires", "now()")
      .single()) ?? {};
  if (!data) return null;
  const { data: userData } =
    (await authClient?.from("users").select().eq("id", data.userId).single()) ??
    {};
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
    const decodedToken = jose.decodeJwt(token);
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
  },
});

export const config = {
  matcher: "/:path*",
};
