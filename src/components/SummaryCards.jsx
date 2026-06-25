function SummaryCards({ expenses }) {

    const totalAmount = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount), 0
    );

    const totalRecords = expenses.length;

    const totalCategories = new Set(
        expenses.map(expense => expense.category)
    ).size;

    return (
        <div className="summary-grid">

            <div className="summary-card">
                <div className="s-label">Total Expenses</div>
                <div className="s-value blue">₹ {totalAmount.toLocaleString()}</div>
            </div>

            <div className="summary-card">
                <div className="s-label">Total Records</div>
                <div className="s-value green">{totalRecords}</div>
            </div>

            <div className="summary-card">
                <div className="s-label">Categories</div>
                <div className="s-value yellow">{totalCategories}</div>
            </div>

        </div>
    );
}

export default SummaryCards;
