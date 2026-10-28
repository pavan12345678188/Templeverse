import React, { useState, useRef, useEffect } from 'react';
import TempleLogo from '../assets/templeverse-logo.png';
import FormattedText from './FormattedText.jsx';

export default function TempleVerseAIAssistant({ isOpen, onClose, onSelectTemple, dark }) {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Namaste 🙏 I am your **TempleVerse AI Assistant**. I can help you discover India’s sacred temples, explore the **12 Jyotirlingas**, **18 Maha Shakti Peethas**, **5 Pancha Bhoota Stalams**, darshan booking guides, rituals, history, and real-time pilgrimage travel.\n\nHow may I assist your spiritual journey today?',
      sources: [],
      suggestedTemples: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useLocation, setUseLocation] = useState(false);
  const [coords, setCoords] = useState(null);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Tell me about the 5 Pancha Bhoota Stalams',
    'Which 12 Jyotirlingas are across India?',
    'What is the history of Tirumala Tirupati Balaji?',
    'Explain the 18 Maha Shakti Peethas',
    'How do I book online darshan tickets?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleToggleLocation = () => {
    if (!useLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
            setUseLocation(true);
          },
          (err) => {
            console.warn('Location permission denied:', err);
            setUseLocation(false);
          }
        );
      }
    } else {
      setUseLocation(false);
      setCoords(null);
    }
  };

  const sendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = { sender: 'user', text: query.trim() };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          userLocation: coords,
          preferMaps: useLocation,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: data.text || 'Thank you for asking. Please feel free to explore any temple details.',
          sources: data.sources || [],
          suggestedTemples: data.suggestedTemples || [],
          groundingType: data.groundingType,
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: 'Namaste. We encountered a momentary connection issue. You can explore our extensive 143+ temple directory and sacred categories directly from the navigation bar.',
          sources: [],
          suggestedTemples: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full sm:max-w-2xl h-[90vh] sm:h-[650px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
          dark
            ? 'bg-gray-900 border-yellow-800/80 text-white'
            : 'bg-white border-yellow-300 text-gray-800'
        }`}
      >
        {/* Assistant Header */}
        <div
          className={`flex items-center justify-between px-5 py-4 border-b ${
            dark
              ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-yellow-950/40 border-yellow-800/60'
              : 'bg-gradient-to-r from-amber-50 via-yellow-100 to-amber-100 border-amber-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={TempleLogo}
              alt="TempleVerse"
              className="w-10 h-10 object-contain rounded-full shadow-md border-2 border-yellow-500/60"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-base ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>
                  TempleVerse AI Assistant
                </h3>
              
              </div>
              <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                Sacred pilgrimage guide & temple information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition ${
              dark ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-amber-200 text-gray-600'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Location & Quick Filters Bar */}
        <div
          className={`px-4 py-2 border-b flex items-center justify-between text-xs ${
            dark ? 'bg-gray-950/70 border-gray-800' : 'bg-amber-50/60 border-amber-100'
          }`}
        >
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useLocation}
              onChange={handleToggleLocation}
              className="rounded text-yellow-600 focus:ring-yellow-500"
            />
            <span className={dark ? 'text-gray-300' : 'text-gray-700'}>
              📍 Find temples near my location {coords ? '(Enabled)' : ''}
            </span>
          </label>
         
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-yellow-600 text-white rounded-br-none'
                    : dark
                    ? 'bg-gray-800 border border-yellow-900/60 text-gray-200 rounded-bl-none'
                    : 'bg-amber-50/90 border border-amber-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <FormattedText text={msg.text} dark={msg.sender === 'user' ? false : dark} />

                {/* Grounding Source Links (Google Search / Maps) */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-dashed border-yellow-500/30">
                    <p className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                      dark ? 'text-yellow-400' : 'text-yellow-700'
                    }`}>
                      🌐 Verified Sources:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
                            dark
                              ? 'bg-gray-900 hover:bg-gray-700 text-yellow-300 border border-yellow-700/50'
                              : 'bg-white hover:bg-yellow-100 text-yellow-800 border border-yellow-300'
                          }`}
                        >
                          <span>🔗</span>
                          <span className="truncate max-w-[200px]">{src.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mentioned Temple Preview Cards */}
                {msg.suggestedTemples && msg.suggestedTemples.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-dashed border-yellow-500/30">
                    <p className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                      dark ? 'text-yellow-400' : 'text-yellow-700'
                    }`}>
                      🛕 Temples in TempleVerse:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {msg.suggestedTemples.map((temple) => (
                        <div
                          key={temple.id}
                          onClick={() => {
                            onClose();
                            onSelectTemple(temple.id);
                          }}
                          className={`p-2 rounded-xl border flex items-center gap-2.5 cursor-pointer transition hover:scale-[1.02] ${
                            dark
                              ? 'bg-gray-900/90 border-yellow-800 hover:border-yellow-500'
                              : 'bg-white border-amber-200 hover:border-yellow-400 shadow-sm'
                          }`}
                        >
                          {temple.image ? (
                            <img
                              src={temple.image}
                              alt={temple.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <span className="text-xl">🛕</span>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold truncate ${dark ? 'text-yellow-300' : 'text-yellow-800'}`}>
                              {temple.name}
                            </p>
                            <p className={`text-[10px] truncate ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                              📍 {temple.city}, {temple.state}
                            </p>
                          </div>
                          <span className="text-xs text-yellow-500 font-bold">›</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-yellow-600 animate-pulse">
              <span className="text-lg">🕉️</span>
              <span>Consulting sacred records and Searching</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className={`px-4 py-2 overflow-x-auto no-scrollbar border-t flex gap-2 ${
          dark ? 'bg-gray-950/80 border-gray-800' : 'bg-amber-50/50 border-amber-100'
        }`}>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => sendMessage(prompt)}
              className={`text-xs whitespace-nowrap px-3 py-1 rounded-full border transition ${
                dark
                  ? 'border-gray-700 bg-gray-800 hover:bg-yellow-900/40 hover:text-yellow-300 text-gray-300'
                  : 'border-amber-200 bg-white hover:bg-yellow-100 text-gray-700'
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className={`p-3 border-t flex gap-2 ${
            dark ? 'bg-gray-900 border-yellow-900/50' : 'bg-white border-amber-200'
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Jyotirlingas, Shakti Peethas, Pancha Bhoota Stalams..."
            className={`flex-1 rounded-full px-4 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
              dark
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                : 'bg-amber-50/50 border-amber-200 text-gray-800 placeholder-gray-400'
            }`}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white rounded-full font-semibold text-sm transition shadow-md flex items-center gap-1.5"
          >
            <span>Ask</span>
            <span>🙏</span>
          </button>
        </form>
      </div>
    </div>
  );
}
