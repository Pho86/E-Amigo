import NextAuth, { type NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "server/db/client"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        }),
        DiscordProvider({
            clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET!,
          }),
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)