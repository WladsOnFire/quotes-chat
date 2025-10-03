import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import PageLoader from "./PageLoader";

import styles from "./ChatsList.module.css"

function ChatsList() {

  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);


  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {isUsersLoading ? <PageLoader /> : <></>}
      <div className={styles.chatsListContainer}>
        {chats.map((contact) => (
          <div
            key={contact._id}
            className={styles.contactListItem}
            onClick={() => setSelectedUser(contact)}
          >
            <div className={styles.profileSide}>
              <div className={styles.pfpAndStatus}>
                <img
                  className={styles.pfp}
                  src={contact.profilePic || "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"}
                />
                <p className={styles.status}>{onlineUsers.includes(contact._id) ? "Online" : "Offline"}</p>
              </div>

              <div className={styles.nameAndMessage}>
                <p className={styles.fullName}>{contact.fullName}</p>
                <p className={styles.lastMsg}>last message ...</p>
              </div>
            </div>
            <p className={styles.date}>Aug 17, 2022</p>
          </div>
        ))}
      </div>

    </>
  );
}
export default ChatsList;