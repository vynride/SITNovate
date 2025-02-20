import React, { useState } from 'react'
import './chatpage.css'
import Sidebar from '../../components/chat/Sidebar'
import Chat from '../../components/chat/Chat'

function Chatpage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="app">
      <Sidebar onToggle={handleSidebarToggle} />
      <Chat isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  )
}

export default Chatpage
