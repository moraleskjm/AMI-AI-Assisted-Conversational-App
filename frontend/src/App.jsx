import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
    //Welcome Message
  const [messages, setMessages] = useState([
  {
    text: "Hello, I'm AMI. I'm here to listen and support you. How are you feeling today?",
    sender: 'ami'
  }
]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mode, setMode] = useState('ami');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/ami', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          mode: mode,
          session_id: 'user-session-123',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add AMI's response to chat
      setMessages(prev => [...prev, {
        text: data.response,
        sender: 'ami',
      }]);

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ami',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleMicClick = () => {
    alert('Voice input coming soon!');
  };

  return (
    <>
      <div className="chat-container">
        {/* AMI Messages Box */}
        <div className="ami-box">
          {messages.length === 0 ? (
            <div className="ami-label">AMI</div>
          ) : (
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender} ${msg.isEmergency ? 'emergency' : ''} ${msg.isError ? 'error' : ''}`}
                >
                  <div className="message-content">
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message ami loading">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Bar */}
        <div className="chat-bar">
          <i
            className="fa-solid fa-microphone chat-icon"
            onClick={handleMicClick}
          ></i>

          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />

          <button

            className="send-btn"
            title="Send"
            onClick={sendMessage}
            disabled={isLoading}
          >
            <i className="fa-solid fa-paper-plane chat-icon"></i>
          </button>
        </div>
      </div>

      {/* Settings Icon - Fixed position */}
      <div className="settings" onClick={() => setShowSettings(!showSettings)}>
        <i className="fa-solid fa-gear"></i>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel">
          <h3>Settings</h3>
          <div className="setting-item">
            <label>Mode:</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="ami">AMI (Professional)</option>
              <option value="dad">Dad Mode (Coming Soon)</option>
              <option value="mommy">Mommy Mode (Coming Soon)</option>
              <option value="genz">Gen-Z Mode (Coming Soon)</option>
            </select>
          </div>
          <button className="close-settings" onClick={() => setShowSettings(false)}>
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default App;