import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import "../styles/Register.css";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await registerUser(formData);

            toast.success("Registration Successful");

            navigate("/");

        } catch (error) {

            toast.error("Registration Failed");

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
                        className="form-control mb-3"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control mb-3"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <div className="input-group mb-2">

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

                    {strength && (
                        <small className="d-block mb-3">
                            Password Strength : {strength}
                        </small>
                    )}

                    <button
                        className="btn btn-primary w-100"
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