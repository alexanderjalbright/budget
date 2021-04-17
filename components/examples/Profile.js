import { useSession } from 'next-auth/client';

export default function Profile() {
    const [session, loading] = useSession();

    if (loading) return null;

    if (!loading && !session) {
        return <p>You are not logged in</p>;
    }

    return (
        <>
            <div>{session.user.name}</div>
            {/* <div>{session.user.email}</div> */}
            <img
                className="rounded-full self-center h-3/4"
                src={session.user.image}
            />
        </>
    );
}
