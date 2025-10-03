import styles from "./Toast.module.css";
import { useToastStore } from "../../store/useToastStore";

export default function Toast({ id, message, type }) {
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span>{message}</span>
      <button className={styles.closeBtn} onClick={() => removeToast(id)}>
        x
      </button>
    </div>
  );
}