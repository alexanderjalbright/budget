import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';
import Models from '../../../models';

export default async (req, res) => {
    await NextAuth(req, res, {
        providers: [
            Providers.GitHub({
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
            }),
            Providers.Google({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
        ],
        site: process.env.NEXTAUTH_URL,
        secret: process.env.NEXT_AUTH_SECRET,
        // debug: process.env.NODE_ENV === 'development',
        debug: false,
        // jwt: {
        //     secret: process.env.JWT_SECRET,
        // },
        database: process.env.MONGODB_URI,
        callbacks: {
            signin: async (user, account, profile) => {
                return true;
            },
            session: async (session, user) => {
                session.id = user.id;
                return await session;
            },
        },
        adapter: Adapters.TypeORM.Adapter(process.env.MONGODB_URI, {
            models: Models,
        }),
    });
};
