import { useReducer, useState } from 'react';
import { useSession } from 'next-auth/client';

export const useTransactions = ({ loginTransactions }) => {
    const [transactions, dispatchTransactions] = useReducer(
        transactionsReducer,
        loginTransactions
    );
    const [session, loading] = useSession();

    const [inProgress, setInProgress] = useState(false);

    const [error, setError] = useState('');

    const add = async ({ amount, category }) => {
        setInProgress(true);
        const json = await sendNewTransaction(amount, category);

        if (!json) {
            setError('No response');
            setInProgress(false);
            return;
        }

        if (json.error) {
            setError(json.error);
            setInProgress(false);
            return;
        }

        dispatchTransactions({
            type: 'add',
            payload: json.result,
        });

        setInProgress(false);
    };

    const refresh = async () => {
        if (loading || !session) return setError('session loading');
        if (!session) return setError('no session');

        const { transactions } = await getAllTransactions(session.id);
        dispatchTransactions({
            type: 'refresh',
            payload: transactions,
        });
    };

    return { inProgress, error, add, refresh, value: transactions };
};

const TRANSACTION_URL = '/api/transaction';

const sendNewTransaction = async (amount, category, urlPrefix = '') => {
    const body = JSON.stringify({
        amount,
        category,
        date: new Date(),
    });

    const res = await fetch(`${urlPrefix}${TRANSACTION_URL}`, {
        method: 'POST',
        body,
    });

    return await res.json();
};

export const getAllTransactions = async (userId, urlPrefix = '') => {
    const res = await fetch(`${urlPrefix}${TRANSACTION_URL}?userId=${userId}`, {
        method: 'GET',
    });

    return await res.json();
};

const transactionsReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload];
        case 'remove':
            return state.filter((transaction) => transaction._id != payload);
        case 'edit':
            return state.map((transaction) =>
                transaction._id === payload._id ? payload : transaction
            );
        case 'refresh':
            return action.payload;
        default:
            return state;
    }
};
