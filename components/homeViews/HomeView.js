import { useState } from 'react';
import useNumpad from 'components/numpad/Numpad';

const CATEGORIES = [
    'Alcohol',
    'Drink',
    'Food',
    'Gas',
    'Nicotine',
    'Other',
    'Special',
];

export default function HomeView({ setCurrentTransactions }) {
    const [category, setCategory] = useState('Food');
    const [isSuccessful, setIsSuccessful] = useState(true);

    const Numpad = useNumpad();

    const submitHandler = async () => {
        const body = JSON.stringify({
            amount: Numpad.amount,
            category,
            date: new Date(),
        });
        Numpad.reset();

        const res = await fetch(`/api/transaction`, {
            method: 'POST',
            body,
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

        setCurrentTransactions((old) => [...old, result.result]);
    };

    const disabled = Numpad.amount === '0.00' || !category;

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
                <span className="mr-9">{Numpad.amount}</span>
            </div>
            {Numpad.element}
            <div className="flex justify-center py-2">
                <button
                    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                        disabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-700'
                    }`}
                    onClick={submitHandler}
                    disabled={disabled}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
