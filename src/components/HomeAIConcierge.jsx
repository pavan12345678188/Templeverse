import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormattedText from './FormattedText.jsx';

export default function HomeAIConcierge({ onSelectTemple, onOpenFullModal, dark }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [sources, setSources] = useState([]);
  const [suggestedTemples, setSuggestedTemples] = useState([]);

  const promptChips = [
    { label: "🕉️ 12 Jyotirlingas", q: "List the 12 sacred Jyotirlingas with their locations and spiritual significance." },
    { label: "🎟️ Tirumala Darshan Guide", q: "What are the rules, timings, dress code, and ticket types for Tirumala Venkateswara darshan?" },
    { label: "🌊 5 Pancha Bhoota Stalams", q: "Explain the five Pancha Bhoota Stalams in South India and the elements they represent." },
    { label: "🌺 Kamakhya Shakti Peetha", q: "What is the unique ritual and history of Kamakhya Temple in Assam?" },
    { label: "🏛️ Char Dham Route", q: "Which temples constitute the sacred Char Dham pilgrimage and what is the traditional travel order?" },
  ];

  const handleAsk = async (textToAsk) => {
    const q = textToAsk || query;
    if (!q.trim() || loading) return;

    setLoading(true);
    setResponse(null);
    setSources([]);
    setSuggestedTemples([]);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q }),
      });

      if (!res.ok) throw new Error('Failed to consult TempleVerse AI');
      const data = await res.json();
      setResponse(data.reply || data.text || '');
      setSources(data.sources || []);
      setSuggestedTemples(data.suggestedTemples || []);
    } catch (err) {
      console.error(err);
      setResponse("TempleVerse AI is available to assist devotees with sthala puranas, sacred rituals, festival dates, and darshan regulations. Please try your inquiry again or rephrase your question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 mb-16">
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-xl transition-all ${
        dark
          ? 'bg-gradient-to-br from-gray-900 via-amber-950/30 to-gray-900 border-amber-600/40 shadow-amber-950/40'
          : 'bg-gradient-to-br from-amber-50 via-yellow-50/80 to-orange-50/40 border-amber-300 shadow-amber-200/50'
      }`}>
        {/* Sacred ambient background ornamentation */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-500/20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">✨</span>
                <span className={`text-xs font-bold tracking-widest uppercase ${dark ? 'text-amber-400' : 'text-amber-800'}`}>
                  AI-Powered Sacred Knowledge
                </span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>
                TempleVerse AI Divine Concierge
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                Ask about sacred rituals, sthala puranas, auspicious darshan muhurtas, dress codes, and prasad offerings.
              </p>
            </div>

            {onOpenFullModal && (
              <button
                onClick={onOpenFullModal}
                className={`self-start sm:self-center px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm border cursor-pointer ${
                  dark
                    ? 'bg-amber-900/40 text-amber-300 hover:bg-amber-900/60 border-amber-700/60'
                    : 'bg-white text-amber-800 hover:bg-amber-100 border-amber-300'
                }`}
              >
                <span>Full Chat View</span>
                <span>↗</span>
              </button>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="mb-4">
            <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${dark ? 'text-amber-400/80' : 'text-amber-700'}`}>
              Recommended Devotional Queries:
            </p>
            <div className="flex flex-wrap gap-2">
              {promptChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(chip.q);
                    handleAsk(chip.q);
                  }}
                  disabled={loading}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
                    dark
                      ? 'bg-gray-800/80 text-gray-200 border-gray-700 hover:border-amber-500 hover:text-amber-300 hover:bg-gray-800'
                      : 'bg-white text-gray-800 border-amber-200/80 hover:border-amber-500 hover:text-amber-900 hover:bg-amber-50 shadow-sm'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex flex-col sm:flex-row gap-2 mb-6"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask e.g., 'What is the significance of the Bhasma Aarti at Mahakaleshwar?'"
                className={`w-full px-4 py-3 rounded-2xl text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500 transition shadow-inner ${
                  dark
                    ? 'bg-gray-800/90 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-amber-200 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-2xl text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Consulting...</span>
                </>
              ) : (
                <>
                  <span>Consult AI</span>
                  <span>🕉️</span>
                </>
              )}
            </button>
          </form>

          {/* Response Container */}
          <AnimatePresence>
            {(loading || response) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-5 rounded-2xl border transition-all ${
                  dark
                    ? 'bg-gray-950/70 border-amber-900/60 text-gray-200'
                    : 'bg-white/95 border-amber-200/90 text-gray-800 shadow-md'
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-3 py-4">
                    <span className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <span className={`text-sm italic ${dark ? 'text-amber-400' : 'text-amber-700'}`}>
                      Accessing sacred texts and verified darshan information...
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-amber-500/20">
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${dark ? 'text-amber-400' : 'text-amber-800'}`}>
                        <span>🕉️</span> Divine Response
                      </span>
                      <button
                        onClick={() => {
                          setResponse(null);
                          setSources([]);
                          setSuggestedTemples([]);
                        }}
                        className={`text-xs underline hover:no-underline cursor-pointer ${dark ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        Clear
                      </button>
                    </div>

                    <div className="mb-4">
                      <FormattedText text={response} dark={dark} />
                    </div>

                    {/* Grounding Sources */}
                    {sources.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-amber-500/20">
                        <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${dark ? 'text-amber-400/80' : 'text-amber-800'}`}>
                          Official Portals & Sources:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {sources.map((s, idx) => (
                            <a
                              key={idx}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-[11px] px-2.5 py-1 rounded-lg border transition hover:underline flex items-center gap-1 ${
                                dark
                                  ? 'bg-gray-900 text-amber-300 border-gray-700 hover:border-amber-500'
                                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:border-amber-400'
                              }`}
                            >
                              <span>🌐</span>
                              <span className="max-w-[200px] truncate">{s.title || s.url}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested Temples */}
                    {suggestedTemples.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-amber-500/20">
                        <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${dark ? 'text-amber-400/80' : 'text-amber-800'}`}>
                          Related Sacred Temples:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {suggestedTemples.map((temple) => (
                            <button
                              key={temple.id}
                              onClick={() => onSelectTemple && onSelectTemple(temple.id)}
                              className={`p-2.5 rounded-xl border text-left transition hover:scale-[1.01] flex items-center justify-between cursor-pointer ${
                                dark
                                  ? 'bg-gray-900/90 border-gray-800 hover:border-amber-500'
                                  : 'bg-amber-50/60 border-amber-200 hover:border-amber-400'
                              }`}
                            >
                              <div className="min-w-0 pr-2">
                                <p className={`text-xs font-bold truncate ${dark ? 'text-white' : 'text-gray-900'}`}>
                                  {temple.name}
                                </p>
                                <p className={`text-[10px] truncate ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  📍 {temple.city}, {temple.state}
                                </p>
                              </div>
                              <span className="text-xs text-amber-500 font-bold">View ›</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
