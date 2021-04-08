import AddIcon from './AddIcon';
import GraphIcon from './GraphIcon';
import HistoryIcon from './HistoryIcon';
import styles from './NavBar.module.css';

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <a href="#">
                <GraphIcon />
            </a>
            <a href="#">
                <AddIcon />
            </a>
            <a href="#">
                <HistoryIcon />
            </a>
        </nav>
    );
}
