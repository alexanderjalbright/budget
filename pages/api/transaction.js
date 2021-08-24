import Transaction from 'models/Transaction';
import { useSession, getSession } from 'next-auth/client';
import dbConnect from 'utils/dbConnect';

dbConnect();

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { id } = await getSession({ req });
            const { amount, category } = JSON.parse(req.body);
            addSpending(id, amount, category);
        }

        res.statusCode = 200;
        res.json({ isSuccess: true });
        res.end();
    } catch (error) {
        res.statusCode = 500;
        console.log('error', error);
        res.json({ isSuccess: false, error: error });
    }
};

const addSpending = (id, amount, category) => {
    //TODO: Database stuff!
    console.log('id', id);
    console.log('amount', amount);
    console.log('category', category);
    Transaction.create({
        userId: id,
        amount: Math.floor(amount * 100),
        category,
    });
};
