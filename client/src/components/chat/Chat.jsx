import React, { useState } from 'react'
import "./chat.css"

const Chat = () => {
  const [files, setFiles] = useState([]);
  const [prompt, setPrompt] = useState('');

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
      formData.append('files', file); // Changed from file${index} to files
    });
    formData.append('prompt', prompt || ''); // Ensure prompt is always sent

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload response:', data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to upload files: ' + error.message);
    }
  };

  return (
    <main className="chat-main">
      <h1 className="chat-heading">What can I help you summarize?</h1>

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
      </div>
    </main>
  )
}

export default Chat
