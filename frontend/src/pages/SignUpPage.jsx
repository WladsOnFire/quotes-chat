import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import PageLoader from "../components/PageLoader";
import { Link } from "react-router";
import styles from "./SignUpPage.module.css"

function SignUpPage() {
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const { signUp, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(formData);
    };

    return (
        <>
        {isSigningUp? <PageLoader/> : <></>}
        <div className={styles.signUpcontainer}>
            <h2 className={styles.title}>Create Account</h2>
            <p className={styles.titleDesc}>Sign up for a new account</p>
            <form onSubmit={handleSubmit}>
                {/* FULL NAME */}
                <div className={styles.nameInputBlock}>
                    <label className={styles.nameLabel}>Full name:</label>
                    <input
                        className={styles.nameInput}
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Name Surname"
                    />
                </div>

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
                <button type="submit" disabled={isSigningUp} className={styles.submit}>
                    {isSigningUp ? (
                        "Creating ..."
                    ) : (
                        "Sign up"
                    )}
                </button>
            </form>
            <Link to="/login" className={styles.loginLink}>
                Already have an account? Login
            </Link>
        </div>
        </>
    );
}
export default SignUpPage;