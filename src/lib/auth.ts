import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import GitHub, { GitHubProfile } from "next-auth/providers/github";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
    signIn({ profile }) {
      const allowedUsers = process.env.ALLOWED_USERS?.split(",") || [];
      return !!profile && allowedUsers.includes((profile as any).login);
    },
  },
  pages: {
    signIn: "/login",
  },
});
