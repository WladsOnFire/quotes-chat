import { useEffect } from "react";
import ChatContainer from "../components/ChatContainer";
import ChatsList from "../components/ChatsList";
import NoConversation from "../components/NoConversation";
import ProfileHeader from "../components/ProfileHeader";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import styles from "./ChatPage.module.css";
import ContactList from "../components/ContactList";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";

function ChatPage() {

    const { activeTab, selectedUser, setActiveTab } = useChatStore();

    const { checkAuth} = useAuthStore();



    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    return (
        <div className={styles.container}>
            <div className={styles.chatWindowContainer}>
                <div className={styles.chatWindowLeft}>
                    <div className={styles.leftHeader}>
                        <ProfileHeader />

                        {activeTab === "chats" ?
                            <button onClick={() => setActiveTab("contacts")} className={styles.leftHeaderToggle}>
                                Search contacts
                            </button> :
                            <button onClick={() => setActiveTab("chats")} className={styles.leftHeaderToggle}>
                                Go to your chats
                            </button>}

                    </div>
                    <div className={styles.leftChatsBlock}>
                        {/* <p>Chats:</p> */}
                        {activeTab === "chats" ? <ChatsList /> : <ContactList />}
                    </div>
                </div>
                <div className={styles.chatWindowRight}>
                    <div className={styles.rightHeader}>
                        {selectedUser ? <ChatHeader /> : <>
                            
                        </>}
                    </div>
                    <div className={styles.rightMessagesBlock}>
                        {selectedUser ? <ChatContainer /> : <NoConversation />}
                    </div>
                    <div className={styles.rightInputBlock}>
                        <MessageInput />
                    </div>
                </div>
            </div>

        </div>
    );
}
export default ChatPage;