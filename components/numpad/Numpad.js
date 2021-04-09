import { useEffect, useReducer, useRef } from 'react';
import Button from './Button';

const numpadReducer = (state, action) => {
    if (['delete', 'backspace'].includes(action.toLowerCase()))
        return (Math.floor(state * 10) / 100).toFixed(2);

    if (state > 1_000_000_000) return state;

    if (['decimal', '.'].includes(action.toLowerCase()))
        return state.toString().includes('.00')
            ? state
            : (state * 100).toFixed(2);

    if (action !== ' ' && 0 <= +action && +action <= 9)
        return (state * 10 + +action / 100).toFixed(2);

    return state;
};

const useVirtualNumpad = (setValue, defaultValue = 0) => {
    const [value, dispatch] = useReducer(
        numpadReducer,
        defaultValue.toFixed(2)
    );

    const onKeyDownRef = useRef();

    useEffect(() => (onKeyDownRef.current = window.document.onkeydown), []);

    useEffect(() => setValue(value), [value]);

    useEffect(() => {
        window.document.onkeydown = (e) => dispatch(e.key);
        return () => (window.document.onkeydown = onKeyDownRef.current);
    }, [dispatch]);

    const buttons = [...Array(10).keys(), 'delete', 'decimal'];

    const buttonProps = buttons.reduce((accum, name) => {
        accum[name] = {
            name,
            onClick: (e) => dispatch(e.target.name),
        };

        return accum;
    }, {});

    return buttonProps;
};
const Numpad = ({ setValue }) => {
    const buttonProps = useVirtualNumpad(setValue);

    return (
        <div>
            <div>
                <div>
                    <Button {...buttonProps[7]}>7</Button>
                    <Button {...buttonProps[8]}>8</Button>
                    <Button {...buttonProps[9]}>9</Button>
                </div>

                <div>
                    <Button {...buttonProps[4]}>4</Button>
                    <Button {...buttonProps[5]}>5</Button>
                    <Button {...buttonProps[6]}>6</Button>
                </div>
                <div>
                    <Button {...buttonProps[1]}>1</Button>
                    <Button {...buttonProps[2]}>2</Button>
                    <Button {...buttonProps[3]}>3</Button>
                </div>
                <div>
                    <Button {...buttonProps['decimal']}>.</Button>
                    <Button {...buttonProps[0]}>0</Button>
                    <Button {...buttonProps['delete']}>{'<'}</Button>
                </div>
            </div>
        </div>
    );
};

export default Numpad;
