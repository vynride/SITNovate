import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { exportToPDF, exportToDocx, exportToTXT } from '../../utils/exportUtils'
import "./chat.css"

const Chat = ({ className, isSidebarCollapsed }) => {
  const [files, setFiles] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/conversations');
      const data = await response.json();
      if (data.success) {
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => 
      file.type === 'application/pdf' || file.type === 'text/plain'
    );
    
    if (validFiles.length !== selectedFiles.length) {
      alert('Only PDF and TXT files are allowed');
    }
    
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (files.length === 0 && !prompt) {
      alert('Please provide a prompt or upload files');
      return;
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('prompt', prompt || '');

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        await fetchConversations(); // Refresh conversations
        setFiles([]); // Clear files
        setPrompt(''); // Clear prompt
      } else {
        throw new Error(data.error || 'Processing failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process files: ' + error.message);
    }
  };

  const handleExport = (content, type) => {
    switch(type) {
      case 'pdf':
        exportToPDF(content);
        break;
      case 'docx':
        exportToDocx(content);
        break;
      case 'txt':
        exportToTXT(content);
        break;
      default:
        console.error('Unsupported export type');
    }
  };

  return (
    <main className={`chat-main ${className} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <h1 className="chat-heading">Document Summarization Assistant</h1>

      <div className="chat-container">
        <div className="chat-inputContainer">
          <input 
            type="text" 
            className="chat-input" 
            placeholder="How to summarize......" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="chat-buttons">
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              id="file-upload"
              className="chat-file-input"
              multiple
            />
            <label htmlFor="file-upload" className="chat-attachButton">
              Upload Files
            </label>
            <button className="chat-submitButton" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="chat-files">
            {files.map((file, index) => (
              <div key={index} className="chat-file">
                <span>{file.name}</span>
                <button 
                  className="chat-file-remove"
                  onClick={() => removeFile(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="chat-conversations">
          {conversations.map((conv, index) => (
            <div key={index} className="chat-conversation">
              <div className="chat-conversation-header">
                <div className="chat-conversation-title">
                  <span className="file-name">{conv.originalName}</span>
                  <span className="chat-date">{new Date(conv.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="chat-messages">
                {conv.messages.map((msg, msgIndex) => (
                  <div 
                    key={msgIndex} 
                    className={`chat-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
                  >
                    {msg.role === 'user' ? (
                      <p>{msg.content}</p>
                    ) : (
                      <>
                        <ReactMarkdown 
                          className="markdown-content"
                          components={{
                            p: ({node, ...props}) => <p className="message-paragraph" {...props} />,
                            ul: ({node, ...props}) => <ul className="message-list" {...props} />,
                            li: ({node, ...props}) => <li className="message-list-item" {...props} />,
                            blockquote: ({node, ...props}) => <blockquote className="message-quote" {...props} />
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                        <div className="export-buttons">
                          <button onClick={() => handleExport(msg.content, 'pdf')}>Export PDF</button>
                          <button onClick={() => handleExport(msg.content, 'docx')}>Export DOCX</button>
                          <button onClick={() => handleExport(msg.content, 'txt')}>Export TXT</button>
                        </div>
                      </>
                    )}
                    <span className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Chat
