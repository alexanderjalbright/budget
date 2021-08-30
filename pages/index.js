import { PlaygroundDisplay, SignIn, Profile } from 'components/examples';
import { SignInError } from 'components/SignInError';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function Login({ names }) {
    const { error } = useRouter().query;
    return (
        <div className="py-5 px-5 h-screen flex flex-col justify-around items-center text-center ">
            <h1 className="mb-3">Budget</h1>
            <h2 className="mb-3">Sign in</h2>
            <Profile />
            <SignIn />
            <SignInError error={error} />
            <PlaygroundDisplay {...{ names }} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/home',
                permanent: false,
            },
        };
    }

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
