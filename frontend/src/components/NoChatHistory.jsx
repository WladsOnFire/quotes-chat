import styles from "./NoConversation.module.css"


const NoChatHistory = ({ name }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Start your conversation with {name}</p>
      <p className={styles.description}>
        This is the beginning of your conversation. Send a message to start chatting!
      </p>
    </div>
  );
};

export default NoChatHistory;