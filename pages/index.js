import {
    TailwindVerification,
    PlaygroundDisplay,
    SignIn,
    Profile,
} from 'components/examples';
import Numpad from 'components/numpad/Numpad';
import NavBar from 'components/navbar/NavBar';
import Link from 'next/link';
import {useState} from 'react'

export default function Home({ names }) {
    const [amount, setAmount] = useState();

    return (
        <div>
            <h1>Home</h1>
            <SignIn />
            <Profile />
            <TailwindVerification />
            <PlaygroundDisplay {...{ names }} />
            <Link href="/user">
                <a className="text-blue-600 hover:text-blue-800 visited:text-purple-600">
                    Go to ServerSide Protected Page
                </a>
            </Link>
            <div>{amount}</div>
            <Numpad setValue={setAmount} />
            <NavBar />
        </div>
    );
}

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.HOST}/api/creators`);
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { names: data }, // will be passed to the page component as props
    };
}
