import styles from "./PageLoader.module.css"

function PageLoader({ message = "Loading..."}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.box}>
                <div className={styles.spinner} />
                <div className={styles.message}>{message}</div>
            </div>
        </div>
    )
}

export default PageLoader;