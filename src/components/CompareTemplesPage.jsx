import React, { useState } from 'react';
import { templesData } from '../data/templesData.js';

export default function CompareTemplesPage({ onSelectTemple, onBack, dark }) {
  const [templeId1, setTempleId1] = useState('tirumala-tirupati');
  const [templeId2, setTempleId2] = useState('somnath');
  const [templeId3, setTempleId3] = useState('');

  const t1 = templesData.find((t) => t.id === templeId1) || templesData[0];
  const t2 = templesData.find((t) => t.id === templeId2) || templesData[1];
  const t3 = templesData.find((t) => t.id === templeId3);

  const compared = [t1, t2, t3].filter(Boolean);

  const attributes = [
    { label: 'Presiding Deity', key: 'deity' },
    { label: 'Category', render: (t) => t.category?.join(', ') || 'N/A' },
    { label: 'Location', render: (t) => `${t.location?.city || ''}, ${t.location?.state || ''}` },
    { label: 'Architecture Style', key: 'architecture_style' },
    { label: 'Visiting Hours', key: 'visiting_hours' },
    { label: 'Entry Fee', key: 'entry_fee' },
    { label: 'Online Darshan Tickets', render: (t) => (t.darshan_tickets?.is_available_online ? '✅ Available Online' : 'General / Free Darshan') },
    { label: 'Famous For', render: (t) => t.famous_for?.slice(0, 3).join(', ') || 'N/A' },
    { label: 'Prasads Offered', render: (t) => t.prasads?.join(', ') || 'N/A' },
  ];

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <div className="text-left mb-6">
          <button
            onClick={onBack}
            className={`px-5 py-2 rounded-full shadow-md flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 ${
              dark ? 'bg-yellow-700 text-white hover:bg-yellow-600' : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
          >
            ← Back
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-5xl font-bold mb-3 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>
            ⚖️ Compare Sacred Temples
          </h1>
          <p className={`text-sm md:text-base max-w-2xl mx-auto ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
            Examine deities, architectural styles, locations, and darshan details side by side.
          </p>
        </div>

        {/* Temple Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>
              Temple 1:
            </label>
            <select
              value={templeId1}
              onChange={(e) => setTempleId1(e.target.value)}
              className={`w-full p-2.5 rounded-xl border text-sm ${
                dark ? 'bg-gray-800 border-gray-700 text-white' : 'border-amber-300 bg-white text-gray-800'
              }`}
            >
              {templesData.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.location?.city})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>
              Temple 2:
            </label>
            <select
              value={templeId2}
              onChange={(e) => setTempleId2(e.target.value)}
              className={`w-full p-2.5 rounded-xl border text-sm ${
                dark ? 'bg-gray-800 border-gray-700 text-white' : 'border-amber-300 bg-white text-gray-800'
              }`}
            >
              {templesData.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.location?.city})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>
              Temple 3 (Optional):
            </label>
            <select
              value={templeId3}
              onChange={(e) => setTempleId3(e.target.value)}
              className={`w-full p-2.5 rounded-xl border text-sm ${
                dark ? 'bg-gray-800 border-gray-700 text-white' : 'border-amber-300 bg-white text-gray-800'
              }`}
            >
              <option value="">-- None --</option>
              {templesData.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.location?.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table / Cards */}
        <div
          className={`rounded-3xl border overflow-x-auto shadow-xl ${
            dark ? 'bg-gray-800 border-yellow-800' : 'bg-white border-yellow-200'
          }`}
        >
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className={`border-b ${dark ? 'bg-gray-900/60 border-gray-700' : 'bg-amber-50/60 border-amber-200'}`}>
                <th className="p-4 text-xs font-bold uppercase tracking-wider w-1/4">Feature</th>
                {compared.map((t) => (
                  <th key={t.id} className="p-4 w-1/3">
                    <div className="flex flex-col items-start gap-2">
                      <img
                        src={t.images?.[0]?.url || 'https://placehold.co/200x120'}
                        alt={t.name}
                        className="w-full h-32 object-cover rounded-xl shadow-sm"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/200x120?text=Temple';
                        }}
                      />
                      <h4 className={`text-base font-bold line-clamp-1 ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>
                        {t.name}
                      </h4>
                      <button
                        onClick={() => onSelectTemple(t.id)}
                        className="text-xs px-3 py-1 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition"
                      >
                        View Profile →
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              {attributes.map((attr, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? (dark ? 'bg-gray-800/50' : 'bg-amber-50/20') : ''}
                >
                  <td className={`p-4 font-semibold text-xs uppercase tracking-wide ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {attr.label}
                  </td>
                  {compared.map((t) => (
                    <td key={t.id} className={`p-4 ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {attr.render ? attr.render(t) : t[attr.key] || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
