export default function Creators({ names }) {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const nameList = shuffleArray(names)?.map((name, index) => (
        <li key={index}>{name}</li>
    ));

    return (
        <div>
            <h2>Creators</h2>
            <ul>{nameList}</ul>
        </div>
    );
}
