import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

sendMessage: async (messageData) => {
  const { selectedUser, messages } = get();

  if (!selectedUser?._id) {
    toast.error("No user selected to send the message.");
    console.warn("sendMessage aborted: selectedUser is missing.");
    return;
  }

  try {
    const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);

    // Optional: Log to console for debug
    console.log("Message sent:", res.data);

    // Update state with new message
    set({ messages: [...messages, res.data] });

  } catch (error) {
    console.error("Error sending message:", error);
    toast.error(error?.response?.data?.message || "Failed to send message");
  }
},


    subscribeToMessages: () => {
      const{selectedUser} = get();
      if(!selectedUser) return;
       
     const socket = useAuthStore.getState().socket;

      // todo: optimize this one later

      socket.on("newMessage", (newMessage) => {
        // const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
        // if(isMessageSentFromSelectedUser) return;
        set({
          messages: [...get().messages, newMessage],})
      })
    },


    unsubscribeFromMessages: () => {
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage");
    },
//   todo: optimize this one later
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
