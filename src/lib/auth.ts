import prisma from '@/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Define custom types
interface CustomUser extends User {
  role: string;
  grade: string;
  section: string;
}

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    grade: string;
    section: string;
  };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(
        credentials: { email: string; password: string } | undefined,
      ): Promise<CustomUser | null> {
        if (!credentials) throw new Error('Please provide your credentials!');
        try {
          const user = await prisma.teacher.findFirst({
            where: { email: credentials.email },
          });
          if (!user) {
            throw new Error('User Not found');
          }

          if (user.allowed === false) {
            throw new Error('User not allowed, Contact Administration!');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isPasswordValid) {
            throw new Error('Invalid Credentials');
          }
          return {
            id: user.id,
            email: user.email,
            name: user.fullname,
            role: user.role,
            grade: user.gradeId,
            section: user.section,
          };
        } catch (error) {
          throw error instanceof Error ? error : new Error('Unable to login!');
        }
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<CustomSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
          role: token.role as string,
          grade: token.grade as string,
          section: token.section as string,
        },
      };
    },
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user: CustomUser | undefined;
    }): Promise<JWT> {
      if (user) {
        token.role = user.role;
        token.grade = user.grade;
        token.section = user.section;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      grade: string;
      section: string;
    };
  }

  interface User {
    role: string;
    grade: string;
    section: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    grade?: string;
    section?: string;
  }
}
