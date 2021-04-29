export default function Creators({ names }) {
    const nameList = names.map((name, index) => (
        <li key={index}>{name}</li>
    ));

    return (
        <div>
            <h2>Creators</h2>
            <ul>{nameList}</ul>
        </div>
    );
}
