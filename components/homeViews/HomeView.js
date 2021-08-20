import { useState } from 'react';
import Numpad from 'components/numpad/Numpad';

const CATEGORIES = [
    'Alcohol',
    'Drink',
    'Food',
    'Gas',
    'Nicotine',
    'Other',
    'Special',
];

export default function HomeView() {
    const [amount, setAmount] = useState();
    const [category, setCategory] = useState('Food');
    const [isSuccessful, setIsSuccessful] = useState(true);

    const submitHandler = async () => {
        const res = await fetch(`/api/transaction`, {
            method: 'POST',
            body: JSON.stringify({ amount, category }), // body data type must match "Content-Type" header
        });

        setIsSuccessful(res.ok);

        const result = await res.json();

        if (!res.ok) {
            if (process.env.NODE_ENV === 'development') {
                console.log('status', res.status);
                console.log('error', result.error);
            }
            return;
        }

        console.log('result', result);
    };

    return (
        <div className="flex-grow flex flex-col items-stretch">
            <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="categories"
                    >
                        Category
                    </label>
                    <select
                        name="categories"
                        id="categories"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
            <div className="max-w-xs mx-auto w-full flex-grow pb-2 flex flex-col justify-around items-end ">
                <span className="mr-9">{amount}</span>
            </div>
            <Numpad setValue={setAmount} />
            <div className="flex justify-center py-2">
                <button
                    className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    onClick={submitHandler}
                    disabled={amount <= 0 || !category}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
