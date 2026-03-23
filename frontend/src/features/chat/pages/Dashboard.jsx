import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat";
import "../styles/dashboard.scss";
import ReactMarkdown from 'react-markdown';
import { useAuth } from "../../auth/hook/useAuth";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
  
  const { initializeSocketConnection, handleSendMessage,handleGetChats,handleOpenChat } = useChat();

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const [aiThinking, setAiThinking] = useState(false);
  const {handleGetMe}  = useAuth()
  const [user, etUser] = useState(false);

  console.log('chat :' + chats._id);
  console.log('currentChatId : ',+currentChatId);
  
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async() => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");
  
      setMessages((prev) => [...prev, { type: "ai", text: "" }]);
   
  
    await handleSendMessage({ message: input.trim(), chatId: currentChatId });
    setInput("");
    
  };
//   console.log("chats:", chats);
// console.log("keys:", Object.keys(chats));


  useEffect(() => {
    initializeSocketConnection();
    handleGetChats()
    // console.log(handleGetChats());
    
    
  }, []);
  const handleNewChat = () => {
  
 
  handleOpenChat(null, chats); 
  
 
  setMessages([]); 
  setInput("");
};

  function openChat(chatId){
    console.log("chat"+chats)
     handleOpenChat(chatId,chats)
  }

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
          <div className="new-chat" onClick={handleNewChat}>
            <span className="icon">+</span>
            <span>New Chat</span>
          </div>

          {/* Chat History */}
          <div className="chat-history">
            <p className="heading">Chats</p>
            <div className="chat-list">
              {/* Object.values se object array ban jayega */}
              {Object.values(chats || {}).map((chat, i) => (
                <div
                  key={chat.id || i}
                  className={`chat-item ${currentChatId === chat.id ? "active" : ""}`}
                  onClick={()=>{openChat(chat._id)
                    console.log(chat._id);
                    
                  }} // ID set karna zaroori hai
                >
                  {chat.title || "Untitled Chat"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="avatar"><CgProfile /></div>
          <span className="username">User</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {/* Messages */}
        <div className="messages">
          {/* Safety check: Kya current chat exist karti hai aur usme messages hain? */}
          {!chats?.[currentChatId] ||
          chats[currentChatId].message.length === 0 ? (
            <div className="empty-state">
              <h2>What's on the agenda today?</h2>
              <p>Start a conversation 🚀</p>
            </div>
          ) : (
            chats[currentChatId].message.map((msg, i) => (
              <div
                key={i}
                className={msg.role === "user" ? "message user" : "message ai"}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))
          )}
             {isLoading && (
    <div className="message ai thinking">
      <em>Thinking...</em>
    </div>
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
