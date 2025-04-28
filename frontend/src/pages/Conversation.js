import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversation, sendMessage } from "../redux/actions/messageActions";
import { useParams } from "react-router-dom";
import "./Conversation.css";

const Conversation = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { conversation } = useSelector((state) => state.message);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(fetchConversation(userId, userInfo.token));
    }
  }, [dispatch, userId, userInfo]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const handleSend = () => {
    if (newMessage.trim()) {
      dispatch(sendMessage(userId, newMessage, userInfo.token));
      setNewMessage("");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="conversation-container">
      <h2 className="conversation-title">Conversation</h2>

      <div className="messages-box">
        {conversation.map((msg) => {
          const isYou = msg.senderId === userInfo.user.id;
          return (
            <div
              key={msg.id}
              className={`message-wrapper ${isYou ? "right" : ""}`}
            >
              <div className={`message-bubble ${isYou ? "you" : ""}`}>
                <p className="message-author">
                  {isYou ? "You" : msg.sender?.name || "Unknown"}
                </p>
                <p className="message-content">{msg.content}</p>
                <small className="message-time">{formatTimestamp(msg.createdAt)}</small>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend} className="message-send-button">Send</button>
      </div>
    </div>
  );
};

export default Conversation;
