import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =  import.meta.env.MODE === "development" ? "http://localhost:5001": "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  socket: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
logout: async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    console.log("Logout response:", response.data);

    const socketDisconnector = get().disconnectSocket;
    if (typeof socketDisconnector === "function") {
      socketDisconnector();
    } else {
      console.warn("disconnectSocket is not a function");
    }

    set({ authUser: null });
    toast.success("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error(error.response?.data?.message || "Logout failed");
  }
},

  // logout: async () => {
  //   try {
  //     await axiosInstance.post("/auth/logout");
  //     get().disconnectSocket();
  //     set({ authUser: null });
  //     toast.success("Logged out successfully");
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Logout failed");
  //   }
  // },
   

  
updateProfile: async (formData) => {
  set({ isUpdatingProfile: true });
  try {
    const res = await axiosInstance.put("/auth/update-profile", formData);

    set({ authUser: res.data });
    console.log("Update successful");
    toast.success("Profile updated Successfully");
  } catch (error) {
    console.log("error in update profile", error);
    toast.error(error.response?.data?.message || "Update failed");
  } finally {
    set({ isUpdatingProfile: false });
  }
},

connectSocket: () => {
  const { authUser, socket } = get();
  console.log("connectSocket called", authUser);

  if (!authUser || socket?.connected) return;

  const newSocket = io(BASE_URL, {
    withCredentials: true,
    query: {
      userId: authUser._id, // this is the fix
    },
  });

  newSocket.on("connect", () => {
    console.log(" Socket connected:", newSocket.id);
  });

  newSocket.on("disconnect", () => {
    console.log(" Socket disconnected");
  });

  newSocket.on("onlineUsers", (users) => {
    console.log("Received online users:", users);
    set({ onlineUsers: users });
  });

  set({ socket: newSocket });
},
}));