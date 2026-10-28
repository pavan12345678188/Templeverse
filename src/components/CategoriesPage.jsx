import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoriesData, templesData } from '../data/templesData.js';

export default function CategoriesPage({ onNavigateToExplore, onBack, dark }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = categoriesData.filter((cat) => {
    const q = search.toLowerCase();
    return (
      cat.name?.toLowerCase().includes(q) ||
      cat.title?.toLowerCase().includes(q) ||
      cat.deity?.toLowerCase().includes(q) ||
      cat.element?.toLowerCase().includes(q) ||
      cat.short_description?.toLowerCase().includes(q)
    );
  });

  const getTempleCountForCategory = (slug) => {
    if (!slug) return 0;
    return templesData.filter((t) => t.category?.includes(slug)).length;
  };

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back navigation */}
        {onBack && (
          <button
            onClick={onBack}
            className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition border cursor-pointer ${
              dark
                ? 'bg-gray-800 text-yellow-400 border-gray-700 hover:bg-gray-700'
                : 'bg-white text-yellow-800 border-amber-200 hover:bg-amber-50 shadow-sm'
            }`}
          >
            ← Back to Home
          </button>
        )}

        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-2xl text-amber-500">🕉️</span>
            <span className={`text-xs uppercase tracking-widest font-extrabold ${dark ? 'text-amber-400' : 'text-amber-800'}`}>
              Divine Classifications of Bharat
            </span>
            <span className="text-2xl text-amber-500">🕉️</span>
          </div>
          <h1 className={`text-3xl md:text-5xl font-extrabold tracking-wide mb-3 ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>
            Sacred Temple Categories
          </h1>
          <p className={`max-w-2xl mx-auto text-sm md:text-base ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore India's sacred temple groupings defined by cosmic alignments, scriptural puranas, consecrated elements, and revered traditions.
          </p>

          {/* Search bar for categories */}
          <div className="max-w-md mx-auto mt-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by deity, element (e.g. Fire, Water), or name..."
              className={`w-full px-4 py-2.5 rounded-2xl text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500 transition shadow-inner ${
                dark
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-amber-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((cat, i) => {
            const actualCount = getTempleCountForCategory(cat.slug) || cat.total_temples;
            return (
              <motion.div
                key={cat.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className={`p-6 rounded-3xl border shadow-lg flex flex-col justify-between transition-all hover:shadow-2xl ${
                  dark
                    ? 'bg-gradient-to-br from-gray-900 via-gray-900/90 to-amber-950/20 border-yellow-800/60 hover:border-yellow-500/80'
                    : 'bg-gradient-to-br from-white via-amber-50/40 to-yellow-50/60 border-amber-200/90 hover:border-amber-400'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                        {cat.icon || '🛕'}
                      </span>
                      <div>
                        <h2 className={`text-xl font-bold tracking-tight leading-tight ${dark ? 'text-yellow-400' : 'text-yellow-900'}`}>
                          {cat.name}
                        </h2>
                        <p className={`text-xs font-semibold mt-0.5 ${dark ? 'text-amber-300/80' : 'text-amber-700'}`}>
                          {cat.title}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold uppercase shrink-0 ${
                      dark ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                    }`}>
                      {actualCount} Temples
                    </span>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {cat.deity && (
                      <span className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium ${
                        dark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-700 border-amber-200'
                      }`}>
                        🔱 <span className="font-semibold">Deity:</span> {cat.deity}
                      </span>
                    )}
                    {cat.element && (
                      <span className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium ${
                        dark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-700 border-amber-200'
                      }`}>
                        ⚡ <span className="font-semibold">Element:</span> {cat.element}
                      </span>
                    )}
                    {cat.scriptural_origin && (
                      <span className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium ${
                        dark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-700 border-amber-200'
                      }`}>
                        📜 <span className="font-semibold">Origin:</span> {cat.scriptural_origin}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {cat.short_description || cat.description}
                  </p>

                  {/* Prominent Rituals List */}
                  {cat.prominent_rituals && cat.prominent_rituals.length > 0 && (
                    <div className={`p-3.5 rounded-2xl border mb-4 ${
                      dark ? 'bg-gray-950/60 border-amber-900/40' : 'bg-amber-50/80 border-amber-200/80'
                    }`}>
                      <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                        dark ? 'text-amber-400' : 'text-amber-800'
                      }`}>
                        <span>🪔</span> Prominent Sacred Rituals:
                      </p>
                      <ul className="space-y-1.5">
                        {cat.prominent_rituals.slice(0, 3).map((ritual, rIdx) => (
                          <li key={rIdx} className={`text-xs flex items-start gap-1.5 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span className="text-amber-500 font-bold mt-0.5">•</span>
                            <span className="leading-snug">{ritual}</span>
                          </li>
                        ))}
                      </ul>
                      {cat.prominent_rituals.length > 3 && (
                        <button
                          onClick={() => setSelectedCategory(cat)}
                          className={`mt-2 text-[11px] font-semibold underline cursor-pointer ${
                            dark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'
                          }`}
                        >
                          + {cat.prominent_rituals.length - 3} more sacred rituals...
                        </button>
                      )}
                    </div>
                  )}

                  {/* Key Locations */}
                  {cat.key_locations && cat.key_locations.length > 0 && (
                    <div className="mb-4">
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Prominent Sanctums:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.key_locations.slice(0, 4).map((loc, lIdx) => (
                          <span
                            key={lIdx}
                            className={`text-[10px] px-2 py-0.5 rounded-md border ${
                              dark ? 'bg-gray-800/70 border-gray-700 text-gray-300' : 'bg-white border-amber-200 text-gray-700'
                            }`}
                          >
                            📍 {loc}
                          </span>
                        ))}
                        {cat.key_locations.length > 4 && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-md ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                            +{cat.key_locations.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-amber-500/20">
                  <button
                    onClick={() => onNavigateToExplore(cat.slug)}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore All {cat.name}</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      dark
                        ? 'bg-gray-800 text-amber-300 border-gray-700 hover:bg-gray-700'
                        : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
                    }`}
                    title="View full theological details and all rituals"
                  >
                    Details ℹ️
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedCategory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 border shadow-2xl ${
                  dark ? 'bg-gray-900 border-yellow-700 text-white' : 'bg-white border-amber-200 text-gray-900'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-amber-500/20">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedCategory.icon || '🛕'}</span>
                    <div>
                      <h3 className={`text-2xl font-extrabold ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>
                        {selectedCategory.name}
                      </h3>
                      <p className={`text-xs font-semibold ${dark ? 'text-amber-300' : 'text-amber-700'}`}>
                        {selectedCategory.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="p-1 text-2xl text-gray-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-sm">
                  {/* Detailed Description */}
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${dark ? 'text-amber-400' : 'text-amber-800'}`}>
                      Sthala Mahatmyam & Theological Background
                    </h4>
                    <p className={`text-xs leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {selectedCategory.description}
                    </p>
                  </div>

                  {/* Spiritual Significance */}
                  {selectedCategory.spiritual_significance && (
                    <div className={`p-4 rounded-2xl border ${dark ? 'bg-amber-950/30 border-amber-800/40' : 'bg-amber-50 border-amber-200'}`}>
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${dark ? 'text-amber-400' : 'text-amber-800'}`}>
                        Spiritual Significance & Fruits of Pilgrimage (Phalashruti)
                      </h4>
                      <p className={`text-xs leading-relaxed italic ${dark ? 'text-amber-200' : 'text-amber-900'}`}>
                        "{selectedCategory.spiritual_significance}"
                      </p>
                    </div>
                  )}

                  {/* All Prominent Rituals */}
                  {selectedCategory.prominent_rituals && (
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${dark ? 'text-amber-400' : 'text-amber-800'}`}>
                        Consecrated Rituals & Sevas Performed
                      </h4>
                      <div className="space-y-2">
                        {selectedCategory.prominent_rituals.map((r, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border flex items-start gap-2 text-xs ${
                              dark ? 'bg-gray-800/70 border-gray-700' : 'bg-amber-50/50 border-amber-100'
                            }`}
                          >
                            <span className="text-amber-500 font-bold mt-0.5">🪔</span>
                            <span className="leading-relaxed">{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Complete Key Locations */}
                  {selectedCategory.key_locations && (
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${dark ? 'text-amber-400' : 'text-amber-800'}`}>
                        Key Pilgrimage Shrines Included
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedCategory.key_locations.map((loc, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 ${
                              dark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-amber-200 text-gray-800'
                            }`}
                          >
                            <span>📍</span>
                            <span className="font-medium truncate">{loc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-amber-500/20 flex gap-3">
                    <button
                      onClick={() => {
                        const slug = selectedCategory.slug;
                        setSelectedCategory(null);
                        onNavigateToExplore(slug);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
                    >
                      View Temples in {selectedCategory.name} →
                    </button>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-5 py-3 rounded-xl text-xs font-semibold border cursor-pointer ${
                        dark ? 'border-gray-700 hover:bg-gray-800' : 'border-amber-200 hover:bg-amber-50'
                      }`}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
