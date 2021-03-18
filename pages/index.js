import {
    TailwindVerification,
    PlaygroundDisplay,
    SignIn,
    Profile,
} from 'components/examples';
import { Submit } from 'components';
import Link from 'next/link';

// This is what shows up on the page
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
            <Submit data={'peepeepoopoo'} />
        </div>
    );
}

// This is a call to the API
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
