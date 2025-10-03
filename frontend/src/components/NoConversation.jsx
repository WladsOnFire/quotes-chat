import styles from "./NoConversation.module.css";

const NoConversation = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Select the conversation</p>
      <p className={styles.description}>
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );
};

export default NoConversation;