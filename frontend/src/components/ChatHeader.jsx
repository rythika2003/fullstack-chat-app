// import React from 'react'
// import {X} from "lucide-react";
// import { useChatStore } from '../store/useChatStore';
// import { useAuthStore } from '../store/useAuthStore';
// const ChatHeader = () => {
//     const {selectedUser, setSelectedUser}= useChatStore();
//     const {onlineUsers } = useAuthStore();

//   return (
//    <div className="p-2.5 border-b border-base-300">
//     <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">

//             {/* Avatar */}
//             <div className="avatar">
//                 <div className="size-10 rounded-full relative">
//                     <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
//                 </div>
//             </div>



// {/* User Info*/}
//          <div>
//             <h3 className="font-medium">{selectedUser.fullName}</h3>
//             <p className="text-sm text-base-content/70">
//             {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
//             </p>
// </div>
// </div>

//     {/*Close button */}
//     <button onClick={() => setSelectedUser(null)}>
//        <X />

//     </button>
//     </div>
//     </div>
//   );
// };

// export default ChatHeader;


import React from 'react';
import { X, User } from "lucide-react";
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
 const { onlineUsers = [] } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser._id);
  const hasProfilePic = !!selectedUser.profilePic;

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full bg-base-200 flex items-center justify-center overflow-hidden">
              {hasProfilePic ? (
                <img
                  src={selectedUser.profilePic}
                  alt={selectedUser.fullName || "User"}
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-6 h-6 text-base-content/60" />
              )}
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
