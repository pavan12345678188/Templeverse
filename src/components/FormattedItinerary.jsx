import React from 'react';

// Helper to strip markdown bold syntax and return clean text with <strong> elements
export function renderRichInline(text, dark) {
  if (!text) return null;
  // Split on **bold** patterns
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <strong
          key={index}
          className={`font-bold ${dark ? 'text-amber-300' : 'text-amber-900'}`}
        >
          {inner}
        </strong>
      );
    }
    return part;
  });
}

export default function FormattedItinerary({ content, dark }) {
  if (!content) return null;

  // Let's parse the itinerary into structured sections
  const lines = content.split('\n');
  let title = '';
  let metaInfo = [];
  const days = [];
  let currentDay = null;
  let guidelines = [];
  let inGuidelines = false;
  let otherLines = [];

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Check for Main Header e.g. "### 🕉️ 3-Day Divine Pilgrimage Itinerary"
    if (line.startsWith('#') && (line.includes('Itinerary') || line.includes('Pilgrimage') || line.includes('Journey') || !title)) {
      title = line.replace(/^#+\s*/, '').replace(/\*+/g, '').trim();
      continue;
    }

    // Check for Meta items like "**Starting Point:** Hyderabad" or "**Destination Circuit:** ..."
    if (line.match(/^\*{0,2}(Starting Point|Destination Focus|Destination Circuit|Duration|Circuit):/i)) {
      const cleaned = line.replace(/\*+/g, '');
      const [label, ...valParts] = cleaned.split(':');
      metaInfo.push({ label: label.trim(), value: valParts.join(':').trim() });
      continue;
    }

    // Check for Day header e.g. "#### Day 1: Arrival & Prime Sanctum Darshan" or "Day 1 - ..."
    const dayMatch = line.match(/^(?:#+\s*)?(Day\s*\d+[^:]*):?\s*(.*)/i);
    if (dayMatch && !inGuidelines) {
      if (currentDay) {
        days.push(currentDay);
      }
      currentDay = {
        dayLabel: dayMatch[1].replace(/\*+/g, '').trim(),
        dayTitle: dayMatch[2].replace(/\*+/g, '').trim(),
        items: [],
      };
      continue;
    }

    // Check for Guidelines header e.g. "#### Essential Devotee Guidelines" or "Practical Pilgrimage Tips"
    if (line.match(/^(?:#+\s*)?(?:Essential Devotee Guidelines|Practical Pilgrimage Tips|Devotee Guidelines|Important Tips|General Guidelines)/i)) {
      if (currentDay) {
        days.push(currentDay);
        currentDay = null;
      }
      inGuidelines = true;
      continue;
    }

    // If inside guidelines
    if (inGuidelines) {
      // e.g. "• **Dress Code:** Traditional dress is strictly adhered to..."
      // or "- **Entry Timings:** ..."
      const cleaned = line.replace(/^[-•*]\s*/, '').trim();
      if (cleaned) {
        const parts = cleaned.split(':');
        if (parts.length > 1 && (parts[0].includes('**') || parts[0].length < 30)) {
          guidelines.push({
            title: parts[0].replace(/\*+/g, '').trim(),
            desc: parts.slice(1).join(':').replace(/\*+/g, '').trim(),
          });
        } else {
          guidelines.push({
            title: 'Tip',
            desc: cleaned.replace(/\*+/g, '').trim(),
          });
        }
      }
      continue;
    }

    // If inside a Day
    if (currentDay) {
      // Check for bullet items or time segments e.g. "- **Morning (06:00 - 10:30 AM):** Arrive in..."
      const cleaned = line.replace(/^[-•*]\s*/, '').trim();
      let period = '';
      let text = cleaned;

      if (cleaned.toLowerCase().includes('morning')) period = 'Morning';
      else if (cleaned.toLowerCase().includes('midday') || cleaned.toLowerCase().includes('afternoon') || cleaned.toLowerCase().includes('noon')) period = 'Afternoon';
      else if (cleaned.toLowerCase().includes('evening') || cleaned.toLowerCase().includes('night')) period = 'Evening';

      currentDay.items.push({
        raw: cleaned,
        period,
      });
      continue;
    }

    // Any other text
    otherLines.push(line.replace(/^#+\s*/, ''));
  }

  if (currentDay) {
    days.push(currentDay);
  }

  // Choose icon for guideline items
  const getGuidelineIcon = (name) => {
    const l = name.toLowerCase();
    if (l.includes('dress')) return '👔';
    if (l.includes('timing') || l.includes('time') || l.includes('entry') || l.includes('darshan')) return '⏰';
    if (l.includes('footwear') || l.includes('mobile') || l.includes('shoe') || l.includes('locker')) return '👟';
    if (l.includes('prasad') || l.includes('food') || l.includes('bhojan') || l.includes('annadan')) return '🍚';
    if (l.includes('booking') || l.includes('ticket')) return '🎟️';
    return '🪔';
  };

  const getPeriodBadge = (period) => {
    switch (period) {
      case 'Morning':
        return { icon: '🌅', label: 'Morning Darshan', bg: dark ? 'bg-amber-950/60 text-amber-300 border-amber-800' : 'bg-amber-100 text-amber-900 border-amber-200' };
      case 'Afternoon':
        return { icon: '☀️', label: 'Midday & Rest', bg: dark ? 'bg-orange-950/60 text-orange-300 border-orange-800' : 'bg-orange-100 text-orange-900 border-orange-200' };
      case 'Evening':
        return { icon: '🪔', label: 'Evening Aarti', bg: dark ? 'bg-purple-950/60 text-purple-300 border-purple-800' : 'bg-purple-100 text-purple-900 border-purple-200' };
      default:
        return { icon: '📍', label: 'Pilgrimage Schedule', bg: dark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-yellow-50 text-gray-800 border-amber-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Itinerary Header Card */}
      <div
        className={`p-6 rounded-3xl border shadow-md transition-all ${
          dark
            ? 'bg-gradient-to-r from-gray-900 via-amber-950/40 to-gray-900 border-amber-600/40'
            : 'bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border-amber-300'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🕉️</span>
              <span className={`text-xs font-bold uppercase tracking-widest ${dark ? 'text-amber-400' : 'text-amber-800'}`}>
                Sacred Yatra Plan
              </span>
            </div>
            <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${dark ? 'text-yellow-400' : 'text-yellow-900'}`}>
              {title || 'Divine Pilgrimage Itinerary'}
            </h2>
          </div>

          {metaInfo.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {metaInfo.map((m, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 ${
                    dark
                      ? 'bg-gray-900/80 border-gray-700 text-gray-200'
                      : 'bg-white/90 border-amber-200 text-gray-800 shadow-sm'
                  }`}
                >
                  <span className={`font-semibold ${dark ? 'text-amber-400' : 'text-amber-700'}`}>{m.label}:</span>
                  <span className="font-medium">{m.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Other Intro Lines if any */}
      {otherLines.length > 0 && (
        <div className={`p-4 rounded-2xl border text-sm leading-relaxed ${dark ? 'bg-gray-900/60 border-gray-800 text-gray-300' : 'bg-white border-amber-100 text-gray-700'}`}>
          {otherLines.map((l, i) => (
            <p key={i} className="mb-1">{renderRichInline(l, dark)}</p>
          ))}
        </div>
      )}

      {/* Day-by-Day Cards */}
      <div className="space-y-5">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`rounded-3xl border overflow-hidden shadow-md transition-all ${
              dark
                ? 'bg-gray-900/90 border-yellow-800/60 hover:border-yellow-600'
                : 'bg-white border-amber-200 hover:border-amber-400 shadow-amber-100/50'
            }`}
          >
            {/* Day Header Banner */}
            <div
              className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3 ${
                dark
                  ? 'bg-gradient-to-r from-gray-800 via-amber-950/30 to-gray-800 border-yellow-800/50'
                  : 'bg-gradient-to-r from-amber-50 via-yellow-100/70 to-amber-50 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                  dark ? 'bg-yellow-500 text-gray-950' : 'bg-yellow-600 text-white shadow-sm'
                }`}>
                  {day.dayLabel}
                </span>
                <h3 className={`text-base md:text-lg font-bold ${dark ? 'text-white' : 'text-yellow-950'}`}>
                  {day.dayTitle}
                </h3>
              </div>
              <span className={`text-xs font-medium ${dark ? 'text-amber-400' : 'text-amber-800'}`}>
                🪔 Consecrated Schedule
              </span>
            </div>

            {/* Day Schedule Items */}
            <div className="p-6 space-y-4">
              {day.items.map((item, itmIdx) => {
                const badge = getPeriodBadge(item.period);
                return (
                  <div
                    key={itmIdx}
                    className={`p-4 rounded-2xl border transition-all ${
                      dark
                        ? 'bg-gray-950/60 border-gray-800/90 hover:border-amber-700/60'
                        : 'bg-amber-50/40 border-amber-100 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border flex items-center gap-1.5 ${badge.bg}`}>
                        <span>{badge.icon}</span>
                        <span>{badge.label}</span>
                      </span>
                    </div>
                    <div className={`text-sm leading-relaxed pl-1 ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {renderRichInline(item.raw, dark)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Essential Devotee Guidelines Grid */}
      {guidelines.length > 0 && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-lg ${
            dark
              ? 'bg-gradient-to-br from-gray-900 via-amber-950/20 to-gray-900 border-amber-700/50'
              : 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50/50 border-amber-300'
          }`}
        >
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-amber-500/20">
            <span className="text-2xl">📋</span>
            <div>
              <h3 className={`text-xl font-bold tracking-tight ${dark ? 'text-yellow-400' : 'text-yellow-900'}`}>
                Essential Devotee Guidelines & Sanctum Rules
              </h3>
              <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                Important darshan protocols, attire standards, and prasadam timings
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guidelines.map((g, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                  dark
                    ? 'bg-gray-950/70 border-gray-800 hover:border-amber-600'
                    : 'bg-white border-amber-200 hover:border-amber-400 shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-lg shrink-0 mt-0.5">
                  {getGuidelineIcon(g.title)}
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${dark ? 'text-amber-400' : 'text-amber-800'}`}>
                    {g.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {renderRichInline(g.desc, dark)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
