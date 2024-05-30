import { NextAuthConfig, User } from "next-auth";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/db/db";
import { accounts, DatabaseUser, users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { whitelist } from "@/db/schema/whitelist";
import { Adapter, AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),

  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ profile, user }) {
      if (!profile?.id) return false;
      const [onWhitelist] = await db
        .select()
        .from(whitelist)
        .where(eq(whitelist.discord_id, profile.id));
      if (user.id) {
        await db
          .update(users)
          .set({
            name: profile.global_name,
            image: profile.image_url,
          })
          .where(eq(users.id, user.id));
      }
      return !!onWhitelist;
    },

    async session({ session }) {
      return session;
    },
  },
};

declare module "next-auth/adapters" {
  interface AdapterUser extends User, DatabaseUser {}
}
declare module "next-auth" {
  interface Profile extends DiscordProfile {}
}
