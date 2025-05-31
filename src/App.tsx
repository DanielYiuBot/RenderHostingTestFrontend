import { useState, useRef, useEffect } from 'react';
import { Message } from './types/chat';
import { format } from 'date-fns';
import { FiSend, FiPaperclip, FiSmile } from 'react-icons/fi';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        messages: [{ role: 'user', content: input }],
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      const errorMessage = error.response?.data?.detail || 'An error occurred while sending your message.';
      
      // Add error message to chat
      const errorChatMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${errorMessage}`,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-whatsapp-dark text-white p-4 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-whatsapp-green flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
            <p className="text-sm text-gray-200">Online</p>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#E5DDD5]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
                message.role === 'user'
                  ? 'bg-whatsapp-green text-white rounded-tr-none'
                  : message.content.startsWith('Error:')
                  ? 'bg-red-100 text-red-800 rounded-tl-none'
                  : 'bg-white text-gray-800 rounded-tl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs mt-1 opacity-70 text-right">
                {format(message.timestamp, 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-3 shadow-sm rounded-tl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border-t border-gray-200"
      >
        <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
          >
            <FiSmile size={24} />
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
          >
            <FiPaperclip size={24} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-whatsapp-green text-white p-2 rounded-full hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <FiSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default App; 