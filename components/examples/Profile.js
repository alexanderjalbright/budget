import { useSession } from 'next-auth/client';

export default function Profile() {
    const [session, loading] = useSession();

    if (loading) return null;

    if (!loading && !session) {
        return <p>You are not logged in</p>;
    }

    return (
        <>
            <div>Name: {session.user.name}</div>
            <div>Email: {session.user.email}</div>
            <div>
                <img
                    className="rounded-full w-24 h-24"
                    src={session.user.image}
                />
            </div>
        </>
    );
}
