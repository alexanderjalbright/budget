import Link from 'next/link';

import { useSession, getSession } from 'next-auth/client';

export default function Page() {
    const [session, loading] = useSession();

    if (typeof window !== 'undefined' && loading) {
        return <div>loading</div>;
    }

    if (!session) {
        return <p>Access Denied</p>;
    }

    return (
        <div>
            <h1>Protected Page</h1>
            <p>You can view this page because you are signed in.</p>
            <Link href="/">
                <a className="text-blue-600 hover:text-blue-800 visited:text-purple-600">
                    Go to Home
                </a>
            </Link>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: { session },
    };
}
