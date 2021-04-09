import { useState } from 'react';
import Numpad from 'components/numpad/Numpad';

export default function HomeView() {
    const [amount, setAmount] = useState();
    return (
        <div>
            <div className="w-8 text-right">{amount}</div>
            <Numpad setValue={setAmount} />
        </div>
    );
}
