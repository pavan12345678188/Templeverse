import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import { templesData } from './src/data/templesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const host = '0.0.0.0';

app.use(cors());
app.use(express.json());

// Initialize Gemini SDK with required telemetry headers
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Helper to find matching temples from query
function findMatchingTemples(text: string) {
  const lower = text.toLowerCase();
  const matched: any[] = [];
  const seenIds = new Set();

  for (const t of templesData) {
    if (seenIds.has(t.id)) continue;
    const tName = t.name.toLowerCase();
    const city = (t.location?.city || '').toLowerCase();
    const state = (t.location?.state || '').toLowerCase();
    const deity = (t.deity || '').toLowerCase();
    const category = (t.category || []).join(' ').toLowerCase();

    // Check direct name match
    if (lower.includes(tName) || (tName.length > 5 && lower.includes(tName.split(' ')[0].toLowerCase()))) {
      seenIds.add(t.id);
      matched.push({
        id: t.id,
        name: t.name,
        city: t.location?.city,
        state: t.location?.state,
        deity: t.deity,
        image: t.images?.[0]?.url,
        category: t.category?.[0] || 'Temple'
      });
    }
    // Check city / state match if temple context exists
    else if ((city && lower.includes(city)) || (state && lower.includes(state))) {
      seenIds.add(t.id);
      matched.push({
        id: t.id,
        name: t.name,
        city: t.location?.city,
        state: t.location?.state,
        deity: t.deity,
        image: t.images?.[0]?.url,
        category: t.category?.[0] || 'Temple'
      });
    }
    // Check deity match
    else if (deity && lower.includes(deity.split(' ')[0].toLowerCase()) && deity.length > 3) {
      seenIds.add(t.id);
      matched.push({
        id: t.id,
        name: t.name,
        city: t.location?.city,
        state: t.location?.state,
        deity: t.deity,
        image: t.images?.[0]?.url,
        category: t.category?.[0] || 'Temple'
      });
    }

    if (matched.length >= 6) break;
  }
  return matched;
}

// Fallback response generator when API key is not present or offline
function generateLocalResponse(message: string, userLocation?: { latitude: number; longitude: number }) {
  const lower = message.toLowerCase();
  const matched = findMatchingTemples(message);

  if (lower.includes('jyotirlinga') || lower.includes('jyotirlingas')) {
    const jyotirlingas = templesData.filter(t => t.category?.some((c: string) => c.toLowerCase().includes('jyotirlinga')));
    return {
      text: `There are **12 sacred Jyotirlingas** of Lord Shiva across India:\n\n` +
        jyotirlingas.slice(0, 12).map((j, i) => `${i + 1}. **${j.name}** (${j.location.city}, ${j.location.state}) - *${j.deity}*`).join('\n') +
        `\n\nEach represents the infinite cosmic light of Shiva. You can click on any temple card below or select "12 Jyotirlingas" in the top category bar to explore their history, darshan slots, and audio bhajan stotrams.`,
      sources: [
        { title: "12 Jyotirlingas of Lord Shiva", uri: "https://shrimahakaleshwar.com/" },
        { title: "Somnath Trust", uri: "https://somnath.org/" }
      ],
      suggestedTemples: jyotirlingas.slice(0, 4).map(t => ({ id: t.id, name: t.name, city: t.location?.city, state: t.location?.state, image: t.images?.[0]?.url, category: 'Jyotirlinga' }))
    };
  }

  if (lower.includes('shakti peetha') || lower.includes('shakti peethas')) {
    const peethas = templesData.filter(t => t.category?.some((c: string) => c.toLowerCase().includes('shakti peetha')));
    return {
      text: `The **Maha Shakti Peethas** are revered pilgrimage spots where body parts and ornaments of Goddess Sati fell across the Indian subcontinent.\n\n` +
        `Among the 18 Maha Shakti Peethas enshrined in our scriptures:\n` +
        peethas.slice(0, 8).map((p, i) => `${i + 1}. **${p.name}** (${p.location.city}, ${p.location.state}) - Deity: *${p.deity}*`).join('\n') +
        `\n\nExplore them with detailed sthala puranas and festivals by choosing the **18 Shakti Peethas** category from the sidebar or category bar.`,
      sources: [
        { title: "Maha Shakti Peethas Tradition", uri: "https://en.wikipedia.org/wiki/Shakti_Pitha" }
      ],
      suggestedTemples: peethas.slice(0, 4).map(t => ({ id: t.id, name: t.name, city: t.location?.city, state: t.location?.state, image: t.images?.[0]?.url, category: 'Shakti Peetha' }))
    };
  }

  if (lower.includes('pancha bhoota') || lower.includes('panchabhoota') || lower.includes('elements')) {
    const elemental = templesData.filter(t => t.category?.some((c: string) => c.toLowerCase().includes('pancha bhoota')));
    return {
      text: `The **Pancha Bhoota Stalams** are five sacred temples dedicated to Lord Shiva, each representing one of the primordial cosmic elements:\n\n` +
        `1. **Water (Appu Lingam)**: Jambukeswarar Temple, Thiruvanaikaval (Tamil Nadu) - An underground spring continuously wets the lingam.\n` +
        `2. **Fire (Agni Lingam)**: Arunachaleswarar Temple, Tiruvannamalai (Tamil Nadu) - Shiva manifests as the sacred hill and cosmic pillar of fire.\n` +
        `3. **Air (Vayu Lingam)**: Srikalahasteeswara Temple, Srikalahasti (Andhra Pradesh) - The sanctum flame flickers eternally without breeze.\n` +
        `4. **Earth (Prithvi Lingam)**: Ekambareswarar Temple, Kanchipuram (Tamil Nadu) - Sand lingam worshipped beneath an ancient 3,500-year-old mango tree.\n` +
        `5. **Ether/Sky (Akasha Lingam)**: Nataraja Temple, Chidambaram (Tamil Nadu) - Formless manifestation of Shiva in his cosmic dance (Ananda Tandava).\n\n` +
        `All five are available in TempleVerse with darshan guides and architectural histories.`,
      sources: [
        { title: "Pancha Bhoota Stalams Overview", uri: "https://en.wikipedia.org/wiki/Pancha_Bhoota_Stalam" }
      ],
      suggestedTemples: elemental.slice(0, 5).map(t => ({ id: t.id, name: t.name, city: t.location?.city, state: t.location?.state, image: t.images?.[0]?.url, category: 'Pancha Bhoota Stalam' }))
    };
  }

  if (lower.includes('peace') || lower.includes('stress') || lower.includes('meditation') || lower.includes('calm')) {
    const peacefulTemples = templesData.filter(t => 
      t.name.includes('Arunachaleswarar') || 
      t.name.includes('Kedarnath') || 
      t.name.includes('Ramanathaswamy') || 
      t.name.includes('Somnath')
    );
    return {
      text: `Namaste 🙏 For deep spiritual peace, inner stillness, and mental tranquility, sacred Vedic tradition recommends visiting revered shrines known for high spiritual vibrations:\n\n` +
        `• **Arunachaleswarar Temple (Tiruvannamalai, Tamil Nadu)**: Known worldwide for Girivalam (sacred hill circumambulation) and the serene silence of Sri Ramana Maharshi's presence.\n` +
        `• **Ramanathaswamy Temple (Rameswaram, Tamil Nadu)**: Bathing in the 22 sacred teerthams is believed to purify the mind, wash away past karmic burdens, and bring profound calm.\n` +
        `• **Kedarnath Dham (Uttarakhand)**: Situated amidst majestic Himalayan peaks, the vibrations of this high-altitude Jyotirlinga offer unparalleled meditative clarity.\n` +
        `• **Somnath Temple (Gujarat)**: Perched on the serene Arabian Sea coast, listening to the evening sea aarti dissolves worldly worries.\n\n` +
        `You can explore each of these shrines with darshan timings and sacred hymns in TempleVerse.`,
      sources: [
        { title: "Sacred Pilgrimage and Meditation", uri: "https://www.incredibleindia.org" },
        { title: "Arunachaleswarar Devasthanam", uri: "https://arunachaleswarartemple.tnhrce.in" }
      ],
      suggestedTemples: peacefulTemples.length > 0 ? peacefulTemples.slice(0, 4) : templesData.slice(0, 4)
    };
  }

  if (lower.includes('ticket') || lower.includes('booking') || lower.includes('darshan ticket') || lower.includes('special entry')) {
    const ticketTemples = templesData.filter(t => t.id === 'tirumala-tirupati' || t.id === 'kashi-vishwanath' || t.id === 'mahakaleshwar' || t.id === 'vaishno-devi');
    return {
      text: `Namaste 🙏 Here is official darshan ticket booking guidance for India's major temples:\n\n` +
        `• **Tirumala Venkateswara (Tirupati)**: Book Rs. 300 Special Entry Darshan (SED) exclusively via the official TTD portal (**tirupatibalaji.ap.gov.in** or the official TTDevasthanams mobile app) when quota opens monthly.\n` +
        `• **Kashi Vishwanath (Varanasi)**: Sugam Darshan (Rs. 300) and Mangala Aarti tickets are booked on **shrikashivishwanath.org**.\n` +
        `• **Mahakaleshwar (Ujjain)**: The renowned early-morning Bhasma Aarti and VIP Jalabhishek tickets can be reserved through **shrimahakaleshwar.com**.\n` +
        `• **Mata Vaishno Devi (Katra)**: Battery vehicle, helicopter, and Priority Darshan slots are reserved on **maavaishnodevi.org**.\n\n` +
        `⚠️ *Caution*: Never purchase tickets through unverified agents. TempleVerse connects you directly with official state endowment and devasthanam portals on each temple's page.`,
      sources: [
        { title: "TTD Official Portal", uri: "https://tirupatibalaji.ap.gov.in" },
        { title: "Kashi Vishwanath Trust", uri: "https://shrikashivishwanath.org" },
        { title: "Mahakaleshwar Ujjain Portal", uri: "https://shrimahakaleshwar.com" }
      ],
      suggestedTemples: ticketTemples
    };
  }

  return {
    text: `Namaste 🙏 I am your **TempleVerse AI Assistant**.\n\n` +
      (matched.length > 0
        ? `Here is information connecting your question to India's sacred temples:\n\n` +
          matched.map(m => `• **${m.name}** (${m.city}, ${m.state}) — Dedicated to **${m.deity || 'Sacred Deity'}** [${m.category}]`).join('\n') +
          `\n\nClick any temple card below to explore sthala purana, daily aarti schedules, dress code, prasadam, and direct darshan portal links.`
        : `In TempleVerse, every question is explored through the sacred lens of India's temples, Jyotirlingas, Shakti Peethas, Pancha Bhoota Stalams, and pilgrimage circuits.\n\nYou can ask about:\n• Any specific temple (e.g. *Tirupati, Somnath, Meenakshi Amman, Kedarnath*)\n• Sthala puranas, rituals, and morning aarti timings\n• Proper temple dress codes & auspicious pilgrimage muhurtas\n• How to plan a 3-day or 5-day divine pilgrimage route\n\nWhich holy kshetram or deity would you like to explore today?`),
    sources: [
      { title: "TempleVerse Heritage Directory", uri: "https://tirumala.org" },
      { title: "Incredible India Spiritual Heritage", uri: "https://www.incredibleindia.org" }
    ],
    suggestedTemples: matched.length > 0 ? matched : templesData.slice(0, 4).map(t => ({ id: t.id, name: t.name, city: t.location?.city, state: t.location?.state, image: t.images?.[0]?.url, category: t.category?.[0] || 'Temple' }))
  };
}

// AI Chatbot with Google Search and Maps Grounding
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, userLocation, preferMaps } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getAiClient();
    if (!ai) {
      const fallback = generateLocalResponse(message, userLocation);
      return res.json({
        text: fallback.text,
        reply: fallback.text,
        sources: fallback.sources,
        suggestedTemples: fallback.suggestedTemples,
        groundingType: 'local-knowledge'
      });
    }

    // Determine whether to use Maps Grounding or Search Grounding
    // Note: googleMaps and googleSearch cannot be used together in the same request.
    const isGeoLocationQuery = preferMaps || /near|nearby|distance|reach|location|direction|map|how to go|route|where is|in city|in district/i.test(message);

    const systemInstruction = `You are the official TempleVerse AI Assistant for TempleVerse — India's premier sacred temple discovery platform.

CRITICAL INSTRUCTION — TEMPLE-CENTRIC FOCUS:
- Regardless of what question the user asks, your answers MUST ALWAYS be directly connected and related to Hindu temples, sacred sthalas, pilgrimage circuits (such as 12 Jyotirlingas, 18 Maha Shakti Peethas, 5 Pancha Bhoota Stalams, Char Dham, Divya Desams, Pancharama Kshetrams), deities, sthala puranas, sacred rituals, darshan timings, temple architecture, and pilgrim travel in India.
- If asked about a deity (Shiva, Vishnu, Devi, Ganesha, Murugan, Krishna, Rama, Hanuman), detail their most famous consecrated temples across India, rituals, and significance.
- If asked about a city, state, or region (e.g., Varanasi, Ujjain, Madurai, Tirupati, Puri, Gujarat, Andhra, Tamil Nadu, Kerala), focus specifically on the renowned temples located there, how devotees reach them, and sanctum traditions.
- If asked a spiritual or life question (e.g., peace of mind, meditation, remedies, auspicious dates), recommend traditional temple visits, parikrama, archana, or sacred thirthams (such as Ramanathaswamy 22 wells, Srikalahasti Rahu-Ketu, or Mahakaleshwar Bhasma Aarti).
- If the user asks a non-temple question (like coding, sports, movies, general trivia), politely greet them and pivot: "Namaste 🙏 In TempleVerse, my seva is devoted exclusively to sacred temples, pilgrimage circuits, and holy sthalas across India. However, if you are looking to explore divine heritage..." and introduce 2-3 prominent temples they can visit.
- Always mention 2 to 4 specific temples with their city and state.
- SHORT & DIRECT QUERIES: When the user asks short questions or types simple keywords (e.g. 'tirupati dress code', 'somnath timing', 'bhasma aarti', 'kashi ticket', 'pradosham', 'kedarnath opening date', '5 elements'), provide an immediate, crisp, and direct answer first with key facts in clear bullet points (Timings, Dress Code, Guidelines, Official Portal), followed by relevant temples to explore.
- Keep responses well-structured with clear bullet points, bold temple names, and a warm, devotional tone (use 'Namaste 🙏', 'Pranam').
- Do not invent live ticket availability or prices; guide devotees to official devasthanam portals (e.g. tirumala.org, srikashivishwanath.org, mahakaleshwar.com).`;

    let response;
    let groundingType = 'search';

    try {
      if (isGeoLocationQuery) {
        groundingType = 'maps';
        const config: any = {
          tools: [{ googleMaps: {} }],
          systemInstruction,
        };

        if (userLocation && userLocation.latitude && userLocation.longitude) {
          config.toolConfig = {
            retrievalConfig: {
              latLng: {
                latitude: Number(userLocation.latitude),
                longitude: Number(userLocation.longitude)
              }
            }
          };
        }

        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config
        });
      } else {
        groundingType = 'search';
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            tools: [{ googleSearch: {} }],
            systemInstruction,
          }
        });
      }
    } catch (primaryErr: any) {
      const isQuota = primaryErr?.status === 429 || primaryErr?.code === 429 || 
        (primaryErr?.message && (primaryErr.message.includes('429') || primaryErr.message.includes('quota') || primaryErr.message.includes('RESOURCE_EXHAUSTED')));
      
      if (isQuota) {
        console.warn('Gemini 3.8 Flash quota reached; trying gemini-3.1-flash-lite...');
        groundingType = 'lite';
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: message,
            config: {
              systemInstruction,
            }
          });
        } catch (secondaryErr: any) {
          throw secondaryErr;
        }
      } else {
        throw primaryErr;
      }
    }

    const text = response?.text || "Namaste 🙏 Welcome to TempleVerse. Please ask about any sacred temple, Jyotirlinga, Shakti Peetha, or pilgrimage circuit across India.";

    // Extract URLs from groundingChunks
    const sources: Array<{ title: string; uri: string }> = [];
    const chunks = response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (Array.isArray(chunks)) {
      for (const chunk of chunks) {
        if (chunk.web && chunk.web.uri) {
          sources.push({
            title: chunk.web.title || chunk.web.uri,
            uri: chunk.web.uri
          });
        }
        if (chunk.maps && chunk.maps.uri) {
          sources.push({
            title: chunk.maps.title || "View on Google Maps",
            uri: chunk.maps.uri
          });
        }
      }
    }

    // Match any mentioned temples from our database to show preview cards
    const matchedTemples = findMatchingTemples(message + ' ' + text);

    return res.json({
      text,
      reply: text,
      sources: sources.slice(0, 6),
      suggestedTemples: matchedTemples,
      groundingType
    });
  } catch (error: any) {
    const isQuota = error?.status === 429 || error?.code === 429 || 
      (error?.message && (error.message.includes('429') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')));
    
    if (isQuota) {
      console.warn('Gemini API rate limit reached. Serving authentic TempleVerse heritage directory response.');
    } else {
      console.warn('Gemini chat note:', error?.message ? error.message.slice(0, 100) : 'Serving TempleVerse knowledge');
    }

    const fallback = generateLocalResponse(req.body?.message || '', req.body?.userLocation);
    return res.json({
      text: fallback.text,
      reply: fallback.text,
      sources: fallback.sources,
      suggestedTemples: fallback.suggestedTemples,
      groundingType: 'templeverse-archive'
    });
  }
});

// AI Journey Planner endpoint
app.post('/api/gemini/journey-planner', async (req, res) => {
  try {
    const { startCity, destinationRegion, days, category, interests } = req.body;
    const ai = getAiClient();

    const prompt = `Create a realistic, spiritually enriching, day-by-day temple pilgrimage itinerary for a traveler.
Starting City: ${startCity || 'Hyderabad'}
Preferred Region / Destination: ${destinationRegion || 'South India / Andhra Pradesh & Tamil Nadu'}
Number of Days: ${days || 3} Days
Preferred Category: ${category || 'Jyotirlingas and Ancient Temples'}
Special Interests: ${interests || 'History, Darshan, Architecture'}

Please include:
1. Day-by-Day schedule (Morning, Afternoon, Evening darshan)
2. Suggested temples with significance
3. Realistic travel distances and estimated travel duration between places
4. Best darshan timings, dress code recommendations, and prasad specialties
5. Important practical tips for devotees`;

    if (!ai) {
      return res.json({
        itinerary: `### 🕉️ ${days || 3}-Day Divine Pilgrimage Itinerary\n\n` +
          `**Starting Point:** ${startCity || 'Tirupati'}\n` +
          `**Destination Focus:** ${destinationRegion || 'Sacred Shrines'}\n\n` +
          `#### Day 1: Sacred Darshan & Grand Temples\n` +
          `- **Morning (06:00 - 11:00 AM):** Divine Darshan at the prime temple. Attend Suprabhata Seva or Sarva Darshan.\n` +
          `- **Afternoon:** Traditional Satvik lunch and temple Prasad. Explore historical stone inscriptions and ancient gopurams.\n` +
          `- **Evening (05:00 - 08:30 PM):** Evening Aarti and circumambulation (Pradakshina). Experience soothing evening Vedic chants.\n\n` +
          `#### Day 2: Architectural Marvels & Element Shrines\n` +
          `- **Morning:** Travel to adjoining holy sthalam (~2 to 3 hours scenic journey).\n` +
          `- **Midday:** Visit the sacred river/teertham bath ghat, followed by Pancha Bhoota or Jyotirlinga darshan.\n` +
          `- **Evening:** Attend sacred lighting of lamps and special Sandhya Deeparadhana.\n\n` +
          `#### Practical Pilgrimage Tips:\n` +
          `• **Dress Code:** Traditional attire (Dhoti/Kurta for men, Saree/Salwar for women) is mandatory at most South Indian & Jyotirlinga shrines.\n` +
          `• **Booking:** Always check official Devasthanam websites via TempleVerse for special entry tickets in advance.\n` +
          `• **Prasadam:** Never miss the authentic Maha Prasad offered at noon.`,
        sources: [
          { title: "TempleVerse Journey Planning Guide", uri: "https://tirumala.org" }
        ]
      });
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are an expert Indian pilgrimage and temple travel curator. Create structured, culturally authentic, and realistic day-wise itineraries.",
        }
      });
    } catch (primaryErr: any) {
      const isQuota = primaryErr?.status === 429 || primaryErr?.code === 429 || 
        (primaryErr?.message && (primaryErr.message.includes('429') || primaryErr.message.includes('quota') || primaryErr.message.includes('RESOURCE_EXHAUSTED')));
      
      if (isQuota) {
        console.warn('Journey planner: Gemini 3.8 Flash quota reached; trying gemini-3.1-flash-lite...');
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: prompt,
            config: {
              systemInstruction: "You are an expert Indian pilgrimage and temple travel curator. Create structured, culturally authentic, and realistic day-wise itineraries.",
            }
          });
        } catch (secondaryErr: any) {
          throw secondaryErr;
        }
      } else {
        throw primaryErr;
      }
    }

    const sources: Array<{ title: string; uri: string }> = [];
    const chunks = response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (Array.isArray(chunks)) {
      for (const chunk of chunks) {
        if (chunk.web && chunk.web.uri) {
          sources.push({ title: chunk.web.title || chunk.web.uri, uri: chunk.web.uri });
        }
      }
    }

    return res.json({
      itinerary: response?.text || "### Sacred Pilgrimage Itinerary\nDetailed itinerary generated successfully.",
      sources: sources.slice(0, 5)
    });
  } catch (error: any) {
    const isQuota = error?.status === 429 || error?.code === 429 || 
      (error?.message && (error.message.includes('429') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')));
    
    if (isQuota) {
      console.warn('Journey planner: Rate limit reached. Serving curated Vedic pilgrimage itinerary.');
    } else {
      console.warn('Journey planner note:', error?.message ? error.message.slice(0, 100) : 'Serving curated Vedic itinerary');
    }

    const fallbackDays = req.body?.days || 3;
    const fallbackStart = req.body?.startCity || 'Varanasi';
    const fallbackDest = req.body?.destinationRegion || 'Sacred Pilgrimage Circuit';
    const fallbackCategory = req.body?.category || 'Sacred Temples';

    return res.json({
      itinerary: `### 🕉️ ${fallbackDays}-Day Divine Pilgrimage Itinerary (${fallbackCategory})\n\n` +
        `**Starting Point:** ${fallbackStart}\n` +
        `**Destination Circuit:** ${fallbackDest}\n\n` +
        `#### Day 1: Arrival & Prime Sanctum Darshan\n` +
        `- **Morning (06:00 - 10:30 AM):** Arrive in ${fallbackStart}, take holy bath/snanam, and proceed for Suprabhata Seva and special entry darshan at the prime sanctum.\n` +
        `- **Midday (12:00 - 02:00 PM):** Partake in sacred Mahaprasadam served in the temple Annadana mandapam. Rest during afternoon sanctum closure.\n` +
        `- **Evening (05:30 - 08:30 PM):** Attend divine evening Deeparadhana / Maha Aarti. Experience the reverberating Vedic stotras, bell tolls, and peaceful parikrama around the vimana.\n\n` +
        `#### Day 2: Sacred Circuit & Elemental Shrines\n` +
        `- **Morning (06:30 - 11:30 AM):** Early morning departure towards the neighboring holy sthalam (~2 hours drive). Visit ancient stone pillared mandapas and historic inscriptions.\n` +
        `- **Afternoon:** Explore local sacred temple ponds (Pushkarini / Teertham) and nearby heritage shrines.\n` +
        `- **Evening:** Participate in evening Sayana Utsavam or Pradosha Rudrabhishekam.\n\n` +
        (Number(fallbackDays) >= 3 ? `#### Day 3: Architectural Wonders & Holy Departure\n` +
        `- **Morning:** Final morning darshan and Sankalpam with temple priests. Collect consecrated prasadam.\n` +
        `- **Afternoon:** Visit adjoining heritage rock carvings and sacred viewpoints before proceeding for your return journey.\n\n` : '') +
        `#### Essential Devotee Guidelines:\n` +
        `• **Dress Code:** Traditional dress is strictly adhered to (Dhoti/Kurta for men, Saree/Churidar for women).\n` +
        `• **Entry Timings:** Morning darshan is ideal between 06:00 AM - 11:30 AM, and evening darshan reopens from 04:30 PM to 08:30 PM.\n` +
        `• **Footwear & Mobile:** Free footwear stands and digital locker counters are provided near temple Rajagopuram entrances.\n` +
        `• **Prasadam:** Collect token coupons early in the day for special archana and consecrated sweet prasadam.`,
      sources: [
        { title: "TempleVerse Curated Pilgrimage Guide", uri: "https://tirumala.org" },
        { title: "India Sacred Tourism Guide", uri: "https://tourism.gov.in" }
      ]
    });
  }
});

// Setup Vite development middlewares or serve static build in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host, port },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, host, () => {
    console.log(`TempleVerse server running at http://${host}:${port}`);
  });
}

startServer();
