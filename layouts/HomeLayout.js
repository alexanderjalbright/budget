import NavBar from 'components/navbar/NavBar';
import { Profile } from 'components/examples';
import { signOut } from 'next-auth/client';
import { useSession } from 'next-auth/client';
import styles from './HomeLayout.module.css';

export default function HomeLayout({ children, setView }) {
    const [session, loading] = useSession();

    if (loading) return null;

    if (!loading && !session) {
        return <p>You are not logged in</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="px-2 flex h-12 items-center justify-between">
                <h1>Home</h1>
                <div className="flex-grow"></div>
                {/* <div>{session.user.name}</div> */}
                <div className="h-full py-2">
                    <button
                        className="h-full mx-1 bg-blue-700 text-white border border-blue-700 font-bold py-0 px-6 rounded-lg"
                        onClick={signOut}
                    >
                        Sign out
                    </button>
                </div>
                <img
                    className="rounded-full self-center h-3/4 pl-2"
                    src={session.user.image}
                />
            </div>
            <div className="flex-grow px-2">{children}</div>
            <NavBar setView={setView} />
        </div>
    );
}
