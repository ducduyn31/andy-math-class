import NextAuth from "next-auth";
import { authOptions } from "@/helpers/auth/options";

export default NextAuth(authOptions);
