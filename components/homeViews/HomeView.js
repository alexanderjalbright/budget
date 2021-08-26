import { useState } from 'react';
import useNumpad from 'hooks/useNumpad';

const CATEGORIES = [
    'Alcohol',
    'Drink',
    'Food',
    'Gas',
    'Nicotine',
    'Other',
    'Special',
];

export default function HomeView({ transactions }) {
    const [category, setCategory] = useState('Food');

    const numpad = useNumpad();

    const submitHandler = async () => {
        const amount = numpad.amount;
        numpad.reset();
        transactions.add({ amount, category });
    };

    const disabled =
        transactions.inProgress || numpad.amount === '0.00' || !category;

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
                <span className="mr-9">{numpad.amount}</span>
            </div>
            {numpad.element}
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
