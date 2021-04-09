import { PlaygroundDisplay, SignIn, Profile } from 'components/examples';
import { getSession } from 'next-auth/client';

export default function Login({ names }) {
    return (
        <div>
            <h1>Log in</h1>
            <SignIn />
            <Profile />
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
