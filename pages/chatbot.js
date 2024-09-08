// pages/chatbot.js
import ChatbotInterface from '@/components/ChatbotInterface'

export default function Chatbot() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-red-700 mb-8 text-center">Chat with मैथिली मित्र AI</h1>
      <p className="text-lg mb-8 text-center">Ask our AI assistant anything about Mithila culture!</p>
      <ChatbotInterface />
    </div>
  )
}
