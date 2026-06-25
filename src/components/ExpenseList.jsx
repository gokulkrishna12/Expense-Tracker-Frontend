function ExpenseList({ expenses, handleEdit, handleDelete }) {

    return (
        <div className="dash-card">

            <h4>Expense List</h4>

            <div style={{ overflowX: "auto" }}>
                <table className="dash-table">

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center" style={{ padding: "2rem", opacity: 0.6 }}>
                                    No Expenses Found
                                </td>
                            </tr>
                        ) : (
                            expenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td>{expense.title}</td>
                                    <td>₹ {Number(expense.amount).toLocaleString()}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.date}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            style={{ marginRight: "0.4rem" }}
                                            onClick={() => handleEdit(expense)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(expense.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default ExpenseList;
