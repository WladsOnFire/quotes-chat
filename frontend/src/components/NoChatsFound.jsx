import { useChatStore } from "../store/useChatStore";
import styles from "./NoChatsFound.module.css";


function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className={styles.container}>
      <p className={styles.title}>No conversations yet</p>
      <p className={styles.desc}>
        Start a new chat by selecting a contact from the contacts tab
      </p>
      <button
        className={styles.btn}
        onClick={() => setActiveTab("contacts")}
      >
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;