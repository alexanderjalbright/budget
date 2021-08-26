import { useState } from 'react';
import { getSession } from 'next-auth/client';
import HomeLayout from 'layouts/HomeLayout';
import { HomeView, GraphView, HistoryView } from 'components/homeViews';
import { useTransactions, getAllTransactions } from 'hooks/useTransactions';
import Head from 'next/head';

export default function Home({ loginTransactions }) {
    const [view, setView] = useState('home');

    const transactions = useTransactions({ loginTransactions });

    if (transactions.error)
        console.log('Transactions Error', transactions.error);

    return (
        <div>
            <Head>
                <title>Budget</title>
            </Head>
            <HomeLayout setView={setView}>
                {
                    {
                        home: <HomeView transactions={transactions} />,
                        graph: <GraphView />,
                        history: <HistoryView transactions={transactions} />,
                    }[view]
                }
            </HomeLayout>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session) {
        const res = await getAllTransactions(session.id, `${process.env.HOST}`);
        return {
            props: { loginTransactions: res.transactions },
        };
    }

    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    };
}
