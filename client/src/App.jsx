import { Routes, Route } from 'react-router-dom'
import ChatPage from './pages/chat/Chatpage'
import Homepage from './pages/home/Homepage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  )
}

export default App
