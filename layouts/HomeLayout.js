import NavBar from 'components/navbar/NavBar';
import { useSession } from 'next-auth/client';
import ProfileMenu from 'components/profileMenu/ProfileMenu';
import FullPageLoader from 'components/loading/FullPageLoader';

export default function HomeLayout({ children, setView }) {
    const [session, loading] = useSession();

    if (loading) return <FullPageLoader message="Checking profile..." />;

    if (!loading && !session) {
        return <div>You are not logged in.</div>;
    }
    return (
        <div className="flex flex-col min-h-screen">
            <div className="px-2 pb-2 flex h-12 items-center justify-between">
                <h1 className="w-25 pr-2">Home</h1>
                <div className="flex-grow text-center">Budget</div>
                <ProfileMenu />
            </div>
            <div className="flex-grow px-2 flex flex-col">{children}</div>
            <NavBar setView={setView} />
        </div>
    );
}
