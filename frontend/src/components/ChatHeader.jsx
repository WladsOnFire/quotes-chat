import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import styles from "./ChatHeader.module.css"

function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id);

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape") setSelectedUser(null);
        };

        window.addEventListener("keydown", handleEscKey);

        // cleanup function
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [setSelectedUser]);

    return (
        <div className={styles.container}>
            <div className={styles.pfpAndStatus}>
                <img
                    className={styles.pfp}
                    src={selectedUser.profilePic || "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"}
                />
                <p className={styles.status}>{isOnline ? "Online" : "Offline"}</p>
            </div>
            <p className={styles.fullName}>{selectedUser.fullName}</p>
        </div >
    );
}
export default ChatHeader;