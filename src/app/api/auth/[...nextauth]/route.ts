import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { upload } from "@/lib/upload";

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET, 
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ user }) {
            try {
                await upload(user);
                return true; // Sign-in successful
            }catch (error) {
                console.error("Error during sign-in:", error);
                return false; // Sign-in failed
            }
          },
        async session({ session }) {
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };