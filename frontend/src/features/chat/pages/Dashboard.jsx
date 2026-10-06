import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat";
import "../styles/dashboard.scss";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../auth/hook/useAuth";
import { useRef } from "react";
import { FiTrash2, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
  } = useChat();
  const { handleGetMe,handleLogout  } = useAuth();

  const navigate = useNavigate();

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [input, setInput] = useState("");
  const [aiThinking, setAiThinking] = useState(false); // sirf send ke baad
  const user = useSelector((state) => state.auth.user);
  const [menu, setMenu] = useState(null); // { x, y, chatId }
  const [deletedIds, setDeletedIds] = useState([]); // delete hui chats sidebar se hide
  const pressTimer = useRef(null);

  // TASK 5: user name + first letter
  const userName = user?.name || "User";
  const initial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    initializeSocketConnection();
    handleGetChats();

    const loadUser = async () => {
      const data = await handleGetMe();
      setUser(data?.user || null);
    };
  }, []);

  const onLogout = async () => {
  await handleLogout();
  await handleGetMe()
  navigate("/login");
};

  const closeOnMobile = () => {
    if (window.innerWidth <= 768) setIsSidebarOpen(false);
  };

  // right-click menu: kahin bhi click karo to band
  useEffect(() => {
    const close = () => setMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  // TASK 2: thinking sirf request ke dauraan
  const handleSend = async () => {
    const text = input.trim();
    if (!text || aiThinking) return;

    setInput("");
    setAiThinking(true);
    try {
      await handleSendMessage({ message: text, chatId: currentChatId });
    } finally {
      setAiThinking(false); // response aaya ya error, dono me band
    }
  };

  const handleNewChat = () => {
    handleOpenChat(null, chats);
    setInput("");
    closeOnMobile();
  };

  const openChat = (chatId) => {
    handleOpenChat(chatId, chats);
  };

  // TASK 3: right click
  const openMenu = (e, chatId) => {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY, chatId });
  };

  // TASK 4: delete + sidebar se turant hatao
  const onDelete = async () => {
    const chatId = menu.chatId;
    // console.log("Deleting chat with ID:", chatId);
    setMenu(null);
    try {
      await handleDeleteChat(chatId);
      setDeletedIds((prev) => [...prev, chatId]);
      if (chatId === currentChatId) {
        handleOpenChat(null, chats); // open chat delete hui to blank screen
      }
    } catch (err) {
      // console.log("delete error:", err);
    }
  };

  const chatList = Object.values(chats || {}).filter(
    (chat) => !deletedIds.includes(chat._id),
  );

  const currentMessages = chats?.[currentChatId]?.message || [];

  return (
    <div className="dashboard">
      <div className="mobile-bar">
        <span className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
          ☰
        </span>
        <span className="logo">Perplexity</span>
      </div>
      {isSidebarOpen && (
        <div className="backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
        <div className="sidebar-top">
          <span className="logo">Perplexity</span>
          <span
            className="collapse-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </span>
        </div>

        <div className="sidebar-middle">
          <div className="new-chat" onClick={handleNewChat}>
            <span className="icon">+</span>
            <span className="label">New Chat</span>
          </div>

          <div className="chat-history">
            <p className="heading">CHATS</p>
            <div className="chat-list">
              {chatList.map((chat, i) => (
                <div
                  key={chat._id || i}
                  className={`chat-item ${currentChatId === chat._id ? "active" : ""}`}
                  onClick={() => openChat(chat._id)}
                  onContextMenu={(e) => openMenu(e, chat._id)}
                  onTouchStart={(e) => {
                    const t = e.touches[0];
                    pressTimer.current = setTimeout(
                      () =>
                        setMenu({
                          x: t.clientX,
                          y: t.clientY,
                          chatId: chat._id,
                        }),
                      600,
                    );
                  }}
                  onTouchEnd={() => clearTimeout(pressTimer.current)}
                  onTouchMove={() => clearTimeout(pressTimer.current)}
                >
                  {chat.title || "Untitled Chat"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="avatar">{initial}</div>
          <span className="username">{userName}</span>
          <button className="logout-btn" onClick={onLogout} title="Logout">
    <FiLogOut />
  </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        <div className="messages">
          {currentMessages.length === 0 && !aiThinking ? (
            <div className="empty-state">
              <h2>What's on the agenda today?</h2>
              <p>Start a conversation</p>
            </div>
          ) : (
            currentMessages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === "user" ? "message user" : "message ai"}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))
          )}

          {aiThinking && (
            <div className="message ai thinking">
              <em>Thinking...</em>
            </div>
          )}
        </div>

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

          <button onClick={handleSend} disabled={aiThinking}>
            ➤
          </button>
        </div>
      </div>

      {/* Right-click menu */}
      {menu && (
        <div
          className="context-menu"
          style={{
            top: menu.y,
            left: Math.min(menu.x, window.innerWidth - 160),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="menu-item danger" onClick={onDelete}>
            <FiTrash2 /> Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
