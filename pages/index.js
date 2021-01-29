import {
    TailwindVerification,
    PlaygroundDisplay,
    SignIn,
    Profile,
} from 'components/examples';
import Link from 'next/link';

export default function Home({ names }) {
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
