import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as Tone from 'tone'; // Import Tone.js;
import TempleLogo from './assets/templeverse-logo.png';
import { templesData, categoriesData } from './data/templesData.js';
import TopCategoryBar from './components/TopCategoryBar.jsx';
import TempleVerseAIAssistant from './components/TempleVerseAIAssistant.jsx';
import JourneyPlannerPage from './components/JourneyPlannerPage.jsx';
import CompareTemplesPage from './components/CompareTemplesPage.jsx';
import HomeAIConcierge from './components/HomeAIConcierge.jsx';
import CategoriesPage from './components/CategoriesPage.jsx';

// ============================================================
// DARK MODE CONTEXT
// ============================================================
const DarkModeContext = React.createContext();
function useDarkMode() { return React.useContext(DarkModeContext); }

// ============================================================
// FAVORITES CONTEXT (localStorage)
// ============================================================
const FavoritesContext = React.createContext();
function useFavorites() { return React.useContext(FavoritesContext); }

// ============================================================
// REVIEWS CONTEXT (in-memory per session)
// ============================================================
const ReviewsContext = React.createContext();
function useReviews() { return React.useContext(ReviewsContext); }

// ============================================================
// TOP NAVBAR - With official logo, sacred categories & search
// ============================================================
function TopNavbar({ onNavigate, onSearch, currentCategoryFilter, currentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { dark, toggleDark } = useDarkMode();
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) { onSearch(searchVal.trim()); setSearchVal(''); setIsOpen(false); }
  };

  const sacredGroups = [
    { label: "🕉️ 12 Jyotirlingas", filter: "Jyotilinga" },
    { label: "🌺 18 Shakti Peethas", filter: "Maha Shakti Peetha" },
    { label: "🌊 5 Pancha Bhoota Stalams", filter: "Pancha Bhoota Stalams" },
    { label: "🏛️ Char Dham", filter: "Char Dham" },
    { label: "🌸 Pancharama Kshetrams", filter: "Pancharama Kshetrams" },
  ];

  const navLinks = [
    { label: "🏠 Home", page: "home" },
    { label: "ℹ️ About", page: "about" },
    { label: "🛕 Explore Temples", page: "explore" },
    { label: "📋 Categories", page: "categories" },
    { label: "🎟️ Darshanam Tickets", page: "tickets" },
    { label: "🎉 Temple Festivals", page: "festivals" },
    { label: "📖 History", page: "history" },
    { label: "🗺️ By State", page: "statewise" },
    { label: "❤️ My Favorites", page: "favorites" },
    { label: "🗺️ Map View", page: "mapview" },
    { label: "📍 Nearby Temples", page: "nearby" },
    { label: "🧭 Journey Planner", page: "planner" },
    { label: "⚖️ Compare Temples", page: "compare" },
    { label: "📞 Contact Us", page: "contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 shadow-lg transition-colors duration-300 md:hidden ${dark ? 'bg-gray-900 border-b border-yellow-700' : 'bg-amber-50 border-b border-yellow-200'}`}>
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
        <img src={TempleLogo} alt="TempleVerse Logo" className="w-9 h-9 object-contain rounded-full shadow-md border-2 border-yellow-500/80" />
        <span className={`text-lg font-extrabold tracking-wider ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>TEMPLEVERSE</span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleDark} className={`text-lg p-1.5 rounded-full ${dark ? 'bg-yellow-700 text-white' : 'bg-yellow-200 text-gray-800'}`}>{dark ? '☀️' : '🌙'}</button>
        <button className={`text-2xl p-1 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`} onClick={() => setIsOpen(!isOpen)}>☰</button>
      </div>
      {isOpen && (
        <div className={`absolute top-full left-0 w-full shadow-xl z-40 max-h-[85vh] overflow-y-auto ${dark ? 'bg-gray-900 border-t border-yellow-700' : 'bg-white border-t border-yellow-200'}`}>
          <form onSubmit={handleSearch} className="px-4 pt-3 pb-2 flex gap-2">
            <input value={searchVal} onChange={e=>setSearchVal(e.target.value)} placeholder="Search temples, deities, states..." className={`flex-1 border rounded-full px-3 py-1.5 text-sm ${dark ? 'bg-gray-800 border-yellow-700 text-white placeholder-gray-400' : 'border-yellow-300 text-gray-800'}`} />
            <button type="submit" className="bg-yellow-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">Go</button>
          </form>

          {/* Sacred Groups Quick Links */}
          <div className="px-4 py-2 border-b border-yellow-500/20">
            <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${dark ? 'text-yellow-500' : 'text-yellow-800'}`}>Sacred Categories</p>
            <div className="flex flex-wrap gap-1.5">
              {sacredGroups.map((g, idx) => (
                <button
                  key={idx}
                  onClick={() => { onNavigate('explore', null, g.filter, null); setIsOpen(false); }}
                  className={`text-xs px-2.5 py-1 rounded-full border transition ${
                    currentCategoryFilter === g.filter && currentPage === 'explore'
                      ? 'bg-yellow-500 text-gray-950 font-bold border-yellow-500'
                      : dark
                      ? 'bg-gray-800 text-gray-300 border-gray-700'
                      : 'bg-amber-50 text-gray-700 border-amber-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className={`flex flex-col px-4 py-2 text-sm font-raleway ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
            {navLinks.map((item, i) => (
              <a key={i} href={`#${item.page}`} onClick={() => { onNavigate(item.page, null, null, null); setIsOpen(false); }}
                className={`py-2 border-b transition hover:text-yellow-500 ${dark ? 'border-gray-800' : 'border-yellow-50'}`}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ============================================================
// SIDEBAR - Enhanced with official logo, sacred categories, active states
// ============================================================
function Sidebar({ onNavigate, currentCategoryFilter, currentPage }) {
  const { dark, toggleDark } = useDarkMode();
  const [showStates, setShowStates] = useState(false);
  const [showCategories, setShowCategories] = useState(true);

  const getUniqueStates = () => {
    const states = new Set();
    templesData.forEach(t => { if (t.location?.state) states.add(t.location.state.trim()); });
    return Array.from(states).sort();
  };
  const uniqueStates = getUniqueStates();

  const sacredGroups = [
    { icon: "🕉️", label: "12 Jyotirlingas", filter: "Jyotilinga" },
    { icon: "🌺", label: "18 Shakti Peethas", filter: "Maha Shakti Peetha" },
    { icon: "🌊", label: "5 Pancha Bhoota Stalams", filter: "Pancha Bhoota Stalams" },
    { icon: "🏛️", label: "Char Dham", filter: "Char Dham" },
    { icon: "🌸", label: "Pancharama Kshetrams", filter: "Pancharama Kshetrams" },
  ];

  const navLinks = [
    { icon: "🏠", label: "Home", page: "home" },
    { icon: "ℹ️", label: "About", page: "about" },
    { icon: "🛕", label: "Explore Temples", page: "explore" },
    { icon: "📋", label: "Categories", page: "categories" },
    { icon: "🎟️", label: "Darshanam Tickets", page: "tickets" },
    { icon: "🎉", label: "Temple Festivals", page: "festivals" },
    { icon: "📖", label: "History", page: "history" },
    { icon: "❤️", label: "My Favorites", page: "favorites" },
    { icon: "🗺️", label: "Map View", page: "mapview" },
    { icon: "📍", label: "Nearby Temples", page: "nearby" },
    { icon: "🧭", label: "Journey Planner", page: "planner" },
    { icon: "⚖️", label: "Compare Temples", page: "compare" },
    { icon: "📞", label: "Contact Us", page: "contact" },
  ];

  return (
    <aside className={`fixed top-0 left-0 h-screen w-64 z-50 shadow-2xl p-4 hidden md:flex flex-col transition-colors duration-300 ${dark ? 'bg-gray-900 border-r border-yellow-800/80' : 'bg-gradient-to-b from-amber-50 via-yellow-50 to-white border-r border-yellow-200'}`}>
      {/* Brand Header with Official Logo */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-yellow-500/20">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('home')}>
          <img src={TempleLogo} alt="TempleVerse Logo" className="w-10 h-10 object-contain rounded-full shadow-lg border-2 border-yellow-500/80 shrink-0" />
          <div className="min-w-0">
            <h2 className={`text-base font-extrabold tracking-widest leading-none ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>TEMPLEVERSE</h2>
            <p className={`text-[10px] tracking-wider uppercase font-semibold mt-1 ${dark ? 'text-yellow-500/70' : 'text-yellow-700'}`}>Sacred Shrines</p>
          </div>
        </div>
        <button onClick={toggleDark} title="Toggle dark mode" className={`text-base p-1.5 rounded-full transition shadow-sm ${dark ? 'bg-yellow-700 text-white hover:bg-yellow-600' : 'bg-yellow-200 text-gray-700 hover:bg-yellow-300'}`}>
          {dark ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Sacred Categories Group */}
      <div className="mb-3">
        <div className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between ${dark ? 'text-yellow-500' : 'text-yellow-800'}`}>
          <span>Sacred Groups</span>
          <button onClick={() => setShowCategories(!showCategories)} className="text-xs">{showCategories ? '▲' : '▼'}</button>
        </div>
        {showCategories && (
          <div className="space-y-0.5 mt-1">
            {sacredGroups.map((g, i) => {
              const active = currentPage === 'explore' && currentCategoryFilter === g.filter;
              return (
                <button
                  key={i}
                  onClick={() => onNavigate('explore', null, g.filter, null)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    active
                      ? dark
                        ? 'bg-yellow-500 text-gray-950 font-bold shadow-sm'
                        : 'bg-yellow-600 text-white font-bold shadow-sm'
                      : dark
                      ? 'text-gray-300 hover:bg-yellow-900/30 hover:text-yellow-300'
                      : 'text-gray-700 hover:bg-yellow-100 hover:text-yellow-800'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-sm">{g.icon}</span>
                    <span className="truncate">{g.label}</span>
                  </span>
                  <span className="text-[10px] text-yellow-500 font-bold ml-1">›</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Navigation Links */}
      <nav className={`flex-1 overflow-y-auto space-y-0.5 text-sm font-raleway pr-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
        <div className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
          Navigation
        </div>
        {navLinks.map((item, i) => {
          const active = currentPage === item.page && (item.page !== 'explore' || !currentCategoryFilter);
          return (
            <button key={i} onClick={() => onNavigate(item.page, null, null, null)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-150 ${
                active
                  ? dark
                    ? 'bg-yellow-500/20 text-yellow-400 font-bold border-l-4 border-yellow-500'
                    : 'bg-yellow-100 text-yellow-900 font-bold border-l-4 border-yellow-600'
                  : dark
                  ? 'hover:bg-yellow-800/30 hover:text-yellow-300'
                  : 'hover:bg-yellow-100/70 hover:text-yellow-700'
              }`}>
              <span className="text-base">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
        {/* Temples by State dropdown */}
        <div className="pt-1">
          <button onClick={() => setShowStates(!showStates)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${dark ? 'hover:bg-yellow-800/40 hover:text-yellow-300' : 'hover:bg-yellow-100 hover:text-yellow-700'}`}>
            <span className="flex items-center gap-3"><span className="text-base">🏛️</span><span className="text-xs font-medium">By State</span></span>
            <span className="text-xs">{showStates ? '▲' : '▼'}</span>
          </button>
          {showStates && (
            <div className={`ml-8 mt-1 space-y-0.5 max-h-44 overflow-y-auto text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              {uniqueStates.map((state, i) => (
                <button key={i} onClick={() => onNavigate('explore', null, null, state)}
                  className={`w-full text-left px-2 py-1.5 rounded-lg transition ${dark ? 'hover:bg-yellow-800/30 hover:text-yellow-300' : 'hover:bg-yellow-100 hover:text-yellow-700'}`}>
                  {state}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

// ============================================================
// BACK BUTTON
// ============================================================
function BackButton({ onBack }) {
  const { dark } = useDarkMode();
  return (
    <div className="text-left mb-6">
      <button onClick={onBack} className={`px-5 py-2 rounded-full shadow-md flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 ${dark ? 'bg-yellow-700 text-white hover:bg-yellow-600' : 'bg-yellow-600 text-white hover:bg-yellow-700'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back
      </button>
    </div>
  );
}

// ============================================================
// SEARCH BAR (desktop sidebar search)
// ============================================================
function SearchBar({ onSearch }) {
  const { dark } = useDarkMode();
  const [val, setVal] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); if (val.trim()) { onSearch(val.trim()); setVal(''); } };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 px-1">
      <input value={val} onChange={e=>setVal(e.target.value)} placeholder="Search temples..." className={`flex-1 border rounded-full px-3 py-2 text-sm ${dark ? 'bg-gray-800 border-yellow-700 text-white placeholder-gray-400' : 'border-yellow-300 text-gray-800 bg-white'}`} />
      <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium transition">Go</button>
    </form>
  );
}

// ============================================================
// STAR RATING COMPONENT
// ============================================================
function StarRating({ value, onChange, readOnly = false }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(star => (
        <button key={star} type="button"
          onClick={() => !readOnly && onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={`text-xl transition ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} ${star <= (hover || value) ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </button>
      ))}
    </div>
  );
}

// ============================================================
// TEMPLE CARD - Improved with favorites, rating display, animations
// ============================================================
function TempleCard({ temple, onSelect, showAudio, isPlaying, onPlayAudio, onPauseAudio }) {
  const { dark } = useDarkMode();
  const { favorites, toggleFavorite } = useFavorites();
  const { getAvgRating } = useReviews();
  const isFav = favorites.includes(temple.id);
  const avgRating = getAvgRating(temple.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl shadow-lg border overflow-hidden cursor-pointer flex flex-col transition-colors duration-300 ${dark ? 'bg-gray-800 border-yellow-800 hover:border-yellow-500' : 'bg-white/90 border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-200'}`}
      onClick={() => onSelect(temple.id)}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={temple.images[0]?.url || "https://placehold.co/400x250/FFD700/000?text=Temple"}
          alt={temple.images[0]?.alt || temple.name}
          className="w-full h-44 object-cover"
          onError={e => { e.target.onerror=null; e.target.src="https://placehold.co/400x250/eee/999?text=Image+Error"; }}
        />
        {/* Favorite button */}
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(temple.id); }}
          className={`absolute top-2 right-2 text-xl p-1.5 rounded-full shadow transition-all hover:scale-110 ${isFav ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400'}`}>
          {isFav ? '❤️' : '🤍'}
        </button>
        {/* State badge */}
        <div className="absolute bottom-2 left-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${dark ? 'bg-gray-900/80 text-yellow-300' : 'bg-white/80 text-yellow-700'}`}>
            📍 {temple.location?.city}, {temple.location?.state}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className={`text-base font-bold mb-1 line-clamp-1 ${dark ? 'text-yellow-300' : 'text-yellow-800'}`}>{temple.name}</h2>
        {/* Stars */}
        <div className="flex items-center gap-2 mb-2">
          <StarRating value={Math.round(avgRating)} readOnly />
          <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{avgRating > 0 ? avgRating.toFixed(1) : 'No ratings'}</span>
        </div>
        <p className={`text-xs mb-3 line-clamp-2 flex-1 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{temple.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {temple.category.slice(0,2).map((cat, i) => (
            <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${dark ? 'bg-yellow-900/60 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}`}>{cat}</span>
          ))}
        </div>
        {/* Audio controls */}
        {showAudio && temple.audio && (
          <div className="flex gap-2 mt-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => isPlaying ? onPauseAudio() : onPlayAudio(temple.id, temple.audio)}
              className="flex-1 text-xs py-1.5 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition">
              {isPlaying ? '⏸ Pause' : '▶ Play Bhajan'}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================
// HOME PAGE - Improved hero with particles, stats, featured temples
// ============================================================
function HomePage({ onSelectTemple, onNavigate, onOpenAssistant }) {
  const { dark } = useDarkMode();
  const featuredIds = ["tirumala-tirupati", "meenakshi-amman", "somnath", "mahakaleshwar", "ram-janmabhoomi", "brihadeeswarar"];
  const featured = templesData.filter(t => featuredIds.includes(t.id));
  const stats = [
    { num: templesData.length + "+", label: "Temples" },
    { num: "28+", label: "States" },
    { num: "12", label: "Jyotilingas" },
    { num: "18", label: "Shakti Peethas" },
  ];

  return (
    <>
      {/* HERO */}
      <section className={`relative z-10 text-center pt-4 md:pt-28 pb-12 overflow-hidden ${dark ? '' : ''}`}>
        {/* Animated background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[400, 600, 800].map((size, i) => (
            <motion.div key={i} animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.15, 0.08] }}
              transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.8 }}
              style={{ width: size, height: size }}
              className={`absolute rounded-full border-2 ${dark ? 'border-yellow-500' : 'border-yellow-400'}`} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex justify-center mb-4">
            <motion.img
              src={TempleLogo}
              alt="TempleVerse Official Logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-full shadow-[0_0_35px_rgba(234,179,8,0.45)] border-2 border-yellow-400/80"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-center items-center gap-4 mb-4">
            <motion.span className="text-lg sm:text-xl  md:text-7xl text-yellow-600 drop-shadow-[0_0_30px_gold]"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>ॐ</motion.span>
            <h1 className={`text-3xl md:text-6xl lg:text-7xl font-bold tracking-widest ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>TEMPLEVERSE</h1>
            <motion.span className="text-lg sm:text-xl  md:text-7xl text-yellow-600 drop-shadow-[0_0_30px_gold]"
              animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>ఓం</motion.span>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className={`text-lg md:text-2xl mb-6 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
            🛕 A Divine Journey Through India's Sacred Temples 🛕
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('explore')} className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold shadow-lg transition-all hover:scale-105">
              🗺️ Explore Temples
            </button>
            <button onClick={() => onNavigate('mapview')} className="px-6 py-3 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 rounded-full font-semibold transition-all hover:scale-105">
              🗺 Map View
            </button>
            <button onClick={() => onNavigate('nearby')} className={`px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 border-2 ${dark ? 'border-yellow-700 text-yellow-400 hover:bg-yellow-900/20' : 'border-yellow-400 text-yellow-700 hover:bg-yellow-50'}`}>
              📍 Nearby Temples
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="max-w-4xl mx-auto px-4 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 * i }}
              className={`rounded-2xl p-5 text-center shadow-md border transition-colors ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-white/80 border-yellow-200'}`}>
              <div className={`text-3xl font-bold ${dark ? 'text-yellow-400' : 'text-yellow-600'}`}>{s.num}</div>
              <div className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED TEMPLES */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className={`text-3xl font-bold mb-6 text-center ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>✨ Featured Temples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(temple => (
            <TempleCard key={temple.id} temple={temple} onSelect={onSelectTemple} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button onClick={() => onNavigate('explore')} className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold shadow-lg transition-all hover:scale-105">
            View All Temples →
          </button>
        </div>
      </section>

      {/* TEMPLEVERSE AI CONCIERGE ON HOME MAIN PAGE */}
      <HomeAIConcierge
        onSelectTemple={onSelectTemple}
        onOpenFullModal={onOpenAssistant}
        dark={dark}
      />


      {/* INFO CARDS */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {[
          { title: "What is a Temple?", icon: "🛕", text: "A temple is not just a building made of stone — it is a living energy center where the divine is invoked and made accessible to devotees. Temples are spiritual gateways between the physical and the cosmic realms." },
          { title: "History of Temples", icon: "📜", text: "The history of Indian temples dates back over two millennia, with references in Vedas, Puranas, and ancient scripts. Dynasties like the Guptas, Cholas, Pallavas, and Hoysalas built monumental temples with intricate carvings and gopurams." },
          { title: "Origin of Temples", icon: "🌿", text: "Temples originated from the desire of sages and kings to anchor divine energy on Earth. Sacred locations were chosen based on planetary alignments, natural energy fields, and cosmic resonance." },
          { title: "Establishment of Temples", icon: "⚡", text: "The process of establishing a temple is known as Pratishtha Vidhi. It starts with Bhoomi Pooja, followed by laying the foundation aligned with Vastu Purusha Mandala — the divine architectural blueprint." },
        ].map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}
            className={`p-6 rounded-2xl shadow-md border transition-colors ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-white/80 border-yellow-200 hover:shadow-yellow-200'}`}>
            <h2 className={`text-xl font-bold mb-3 flex items-center gap-2 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>{item.icon} {item.title}</h2>
            <p className={`text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{item.text}</p>
          </motion.div>
        ))}
      </section>
    </>
  );
}

// ============================================================
// SEARCH RESULTS PAGE
// ============================================================
function SearchResultsPage({ query, onSelectTemple, onBack }) {
  const { dark } = useDarkMode();
  const q = query.toLowerCase();
  const results = templesData.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.deity?.toLowerCase().includes(q) ||
    t.location?.city?.toLowerCase().includes(q) ||
    t.location?.state?.toLowerCase().includes(q) ||
    t.category?.some(c => c.toLowerCase().includes(q)) ||
    t.description?.toLowerCase().includes(q)
  );

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl font-bold mb-2 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>Search Results</h1>
        <p className={`mb-6 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Found {results.length} temples for "{query}"</p>
        {results.length === 0 ? (
          <div className={`text-center py-16 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-xl">No temples found for "{query}"</p>
            <p className="text-sm mt-2">Try searching by temple name, deity, state, or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(temple => <TempleCard key={temple.id} temple={temple} onSelect={onSelectTemple} />)}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// EXPLORE PAGE - with search & filter bar
// ============================================================
function ExploreTemplesPage({ onSelectTemple, categoryFilter, stateFilter, playAudio, pauseAudio, stopAudio, isPlaying, playingTempleId }) {
  const { dark } = useDarkMode();
  const [search, setSearch] = useState('');
  const [archFilter, setArchFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const tirupatiFamousTempleIds = ["tirupati","govindaraja","papavinasanam","aliveru-mangamma","kapilitheertham","vakalmatha","tiruchanur","akasaganga","japali-anjaneya-swamy-temple-tirumala"];
  const arunachalamLingamIds = ["arunachalam-indra-lingam","arunachalam-agni-lingam","arunachalam-yama-lingam","arunachalam-niruthi-lingam","arunachalam-varuna-lingam","arunachalam-vayu-lingam","arunachalam-kubera-lingam","arunachalam-ishanya-lingam"];
  const srikakulamTempleIds = ["arasavallitemple","srikurmam","srimukhalingam"];

  let filteredTemples = templesData;
  let pageTitle = "Explore Temples";

  if (categoryFilter === 'Jyotilinga') {
    filteredTemples = templesData.filter(t => t.category.some(c => c.toLowerCase().includes('jyotilinga')));
    pageTitle = "Explore 12 Jyotilingas";
  } else if (categoryFilter === 'Pancha Bhoota Stalams' || categoryFilter === 'pancha-bhoota') {
    filteredTemples = templesData.filter(t => t.category.some(c => c.toLowerCase().includes('pancha bhoota')));
    pageTitle = "5 Pancha Bhoota Stalams";
  } else if (categoryFilter === 'Maha Shakti Peetha' || categoryFilter === 'Shakti Peetha') {
    filteredTemples = templesData.filter(t => t.category.some(c => c.toLowerCase().includes('shakti peetha')));
    pageTitle = "18 Maha Shakti Peethas";
  } else if (categoryFilter === 'Char Dham') {
    filteredTemples = templesData.filter(t => t.category.includes('Char Dham'));
    pageTitle = "Sacred Char Dham Shrines";
  } else if (categoryFilter === 'Atma Linga') {
    filteredTemples = templesData.filter(t => t.category.includes('Atma Linga'));
    pageTitle = "Explore 5 Atma Lingas";
  } else if (categoryFilter === 'tirupati-famous') {
    filteredTemples = templesData.filter(t => tirupatiFamousTempleIds.includes(t.id));
    pageTitle = "Famous Temples in Tirupati";
  } else if (categoryFilter === 'arunachalam-lingam') {
    filteredTemples = templesData.filter(t => t.category.includes('Arunachalam Lingam'));
    pageTitle = "8 Arunachalam Lingams";
  } else if (categoryFilter === 'srikakulam-temples') {
    filteredTemples = templesData.filter(t => srikakulamTempleIds.includes(t.id));
    pageTitle = "Temples in Srikakulam";
  } else if (categoryFilter === 'Pancharama Kshetrams') {
    filteredTemples = templesData.filter(t => t.category.includes('Pancharama Kshetrams'));
    pageTitle = "Pancharama Kshetrams";
  } else if (categoryFilter === 'Ancient') {
    filteredTemples = templesData.filter(t => t.category.includes('Ancient') || t.category.includes('UNESCO World Heritage') || t.category.includes('UNESCO Tentative Site'));
    pageTitle = "Ancient & UNESCO Heritage Temples";
  } else if (stateFilter) {
    filteredTemples = templesData.filter(t => t.location?.state === stateFilter);
    pageTitle = `Temples in ${stateFilter}`;
  } else {
    filteredTemples = templesData;
    pageTitle = "Explore Temples";
  }

  // Apply search
  if (search) { const q = search.toLowerCase(); filteredTemples = filteredTemples.filter(t => t.name.toLowerCase().includes(q) || t.deity?.toLowerCase().includes(q) || t.location?.city?.toLowerCase().includes(q)); }
  // Apply arch filter
  if (archFilter) { filteredTemples = filteredTemples.filter(t => t.architecture_style?.toLowerCase().includes(archFilter.toLowerCase())); }
  // Sort
  if (sortBy === 'name') filteredTemples = [...filteredTemples].sort((a,b) => a.name.localeCompare(b.name));

  const archStyles = [...new Set(templesData.map(t => t.architecture_style).filter(Boolean))].sort();

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-center ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>{pageTitle}</h1>
        {/* Filter bar */}
        <div className={`flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-6 p-4 rounded-2xl border ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-white/80 border-yellow-200'}`}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search by name or deity..."
            className={`w-full sm:flex-1 min-w-0 border rounded-full px-4 py-2 text-sm ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-yellow-300 text-gray-800'}`} />
          <select value={archFilter} onChange={e=>setArchFilter(e.target.value)}
            className={`w-full sm:flex-auto flex-shrink-0 border rounded-full px-4 py-2 text-sm ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'border-yellow-300 text-gray-800 bg-white'}`}>
            <option value="">All Architecture</option>
            {archStyles.map((s,i) => <option key={i} value={s}>{s}</option>)}
          </select>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
            className={`border rounded-full px-4 py-2 text-sm ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'border-yellow-300 text-gray-800 bg-white'}`}>
            <option value="name">Sort: A-Z</option>
          </select>
          <span className={`text-sm px-3 py-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{filteredTemples.length} temples</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemples.map(temple => (
            <TempleCard key={temple.id} temple={temple} onSelect={onSelectTemple}
              showAudio={true} isPlaying={playingTempleId === temple.id && isPlaying}
              onPlayAudio={playAudio} onPauseAudio={pauseAudio} />
          ))}
        </div>
        {filteredTemples.length === 0 && (
          <div className={`text-center py-16 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-5xl mb-3">🔍</p><p>No temples match your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// FAVORITES PAGE
// ============================================================
function FavoritesPage({ onSelectTemple, onBack }) {
  const { dark } = useDarkMode();
  const { favorites } = useFavorites();
  const favTemples = templesData.filter(t => favorites.includes(t.id));

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl font-bold mb-2 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>❤️ My Favorites</h1>
        <p className={`mb-6 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{favTemples.length} saved temple{favTemples.length !== 1 ? 's' : ''}</p>
        {favTemples.length === 0 ? (
          <div className={`text-center py-20 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-6xl mb-4">🤍</p>
            <p className="text-xl font-medium mb-2">No favorites yet!</p>
            <p className="text-sm">Click the heart icon on any temple card to save it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favTemples.map(temple => <TempleCard key={temple.id} temple={temple} onSelect={onSelectTemple} />)}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// MAP VIEW PAGE - Interactive map using Leaflet CDN
// ============================================================
function MapViewPage({ onSelectTemple, onBack }) {
  const { dark } = useDarkMode();
  const [search, setSearch] = useState('');
  const mapRef = useRef(null);
  const leafletMap = useRef(null);

  const temples = search
    ? templesData.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.location?.state?.toLowerCase().includes(search.toLowerCase()))
    : templesData;

  const templesToShow = temples.filter(t => t.location?.coordinates?.latitude && t.location?.coordinates?.longitude);

  useEffect(() => {
    if (!mapRef.current) return;
    // Load Leaflet dynamically if not already loaded
    const initMap = () => {
      if (leafletMap.current) { leafletMap.current.remove(); leafletMap.current = null; }
      const L = window.L;
      if (!L) return;
      const map = L.map(mapRef.current, { center: [20.5937, 78.9629], zoom: 5 });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);

      const icon = L.divIcon({
        html: '<div style="font-size:20px;line-height:1">🛕</div>',
        className: '', iconSize: [24, 24], iconAnchor: [12, 24]
      });

      templesToShow.forEach(temple => {
        const { latitude, longitude } = temple.location.coordinates;
        const marker = L.marker([latitude, longitude], { icon }).addTo(map);
        marker.bindPopup(`<div style="min-width:180px"><b style="color:#b45309">${temple.name}</b><br><span style="font-size:11px;color:#666">${temple.location.city}, ${temple.location.state}</span><br><span style="font-size:11px">${temple.deity || ''}</span></div>`);
        marker.on('click', () => { marker.openPopup(); });
      });

      leafletMap.current = map;
    };

    if (window.L) { initMap(); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.onload = initMap;
    document.head.appendChild(script);

    return () => { if (leafletMap.current) { leafletMap.current.remove(); leafletMap.current = null; } };
  }, [templesToShow.length, search]);

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl font-bold mb-4 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>🗺️ Temple Map</h1>
        <p className={`mb-4 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Showing {templesToShow.length} temples on map. Click 🛕 to see details.</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Filter by name or state..."
          className={`w-full max-w-md border rounded-full px-4 py-2 text-sm mb-4 ${dark ? 'bg-gray-800 border-yellow-700 text-white placeholder-gray-400' : 'border-yellow-300 text-gray-800'}`} />
        <div ref={mapRef} className="w-full rounded-2xl overflow-hidden shadow-xl border" style={{ height: '500px', border: dark ? '1px solid #854d0e' : '1px solid #fde68a' }} />
        <p className={`mt-3 text-xs text-center ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Map data © OpenStreetMap contributors</p>
      </div>
    </section>
  );
}

// ============================================================
// NEARBY TEMPLES PAGE - uses browser geolocation
// ============================================================
function NearbyTemplesPage({ onSelectTemple, onBack }) {
  const { dark } = useDarkMode();
  const [userLoc, setUserLoc] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [radius, setRadius] = useState(500);

  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2-lat1) * Math.PI/180;
    const dLon = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const getLocation = () => {
    setLoading(true); setError('');
    navigator.geolocation.getCurrentPosition(
      pos => { setUserLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude }); setLoading(false); },
      err => { setError('Location access denied. Please allow location access in your browser.'); setLoading(false); }
    );
  };

  const nearby = userLoc
    ? templesData
        .filter(t => t.location?.coordinates?.latitude && t.location?.coordinates?.longitude)
        .map(t => ({ ...t, dist: haversine(userLoc.lat, userLoc.lon, t.location.coordinates.latitude, t.location.coordinates.longitude) }))
        .filter(t => t.dist <= radius)
        .sort((a,b) => a.dist - b.dist)
    : [];

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl font-bold mb-2 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>📍 Nearby Temples</h1>
        <p className={`mb-6 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Find temples close to your current location</p>

        <div className={`p-6 rounded-2xl border mb-6 ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-white/80 border-yellow-200'}`}>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={getLocation} disabled={loading}
              className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-medium transition-all hover:scale-105 disabled:opacity-50">
              {loading ? '⏳ Getting Location...' : '📍 Use My Location'}
            </button>
            <div className="flex items-center gap-2">
              <label className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>Radius:</label>
              <select value={radius} onChange={e=>setRadius(Number(e.target.value))}
                className={`border rounded-full px-3 py-1.5 text-sm ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'border-yellow-300 bg-white text-gray-800'}`}>
                <option value={100}>100 km</option>
                <option value={250}>250 km</option>
                <option value={500}>500 km</option>
                <option value={1000}>1000 km</option>
              </select>
            </div>
            {userLoc && <span className={`text-sm ${dark ? 'text-green-400' : 'text-green-600'}`}>✅ {nearby.length} temples found within {radius} km</span>}
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        {!userLoc && !error && (
          <div className={`text-center py-20 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
            <p className="text-6xl mb-4">📍</p>
            <p className="text-xl">Click "Use My Location" to find temples near you</p>
            <p className="text-sm mt-2">Your location is used only in your browser and not stored.</p>
          </div>
        )}

        {nearby.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearby.map(temple => (
              <div key={temple.id} className="relative">
                <TempleCard temple={temple} onSelect={onSelectTemple} />
                <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-medium ${dark ? 'bg-gray-900/80 text-green-300' : 'bg-white/90 text-green-700'}`}>
                  📏 {temple.dist.toFixed(0)} km away
                </div>
              </div>
            ))}
          </div>
        )}

        {userLoc && nearby.length === 0 && (
          <div className={`text-center py-16 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-5xl mb-3">🔍</p>
            <p>No temples found within {radius} km. Try increasing the radius.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// REVIEWS SECTION (used inside TempleDetailPage)
// ============================================================
function ReviewsSection({ templeId }) {
  const { dark } = useDarkMode();
  const { getReviews, addReview } = useReviews();
  const reviews = getReviews(templeId);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !rating || !comment) return;
    addReview(templeId, { name, rating, comment, date: new Date().toLocaleDateString('en-IN') });
    setName(''); setRating(0); setComment(''); setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="mt-8">
      <h3 className={`text-2xl font-bold mb-4 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>⭐ Reviews & Ratings</h3>

      {/* Write review */}
      <div className={`p-5 rounded-2xl border mb-6 ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-yellow-50 border-yellow-200'}`}>
        <h4 className={`font-semibold mb-3 ${dark ? 'text-gray-200' : 'text-gray-800'}`}>Write a Review</h4>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required
            className={`w-full border rounded-lg px-3 py-2 text-sm ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-yellow-300 bg-white'}`} />
          <div className="flex items-center gap-3">
            <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>Rating:</span>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Share your experience..." required rows={3}
            className={`w-full border rounded-lg px-3 py-2 text-sm ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-yellow-300 bg-white'}`} />
          <button type="submit" className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full text-sm font-medium transition">
            Submit Review
          </button>
          {submitted && <p className="text-green-600 text-sm">✅ Review submitted! Thank you.</p>}
        </form>
      </div>

      {/* Display reviews */}
      {reviews.length === 0 ? (
        <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className={`p-4 rounded-xl border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-yellow-100 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`font-semibold text-sm ${dark ? 'text-gray-200' : 'text-gray-800'}`}>{r.name}</span>
                <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{r.date}</span>
              </div>
              <StarRating value={r.rating} readOnly />
              <p className={`text-sm mt-2 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// TEMPLE DETAIL PAGE - Improved with virtual tour & reviews
// ============================================================
function TempleDetailPage({ templeId, onBack, onSelectTemple, onNavigate }) {
  const { dark } = useDarkMode();
  const { favorites, toggleFavorite } = useFavorites();
  const temple = templesData.find(t => t.id === templeId);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [showVirtual, setShowVirtual] = useState(false);
  const [copied, setCopied] = useState(false);
  const isFav = favorites.includes(templeId);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  useEffect(() => {
    if (temple?.audio) {
      if (playerRef.current) { playerRef.current.dispose(); }
      const player = new Tone.Player(temple.audio).toDestination();
      player.autostart = false;
      playerRef.current = player;
      setIsPlaying(false);
    }
    return () => { if (playerRef.current) { playerRef.current.dispose(); playerRef.current = null; } setIsPlaying(false); };
  }, [temple?.audio]);

  if (!temple) return (
    <section className="relative z-10 text-center pt-4 md:pt-28 pb-8">
      <h1 className="text-4xl text-red-700">Temple Not Found</h1>
      <button onClick={onBack} className="mt-8 px-6 py-3 bg-yellow-600 text-white rounded-full">Back</button>
    </section>
  );

  const playAudio = async () => {
    if (playerRef.current) { await Tone.start(); playerRef.current.start(); setIsPlaying(true); }
  };
  const pauseAudio = () => { if (playerRef.current) { playerRef.current.stop(); setIsPlaying(false); } };

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <BackButton onBack={onBack} />

        {/* Title + Favorite */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h1 className={`text-3xl md:text-5xl font-bold ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>{temple.name}</h1>
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            <button onClick={handleShare} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition hover:scale-105 ${dark ? 'border-yellow-700 text-yellow-400 hover:bg-yellow-900/30' : 'border-yellow-400 text-yellow-700 hover:bg-yellow-50'}`}>
              {copied ? '✅ Copied' : '🔗 Share'}
            </button>
            <button onClick={() => onNavigate && onNavigate('compare')} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition hover:scale-105 ${dark ? 'border-yellow-700 text-yellow-400 hover:bg-yellow-900/30' : 'border-yellow-400 text-yellow-700 hover:bg-yellow-50'}`}>
              ⚖️ Compare
            </button>
            <button onClick={() => toggleFavorite(templeId)} className={`text-3xl p-1 rounded-full transition-all hover:scale-110 ${isFav ? 'text-red-500' : dark ? 'text-gray-400' : 'text-gray-300'}`}>{isFav ? '❤️' : '🤍'}</button>
          </div>
        </div>

        {/* Location badge */}
        <p className={`mb-4 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>📍 {temple.location?.city}, {temple.location?.state}, {temple.location?.country}</p>

        {/* Audio */}
        {temple.audio && (
          <div className="flex gap-3 mb-6">
            <button onClick={() => isPlaying ? pauseAudio() : playAudio()}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}>
              {isPlaying ? '⏸ Pause Bhajan' : '▶ Play Bhajan'}
            </button>
          </div>
        )}

        {/* Image gallery */}
        {temple.images?.length > 0 && (
          <div className="mb-6">
            <motion.img
              key={activeImg}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              src={temple.images[activeImg]?.url}
              alt={temple.images[activeImg]?.alt}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
              onError={e => { e.target.onerror=null; e.target.src="https://placehold.co/800x400/eee/999?text=Image+Error"; }}
            />
            {temple.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {temple.images.map((img, i) => (
                  <img key={i} src={img.url} alt={img.alt} onClick={() => setActiveImg(i)}
                    className={`h-16 w-24 object-cover rounded-lg cursor-pointer border-2 transition ${i === activeImg ? 'border-yellow-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    onError={e => { e.target.onerror=null; e.target.src="https://placehold.co/96x64/eee/999?text=Err"; }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Virtual Tour button */}
        <div className="mb-6">
          <button onClick={() => setShowVirtual(!showVirtual)}
            className={`px-5 py-2 rounded-full text-sm font-medium border-2 transition hover:scale-105 ${dark ? 'border-yellow-600 text-yellow-400 hover:bg-yellow-900/20' : 'border-yellow-400 text-yellow-600 hover:bg-yellow-50'}`}>
            🔭 {showVirtual ? 'Hide' : 'Virtual Tour / 360° View'}
          </button>
          {showVirtual && (
            <div className={`mt-3 p-5 rounded-2xl border text-center ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-yellow-50 border-yellow-200'}`}>
              <p className="text-3xl mb-2">🔭</p>
              <p className={`text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Virtual Tour for {temple.name}</p>
              <p className={`text-xs mb-3 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>360° virtual tours require the official temple website or Google Street View.</p>
              {temple.website && (
                <a href={temple.website} target="_blank" rel="noopener noreferrer"
                  className="inline-block px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full text-sm font-medium transition">
                  🌐 Visit Official Website
                </a>
              )}
              <div className="mt-3">
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(temple.name + ' ' + (temple.location?.city||''))}`}
                  target="_blank" rel="noopener noreferrer"
                  className={`inline-block px-5 py-2 rounded-full text-sm font-medium border-2 transition ml-2 ${dark ? 'border-blue-500 text-blue-400' : 'border-blue-400 text-blue-600 hover:bg-blue-50'}`}>
                  🗺 Google Maps / Street View
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Info cards */}
        <div className={`p-6 rounded-2xl border mb-6 ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-white/80 border-yellow-200'}`}>
          <h2 className={`text-2xl font-bold mb-3 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>About {temple.name}</h2>
          <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{temple.description}</p>
          {temple.history_summary && <p className={`text-sm leading-relaxed mb-3 ${dark ? 'text-gray-300' : 'text-gray-700'}`}><strong>History:</strong> {temple.history_summary}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
            {[
              { label: "Deity", value: temple.deity },
              { label: "Architecture", value: temple.architecture_style },
              { label: "Visiting Hours", value: temple.visiting_hours },
              { label: "Entry Fee", value: temple.entry_fee },
              { label: "Famous For", value: temple.famous_for?.join(', ') },
              { label: "Rituals", value: temple.rituals_practices?.join(', ') },
            ].filter(i => i.value).map((item, i) => (
              <div key={i} className={`p-3 rounded-xl ${dark ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <span className={`font-semibold text-xs uppercase tracking-wide ${dark ? 'text-yellow-500' : 'text-yellow-600'}`}>{item.label}</span>
                <p className={`mt-0.5 ${dark ? 'text-gray-200' : 'text-gray-700'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interesting Facts */}
        {temple.interesting_facts?.length > 0 && (
          <div className={`p-5 rounded-2xl border mb-6 ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-amber-50 border-amber-200'}`}>
            <h3 className={`text-xl font-bold mb-3 ${dark ? 'text-yellow-400' : 'text-amber-700'}`}>💡 Interesting Facts</h3>
            <ul className="space-y-2">
              {temple.interesting_facts.map((f,i) => (
                <li key={i} className={`text-sm flex gap-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}><span className="text-yellow-500 shrink-0">•</span>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Prasads */}
        {temple.prasads?.length > 0 && (
          <div className={`p-5 rounded-2xl border mb-6 ${dark ? 'bg-gray-800 border-green-800' : 'bg-green-50 border-green-200'}`}>
            <h3 className={`text-xl font-bold mb-3 ${dark ? 'text-green-400' : 'text-green-700'}`}>🌸 Prasads Offered</h3>
            <div className="flex flex-wrap gap-2">{temple.prasads.map((p,i) => <span key={i} className={`text-sm px-3 py-1 rounded-full ${dark ? 'bg-green-900/40 text-green-300' : 'bg-green-100 text-green-700'}`}>{p}</span>)}</div>
          </div>
        )}

        {/* Darshan tickets */}
        {temple.darshan_tickets && (
          <div className={`p-5 rounded-2xl border mb-6 ${dark ? 'bg-gray-800 border-amber-800' : 'bg-amber-50 border-amber-200'}`}>
            <h3 className={`text-xl font-bold mb-3 ${dark ? 'text-amber-400' : 'text-amber-700'}`}>🎟 Darshanam & Tickets</h3>
            <p className={`text-sm mb-3 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{temple.darshan_tickets.booking_notes}</p>
            {temple.darshan_tickets.is_available_online && temple.darshan_tickets.booking_link && (
              <a href={temple.darshan_tickets.booking_link} target="_blank" rel="noopener noreferrer"
                className="inline-block px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full text-sm font-medium transition">
                Book Tickets Online
              </a>
            )}
            {temple.darshan_tickets.types_of_darshan?.length > 0 && (
              <div className="mt-3 space-y-1">{temple.darshan_tickets.types_of_darshan.map((d,i) => (
                <p key={i} className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>• {d.name} — <strong>{d.cost}</strong></p>
              ))}</div>
            )}
          </div>
        )}

        {/* Festivals */}
        {temple.festivals?.length > 0 && (
          <div className={`p-5 rounded-2xl border mb-6 ${dark ? 'bg-gray-800 border-purple-800' : 'bg-purple-50 border-purple-200'}`}>
            <h3 className={`text-xl font-bold mb-3 ${dark ? 'text-purple-400' : 'text-purple-700'}`}>🎉 Temple Festivals</h3>
            <div className="space-y-2">{temple.festivals.map((f,i) => (
              <div key={i} className={`p-3 rounded-xl ${dark ? 'bg-purple-900/20' : 'bg-white'}`}>
                <p className={`font-semibold text-sm ${dark ? 'text-purple-300' : 'text-purple-700'}`}>{f.name} <span className={`font-normal ${dark ? 'text-gray-400' : 'text-gray-500'}`}>({f.date_or_period})</span></p>
                <p className={`text-xs mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{f.description}</p>
              </div>
            ))}</div>
          </div>
        )}

        {/* Website */}
        {temple.website && temple.website !== "N/A" && (
          <div className="mb-6">
            <a href={temple.website} target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-medium border-2 px-5 py-2 rounded-full transition ${dark ? 'border-blue-600 text-blue-400 hover:bg-blue-900/20' : 'border-blue-400 text-blue-600 hover:bg-blue-50'}`}>
              🌐 Official Website
            </a>
          </div>
        )}

        {/* Related Temples */}
        {(() => {
          const related = templesData
            .filter(t => t.id !== templeId && (t.location?.state === temple.location?.state || t.category?.some(c => temple.category?.includes(c))))
            .slice(0, 3);
          if (!related.length) return null;
          return (
            <div className={`p-5 rounded-2xl border mb-6 ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-amber-50/70 border-amber-200'}`}>
              <h3 className={`text-xl font-bold mb-3 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>🛕 Related Sacred Temples</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {related.map(rel => (
                  <div key={rel.id} onClick={() => onSelectTemple && onSelectTemple(rel.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition hover:scale-[1.02] shadow-sm ${dark ? 'bg-gray-900 border-gray-700 hover:border-yellow-500' : 'bg-white border-yellow-200 hover:border-yellow-400'}`}>
                    <img src={rel.images?.[0]?.url || "https://placehold.co/300x150"} alt={rel.name} className="w-full h-24 object-cover rounded-lg mb-2" onError={e=>{e.target.onerror=null; e.target.src="https://placehold.co/300x150?text=Temple";}} />
                    <h4 className={`text-xs font-bold line-clamp-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{rel.name}</h4>
                    <p className={`text-[10px] mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>📍 {rel.location?.city}, {rel.location?.state}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Reviews */}
        <ReviewsSection templeId={templeId} />
      </div>
    </section>
  );
}

// ============================================================
// ABOUT PAGE
// ============================================================
function AboutPage({ onBack }) {
  const { dark } = useDarkMode();
  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl md:text-5xl font-bold mb-8 text-center ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>About Templeverse</h1>
        {[
          "Welcome to Templeverse, your digital gateway to the divine architectural wonders and spiritual heritage of India. Our mission is to bring the sacred essence of India's temples closer to you, offering an immersive and enriching experience from anywhere in the world.",
          "At Templeverse, we believe that temples are more than just structures; they are living energy centers, repositories of ancient wisdom, and vibrant hubs of culture and devotion. Through stunning visuals, detailed historical insights, and engaging narratives, we illuminate the profound significance of each temple.",
          "Our platform is designed to be a comprehensive resource for devotees, history enthusiasts, and curious minds alike. Explore the intricate carvings of ancient shrines, learn about the legends that breathe life into these sacred spaces, and discover the spiritual journeys that have unfolded within their walls for centuries.",
          "Join us on this divine journey as we uncover the timeless beauty and spiritual power of India's temples. Whether you're planning a pilgrimage, seeking knowledge, or simply wish to connect with the divine, Templeverse is here to guide your way."
        ].map((text, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1*i }}
            className={`text-sm md:text-base leading-relaxed mb-4 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{text}</motion.p>
        ))}
      </div>
    </section>
  );
}



// ============================================================
// TICKETS PAGE
// ============================================================
function TicketsPage({ onBack }) {
  const { dark } = useDarkMode();
  const [selectedTempleId, setSelectedTempleId] = useState('');
  const [selectedTemple, setSelectedTemple] = useState(null);
  const templesWithTickets = templesData.filter(t => t.darshan_tickets?.is_available_online);

  useEffect(() => {
    if (templesWithTickets.length > 0 && !selectedTempleId) { setSelectedTempleId(templesWithTickets[0].id); setSelectedTemple(templesWithTickets[0]); }
    else if (selectedTempleId) { setSelectedTemple(templesData.find(t => t.id === selectedTempleId)); }
  }, [selectedTempleId]);

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl font-bold mb-8 text-center ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>🎟 Darshanam Tickets</h1>
        <div className={`rounded-2xl border p-6 ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-white/80 border-yellow-200'}`}>
          <select value={selectedTempleId} onChange={e => setSelectedTempleId(e.target.value)}
            className={`w-full p-3 border rounded-xl text-sm mb-6 ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'border-yellow-300 bg-white'}`}>
            {templesWithTickets.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          {selectedTemple && (
            <div className={`p-5 rounded-xl border ${dark ? 'bg-gray-700 border-gray-600' : 'bg-amber-50 border-amber-200'}`}>
              <h2 className={`text-xl font-bold mb-2 ${dark ? 'text-yellow-400' : 'text-amber-700'}`}>{selectedTemple.name}</h2>
              <p className={`text-sm mb-4 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{selectedTemple.darshan_tickets?.booking_notes}</p>
              {selectedTemple.darshan_tickets?.booking_link && (
                <a href={selectedTemple.darshan_tickets.booking_link} target="_blank" rel="noopener noreferrer"
                  className="inline-block px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full text-sm font-medium transition mb-4">
                  Book Online →
                </a>
              )}
              {selectedTemple.darshan_tickets?.types_of_darshan?.length > 0 && (
                <div className="space-y-2">
                  {selectedTemple.darshan_tickets.types_of_darshan.map((d,i) => (
                    <div key={i} className={`flex justify-between p-2 rounded-lg ${dark ? 'bg-gray-600' : 'bg-white'}`}>
                      <span className={`text-sm ${dark ? 'text-gray-200' : 'text-gray-700'}`}>{d.name}</span>
                      <span className={`text-sm font-bold ${dark ? 'text-yellow-400' : 'text-yellow-600'}`}>{d.cost}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FESTIVALS PAGE
// ============================================================
function FestivalsPage({ onBack }) {
  const { dark } = useDarkMode();
  const [selectedTempleId, setSelectedTempleId] = useState('');
  const [selectedTemple, setSelectedTemple] = useState(null);
  const templesWithFestivals = templesData.filter(t => t.festivals?.length > 0);

  useEffect(() => {
    if (templesWithFestivals.length > 0 && !selectedTempleId) { setSelectedTempleId(templesWithFestivals[0].id); setSelectedTemple(templesWithFestivals[0]); }
    else if (selectedTempleId) { setSelectedTemple(templesData.find(t => t.id === selectedTempleId)); }
  }, [selectedTempleId]);

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl font-bold mb-8 text-center ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>🎉 Temple Festivals</h1>
        <div className={`rounded-2xl border p-6 ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-white/80 border-yellow-200'}`}>
          <select value={selectedTempleId} onChange={e => setSelectedTempleId(e.target.value)}
            className={`w-full p-3 border rounded-xl text-sm mb-6 ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'border-yellow-300 bg-white'}`}>
            {templesWithFestivals.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          {selectedTemple?.festivals?.length > 0 && (
            <div className="space-y-3">
              {selectedTemple.festivals.map((f,i) => (
                <div key={i} className={`p-4 rounded-xl border ${dark ? 'bg-gray-700 border-gray-600' : 'bg-purple-50 border-purple-100'}`}>
                  <p className={`font-semibold ${dark ? 'text-purple-300' : 'text-purple-700'}`}>{f.name}</p>
                  <p className={`text-xs mt-0.5 mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>📅 {f.date_or_period}</p>
                  <p className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{f.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HISTORY PAGE
// ============================================================
function HistoryPage({ onBack }) {
  const { dark } = useDarkMode();
  const [selectedTempleId, setSelectedTempleId] = useState('');
  const selectedTemple = templesData.find(t => t.id === selectedTempleId);

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl font-bold mb-6 text-center ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>📖 History of Temples</h1>
        <p className={`text-sm leading-relaxed mb-6 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
          Indian temples are a testament to the rich spiritual and architectural legacy of the subcontinent. They have evolved from simple rock-cut caves to monumental structures, each reflecting the artistic and religious fervor of its era.
        </p>
        <div className={`rounded-2xl border p-6 ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-white/80 border-yellow-200'}`}>
          <h2 className={`text-xl font-bold mb-4 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>Explore Temple History</h2>
          <select value={selectedTempleId} onChange={e => setSelectedTempleId(e.target.value)}
            className={`w-full p-3 border rounded-xl text-sm mb-5 ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'border-yellow-300 bg-white'}`}>
            <option value="">Select a Temple...</option>
            {templesData.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          {selectedTemple ? (
            <div className={`p-5 rounded-xl border ${dark ? 'bg-gray-700 border-gray-600' : 'bg-amber-50 border-amber-200'}`}>
              <h3 className={`text-xl font-bold mb-2 ${dark ? 'text-amber-400' : 'text-amber-700'}`}>{selectedTemple.name}</h3>
              <p className={`text-sm leading-relaxed mb-3 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{selectedTemple.history_summary}</p>
              {selectedTemple.interesting_facts?.length > 0 && (
                <div><p className={`font-semibold text-sm mb-1 ${dark ? 'text-yellow-400' : 'text-yellow-600'}`}>Interesting Facts:</p>
                  <ul className="space-y-1">{selectedTemple.interesting_facts.map((f,i) => <li key={i} className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>• {f}</li>)}</ul>
                </div>
              )}
            </div>
          ) : (
            <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Select a temple above to explore its history.</p>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================
function ContactPage({ onBack }) {
  const { dark } = useDarkMode();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-2xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl font-bold mb-6 text-center ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>📞 Contact Us</h1>
        <div className={`rounded-2xl border p-6 ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-white/80 border-yellow-200'}`}>
          {submitted ? (
            <div className="text-center py-10">
              <p className="text-5xl mb-3">🙏</p>
              <p className={`text-xl font-bold ${dark ? 'text-green-400' : 'text-green-600'}`}>Thank you for your message!</p>
              <p className={`text-sm mt-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {['name','email','subject'].map(field => (
                <div key={field}>
                  <label className={`text-sm font-medium mb-1 block capitalize ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{field}</label>
                  <input type={field === 'email' ? 'email' : 'text'} required value={formData[field]}
                    onChange={e => setFormData({...formData, [field]: e.target.value})}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-yellow-300 bg-white text-gray-800'}`} />
                </div>
              ))}
              <div>
                <label className={`text-sm font-medium mb-1 block ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-yellow-300 bg-white text-gray-800'}`} />
              </div>
              <button type="submit" className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold transition">Send Message 🙏</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// STATEWISE PAGE
// ============================================================
function StatewiseTemplesPage({ onSelectState, onBack }) {
  const { dark } = useDarkMode();
  const stateMap = {};
  templesData.forEach(t => {
    const s = t.location?.state;
    if (s) { if (!stateMap[s]) stateMap[s] = 0; stateMap[s]++; }
  });
  const states = Object.entries(stateMap).sort((a,b) => a[0].localeCompare(b[0]));

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-8">
      <div className="max-w-5xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl font-bold mb-8 text-center ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>🏛️ Temples by State</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {states.map(([stateName, count], i) => (
            <motion.div key={i} whileHover={{ scale: 1.03, y: -3 }} transition={{ duration: 0.2 }}
              onClick={() => onSelectState(stateName)}
              className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between shadow-sm ${dark ? 'bg-gray-800 border-yellow-800 hover:border-yellow-500' : 'bg-white/80 border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-100'}`}>
              <div>
                <h2 className={`font-bold ${dark ? 'text-white' : 'text-gray-800'}`}>{stateName}</h2>
                <p className={`text-xs mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{count} temple{count !== 1 ? 's' : ''}</p>
              </div>
              <span className={`text-2xl font-bold ${dark ? 'text-yellow-500' : 'text-yellow-400'}`}>›</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('tv-dark') === 'true');
  const toggleDark = () => setDark(d => { localStorage.setItem('tv-dark', !d); return !d; });
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tv-favorites') || '[]'); } catch { return []; }
  });
  const toggleFavorite = (id) => setFavorites(prev => {
    const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
    localStorage.setItem('tv-favorites', JSON.stringify(next));
    return next;
  });

  const [reviews, setReviews] = useState({});
  const addReview = (templeId, review) => setReviews(prev => ({ ...prev, [templeId]: [...(prev[templeId] || []), review] }));
  const getReviews = (templeId) => reviews[templeId] || [];
  const getAvgRating = (templeId) => {
    const r = reviews[templeId] || [];
    if (!r.length) return 0;
    return r.reduce((sum, rv) => sum + rv.rating, 0) / r.length;
  };

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTempleId, setSelectedTempleId] = useState(null);
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState(null);
  const [selectedStateFilter, setSelectedStateFilter] = useState(null);
  const [previousPageInfo, setPreviousPageInfo] = useState({ page: 'home', categoryFilter: null, stateFilter: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingTempleId, setPlayingTempleId] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => { return () => { audioRef.current.pause(); audioRef.current.src = ''; }; }, []);

  const playAudio = (templeId, audioUrl) => {
    if (audioRef.current.src !== audioUrl) { audioRef.current.pause(); audioRef.current.src = audioUrl; setCurrentAudio(audioUrl); setPlayingTempleId(templeId); }
    audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
  };
  const pauseAudio = () => { audioRef.current.pause(); setIsPlaying(false); setPlayingTempleId(null); };
  const stopAudio = () => { audioRef.current.pause(); audioRef.current.currentTime = 0; setIsPlaying(false); setPlayingTempleId(null); setCurrentAudio(null); };

  const handleNavigate = (page, templeId=null, categoryFilter=null, stateFilter=null) => {
    setPreviousPageInfo({ page: currentPage, categoryFilter: currentCategoryFilter, stateFilter: selectedStateFilter });
    setCurrentPage(page); setSelectedTempleId(templeId); setCurrentCategoryFilter(categoryFilter); setSelectedStateFilter(stateFilter);
    stopAudio();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query) => { setSearchQuery(query); handleNavigate('search'); };
  const handleBack = () => { setCurrentPage(previousPageInfo.page); setSelectedTempleId(null); setCurrentCategoryFilter(previousPageInfo.categoryFilter); setSelectedStateFilter(previousPageInfo.stateFilter); stopAudio(); };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onSelectTemple={id => handleNavigate('templeDetail', id)} onNavigate={handleNavigate} onOpenAssistant={() => setIsAssistantOpen(true)} />;
      case 'about': return <AboutPage onBack={handleBack} />;
      case 'explore': return <ExploreTemplesPage onSelectTemple={id => handleNavigate('templeDetail', id)} categoryFilter={currentCategoryFilter} stateFilter={selectedStateFilter} playAudio={playAudio} pauseAudio={pauseAudio} stopAudio={stopAudio} isPlaying={isPlaying} playingTempleId={playingTempleId} />;
      case 'categories': return <CategoriesPage onNavigateToExplore={filter => handleNavigate('explore', null, filter, null)} onBack={handleBack} dark={dark} />;
      case 'tickets': return <TicketsPage onBack={handleBack} />;
      case 'festivals': return <FestivalsPage onBack={handleBack} />;
      case 'history': return <HistoryPage onBack={handleBack} />;
      case 'contact': return <ContactPage onBack={handleBack} />;
      case 'statewise': return <StatewiseTemplesPage onSelectState={state => handleNavigate('explore', null, null, state)} onBack={handleBack} />;
      case 'templeDetail': return <TempleDetailPage templeId={selectedTempleId} onBack={handleBack} onSelectTemple={id => handleNavigate('templeDetail', id)} onNavigate={handleNavigate} />;
      case 'favorites': return <FavoritesPage onSelectTemple={id => handleNavigate('templeDetail', id)} onBack={handleBack} />;
      case 'mapview': return <MapViewPage onSelectTemple={id => handleNavigate('templeDetail', id)} onBack={handleBack} />;
      case 'nearby': return <NearbyTemplesPage onSelectTemple={id => handleNavigate('templeDetail', id)} onBack={handleBack} />;
      case 'planner': return <JourneyPlannerPage onSelectTemple={id => handleNavigate('templeDetail', id)} onBack={handleBack} dark={dark} />;
      case 'compare': return <CompareTemplesPage onSelectTemple={id => handleNavigate('templeDetail', id)} onBack={handleBack} dark={dark} />;
      case 'search': return <SearchResultsPage query={searchQuery} onSelectTemple={id => handleNavigate('templeDetail', id)} onBack={handleBack} />;
      default: return <HomePage onSelectTemple={id => handleNavigate('templeDetail', id)} onNavigate={handleNavigate} onOpenAssistant={() => setIsAssistantOpen(true)} />;
    }
  };

  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>
      <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
        <ReviewsContext.Provider value={{ addReview, getReviews, getAvgRating }}>
          <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-gray-950 text-white' : 'bg-gradient-to-b from-amber-50 via-yellow-50 to-white text-gray-800'}`}>
            <TopNavbar
              onNavigate={handleNavigate}
              onSearch={handleSearch}
              onOpenAssistant={() => setIsAssistantOpen(true)}
              currentCategoryFilter={currentCategoryFilter}
              currentPage={currentPage}
            />
            <Sidebar
              onNavigate={handleNavigate}
              onOpenAssistant={() => setIsAssistantOpen(true)}
              currentCategoryFilter={currentCategoryFilter}
              currentPage={currentPage}
            />
            <div className="md:ml-64 pt-14 md:pt-0">
              {/* Sticky Desktop Header with Search & Sacred Categories Bar */}
              <div className={`sticky top-0 z-40 border-b transition-colors ${dark ? 'bg-gray-950/95 border-yellow-900/60' : 'bg-amber-50/95 border-yellow-200/80'} backdrop-blur-md`}>
                <div className="hidden md:block px-6 pt-3 pb-1">
                  <SearchBar onSearch={handleSearch} />
                </div>
                <TopCategoryBar
                  currentCategoryFilter={currentCategoryFilter}
                  currentPage={currentPage}
                  onNavigate={handleNavigate}
                  onOpenAssistant={() => setIsAssistantOpen(true)}
                  dark={dark}
                />
              </div>

              <main className="px-0 w-full overflow-x-hidden">
                {renderPage()}
              </main>
            </div>

            {/* Floating TempleVerse AI Assistant Trigger */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              title="TempleVerse AI Assistant"
              className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-600 text-white rounded-full font-bold shadow-2xl flex items-center gap-2 transition-all hover:scale-105 border-2 border-yellow-200/90 group"
            >
              <span className="text-xl animate-pulse">✨</span>
              <span className="text-sm tracking-wide">TempleVerse AI</span>
            </button>

            {/* AI Assistant Modal */}
            <TempleVerseAIAssistant
              isOpen={isAssistantOpen}
              onClose={() => setIsAssistantOpen(false)}
              onSelectTemple={(id) => handleNavigate('templeDetail', id)}
              dark={dark}
            />
          </div>
        </ReviewsContext.Provider>
      </FavoritesContext.Provider>
    </DarkModeContext.Provider>
  );
}

export default App;
