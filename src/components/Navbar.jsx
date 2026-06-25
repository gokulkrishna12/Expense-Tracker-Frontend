function Navbar({ logout, toggleTheme, darkMode }) {

    return (
        <nav className="dash-navbar">

            <span className="dash-navbar-brand">
                Expense Tracker
            </span>

            <div className="dash-navbar-actions">

                <button
                    className="dash-btn-theme"
                    onClick={toggleTheme}
                >
                    {darkMode ? "☀ Light" : "🌙 Dark"}
                </button>

                <button
                    className="dash-btn-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;
