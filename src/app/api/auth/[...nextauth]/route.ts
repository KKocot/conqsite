import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
