import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { useToastStore } from "./useToastStore.js";
import { io } from "socket.io-client";

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
const addToast = useToastStore.getState().addToast;
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuthentification");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error occured while authentification check:", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });

            addToast("Account created successfully!", "info");
            get().connectSocket();
        } catch (error) {
            addToast(error.response?.data?.message, "error"); // response || data can be undefined
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);

            set({ authUser: res.data });

            addToast("Logged in successfully", "info");
            get().connectSocket();
            // console.log("connected x2");
        } catch (error) {
            addToast(error.response?.data?.message, "error");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            addToast("Logged out successfully", "info");
            get().disconnectSocket();
        } catch (error) {
            addToast("Error logging out", "error");
            console.log("Logout error:", error);
        }
    },


    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            withCredentials: true, // this ensures cookies are sent with the connection
        });

        socket.connect();

        set({ socket });

        // listen for online users event
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });

        // console.log("connected x1");
    }, 

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            addToast("Profile updated successfully", "info");
        } catch (error) {
            console.log("Error in update profile:", error);
            addToast(error.response?.data?.message, "error");
        }
    },

}));