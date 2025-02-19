import React from 'react'
import './chatpage.css'
import Sidebar from '../../components/chat/Sidebar'
import Chat from '../../components/chat/Chat'

function Chatpage() {
  return (
    <div className="app">
      <Sidebar className="sidebar" />
      <Chat className="chat" />
    </div>
  )
}

export default Chatpage
