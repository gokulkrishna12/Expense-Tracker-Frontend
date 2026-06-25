function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer className="dash-footer">

            <hr />

            <h5>Expense Tracker</h5>

            <p>Secure Full Stack Expense Management System</p>

            <p>
                Built with
                <strong> React.js </strong>•
                <strong> Spring Boot </strong>•
                <strong> JWT </strong>•
                <strong> MySQL</strong>
            </p>

            <p>
                Developed by <strong>Gokul Krishna</strong>
            </p>

            <small>© {year} All Rights Reserved</small>

        </footer>
    );
}

export default Footer;
