import React from 'react'
import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { useRef } from 'react';
const ChatContainer = () => {

  const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages} =useChatStore();

  const {authUser} = useAuthStore();
  const messageEndRef = useRef(null);

useEffect(() => {
  if (selectedUser?._id) {
    getMessages(selectedUser._id);
  }

  subscribeToMessages();

  return () => unsubscribeFromMessages();
}, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);


useEffect(() => {
  if (messageEndRef.current && messages){
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });

  }
}, [messages]);

  if(isMessagesLoading){
     return(
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <MessageSkeleton />
      <MessageInput/>
    </div>
  )
}
  return(
   <div className=" flex-1 flex flex-col overflow-auto">
    <ChatHeader/>
<div className="space-y-4">
  {messages.map((message) => {
    const isSender = message.senderId === authUser._id;

    return (
      <div
        key={message._id}
        className={`chat ${isSender ? "chat-end" : "chat-start"}`}
        ref={messageEndRef}
      >
        {/* Container that aligns avatar and message bubble side by side */}
        <div className={`flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
          
          {/* Avatar */}
          <div className="chat-image avatar">
            <div className="w-10 rounded-full overflow-hidden">
              {/* <img
                src={
                  isSender
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="User avatar"
              /> */}
              <img
  src={
    message.senderId === authUser._id
      ? authUser.profilePic || "/avatar.png"
       : message.senderId.profilePic || "/avatar.png"
  }
    alt="User avatar"
/>

            </div>
          </div>

          {/* Message content */}
          <div>
            {/* Header: username + date & time */}
            <div className="chat-header flex items-center gap-2 text-xs opacity-70 justify-between">
              <span className="font-medium">{isSender ? "You" : selectedUser.username}</span>
              <span>
                {new Date(message.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Message bubble */}
            <div
              className={`chat-bubble max-w-xs sm:max-w-sm p-2 ${
                isSender
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
              }`}
            >
              {message.image && (
                <img
                src={message.image}
                alt="Attachment"
               className="rounded-md object-cover max-w-[200px] max-h-[200px]"
               />
               )}

              
              {message.text && <p className="break-words">{message.text}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>


    <MessageInput/>
   </div>
  )
};

export default ChatContainer;