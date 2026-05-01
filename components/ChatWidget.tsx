'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are Hamza's technical skills?",
  "What is Hamza's work experience?",
  "Does Hamza work with AI?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
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

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.content },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
      <>
        {/* Toggle Button */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
            style={{ background: 'linear-gradient(135deg, #52a9ff, #1a6dbf)' }}
            aria-label="Toggle chat"
        >
          {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
          ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"/>
                <circle cx="19" cy="5" r="1.8" opacity="0.7"/>
                <circle cx="5" cy="19" r="1.2" opacity="0.5"/>
              </svg>
          )}
        </button>

        {/* Chat Panel */}
        <div
            className={`fixed right-6 w-[340px] h-[480px] bg-gray-900 rounded-lg shadow-2xl z-40 flex flex-col transition-all duration-300 ${
                isOpen ? 'bottom-24' : '-bottom-full'
            }`}
            style={{ border: '2px solid #52a9ff' }}
        >
          {/* Header */}
          <div
              className="p-4 rounded-t-lg flex items-center justify-between"
              style={{ background: 'linear-gradient(to right, #52a9ff, #1a6dbf)' }}
          >
            <div className="flex items-center gap-3">
              <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: '#1a6dbf' }}
              >
                HB
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Hamza&apos;s AI Assistant</h3>
                <p className="text-xs" style={{ color: '#c8e6ff' }}>Online</p>
              </div>
            </div>
            <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:opacity-75 transition-opacity"
                aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm mb-3">Suggested questions:</p>
                  {SUGGESTED_QUESTIONS.map((question, idx) => (
                      <button
                          key={idx}
                          onClick={() => sendMessage(question)}
                          className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 text-sm rounded-lg transition-colors"
                          style={{ color: '#52a9ff' }}
                      >
                        {question}
                      </button>
                  ))}
                </div>
            )}

            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                      className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                          msg.role === 'user' ? 'text-white' : 'bg-gray-800 text-gray-100'
                      }`}
                      style={msg.role === 'user' ? { backgroundColor: '#52a9ff' } : {}}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
            ))}

            {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-100 p-3 rounded-lg text-sm">
                    <span className="inline-block animate-pulse">...</span>
                  </div>
                </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm focus:outline-none disabled:opacity-50"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px #52a9ff')}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
              />
              <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#52a9ff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a6dbf')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#52a9ff')}
                  aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </>
  );
}