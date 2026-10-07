# 🔍 Perplexity --- AI-Powered Search & Chat Application

A full-stack AI-powered conversational search and chat application
inspired by Perplexity, built with the MERN stack and Generative AI.

The application allows users to create an account, verify their email,
securely log in, start new conversations, access previous chats, and
interact with an AI assistant through a clean, modern interface.

## 🌐 Live Demo

**Live Application:**\
https://perplexity-m6gt.vercel.app/login

> **Note:** New users need to complete email verification before logging
> in.

------------------------------------------------------------------------

## ✨ Features

### 🔐 Authentication

-   User registration with Name, Email, and Password
-   Email verification through a verification link
-   Secure login with Email and Password
-   Protected routes
-   Logout functionality

### 🤖 AI Chat

-   Ask questions through a conversational interface
-   AI-generated responses
-   Interactive chat experience
-   Clean and responsive chat UI

### 💬 Chat Management

-   Create a New Chat
-   Maintain previous conversations
-   View chat history from the sidebar
-   Open previous conversations
-   Continue existing conversations
-   User-specific chat data

### 🎨 User Interface

-   Modern dark-themed interface
-   Responsive layout
-   Sidebar navigation
-   User profile section
-   Clean AI chat experience

------------------------------------------------------------------------

## 🔄 Application Flow

``` text
New User
   │
   ▼
Registration
(Name + Email + Password)
   │
   ▼
Verification Email
   │
   ▼
Verify Email
   │
   ▼
Login
(Email + Password)
   │
   ▼
Dashboard
   │
   ├── New Chat
   │      │
   │      ▼
   │   Ask Question
   │      │
   │      ▼
   │   AI Response
   │
   └── Chat History
          │
          ▼
      Open Previous Chat
```

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React.js
-   JavaScript
-   HTML5
-   CSS3
-   Axios
-   React Router

### Backend

-   Node.js
-   Express.js
-   REST APIs
-   MongoDB
-   Mongoose
-   Authentication & Authorization

### AI

-   Generative AI API
-   Prompt-based AI response generation

### Deployment

-   Vercel

------------------------------------------------------------------------

## 🏗️ Architecture

``` text
React.js Frontend
       │
       │ HTTP Requests
       ▼
Node.js + Express.js
       │
       ├── Authentication
       │
       ├── Chat APIs
       │
       ├── MongoDB
       │
       └── Generative AI API
                    │
                    ▼
               AI Response
                    │
                    ▼
              React Chat UI
```

------------------------------------------------------------------------

## 🔑 Authentication Flow

1.  User registers with name, email, and password.
2.  A verification email is sent to the registered email address.
3.  User clicks the verification link.
4.  The account is verified.
5.  User logs in using email and password.
6.  After successful authentication, the user enters the dashboard.
7.  Authenticated users can create chats, access chat history, and
    interact with the AI assistant.
8.  Users can log out securely.

------------------------------------------------------------------------

## 💬 Chat Experience

After logging in, users can:

-   Start a new conversation
-   Ask questions using the chat input
-   Receive AI-generated responses
-   View previous chats from the sidebar
-   Open and continue previous conversations
-   Manage their authenticated session

------------------------------------------------------------------------

## 📂 Project Structure

``` text
Perplexity/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── ...
│
├── .gitignore
└── README.md
```

------------------------------------------------------------------------

## ⚙️ Run Locally

### 1. Clone the repository

``` bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

### 2. Install dependencies

If frontend and backend are separate:

``` bash
cd client
npm install

cd ../server
npm install
```

### 3. Configure Environment Variables

Create the required `.env` files according to the project configuration.

Example:

``` env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
```

> **Important:** Never commit `.env` files, API keys, database
> credentials, or other secrets to GitHub.

### 4. Start the Application

Run the frontend and backend according to the project's scripts.

``` bash
npm run dev
```

------------------------------------------------------------------------

## 🎯 Key Learning & Implementation

This project provided practical experience in:

-   Building a complete MERN full-stack application
-   Implementing user authentication
-   Implementing email verification
-   Creating protected routes
-   Developing REST APIs with Express.js
-   Integrating MongoDB with Mongoose
-   Connecting frontend and backend APIs
-   Integrating Generative AI APIs
-   Managing conversations and chat history
-   Debugging authentication and API issues
-   Deploying a full-stack application

------------------------------------------------------------------------

## 🚀 Future Improvements

-   Streaming AI responses
-   Web search with source citations
-   Conversation sharing
-   Improved AI response formatting
-   Advanced search capabilities
-   Performance optimization

------------------------------------------------------------------------

## 👩‍💻 Developer

**Arpana Bharti**

Full Stack Developer \| MERN Stack \| Generative AI

------------------------------------------------------------------------

## ⭐ Live Project

https://perplexity-m6gt.vercel.app/login
