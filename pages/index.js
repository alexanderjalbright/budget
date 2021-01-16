import TailwindVerification from '../components/examples/TailwindVerification';
import PlaygroundDisplay from '../components/examples/Creators';

export default function Home({ names }) {
    console.log('names', names);
    return (
        <div>
            <h1>Home</h1>
            <TailwindVerification />
            <PlaygroundDisplay {...{ names }} />
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
