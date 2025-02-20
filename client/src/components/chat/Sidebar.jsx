import React, { useState } from 'react'
import './sidebar.css'

const Sidebar = ({ onToggle }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        onToggle && onToggle(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-top">
                <img src="chat/vite.svg" alt="" />
                {!isCollapsed && <div className="sidebar-toggle">
                    <button onClick={toggleSidebar}>
                        <span>☰</span>
                    </button>
                </div>}
            </div>

            <div className="sidebar-new-chat">
                <button>
                    <span>{isCollapsed ? '+' : 'New Chat'}</span>
                </button>
            </div>

            <div className="sidebar-recent-chats">
                <p>Recent Chats</p>
            </div>

            {isCollapsed && <div className="sidebar-toggle-bottom">
                    <button onClick={toggleSidebar}>
                        <span>☰</span>
                    </button>
            </div>}

            <div className="sidebar-profile">
                <img src="vite.svg" alt="" />
                <div className="sidebar-profile-info">
                    <p>User</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
