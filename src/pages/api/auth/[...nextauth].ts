import NextAuth from "next-auth";
import { serverAuthOptions } from "@/helpers/auth/options";

export default NextAuth(serverAuthOptions);
