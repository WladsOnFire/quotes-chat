import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { useToastStore } from "./useToastStore.js";

const addToast = useToastStore.getState().addToast;
export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    lastMessages: {}, // { [userId]: { text, createdAt, senderName, unreadCount } }


    setActiveTab: (tab) => set({ activeTab: tab }),

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        const addToast = useToastStore.getState().addToast;
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (error) {
            addToast(error.response?.data?.message || "Something went wrong", "error");
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMyChatPartners: async () => {
        const addToast = useToastStore.getState().addToast;
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            addToast(error.response?.data?.message || "Something went wrong", "error");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessagesByUserId: async (userId) => {
        const addToast = useToastStore.getState().addToast;
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            addToast(error.response?.data?.message || "Something went wrong", "error");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true, // flag to identify optimistic messages (optional)
        };
        // immidetaly update the ui by adding the message
        set({ messages: [...messages, optimisticMessage] });

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: messages.concat(res.data) });
        } catch (error) {
            // remove optimistic message on failure
            set({ messages: messages });
            addToast(error.response?.data?.message || "Something went wrong", "error");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        //if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {

            if (!selectedUser || newMessage.senderId !== selectedUser._id) {

                const { lastMessages } = get();
                set({
                    lastMessages: {
                        ...lastMessages,
                        [newMessage.senderId]: {
                            text: newMessage.text || "[image]",
                            senderName: newMessage.senderName || "Unknown",
                            createdAt: newMessage.createdAt,
                            unreadCount: (lastMessages[newMessage.senderId]?.unreadCount || 0) + 1,
                        },
                    },
                });

                addToast(`New message from ${newMessage.senderName}`, "msg", 9000);
                //const createdAt = newMessage.createdAt;

            } else {
                set((state) => ({
                    messages: [...state.messages, newMessage],
                }));
            }






            const notificationSound = new Audio("/sounds/notification.mp3");

            notificationSound.currentTime = 0; // reset to start
            notificationSound.play().catch((e) => console.log("Audio play failed:", e));

        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
}));