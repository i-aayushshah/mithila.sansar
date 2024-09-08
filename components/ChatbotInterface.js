import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { sendMessage } from '../lib/openaiApi';
import { FaPaperPlane, FaSpinner, FaRegSmile, FaInfoCircle, FaTrash, FaMoon, FaSun, FaArrowRight } from 'react-icons/fa';
import { formatDate, truncateString } from '../utils/helpers';

// Dynamically import EmojiPicker with ssr option set to false
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export default function MaithiliMitraAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) &&
          !event.target.closest('button[aria-label="Toggle emoji picker"]')) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isMobile = windowWidth <= 768;

  useEffect(() => {
    const link1 = document.createElement('link');
    link1.href = 'https://fonts.googleapis.com/css2?family=Yatra+One&display=swap';
    link1.rel = 'stylesheet';
    document.head.appendChild(link1);

    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Georgia';
        src: local('Georgia');
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(style);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e, isContinuation = false) => {
    e.preventDefault();
    if ((!input.trim() && !isContinuation) || isLoading) return;

    setIsLoading(true);
    setShowContinue(false);

    try {
      let response;
      if (isContinuation) {
        const lastBotMessage = messages.filter(m => m.sender === 'bot').pop();
        response = await sendMessage("Please continue", [...messages, { text: "Please continue", sender: 'user', timestamp: new Date() }]);
      } else {
        const userMessage = {
          text: input,
          sender: 'user',
          timestamp: new Date()
        };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');
        response = await sendMessage(input, messages);
      }

      const botMessage = {
        text: response.maithili,
        translation: response.english,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);

      if (botMessage.text.length >= 200 || botMessage.text.endsWith('...')) {
        setShowContinue(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        text: 'क्षमा करू, अहाँक अनुरोधक प्रक्रियामे त्रुटि भेल। / Sorry, there was an error processing your request.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    const cursor = inputRef.current.selectionStart;
    const text = input.slice(0, cursor) + emojiObject.emoji + input.slice(cursor);
    setInput(text);
    setShowEmojiPicker(false);
    inputRef.current.focus();
  };

  const clearChat = () => {
    setMessages([]);
    setShowContinue(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleEmojiPicker = (e) => {
    e.stopPropagation();
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className={`flex flex-col h-[600px] ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg overflow-hidden shadow-2xl transition-colors duration-300`}>
      <div className={`${darkMode ? 'bg-red-900' : 'bg-red-700'} text-white p-4 flex justify-between items-center`}>
        <h1 className="font-bold text-xl font-['Yatra_One']">मैथिली मित्र AI</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-full ${darkMode ? 'bg-red-800 hover:bg-red-700' : 'bg-red-600 hover:bg-red-500'} transition duration-300`}
            aria-label="Show information"
          >
            <FaInfoCircle />
          </button>
          <button
            onClick={clearChat}
            className={`p-2 rounded-full ${darkMode ? 'bg-red-800 hover:bg-red-700' : 'bg-red-600 hover:bg-red-500'} transition duration-300`}
            aria-label="Clear chat"
          >
            <FaTrash />
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-red-800 hover:bg-red-700' : 'bg-red-600 hover:bg-red-500'} transition duration-300`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
      {showInfo && (
        <div className={`${darkMode ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-900'} p-4 text-sm`}>
          <p className="font-['Yatra_One']">मैथिली आ अंग्रेजी दुनू भाषामे गप करू। अहाँक संदेश कोनो भाषामे लिखू, उत्तर दुनू भाषामे भेटत।</p>
          <p className="font-['Georgia']">Communicate in both Maithili and English. Type your message in either language, and you'll receive responses in both.</p>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        <div className="h-full p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-md ${
                  message.sender === 'user'
                    ? `${darkMode ? 'bg-red-900 text-white' : 'bg-red-700 text-white'}`
                    : `${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`
                }`}
              >
                <p className="font-semibold font-['Yatra_One']">{truncateString(message.text, 200)}</p>
                {message.translation && (
                  <p className="mt-2 text-sm opacity-75 font-['Georgia']">{truncateString(message.translation, 200)}</p>
                )}
                <p className="text-xs opacity-50 mt-1 font-['Georgia']">{formatDate(message.timestamp)}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {showContinue && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-2 text-center`}>
          <button
            onClick={(e) => handleSubmit(e, true)}
            className={`${
              darkMode
                ? 'bg-red-900 hover:bg-red-800'
                : 'bg-red-700 hover:bg-red-600'
            } text-white rounded-full px-4 py-2 transition duration-300 flex items-center justify-center mx-auto`}
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : <FaArrowRight className="mr-2" />}
            जारी राखू / Continue
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-md relative`}>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="मैथिली वा अंग्रेजीमे अपन संदेश टाइप करू... / Type your message in Maithili or English..."
              className={`w-full border rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-700 font-['Yatra_One'] ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={toggleEmojiPicker}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Toggle emoji picker"
            >
              <FaRegSmile />
            </button>
          </div>
          <button
            type="submit"
            className={`${
              darkMode
                ? 'bg-red-900 hover:bg-red-800'
                : 'bg-red-700 hover:bg-red-600'
            } text-white rounded-full p-3 transition duration-300 disabled:opacity-50`}
            disabled={isLoading}
            aria-label="Send message"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
          </button>
        </div>
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className={`absolute ${isMobile ? 'left-0 right-0 bottom-full' : 'right-0 bottom-full'} mb-2`}
            style={{
              maxWidth: isMobile ? '100%' : '320px',
              zIndex: 1000
            }}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={isMobile ? '100%' : '320px'}
              height={isMobile ? '350px' : '450px'}
              searchDisabled={false}
              skinTonesDisabled
              previewConfig={{
                showPreview: false
              }}
            />
          </div>
        )}
      </form>
    </div>
  );
}
