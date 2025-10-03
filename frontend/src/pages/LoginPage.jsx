import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import PageLoader from "../components/PageLoader";
import { Link } from "react-router";
import styles from "./LoginPage.module.css"

function SignUpPage() {
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <>
            {isLoggingIn ? <PageLoader /> : <></>}
            <div className={styles.signUpcontainer}>
                <h2 className={styles.title}>Log in to account</h2>
                <p className={styles.titleDesc}>Enter existing account</p>
                <form onSubmit={handleSubmit}>

                    {/* EMAIL INPUT */}
                    <div className={styles.emailInputBlock}>
                        <label className={styles.emailLabel}>Email:</label>
                        <input
                            className={styles.emailInput}
                            //type="email" - conflicts with toast validation message
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="example@mail.com"
                        />
                    </div>

                    {/* PASSWORD INPUT */}
                    <div className={styles.passwordInputBlock}>
                        <label className={styles.passwordLabel}>Password:</label>
                        <input
                            className={styles.passwordInput}
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button type="submit" disabled={isLoggingIn} className={styles.submit}>
                        {isLoggingIn ? (
                            "Loggin in ..."
                        ) : (
                            "Log in"
                        )}
                    </button>
                </form>
                <Link to="/signup" className={styles.signup}>
                    Do not have an account? Sign up
                </Link>
                <a className={styles.signup}
                    href="http://localhost:3000/api/auth/google"
                >via Google</a>
            </div>
        </>
    );
}
export default SignUpPage;