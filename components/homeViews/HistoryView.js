const displayDate = (date) => new Date(date).toLocaleDateString();

const displayAmount = (amount) => '$' + (amount / 100).toFixed(2);

export default function HistoryView({ transactions }) {
    return (
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.value.map((tran) => (
                        <tr key={tran._id}>
                            <td className="px-4">{tran.category}</td>
                            <td className="px-4 text-right">
                                {displayAmount(tran.amount)}
                            </td>
                            <td className="px-4">{displayDate(tran.date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
