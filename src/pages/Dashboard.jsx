import { useEffect, useState } from "react";
import {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense
} from "../services/expenseService";

import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import Footer from "../components/Footer";
import { saveAs } from "file-saver";
import "../styles/Dashboard.css";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [darkMode, setDarkMode] = useState(true);

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        description: "",
        date: ""
    });

    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = async () => {
        try {
            const response = await getExpenses();
            setExpenses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateExpense(editingId, formData);
            } else {
                await addExpense(formData);
            }
            setFormData({ title: "", amount: "", category: "", description: "", date: "" });
            setEditingId(null);
            loadExpenses();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (expense) => {
        setEditingId(expense.id);
        setFormData({
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            description: expense.description,
            date: expense.date
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            loadExpenses();
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const toggleTheme = () => setDarkMode(!darkMode);

    const exportCSV = () => {
        const headers = ["Title", "Amount", "Category", "Description", "Date"];
        const rows = expenses.map((e) => [e.title, e.amount, e.category, e.description, e.date]);
        const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "expenses.csv");
    };

    /* unique categories from actual data for filter dropdown */
    const uniqueCategories = [...new Set(expenses.map(e => e.category))];

    const filteredExpenses = expenses.filter((expense) => {
        const matchesSearch = expense.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "" || expense.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={darkMode ? "dark-theme" : "light-theme"}>

            <Navbar logout={logout} toggleTheme={toggleTheme} darkMode={darkMode} />

            <div className="dash-container">

                <SummaryCards expenses={expenses} />

                <ExpenseChart expenses={expenses} />

                <div className="dash-actions-row">
                    <button className="btn btn-success mb-3" onClick={exportCSV}>
                        ⬇ Export CSV
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search by title..."
                    className="form-control mb-3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="form-select mb-3"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {uniqueCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <ExpenseForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    editingId={editingId}
                />

                <ExpenseList
                    expenses={filteredExpenses}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />

            </div>

            <Footer />

        </div>
    );
}

export default Dashboard;
