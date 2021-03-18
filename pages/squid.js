import { React, useState } from 'react';

export default function () {
    const [display, setDisplay] = useState([]);

    const handleClick = (button) => {
        let newDisplay = display.push(button);
        setDisplay(newDisplay);
        console.log(display);
        return display;
    };

    return (
        <div>
            <h1>Squid time</h1>
        </div>
    );
}
