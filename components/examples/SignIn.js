import { signIn, signOut, useSession } from 'next-auth/client';

export default function SignIn() {
    const [session, loading] = useSession();
    const providers = [
        { id: 'github', name: 'Github' },
        { id: 'google', name: 'Google' },
    ];

    if (loading) {
        return <div>Loading</div>;
    }

    if (!loading && !session) {
        return (
            <div>
                {providers.map((provider) => (
                    <div
                        key={`sign-in-provider-${provider.id}`}
                        className="pb-3"
                    >
                        <button
                            className="bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg"
                            onClick={() => signIn(provider.id)}
                        >
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <button
            className="bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg"
            onClick={signOut}
        >
            Sign out
        </button>
    );
}
