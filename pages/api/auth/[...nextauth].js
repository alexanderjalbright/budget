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
        debug: process.env.NODE_ENV === 'development',
        jwt: {
            secret: process.env.JWT_SECRET,
        },
        callbacks: {
            signin: async (user, account, profile) => {
                const isAllowedToSignIn = true;
                if (isAllowedToSignIn) {
                    return '/home';
                } else {
                    // Return false to display a default error message
                    return '/';
                    // Or you can return a URL to redirect to:
                    // return '/unauthorized'
                }
            },
        },
        adapter: Adapters.TypeORM.Adapter(process.env.MONGODB_URI, {
            models: Models,
        }),
    });
};
