import { useState } from 'react';
import Numpad from 'components/numpad/Numpad';

export default function HomeView() {
    const [amount, setAmount] = useState();
    return (
        <div className="flex-grow flex flex-col items-stretch">
            <div className="max-w-xs mx-auto w-full flex-grow pb-2 flex flex-col justify-around items-end ">
                <span className="mr-9">{amount}</span>
            </div>
            <Numpad setValue={setAmount} />
            <div className="flex justify-center py-2">
                <button>Submit</button>
            </div>
        </div>
    );
}
