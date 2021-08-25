import { useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/client';
import HomeLayout from 'layouts/HomeLayout';
import { HomeView, GraphView, HistoryView } from 'components/homeViews';

export default function Home({ loginTransactions }) {
    const [view, setView] = useState('home');
    const [currentTransactions, setCurrentTransactions] =
        useState(loginTransactions);

    return (
        <div>
            <HomeLayout setView={setView}>
                {
                    {
                        home: (
                            <HomeView
                                setCurrentTransactions={setCurrentTransactions}
                            />
                        ),
                        graph: <GraphView />,
                        history: (
                            <HistoryView
                                currentTransactions={currentTransactions}
                            />
                        ),
                    }[view]
                }
            </HomeLayout>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session) {
        const tranRes = await fetch(
            `${process.env.HOST}/api/transaction?userId=${session.id}`,
            {
                method: 'GET',
            }
        );

        if (!tranRes.ok) return { props: { transactions: [] } };

        const { transactions } = await tranRes.json();
        return {
            props: { loginTransactions: transactions },
        };
    }

    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    };
}
