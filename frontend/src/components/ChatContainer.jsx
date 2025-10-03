import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import NoChatHistory from "./NoChatHistory";
import styles from "./ChatContainer.module.css";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div>
        {messages.length > 0 && !isMessagesLoading ? (
          <div className={styles.container}>
            {messages.map((msg) => (

              <div
                key={msg._id}
                className={msg.senderId === authUser._id ? styles.out : styles.in}
              >
                <div className={styles.msgAndDate}>
                  <div className={styles.messageCloud}>
                    {msg.image && (
                      <img src={msg.image} alt="Shared" className={styles.imageMsg} />
                    )}
                    {msg.text && <div className={styles.text}>{msg.text}</div >}
                  </div>
                  <p className={styles.date}>
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>


            ))}

            {/* scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistory name={selectedUser.fullName} />
        )}
      </div>
    </>
  );
}

export default ChatContainer;