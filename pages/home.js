import { useState } from 'react';
import { getSession } from 'next-auth/client';
import HomeLayout from 'layouts/HomeLayout';
import { HomeView, GraphView, HistoryView } from 'components/homeViews';

export default function Home() {
    const [view, setView] = useState('home');

    return (
        <div>
            <HomeLayout setView={setView}>
                {
                    {
                        home: <HomeView />,
                        graph: <GraphView />,
                        history: <HistoryView />,
                    }[view]
                }
            </HomeLayout>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            props: { session },
        };
    }
    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    };
}
