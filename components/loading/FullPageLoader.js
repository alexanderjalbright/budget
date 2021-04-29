import MoneyIcon from './MoneyIcon';

const FullPageLoader = ({ message }) => (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="pb-2">{message}</div>
        <MoneyIcon className="h-1/2 w-1/2 animate-bounce" />
    </div>
);
export default FullPageLoader;
