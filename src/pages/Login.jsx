import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/authService";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        return newErrors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            const response = await loginUser({
                email: email.trim(),
                password
            });

            localStorage.setItem("token", response.data.token);

            if (rememberMe) {
                localStorage.setItem("rememberEmail", email);
            } else {
                localStorage.removeItem("rememberEmail");
            }

            toast.success("Welcome Back ");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1200);

        } catch (error) {
            const status = error?.response?.status;
            if (status === 401 || status === 403) {
                toast.error("Invalid Email or Password.");
            } else if (status === 404) {
                toast.error("Account not found. Please register.");
            } else {
                toast.error("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            <div className="auth-card">

                <div className="text-center mb-4">
                    <h1>Expense Tracker</h1>
                    <p className="app-subtitle">Smart Expense Management</p>
                    <hr />
                    <h3>Welcome Back</h3>
                    <p className="text-muted">Please login to continue</p>
                </div>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        className="form-control mb-1"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                    />
                    {errors.email && (
                        <small className="error-msg mb-2">{errors.email}</small>
                    )}

                    <div className="input-group mb-1 mt-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors((prev) => ({ ...prev, password: "" }));
                            }}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
                        </button>
                    </div>
                    {errors.password && (
                        <small className="error-msg mb-2">{errors.password}</small>
                    )}

                    <div className="form-check mb-3 mt-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                        </label>
                    </div>

                    <button className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Signing In..." : "Login"}
                    </button>

                </form>

                <p className="mt-4 text-center">
                    Don't have an account?<br />
                    <Link to="/register">Create Account</Link>
                </p>

            </div>

            <div className="auth-footer">
                <small>Developed by <strong>Gokul Krishna</strong></small>
                <br />
                <small>© {new Date().getFullYear()} All Rights Reserved</small>
            </div>

        </div>
    );
}

export default Login;
