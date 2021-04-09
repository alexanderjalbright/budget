import NavBar from 'components/navbar/NavBar';
import { Profile } from 'components/examples';
import { signOut } from 'next-auth/client';

export default function HomeLayout({ children, setView }) {
    return (
        <div>
            <h1>Home</h1>
            <Profile />
            <button
                className="mr-5 bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg"
                onClick={signOut}
            >
                Sign out
            </button>
            {children}
            <NavBar setView={setView} />
        </div>
    );
}
