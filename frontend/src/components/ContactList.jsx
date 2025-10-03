import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import PageLoader from "./PageLoader";
import styles from "./ContactList.module.css"

function ContactList() {
    const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getAllContacts();
    }, [getAllContacts]);



    return (
        <>
            {isUsersLoading ? <PageLoader /> : <></>}
            {allContacts.map((contact) => (
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
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
export default ContactList;