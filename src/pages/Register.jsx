import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { registerUser } from "../services/authService";
import "../styles/Register.css";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState("");
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        // clear error on change
        setErrors((prev) => ({ ...prev, [name]: "" }));

        // password strength
        if (name === "password") {
            if (value.length === 0) {
                setStrength("");
            } else if (value.length < 6) {
                setStrength("Weak 🔴");
            } else if (
                value.length < 10 ||
                !/[A-Z]/.test(value) ||
                !/[0-9]/.test(value)
            ) {
                setStrength("Medium 🟡");
            } else {
                setStrength("Strong 🟢");
            }
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "Name must be at least 3 characters.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            await registerUser(formData);

            toast.success("Registration Successful");

            navigate("/");

        } catch (error) {

            const msg = error?.response?.data?.message || "Registration Failed. Try again.";
            toast.error(msg);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="register-container">

            <div className="auth-card">

                <div className="text-center mb-4">

                    <h1 className="app-title">
                        Expense Tracker
                    </h1>

                    <p className="app-subtitle">
                        Smart Expense Management
                    </p>

                    <hr />

                    <h3>Create Account</h3>

                    <p className="text-muted">
                        Register to manage your expenses
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="form-control mb-1"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <small className="error-msg mb-2">
                            {errors.name}
                        </small>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control mb-1 mt-2"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <small className="error-msg mb-2">
                            {errors.email}
                        </small>
                    )}

                    <div className="input-group mb-1 mt-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <i className={
                                showPassword
                                ? "bi bi-eye-slash-fill"
                                : "bi bi-eye-fill"
                            }></i>
                        </button>
                    </div>

                    {errors.password && (
                        <small className="error-msg mb-1">
                            {errors.password}
                        </small>
                    )}

                    {strength && (
                        <small className="d-block mb-3 mt-1">
                            Password Strength: {strength}
                        </small>
                    )}

                    <button
                        className="btn btn-primary w-100 mt-2"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <div className="text-center mt-4">

                    Already have an account?

                    <br />

                    <Link to="/">
                        Login Here
                    </Link>

                </div>

            </div>

            <div className="auth-footer">

                <small>
                    Developed by <strong>Gokul Krishna</strong>
                </small>

                <br />

                <small>
                    © {new Date().getFullYear()} All Rights Reserved
                </small>

            </div>

        </div>

    );

}

export default Register;
