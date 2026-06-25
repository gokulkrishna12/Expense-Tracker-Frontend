function ExpenseForm({ formData, handleChange, handleSubmit, editingId }) {

    return (
        <div className="dash-card">

            <h4>{editingId ? "Update Expense" : "Add Expense"}</h4>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="form-control mb-3"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    className="form-control mb-3"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="form-control mb-3"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="form-control mb-3"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="date"
                    className="form-control mb-3"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-success w-100">
                    {editingId ? "Update Expense" : "Add Expense"}
                </button>

            </form>

        </div>
    );
}

export default ExpenseForm;
