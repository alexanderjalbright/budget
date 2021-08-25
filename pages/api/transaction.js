import Transaction from 'models/Transaction';
import { getSession } from 'next-auth/client';
import dbConnect from 'utils/dbConnect';

dbConnect();

export default async (req, res) => {
    switch (req.method.toUpperCase()) {
        case 'POST':
            try {
                const { id } = await getSession({ req });
                const { amount, category, date } = JSON.parse(req.body);

                Transaction.create(
                    {
                        userId: id,
                        amount,
                        category,
                        date,
                    },
                    (err, value) => {
                        if (err) throw err;
                        else
                            res.status(200).send({
                                isSuccess: true,
                                result: value,
                            });
                    }
                );
            } catch (error) {
                console.log('transactions_POST_error', error);
                res.status(500).send({
                    isSuccess: false,
                    error: 'Error saving transaction',
                });
            }
            return;
        case 'GET':
            try {
                const { userId } = req.query;

                const transactions = await Transaction.find({
                    userId,
                });
                return res
                    .status(200)
                    .send({ transactions: transactions || [] });
            } catch (error) {
                console.log('transactions_GET_error', error);
                res.status(500).send({
                    isSuccess: false,
                    error: 'Error retrieving transactions',
                });
            }
            return;
        default:
            res.status(400).send({ isSuccess: false, error: 'Missing method' });
            return;
    }
};
