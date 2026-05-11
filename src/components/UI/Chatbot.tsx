import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const NGO_CONTEXT = `
You are the Sankalp Bharat Seva Assistant. Sankalp Bharat is a luxury traditional NGO representing Indian culture, heritage, and humanity.
Key Focus Areas: Child Education, Women Empowerment, Hunger Relief, Healthcare, Rural Development, Sustainability.
Tone: Compassionate, respectful, deeply rooted in Indian values (e.g., using 'Namaste', 'Seva', 'Dharma').
Goal: Answer questions about our mission and invite users to participate in the 'Daana' (giving).
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: 'Namaste! I am your Sankalp Bharat Seva assistant. How may I assist you in your journey of service today?' }
  ]);
  // ... rest of the logic remains similar but UI needs updates
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({
          role: m.role === 'bot' ? 'model' as const : 'user' as const,
          parts: [{ text: m.content }]
        })), { role: 'user', parts: [{ text: userMessage }] }],
        config: {
            systemInstruction: NGO_CONTEXT
        }
      });

      const botText = response.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: 'bot', content: botText }]);
    } catch (error) {
      console.error('Chat AI Error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: "Our systems are experiencing high traffic. Please try again later or contact us at impact@bharatimpact.org" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-maroon rounded-full shadow-[0_10px_40px_rgba(128,0,0,0.5)] flex items-center justify-center text-gold border border-gold/20"
      >
        <MessageSquare className="w-6 h-6" />
        <motion.div
           animate={{ scale: [1, 1.2, 1] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute -top-1 -right-1 w-4 h-4 bg-saffron rounded-full border-2 border-[#0c0805]"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-28 right-8 z-[60] w-[90vw] sm:w-[400px] h-[550px] bg-[#0c0805] border border-gold/20 rounded-[32px] shadow-2xl flex flex-col overflow-hidden backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="p-8 bg-maroon/20 border-b border-gold/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-maroon/40 rounded-xl border border-gold/20">
                  <Bot className="w-6 h-6 text-gold" />
                </div>
                <div>
                   <h4 className="text-xs font-serif font-black tracking-widest text-beige uppercase">Seva Assistant</h4>
                   <span className="text-[9px] text-saffron font-mono uppercase tracking-widest">Sankalp Bharat</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gold/30 hover:text-gold transition-colors">
                 <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 mandala-pattern">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-maroon text-beige rounded-tr-none border border-gold/10 shadow-lg' 
                      : 'bg-white/5 text-beige/80 rounded-tl-none border border-gold/5 italic font-serif'
                  }`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-gold/5 flex gap-1.5 shadow-inner">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-saffron rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-saffron rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-saffron rounded-full" />
                   </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-8 bg-maroon/10 border-t border-gold/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about our Seva..."
                  className="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 pl-6 pr-14 text-sm text-beige focus:outline-none focus:border-gold transition-colors placeholder:text-beige/20 font-serif"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-3 top-2.5 p-2 text-saffron hover:text-gold transition-colors bg-maroon/40 rounded-xl"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-6 text-[8px] text-gold/30 uppercase tracking-[0.4em] font-black">
                 <Sparkles className="w-3 h-3" />
                 Spiritually Guided AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
