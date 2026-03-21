import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat";
import "../styles/dashboard.scss";

const Dashboard = () => {
  const { initializeSocketConnection,handleSendMessage } = useChat();

  const chats = useSelector(state=>state.chat.chats)
  const currentChatId = useSelector(state=>state.chat.currentChatId)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);



  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");

  handleSendMessage({message:input.trim(),chatId:currentChatId})
  setInput("")
   
  };

  useEffect(() => {
    initializeSocketConnection();
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
        <div className="sidebar-top">
          <span>Perplexity</span>

          {/* Collapse Icon */}
          <span
            className="collapse-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </span>
        </div>

        <div className="sidebar-middle">
          {/* New Chat */}
          <div className="new-chat">
            <span className="icon">+</span>
            <span>New Chat</span>
          </div>

          {/* Chat History */}
          <div className="chat-history">
            <p className="heading">Chats</p>

            <div className="chat-list">
              {chats?.map((chat, i) => (
                <div key={i} className="chat-item">
                  {chats?.title || 'Untitled Chat'}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="avatar">A</div>
          <span className="username">Arpana</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {/* Messages */}
        <div className="messages">
          {!chats?.[currentChatId] || chats[currentChatId].length === 0 ? (
            <div className="empty-state">
              <h2>What's on the agenda today?</h2>
              <p>Start a conversation and explore ideas 🚀</p>
            </div>
          ) : (
            chats[currentChatId].map((msg, i) => (
              <div
                key={i}
                className={msg.role === "user" ? "message user" : "message ai"}
              >
                {msg.content}
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="chat-input">
          <label className="image-upload">
            📎
            <input type="file" hidden />
          </label>

          <input
            type="text"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          {/* Send Icon */}
          <button onClick={handleSend}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
