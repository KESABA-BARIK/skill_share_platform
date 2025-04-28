import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversation, sendMessage } from "../redux/actions/messageActions";

const ChatPage = ({ selectedUserId, selectedUserName }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { messages, loading } = useSelector((state) => state.message);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedUserId && userInfo?.token) {
      dispatch(fetchConversation(selectedUserId, userInfo.token));
    }
  }, [selectedUserId, dispatch, userInfo]);

  const handleSend = () => {
    if (newMessage.trim()) {
      dispatch(sendMessage(selectedUserId, newMessage, userInfo.token));
      setNewMessage("");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h3>Chat with {selectedUserName}</h3>
      {loading ? (
        <p>Loading conversation...</p>
      ) : (
        <div style={{ height: "300px", overflowY: "scroll", marginBottom: "1rem" }}>
          {messages.map((msg) => (
            <p key={msg.id} style={{ textAlign: msg.senderId === userInfo.user.id ? "right" : "left" }}>
              <strong>{msg.sender.name}: </strong>{msg.content}
            </p>
          ))}
        </div>
      )}
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "80%", padding: "0.5rem" }}
      />
      <button onClick={handleSend} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>Send</button>
    </div>
  );
};

export default ChatPage;
