import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";
import "../styles/Login.css";


function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [rememberMe, setRememberMe] =
        useState(false);

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    useEffect(() => {

        const savedEmail =
            localStorage.getItem(
                "rememberEmail"
            );

        if (savedEmail) {

            setEmail(savedEmail);

            setRememberMe(true);
        }

    }, []);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {

            toast.error(
                "Please fill all fields."
            );

            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailRegex.test(email)
        ) {

            toast.error(
                "Please enter a valid email."
            );

            return;
        }

        try {

            setLoading(true);

            const response =
                await loginUser({

                    email:
                        email.trim(),

                    password

                });

            localStorage.setItem(
                "token",
                response.data.token
            );

            if (rememberMe) {

                localStorage.setItem(
                    "rememberEmail",
                    email
                );

            } else {

                localStorage.removeItem(
                    "rememberEmail"
                );
            }

            toast.success(
                "Welcome Back "
            );

            setTimeout(() => {

                navigate("/dashboard");

            }, 1200);

        } catch (error) {

            toast.error(
                "Invalid Email or Password."
            );

        } finally {

            setLoading(false);
        }
    };
        return (

        <div className="login-container">

            <div className="auth-card">

                <div className="text-center mb-4">

                <h1 className="fw-bold">

                Expense Tracker

                </h1>

               <p className="text-muted">

               Smart Expense Management

               </p>

               <hr />

               <h3>

               Welcome Back 

              </h3>

              <p className="text-muted">

              Please login to continue

             </p>

            </div>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <div className="input-group mb-3">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >

                            <i
                                className={
                                    showPassword
                                        ? "bi bi-eye-slash-fill"
                                        : "bi bi-eye-fill"
                                }
                            ></i>

                        </button>

                    </div>

                    <div className="form-check mb-3">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) =>
                                setRememberMe(
                                    e.target.checked
                                )
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                        >
                            Remember me
                        </label>

                    </div>

                    <button
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Signing In..."
                                : "Login"
                        }

                    </button>
                    <div className="text-center mt-5">

    <hr />



</div>

                </form>
                    

                <p className="mt-4 text-center">

    Don't have an account?

    <br />

    <Link to="/register">

        Create Account

    </Link>

</p>

            </div>
            <div className="auth-footer">
    <small>
        Developed by
        <strong> Gokul Krishna</strong>
    </small>
    <br />
    <small>
        © {new Date().getFullYear()} All Rights Reserved
    </small>
</div>

        </div>

    );
}

export default Login;