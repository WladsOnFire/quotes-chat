import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import styles from "./ChatHeader.module.css"

function ChatHeader() {
    const { selectedUser, setSelectedUser, deleteChatWithUser, setAliasForUser} = useChatStore();
    const { onlineUsers, authUser} = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id);

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape") setSelectedUser(null);
        };

        window.addEventListener("keydown", handleEscKey);

        // cleanup function
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [setSelectedUser]);

    const deleteChat = () => {
        if (!selectedUser) return;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete the chat with ${selectedUser.fullName}?`
        );
        if (confirmDelete) {
            deleteChatWithUser(selectedUser._id);
        }
    };

    const setAlias = () => {
        const alias = window.prompt(`new nickname for ${selectedUser.fullName}:`);
        if(alias) setAliasForUser(selectedUser._id, alias)
    }

    //deleteChatWithUser(selectedUser._id);

    return (
        <div className={styles.container}>
            <div className={styles.pfpAndStatus}>
                <img
                    alt=""
                    className={styles.pfp}
                    src={selectedUser.profilePic || "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"}
                />
                <p className={isOnline ? styles.online : styles.offline}>{isOnline ? "Online" : "Offline"}</p>

            </div>
            <p className={styles.fullName} onClick={setAlias}>{selectedUser.alias || selectedUser.fullName} (click to add nickname)</p>
            <button
                className={styles.delete}
                onClick={deleteChat}
            >
                delete chat
            </button>
        </div >
    );
}
export default ChatHeader;