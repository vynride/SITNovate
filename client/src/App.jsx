import { Routes, Route } from 'react-router-dom'
import ChatPage from './pages/chat/Chatpage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  )
}

export default App
