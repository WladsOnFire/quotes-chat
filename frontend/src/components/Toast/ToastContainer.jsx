import { useToastStore } from "../../store/useToastStore";
import Toast from "./Toast";
import styles from "./Toast.module.css";

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className={styles.container}>
      {toasts.map((t, index) => (
        <Toast key={index} {...t} />
      ))}
    </div>
  );
}