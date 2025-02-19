import React from 'react'
import "./chat.css"

const Chat = () => {
  return (
    <main className="chat-main">
        <h1 className="chat-heading">What can I help you summarize?</h1>

        <div className="chat-inputContainer">
          <input type="text" className="chat-input" placeholder="How to summarize......" />
          <button className="chat-attachButton">
            
          </button>
        </div>

        <div className="chat-actions">
          <button className="chat-actionButton">
            
            Clone a Screenshot
          </button>
          <button className="chat-actionButton">
            
            Import from Figma
          </button>
          <button className="chat-actionButton">
            
            Upload a Project
          </button>
          <button className="chat-actionButton">
            
            Landing Page
          </button>
          <button className="chat-actionButton">
            
            Sign Up Form
          </button>
        </div>
    </main>
  )
}

export default Chat
