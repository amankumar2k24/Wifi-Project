// src/lib/auth.ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';

// Define the user type based on authorize return
interface User {
    id: string;
    email: string;
    role: string;
    name: string;
}

// Extend the JWT type (requires src/types/next-auth.d.ts)
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: string;
            email: string;
            name: string;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        role?: string;
        email?: string;
        name?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });
                    return { id: data.id, email: data.email, role: data.role, name: data.name } as User;
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Cast user to our custom User type which has the role property
                const customUser = user as unknown as User;
                token.id = customUser.id;
                token.role = customUser.role;
                token.email = customUser.email;
                token.name = customUser.name;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
    },
};

export default NextAuth(authOptions);