import AddIcon from './AddIcon';
import GraphIcon from './GraphIcon';
import HistoryIcon from './HistoryIcon';
import styles from './NavBar.module.css';

export default function NavBar({ setView }) {
    return (
        <nav className={styles.navbar}>
            <button onClick={() => setView('graph')}>
                <GraphIcon />
            </button>
            <button onClick={() => setView('home')}>
                <AddIcon />
            </button>
            <button onClick={() => setView('history')}>
                <HistoryIcon />
            </button>
        </nav>
    );
}
