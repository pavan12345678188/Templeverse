import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { templesData } from '../data/templesData.js';
import FormattedItinerary from './FormattedItinerary.jsx';

export default function JourneyPlannerPage({ onSelectTemple, onBack, dark }) {
  const [startCity, setStartCity] = useState('Hyderabad');
  const [destinationRegion, setDestinationRegion] = useState('South India — Jyotirlinga & Pancha Bhoota Circuit');
  const [days, setDays] = useState(3);
  const [category, setCategory] = useState('Jyotilinga');
  const [interests, setInterests] = useState('Ancient Architecture & Darshan Sevas');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [sources, setSources] = useState([]);

  const presetCircuits = [
    {
      title: 'Pancha Bhoota Stalams Circuit',
      region: 'Tamil Nadu & Andhra Pradesh',
      days: 4,
      category: 'Pancha Bhoota Stalams',
      desc: 'Srikalahasti (Air), Kanchipuram (Earth), Tiruvannamalai (Fire), Thiruvanaikaval (Water), Chidambaram (Sky)',
    },
    {
      title: 'Maharashtra Jyotirlinga Yatra',
      region: 'Maharashtra',
      days: 4,
      category: 'Jyotilinga',
      desc: 'Trimbakeshwar, Bhimashankar, and Grishneshwar near Ellora',
    },
    {
      title: 'Sacred Andhra & Tirupati Pilgrimage',
      region: 'Andhra Pradesh',
      days: 3,
      category: 'Vaishnava',
      desc: 'Tirumala Venkateswara, Tiruchanur, Srikalahasti, and Kanaka Durga',
    },
    {
      title: 'Gujarat Somnath & Dwarka Char Dham',
      region: 'Gujarat',
      days: 3,
      category: 'Jyotilinga',
      desc: 'Somnath First Jyotirlinga, Nageshwar Jyotirlinga, and Dwarkadhish Mandir',
    },
    {
      title: '18 Maha Shakti Peetha Yatra',
      region: 'Across India',
      days: 5,
      category: 'Maha Shakti Peetha',
      desc: 'Kamakhya, Kalighat, Mahakaleshwar Mahakali, and Srisailam Bramarambha',
    },
  ];

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setItinerary(null);
    setSources([]);

    try {
      const res = await fetch('/api/gemini/journey-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startCity,
          destinationRegion,
          days,
          category,
          interests,
        }),
      });

      const data = await res.json();
      if (data.itinerary) {
        setItinerary(data.itinerary);
        setSources(data.sources || []);
      }
    } catch (err) {
      console.error('Failed to generate journey plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyCircuit = (c) => {
    setDestinationRegion(c.title);
    setDays(c.days);
    setCategory(c.category);
    handleGenerate();
  };

  return (
    <section className="relative z-10 pt-4 md:pt-28 pb-12">
      <div className="max-w-5xl mx-auto px-4">
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
            🧭 AI Temple Journey Planner
          </h1>
          <p className={`text-sm md:text-base max-w-2xl mx-auto ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
            Craft an authentic day-by-day pilgrimage itinerary grounded in verified temple locations, realistic travel durations, and darshan schedules.
          </p>
        </div>

        {/* Popular Pilgrimage Circuits */}
        <div className="mb-8">
          <h3 className={`text-base font-bold uppercase tracking-wider mb-3 ${dark ? 'text-yellow-500' : 'text-yellow-800'}`}>
            Popular Pilgrimage Circuits:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {presetCircuits.map((circ, idx) => (
              <div
                key={idx}
                onClick={() => applyCircuit(circ)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] shadow-sm flex flex-col justify-between ${
                  dark
                    ? 'bg-gray-800/90 border-yellow-800/60 hover:border-yellow-500'
                    : 'bg-white border-amber-200 hover:border-yellow-500 hover:shadow-yellow-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-yellow-500">{circ.days} Days</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${dark ? 'bg-gray-700 text-gray-300' : 'bg-amber-100 text-yellow-800'}`}>
                      {circ.region}
                    </span>
                  </div>
                  <h4 className={`text-sm font-bold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{circ.title}</h4>
                  <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{circ.desc}</p>
                </div>
                <button className="mt-3 text-xs font-semibold text-yellow-600 self-start hover:underline">
                  Use Circuit Plan →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Itinerary Form */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border mb-10 shadow-lg ${
            dark ? 'bg-gray-800/80 border-yellow-800' : 'bg-white/90 border-yellow-200'
          }`}
        >
          <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                Starting City:
              </label>
              <input
                type="text"
                value={startCity}
                onChange={(e) => setStartCity(e.target.value)}
                required
                placeholder="e.g. Hyderabad, Chennai, Mumbai, Delhi, Bengaluru"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
                  dark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-yellow-300 bg-white text-gray-800'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                Preferred Region / Destination:
              </label>
              <input
                type="text"
                value={destinationRegion}
                onChange={(e) => setDestinationRegion(e.target.value)}
                required
                placeholder="e.g. Tamil Nadu, Varanasi & Ayodhya, Andhra Pradesh"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
                  dark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-yellow-300 bg-white text-gray-800'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                Number of Days:
              </label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
                  dark ? 'bg-gray-700 border-gray-600 text-white' : 'border-yellow-300 bg-white text-gray-800'
                }`}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Day' : 'Days'} Pilgrimage
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                Preferred Temple Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
                  dark ? 'bg-gray-700 border-gray-600 text-white' : 'border-yellow-300 bg-white text-gray-800'
                }`}
              >
                <option value="Jyotilinga">12 Jyotilingas</option>
                <option value="Pancha Bhoota Stalams">5 Pancha Bhoota Stalams (Elements)</option>
                <option value="Maha Shakti Peetha">18 Maha Shakti Peethas</option>
                <option value="Char Dham">Char Dham Shrines</option>
                <option value="Pancharama Kshetrams">Pancharama Kshetrams</option>
                <option value="Ancient">Ancient Heritage Temples</option>
                <option value="All">All Sacred Temples</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                Interests & Requirements:
              </label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. Early morning Aarti, Photography, Satvik Prasad, Minimal walking"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
                  dark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-yellow-300 bg-white text-gray-800'
                }`}
              />
            </div>

            <div className="sm:col-span-2 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-bold text-base transition shadow-md flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <span className="animate-spin text-xl">🕉️</span>
                    <span>Generating Sacred Itinerary with AI...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Pilgrimage Itinerary</span>
                    <span>✨</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Generated Itinerary Display */}
        {itinerary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
              dark ? 'bg-gray-800 border-yellow-800' : 'bg-white border-yellow-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-yellow-500/30">
              <div>
                <h3 className={`text-2xl font-bold ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  Your Customized Temple Itinerary
                </h3>
                <p className={`text-xs mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Grounded with real-time geography & verified TempleVerse records
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className={`px-4 py-2 rounded-full border text-xs font-semibold transition ${
                  dark ? 'border-yellow-600 text-yellow-400 hover:bg-yellow-900/30' : 'border-yellow-400 text-yellow-700 hover:bg-yellow-50'
                }`}
              >
                🖨️ Print / Save Plan
              </button>
            </div>

            <FormattedItinerary content={itinerary} dark={dark} />

            {/* Sources */}
            {sources.length > 0 && (
              <div className="mt-8 pt-4 border-t border-dashed border-yellow-500/30">
                <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  Grounding Resources & Official Devasthanams:
                </p>
                <div className="flex flex-wrap gap-2">
                  {sources.map((s, i) => (
                    <a
                      key={i}
                      href={s.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                        dark
                          ? 'bg-gray-900 border-gray-700 text-yellow-300 hover:bg-gray-700'
                          : 'bg-amber-50 border-amber-200 text-yellow-800 hover:bg-yellow-100'
                      }`}
                    >
                      <span>🌐</span>
                      <span>{s.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
