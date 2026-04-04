import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as Tone from 'tone'; // Import Tone.js;
import TempleLogo from './assets/TempleLogo.png';
// Removed: import * as THREE from 'three';
// Removed: import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Consolidated and expanded templesData
const templesData = [
  {
    id: "tirumala-tirupati",
    name: "Tirumala Venkateswara Temple",
    location: {
      city: "Tirupati",
      district: "Chittoor",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.6841, longitude: 79.3477 }
    },
    category: ["Vaishnava", "Ancient"],
    deity: "Lord Venkateswara (Vishnu)",
    description: "One of the most visited pilgrimage centers in the world, dedicated to Lord Venkateswara, a form of Vishnu. It is situated on the Tirumala hills.",
    history_summary: "The temple's origins are ancient, with significant contributions from various South Indian dynasties over centuries, including the Pallavas, Cholas, Pandyas, and Vijayanagara emperors. The temple gained immense prominence during the Vijayanagara period, with kings like Krishnadevaraya making significant endowments. The current structure is a culmination of centuries of architectural evolution.",
    interesting_facts: [
      "The deity's eyes are covered with a white mark to protect devotees from its intense divine aura.",
      "The 'Laddu' prasad offered here is world-famous and has a GI (Geographical Indication) tag.",
      "It is one of the richest temples in the world, receiving millions of devotees annually.",
      "The main idol is believed to be self-manifested (Swayambhu)."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748249533/IMG_20250526_135825_koxwjc.jpg", alt: "Tirupati Balaji Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748249534/IMG_20250526_140212_sp5tb3.jpg", alt: "Lord Venkateswara Swamy" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748249534/IMG_20250526_140345_obyf8f.jpg", alt: "Tirupati Temple Entrance" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748249535/IMG_20250526_140531_h8wa0p.jpg", alt: "Tirupati Temple Gopuram" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748754688/Copy_of_TIRUPATI_BALAJI_pmvwda.mp3",
    famous_for: ["Richest temple in the world", "Vaikuntha Ekadashi", "Hair offering"],
    rituals_practices: ["Darshan", "Arjitha Sevas", "Hundi offering"],
    visiting_hours: "Varies daily, often 24/7 for Darshan",
    entry_fee: "Free (special entry tickets available)",
    website: "https://tirumala.org/",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://tirupatibalaji.ap.gov.in/",
      types_of_darshan: [
        { name: "Special Entry Darshanam", cost: "INR 300" },
        { name: "Sarva Darshanam", cost: "Free" },
        { name: "Arjitha Sevas", cost: "Varies" }
      ],
      booking_notes: "Special Entry Darshanam tickets often sell out quickly; book well in advance (60-90 days prior). Identification required for booking and entry.",
      approx_cost: "Free - INR 300+",
      identification_required: true
    },
    prasads: ["Laddu", "Vada", "Pongal", "Chakkera Pongali"],
    festivals: [
      { name: "Brahmotsavam", date_or_period: "September/October (9 days)", description: "The most important annual festival, celebrated with grandeur and processions." },
      { name: "Vaikuntha Ekadashi", date_or_period: "December/January", description: "A highly auspicious day when the Vaikuntha Dwaram is opened for devotees." }
    ]
  },
  {
    id: "somnath",
    name: "Somnath Temple",
    location: {
      city: "Veraval",
      district: "Gir Somnath",
      state: "Gujarat",
      country: "India",
      coordinates: { latitude: 20.8889, longitude: 70.4011 }
    },
    category: ["Jyotilinga", "Ancient"],
    deity: "Lord Shiva (Somnath)",
    description: "One of the twelve Jyotilinga shrines of Shiva, located in Prabhas Patan near Veraval on the western coast of Gujarat, India. It is a revered pilgrimage site and has been rebuilt multiple times throughout history.",
    history_summary: "The temple has a rich and tumultuous history, having been destroyed and rebuilt several times. Its current structure was reconstructed in the Chalukya style of temple architecture and completed in May 1951, under the initiative of Sardar Vallabhbhai Patel.",
    interesting_facts: [
      "It is considered the first among the twelve Jyotilinga shrines of Shiva.",
      "The temple's location on the Arabian Sea coast makes it highly picturesque.",
      "The Ahalya Bai temple, built by Queen Ahilyabai Holkar, is also nearby and offers a glimpse into older structures."
    ],
    architecture_style: "Chalukya",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748254510/IMG_20250526_153927_ck3xex.jpg", alt: "Somnath Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748254509/IMG_20250526_154014_mmxkdr.jpg", alt: "Somnath Temple at sunset" }
    ],

    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748254509/Shiva_xzl7jr.mp3",

    famous_for: ["First Jyotilinga", "Historical significance", "Coastal location"],
    rituals_practices: ["Daily aarti", "Rudrabhishek", "Shivratri celebrations"],
    visiting_hours: "6:00 AM - 9:30 PM",
    entry_fee: "Free",
    website: "https://somnath.org/",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "Entry is generally free; no online booking required for general darshan.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Mohanthal", "Dry Fruits"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Grand celebrations dedicated to Lord Shiva." },
      { name: "Kartik Purnima Fair", date_or_period: "November", description: "A large fair held during Kartik Purnima." }
    ]
  },

  {
    id: "mallikarjuna",
    name: "Mallikarjuna Temple, Srisailam",
    location: {
      city: "Srisailam",
      district: "Kurnool",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.0718, longitude: 78.8679 }
    },
    category: ["Jyotilinga", "Shakti Peetha"],
    deity: "Lord Shiva (Mallikarjuna), Goddess Bramarambha Devi",
    description: "Located on the Nallamala hills, Srisailam is famous for the Mallikarjuna Jyotilinga and the Bramarambha Devi Shakti Peetha, making it one of the rare temples where both are enshrined. It is believed that Sati's upper lip fell here.",
    history_summary: "The temple has ancient origins, with references in Puranas and epics. It has seen contributions from various dynasties including the Satavahanas, Ikshvakus, Pallavas, Chalukyas, and Kakatiyas. The Vijayanagara kings, especially Krishnadevaraya, made significant contributions to its structure and administration.",
    interesting_facts: [
      "It is one of the only two temples in India that is both a Jyotilinga and a Shakti Peetha (the other being Mahakaleshwar).",
      "The temple is surrounded by dense forests of the Nallamala Hills, which are rich in flora and fauna.",
      "The Bhramaramba Devi temple within the complex is dedicated to the Goddess who took the form of a bee to slay the demon Arunasura."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748255500/IMG_20250526_155014_vbneaz.jpg", alt: "Entrance of Mallikarjuna Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748255837/IMG_20250526_160557_zytitt.jpg", alt: "Mallikarjuna Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748255499/Shivayya_stwwnr.mp3",
    famous_for: ["Jyotilinga", "Shakti Peetha", "Scenic location"],
    rituals_practices: ["Daily pujas", "Mahashivratri", "Karthika Pournami"],
    visiting_hours: "6:00 AM - 10:00 PM",
    entry_fee: "Free",
    website: "https://www.srisailadevasthanam.org",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://www.srisailadevasthanam.org/online-booking",
      types_of_darshan: [
        { name: "Sheeghra Darshanam", cost: "INR 150" },
        { name: "Ati Sheeghra Darshanam", cost: "INR 300" }
      ],
      booking_notes: "Online booking available for special darshan and sevas.",
      approx_cost: "Free - INR 300+",
      identification_required: false
    },
    prasads: ["Laddu", "Pulihora"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "The biggest festival celebrated with devotees offering prayers to Lord Mallikarjuna." },
      { name: "Dasara", date_or_period: "September/October", description: "Navaratri celebrations dedicated to Goddess Brahmarambha." }
    ]
  },
  {
    id: "mahakaleshwar",
    name: "Mahakaleshwar Jyotilinga",
    location: {
      city: "Ujjain",
      district: "Ujjain",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 23.1795, longitude: 75.7656 }
    },
    category: ["Jyotilinga", "Shakti Peetha"],
    deity: "Lord Shiva (Mahakaleshwar), Goddess Mahakali Devi",
    description: "One of the twelve Jyotilingas, famous for being the only one facing south. It is also a Shakti Peetha where Sati's upper lip is said to have fallen. The temple is situated on the side of the Rudra Sagar lake.",
    history_summary: "The temple's antiquity is mentioned in various ancient Indian texts like the Puranas. It has undergone several renovations and expansions by different rulers, notably by the Marathas, who contributed significantly to its present form.",
    interesting_facts: [
      "It is the only Jyotilinga that is 'Dakshinamukhi' (south-facing), which is considered highly auspicious.",
      "The 'Bhasma Aarti' (ash ritual) performed here daily is unique and involves smearing the deity with sacred ash from a funeral pyre.",
      "The temple complex also houses the Mahakali Shakti Peetha."
    ],
    architecture_style: "Maratha, Bhumija",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748256556/IMG_20250526_161427_wygqxq.jpg", alt: "Mahakaleshwar Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748256554/IMG_20250526_161316_dezksr.jpg", alt: "Mahakaleshwar Temple View" }
    ],

    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748256554/Lord_Shiva_Devotiona_acrhil.mp3",
    famous_for: ["Dakshinamukhi Jyotilinga", "Bhasma Aarti", "Shakti Peetha"],
    rituals_practices: ["Bhasma Aarti", "Daily pujas"],
    visiting_hours: "3:00 AM - 11:00 PM",
    entry_fee: "Free (special entry tickets available)",
    website: "https://shrimahakaleshwar.com/",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://shrimahakaleshwar.com/online-booking",
      types_of_darshan: [
        { name: "Bhasma Aarti Darshan", cost: "INR 200 (booking required)" },
        { name: "Sheeghra Darshanam", cost: "INR 250" }
      ],
      booking_notes: "Bhasma Aarti tickets must be booked in advance online. Limited slots. Identification required.",
      approx_cost: "Free - INR 250",
      identification_required: true
    },
    prasads: ["Dry Sweets", "Coconut"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "One of the grandest celebrations, with special Bhasma Aarti." },
      { name: "Nag Panchami", date_or_period: "July/August", description: "Festival dedicated to serpent deities." }
    ]
  },
  {
    id: "omkareshwar",
    name: "Omkareshwar Jyotilinga",
    location: {
      city: "Omkareshwar",
      district: "Khandwa",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 22.2478, longitude: 76.1444 }
    },
    category: ["Jyotilinga"],
    deity: "Lord Shiva (Omkareshwar)",
    description: "Located on an island called Mandhata or Shivapuri in the Narmada river, shaped like the Om symbol. It is one of the 12 Jyotilinga shrines.",
    history_summary: "The temple has ancient roots, with mentions in Hindu scriptures. It is a twin temple, with Omkareshwar and Mamaleshwar, both considered Jyotilingas. The island's natural shape resembles the 'Om' symbol, giving the temple its name.",
    interesting_facts: [
      "The island on which the temple is situated is naturally shaped like the 'Om' symbol, which is sacred in Hinduism.",
      "There are two main temples on the island, Omkareshwar and Mamaleshwar, both revered as Jyotilingas.",
      "The temple is located at the confluence of the Narmada and Kaveri rivers."
    ],
    architecture_style: "North Indian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748257203/IMG_20250526_162614_lhymn5.jpg", alt: "Omkareshwar Temple" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748257202/Shiva_u79rxu.mp3",
    famous_for: ["Om-shaped island", "Jyotilinga", "Narmada River"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "5:00 AM - 10:00 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free; no online booking required for general darshan.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Bael Patra", "Flowers"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Major festival dedicated to Lord Shiva." }
    ]
  },
  {
    id: "vaidyanath",
    name: "Vaidyanath Jyotilinga",
    location: {
      city: "Deoghar",
      district: "Deoghar",
      state: "Jharkhand",
      country: "India",
      coordinates: { latitude: 24.4908, longitude: 86.6974 }
    },
    category: ["Jyotilinga"],
    deity: "Lord Shiva (Vaidyanath)",
    description: "One of the twelve Jyotilinga shrines. Devotees offer water from the Ganges to the lingam.",
    history_summary: "The temple is believed to have been built by Vishwakarma, the divine architect. It is a significant pilgrimage site during the Shravan Mela, when millions of devotees carry holy water from the Ganges to offer to the deity.",
    interesting_facts: [
      "It is one of the most revered Jyotilingas and is often associated with healing, as 'Vaidya' means physician.",
      "The temple complex includes 22 other temples.",
      "The 'Kanwariya' pilgrimage, where devotees walk barefoot carrying Ganga water, culminates here during Shravan."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748257656/IMG_20250526_163440_e4cl30.jpg", alt: "Vaidyanath Temple" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748257656/Mahadeva_Damaru_bsed4f.mp3",
    famous_for: ["Jyotilinga", "Shravan Mela"],
    rituals_practices: ["Jalabhishek", "Daily pujas"],
    visiting_hours: "4:00 AM - 9:00 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking system for darshan.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Peda", "Sweets"],
    festivals: [
      { name: "Shravan Mela", date_or_period: "July/August (whole month)", description: "Devotees carry holy water from river Ganga to offer to the deity." }
    ]
  },
  {
    id: "bhimashankar",
    name: "Bhimashankar Jyotilinga",
    location: {
      city: "Bhimashankar",
      district: "Pune",
      state: "Maharashtra",
      country: "India",
      coordinates: { latitude: 19.4290, longitude: 73.5350 }
    },
    category: ["Jyotilinga"],
    deity: "Lord Shiva (Bhimashankar)",
    description: "A revered Jyotilinga shrine nestled in the Sahyadri hills, surrounded by dense forests. It is also the source of the Bhima River.",
    history_summary: "The temple is a composite of old and new structures, with the main temple dating back to the 18th century. It is built in the Nagara style of architecture and is known for its intricate carvings.",
    interesting_facts: [
      "The temple is located within the Bhimashankar Wildlife Sanctuary, making it a blend of spiritual and natural beauty.",
      "It is believed to be the source of the Bhima River, which flows southeast and merges with the Krishna River.",
      "The 'Mokshakund' (a sacred pond) near the temple is believed to grant liberation."
    ],
    architecture_style: "Nagara",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748258337/IMG_20250526_164130_hlykei.jpg", alt: "Bhimashankar Temple" }

    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748258477/Lord_Shiva_Theme_anampn.mp3",
    famous_for: ["Jyotilinga", "Scenic location", "Wildlife sanctuary"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "4:30 AM - 9:30 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for darshan.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Coconut", "Flowers"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Celebrated with great devotion." }
    ]
  },
  {
    id: "grishneshwar",
    name: "Grishneshwar Jyotilinga",
    location: {
      city: "Verul",
      district: "Aurangabad",
      state: "Maharashtra",
      country: "India",
      coordinates: { latitude: 20.0270, longitude: 75.1700 }
    },
    category: ["Jyotilinga"],
    deity: "Lord Shiva (Grishneshwar)",
    description: "The last of the 12 Jyotilinga shrines, located near the Ellora Caves. It is a significant pilgrimage site for Shaivites.",
    history_summary: "The current temple structure was re-built by Ahilyabai Holkar in the 18th century, showcasing her significant contribution to preserving Hindu heritage. Its proximity to the ancient Ellora Caves suggests a long history of spiritual activity in the region.",
    interesting_facts: [
      "It is considered the 12th and final Jyotilinga shrine.",
      "The temple is located just 1 km from the famous UNESCO World Heritage site of Ellora Caves, allowing visitors to combine spiritual and historical exploration.",
      "The temple is built of red rock and features intricate carvings."
    ],
    architecture_style: "South Indian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748259035/IMG_20250526_165739_ffvew3.jpg", alt: "Grishneshwar Temple" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748259035/Nama_Shivaya_oinmxc.mp3",
    famous_for: ["Last Jyotilinga", "Proximity to Ellora Caves"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "5:30 AM - 9:00 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for darshan.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Bael Patra", "Milk"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Special pujas and celebrations." }
    ]
  },
  {
    id: "nageshwar",
    name: "Nageshwar Jyotilinga",
    location: {
      city: "Dwarka",
      district: "Dwarka",
      state: "Gujarat",
      country: "India",
      coordinates: { latitude: 22.3330, longitude: 68.9660 }
    },
    category: ["Jyotilinga"],
    deity: "Lord Shiva (Nageshwar)",
    description: "One of the 12 Jyotilinga shrines, located on the route between Dwarka and Bet Dwarka. It is believed to protect against all poisons.",
    history_summary: "The temple is mentioned in the Shiva Purana. Its current structure is relatively modern, but the site has ancient significance. It is believed that Lord Krishna himself worshipped Shiva here.",
    interesting_facts: [
      "The temple houses a 25-meter tall statue of Lord Shiva and a large garden with a pond.",
      "It is believed that those who worship here are protected from all poisons and snake bites.",
      "The temple is located near Dwarka, one of the Char Dham pilgrimage sites."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748276468/IMG_20250526_173748_ozdqab.jpg", alt: "Nageshwar Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748276468/IMG_20250526_173814_zdllsh.jpg", alt: "Nageshwar Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748278675/Shiva_Ultimate_jcaryk.mp3",
    famous_for: ["Jyotilinga", "Darshana of Lord Shiva"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "5:00 AM - 9:00 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for darshan.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Coconut", "Sweets"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Special prayers and festivities." }
    ]
  },
  {
    id: "rameshwaram",
    name: "Ramanathaswamy Temple, Rameshwaram",
    location: {
      city: "Rameshwaram",
      district: "Ramanathapuram",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 9.2876, longitude: 79.3129 }
    },
    category: ["Jyotilinga", "Char Dham"],
    deity: "Lord Shiva (Ramanathaswamy)",
    description: "One of the twelve Jyotilinga shrines and one of the four Char Dham pilgrimage sites. It is believed that Lord Rama worshipped Shiva here.",
    history_summary: "The temple has the longest corridor among all Hindu temples in India. It has been expanded by various rulers, particularly the Nayaka dynasty, who contributed significantly to its grand architecture and corridors.",
    interesting_facts: [
      "The temple boasts the longest corridor among all Hindu temples in India, stretching over 1220 meters.",
      "It is believed that Lord Rama installed the Shiva Lingam here before his expedition to Lanka.",
      "Pilgrims traditionally take a holy bath in the 22 sacred wells (theerthams) within the temple complex before darshan."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748276896/1000402645_optimized_9000_glybu1.png", alt: "Ramanathaswamy Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748276525/IMG_20250526_174406_gctm2n.jpg", alt: "Ramanathaswamy Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748278793/Om_Namah_Shivay_zbggtt.mp3",
    famous_for: ["Jyotilinga", "Char Dham", "Longest corridor"],
    rituals_practices: ["Daily pujas", "Holy bath in Agni Theertham"],
    visiting_hours: "5:00 AM - 1:00 PM, 3:00 PM - 9:00 PM",
    entry_fee: "Free (special entry tickets available)",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. Special darshan/pooja tickets available on-site.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Vibhuti", "Kumkum"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Celebrated with great fervor." },
      { name: "Ramalinga Pratishtha Utsavam", date_or_period: "March/April", description: "Commemorates the installation of the Lingam by Lord Rama." }
    ]
  },
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath Temple",
    location: {
      city: "Varanasi",
      district: "Varanasi",
      state: "Uttar Pradesh",
      country: "India",
      coordinates: { latitude: 25.3098, longitude: 83.0069 }
    },
    category: ["Jyotilinga"],
    deity: "Lord Shiva (Vishwanath)",
    description: "One of the most famous Hindu temples dedicated to Lord Shiva and one of the twelve Jyotilingas. It is located on the western bank of the holy river Ganga.",
    history_summary: "The temple has been destroyed and rebuilt many times throughout history due to invasions. The current structure was built by Maharani Ahilyabai Holkar of Indore in 1780. Its proximity to the Ganges makes it a highly sacred site for Hindus.",
    interesting_facts: [
      "Varanasi, where the temple is located, is considered one of the oldest living cities in the world.",
      "The temple's 'Jyotirlinga' is believed to be made of light, not stone.",
      "Devotees often take a holy dip in the Ganges before visiting the temple."
    ],
    architecture_style: "Nagara",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748278318/IMG_20250526_174002_jilcrm.jpg", alt: "Kashi Vishwanath Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748278320/IMG_20250526_174126_chhhau.jpg", alt: "Kashi Vishwanath Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748278320/Shiv_Shankar_vfqs6w.mp3",
    famous_for: ["Jyotilinga", "Ganga Aarti", "Spiritual capital of India"],
    rituals_practices: ["Daily pujas", "Abhishek", "Mangala Aarti"],
    visiting_hours: "2:30 AM - 11:00 PM",
    entry_fee: "Free (special entry tickets available)",
    website: "https://www.shrikashivishwanath.org/",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://www.shrikashivishwanath.org/online-seva-booking",
      types_of_darshan: [
        { name: "Mangala Aarti", cost: "INR 300" },
        { name: "Sugam Darshanam", cost: "INR 300" }
      ],
      booking_notes: "Online booking available for Aarti and Sugam Darshanam. Identification required.",
      approx_cost: "Free - INR 300",
      identification_required: true
    },
    prasads: ["Bhang", "Thandai", "Pedas"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "The most significant festival, attracting millions of devotees." },
      { name: "Dev Deepawali", date_or_period: "November", description: "Festival of lights for the Gods, celebrated on the ghats of Ganga." }
    ]
  },
  {
    id: "kedarnath",
    name: "Kedarnath Temple",
    location: {
      city: "Kedarnath",
      district: "Rudraprayag",
      state: "Uttarakhand",
      country: "India",
      coordinates: { latitude: 30.7352, longitude: 79.0669 }
    },
    category: ["Char Dham", "Jyotilinga", "Shaiva"],
    deity: "Lord Shiva (Kedarnath)",
    description: "One of the twelve Jyotilinga shrines of Shiva and part of the Char Dham pilgrimage. Situated high in the Garhwal Himalayas, it is accessible only for a few months a year.",
    history_summary: "The temple is believed to have been built by the Pandavas and revived by Adi Shankara in the 8th century. It is a prime example of ancient Hindu architecture in the Himalayas, built with massive stone slabs on a rectangular platform.",
    interesting_facts: [
      "The temple is located at an altitude of 3,583 meters (11,755 ft) and is only accessible for about six months a year due to extreme weather.",
      "The idol is a conical rock formation, worshipped as the hind part of a bull, representing Lord Shiva.",
      "It is one of the Char Dham pilgrimage sites of India."
    ],
    architecture_style: "North Indian (Himadri)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277047/IMG_20250526_174550_rwwtmz.jpg", alt: "Kedarnath Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277048/IMG_20250526_174633_kcwl8g.jpg", alt: "Kedarnath Jyotilinga" }
    ],
    famous_for: ["Char Dham", "Jyotilinga", "Himalayan pilgrimage"],
    rituals_practices: ["Darshan", "Rudrabhishek"],
    visiting_hours: "May to October (seasonal)",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for darshan. Pilgrimage highly dependent on weather conditions.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Bael Patra", "Dry Fruits"],
    festivals: [
      { name: "Opening and Closing Ceremony", date_or_period: "May/June (opening), October/November (closing)", description: "Grand ceremonies marking the beginning and end of the pilgrimage season." }
    ]
  },
  {
    id: "trimbakeshwar",
    name: "Trimbakeshwar Jyotilinga",
    location: {
      city: "Trimbak",
      district: "Nashik",
      state: "Maharashtra",
      country: "India",
      coordinates: { latitude: 19.9329, longitude: 73.5350 }
    },
    category: ["Jyotilinga"],
    deity: "Lord Shiva (Trimbakeshwar)",
    description: "One of the twelve Jyotilinga shrines, located at the source of the Godavari River. It is unique for having three lingams representing Brahma, Vishnu, and Shiva.",
    history_summary: "The current temple was constructed by Peshwa Balaji Baji Rao in the 18th century, replacing an older shrine. It is known for its intricate sculptures and the unique three-faced lingam.",
    interesting_facts: [
      "The Jyotilinga here has three faces representing Lord Brahma, Lord Vishnu, and Lord Shiva.",
      "It is the source of the Godavari River, one of India's longest rivers.",
      "The temple is a major site for performing 'Kala Sarpa Dosha Puja' (a ritual to alleviate planetary afflictions)."
    ],
    architecture_style: "Nagara",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277101/IMG_20250526_174759_xja8ya.jpg", alt: "Trimbakeshwar Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277101/IMG_20250526_174826_ltabso.jpg", alt: "Trimbakeshwar Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748278865/Nama_Shivaya_st8oys.mp3",
    famous_for: ["Three-faced lingam", "Source of Godavari River"],
    rituals_practices: ["Daily pujas", "Kala Sarpa Dosha Puja"],
    visiting_hours: "5:30 AM - 9:00 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for general darshan. Special pujas may require on-site booking.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Modak", "Coconut"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Major festival dedicated to Lord Shiva." },
      { name: "Simhastha Kumbh Mela", date_or_period: "Every 12 years", description: "One of the largest Hindu pilgrimages, held in Nashik." }
    ]
  },
  {
    id: "jambukeshwar",
    name: "Jambukeswarar Temple, Thiruvanaikaval",
    location: {
      city: "Thiruvanaikaval",
      district: "Tiruchirappalli",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 10.8350, longitude: 78.7050 }
    },
    category: ["Pancha Bhoota Stalam (Water)", "Atma Linga"],
    deity: "Lord Shiva (Jambukeswarar)",
    description: "One of the five major Shiva Temples in Tamil Nadu representing the 'Pancha Bhoota' (five great elements) - specifically, water. The sanctum has an underground spring.",
    history_summary: "Built by Kocengannan Chola, a Chola king from the early Chola period (around 2nd century CE). The temple is known for its architectural grandeur and unique water element representation.",
    interesting_facts: [
      "The main Shiva Lingam is submerged in water, which is believed to be an underground spring that never dries up.",
      "It is one of the five Pancha Bhoota Stalams, representing the element of water (Appu Lingam).",
      "The temple's architecture allows for a unique 'reverberation' effect due to its acoustic design."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277159/IMG_20250526_175409_burwa5.jpg", alt: "Jambukeswarar Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277162/IMG_20250526_175450_fitjnq.jpg", alt: "Jambukeswarar Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748278760/Lord_Shiva_Theme_cdtz8k.mp3",
    famous_for: ["Appu Lingam (Water)", "Architectural beauty"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "5:30 AM - 1:00 PM, 4:00 PM - 9:00 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Sweet Pongal", "Vibhuti"],
    festivals: [
      { name: "Panguni Uthiram", date_or_period: "March/April", description: "A significant festival celebrated with special rituals." },
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Observed with great devotion." }
    ]
  },
  {
    id: "arunachaleswara",
    name: "Arunachaleswara Temple, Tiruvannamalai",
    location: {
      city: "Tiruvannamalai",
      district: "Tiruvannamalai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.2263, longitude: 79.0718 }
    },
    category: ["Pancha Bhoota Stalam (Fire)", "Atma Linga", "Shaiva", "Ashta Lingam"], // Added Ashta Lingam
    deity: "Lord Shiva (Arunachaleswara)",
    description: "A massive temple dedicated to Lord Shiva, representing the element of fire. It is one of the Pancha Bhoota Stalams. It is also considered the Agni Lingam among the Ashta Lingams of Arunachala.",
    history_summary: "The temple complex is one of the largest in India, with its earliest parts dating back to the 9th century. Subsequent additions were made by the Cholas, Pandyas, and Vijayanagara kings, who contributed to its towering gopurams and vast courtyards.",
    interesting_facts: [
      "It is one of the five Pancha Bhoota Stalams, representing the element of fire (Agni Lingam).",
      "The Arunachala hill itself is considered a manifestation of Lord Shiva.",
      "The 'Girivalam' (circumambulation of the hill) on full moon nights attracts millions of devotees."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277213/IMG_20250526_175622_e3dxsm.jpg", alt: "Arunachaleswara Temple Gopuram" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277212/IMG_20250526_175553_v7n1xs.jpg", alt: "Arunachaleswara Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748278258/Shiva_Ultimate_mtiokf.mp3",
    famous_for: ["Agni Lingam (Fire)", "Karthigai Deepam", "Girivalam", "Ashta Lingam"],
    rituals_practices: ["Daily pujas", "Girivalam (circumambulation of the hill)"],
    visiting_hours: "5:30 AM - 12:30 PM, 3:30 PM - 9:30 PM",
    entry_fee: "Free",
    website: "https://annamalaiyar.hrce.tn.gov.in/",
    darshan_tickets: {
      is_available_online: false, // As per current info, general darshan is free and no online booking for it
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. Special pujas may require on-site booking.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Vibhuti", "Kumkum"],
    festivals: [
      { name: "Karthigai Deepam", date_or_period: "November/December", description: "A grand festival of lights, where a huge lamp is lit on the Arunachala hill." },
      { name: "Girivalam", date_or_period: "Full Moon days", description: "Circumambulation of the Arunachala hill, a highly revered spiritual practice." }
    ]
  },
  {
    id: "srikalahasteeswara",
    name: "Srikalahasteeswara Temple, Srikalahasti",
    location: {
      city: "Srikalahasti",
      district: "Chittoor",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.7499, longitude: 79.7909 }
    },
    category: ["Pancha Bhoota Stalam (Air)", "Atma Linga", "Shaiva"],
    deity: "Lord Shiva (Vayu Lingam)",
    description: "One of the Pancha Bhoota Stalams, representing the element of Vayu (air). It is famous for Rahu-Ketu Sarpa Dosha Nivarana pujas.",
    history_summary: "The temple has ancient origins, with contributions from the Chola and Vijayanagara empires. It is mentioned in ancient texts like the Skanda Purana. The current structure was largely built by the Chola king Kulottunga Chola I and the Vijayanagara emperor Krishnadevaraya.",
    interesting_facts: [
      "It is one of the five Pancha Bhoota Stalams, representing the element of air (Vayu Lingam).",
      "The flame inside the sanctum constantly flickers despite no air movement, symbolizing the Vayu Lingam.",
      "It is a prominent temple for performing Rahu-Ketu Sarpa Dosha Nivarana pujas to alleviate planetary afflictions."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277289/IMG_20250526_175814_ff5z4y.jpg", alt: "Srikalahasteeswara Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277290/IMG_20250526_175850_aqqcgw.jpg", alt: "Srikalahasteeswara Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748278820/Lord_Shiva_Theme_zwktsv.mp3",
    famous_for: ["Vayu Lingam", "Rahu-Ketu Puja"],
    rituals_practices: ["Daily pujas", "Rahu-Ketu Puja"],
    visiting_hours: "6:00 AM - 9:00 PM",
    entry_fee: "Free (special pujas have fees)",
    website: "https://srikalahasthitemple.com/",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://srikalahasthitemple.com/online-booking",
      types_of_darshan: [
        { name: "Rahu-Ketu Sarpa Dosha Nivarana Puja", cost: "Varies" },
        { name: "Laghu Darshanam", cost: "Free" }
      ],
      booking_notes: "Specific pujas like Rahu-Ketu can be booked online.",
      approx_cost: "Free - Varies",
      identification_required: false
    },
    prasads: ["Laddu", "Pulihora"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Major festival celebrated with special rituals." },
      { name: "Rahu Ketu Puja Days", date_or_period: "Daily (specific timings)", description: "Special pujas performed to alleviate planetary doshas." }
    ]
  },
  {
    id: "ekambareswar",
    name: "Ekambareswarar Temple, Kanchipuram",
    location: {
      city: "Kanchipuram",
      district: "Kanchipuram",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.8340, longitude: 79.7000 }
    },
    category: ["Pancha Bhoota Stalam (Earth)", "Atma Linga", "Shaiva"],
    deity: "Lord Shiva (Ekambareswarar)",
    description: "One of the five major Shiva Temples in Tamil Nadu representing the 'Pancha Bhoota' (five great elements) - specifically, Earth. It has a 3,500-year-old mango tree.",
    history_summary: "The temple has been in existence since at least 600 AD and has been renovated and expanded by various dynasties including the Pallavas, Cholas, and Vijayanagara kings. The current masonry structure was built during the Pallava dynasty.",
    interesting_facts: [
      "It is one of the five Pancha Bhoota Stalams, representing the element of earth (Prithvi Lingam).",
      "The temple houses a 3,500-year-old mango tree, believed to be sacred, under which Goddess Parvati performed penance.",
      "The temple has 1,000-pillared hall and a towering gopuram, one of the tallest in South India."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277362/IMG_20250526_180044_yt5lgj.jpg", alt: "Ekambareswarar+Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748259500/IMG_20250526_170345_ghqj1b.jpg", alt: "Ekambareswarar Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748278282/Om_Triambakam_mw7iqi.mp3",
    famous_for: ["Prithvi Lingam (Earth)", "Ancient Mango Tree"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Sweet Pongal", "Vibhuti"],
    festivals: [
      { name: "Panguni Uthiram", date_or_period: "March/April", description: "Annual festival celebrated with a grand procession." },
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Special pujas and celebrations." }
    ]
  },
  {
    id: "nataraja",
    name: "Nataraja Temple, Chidambaram",
    location: {
      city: "Chidambaram",
      district: "Cuddalore",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 11.3996, longitude: 79.6935 }
    },
    category: ["Pancha Bhoota Stalam (Sky)", "Atma Linga", "Shaiva"],
    deity: "Lord Shiva (Nataraja - the cosmic dancer)",
    description: "An ancient Hindu temple dedicated to Lord Shiva as Nataraja. It is one of the five Pancha Bhoota Stalams, representing the element of Aakash (sky/ether).",
    history_summary: "The temple has a rich history dating back to the Chola period, with significant renovations and expansions by various dynasties. The Chola kings were great patrons of this temple.",
    interesting_facts: [
      "It is one of the five Pancha Bhoota Stalams, representing the element of Aakash (sky/ether).",
      "The temple is unique as Lord Shiva is worshipped here in his Ananda Tandava (cosmic dance) form as Nataraja.",
      "The 'Chidambaram Rahasyam' (secret of Chidambaram) is a philosophical representation of the formless aspect of God."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277595/1000402677_optimized_9000_a3tvi4.png", alt: "Nataraja Temple Gopuram" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748277434/IMG_20250526_180318_eas6sg.jpg", alt: "Nataraja Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748278735/Rudra_11_hz6uvm.mp3",
    famous_for: ["Akasha Lingam (Sky)", "Cosmic Dance of Shiva", "Chidambaram Rahasyam"],
    rituals_practices: ["Daily pujas", "Arudra Darshanam"],
    visiting_hours: "6:00 AM - 12:00 PM, 5:00 PM - 10:00 PM",
    entry_fee: "Free",
    website: "http://www.chidambaramnataraja.org/",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for general darshan.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Vibhuti", "Kumkum"],
    festivals: [
      { name: "Arudra Darshanam", date_or_period: "December/January", description: "A major festival celebrating Lord Nataraja's cosmic dance." },
      { name: "Ani Thirumanjanam", date_or_period: "June/July", description: "Another significant festival for Lord Nataraja." }
    ]
  },
  // --- NEW 18 MAHA SHAKTI PEETHAS ENTRIES ---

  // 1. Sankari Devi (Trincomalee, Sri Lanka) - Note: This is geographically outside India
  {
    id: "sankari-devi-sri-lanka",
    name: "Sankari Devi Temple",
    location: {
      city: "Trincomalee",
      district: "Trincomalee",
      state: "Eastern Province,SriLanka", // Placeholder, as it's a different country
      country: "Sri Lanka",
      coordinates: { latitude: 8.5794, longitude: 81.2330 } // Approximate for Koneswaram Temple area
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Sankari Devi",
    description: "One of the 18 Maha Shakti Peethas, where it is believed that the root of the Goddess's tongue fell. The original temple was largely destroyed, and a new one stands in its place.",
    history_summary: "The original temple is believed to have been destroyed by Portuguese colonists. The current temple is a reconstruction on or near the historic site, revered by devotees as a major Shakti Peetha.",
    interesting_facts: [
      "Believed to be the site where the root of Goddess Sati's tongue fell.",
      "The original temple was part of the ancient Koneswaram Temple complex.",
      "A highly revered site for devotees seeking blessings from Sankari Devi."
    ],
    architecture_style: "Dravidian (reconstructed)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619204/IMG_20250530_192216_jl3juu.jpg", alt: "Sankari Devi Temple, Trincomalee" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619201/IMG_20250530_192200_gqc1gm.jpg", alt: "Sankari Devi Temple, Sri Lanka" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748619201/Sankari_Devi_Chant_omk6qj.mp3",
    famous_for: ["Maha Shakti Peetha", "Historical significance", "Coastal location"],
    rituals_practices: ["Daily pujas", "Special offerings"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Grand celebrations." }
    ]
  },

  // 2. Kamakshi Devi, Kanchi (Kanchipuram, Tamil Nadu)
  {
    id: "kamakshi-devi-kanchipuram",
    name: "Kamakshi Devi Temple",
    location: {
      city: "Kanchipuram",
      district: "Kanchipuram",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.8340, longitude: 79.7000 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Kamakshi Devi (Parvati)",
    description: "A prominent Shakti Peetha dedicated to Goddess Kamakshi, a form of Parvati. It is one of the important pilgrimage sites in Kanchipuram.",
    history_summary: "The temple is ancient, believed to be the spot where Sati's navel fell. It is intricately linked with Adi Shankara, who is said to have established the Kanchi Kamakoti Peetham here. The present structure has undergone many renovations over centuries.",
    interesting_facts: [
      "One of the 51 Shakti Peethas and a very important center of Saktism.",
      "The idol of the goddess is in a Padmasana (lotus) posture, rather than the usual standing pose.",
      "Adi Shankara is said to have installed a Sri Chakra in the temple."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618831/IMG_20250530_192445_nnscnu.jpg", alt: "Kamakshi Devi Temple, Kanchipuram" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618833/IMG_20250530_192509_swxbm6.jpg", alt: "Kamakshi Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Adi Shankara connection", "Padmasana idol"],
    rituals_practices: ["Daily pujas", "Abhishekam"],
    visiting_hours: "5:30 AM - 12:30 PM, 4:00 PM - 8:30 PM",
    entry_fee: "Free",
    prasads: ["Sweet Pongal", "Saffron milk"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Grand celebrations with special pujas and processions." },
      { name: "Vasanthotsavam", date_or_period: "March/April", description: "Spring festival." }
    ]
  },
  // 3. Sri Srunkhala Devi (West Bengal) - Note: Location details are debated, often associated with West Bengal
  {
    id: "sri-srunkhala-devi-wb",
    name: "Sri Srunkhala Devi Temple",
    location: {
      city: "Ganga Sagar (or similar speculated location)", // Speculative: often associated with Ganga Sagar area
      district: "South 24 Parganas", // Placeholder
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 21.6400, longitude: 88.0300 } // Approximate for Ganga Sagar
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Srunkhala Devi",
    description: "Believed to be one of the Maha Shakti Peethas, where the belly or a part of the waist of Goddess Sati fell. The exact location is a subject of debate among scholars.",
    history_summary: "The exact location and a definitive temple for Srunkhala Devi are subjects of scholarly debate, with various proposed sites across India. This entry represents the general belief of a Shakti Peetha associated with West Bengal.",
    interesting_facts: [
      "One of the 18 Maha Shakti Peethas, though its precise location is debated.",
      "Often associated with ancient Bengal region."
    ],
    architecture_style: "Not specifically defined (if current temple exists, it would be regional)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619577/IMG_20250530_192852_gbrzmv.jpg", alt: "Sri Srunkhala Devi Temple, West Bengal" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619573/IMG_20250530_192825_zhuswv.jpg", alt: "Sri Srunkhala Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Maha Shakti Peetha"],
    rituals_practices: ["As per local traditions"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Observed with devotion." }
    ]
  },

  // 4. Chamundeswari Devi, Mysore (Karnataka)
  {
    id: "chamundeshwari-devi-mysore",
    name: "Chamundeshwari Devi Temple",
    location: {
      city: "Mysore",
      district: "Mysore",
      state: "Karnataka",
      country: "India",
      coordinates: { latitude: 12.2773, longitude: 76.6856 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Chamundeshwari (Durga)",
    description: "A powerful Shakti Peetha dedicated to Goddess Chamundeshwari, a fierce form of Durga. It is located atop Chamundi Hills and is highly revered by devotees.",
    history_summary: "The temple's origins date back to the 11th century, with significant patronage from the Wodeyar rulers of Mysore. It is believed that Sati's hair fell here. The current gopuram was built by Krishnaraja Wodeyar III in the 19th century.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's hair is believed to have fallen.",
      "The temple is named after Chamundeshwari, who slew the demon Mahishasura.",
      "The statue of Nandi (Shiva's bull) on the 700th step is a significant landmark."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618634/1000406132_optimized_9000_smgzmy.png", alt: "Chamundeshwari Devi Temple, Mysore" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748617600/IMG_20250529_084127_bg6vub.jpg", alt: "Chamundeshwari Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Dussehra celebrations", "Hilltop temple"],
    rituals_practices: ["Daily pujas", "Chamundi Vahana Procession"],
    visiting_hours: "7:00 AM - 2:00 PM, 3:30 PM - 6:00 PM, 7:30 PM - 9:00 PM",
    entry_fee: "Free (special entry tickets available)",
    prasads: ["Sweet Pongal", "Ksheeranna"],
    festivals: [
      { name: "Mysore Dasara", date_or_period: "September/October", description: "Grandest festival, with the goddess idol taken in a procession on a golden howdah." },
      { name: "Navaratri", date_or_period: "September/October", description: "Special pujas for nine nights." }
    ]
  },

  // 5. Jogulamba Devi, Alampur (Telangana)
  {
    id: "jogulamba-devi-alampur",
    name: "Jogulamba Devi Temple",
    location: {
      city: "Alampur",
      district: "Jogulamba Gadwal",
      state: "Telangana",
      country: "India",
      coordinates: { latitude: 15.8600, longitude: 78.1500 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Jogulamba Devi",
    description: "One of the 18 Maha Shakti Peethas, where the upper jaw with tooth of Goddess Sati is believed to have fallen. It is part of the Navabrahma Temples complex.",
    history_summary: "The original temple was destroyed by Bahmani Sultans in the 14th century, and the idol was shifted to the Bala Brahma Temple. A new temple was constructed in 2005. The site is historically significant with temples dating back to the Chalukya period.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's upper jaw with teeth fell.",
      "Part of the Alampur Navabrahma Temples, a group of nine Shiva temples.",
      "The Goddess is depicted in a fierce form, sitting on a corpse with a scorpion, frog, and lizard."
    ],
    architecture_style: "Chalukyan (new temple: modern adaptation)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618736/IMG_20250530_193721_swisrv.jpg", alt: "Jogulamba Devi Temple, Alampur" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618733/Alampur-Jogulamba-Temple-Gadwal-History-Timings-Ticket-Price_f2ywu9.jpg", alt: "Jogulamba Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Navabrahma Temples", "Fierce deity"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 1:00 PM, 3:00 PM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Special celebrations." },
      { name: "Shivaratri", date_or_period: "February/March", description: "Observed in the complex." }
    ]
  },

  // 6. Srisailam Bramarambika (Andhra Pradesh) - Already in your data as part of Mallikarjuna
  // This entry is already covered by the 'mallikarjuna' entry in your `templesData` under Andhra Pradesh,
  // where Bramarambha Devi is mentioned as the Shakti Peetha deity.
  // I will add a separate entry as requested, linking it to the existing Mallikarjuna if possible or creating a new one if not.
  {
    id: "bramarambika-srisailam",
    name: "Bramarambika Devi Temple, Srisailam",
    location: {
      city: "Srisailam",
      district: "Kurnool",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.0718, longitude: 78.8679 } // Same as Mallikarjuna
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Bramarambika Devi (Parvati)",
    description: "A revered Shakti Peetha within the Mallikarjuna Jyotilinga temple complex, where it is believed that the neck of Goddess Sati fell. She is worshipped as Bramarambika, the Mother of Bees.",
    history_summary: "This temple is an integral part of the ancient Srisailam temple complex, dating back centuries. The legend of Bramarambika describes her taking the form of bees to defeat a demon. It is one of the only two temples that is both a Jyotilinga and a Shakti Peetha.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's neck is believed to have fallen.",
      "The Goddess is worshipped as Bramarambika, associated with bees.",
      "This temple is unique as it is a Shakti Peetha co-located with a Jyotilinga (Mallikarjuna)."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748617527/IMG_20250529_081857_cuht10.jpg", alt: "Bramarambika Devi Temple, Srisailam" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748617528/IMG_20250529_081918_qt6xvk.png", alt: "Bramarambika Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Jyotilinga combination", "Bramarambika legend"],
    rituals_practices: ["Daily pujas", "Kumkumarchana"],
    visiting_hours: "6:00 AM - 10:00 PM",
    entry_fee: "Free",
    prasads: ["Kumkum", "Sweets"],
    festivals: [
      { name: "Dasara (Navaratri)", date_or_period: "September/October", description: "Grand celebrations for Goddess Bramarambika." },
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Combined celebration with Lord Mallikarjuna." }
    ]
  },

  // 7. Mahalakshmi Devi, Kolhapur (Maharashtra)
  {
    id: "mahalakshmi-devi-kolhapur",
    name: "Mahalakshmi Devi Temple, Kolhapur",
    location: {
      city: "Kolhapur",
      district: "Kolhapur",
      state: "Maharashtra",
      country: "India",
      coordinates: { latitude: 16.7000, longitude: 74.2300 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Mahalakshmi (Ambabai)",
    description: "A significant Shakti Peetha dedicated to Goddess Mahalakshmi (Ambabai), the Goddess of Wealth. It is one of the most revered temples in Maharashtra.",
    history_summary: "The temple's origins date back to the Chalukya period (7th century CE). It has been extensively patronized by various dynasties, including the Silaharas and Marathas. The temple is known for its architectural beauty and spiritual energy.",
    interesting_facts: [
      "Considered one of the 18 Maha Shakti Peethas, believed to be where Sati's eyes fell.",
      "The temple complex has shrines of other deities like Navagrahas and various Shiva Lingams.",
      "It is one of the three and a half Shakti Peethas of Maharashtra (Kolhapur, Tuljapur, Renuka, and Saptashringi)."
    ],
    architecture_style: "Chalukyan, Hemadpanthi",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619059/IMG_20250530_194532_eikmxk.jpg", alt: "Mahalakshmi Devi Temple, Kolhapur" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619059/IMG_20250530_194458_ztwnha.jpg", alt: "Mahalakshmi Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Goddess of Wealth", "Historical architecture"],
    rituals_practices: ["Daily pujas", "Mahalakshmi Utsav"],
    visiting_hours: "4:00 AM - 10:00 PM",
    entry_fee: "Free",
    prasads: ["Coconut", "Sweets"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Grand nine-day celebrations with special alankarams (decorations)." },
      { name: "Kiranotsav", date_or_period: "Jan/Nov (specific days)", description: "Sun rays fall on the deity's idol at sunrise/sunset on specific days." }
    ]
  },

  // 8. Ekaveerika Devi, Nanded (Maharashtra)
  {
    id: "ekaveerika-devi-nanded",
    name: "Ekaveerika Devi Temple",
    location: {
      city: "Mahur", // Specific location within Nanded district
      district: "Nanded",
      state: "Maharashtra",
      country: "India",
      coordinates: { latitude: 19.8200, longitude: 77.9200 } // Approximate for Mahur
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Ekaveerika Devi (Renuka Devi)",
    description: "One of the Maha Shakti Peethas, located in Mahur, believed to be where the right shoulder of Goddess Sati fell. It is associated with Renuka Devi, mother of Parashuram.",
    history_summary: "The temple is ancient and deeply connected with the legend of Renuka Devi. It is a significant pilgrimage site for devotees seeking blessings for protection and prosperity.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's right shoulder is believed to have fallen.",
      "Associated with Renuka Devi, revered as the mother of Lord Parashuram.",
      "The temple is located on a hilltop, offering scenic views."
    ],
    architecture_style: "Traditional Maharashtrian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748617724/IMG_20250530_194808_yf40ui.jpg", alt: "Ekaveerika Devi Temple, Nanded" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748617724/IMG_20250530_194829_muzemm.jpg", alt: "Ekaveerika Devi Jyotilinga" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Renuka Devi", "Parashuram connection"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Special celebrations." }
    ]
  },

  // 9. Mahakali Devi, Ujjain (Madhya Pradesh) - Already part of Mahakaleshwar Jyotilinga
  // This entry is already covered by the 'mahakaleshwar' entry in your `templesData` under Madhya Pradesh,
  // where Mahakali Devi is mentioned as the Shakti Peetha deity.
  // I will add a separate entry as requested, linking it to the existing Mahakaleshwar if possible or creating a new one if not.
  {
    id: "mahakali-devi-ujjain",
    name: "Mahakali Devi Temple, Ujjain",
    location: {
      city: "Ujjain",
      district: "Ujjain",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 23.1795, longitude: 75.7656 } // Same as Mahakaleshwar
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Mahakali Devi",
    description: "A revered Shakti Peetha within the Mahakaleshwar Jyotilinga temple complex, believed to be where the upper lip of Goddess Sati fell. She is worshipped as Mahakali, the fierce form of Durga.",
    history_summary: "This Shakti Peetha is an integral part of the ancient Mahakaleshwar temple. The site has deep historical and religious significance, attracting devotees of both Shiva and Shakti.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's upper lip is believed to have fallen.",
      "It is co-located with the Dakshinamukhi Mahakaleshwar Jyotilinga, making it a highly auspicious site.",
      "The presence of both a Jyotilinga and Shakti Peetha makes it a unique pilgrimage destination."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619003/IMG_20250530_195433_moqi8a.jpg", alt: "Mahakali Devi Temple, Ujjain" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618999/IMG_20250526_161427_qbzu1f.jpg", alt: "Mahakali Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Jyotilinga combination", "Fierce deity"],
    rituals_practices: ["Daily pujas", "Kumkumarchana"],
    visiting_hours: "3:00 AM - 11:00 PM",
    entry_fee: "Free",
    prasads: ["Coconut", "Sweets"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Special celebrations for the Goddess." },
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Combined celebration with Lord Shiva." }
    ]
  },

  // 10. Puruthika Devi, Pithapuram (Andhra Pradesh)
  {
    id: "puruhutika-devi-pithapuram",
    name: "Puruhutika Devi Temple",
    location: {
      city: "Pithapuram",
      district: "Kakinada", // Formerly East Godavari
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 17.1147, longitude: 82.2619 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Puruhutika Devi",
    description: "One of the 18 Maha Shakti Peethas, located in Pithapuram, where it is believed that the left hand of Goddess Sati fell. The temple is part of the Kukkuteswara Swamy temple complex.",
    history_summary: "The temple has ancient origins, mentioned in various puranas and sthalapuranas. It is a revered pilgrimage site for devotees of Goddess Shakti. The complex also houses a significant Shiva temple.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's left hand is believed to have fallen.",
      "Part of the Kukkuteswara Swamy temple complex, which has a huge Nandi statue.",
      "It is believed that Lord Dattatreya performed penance here."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619109/IMG_20250529_081458_btvx8c.jpg", alt: "Puruhutika Devi Temple, Pithapuram" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619104/IMG_20250529_081437_fk9ybe.jpg", alt: "Puruhutika Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Dattatreya connection", "Ancient site"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Special celebrations." }
    ]
  },

  // 11. Viraja Devi, Jajpur (Odisha) - Used your "Biraja Devi" spelling
  {
    id: "biraja-devi-jaipur-odisha",
    name: "Biraja Devi Temple",
    location: {
      city: "Jajpur",
      district: "Jajpur",
      state: "Odisha",
      country: "India",
      coordinates: { latitude: 20.8400, longitude: 86.3200 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Biraja Devi (Durga)",
    description: "A prominent Shakti Peetha in Jajpur, Odisha, where it is believed that the navel of Goddess Sati fell. The idol is a two-armed Durga piercing the chest of a buffalo demon.",
    history_summary: "The temple is very ancient, with its origins dating back to the 5th century CE. It has been a significant center of Shaktism and Tantrism. The current structure has seen additions and renovations over centuries.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's navel is believed to have fallen.",
      "The Goddess is worshipped as a two-armed Mahishamardini (slayer of buffalo demon).",
      "The temple features unique rituals, including 'Bali Yatra' (animal sacrifice)."
    ],
    architecture_style: "Kalinga",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618691/IMG_20250529_083655_r8vtlb.jpg", alt: "Biraja Devi Temple, Jajpur" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618694/IMG_20250529_083728_uhhw7p.jpg", alt: "Biraja Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Mahishamardini idol", "Kalinga architecture"],
    rituals_practices: ["Daily pujas", "Bali Yatra"],
    visiting_hours: "5:00 AM - 9:00 PM",
    entry_fee: "Free",
    prasads: ["Sweets", "Cooked food"],
    festivals: [
      { name: "Sharadiya Durga Puja", date_or_period: "September/October", description: "Grand celebrations during Navaratri." },
      { name: "Raja Parba", date_or_period: "June", description: "Three-day festival for women." }
    ]
  },

  // 12. Kamarupa Devi, Guwahati (Assam) - Kamakhya Temple
  {
    id: "kamakhya-devi-guhwati",
    name: "Kamakhya Devi Temple",
    location: {
      city: "Guwahati",
      district: "Kamrup Metropolitan",
      state: "Assam",
      country: "India",
      coordinates: { latitude: 26.1600, longitude: 91.7000 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple", "Tantric", "Maha Shakti Peetha"],
    deity: "Goddess Kamakhya Devi (Sati)",
    description: "One of the most powerful and revered Shakti Peethas, located on the Nilachal Hills. It is unique for not having a sculpted image of the deity, but a yoni-shaped rock from which water emerges.",
    history_summary: "The temple is ancient, believed to be the site where Sati's yoni (vagina) fell. It was destroyed and rebuilt several times, notably by King Naranarayana of the Koch dynasty in the 16th century. It is a major center for Tantric worship.",
    interesting_facts: [
      "Considered the most sacred of the Shakti Peethas, where Sati's yoni (womb/vulva) is believed to have fallen.",
      "The temple has no idol; a yoni-shaped stone from which a perennial spring flows is worshipped.",
      "The temple is associated with the annual Ambubachi Mela, a fertility festival."
    ],
    architecture_style: "Nilachal Style",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618885/IMG_20250527_081605_qn0hkm.jpg", alt: "Kamakhya Devi Temple, Guwahati" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618883/IMG_20250527_081522_s27s7v.jpg", alt: "Kamakhya Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Tantric worship", "Ambubachi Mela", "Yoni worship"],
    rituals_practices: ["Daily pujas", "Animal sacrifice (limited)", "Tantric rituals"],
    visiting_hours: "5:30 AM - 1:00 PM, 2:30 PM - 5:30 PM",
    entry_fee: "Free (special entry tickets available)",
    prasads: ["Sweets", "Chunri"],
    festivals: [
      { name: "Ambubachi Mela", date_or_period: "June", description: "A major annual festival celebrating the menstruation of Goddess Kamakhya." },
      { name: "Durga Puja", date_or_period: "October", description: "Grand celebrations." }
    ]
  },

  // 13. Madhaveswari, Prayaga (Prayagraj, Uttar Pradesh)
  {
    id: "madhaveswari-devi-prayagraj",
    name: "Madhaveswari Devi Temple",
    location: {
      city: "Prayagraj (Allahabad)",
      district: "Prayagraj",
      state: "Uttar Pradesh",
      country: "India",
      coordinates: { latitude: 25.4358, longitude: 81.8463 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Madhaveswari Devi (Alopi Devi)",
    description: "One of the Maha Shakti Peethas, located near the confluence of Ganga, Yamuna, and Saraswati rivers. It is believed that the fingers of Goddess Sati's hand fell here. The deity is worshipped as 'Alopi' (one who disappeared).",
    history_summary: "The temple is ancient and part of the sacred pilgrimage circuit of Prayagraj. It is unique as there is no idol, but a wooden palanquin (doli) is worshipped, symbolizing the disappearance of the body part.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's fingers (or other body parts) are believed to have fallen.",
      "The deity is not an idol but a wooden palanquin, symbolizing 'Alopi' (disappeared).",
      "Located in the sacred city of Prayagraj, known for the Triveni Sangam (confluence of three rivers)."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618948/IMG_20250529_082407_jba3xv.jpg", alt: "Madhaveswari Devi Temple, Prayagraj" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618945/IMG_20250529_082345_sq2lmh.jpg", alt: "Madhaveswari Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Alopi Devi", "Triveni Sangam"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Special celebrations." },
      { name: "Kumbh Mela (Ardh Kumbh/Maha Kumbh)", date_or_period: "Every 6/12 years", description: "Major pilgrimage event." }
    ]
  },

  // 14. Jwala Vaishnavi Devi (Kangra, Himachal Pradesh) - Already in your data as Vaishnavi Devi Temple
  // This entry is already covered by the 'vaishnavi-devi' entry in your `templesData` under Himachal Pradesh,
  // where the deity is already listed.
  // I will add a separate entry as requested for completeness, cross-referencing to the existing one.
  {
    id: "jwala-vaishnavi-devi-kangra",
    name: "Jwala Devi Temple, Kangra",
    location: {
      city: "Jawalamukhi", // Specific location within Kangra
      district: "Kangra",
      state: "Himachal Pradesh",
      country: "India",
      coordinates: { latitude: 31.8700, longitude: 76.2200 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Jwala Devi",
    description: "A unique Shakti Peetha where the deity is worshipped in the form of natural flames burning through fissures in the rock. It is believed to be where Sati's tongue fell.",
    history_summary: "The temple is ancient, with references in various Hindu scriptures. The natural gas flames are considered manifestations of the Goddess. The Mughal emperor Akbar is said to have visited and attempted to extinguish the flames, but failed.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's tongue is believed to have fallen.",
      "The deity is worshipped in the form of nine perpetual natural flames emanating from the rock.",
      "There is no idol, only the flames are worshipped."
    ],
    architecture_style: "Traditional Himachali",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618783/IMG_20250530_200358_ygfmex.jpg", alt: "Jwala Devi Temple, Kangra" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748618784/IMG_20250530_200421_fjxqh5.jpg", alt: "Jwala Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Natural flames", "No idol worship"],
    rituals_practices: ["Daily pujas", "Aarti"],
    visiting_hours: "5:00 AM - 12:00 PM, 1:00 PM - 10:00 PM",
    entry_fee: "Free",
    prasads: ["Sweets", "Coconut"],
    festivals: [
      { name: "Navaratri", date_or_period: "March/April and September/October", description: "Grand celebrations." }
    ]
  },

  // 15. Sarvamangala Devi, Gaya (Bihar)
  {
    id: "sarvamangala-devi-gaya",
    name: "Sarvamangala Devi Temple",
    location: {
      city: "Gaya",
      district: "Gaya",
      state: "Bihar",
      country: "India",
      coordinates: { latitude: 24.7800, longitude: 84.9900 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Sarvamangala Devi",
    description: "One of the Maha Shakti Peethas, located in Gaya, Bihar. It is believed that the breasts of Goddess Sati fell here. The temple is an important pilgrimage site for devotees.",
    history_summary: "The temple has ancient origins, mentioned in various Hindu scriptures related to Gaya. It is a significant site for both Pinda Daan (ancestral rites) and Devi worship.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's breasts are believed to have fallen.",
      "Located in Gaya, a major pilgrimage center for ancestral rites (Pinda Daan).",
      "The temple is often visited by pilgrims performing rites for their ancestors."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619296/IMG_20250530_200601_rhgedv.jpg", alt: "Sarvamangala Devi Temple, Gaya" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619299/IMG_20250530_200647_jhs64m.jpg", alt: "Sarvamangala Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Gaya pilgrimage"],
    rituals_practices: ["Daily pujas", "Offerings"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Special celebrations." }
    ]
  },

  // 16. Vishalakshi Devi, Varanasi (Uttar Pradesh)
  {
    id: "vishalakshi-devi-varanasi",
    name: "Vishalakshi Devi Temple",
    location: {
      city: "Varanasi",
      district: "Varanasi",
      state: "Uttar Pradesh",
      country: "India",
      coordinates: { latitude: 25.3176, longitude: 82.9739 } // Approximate for Vishwanath Gali area
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Vishalakshi Devi (Parvati)",
    description: "A prominent Shakti Peetha in the sacred city of Varanasi, believed to be where the eyes of Goddess Sati fell. It is located near the famous Kashi Vishwanath Temple.",
    history_summary: "The temple is ancient, mentioned in various Puranas and connected to the spiritual history of Varanasi. It is a vital part of the pilgrimage circuit in Kashi.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's eyes are believed to have fallen.",
      "Located in the holy city of Varanasi, often called the 'City of Light' and a center of spiritual learning.",
      "Pilgrims often visit this temple along with Kashi Vishwanath Temple."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619807/1000406142_2723_4096_sdpujm.jpg", alt: "Vishalakshi Devi Temple, Varanasi" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619639/IMG_20250529_082739_f5cszf.jpg", alt: "Vishalakshi Devi" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Varanasi pilgrimage", "Eyes of Sati"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Grand celebrations." },
      { name: "Shivratri", date_or_period: "February/March", description: "Observed due to proximity to Vishwanath Temple." }
    ]
  },

  // 17. Saraswathi Devi, Kashmir (Jammu and Kashmir) - Usually refers to Sharada Peeth
  // This entry is already covered by the 'sharada-peeth' entry in your `templesData` under Jammu & Kashmir.
  // I will add a separate entry as requested for completeness, cross-referencing to the existing one.
  {
    id: "saraswathi-devi-kashmir",
    name: "Saraswati Devi Temple, Kashmir (Sharada Peeth)",
    location: {
      city: "Kashmir Region", // Often referred to as in Pakistan Administered Kashmir
      district: "Neelum District", // Placeholder, in PoK
      state: "Jammu and Kashmir", // As per Indian claim
      country: "India", // As per Indian claim
      coordinates: { latitude: 34.7930, longitude: 74.0040 } // Approximate for Sharada Peeth
    },
    category: ["Shakti Peetha", "Devi Temple", "Maha Shakti Peetha"],
    deity: "Goddess Saraswati Devi",
    description: "A highly revered Shakti Peetha and ancient center of learning dedicated to Goddess Saraswati, believed to be where Sati's right hand fell. The original temple is currently in ruins.",
    history_summary: "Sharada Peeth was one of the greatest ancient universities and temple complexes in Indian history, comparable to Nalanda. It was a pivotal center for the study of Hinduism, Buddhism, and grammar. The temple was damaged over centuries.",
    interesting_facts: [
      "Considered a Shakti Peetha where Sati's right hand is believed to have fallen.",
      "Was once a major ancient center of learning, comparable to Nalanda and Taxila.",
      "The temple is currently in ruins, located in Pakistan Administered Kashmir, but remains a vital pilgrimage site for Kashmiri Pandits."
    ],
    architecture_style: "Kashmiri",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619520/1000406141_4096_2731_p7flow.jpg", alt: "Sharada Peeth, Kashmir" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748619261/IMG_20250530_201032_uhgiie.jpg", alt: "Sharada Peeth Ruins" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    famous_for: ["Shakti Peetha", "Ancient university", "Saraswati worship"],
    rituals_practices: ["Prayers (limited access)"],
    visiting_hours: "N/A (due to location/access)",
    entry_fee: "N/A",
    prasads: [],
    festivals: [
      { name: "Basant Panchami", date_or_period: "January/February", description: "Dedicated to Goddess Saraswati." }
    ]
  },

  // 18. mankyamba devi temple,darksharamam,andhra pradesh
  {
    id: "manikyamba-devi",
    name: "Manikyamba Devi Temple",
    location: {
      city: "Draksharamam",
      district: "Konaseema",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.9068, longitude: 82.0205 }
    },
    category: ["Shakti Peetha", "Maha Shakti Peetha", "Shaiva"],
    deity: "Goddess Manikyamba",
    description: "Manikyamba Devi Temple is one of the 18 Maha Shakti Peethas, located within the Draksharama Bhimeshwara Swamy Temple complex.",
    history_summary: "It is believed that the left cheek of Goddess Sati fell here, making it one of the 18 Maha Shakti Peethas. The temple holds great spiritual importance for devotees of the Divine Mother.",
    interesting_facts: [
      "One of the 18 Maha Shakti Peethas.",
      "Located inside Draksharama Bhimeshwara Temple, a Pancharama Kshetram.",
      "A powerful center of Shakti worship in South India."
    ],
    famous_for: ["Maha Shakti Peetha", "Divine Feminine Energy", "Located inside Draksharama"],
    images: [
      {
        url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749399700/IMG_20250608_214854_i3qsr2.jpg",
        alt: "Manikyamba Devi Temple "
      },
      {
        url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749399700/Sri-manikyambaha-temple-1892284_c36fia.jpg",
        alt: "Manikyamba Devi"
      }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748688585/Aigiri_Nandini_New_tvm39p.mp3",
    rituals_practices: [
      "Kumari Pooja",
      "Chandi Homam",
      "Navaratri Special Poojas"
    ],
    visiting_hours: "6:00 AM - 8:00 PM",
    entry_fee: "Free",
    festivals: [
      {
        name: "Navaratri (Dasara)",
        date_or_period: "September – October",
        description: "9-day celebration with daily poojas and alankarams for Goddess Manikyamba."
      },
      {
        name: "Manikyamba Kalyanam",
        date_or_period: "February (Magha Bahula Ekadashi)",
        description: "The celestial wedding of Goddess Manikyamba with Lord Bhimeshwara."
      },
      {
        name: "Maha Shivaratri",
        date_or_period: "February – March",
        description: "Night-long Shiva worship with special poojas for both Shiva and Manikyamba Devi."
      },
      {
        name: "Varalakshmi Vratam",
        date_or_period: "August",
        description: "Women perform special poojas to the Goddess seeking health, wealth, and prosperity."
      }
    ]
  },


  // --- END OF NEW 18 MAHA SHAKTI PEETHAS ENTRIES ---
  {
    id: "ram-janmabhoomi",
    name: "Ram Janmabhoomi Temple",
    location: {
      city: "Ayodhya",
      district: "Ayodhya",
      state: "Uttar Pradesh",
      country: "India",
      coordinates: { latitude: 26.7953, longitude: 82.1963 }
    },
    category: ["Vaishnava", "Pilgrimage"],
    deity: "Lord Rama",
    description: "The birthplace of Lord Rama, a highly significant pilgrimage site for Hindus. The grand temple is a symbol of faith and devotion.",
    history_summary: "The site has a long and complex history, with the construction of the current temple being a monumental undertaking, fulfilling a centuries-old aspiration of devotees. The temple's design is based on traditional Nagara style architecture.",
    interesting_facts: [
      "It is the sacred birthplace of Lord Rama, a central figure in the Hindu epic Ramayana.",
      "The temple's construction involved contributions and efforts from millions of devotees across India and the world.",
      "The temple complex is designed to be a major spiritual and cultural center."
    ],
    architecture_style: "Nagara",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686035/IMG_20250531_084248_k7hzcj.png", alt: "Ram Janmabhoomi Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686033/IMG_20250531_084155_tnc82z.jpg", alt: "Ram Janmabhoomi Temple idol" }
    ],
    famous_for: ["Birthplace of Lord Rama", "Grand architecture"],
    rituals_practices: ["Daily pujas", "Ram Navami celebrations"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    website: "https://online.srjbtkshetra.org/",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://online.srjbtkshetra.org/", // Example link, might need verification
      types_of_darshan: [
        { name: "General Darshan", cost: "Free" },
        { name: "Aarti Pass", cost: "INR 100" } // Example cost, needs verification
      ],
      booking_notes: "Online booking may be available for Aarti passes. Check official website for latest updates.",
      approx_cost: "Free - INR 100+",
      identification_required: false
    },
    prasads: ["Laddus", "Panchamrit"],
    festivals: [
      { name: "Ram Navami", date_or_period: "March/April", description: "Celebrates the birth of Lord Rama with great pomp and show." },
      { name: "Deepotsav", date_or_period: "October/November", description: "Festival of lights celebrated on Diwali, with millions of lamps lit." }
    ]
  },
  {
    id: "banke-bihari",
    name: "Banke Bihari Temple",
    location: {
      city: "Vrindavan",
      district: "Mathura",
      state: "Uttar Pradesh",
      country: "India",
      coordinates: { latitude: 27.5700, longitude: 77.6700 }
    },
    category: ["Vaishnava", "Krishna Temple"],
    deity: "Lord Krishna (Banke Bihari)",
    description: "A famous Hindu temple dedicated to Lord Krishna in the form of Banke Bihari. It is one of the most revered temples in Vrindavan.",
    history_summary: "The temple was established by Swami Haridas, a great devotee of Lord Krishna, in the mid-19th century. The idol of Banke Bihari was discovered by him in Nidhivan.",
    interesting_facts: [
      "The idol of Banke Bihari is believed to be self-manifested from the earth.",
      "Unlike other temples, there are no bells or conches used here; only the chanting of 'Radha Naam' is heard.",
      "The curtain in front of the deity is drawn and opened every few minutes to prevent devotees from being mesmerized by the idol's beauty."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686132/IMG_20250531_084604_iokybt.jpg", alt: "Banke Bihari Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686132/IMG_20250531_084528_wohrzn.jpg", alt: "Banke Bihari Temple idol" }
    ],
    famous_for: ["Lord Krishna's childhood abode", "Holi celebrations"],
    rituals_practices: ["Daily pujas", "Jhulan Yatra"],
    visiting_hours: "7:45 AM - 12:00 PM, 5:30 PM - 9:30 PM (Summer); 8:45 AM - 1:00 PM, 4:30 PM - 8:30 PM (Winter)",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for darshan. Entry is free and queues are managed on-site.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Peda", "Makhan Mishri"],
    festivals: [
      { name: "Holi", date_or_period: "March", description: "Famous for its vibrant and enthusiastic Holi celebrations." },
      { name: "Janmashtami", date_or_period: "August/September", description: "Celebrates the birth of Lord Krishna." },
      { name: "Jhulan Yatra", date_or_period: "July/August", description: "Festival of swings, where deities are placed on decorated swings." }
    ]
  },
  {
    id: "meenakshi-amman",
    name: "Meenakshi Amman Temple",
    location: {
      city: "Madurai",
      district: "Madurai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 9.9197, longitude: 78.1197 }
    },
    category: ["Shaiva", "Devi Temple"],
    deity: "Goddess Meenakshi (Parvati), Lord Sundareswarar (Shiva)",
    description: "A historic Hindu temple located on the southern bank of the Vaigai River in Madurai. It is dedicated to Goddess Meenakshi and her consort Sundareswarar.",
    history_summary: "The temple was built by Kulasekara Pandya, and the present structure was rebuilt by Nayak rulers in the 16th century, with significant additions by Vishwanatha Nayakar and Tirumalai Nayakar. It is a masterpiece of Dravidian architecture.",
    interesting_facts: [
      "The temple has 14 gopurams (gateway towers), with the tallest being over 50 meters high.",
      "It houses the 'Hall of Thousand Pillars,' each carved with unique sculptures.",
      "The temple is a living example of ancient temple towns, with a vibrant market and cultural activities within its premises."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686424/1000406863_1200_904_gmx6ec.jpg", alt: "Meenakshi Amman Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686254/IMG_20250531_085030_mtikyr.jpg", alt: "Meenakshi Amman Temple idol" }
    ],
    famous_for: ["Architectural marvel", "Gopurams", "Chithirai Festival"],
    rituals_practices: ["Daily pujas", "Chithirai Festival"],
    visiting_hours: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
    entry_fee: "Free (special entry tickets available)",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. Special entry tickets might be available on-site.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Sweet Pongal", "Vibhuti"],
    festivals: [
      { name: "Chithirai Festival", date_or_period: "April/May", description: "A grand annual festival celebrating the celestial wedding of Meenakshi and Sundareswarar." },
      { name: "Navaratri", date_or_or_period: "September/October", description: "Nine days of devotion to Goddess Meenakshi." }
    ]
  },
  {
    id: "brihadeeswarar",
    name: "Brihadeeswarar Temple",
    location: {
      city: "Thanjavur",
      district: "Thanjavur",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 10.7847, longitude: 79.1316 }
    },
    category: ["Shaiva", "UNESCO World Heritage"],
    deity: "Lord Shiva (Brihadeeswarar)",
    description: "A magnificent Hindu temple dedicated to Lord Shiva, built by Raja Raja Chola I in the 11th century. It is part of the 'Great Living Chola Temples' UNESCO World Heritage Site.",
    history_summary: "A masterpiece of Chola architecture, known for its massive Vimana (temple tower) and intricate sculptures. It was built by Raja Raja Chola I between 1003 and 1010 CE, showcasing the zenith of Chola power and artistic prowess.",
    interesting_facts: [
      "The temple's Vimana (tower above the sanctum) is one of the tallest in the world, standing at 66 meters (216 ft).",
      "The shadow of the main tower is said to never fall on the ground at noon.",
      "The Nandi (bull) statue at the entrance is carved out of a single rock and is one of the largest in India."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686519/IMG_20250531_090112_wfuzbv.jpg", alt: "Brihadeeswarar Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686518/IMG_20250531_090038_fumxom.jpg", alt: "Brihadeeswarar Temple idol" }
    ],
    famous_for: ["Chola architecture", "UNESCO site", "Massive Nandi statue"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for darshan. Entry is free.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Vibhuti", "Flowers"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Celebrated with special pujas and cultural events." },
      { name: "Annual Brahmotsavam", date_or_period: "May/June", description: "A 10-day annual festival with various rituals." }
    ]
  },
  {
    id: "ranganathaswamy-srirangam",
    name: "Sri Ranganathaswamy Temple, Srirangam",
    location: {
      city: "Srirangam",
      district: "Tiruchirappalli",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 10.8562, longitude: 78.6874 }
    },
    category: ["Divya Desam", "Vaishnava"],
    deity: "Lord Ranganatha (Vishnu)",
    description: "The largest functioning Hindu temple in the world, dedicated to Ranganatha, a reclining form of Lord Vishnu. It is one of the 108 Divya Desams.",
    history_summary: "The temple has been patronized by various dynasties, including the Cholas, Pandyas, Hoysalas, and Vijayanagara rulers, leading to its vast expansion over centuries. It is a prime example of Dravidian temple architecture.",
    interesting_facts: [
      "It is often cited as the largest functioning Hindu temple in the world, covering an area of 156 acres.",
      "The temple has 21 gopurams (gateway towers), including the tallest in Asia.",
      "The deity, Lord Ranganatha, is in a reclining posture (Ananthasayanam)."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686605/IMG_20250531_090330_yi8mik.jpg", alt: "Sri Ranganathaswamy Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686602/IMG_20250531_090307_f2kqp5.jpg", alt: "Sri Ranganathaswamy Temple idol" }
    ],
    famous_for: ["Largest functioning temple", "Divya Desam", "Vaikuntha Ekadashi"],
    rituals_practices: ["Daily pujas", "Brahmotsavam"],
    visiting_hours: "6:00 AM - 1:00 PM, 4:00 PM - 9:00 PM",
    entry_fee: "Free (special entry tickets available)",
    website: "https://srirangamranganathar.hrce.tn.gov.in",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://srirangamranganathar.hrce.tn.gov.in", // Example link, might need verification
      types_of_darshan: [
        { name: "General Darshan", cost: "Free" },
        { name: "Special Darshan", cost: "INR 250" }
      ],
      booking_notes: "Online booking available for special darshan. Check for specific puja schedules.",
      approx_cost: "Free - INR 250",
      identification_required: false
    },
    prasads: ["Sweet Pongal", "Dosa"],
    festivals: [
      { name: "Vaikuntha Ekadashi", date_or_period: "December/January", description: "A major festival, when the 'Paramapada Vasal' (Gateway to Heaven) is opened." },
      { name: "Brahmotsavam", date_or_period: "Various times a year", description: "Grand annual festivals celebrated with processions and rituals." }
    ]
  },
  // --- NEW TELANGANA TEMPLE ENTRIES TO ADD TO YOUR 'templesData' ARRAY ---

  // New: Sri Sita Ramachandraswamy Temple, Bhadrachalam
  {
    id: "bhadrachalam-rama",
    name: "Sri Sita Ramachandraswamy Temple, Bhadrachalam",
    location: {
      city: "Bhadrachalam",
      district: "Bhadradri Kothagudem",
      state: "Telangana",
      country: "India",
      coordinates: { latitude: 17.6630, longitude: 80.8810 } // Approximate
    },
    category: ["Rama Temple", "Vaishnava"],
    deity: "Lord Rama, Sita, Lakshmana",
    description: "A famous temple dedicated to Lord Rama, Sita, and Lakshmana, located on the banks of the Godavari River. It is a significant pilgrimage site for devotees of Lord Rama.",
    history_summary: "The temple's origins are ancient, but its current structure was largely built by Bhakta Ramadasu in the 17th century. It is a major center for the annual Sitarama Kalyanam (celestial wedding).",
    interesting_facts: [
      "The temple is known for its annual Sitarama Kalyanam, a grand celestial wedding of Lord Rama and Sita.",
      "It is one of the most important pilgrimage sites for devotees of Lord Rama in South India.",
      "The temple is located on a hillock overlooking the sacred Godavari River."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768410/IMG_20250601_134913_vnzrwi.jpg", alt: "Sri Sita Ramachandraswamy Temple, Bhadrachalam" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768409/IMG_20250601_134854_vf8guf.jpg", alt: "Sri Sita Ramachandraswamy Temple idol" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748768413/rama_srirama_lqefhk.mp3",
    famous_for: ["Lord Rama", "Sitarama Kalyanam", "Godavari River"],
    rituals_practices: ["Daily pujas", "Kalyanam", "Godavari Snanam"],
    visiting_hours: "4:30 AM - 12:00 PM, 3:00 PM - 8:30 PM",
    entry_fee: "Free (special entry tickets available)",
    prasads: ["Laddu", "Pulihora"],
    festivals: [
      { name: "Sri Rama Navami", date_or_period: "March/April", description: "Grand celebration of Lord Rama's birth and celestial wedding." },
      { name: "Vaikuntha Ekadashi", date_or_period: "December/January", description: "Special celebrations." }
    ]
  },

  // New: Sri Lakshmi Narasimha Swamy Temple, Yadagirigutta
  {
    id: "yadagirigutta-narasimha",
    name: "Sri Lakshmi Narasimha Swamy Temple, Yadagirigutta",
    location: {
      city: "Yadagirigutta",
      district: "Yadadri Bhuvanagiri",
      state: "Telangana",
      country: "India",
      coordinates: { latitude: 17.6560, longitude: 79.0350 } // Approximate
    },
    category: ["Narasimha Temple", "Vaishnava"],
    deity: "Lord Lakshmi Narasimha Swamy",
    description: "A prominent cave temple dedicated to Lord Narasimha, a fierce avatar of Vishnu. It is a highly revered pilgrimage site in Telangana.",
    history_summary: "The temple is ancient, believed to be a self-manifested abode of Lord Narasimha. It has recently undergone significant renovation and expansion, with the entire complex being covered in stone carvings.",
    interesting_facts: [
      "The main deity is believed to be self-manifested from a rock in the cave.",
      "The temple has been extensively renovated with black granite stone, showcasing impressive craftsmanship.",
      "It is a popular destination for devotees seeking blessings for health, wealth, and protection."
    ],
    architecture_style: "Dravidian (newly renovated)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768452/IMG_20250601_135010_lh5nrj.jpg", alt: "Sri Lakshmi Narasimha Swamy Temple, Yadagirigutta" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768448/IMG_20250601_134947_ysu2y7.jpg", alt: "Sri Lakshmi Narasimha Swamy Temple idol" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748768453/yamadonga_narasimha_gwug8i.mp3",
    famous_for: ["Lord Narasimha", "Cave temple", "Recent renovation"],
    rituals_practices: ["Daily pujas", "Lakshmi Narasimha Swamy Kalyanam"],
    visiting_hours: "4:00 AM - 9:30 PM",
    entry_fee: "Free (special entry tickets available)",
    prasads: ["Laddu", "Pulihora"],
    festivals: [
      { name: "Brahmotsavam", date_or_period: "March/April", description: "Annual grand festival." },
      { name: "Narasimha Jayanti", date_or_period: "May", description: "Celebrates the appearance of Lord Narasimha." }
    ]
  },

  // New: Thousand Pillar Temple (Rudreshwara Swamy Temple), Hanamkonda/Warangal
  {
    id: "thousand-pillar-warangal",
    name: "Thousand Pillar Temple (Rudreshwara Swamy Temple)",
    location: {
      city: "Hanamkonda", // Near Warangal
      district: "Hanamkonda",
      state: "Telangana",
      country: "India",
      coordinates: { latitude: 18.0067, longitude: 79.5700 } // Approximate
    },
    category: ["Shaiva", "Historical", "UNESCO Tentative Site"],
    deity: "Lord Shiva (Rudreswara), Lord Vishnu, Lord Surya",
    description: "An ancient temple built by the Kakatiya dynasty, famous for its elaborate carvings and architectural grandeur, though it does not literally have a thousand pillars.",
    history_summary: "Constructed by King Rudra Deva in the 12th century, this temple is a masterpiece of Kakatiya architecture. It is a 'Trikutalayam' (three shrines) dedicated to Shiva, Vishnu, and Surya. Despite being damaged over centuries, it remains a significant historical monument.",
    interesting_facts: [
      "It is a 'Trikutalayam', with three shrines dedicated to Lord Shiva, Lord Vishnu, and Lord Surya.",
      "The temple is built on a star-shaped platform and features intricately carved pillars and sculptures.",
      "It is a UNESCO World Heritage Tentative Site, recognized for its exceptional Kakatiya architecture."
    ],
    architecture_style: "Kakatiyan",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768530/IMG_20250601_135032_shqkkf.jpg", alt: "Thousand Pillar Temple, Warangal" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768533/IMG_20250601_135106_bmanic.jpg", alt: "Thousand Pillar Temple idol" }
    ],
    famous_for: ["Kakatiya architecture", "Historical significance", "Trikutalayam"],
    rituals_practices: ["Daily pujas (limited, historical site)"],
    visiting_hours: "6:00 AM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Flowers"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Special pujas are performed." }
    ]
  },

  // New: Ramappa Temple (Kakatiya Rudreswara Temple), Palampet
  {
    id: "ramappa-temple",
    name: "Ramappa Temple (Kakatiya Rudreswara Temple)",
    location: {
      city: "Palampet",
      district: "Mulugu",
      state: "Telangana",
      country: "India",
      coordinates: { latitude: 18.2600, longitude: 79.9400 } // Approximate
    },
    category: ["Shaiva", "UNESCO World Heritage", "Ancient"],
    deity: "Lord Shiva (Ramalingeswara)",
    description: "The only temple in India named after its sculptor, Ramappa. It is a UNESCO World Heritage Site, renowned for its intricate carvings and 'floating bricks'.",
    history_summary: "Built in 1213 CE by Recharla Rudra, a general of Kakatiya ruler Ganapati Deva. The temple's construction lasted for 40 years, showcasing the peak of Kakatiyan architectural and sculptural excellence. It was named after its chief sculptor, Ramappa, a rare honor.",
    interesting_facts: [
      "It is the only temple in India named after its chief sculptor, Ramappa.",
      "Recognized as a UNESCO World Heritage Site for its outstanding universal value.",
      "Features 'floating bricks' (sandalwood mixed with sawdust) used in its gopuram, making them light.",
      "The carvings depict various mythological scenes, musicians, and dancers, including the famous 'dancing gopikas'."
    ],
    architecture_style: "Kakatiyan",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768595/IMG_20250601_135137_pxyefr.jpg", alt: "Ramappa Temple, Palampet" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768598/IMG_20250601_135155_kqheba.jpg", alt: "Ramappa Temple idol" }
    ],
    famous_for: ["UNESCO World Heritage", "Kakatiya architecture", "Floating bricks", "Sculptor's name"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Yes",
    prasads: ["Vibhuti", "Flowers"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Special pujas are performed." }
    ]
  },
  // New: Chilkur Balaji Temple, Hyderabad
  {
    id: "chilkur-balaji-hyderabad",
    name: "Chilkur Balaji Temple",
    location: {
      city: "Hyderabad",
      district: "Ranga Reddy",
      state: "Telangana",
      country: "India",
      coordinates: { latitude: 17.3400, longitude: 78.3000 } // Approximate
    },
    category: ["Vaishnava", "Unique"],
    deity: "Lord Venkateswara (Balaji)",
    description: "Often called 'Visa Balaji Temple', this unique temple is known for its emphasis on pure devotion, with no hundi (donation box) or special darshan fees. It is believed that prayers here help with visa approvals.",
    history_summary: "The temple has ancient origins, dating back to the time of Akkanna and Madanna, uncles of Bhakta Ramadasu. It has gained significant popularity due to its unique approach to worship and the strong belief in its miraculous powers regarding visa acquisition.",
    interesting_facts: [
      "No hundi (donation box) or special darshan tickets are allowed, promoting egalitarian worship.",
      "Devotees often perform 108 circumambulations (parikramas) of the inner sanctum.",
      "Popularly known as 'Visa Balaji' due to the belief that prayers here help with visa approvals and travel."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768564/IMG_20250601_135248_vnqadp.jpg", alt: "Chilkur Balaji Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748769014/IMG_20250601_135319-min_pmvzdp.png", alt: "Chilkur Balaji Temple idol" }
    ],
    famous_for: ["Visa Temple", "No Hundi", "108 Parikramas"],
    rituals_practices: ["Daily pujas", "108 Parikramas", "Vows for visa/travel"],
    visiting_hours: "5:00 AM - 1:00 PM, 4:00 PM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Laddus", "Sweet Pongal"],
    festivals: [
      { name: "Brahmotsavam", date_or_period: "May/June", description: "Annual festival." }
    ]
  },

  // New: Karmanghat Hanuman Temple, Hyderabad
  {
    id: "karmanghat-hanuman-hyderabad",
    name: "Karmanghat Hanuman Temple",
    location: {
      city: "Hyderabad",
      district: "Hyderabad",
      state: "Telangana",
      country: "India",
      coordinates: { latitude: 17.3300, longitude: 78.5200 } // Approximate
    },
    category: ["Hanuman Temple", "Ancient"],
    deity: "Lord Hanuman",
    description: "One of the oldest and most popular Hanuman temples in Hyderabad, known for its serene environment and the belief in the powerful presence of Lord Hanuman.",
    history_summary: "The temple dates back to the 11th century, established during the Kakatiya period. It is believed to have been founded by a Kakatiya king. The temple has a significant historical legend involving a Muslim ruler attempting to destroy the idol but being prevented by a miraculous force.",
    interesting_facts: [
      "The main idol of Lord Hanuman is believed to be self-manifested (Swayambhu).",
      "The temple has a tranquil atmosphere, drawing devotees seeking peace and blessings.",
      "It is a prominent center for Hanuman Jayanti celebrations."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768703/sri-hanuman-devasthanam-karmanghat-6710005_t5jqvr.webp", alt: "Karmanghat Hanuman Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768700/IMG_20250601_135418_ja1ni6.jpg", alt: "Karmanghat Hanuman Temple idol" }
    ],
    famous_for: ["Ancient Hanuman temple", "Swayambhu idol"],
    rituals_practices: ["Daily pujas", "Hanuman Chalisa recitation"],
    visiting_hours: "5:30 AM - 1:00 PM, 4:00 PM - 8:30 PM",
    entry_fee: "Free",
    prasads: ["Vada", "Laddus"],
    festivals: [
      { name: "Hanuman Jayanti", date_or_period: "April", description: "Grand celebrations for Lord Hanuman's birthday." }
    ]
  },

  // New: Sanghi Temple, Hyderabad
  {
    id: "sanghi-temple-hyderabad",
    name: "Sanghi Temple",
    location: {
      city: "Hyderabad",
      district: "Ranga Reddy",
      state: "Telangana",
      country: "India",
      coordinates: { latitude: 17.2600, longitude: 78.5900 } // Approximate
    },
    category: ["Modern", "Hilltop Temple"],
    deity: "Lord Venkateswara",
    description: "A beautiful temple complex located on a hillock called 'Parmanand Giri', offering panoramic views of the surroundings. It is a modern temple known for its impressive architecture and serene environment.",
    history_summary: "Built by the Sanghi family (a prominent industrialist group) in 1991, the temple complex houses several deities including Lord Venkateswara, Padmavati, Shiva, Rama, Ganesha, and Hanuman. Its architecture is inspired by the Chola-Chalukya styles.",
    interesting_facts: [
      "The temple is built on a hill with a panoramic view of the city.",
      "It houses several temples dedicated to various deities within the complex, including a 'Rajagopuram' (main gateway tower).",
      "Known for its exquisite architecture and well-maintained gardens, making it a popular spiritual and tourist destination."
    ],
    architecture_style: "Chola-Chalukya (modern interpretation)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768802/sanghi-temple-hyderabad-entryfee-timings-tour-package-header_efjep6.jpg", alt: "Sanghi Temple, Hyderabad" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768798/IMG_20250601_135505_a2gg8o.jpg", alt: "Sanghi Temple idol" }
    ],
    famous_for: ["Hilltop location", "Panoramic views", "Architectural beauty"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "8:00 AM - 1:00 PM, 4:00 PM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Laddus", "Sweet Pongal"],
    festivals: [
      { name: "Brahmotsavam", date_or_period: "May/June", description: "Annual grand festival." },
      { name: "Sankranti", date_or_period: "January", description: "Festival of harvest, special prayers." }
    ]
  },

  // New: Kondagattu Anjaneya Swamy Temple, Jagtial
  {
    id: "kondagattu-hanuman",
    name: "Kondagattu Anjaneya Swamy Temple",
    location: {
      city: "Kondagattu",
      district: "Jagtial",
      state: "Telangana",
      country: "India",
      coordinates: { latitude: 18.9400, longitude: 78.8900 } // Approximate
    },
    category: ["Hanuman Temple"],
    deity: "Lord Anjaneya Swamy (Hanuman)",
    description: "A highly revered temple dedicated to Lord Hanuman, located on a hill. It is particularly known for its spiritual significance in curing mental illnesses and for its beautiful natural surroundings.",
    history_summary: "The temple is believed to have been built by a shepherd in the 17th century. The idol of Hanuman is believed to be self-manifested. It has a unique feature where the idol has two faces, one of Lord Anjaneya and the other of Lord Narasimha.",
    interesting_facts: [
      "The idol of Lord Hanuman is believed to be self-manifested and is unique for having two faces (Anjaneya and Narasimha).",
      "Many devotees believe that a visit here can cure mental illnesses and evil influences.",
      "The temple is situated on a hillock, surrounded by scenic natural beauty."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768768/IMG_20250601_135632_yskjov.jpg", alt: "Kondagattu Anjaneya Swamy Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768762/186_sfcqlm.jpg", alt: "Kondagattu Anjaneya Swamy Temple idol" }
    ],
    famous_for: ["Lord Hanuman", "Healing powers", "Two-faced idol"],
    rituals_practices: ["Daily pujas", "Offerings for mental peace"],
    visiting_hours: "4:00 AM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Vada", "Laddus"],
    festivals: [
      { name: "Hanuman Jayanti", date_or_period: "April", description: "Grand celebrations for Lord Hanuman's birthday, attracting huge crowds." }
    ]
  },

  // New: Gnana Saraswati Temple, Basar
  {
    id: "gnana-saraswati-basar",
    name: "Gnana Saraswati Temple, Basar",
    location: {
      city: "Basar",
      district: "Nirmal",
      state: "Telangana",
      country: "India",
      coordinates: { latitude: 18.8800, longitude: 77.9400 } // Approximate
    },
    category: ["Saraswati Temple", "Ancient"],
    deity: "Goddess Saraswati",
    description: "One of the two famous Saraswati temples in India, dedicated to the Goddess of Knowledge. It is a highly revered pilgrimage site, especially for students seeking blessings for education.",
    history_summary: "The temple has ancient origins, associated with Sage Vyasa, who is said to have meditated here. It is believed that he created three heaps of sand, symbolizing the trinity, and worshipped them, which later became the idols. The temple is located on the banks of the Godavari River.",
    interesting_facts: [
      "It is one of the two major Saraswati temples in India (the other being in Kashmir).",
      "Akshara Gnana (initiation into education/learning) ceremonies are performed here for children.",
      "The temple is located on the banks of the sacred Godavari River."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768642/2_l52e5l.jpg", alt: "Gnana Saraswati Temple, Basar" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748768646/IMG_20250601_135740_p5d0xr.jpg", alt: "Gnana Saraswati Temple idol" }
    ],
    famous_for: ["Goddess of Knowledge", "Akshara Gnana", "Godavari River"],
    rituals_practices: ["Daily pujas", "Akshara Gnana ceremonies", "Abhishekam"],
    visiting_hours: "4:00 AM - 12:30 PM, 2:00 PM - 8:00 PM",
    entry_fee: "Free (special pujas have fees)",
    prasads: ["Sweet Pongal", "Milk"],
    festivals: [
      { name: "Vasantha Panchami", date_or_period: "January/February", description: "Grand celebration for Goddess Saraswati." },
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Also celebrated here with devotion." }
    ]
  },
  // --- END OF  TELANGANA TEMPLE ENTRIES ---

  // --- NEW TAMIL NADU TEMPLE ENTRIES TO ADD TO YOUR 'templesData' ARRAY ---// 
  // New: Varadaraja Perumal Temple, Kanchipuram
  {
    id: "varadaraja-perumal-kanchipuram",
    name: "Varadaraja Perumal Temple, Kanchipuram",
    location: {
      city: "Kanchipuram",
      district: "Kanchipuram",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.8340, longitude: 79.7000 } // Approximate
    },
    category: ["Divya Desam", "Vaishnava"],
    deity: "Lord Varadaraja Perumal (Vishnu)",
    description: "One of the 108 Divya Desams (holy abodes of Vishnu), this ancient temple is a masterpiece of Vijayanagara architecture and a major pilgrimage site.",
    history_summary: "The temple has existed since at least the 10th century and has been extensively expanded by various dynasties, particularly the Cholas and Vijayanagara emperors. Its 100-pillared hall and intricate carvings are testaments to its rich history.",
    interesting_facts: [
      "The temple is known for its exquisite 100-pillared hall with intricate sculptures.",
      "Lord Varadaraja is believed to have emerged from a Yagna (fire sacrifice) performed by Lord Brahma.",
      "The annual Garuda Sevai festival attracts lakhs of devotees."
    ],
    architecture_style: "Dravidian, Vijayanagara",
    images: [
      {
        url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748770883/IMG_20250601_091037_mhhdx8.jpg",
        alt: "Varadaraja Perumal Temple, Kanchipuram"
      },
      {
        url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748770888/IMG_20250601_091119_xkyj1m.jpg",
        alt: "Varadaraja Perumal Temple idol"
      }
    ],
    famous_for: ["Divya Desam", "Vijayanagara architecture", "Garuda Sevai"],
    rituals_practices: ["Daily pujas", "Brahmotsavam"],
    visiting_hours: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
    entry_fee: "Free (special entry tickets available)", // ✅ Don't forget this comma
    prasads: ["Sweet Pongal", "Puliyodarai"],
    festivals: [
      {
        name: "Brahmotsavam",
        date_or_period: "May/June (10 days)",
        description: "Grand annual festival with various processions and rituals."
      },
      {
        name: "Vaikuntha Ekadashi",
        date_or_period: "December/January",
        description: "Special celebrations."
      }
    ]
  },
  // New: Kumari Amman Temple, Kanyakumari
  {
    id: "kumari-amman-kanyakumari",
    name: "Kumari Amman Temple",
    location: {
      city: "Kanyakumari",
      district: "Kanyakumari",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 8.0883, longitude: 77.5590 } // Approximate
    },
    category: ["Devi Temple", "Coastal"],
    deity: "Goddess Kanya Kumari (Parvati)",
    description: "A coastal temple dedicated to Goddess Kanya Kumari, a manifestation of Parvati as a virgin goddess. It is located at the southernmost tip of mainland India.",
    history_summary: "The temple is very ancient, with its origins dating back to the Sangam period. It is believed to be the place where Goddess Parvati did penance to marry Lord Shiva. The present structure is largely a result of renovations over centuries.",
    interesting_facts: [
      "The temple is located at the confluence of the Arabian Sea, the Bay of Bengal, and the Indian Ocean.",
      "The diamond nose ring of the deity is said to be exceptionally brilliant and visible from the sea.",
      "Devotees often take a hohttps://res.cloudinary.com/dwbz8m9u8/image/upload/v1748770927/IMG_20250601_091616_kiolmj.jpgly dip in the Triveni Sangam before visiting the temple."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748770921/IMG_20250601_091531_djltzd.jpg", alt: "Kumari Amman Temple, Kanyakumari" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748770927/IMG_20250601_091616_kiolmj.jpg", alt: "Kumari Amman Temple idol" }
    ],
    famous_for: ["Southernmost tip", "Diamond nose ring", "Triveni Sangam"],
    rituals_practices: ["Daily pujas", "Chandi Homam"],
    visiting_hours: "4:30 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Sweet Pongal", "Coconut"],
    festivals: [
      { name: "Navaratri", date_or_period: "September/October", description: "Grand celebrations for Goddess Kanya Kumari." },
      { name: "Chithirai Vishu", date_or_period: "April", description: "Tamil New Year celebrations." }
    ],
  },

  // New: Rockfort Ucchi Pillayar Temple, Tiruchirappalli
  {
    id: "rockfort-ucchi-pillayar",
    name: "Rockfort Ucchi Pillayar Temple",
    location: {
      city: "Tiruchirappalli",
      district: "Tiruchirappalli",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 10.8280, longitude: 78.6850 } // Approximate
    },
    category: ["Ganesha Temple", "Hill Temple"],
    deity: "Lord Ganesha (Ucchi Pillayar)",
    description: "A famous Ganesh temple located atop a massive ancient rock formation in Tiruchirappalli, offering panoramic views of the city.",
    history_summary: "The temple is carved out of the ancient rockfort, which dates back to the Pallava and Chola periods. It is famously associated with a legend from the Ramayana involving Lord Ganesha and Vibhishana.",
    interesting_facts: [
      "The temple is located at the very top of a 273 ft high rockfort, accessible by climbing hundreds of steps.",
      "It is believed that this is where Lord Ganesha tricked Vibhishana (Ravana's brother) into placing the Ranganathaswamy idol in Srirangam.",
      "Offers breathtaking panoramic views of Tiruchirappalli city and the Kaveri River."
    ],
    architecture_style: "Rock-cut, Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771005/IMG_20250601_091954_vyfufx.jpg", alt: "Rockfort Ucchi Pillayar Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771012/IMG_20250601_092035_atwqqy.jpg", alt: "Rockfort Ucchi Pillayar Temple idol" }
    ],
    famous_for: ["Hilltop temple", "Panoramic views", "Ramayana legend"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Modak", "Laddu"],
    festivals: [
      { name: "Vinayaka Chaturthi", date_or_period: "August/September", description: "Grand celebrations for Lord Ganesha." }
    ]
  },

  // New: Subramanya Swamy Temple, Tiruchendur
  {
    id: "tiruchendur-murugan",
    name: "Subramanya Swamy Temple, Tiruchendur",
    location: {
      city: "Tiruchendur",
      district: "Thoothukudi",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 8.4900, longitude: 78.1000 } // Approximate
    },
    category: ["Murugan Temple", "Arupadaiveedu", "Coastal"],
    deity: "Lord Murugan (Subramanya Swamy)",
    description: "One of the Arupadaiveedu (six abodes) of Lord Murugan, uniquely located on the seacoast. It is a significant pilgrimage site dedicated to Lord Murugan.",
    history_summary: "The temple is ancient, believed to be the spot where Lord Murugan vanquished the demon Surapadman. It has been extensively renovated over centuries by various rulers and devotees.",
    interesting_facts: [
      "It is the only Arupadaiveedu (six abodes) of Lord Murugan located on the seashore.",
      "The temple has a large gopuram (gateway tower) facing the sea.",
      "Pilgrims often take a holy dip in the 'Nazhi Kinaru', a freshwater well near the sea, before darshan."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771044/IMG_20250601_092426_d0ge0p.jpg", alt: "Subramanya Swamy Temple, Tiruchendur" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771051/IMG_20250601_092519_jps2vx.jpg", alt: "Subramanya Swamy Temple idol" }
    ],
    famous_for: ["Coastal Murugan temple", "Arupadaiveedu", "Skanda Shashti"],
    rituals_practices: ["Daily pujas", "Kavadi Attam"],
    visiting_hours: "5:00 AM - 9:00 PM",
    entry_fee: "Free (special darshan tickets optional)",
    prasads: ["Panchamirtham", "Sweets"],
    festivals: [
      { name: "Skanda Shashti", date_or_period: "October/November (6 days)", description: "Grand festival celebrating Lord Murugan's victory over Surapadman." },
      { name: "Vaikasi Visakam", date_or_period: "May/June", description: "Celebrates Lord Murugan's birthday." }
    ]
  },

  // New: Swaminathaswamy Temple, Swamimalai
  {
    id: "swamimalai-murugan",
    name: "Swaminathaswamy Temple, Swamimalai",
    location: {
      city: "Swamimalai",
      district: "Thanjavur",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 10.9500, longitude: 79.3300 } // Approximate
    },
    category: ["Murugan Temple", "Arupadaiveedu"],
    deity: "Lord Murugan (Swaminathaswamy)",
    description: "One of the Arupadaiveedu (six abodes) of Lord Murugan, uniquely where Murugan taught his father Shiva the meaning of 'Om'.",
    history_summary: "The temple is ancient, with its origins dating back to the Chola period. It is famous for the legend where Lord Murugan imparted knowledge to Lord Shiva, earning him the name 'Swaminatha' (Guru of Shiva).",
    interesting_facts: [
      "It is believed to be the place where Lord Murugan (Swaminatha) taught his father Lord Shiva the meaning of the Pranava Mantra (Om).",
      "The temple is built on an artificial hill, with 60 steps representing the 60 years of the Tamil calendar cycle.",
      "It is one of the Arupadaiveedu (six abodes) of Lord Murugan."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771084/IMG_20250601_092919_hynuly.jpg", alt: "Swaminathaswamy Temple, Swamimalai" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771077/IMG_20250601_092834_ggd2ae.jpg", alt: "Swaminathaswamy Temple idol" }
    ],
    famous_for: ["Murugan as Guru", "Arupadaiveedu"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    entry_fee: "Free",
    prasads: ["Panchamirtham", "Sweets"],
    festivals: [
      { name: "Vaikasi Visakam", date_or_period: "May/June", description: "Celebrates Lord Murugan's birthday." },
      { name: "Skanda Shashti", date_or_period: "October/November", description: "Observed with special rituals." }
    ]
  },

  // New: Shore Temple, Mahabalipuram
  {
    id: "shore-temple-mahabalipuram",
    name: "Shore Temple, Mahabalipuram",
    location: {
      city: "Mahabalipuram",
      district: "Chengalpattu",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.6174, longitude: 80.1916 } // Approximate
    },
    category: ["Shaiva", "Vaishnava", "UNESCO World Heritage", "Ancient"],
    deity: "Lord Shiva, Lord Vishnu",
    description: "A structural temple complex overlooking the Bay of Bengal, part of the Group of Monuments at Mahabalipuram, a UNESCO World Heritage Site. It is a fine example of Pallava architecture.",
    history_summary: "Built during the reign of the Pallava King Rajasimha in the 8th century CE. It is one of the oldest structural temples in South India, having withstood the test of time and sea erosion.",
    interesting_facts: [
      "It is one of the oldest structural stone temples in South India.",
      "The temple originally had seven pagodas, six of which are now submerged in the sea.",
      "Features shrines dedicated to both Lord Shiva and Lord Vishnu, signifying religious harmony.",
      "A UNESCO World Heritage Site, famous for its unique coastal location and intricate carvings."
    ],
    architecture_style: "Pallava",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771118/IMG_20250601_093327_o6mw9q.jpg", alt: "Shore Temple, Mahabalipuram" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771110/1200px-Lingam_in_the_Shore_Temple_-_panoramio_cn7saw.jpg", alt: "Shore Temple idol" }
    ],
    famous_for: ["Coastal temple", "Pallava architecture", "UNESCO site", "Tsunami connection"],
    rituals_practices: ["Historical site, limited active worship"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Yes",
    prasads: [], // Mostly historical site
    festivals: [
      { name: "Mamallapuram Dance Festival", date_or_period: "December/January", description: "Annual classical dance festival held against the backdrop of the temple." }
    ]
  },

  // --- END OF NEW TAMIL NADU TEMPLE ENTRIES ---
  {
    id: "konark",
    name: "Konark Sun Temple",
    location: {
      city: "Konark",
      district: "Puri",
      state: "Odisha",
      country: "India",
      coordinates: { latitude: 19.8876, longitude: 86.0945 }
    },
    category: ["Sun Temple", "UNESCO World Heritage"],
    deity: "Lord Surya (Sun God)",
    description: "A 13th-century CE Sun Temple built in the form of a gigantic chariot, dedicated to the Sun God Surya. It is a UNESCO World Heritage Site.",
    history_summary: "Built by King Narasimhadeva I of the Eastern Ganga Dynasty in the 13th century. Much of the temple is in ruins, but its architectural grandeur is still evident, showcasing the pinnacle of Kalinga architecture.",
    interesting_facts: [
      "The temple is designed as a colossal chariot with twelve pairs of intricately carved wheels and seven horses.",
      "The wheels are not just decorative; they are sundials that can accurately tell time.",
      "It is a UNESCO World Heritage Site and a prime example of Kalinga architecture."
    ],
    architecture_style: "Kalinga",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686762/IMG_20250531_090737_hqkor7.jpg", alt: "Konark Sun Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686765/IMG_20250531_090817_m95f4b.jpg", alt: "Konark Sun Temple idol" }

    ],
    famous_for: ["Sun Temple", "Chariot architecture", "UNESCO site"],
    rituals_practices: ["Historical site, not an active worship temple"],
    visiting_hours: "6:00 AM - 8:00 PM",
    entry_fee: "Yes",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "It's a historical site, not an active worship temple for darshan. Entry fees are for site access.",
      approx_cost: "N/A",
      identification_required: false
    },
    prasads: [], // Not an active worship temple
    festivals: [
      { name: "Konark Dance Festival", date_or_period: "December (1-5 Dec)", description: "An annual cultural festival showcasing Indian classical dance forms." },
      { name: "Magha Saptami", date_or_period: "January/February", description: "Devotees take holy dip at Chandrabhaga beach near the temple." }
    ]
  },
  {
    id: "lingaraj",
    name: "Lingaraj Temple, Bhubaneswar",
    location: {
      city: "Bhubaneswar",
      district: "Khurda",
      state: "Odisha",
      country: "India",
      coordinates: { latitude: 20.2529, longitude: 85.8344 }
    },
    category: ["Shaiva"],
    deity: "Lord Shiva (Harihara - half Vishnu, half Shiva)",
    description: "One of the oldest and largest temples in Bhubaneswar, dedicated to Harihara, a combined form of Shiva and Vishnu. It is a prominent pilgrimage site.",
    history_summary: "The temple was built by the Somavamsi kings, with later additions by the Ganga rulers, primarily in the 11th century. It is a magnificent example of Kalinga architecture.",
    interesting_facts: [
      "The Lingam in the temple is unique as it represents both Lord Shiva and Lord Vishnu (Harihara).",
      "The temple complex has over 100 smaller shrines.",
      "Non-Hindus are generally not allowed inside the main sanctum, but can view the temple from a viewing platform."
    ],
    architecture_style: "Kalinga",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686861/IMG_20250531_091307_uufgo4.jpg", alt: "Lingaraj Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686857/IMG_20250531_091244_oqcbjy.jpg", alt: "Lingaraj Temple idol" }
    ],
    famous_for: ["Ancient architecture", "Harihara deity"],
    rituals_practices: ["Daily pujas", "Shivratri"],
    visiting_hours: "6:00 AM - 12:30 PM, 3:30 PM - 9:00 PM",
    entry_fee: "Free (non-Hindus not allowed inside sanctum)",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for darshan. Entry is free. Note: Non-Hindus are generally not allowed inside the sanctum.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Pitha", "Dalma"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "The major festival, attracting thousands of devotees." },
      { name: "Ashokastami", date_or_period: "March/April", description: "Rath Yatra of Lord Lingaraj." }
    ]
  },
  {
    id: "shirdi",
    name: "Shirdi Sai Baba Temple",
    location: {
      city: "Shirdi",
      district: "Ahmednagar",
      state: "Maharashtra",
      country: "India",
      coordinates: { latitude: 19.7641, longitude: 74.4764 }
    },
    category: ["Samadhi Mandir", "Spiritual"],
    deity: "Sai Baba of Shirdi",
    description: "A renowned pilgrimage site dedicated to the saint Sai Baba of Shirdi. Devotees from all faiths visit this temple.",
    history_summary: "The temple complex was built over the Samadhi (tomb) of Sai Baba, who lived in Shirdi in the late 19th and early 20th centuries. It has grown into a major spiritual center attracting millions.",
    interesting_facts: [
      "Sai Baba's mortal remains are interred in the Samadhi Mandir.",
      "The temple promotes the message of 'Sabka Malik Ek' (One God governs all), emphasizing universal brotherhood and equality.",
      "The 'Udi' (holy ash) from Sai Baba's dhuni (sacred fire) is distributed to devotees and believed to have healing powers."
    ],
    architecture_style: "Modern Indian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686960/IMG_20250531_091956_yycgph.jpg", alt: "Shirdi Sai Baba Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748686963/IMG_20250531_092122_bsrjg6.jpg", alt: "Shirdi Sai Baba Idol" }
    ],
    famous_for: ["Sai Baba", "Inter-faith devotion"],
    rituals_practices: ["Daily aarti", "Palkhi procession"],
    visiting_hours: "4:00 AM - 11:00 PM",
    entry_fee: "Free (special entry tickets available)",
    website: "https://www.sai.org.in/",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://www.sai.org.in/en/e-darshan-online-booking",
      types_of_darshan: [
        { name: "Paid Darshan", cost: "INR 200" },
        { name: "Aarti Pass", cost: "INR 200 - 500" }
      ],
      booking_notes: "Online booking is highly recommended for darshan and aarti, especially during peak times.",
      approx_cost: "Free - INR 500",
      identification_required: false
    },
    prasads: ["Udi (Holy Ash)", "Laddus"],
    festivals: [
      { name: "Ram Navami", date_or_period: "March/April", description: "Celebrated as the birth anniversary of Sai Baba." },
      { name: "Guru Purnima", date_or_period: "July", description: "Dedicated to spiritual teachers, widely celebrated." },
      { name: "Vijayadashami (Sai Punyatithi)", date_or_period: "October", description: "Commemorates Sai Baba's Mahasamadhi." }
    ]
  },
  {
    id: "chhatarpur-mandir",
    name: "Chattarpur Mandir",
    location: {
      city: "Delhi",
      district: "South Delhi",
      state: "Delhi",
      country: "India",
      coordinates: { latitude: 28.5029, longitude: 77.1856 }
    },
    category: ["Devi Temple"],
    deity: "Goddess Katyayani",
    description: "One of the largest temples in India, dedicated to Goddess Katyayani. It is a major pilgrimage site, especially during Navaratri.",
    history_summary: "Founded by Baba Sant Nagpal Ji in 1974. The temple complex is spread over a large area and has various shrines, built with a blend of North and South Indian architectural styles.",
    interesting_facts: [
      "It is one of the largest temple complexes in India, spread over 70 acres.",
      "The temple is dedicated to Goddess Katyayani, one of the nine forms of Durga.",
      "It is particularly famous for its grand celebrations during the Navaratri festival."
    ],
    architecture_style: "South Indian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687047/IMG_20250531_100220_oieegx.jpg", alt: "Chattarpur Mandir" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687044/IMG_20250531_100155_alo1ky.jpg", alt: "Chattarpur Mandir idol" }
    ],
    famous_for: ["Largest temple in Delhi", "Navaratri celebrations"],
    rituals_practices: ["Daily pujas", "Navaratri"],
    visiting_hours: "6:00 AM - 10:00 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for darshan.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Sweets", "Fruits"],
    festivals: [
      { name: "Navaratri", date_or_period: "March/April & September/October", description: "Grand celebrations with special decorations and pujas." }
    ]
  },
  {
    id: "akshardham",
    name: "Akshardham Temple",
    location: {
      city: "Delhi",
      district: "East Delhi",
      state: "Delhi",
      country: "India",
      coordinates: { latitude: 28.6127, longitude: 77.2773 }
    },
    category: ["Swaminarayan", "Modern"],
    deity: "Swaminarayan",
    description: "A spiritual and cultural campus dedicated to Swaminarayan. It showcases traditional Indian and Hindu culture, spirituality, and architecture.",
    history_summary: "Built by BAPS Swaminarayan Sanstha, it was inaugurated in 2005. It is a marvel of modern Indian architecture, constructed using ancient techniques and materials.",
    interesting_facts: [
      "It is the largest comprehensive Hindu temple in the world, as per the Guinness World Record.",
      "The temple is built without the use of steel, using only carved stone.",
      "It features a musical fountain show, boat ride, and various exhibitions depicting Indian history and spirituality."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687123/IMG_20250531_102134_bakfzq.jpg", alt: "Akshardham Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687120/IMG_20250531_102106_l8hfxs.jpg", alt: "Akshardham Temple idol" }
    ],
    famous_for: ["Architectural grandeur", "Cultural exhibits", "Musical fountain"],
    rituals_practices: ["Daily aarti", "Exhibitions"],
    visiting_hours: "9:30 AM - 8:00 PM (Closed on Mondays)",
    entry_fee: "Free (exhibitions have fees)",
    website: "https://akshardham.com/",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "Entry to the complex is free; tickets are required for exhibitions only, not for darshan.",
      approx_cost: "Free (Darshan)",
      identification_required: false
    },
    prasads: ["Sweets", "Fruits"],
    festivals: [
      { name: "Diwali", date_or_period: "October/November", description: "Special lighting and cultural programs during the festival of lights." }
    ]
  },
  {
    id: "golden-temple",
    name: "Golden Temple (Harmandir Sahib)",
    location: {
      city: "Amritsar",
      district: "Amritsar",
      state: "Punjab",
      country: "India",
      coordinates: { latitude: 31.6200, longitude: 74.8765 }
    },
    category: ["Sikh Gurdwara"],
    deity: "Guru Granth Sahib",
    description: "The holiest shrine of Sikhism, known for its golden facade. It is a symbol of brotherhood and equality.",
    history_summary: "Construction began in the 16th century by Guru Arjan Dev, the fifth Sikh Guru. It has been renovated and expanded over centuries, with its golden plating added in the early 19th century by Maharaja Ranjit Singh.",
    interesting_facts: [
      "The temple's architecture blends Hindu and Islamic styles, symbolizing its message of universal brotherhood.",
      "The 'Langar' (community kitchen) serves free meals to over 100,000 people daily, regardless of faith or background.",
      "The temple is surrounded by the 'Sarovar' (holy tank), believed to have healing properties."
    ],
    architecture_style: "Sikh Architecture",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687265/1200px-The_Golden_Temple_of_Amrithsar_7_qjha2i.jpg", alt: "Golden Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687267/IMG_20250531_102506_zo6yin.jpg", alt: "Golden Temple idol" }
    ],
    famous_for: ["Sikhism's holiest site", "Langar (community kitchen)"],
    rituals_practices: ["Kirtan", "Path"],
    visiting_hours: "24/7",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No tickets required. Free entry for all, 24/7.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Karah Prasad"],
    festivals: [
      { name: "Vaisakhi", date_or_period: "April", description: "Celebrates the formation of the Khalsa." },
      { name: "Guru Nanak Jayanti", date_or_period: "November", description: "Birth anniversary of Guru Nanak Dev Ji." }
    ]
  },
  {
    id: "vaishno-devi",
    name: "Vaishno Devi Temple",
    location: {
      city: "Katra",
      district: "Reasi",
      state: "Jammu and Kashmir",
      country: "India",
      coordinates: { latitude: 33.0317, longitude: 74.9450 }
    },
    category: ["Devi Temple", "Pilgrimage"],
    deity: "Mata Vaishno Devi",
    description: "A revered Hindu temple dedicated to Vaishno Devi, a manifestation of the Mother Goddess. It is located in the Trikuta Mountains.",
    history_summary: "The cave temple is ancient, with its origins shrouded in legend. It is one of the most visited pilgrimage sites in India, attracting millions of devotees annually who undertake a challenging trek to reach it.",
    interesting_facts: [
      "The temple is located inside a natural cave at an altitude of 5,200 ft.",
      "The Goddess is worshipped in the form of three natural rock formations (Pindis) representing Maha Kali, Maha Lakshmi, and Maha Saraswati.",
      "The pilgrimage involves a 12 km trek from Katra to the Bhawan (sanctum)."
    ],
    architecture_style: "Cave Temple",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687357/IMG_20250531_102902_ysyt0c.jpg", alt: "Vaishno Devi Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687353/IMG_20250531_102842_yuizln.jpg", alt: "Vaishno Devi Temple idol" }
    ],
    famous_for: ["Cave pilgrimage", "Mata Vaishno Devi"],
    rituals_practices: ["Darshan", "Aarti"],
    visiting_hours: "24/7 (subject to weather and security)",
    entry_fee: "Free",
    website: "https://www.maavaishnodevi.org/",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://www.maavaishnodevi.org/OnlineServices/OnlineYatraParchi.aspx",
      types_of_darshan: [
        { name: "Yatra Parchi (Mandatory)", cost: "Free" },
        { name: "Pooja/Hawan Booking", cost: "Varies" }
      ],
      booking_notes: "Yatra Parchi (entry slip) is mandatory and can be obtained online or offline for free. No specific 'darshan tickets' but services can be booked.",
      approx_cost: "Free",
      identification_required: true
    },
    prasads: ["Pindi Prasad", "Chunri"],
    festivals: [
      { name: "Navaratri", date_or_period: "March/April & September/October", description: "Nine days of special pujas and celebrations." }
    ]
  },
  {
    id: "amarnath",
    name: "Amarnath Cave Temple",
    location: {
      city: "Pahalgam",
      district: "Anantnag",
      state: "Jammu and Kashmir",
      country: "India",
      coordinates: { latitude: 34.2100, longitude: 75.3000 } // Approximate
    },
    category: ["Shaiva", "Cave Temple", "Pilgrimage"],
    deity: "Lord Shiva (Ice Lingam)",
    description: "A Hindu shrine located in a cave at an altitude of 3,888 m (12,756 ft). The shrine is considered one of the holiest in Hinduism and is famous for the natural formation of an ice lingam of Shiva.",
    history_summary: "The cave is mentioned in ancient Hindu texts. The pilgrimage to Amarnath is one of the most challenging and revered, undertaken by thousands annually during the summer months.",
    interesting_facts: [
      "The Shiva Lingam here is formed naturally from ice, which waxes and wanes with the moon's cycle.",
      "Two other ice formations, representing Goddess Parvati and Lord Ganesha, also appear in the cave.",
      "The pilgrimage (Amarnath Yatra) is one of the most difficult and sacred in Hinduism, requiring significant physical endurance."
    ],
    architecture_style: "Natural Cave",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687446/IMG_20250531_103251_fklfvl.jpg", alt: "Amarnath Cave Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687442/IMG_20250531_103235_bamgmh.jpg", alt: "Amarnath Ice Lingam" }
    ],
    famous_for: ["Ice Lingam", "Himalayan pilgrimage", "Annual Yatra"],
    rituals_practices: ["Darshan of Ice Lingam"],
    visiting_hours: "June to August (seasonal)",
    entry_fee: "Free (registration mandatory)",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://shriamarnathjishrine.com/yatra-registration-online.html", // Example link, might need verification
      types_of_darshan: [
        { name: "Yatra Parchi (Mandatory)", cost: "Free / Nominal Fee" }
      ],
      booking_notes: "Advance registration is mandatory for the Yatra (pilgrimage). Medical certificate often required.",
      approx_cost: "Free / Nominal Fee",
      identification_required: true
    },
    prasads: ["Dry Fruits", "Sweets"],
    festivals: [
      { name: "Amarnath Yatra", date_or_period: "June-August (seasonal)", description: "The annual pilgrimage to the holy cave, coinciding with Shravan Purnima." }
    ]
  },
  {
    id: "jagannath-puri",
    name: "Jagannath Temple, Puri",
    location: {
      city: "Puri",
      district: "Puri",
      state: "Odisha",
      country: "India",
      coordinates: { latitude: 19.8042, longitude: 85.8293 }
    },
    category: ["Char Dham", "Vaishnava"],
    deity: "Lord Jagannath (Krishna), Balabhadra, Subhadra",
    description: "A famous Hindu temple dedicated to Lord Jagannath, a form of Vishnu. It is one of the Char Dham pilgrimage sites and is renowned for its annual Ratha Yatra (Chariot Festival).",
    history_summary: "The current temple was rebuilt from the 10th century onwards, on the site of an earlier temple, by King Anantavarman Chodaganga Deva of the Eastern Ganga dynasty. It is a significant center for the Vaishnava tradition.",
    interesting_facts: [
      "The deities (Jagannath, Balabhadra, Subhadra) are made of wood and are replaced every 12 or 19 years during a special ritual called 'Nabakalebara'.",
      "The temple kitchen is considered the largest in the world, feeding thousands daily.",
      "The 'Nilachakra' (blue wheel) on top of the temple always faces you, regardless of your position."
    ],
    architecture_style: "Kalinga",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687528/IMG_20250531_103544_aoqzab.jpg", alt: "Jagannath Temple, Puri" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687525/IMG_20250531_103515_hyb5if.jpg", alt: "Jagannath Temple idol" }
    ],
    famous_for: ["Ratha Yatra", "Char Dham", "Ananda Bazaar"],
    rituals_practices: ["Daily pujas", "Chappan Bhog"],
    visiting_hours: "5:00 AM - 11:30 PM",
    entry_fee: "Free (non-Hindus not allowed inside sanctum)",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "No online booking for darshan. Entry is free. Note: Non-Hindus are generally not allowed inside the sanctum.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Mahaprasad", "Khaja"],
    festivals: [
      { name: "Ratha Yatra", date_or_period: "June/July", description: "The world-famous annual chariot festival." },
      { name: "Snana Yatra", date_or_period: "June", description: "Bathing festival of the deities." }
    ]
  },

  {
    id: "golden-temple-vellore",
    name: "Sripuram Golden Temple",
    location: {
      city: "Vellore",
      district: "Vellore",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.9165, longitude: 79.1325 }
    },
    category: ["Devi Temple", "Modern"],
    deity: "Goddess Lakshmi Narayani",
    description: "A modern temple with its Vimanam and Ardha Mandapam covered with gold. It is dedicated to Goddess Lakshmi Narayani.",
    history_summary: "The temple was constructed by the Vellore-based Sri Narayani Peedam, headed by spiritual leader Sri Sakthi Amma. It was inaugurated in 2007, and is a relatively modern but grand spiritual undertaking.",
    interesting_facts: [
      "The temple's main structure (Vimanam and Ardha Mandapam) is covered with 1.5 tons of pure gold.",
      "The temple complex is designed in the shape of a star, surrounded by a path for circumambulation.",
      "It is built on 100 acres of land and is illuminated at night, creating a spectacular sight."
    ],
    architecture_style: "Modern Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687648/IMG_20250531_103819_fqk1vq.jpg", alt: "Sripuram Golden Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748687646/IMG_20250531_103754_s0jpuk.jpg", alt: "Sripuram Golden Temple idol" }
    ],
    famous_for: ["Gold-covered Vimanam", "Spiritual park"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "8:00 AM - 8:00 PM",
    entry_fee: "Free (special darshan tickets available)",
    website: "https://sripuram.org/",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://sripuram.org/online-booking/", // Example link, might need verification
      types_of_darshan: [
        { name: "General Darshan", cost: "Free" },
        { name: "Special Darshan", cost: "INR 250" }
      ],
      booking_notes: "Online booking may be available for special darshan. Check official website for details.",
      approx_cost: "Free - INR 250",
      identification_required: false
    },
    prasads: ["Laddus", "Sweet Pongal"],
    festivals: [
      { name: "Lakshmi Narayani Jayanti", date_or_period: "October/November", description: "Celebrates the appearance day of Goddess Lakshmi Narayani." },
      { name: "Navaratri", date_or_period: "September/October", description: "Nine days of devotion to the Goddess." }
    ]
  },
  {
    id: "kapilitheertham",
    name: "Kapila Theertham",
    location: {
      city: "Tirupati",
      district: "Chittoor",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.6500, longitude: 79.4000 } // Approximate
    },
    category: ["Shaiva", "Sacred Pond"],
    deity: "Lord Shiva (Kapileswara)",
    description: "A sacred waterfall and pond located at the foothills of Tirumala, dedicated to Lord Shiva. It is believed that Sage Kapila meditated here.",
    history_summary: "An ancient site associated with various legends and considered holy by devotees. It is believed that Sage Kapila meditated here, giving the place its name. The temple dedicated to Lord Shiva (Kapileswara) is located at the base of the waterfall.",
    interesting_facts: [
      "It is the only Shiva temple in Tirupati, located at the foothills of Tirumala.",
      "The waterfall is believed to originate from the sacred Tirumala hills.",
      "Devotees often take a holy dip in the pond before visiting the Tirumala temple."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748754743/IMG_20250531_174759_yncffy.jpg", alt: "Kapila Theertham" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748754743/IMG_20250531_174732_q05e9j.jpg", alt: "Kapila Theertham idol" }
    ],
    famous_for: ["Sacred waterfall", "Kapileswara Temple"],
    rituals_practices: ["Holy dip", "Pujas"],
    visiting_hours: "6:00 AM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Flowers"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Special pujas and celebrations." }
    ]
  },

  {
    id: "papavinasanam",
    name: "Papavinasanam Temple",
    location: {
      city: "Tirupati",
      district: "Chittoor",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.6800, longitude: 79.3500 } // Approximate
    },
    category: ["Sacred Waterfalls"],
    deity: "Various Deities",
    description: "A sacred waterfall near Tirumala, believed to cleanse devotees of their sins. Pilgrims often take a holy bath here.",
    history_summary: "A natural site with spiritual significance, part of the Tirumala pilgrimage circuit. The waterfall is believed to have originated from the celestial Ganga and is highly revered for its purifying properties.",
    interesting_facts: [
      "The name 'Papavinasanam' literally means 'destroyer of sins'.",
      "Pilgrims believe that a bath in these waters cleanses them of all their sins.",
      "The site offers a serene natural environment amidst the Tirumala hills."
    ],
    architecture_style: "Natural site",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748754871/IMG_20250531_175905_iezpcf.jpg", alt: "Papavinasanam" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748754871/IMG_20250531_175842_i3z3fl.jpg", alt: "Papavinasanam waterfall" }
    ],
    famous_for: ["Holy bath", "Sin cleansing"],
    rituals_practices: ["Holy dip"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Free",
    prasads: [], // Natural site, no specific prasads
    festivals: [] // No specific festivals
  },
  {
    id: "vijayawada-kanaka-durga",
    name: "Kanaka Durga Temple, Vijayawada",
    location: {
      city: "Vijayawada",
      district: "Krishna",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.5186, longitude: 80.6190 }
    },
    category: ["Devi Temple"], // Removed Shakti Peetha category as per user request
    deity: "Goddess Kanaka Durga",
    description: "A famous Hindu temple of Goddess Durga located on the Indrakeeladri Hills on the banks of the Krishna River.",
    history_summary: "The temple has ancient origins, with references in the Puranas. It has been renovated and expanded by various rulers over time, and is particularly famous for its grand Dasara celebrations.",
    interesting_facts: [
      "The goddess is worshipped here as 'Kanaka Durga' (Golden Durga), symbolizing wealth and prosperity.",
      "The temple is located on the Indrakeeladri Hill, where Arjuna is believed to have obtained Pasupatastra from Lord Shiva.",
      "The annual Dasara Navaratri celebrations attract millions of devotees."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755688/IMG_20250531_181150_ohbbik.jpg", alt: "Kanaka Durga Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755690/IMG_20250531_181222_c0cwv4.jpg", alt: "Kanaka Durga Temple idol" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748756772/Durgotinashini_kbhtgb.mp3",
    famous_for: ["Dasara celebrations", "Krishna River"],
    rituals_practices: ["Daily pujas", "Dasara Navaratri"],
    visiting_hours: "4:00 AM - 9:00 PM",
    entry_fee: "Free (special entry tickets available)",
    website: "https://kanakadurgamma.org/",
    darshan_tickets: {
      is_available_online: true,
      booking_link: "https://kanakadurgamma.org/online-seva-booking", // Example link, might need verification
      types_of_darshan: [
        { name: "Antaralaya Darshanam", cost: "INR 100" },
        { name: "Moola Virat Darshanam", cost: "Free" }
      ],
      booking_notes: "Special darshan tickets can be booked online. Check for festival-specific timings.",
      approx_cost: "Free - INR 100+",
      identification_required: false
    },
    prasads: ["Laddu", "Pulihora"],
    festivals: [
      { name: "Dasara Navaratri", date_or_period: "September/October", description: "Grand celebrations for nine days, attracting huge crowds." },
      { name: "Bhavani Deeksha Viramana", date_or_period: "December", description: "Devotees conclude their Bhavani Deeksha." }
    ]
  },
  {
    id: "vakalmatha",
    name: "Vakula Matha Temple",
    location: {
      city: "Tirupati",
      district: "Chittoor",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.6288, longitude: 79.4192 } // Approximate
    },
    category: ["Vaishnava"],
    deity: "Goddess Vakula Matha",
    description: "Dedicated to Vakula Matha, the foster mother of Lord Venkateswara. This temple holds significant importance for devotees visiting Tirumala.",
    history_summary: "An ancient temple believed to be the residence of Vakula Matha, who looked after Lord Venkateswara during his incarnation. It is a revered site for devotees of Lord Venkateswara.",
    interesting_facts: [
      "Vakula Matha is believed to be a reincarnation of Yashoda, Lord Krishna's foster mother.",
      "The temple is located on the way to Tirumala and is often visited by pilgrims.",
      "It is believed that Lord Venkateswara used to seek her advice before his marriage."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748754945/IMG_20250531_181518_dipv0a.png", alt: "Vakula Matha Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755096/1000407713_4096_4096_qqqbyj.png", alt: "Vakula Matha Temple idol" }
    ],
    famous_for: ["Foster mother of Lord Venkateswara"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweet Pongal", "Curd Rice"],
    festivals: [] // No specific festivals
  },
  {
    id: "akasaganga",
    name: "Akasaganga Theertham",
    location: {
      city: "Tirupati",
      district: "Chittoor",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.6800, longitude: 79.3500 } // Approximate
    },
    category: ["Sacred Waterfalls"],
    deity: "Sacred Water",
    description: "A sacred waterfall and pilgrimage site near Tirumala. The holy water is used for the daily rituals of Lord Venkateswara.",
    history_summary: "Believed to be a divine waterfall, its water has been used for centuries for the deity's abhishekam (sacred bath) in the Tirumala temple. It is considered highly pure and sacred.",
    interesting_facts: [
      "The water from Akasaganga is exclusively used for the daily Abhishekam of Lord Venkateswara in the main Tirumala temple.",
      "It is believed that the water has divine properties and can cleanse sins.",
      "The site offers a serene and picturesque environment for pilgrims."
    ],
    architecture_style: "Natural site",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755146/IMG_20250531_180133_elpb8j.jpg", alt: "Akasaganga+Theertham" }
    ],
    famous_for: ["Holy water source for temple rituals"],
    rituals_practices: ["Holy dip"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Free",
    prasads: [], // Natural site, no specific prasads
    festivals: [] // No specific festivals
  },
  {
    id: "aliveru-mangamma",
    name: "Alipiri Padala Mandapam (Alivelu Mangamma Temple)",
    location: {
      city: "Tirupati",
      district: "Chittoor",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.6300, longitude: 79.4000 } // Approximate
    },
    category: ["Vaishnava"],
    deity: "Goddess Alamelu Mangamma (Padmavathi)",
    description: "The starting point of the pedestrian path to Tirumala. It houses a temple dedicated to Goddess Alamelu Mangamma, consort of Lord Venkateswara.",
    history_summary: "A traditional starting point for pilgrims walking to Tirumala, with historical and spiritual significance. It is customary for pilgrims to begin their trek to Tirumala from here, after offering prayers to Goddess Alamelu Mangamma.",
    interesting_facts: [
      "It is the main entry point for pilgrims who choose to walk up to Tirumala.",
      "The temple here is dedicated to Goddess Alamelu Mangamma, the consort of Lord Venkateswara.",
      "Pilgrims often offer their prayers and take a vow here before commencing their uphill journey."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755201/IMG_20250531_182116_cp99r4.jpg", alt: "Alipiri Padala Mandapam" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755201/IMG_20250531_182140_abjeng.jpg", alt: "Alipiri Padala Mandapam idol" }
    ],
    famous_for: ["Starting point of Tirumala trek", "Goddess Padmavathi"],
    rituals_practices: ["Offering prayers before trek"],
    visiting_hours: "24/7",
    entry_fee: "Free",
    prasads: ["Laddu", "Vada"],
    festivals: [] // No specific festivals
  },
  {
    id: "tiruchanur",
    name: "Sri Padmavathi Ammavari Temple, Tiruchanur",
    location: {
      city: "Tiruchanur",
      district: "Chittoor",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.6000, longitude: 79.4000 } // Approximate
    },
    category: ["Vaishnava"],
    deity: "Goddess Padmavathi (Lakshmi)",
    description: "Dedicated to Goddess Padmavathi, the consort of Lord Venkateswara. It is customary for pilgrims to visit this temple before visiting Tirumala.",
    history_summary: "An ancient temple with rich mythological connections to Lord Venkateswara and Goddess Lakshmi. It is believed that Lord Venkateswara's marriage to Goddess Padmavathi took place here.",
    interesting_facts: [
      "It is customary for pilgrims to visit this temple before visiting the main Tirumala Venkateswara Temple.",
      "Goddess Padmavathi is believed to be a manifestation of Goddess Lakshmi.",
      "The temple is known for its beautiful architecture and serene ambiance."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755241/IMG_20250531_182626_ia4lja.jpg", alt: "Sri Padmavathi Ammavari Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755241/IMG_20250531_182516_iimrwh.jpg", alt: "Sri Padmavathi Ammavari Temple idol" }
    ],
    famous_for: ["Goddess Padmavathi", "Pre-Tirumala visit"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "5:00 AM - 9:00 PM",
    entry_fee: "Free (special entry tickets available)",
    prasads: ["Laddu", "Sweet Pongal"],
    festivals: [
      { name: "Kartika Brahmotsavam", date_or_period: "November", description: "Annual Brahmotsavam for Goddess Padmavathi." },
      { name: "Navaratri", date_or_period: "September/October", description: "Nine days of devotion to Goddess Padmavathi." }
    ]
  },
  {
    id: "govindaraja",
    name: "Sri Govindaraja Swamy Temple",
    location: {
      city: "Tirupati",
      district: "Chittoor",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.6500, longitude: 79.4100 } // Approximate
    },
    category: ["Vaishnava"],
    deity: "Lord Govindaraja (Vishnu)",
    description: "A prominent temple in Tirupati dedicated to Lord Govindaraja, the elder brother of Lord Venkateswara. It is a major landmark in the city.",
    history_summary: "Built by Ramanujacharya in the 12th century, it is one of the largest temples in Tirupati and holds significant historical and religious importance.",
    interesting_facts: [
      "Lord Govindaraja is depicted in a reclining posture.",
      "The temple has a massive gopuram (gateway tower) that is a prominent landmark in Tirupati city.",
      "It is believed that Lord Venkateswara used to manage the wealth of Lord Govindaraja during his stay on Earth."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755281/IMG_20250531_183037_w7uena.jpg", alt: "Sri Govindaraja Swamy Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755284/IMG_20250531_183209_smtpb4.jpg", alt: "Sri Govindaraja Swamy Temple idol" }
    ],
    famous_for: ["Elder brother of Lord Venkateswara"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "5:00 AM - 9:00 PM",
    entry_fee: "Free",
    prasads: ["Laddu", "Pulihora"],
    festivals: [
      { name: "Brahmotsavam", date_or_period: "May/June", description: "Annual Brahmotsavam celebrated with processions." }
    ]
  },
  {
    id: "japali-anjaneya-swamy-temple-tirumala",
    name: "Japali Anjaneya Swamy Temple",
    location: {
      city: "Tirumala",
      district: "Tirupati (formerly Chittoor)",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.6819, longitude: 79.3520 } // Approximate
    },
    category: ["Hanuman Temple", "Teertham", "Forest Temple"],
    deity: "Lord Hanuman (Anjaneya Swamy)",
    description: "Nestled amidst the dense forests of Tirumala Hills, Japali Anjaneya Swamy Temple is a serene and sacred site dedicated to Lord Hanuman. It is also famously associated with Japali Teertham, a holy pond believed to have purifying powers. The temple offers a tranquil retreat for devotees and nature lovers alike.",
    history_summary: "Legend has it that Lord Hanuman meditated at this very spot, making it a highly sacred place. While ancient, historical records suggest the present temple dedicated to Lord Hanuman at Japali Teertham was built in the 15th century during the Vijaya Raghava Rayalu dynasty. The temple has seen periods of neglect and subsequent renovation, with significant restoration efforts in 1984 and 2008, bringing it back to prominence.",
    interesting_facts: [
      "It is believed that Lord Hanuman meditated at this spot, making it profoundly sacred.",
      "The site is also known as Japali Teertham, a holy pond whose waters are believed to cleanse sins.",
      "The idol of Lord Hanuman here is considered unique and revered, believed to bring strength and fulfillment of desires.",
      "Legend also associates Lord Rama, Sita, and Lakshmana with this place, with a pond inside the premises called 'Rama Kund' believed to be their drinking water source.",
      "An interesting natural formation resembling Lord Ganesha is said to have appeared on a tree at the temple's entrance, for devotees who worried about the absence of a Ganesha idol.",
      "The temple is located about 7 km from the main Sri Venkateswara Swamy Temple in Tirumala, requiring a walk of about 1 km through the forest from the nearest road point.",
      "It is a popular spot for performing 'Kala Sarpa Dosha' and 'Naga Dosha Nivarana' pujas."
    ],
    architecture_style: "Traditional South Indian Temple Architecture",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748757086/IMG-20250524-WA0046_xaqjgm.jpg", alt: "Japali Anjaneya Swamy Temple, Tirumala" }, // Placeholder
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748757087/IMG_20250601_112018_rblsda.jpg", alt: "Japali Teertham pond" } // Placeholder
    ],
    famous_for: ["Lord Hanuman's meditation place", "Japali Teertham (holy pond)", "Serene forest setting"],
    rituals_practices: ["Offering prayers to Lord Hanuman", "Taking a holy dip in Japali Teertham", "Performing Abhishekam (especially on Tuesdays)"],
    visiting_hours: "6:00 AM to 6:00 PM daily (It is recommended to visit during daylight hours due to the forest route).",
    entry_fee: "No entry fee.",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. Special pujas like Abhishekam can be performed with on-site payment (e.g., Abhishekam around ₹1100).",
      approx_cost: "Free - Varies for pujas",
      identification_required: false
    },
    prasads: ["Typically fruits and flowers offered by devotees"],
    festivals: [
      { name: "Hanuman Jayanti", date_or_period: "Celebrated with pomp, often in April/May depending on the calendar.", description: "Special pujas and celebrations marking the birth of Lord Hanuman." },
      { name: "Rama Navami", date_or_period: "March/April", description: "Celebrations related to Lord Rama, given the temple's association." },
      { name: "Ksheerabdi Dwadasi", date_or_period: "Kartika Masa (October/November)", description: "Specific traditional festival." },
      { name: "Kumaradhara Magha Pournami", date_or_period: "Magha Masa (January/February)", description: "Specific traditional festival." }
    ],
    how_to_reach: {
      by_air: "Nearest Airport: Tirupati Airport (TIR), approximately 40 km from Tirumala. Well-connected to major Indian cities.",
      by_rail: "Nearest Railway Station: Tirupati Railway Station, about 25 km from Tirumala. Well-connected to major cities.",
      by_road: "From Tirumala, Japali Teertham is about 7 km. APSRTC (Andhra Pradesh State Road Transport Corporation) operates 'Travel as you like' bus services from Tirumala towards Papavinasam, covering Japali. Alternatively, taxis/jeeps are available. From the road, a walk of approximately 1 km (involving steps) through the forest is required to reach the temple. It's advisable to carry water."
    },
    nearby_attractions: [
      "Sri Venkateswara Swamy Temple, Tirumala (main temple)",
      "Akasaganga Teertham",
      "Papavinasam Teertham",
      "Sila Thoranam (Natural Arch)",
      "Sri Bedi Anjaneya Swamy Temple (near main temple)"
    ]
  },
  {
    id: "annavaram",
    name: "Sri Veera Venkata Satyanarayana Swamy Temple, Annavaram",
    location: {
      city: "Annavaram",
      district: "East Godavari",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 17.3000, longitude: 82.5800 } // Approximate
    },
    category: ["Vaishnava"],
    deity: "Lord Satyanarayana Swamy",
    description: "A popular pilgrimage site dedicated to Lord Satyanarayana Swamy, located on the Ratnagiri Hills. Famous for performing Satyanarayana Vratam.",
    history_summary: "The temple is relatively modern but built on an ancient site. It attracts a large number of devotees, particularly for performing the Satyanarayana Vratam, a ritual for prosperity and well-being.",
    interesting_facts: [
      "The main deity is a unique two-tiered idol, with Lord Vishnu in the lower part and Lord Shiva in the upper part.",
      "The temple is built in the shape of a chariot, with four wheels at each corner.",
      "It is a very popular place for performing the Satyanarayana Vratam, a ritual for prosperity and success."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755404/IMG_20250531_183717_vpp5rf.jpg", alt: "Annavaram Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755406/mainimage_wsturi.gif", alt: "Annavaram Temple idol" }
    ],
    famous_for: ["Satyanarayana Vratam", "Ratnagiri Hills"],
    rituals_practices: ["Satyanarayana Vratam", "Daily pujas"],
    visiting_hours: "6:00 AM - 12:30 PM, 2:00 PM - 8:00 PM",
    entry_fee: "Free (Vratam has fees)",
    prasads: ["Prasadam (Sweet)", "Pulihora"],
    festivals: [
      { name: "Kalyanotsavam", date_or_period: "Various auspicious days", description: "Celestial wedding ceremony of the deities." }
    ]
  },
  {
    id: "dwaraka-tirumala",
    name: "Sri Venkateswara Temple, Dwaraka Tirumala (Chinna Tirupati)",
    location: {
      city: "Dwaraka Tirumala",
      district: "Eluru",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.9500, longitude: 81.2667 } // Approximate coordinates
    },
    category: ["Vaishnava", "Ancient", "Pilgrimage"],
    deity: "Lord Venkateswara (Vishnu)",
    description: "Known as 'Chinna Tirupati', this ancient Hindu temple in Dwaraka Tirumala is dedicated to Lord Venkateswara, an incarnation of Lord Vishnu. Unique for housing two idols of Lord Venkateswara under one Vimana Sikharam: a self-manifested idol (upper half visible) and a complete statue installed by sages for full worship. It is considered a spiritual alternative to the famous Tirupati temple.",
    history_summary: "The temple's origins are ancient, linked to sage Dwaraka who discovered the self-manifested idol after intense penance. Key structures (vimana, mantapa, gopura, prakara) were built by Dharma Appa Rao (1762 – c. 1827). Rani Chinnamma Rao (1877-1902) donated golden ornaments and silver vahanas. The full-size idol was installed by Srimad Ramanujacharya in the 11th century.",
    interesting_facts: [
      "Known as 'Chinna Tirupati' (Mini Tirupati), offering a spiritual alternative to Tirupati.",
      "Houses two main idols of Lord Venkateswara under one Vimana Sikharam: a self-manifested half-statue and a complete statue for full worship.",
      "The self-manifested idol is visible only up to the bust, with the lower portion believed to be submerged in an anthill.",
      "The second idol was installed by ancient saints to allow for complete foot worship (Pada Puja).",
      "The region between Krishna and Godavari rivers, including Dwaraka Tirumala, is considered highly sacred as per Brahma Purana.",
      "The Tiru Kalyanotsavam is celebrated twice a year, once for each idol.",
      "The hill on which the temple is located is believed to be in the form of a serpent."
    ],
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749123840/IMG_20250605_170922_bwwjcj.jpg", alt: "Dwaraka Tirumala Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749123840/IMG_20250605_170503_qfhnm7.jpg", alt: "Dwaraka Tirumala Temple Gopuram" }
    ],
    audio: "", // Add audio URL if available
    famous_for: "Being 'Chinna Tirupati' (Mini Tirupati), housing two unique idols of Lord Venkateswara under one Vimana Sikharam, and its significance as a wish-fulfilling deity.",
    rituals: [
      "**Daily Pujas:** Suprabhatha Seva, Thomala Seva, Archana, Astadalapada Padmaradhana, Abhishekam (for Moolavirat & Utsavabera), Ekantha Seva.",
      "**Special Sevas:** Kalyanotsavam (celestial wedding, performed twice daily), Arjita Sevas, different types of Vahanasevas during festivals.",
      "Devotees perform Angapradakshinam (rolling around the temple) and offer hair as offerings."
    ],
    visiting_hours: "Generally from 5:00 AM to 9:00 PM, with breaks for various sevas and rituals. Timings can vary during festivals and special occasions.",
    entry_fee: "Basic darshan is free. Special entry tickets (e.g., ₹100 or ₹300) are available for faster darshan. Charges apply for specific sevas like Kalyanotsavam.",
    prasads: [
      "**Laddu:** A sweet delicacy, popular among devotees.",
      "Pulihora (Tamarind Rice), Chakra Pongali, Daddojanam (Curd Rice)."
    ],
    festivals: [
      "**Dhanurmasam:** Celebrated with special rituals during the month of Dhanurmasam.",
      "**Tiru Kalyanotsavam:** Performed daily, and grandly celebrated twice a year (one for each idol).",
      "**Brahmotsavams:** Annual mega festival, celebrated with pomp and splendor.",
      "Sri Rama Navami, Hanumath Jayanthi, Vaikunta Ekadashi, Sankranti."
    ]
  },
  {
    id: "gollamamida-kodandarama",
    name: "Kodandarama Temple, Gollala Mamidada",
    location: {
      city: "Gollala Mamidada",
      district: "Kakinada",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.9382, longitude: 82.0738 } // Approximate coordinates
    },
    category: ["Vaishnava", "Ancient", "Ramayana"],
    deity: "Lord Rama (Kodandarama Swamy), Sita, Lakshmana, Hanuman",
    description: "Dedicated to Lord Rama, this temple in Gollala Mamidada is famous for its unique architecture and two massive gopurams (160-170 feet and 200-210 feet tall) adorned with intricately carved statues depicting scenes from Ramayana, Mahabharata, and Bhagavatam. It is often referred to as 'Chinna Bhadradi' or 'Little Bhadrachalam'.",
    history_summary: "Construction began in 1889 by brothers Dwarampudi Subbi Reddy and Rami Reddy with wooden idols. A larger temple was built in 1939. The two huge gopurams were constructed in 1948-50 (East) and 1956-58 (West). A mirror hall was added in 1975. The temple is situated on the banks of Tulyabhaga (Antharvahini) river.",
    interesting_facts: [
      "Known as 'Chinna Bhadradi' or 'Little Bhadrachalam', one of the most popular Rama temples in Andhra Pradesh.",
      "Features two impressive gopurams, one reaching 200-210 feet, covered with detailed carvings.",
      "The gopurams depict scenes from Ramayana, Mahabharata, and Bhagavatam.",
      "Contains a mirror hall (addala mandapam) with stucco reliefs of Sri Rama Pattabhishekam.",
      "The Sikhara of the temple is carved with statues depicting Bala Ramayana (childhood of Rama).",
      "Devotees can climb 300 steps to reach the top storey of the gopurams.",
      "A Pushkarini (pond) nearby is sourced from the Tulyabhaga river."
    ],
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749123914/IMG_20250605_170856_csn3lq.jpg", alt: "Kodandarama Temple, Gollala Mamidada" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749123914/20250605_170721_ngouih.jpg", alt: "Gollala Mamidada Gopuram" }
    ],
    audio: "",
    famous_for: "Being 'Chinna Tirupati' (Mini Tirupati), housing two unique idols of Lord Venkateswara under one Vimana Sikharam, and its significance as a wish-fulfilling deity.",
    rituals: [
      "**Daily Pujas:** Suprabhatha Seva, Thomala Seva, Archana, Astadalapada Padmaradhana, Abhishekam (for Moolavirat & Utsavabera), Ekantha Seva.",
      "**Special Sevas:** Kalyanotsavam (celestial wedding, performed twice daily), Arjita Sevas, different types of Vahanasevas during festivals.",
      "Devotees perform Angapradakshinam (rolling around the temple) and offer hair as offerings."
    ],
    visiting_hours: "Generally from 5:00 AM to 9:00 PM, with breaks for various sevas and rituals. Timings can vary during festivals and special occasions.",
    entry_fee: "Basic darshan is free. Special entry tickets (e.g., ₹100 or ₹300) are available for faster darshan. Charges apply for specific sevas like Kalyanotsavam.",
    prasads: [
      "**Laddu:** A sweet delicacy, popular among devotees.",
      "Pulihora (Tamarind Rice), Chakra Pongali, Daddojanam (Curd Rice)."
    ],
    festivals: [
      "**Dhanurmasam:** Celebrated with special rituals during the month of Dhanurmasam.",
      "**Tiru Kalyanotsavam:** Performed daily, and grandly celebrated twice a year (one for each idol).",
      "**Brahmotsavams:** Annual mega festival, celebrated with pomp and splendor.",
      "Sri Rama Navami, Hanumath Jayanthi, Vaikunta Ekadashi, Sankranti."
    ]
  },
  {
    id: "tenkasi-kasi-viswanathar",
    name: "Kasi Viswanathar Temple, Tenkasi",
    location: {
      city: "Tenkasi",
      district: "Tenkasi",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 8.9667, longitude: 77.3000 } // Approximate coordinates
    },
    category: ["Shaiva", "Ancient", "Paadal Petra Sthalam"],
    deity: "Lord Shiva (Kasi Viswanathar), Goddess Parvathi (Ulagamman)",
    description: "Dedicated to Lord Shiva, this ancient Hindu temple in Tenkasi is known as 'Kasi of South' due to the belief that worshipping here is equivalent to worshipping in Varanasi (Kasi). It features a grand seven-tiered gopuram (180 feet tall) and exquisite sculptures. The main deity, Lord Kasi Viswanathar, is a swayambumurthi (self-manifested).",
    history_summary: "Believed to be built by Pandyan ruler Parakrama Pandyan in the 13th-15th century. Legend says Shiva appeared in the king's dream, guiding him to build the temple where an army of ants ended. The main tower (Rajagopuram) was completed in 1505, caught fire in 1824, and was renovated from 1966-1990 to its current 180-foot height.",
    interesting_facts: [
      "Known as 'Kasi of South'; worshipping here is believed to be equivalent to worshipping in Varanasi (Kasi).",
      "Lord Shiva graces as a swayambumurthi (self-manifested idol).",
      "The 180-foot tall Rajagopuram is one of the tallest in Tamil Nadu and offers a pathway up to the 9th tier for panoramic views.",
      "Features musical stone pillars that produce different sounds when tapped.",
      "Goddess Durga faces west here, unlike the typical south-facing orientation in most temples.",
      "The nearby Chitraru river is considered equivalent to the holy Ganga."
    ],
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749124015/IMG_20250605_170805_agoot1.jpg", alt: "Kasi Viswanathar Temple, Tenkasi" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749124015/IMG_20250605_170946_if6bji.jpg", alt: "Tenkasi Shivalinga" }
    ],
    audio: "",// Add audio URL if available,
    famous_for: "Being the 'Kasi of South' where worship is equivalent to Varanasi; its magnificent 180-foot Rajagopuram and exquisite sculptures.",
    rituals: [
      "**Pujas:** Six daily pujas performed from morning to evening, including Kaalasandhi (morning), Uchikkalam (mid-day), Sayarakshai (evening), and Arthajamam (night).",
      "Abhishekam (sacred bathing) and Archanai (chanting of names) are common offerings.",
      "Special pujas are performed during festivals and auspicious days."
    ],
    visiting_hours: "Typically 6:00 AM to 12:00 PM and 4:00 PM to 9:00 PM. Timings may vary slightly.",
    entry_fee: "Free entry. Charges may apply for special darshans or specific offerings/sevas.",
    prasads: [
      "Varieties of Pongal (sweet and savory), Daddojanam (Curd Rice), Chakkarai Pongal (Sweet Pongal).",
      "General temple prasadams and laddu."
    ],
    festivals: [
      "**Masi Magam:** Grandly celebrated with devotees taking a holy dip in Chitraru river.",
      "**Thai Poosam:** Special celebrations and processions.",
      "Sivaratri, Karthigai Deepam, Aadi Pooram (for Goddess Ulagamman), Navaratri."
    ]
  },
  {
    id: "simhachalam",
    name: "Simhachalam Temple",
    location: {
      city: "Visakhapatnam",
      district: "Visakhapatnam",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 17.7800, longitude: 83.3000 } // Approximate
    },
    category: ["Vaishnava"],
    deity: "Lord Varaha Lakshmi Narasimha Swami",
    description: "A famous Hindu temple located on the Simhachalam Hill, dedicated to Lord Varaha Lakshmi Narasimha. The deity is usually covered in sandalwood paste.",
    history_summary: "The temple dates back to the 11th century and has inscriptions from various dynasties including the Cholas and Eastern Gangas. It is a unique temple where the deity is always covered in sandalwood paste.",
    interesting_facts: [
      "The main deity is always covered in a thick layer of sandalwood paste, resembling a Shiva Lingam. It is only uncovered once a year during 'Chandanotsavam'.",
      "The temple architecture is a blend of Kalinga and Dravidian styles.",
      "It is believed that the temple was built by Prahlada, the devotee of Lord Narasimha."
    ],
    architecture_style: "Kalinga",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755363/IMG_20250531_183947_gqztec.jpg", alt: "Simhachalam Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755366/IMG_20250531_184110_kvgqkb.jpg", alt: "Simhachalam Temple idol" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748768453/yamadonga_narasimha_gwug8i.mp3",
    famous_for: ["Sandalwood-covered deity", "Chandanotsavam"],
    rituals_practices: ["Daily pujas", "Chandanotsavam"],
    visiting_hours: "4:00 AM - 9:00 PM",
    entry_fee: "Free (special entry tickets available)",
    prasads: ["Chandan (Sandalwood paste)", "Laddu"],
    festivals: [
      { name: "Chandanotsavam", date_or_period: "April/May", description: "The only day in a year when the deity is divested of sandalwood paste for public darshan." }
    ]
  },
  {
    id: "kanipakam",
    name: "Kanipakam Vinayaka Temple",
    location: {
      city: "Kanipakam",
      district: "Chittoor",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 13.3000, longitude: 79.1000 } // Approximate
    },
    category: ["Ganesha Temple"],
    deity: "Lord Ganesha (Vinayaka)",
    description: "A famous temple dedicated to Lord Ganesha, known for its self-manifested idol that is believed to be growing in size.",
    history_summary: "The temple was built in the 11th century by the Chola king Kulothunga Chola I and expanded by the Vijayanagara rulers. It is famous for its unique self-manifested idol.",
    interesting_facts: [
      "The idol of Lord Ganesha is believed to be self-manifested and is said to be growing in size.",
      "The temple is known for its 'Satyapramanam' (oath-taking) system, where disputes are resolved by taking an oath before the deity.",
      "The temple pond is believed to have miraculous powers."
    ],
    architecture_style: "Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755324/IMG_20250531_184628_koyw5n.jpg", alt: "Kanipakam Vinayaka Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748755322/IMG_20250531_184559_ps50u8.jpg", alt: "Kanipakam Vinayaka Temple idol" }
    ],
    famous_for: ["Self-manifested growing idol", "Swarnotsavam"],
    rituals_practices: ["Daily pujas", "Brahmotsavam"],
    visiting_hours: "4:00 AM - 9:30 PM",
    entry_fee: "Free (special entry tickets available)",
    prasads: ["Modak", "Laddu"],
    festivals: [
      { name: "Vinayaka Chavithi (Ganesh Chaturthi)", date_or_period: "August/September", description: "Grand celebrations for Lord Ganesha's birthday." },
      { name: "Brahmotsavam", date_or_period: "September/October (20 days)", description: "Annual festival with various rituals and processions." }
    ]
  },
  {
    id: "bikkavolu-lakshmi-ganapathi",
    name: "Sri Lakshmi Ganapathi Vari Devasthanam (Bikkavolu Ganesha Temple)",
    location: {
      city: "Bikkavolu",
      district: "East Godavari",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.9500, longitude: 82.0500 } // Approximate, same as general Bikkavolu entry
    },
    category: ["Ganesha Temple", "Ancient"],
    deity: "Lord Ganesha (Lakshmi Ganapathi)",
    description: "A prominent ancient temple in Bikkavolu dedicated to Lord Ganesha, famous for its self-manifested idol that is believed to be growing in size. Devotees often whisper their wishes into the Lord's ear here.",
    history_summary: "The temple is believed to have been built by the Eastern Chalukyas around 840 AD. Its main deity is a 'Swayambhu' (self-manifested) idol, a testament to its ancient origins and spiritual significance.",
    interesting_facts: [
      "The main deity is a 'Swayambhu' (self-manifested) idol, approximately 7 feet tall, and is believed to be growing in size year by year.",
      "Devotees often whisper their wishes into the Lord's ear.",
      "Water is believed to emerge from the bottom portion of the Lord's left leg.",
      "It is one of the important temples in the Bikkavolu cluster, showcasing Eastern Chalukyan architectural styles."
    ],
    architecture_style: "Dravidian, Eastern Chalukyan",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748756162/IMG_20250601_105517_jbrcw6.jpg", alt: "Sri Lakshmi Ganapathi Temple, Bikkavolu" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748756161/17253581722037451265_n4tps2.png", alt: "Sri Lakshmi Ganapathi Temple idol" }
    ],
    famous_for: ["Self-manifested growing Ganesh idol", "Whispering wishes ritual"],
    rituals_practices: ["Daily pujas", "Whispering wishes to Ganesh"],
    visiting_hours: "Generally, temples are open from 6:00 AM - 1:00 PM and 4:00 PM - 8:00 PM (specific timings may vary)",
    entry_fee: "Free (special pujas and services may have fees)",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. Special pujas are typically booked on-site.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Modak", "Sweets"],
    festivals: [
      { name: "Vinayaka Chavithi (Ganesh Chaturthi)", date_or_period: "August/September", description: "Grand celebrations for Lord Ganesha's birthday, attracting many devotees." }
    ],
  },
  {
    id: "lakshmana-khajuraho",
    name: "Lakshmana Temple, Khajuraho",
    location: {
      city: "Khajuraho",
      district: "Chhatarpur",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 24.8500, longitude: 79.9300 } // Approximate
    },
    category: ["Vaishnava", "UNESCO World Heritage"],
    deity: "Lord Vishnu (Vaikuntha Vishnu)",
    description: "Part of the Western Group of Temples at Khajuraho, famous for its intricate erotic sculptures. Dedicated to Vaikuntha Vishnu.",
    history_summary: "Built by Chandela king Lakshmanavarman in the 10th century. It is one of the best-preserved temples in Khajuraho, showcasing the pinnacle of Chandela art and architecture.",
    interesting_facts: [
      "The temple is famous for its intricate and often explicit erotic sculptures, which depict various aspects of human life and spirituality.",
      "It is one of the largest and most ornate temples in the Western Group of Khajuraho temples.",
      "The temple is a UNESCO World Heritage Site, recognized for its unique artistic and architectural achievements."
    ],
    architecture_style: "Nagara (Chandela)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771732/IMG_20250531_185826_kgsipe.jpg", alt: "Lakshmana Temple, Khajuraho" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771740/IMG_20250531_185900_erwlo4.jpg", alt: "Lakshmana Temple idol" }
    ],
    famous_for: ["Erotic sculptures", "UNESCO site"],
    rituals_practices: ["Historical site"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Yes",
    prasads: [], // Historical site, no specific prasads
    festivals: [] // Historical site, no specific festivals
  },
  {
    id: "pashupatinath-mandsaur",
    name: "Shri Pashupatinath Temple, Mandsaur",
    location: {
      city: "Mandsaur",
      district: "Mandsaur",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 24.0300, longitude: 75.0800 } // Approximate
    },
    category: ["Shaiva"],
    deity: "Lord Shiva (Pashupatinath)",
    description: "A unique temple dedicated to Lord Shiva, housing an eight-faced (Ashtamukhi) Shiva Lingam. Located on the banks of the Shivna River.",
    history_summary: "The idol was discovered in 1940 and the temple was built around it. It is a significant pilgrimage site in Madhya Pradesh, attracting devotees from far and wide.",
    interesting_facts: [
      "The main deity is an eight-faced (Ashtamukhi) Shiva Lingam, which is considered very rare and sacred.",
      "The Lingam is believed to be naturally formed and is worshipped from all eight directions.",
      "The temple is located on the banks of the Shivna River, adding to its serene ambiance."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771771/pashupatinath-temple_zrngfk.png", alt: "Shri Pashupatinath Temple, Mandsaur" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771763/IMG_20250531_190249_hw2ovz.jpg", alt: "Shri Pashupatinath Temple idol" }
    ],
    famous_for: ["Eight-faced Shiva Lingam", "Shivna River"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 9:00 PM",
    entry_fee: "Free",
    prasads: ["Bael Patra", "Milk"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Major festival celebrated with special pujas." }
    ]
  },
  {
    id: "javari-khajuraho",
    name: "Javari Temple, Khajuraho",
    location: {
      city: "Khajuraho",
      district: "Chhatarpur",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 24.8500, longitude: 79.9300 } // Approximate
    },
    category: ["Vaishnava", "UNESCO World Heritage"],
    deity: "Lord Vishnu",
    description: "A smaller but exquisitely carved temple dedicated to Lord Vishnu, part of the Eastern Group of Temples in Khajuraho.",
    history_summary: "Built in the late 11th century by the Chandela dynasty, it showcases the refined artistry of the period. It is a well-preserved example of the smaller temples in Khajuraho.",
    interesting_facts: [
      "Despite its smaller size, the temple is known for its exquisite carvings and sculptures, similar to the larger temples in Khajuraho.",
      "It is part of the Eastern Group of Temples, which primarily consists of Jain and Hindu temples.",
      "The temple is a UNESCO World Heritage Site, recognized for its unique artistic and architectural achievements."
    ],
    architecture_style: "Nagara (Chandela)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771795/Khajuraho_Jeveri_Temple_2010_cjbgll.jpg", alt: "Javari Temple, Khajuraho" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771785/0121821_Javari_Temple__Khajuraho_Madhya_Pradesh_111_qkcir4.jpg", alt: "Javari Temple idol" }
    ],
    famous_for: ["Intricate carvings", "UNESCO site"],
    rituals_practices: ["Historical site"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Yes",
    prasads: [], // Historical site, no specific prasads
    festivals: [] // Historical site, no specific festivals
  },
  {
    id: "saas-bahu",
    name: "Saas Bahu Temple, Gwalior",
    location: {
      city: "Gwalior",
      district: "Gwalior",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 26.2150, longitude: 78.1760 } // Approximate
    },
    category: ["Vaishnava"],
    deity: "Lord Vishnu (Padmanabha)",
    description: "A pair of elaborately carved Hindu temples, dedicated to Lord Vishnu, located in the Raval Fort complex. Known for their intricate sculptures.",
    history_summary: "Built in the 11th century by King Mahipala of the Kachchhapaghata dynasty. The name 'Saas Bahu' (Mother-in-law and Daughter-in-law) is a local colloquialism and not related to the deities.",
    interesting_facts: [
      "The name 'Saas Bahu' is a misnomer; the temples are actually 'Sahastra Bahu' (thousand-armed) temples, referring to Lord Vishnu.",
      "There are two temples, a larger one and a smaller one, built adjacent to each other.",
      "The temples are famous for their intricate carvings and sculptures, depicting various mythological scenes."
    ],
    architecture_style: "Kachchhapaghata",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771829/ksp_4547-cover_godoud.jpg", alt: "Saas Bahu Temple, Gwalior" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771821/IMG_20250531_191123_zcfscw.jpg", alt: "Saas Bahu Temple idol" }
    ],
    famous_for: ["Intricate carvings", "Gwalior Fort"],
    rituals_practices: ["Historical site"],
    visiting_hours: "8:00 AM - 6:00 PM",
    entry_fee: "Yes",
    prasads: [], // Historical site, no specific prasads
    festivals: [] // Historical site, no specific festivals
  },
  {
    id: "chausath-yogini",
    name: "Chausath Yogini Temple, Bhedaghat",
    location: {
      city: "Bhedaghat",
      district: "Jabalpur",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 23.1500, longitude: 79.8000 } // Approximate
    },
    category: ["Devi Temple", "Ancient"],
    deity: "64 Yoginis",
    description: "An ancient temple dedicated to 64 Yoginis, known for its circular structure and unique sculptures. Located near the Marble Rocks of Narmada.",
    history_summary: "Built in the 10th century by the Kalachuri dynasty. It is one of the few surviving Yogini temples in India, showcasing a unique circular architectural style.",
    interesting_facts: [
      "The temple is circular in design, with 64 cells, each housing a statue of a Yogini (female attendant of Goddess Durga).",
      "It is one of the four major Chausath Yogini temples in India.",
      "The temple offers panoramic views of the Narmada River and the Marble Rocks."
    ],
    architecture_style: "Kalachuri",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772213/Chausath_Yogini_Temple__Mitaoli__Morena_006-min_hbcluv.jpg", alt: "Chausath Yogini Temple, Bhedaghat" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771885/Chausath-Yogini-Temple-Morena-MP.pdf-image-000_hisbta.png", alt: "Chausath Yogini Temple idol" }
    ],
    famous_for: ["64 Yoginis", "Circular architecture", "Marble Rocks"],
    rituals_practices: ["Historical site"],
    visiting_hours: "Sunrise to Sunset",
    entry_fee: "Yes",
    prasads: [], // Historical site, no specific prasads
    festivals: [] // Historical site, no specific festivals
  },
  {
    id: "annapurna-indore",
    name: "Annapurna Temple, Indore",
    location: {
      city: "Indore",
      district: "Indore",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 22.7196, longitude: 75.8577 }
    },
    category: ["Devi Temple"],
    deity: "Goddess Annapurna",
    description: "A prominent temple dedicated to Goddess Annapurna, the goddess of food. It is known for its grand entrance and intricate carvings.",
    history_summary: "A relatively modern temple, but a significant pilgrimage site for devotees seeking blessings for prosperity and food. It is known for its grand entrance gate adorned with four life-size elephant sculptures.",
    interesting_facts: [
      "The temple's entrance gate is a replica of the Meenakshi Temple in Madurai.",
      "It houses shrines dedicated to Shiva, Hanuman, and Kalabhairava, in addition to the main deity, Goddess Annapurna.",
      "The temple is a popular destination for devotees seeking blessings for food and abundance."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772259/IMG_20250531_212256_vrbudc.jpg", alt: "Annapurna Temple, Indore" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772268/IMG_20250531_212322_p2oco6.jpg", alt: "Annapurna Temple idol" }
    ],
    famous_for: ["Goddess of food", "Grand entrance"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "5:00 AM - 9:00 PM",
    entry_fee: "Free",
    prasads: ["Sweet Rice", "Fruits"],
    festivals: [
      { name: "Annapurna Jayanti", date_or_period: "December/January", description: "Celebrates the birth of Goddess Annapurna." },
      { name: "Navaratri", date_or_period: "March/April & September/October", description: "Nine days of devotion to the Goddess." }
    ]
  },
  {
    id: "chintaman-ganesh",
    name: "Chintaman Ganesh Temple, Ujjain",
    location: {
      city: "Ujjain",
      district: "Ujjain",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 23.1795, longitude: 75.7656 } // Approximate
    },
    category: ["Ganesha Temple"],
    deity: "Lord Ganesha (Chintaman)",
    description: "An ancient temple dedicated to Lord Ganesha, believed to be the oldest Ganesh temple in Ujjain. 'Chintaman' means 'assurer of freedom from tension'.",
    history_summary: "The temple dates back to the 11th century and is a revered site for devotees seeking peace of mind. It is believed that Lord Rama visited this temple during his exile.",
    interesting_facts: [
      "The idol of Lord Ganesha is believed to be self-manifested.",
      "The name 'Chintaman' refers to the deity's power to relieve worries and anxieties.",
      "The temple is located on the banks of the Kshipra River."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772332/IMG_20250531_212625_mi4wn3.png", alt: "Chintaman Ganesh Temple, Ujjain" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772511/1000408001_4096_3768_qtznaz.png", alt: "Chintaman Ganesh Temple idol" }
    ],
    famous_for: ["Ancient Ganesh temple", "Remover of worries"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "5:00 AM - 9:00 PM",
    entry_fee: "Free",
    prasads: ["Modak", "Laddu"],
    festivals: [
      { name: "Ganesh Chaturthi", date_or_period: "August/September", description: "Grand celebrations for Lord Ganesha's birthday." }
    ]
  },
  {
    id: "parsvanath-khajuraho",
    name: "Parsvanath Temple, Khajuraho",
    location: {
      city: "Khajuraho",
      district: "Chhatarpur",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 24.8500, longitude: 79.9300 } // Approximate
    },
    category: ["Jain Temple", "UNESCO World Heritage"],
    deity: "Lord Parsvanath",
    description: "The largest Jain temple in the Eastern Group of Temples at Khajuraho, known for its exquisite carvings and sculptures.",
    history_summary: "Built by the Chandela dynasty in the 10th century. It is a significant example of Jain temple architecture, showcasing the rich cultural and religious diversity of Khajuraho.",
    interesting_facts: [
      "The temple features intricate carvings that are both religious and secular, including scenes of daily life.",
      "It is the largest Jain temple in the Eastern Group of Khajuraho temples.",
      "The temple is a UNESCO World Heritage Site, part of the famous Khajuraho Group of Monuments."
    ],
    architecture_style: "Nagara (Chandela)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772540/Le_temple_de_Parshvanath__Khajuraho___8638423582_wtr9jk.jpg", alt: "Parsvanath Temple, Khajuraho" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772530/ksp_5463-2_mju2xn.jpg", alt: "Parsvanath Temple idol" }
    ],
    famous_for: ["Jain architecture", "Intricate carvings", "UNESCO site"],
    rituals_practices: ["Historical site"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Yes",
    prasads: [], // Historical site, no specific prasads
    festivals: [] // Historical site, no specific festivals
  },
  {
    id: "kalika-mata-ratlam",
    name: "Kalika Mata Mandir, Ratlam",
    location: {
      city: "Ratlam",
      district: "Ratlam",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 23.3300, longitude: 75.0300 } // Approximate
    },
    category: ["Devi Temple"],
    deity: "Goddess Kalika Mata",
    description: "A popular temple dedicated to Goddess Kalika Mata, a form of Durga. It is a significant local pilgrimage site.",
    history_summary: "An ancient temple revered by the local population, attracting devotees throughout the year. It is believed to be one of the oldest temples in Ratlam.",
    interesting_facts: [
      "The temple is dedicated to Goddess Kalika, a fierce form of Durga.",
      "It is a prominent local pilgrimage site, especially during Navaratri.",
      "The temple is known for its peaceful ambiance and spiritual vibrations."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772918/1000408003_4096_3066_wdyth8.png", alt: "Kalika Mata Mandir, Ratlam" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772589/IMG_20250531_213153_vaxaqk.jpg", alt: "Kalika Mata Mandir idol" }
    ],
    famous_for: ["Goddess Kalika"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets", "Chunri"],
    festivals: [
      { name: "Navaratri", date_or_period: "March/April & September/October", description: "Nine days of devotion to Goddess Kalika." }
    ]
  },
  {
    id: "maihar-devi",
    name: "Maihar Devi Temple",
    location: {
      city: "Maihar",
      district: "Satna",
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 24.2700, longitude: 80.7500 } // Approximate
    },
    category: ["Devi Temple"],
    deity: "Goddess Sharda Devi",
    description: "A famous hilltop temple dedicated to Goddess Sharda Devi.",
    history_summary: "An ancient temple with a long history of devotion, attracting a large number of pilgrims. It is believed that the temple was built by the local kings.",
    interesting_facts: [
      "The temple is located on Trikuta Hill, accessible by stairs or a ropeway.",
      "Goddess Sharda Devi is considered a manifestation of Goddess Saraswati.",
      "It is believed that the famous musicians Alha and Udal were devotees of the Goddess and still visit the temple at night."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772629/IMG_20250531_213449_m50fjl.jpg", alt: "Maihar Devi Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748772619/IMG_20250531_213424_qka9rq.jpg", alt: "Maihar Devi Temple idol" }
    ],
    famous_for: ["Hilltop location"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets", "Chunri"],
    festivals: [
      { name: "Navaratri", date_or_period: "March/April & September/October", description: "Grand celebrations for Goddess Sharda." }
    ]
  },
  {
    id: "rama-raja-temple-orchha",
    name: "Ram Raja Temple",
    location: {
      city: "Orchha",
      district: "Niwari", // Previously in Tikamgarh, now Niwari district
      state: "Madhya Pradesh",
      country: "India",
      coordinates: { latitude: 25.3508, longitude: 78.6400 } // Approximate coordinates for Orchha
    },
    category: ["Rama Temple", "Palace Temple", "Unique Worship"],
    deity: "Lord Rama (as King), accompanied by Sita, Lakshmana, Sugriva, Narsingh Bhagwan, Durga Maa, Hanuman, and Jambavan",
    description: "The Ram Raja Temple in Orchha is a highly revered Hindu pilgrimage site and is uniquely known as the only temple in India where Lord Rama is worshipped as a king, and that too, within a palace. Originally the palace of Queen Ganesh Kunwari, it transformed into a temple due to a divine incident, embodying a blend of Rajput and Mughal architectural styles.",
    history_summary: "The temple's origin is steeped in legend. King Madhukar Shah Ju Dev of Orchha (1554–1592) was a devotee of Lord Krishna, while his wife, Queen Ganesh Kunwari, was a devout follower of Lord Rama. After a disagreement, the King challenged the Queen to bring Lord Rama to Orchha. The Queen undertook a rigorous penance in Ayodhya, and Lord Rama appeared to her as a child, agreeing to come to Orchha under three conditions: He would travel only in Pushya Nakshatra, He would be the king of Orchha, and He would reside permanently wherever He was first placed. Upon returning to Orchha, the Queen, tired from her journey, temporarily placed the idol in her palace. When she later tried to move it to the newly constructed Chaturbhuj Temple, the idol refused to budge, fulfilling Lord Rama's third condition. Thus, the palace itself became the Ram Raja Temple, and Lord Rama was declared the King of Orchha.",
    interesting_facts: [
      "It is the only temple in India where Lord Rama is worshipped as a king, not just a deity, and resides in a palace.",
      "A daily 'Guard of Honour' is performed by armed police personnel, saluting Lord Rama as a king.",
      "Lord Rama's idol in the temple holds a sword in his right hand and a shield in the other, seated in a unique Padmasana posture with one leg crossed.",
      "The temple offers a 'royal repast' as offerings to the deity, and dignitaries are sometimes greeted with paan (betel nut) and ittar (perfume) instead of traditional prasad.",
      "There is a belief that if worshippers look at the left foot's thumb of Lord Rama's idol, their wishes will be fulfilled.",
      "The temple complex includes a pond known as 'Rama Kund', believed to be a source of water during Lord Rama's stay.",
      "The architecture is a unique blend of a fort and a temple, reflecting the Bundela style with Rajput and Mughal influences."
    ],
    architecture_style: "Rajput and Mughal (Palace-Fort blend)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771859/IMG_20250531_211721_iqifsz.jpg", alt: "Exterior view of Ram Raja Temple, Orchha" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748771850/IMG_20250531_211639_zpi9ri.jpg", alt: "Interior Darbar of Ram Raja Temple" }
    ],
    famous_for: ["Unique worship of Lord Rama as a King", "Daily Guard of Honour ceremony", "Historical significance as a transformed palace"],
    rituals_practices: ["Daily Aartis (morning and evening)", "Royal offerings to the deity", "Special prayers during festivals"],
    visiting_hours: "Morning: 8:00 AM - 1:00 PM; Evening: 8:00 PM - 10:00 PM (Timings can vary, especially during festivals)",
    entry_fee: "No entry fee.",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. Special offerings or services are arranged on-site.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Royal repast (Bhog) offered to the deity", "Paan and Ittar for special guests"],
    festivals: [
      { name: "Rama Navami", date_or_period: "Chaitra Shukla Navami (March/April)", description: "Celebrated as Lord Rama's birthday, with special rituals and a display of Lord Rama's birth exhibit." },
      { name: "Ram Vivah Festival", date_or_period: "Kartik month (October/November)", description: "Commemorates the wedding of Lord Rama and Goddess Sita, with grand festivities and processions." },
      { name: "Makar Sankranti", date_or_period: "January", description: "Attracts large numbers of devotees." },
      { name: "Vasant Panchami", date_or_period: "January/February", description: "Attracts large numbers of devotees." },
      { name: "Shivratri", date_or_period: "February/March", description: "Attracts large numbers of devotees." },
      { name: "Kartik Purnima", date_or_period: "November", description: "Attracts large numbers of devotees." }
    ],
    how_to_reach: {
      by_air: "Nearest Airports: Gwalior Airport (approx. 140 km) and Khajuraho Airport (approx. 180 km).",
      by_rail: "Nearest major railway station: Jhansi Railway Station (approx. 20 km), well-connected to major Indian cities. Orchha also has a small railway station with limited train stoppages.",
      by_road: "Orchha is well-connected by road to major cities like Jhansi, Khajuraho, and Gwalior. Buses and taxis are readily available."
    },
    nearby_attractions: [
      "Orchha Fort Complex (Raja Mahal, Jahangir Mahal)",
      "Chaturbhuj Temple (originally intended for Lord Rama's idol)",
      "Lakshmi Narayan Temple",
      "Chhatris (Royal Cenotaphs) along the Betwa River",
      "Betwa River (for rafting and scenic views)"
    ]
  },
  // --- NEW WEST BENGAL TEMPLE ENTRIES TO ADD TO YOUR 'templesData' ARRAY ---

  // New: Madan Mohan Temple, Bishnupur
  {
    id: "madan-mohan-bishnupur",
    name: "Madan Mohan Temple, Bishnupur",
    location: {
      city: "Bishnupur",
      district: "Bankura",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 23.0760, longitude: 87.3220 } // Approximate
    },
    category: ["Vaishnava", "Terracotta"],
    deity: "Lord Krishna (Madan Mohan)",
    description: "A famous terracotta temple in Bishnupur, built in the Eka-Ratna style. It is renowned for its exquisite terracotta carvings depicting scenes from the Ramayana and Mahabharata.",
    history_summary: "Built by King Durjana Dev Malla in 1694 CE, it is one of the most prominent temples of the Malla dynasty in Bishnupur, known for its unique architectural style and intricate artistry.",
    interesting_facts: [
      "Known for its exquisite terracotta panels depicting scenes from Hindu epics and Puranas.",
      "Built in the Eka-Ratna style, meaning it has a single tower on a curved roof.",
      "Part of the larger group of Terracotta Temples of Bishnupur."
    ],
    architecture_style: "Bengal Terracotta",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774654/IMG_20250601_094120_sxalwn.jpg", alt: "Madan Mohan Temple, Bishnupur" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774642/IMG_20250601_094052_svnfek.jpg", alt: "Madan Mohan Temple idol" }
    ],
    famous_for: ["Terracotta art", "Malla architecture"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Yes (for Bishnupur complex)",
    prasads: ["Sweets"],
    festivals: [
      { name: "Dol Utsav (Holi)", date_or_period: "March", description: "Celebrated with great fervor in Bishnupur." }
    ]
  },

  // New: Jalpesh Temple, Jalpaiguri
  {
    id: "jalpesh-temple",
    name: "Jalpesh Temple",
    location: {
      city: "Jalpesh",
      district: "Jalpaiguri",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 26.5400, longitude: 88.6700 } // Approximate
    },
    category: ["Shaiva", "Ancient"],
    deity: "Lord Shiva (Jalpeshwar)",
    description: "An ancient Shiva temple, believed to have been built by King Bhagadatta. It is a significant pilgrimage site in North Bengal.",
    history_summary: "The temple has ancient roots, with legends linking it to the Mahabharata era. The current structure was rebuilt by the Cooch Behar kings in the 17th century after previous destructions.",
    interesting_facts: [
      "The main Shiva Lingam is submerged in water within the sanctum.",
      "Believed to be a very powerful deity, fulfilling wishes.",
      "Attracts devotees from various parts of North Bengal and Assam."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774886/IMG_20250601_094510_u9td4b.jpg", alt: "Jalpesh Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774873/IMG_20250601_094421_nbegjd.jpg", alt: "Jalpesh Temple idol" }
    ],
    famous_for: ["Submerged Lingam", "Ancient Shiva temple"],
    rituals_practices: ["Daily pujas", "Jalabhishek"],
    visiting_hours: "6:00 AM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Bael Patra", "Milk"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Grand celebrations dedicated to Lord Shiva." },
      { name: "Shravan Mela", date_or_period: "July/August", description: "Devotees offer holy water during the Shravan month." }
    ]
  },

  // New: Tarapith Temple
  {
    id: "tarapith-temple",
    name: "Tarapith Temple",
    location: {
      city: "Tarapith",
      district: "Birbhum",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 23.9570, longitude: 87.7280 } // Approximate
    },
    category: ["Shakti Peetha", "Tantric"],
    deity: "Goddess Tara",
    description: "A revered Shakti Peetha and major tantric shrine dedicated to Goddess Tara. It is one of the most important pilgrimage sites for Tantric Hinduism.",
    history_summary: "The temple is an ancient site, historically associated with the tantric practices of Sadhak Bamakhepa. It is believed that the third eye (netra) of Sati fell here, making it a powerful Shakti Peetha.",
    interesting_facts: [
      "One of the 51 Shakti Peethas, associated with the 'third eye' of Sati.",
      "A prominent center for Tantric worship and practices.",
      "The temple is known for its unique rituals, including animal sacrifice (though disputed)."
    ],
    architecture_style: "Traditional Bengali",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774847/IMG_20250601_094712_xaw02b.jpg", alt: "Tarapith Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774860/IMG_20250601_094741_hizlfz.jpg", alt: "Tarapith Temple idol" }
    ],
    famous_for: ["Tantric worship", "Shakti Peetha", "Goddess Tara"],
    rituals_practices: ["Daily pujas", "Animal sacrifice (traditional)", "Offerings"],
    visiting_hours: "Varies (open for most of the day)",
    entry_fee: "Free",
    prasads: ["Sweets", "Fruits", "Fish (as offering)"],
    festivals: [
      { name: "Kali Puja", date_or_period: "October/November", description: "Grand celebrations for Goddess Kali/Tara." },
      { name: "Amavasya", date_or_period: "New Moon nights", description: "Special pujas are performed." }
    ]
  },

  // New: Kiriteswari Temple, Murshidabad
  {
    id: "kiriteswari-temple",
    name: "Kiriteswari Temple",
    location: {
      city: "Kiritkona",
      district: "Murshidabad",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 24.2380, longitude: 88.2610 } // Approximate
    },
    category: ["Shakti Peetha", "Ancient"],
    deity: "Goddess Kiriteswari (Devi Vimala)",
    description: "A revered Shakti Peetha where Sati's 'Kirit' (crown/tiara) is believed to have fallen. It is one of the oldest and holiest Shakti Peethas.",
    history_summary: "The temple is very ancient, with its origins predating recorded history. It has been mentioned in various Hindu scriptures and is a significant pilgrimage site in Bengal, especially for devotees of Goddess Shakti.",
    interesting_facts: [
      "Considered one of the 51 Shakti Peethas.",
      "The 'Kirit' (crown or tiara) of Sati is believed to have fallen here.",
      "It is one of the oldest Shakti Peethas in India."
    ],
    architecture_style: "Traditional Bengali",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774934/IMG_20250601_094933_bj0vzx.jpg", alt: "Kiriteswari Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774946/IMG_20250601_094958_tqvhhp.jpg", alt: "Kiriteswari Temple idol" }
    ],
    famous_for: ["Shakti Peetha", "Ancient sacred site"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets", "Fruits"],
    festivals: [
      { name: "Durga Puja", date_or_period: "September/October", description: "Grand celebrations dedicated to the Goddess." }
    ]
  },

  // New: Bishnupur Terracotta Temples (General entry for the complex)
  {
    id: "bishnupur-terracotta",
    name: "Bishnupur Terracotta Temples",
    location: {
      city: "Bishnupur",
      district: "Bankura",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 23.0700, longitude: 87.3200 } // Approximate for the complex
    },
    category: ["Vaishnava", "Terracotta", "Historical"],
    deity: "Various (Krishna, Radha, Shiva, etc.)",
    description: "A cluster of magnificent terracotta temples built by the Malla rulers of Bishnupur, showcasing unique Bengal architectural style and intricate clay tile art.",
    history_summary: "These temples were built primarily during the 17th and 18th centuries under the patronage of the Malla dynasty. They are prime examples of the unique architectural and artistic tradition of Bengal, characterized by rich terracotta ornamentation.",
    interesting_facts: [
      "The temples are renowned for their intricate terracotta carvings depicting mythological scenes, daily life, and geometric patterns.",
      "Different temples showcase various architectural styles like Eka-Ratna, Pancha-Ratna, and Jor-Bangla.",
      "Prominent temples include Rasmancha, Jorbangla Temple, and Lalji Temple."
    ],
    architecture_style: "Bengal Terracotta (Malla)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774757/734952310bishnupur_madan_mohan_t-1-e1633941448963_fdgzzw.jpg", alt: "Bishnupur Terracotta Temples" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774771/Shyam_Rai_temple_at_Bishnupur_in_Bankura_district_of_West_Bengal_xrycpj.jpg", alt: "Bishnupur Terracotta Temples idol" }
    ],
    famous_for: ["Terracotta art", "Malla architecture", "Historical complex"],
    rituals_practices: ["Historical site (some active worship)"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Yes (for complex)",
    prasads: [], // Mostly historical
    festivals: [
      { name: "Bishnupur Mela", date_or_period: "December/January", description: "Annual fair showcasing local arts, crafts, and culture." }
    ]
  },

  // New: Mayapur Chandrodaya Mandir (ISKCON Mayapur)
  {
    id: "mayapur-chandrodaya-mandir",
    name: "Mayapur Chandrodaya Mandir (ISKCON Mayapur)",
    location: {
      city: "Mayapur",
      district: "Nadia",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 23.4280, longitude: 88.3840 } // Approximate
    },
    category: ["Vaishnava", "Modern", "Pilgrimage"],
    deity: "Lord Krishna, Radha, Chaitanya Mahaprabhu",
    description: "The global headquarters of ISKCON (International Society for Krishna Consciousness), a sprawling temple complex dedicated to Lord Krishna and Chaitanya Mahaprabhu.",
    history_summary: "Founded by A. C. Bhaktivedanta Swami Prabhupada, the spiritual leader of ISKCON. The main temple, the Temple of the Vedic Planetarium, is currently under construction and aims to be one of the largest temples in the world.",
    interesting_facts: [
      "The proposed Temple of the Vedic Planetarium is envisioned as one of the largest religious structures globally.",
      "Mayapur is considered the birthplace of Sri Chaitanya Mahaprabhu, a 15th-century Vaishnava saint and reformer.",
      "The complex includes various shrines, guesthouses, and a center for Vedic studies."
    ],
    architecture_style: "Modern Indian, Vedic",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774682/iskcon-mayapur-chandrodaya-mandir-sree-mayapur-nadia-temples-n20tx7inkw_mgp48i.jpg", alt: "Mayapur Chandrodaya Mandir" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774669/ISKCON-Mayapur-Chandrodaya-Mandir-11_n6urug.jpg", alt: "Mayapur Chandrodaya Mandir idol" }
    ],
    famous_for: ["ISKCON headquarters", "Chaitanya Mahaprabhu", "Global pilgrimage"],
    rituals_practices: ["Daily Aarti", "Kirtan", "Bhajans", "Lectures"],
    visiting_hours: "4:00 AM - 9:00 PM (Varies)",
    entry_fee: "Free",
    website: "https://www.mayapur.com/", // Example, actual might vary
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "Entry is free. Some services might be paid.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Khichdi", "Sweet preparations"],
    festivals: [
      { name: "Gaura Purnima", date_or_period: "February/March", description: "Grand celebration of Chaitanya Mahaprabhu's appearance day." },
      { name: "Rath Yatra", date_or_period: "July", description: "Chariot festival." }
    ]
  },

  // New: Naba Kailash Mandir, Kalna
  {
    id: "naba-kailash-kalna",
    name: "Naba Kailash Mandir",
    location: {
      city: "Kalna",
      district: "Purba Bardhaman",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 23.2100, longitude: 88.3600 } // Approximate
    },
    category: ["Shaiva", "Terracotta"],
    deity: "108 Shiva Lingams",
    description: "A unique complex of 108 Shiva temples arranged in two concentric circles, known for its architectural symmetry.",
    history_summary: "Built by Maharaja Tej Chandra Bahadur in 1802. This temple complex is a significant example of Bengal's brick temple architecture and is unique due to its circular arrangement of shrines.",
    interesting_facts: [
      "The complex consists of 108 Aatchala (eight-roofed) Shiva temples, arranged in two concentric circles.",
      "The outer circle has 74 temples, and the inner circle has 34.",
      "It is a major pilgrimage site during Shivratri."
    ],
    architecture_style: "Bengal Terracotta",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774697/IMG_20250601_095916_g6okvw.jpg", alt: "Naba Kailash Mandir" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774712/IMG_20250601_095936_uywgbi.jpg", alt: "Naba Kailash Mandir idol" }
    ],
    famous_for: ["108 Shiva Lingams", "Unique architecture"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Free",
    prasads: ["Bael Patra", "Milk"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Grand celebrations with devotees visiting all 108 temples." }
    ]
  },
  // New: Tarakeshwar Temple
  {
    id: "tarakeshwar-temple",
    name: "Tarakeshwar Temple",
    location: {
      city: "Tarakeswar",
      district: "Hooghly",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 22.8800, longitude: 88.0200 } // Approximate
    },
    category: ["Shaiva", "Ancient"],
    deity: "Lord Shiva (Taraknath)",
    description: "A prominent Shiva temple and a major pilgrimage center in West Bengal, known for its annual 'Shravan Mela'.",
    history_summary: "The temple is ancient, believed to have been built in the 18th century by Raja Bharamalla. It is a highly revered site, especially during the month of Shravan, when devotees offer holy water to the deity.",
    interesting_facts: [
      "Many devotees walk barefoot from distant places carrying Ganga water to offer to Lord Taraknath during Shravan.",
      "The temple is known for its mystical pond, Dudhpukur, whose water is considered sacred.",
      "A popular site for 'Gajan' festival during Chaitra Sankranti."
    ],
    architecture_style: "Atchala (eight-roofed) Bengal style",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774812/IMG_20250601_100415_rt0ttn.jpg", alt: "Tarakeshwar Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774827/IMG_20250601_100439_cqp93l.jpg", alt: "Tarakeshwar Temple idol" }
    ],
    famous_for: ["Lord Shiva", "Shravan Mela", "Gajan festival"],
    rituals_practices: ["Daily pujas", "Jalabhishek"],
    visiting_hours: "6:00 AM - 9:00 PM",
    entry_fee: "Free",
    prasads: ["Bael Patra", "Milk"],
    festivals: [
      { name: "Shravan Mela", date_or_period: "July/August (whole month)", description: "Massive influx of pilgrims offering holy water to Lord Shiva." },
      { name: "Gajan", date_or_period: "April", description: "Celebrated before Bengali New Year with unique rituals." }
    ]
  },

  // New: Hangseshwari Temple, Bansberia
  {
    id: "hangseshwari-bansberia",
    name: "Hangseshwari Temple",
    location: {
      city: "Bansberia",
      district: "Hooghly",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 22.9500, longitude: 88.4000 } // Approximate
    },
    category: ["Devi Temple", "Tantric"],
    deity: "Goddess Hangseshwari (Kali)",
    description: "A unique and architecturally distinct temple dedicated to Goddess Hangseshwari, a form of Kali. It is known for its thirteen minarets and tantric significance.",
    history_summary: "Built by King Nrisingha Dev Rai Mahasay in the early 19th century. The temple's architecture is unique, resembling a blooming lotus, and is deeply rooted in Tantric symbolism.",
    interesting_facts: [
      "The temple's unique architecture resembles a blooming lotus, with 13 minarets.",
      "It is a prominent site for Tantric practices, with the idol of the goddess depicting a 'Hansa' (swan) form.",
      "The construction incorporates 'Yoga' principles in its design."
    ],
    architecture_style: "Unique Bengali Tantric",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774785/310_afoqnp.jpg", alt: "Hangseshwari Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774785/310_afoqnp.jpg", alt: "Hangseshwari Temple idol" }
    ],
    famous_for: ["Unique architecture", "Tantric importance", "Goddess Kali"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Kali Puja", date_or_period: "October/November", description: "Special celebrations for Goddess Kali." }
    ]
  },

  // New: Bargabhima Temple, Tamluk
  {
    id: "bargabhima-tamluk",
    name: "Bargabhima Temple",
    location: {
      city: "Tamluk",
      district: "Purba Medinipur",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 22.3000, longitude: 87.9200 } // Approximate
    },
    category: ["Shakti Peetha", "Ancient"],
    deity: "Goddess Bargabhima (Kapalini)",
    description: "A revered Shakti Peetha where Sati's 'left ankle' is believed to have fallen. It is an ancient temple dedicated to Goddess Bargabhima.",
    history_summary: "The temple has ancient origins, with its exact construction date unknown but believed to be very old, mentioned in ancient scriptures. It has been renovated and expanded over centuries by various local rulers.",
    interesting_facts: [
      "Considered one of the 51 Shakti Peethas.",
      "The temple is located near the Rupnarayan River.",
      "The idol of the goddess is unique, depicting her in a fierce form."
    ],
    architecture_style: "Traditional Bengali",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774732/IMG_20250601_100744_xsc4bw.jpg", alt: "Bargabhima Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774746/IMG_20250601_100813_ag643v.jpg", alt: "Bargabhima Temple idol" }
    ],
    famous_for: ["Shakti Peetha", "Ancient sacred site"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets", "Fruits"],
    festivals: [
      { name: "Durga Puja", date_or_period: "September/October", description: "Grand celebrations dedicated to the Goddess." }
    ]
  },

  // New: Kalighat Temple
  {
    id: "kalighat-temple",
    name: "Kalighat Temple",
    location: {
      city: "Kolkata",
      district: "Kolkata",
      state: "West Bengal",
      country: "India",
      coordinates: { latitude: 22.5181, longitude: 88.3396 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple"],
    deity: "Goddess Kali (Kalika)",
    description: "A famous Shakti Peetha dedicated to Goddess Kali, located on the banks of the Adi Ganga channel. It is one of the most revered Kali temples in India.",
    history_summary: "The temple is an ancient pilgrimage site, believed to be where the 'fingers of the right foot' of Sati fell. The present temple structure was built in 1809. It has been a significant center for Kali worship for centuries.",
    interesting_facts: [
      "Considered one of the 51 Shakti Peethas.",
      "The idol of Goddess Kali here is unique, with large golden eyes and a protruding tongue.",
      "Animal sacrifices (goats) are still performed here, though it is a matter of ongoing debate and regulations."
    ],
    architecture_style: "Traditional Bengali",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774906/IMG_20250601_101042_te3gor.jpg", alt: "Kalighat Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748774918/kalighat-temple-kalighat-kolkata-temples-h0xg005hig_tatsiy.jpg", alt: "Kalighat Temple idol" }
    ],
    famous_for: ["Shakti Peetha", "Goddess Kali", "Pilgrimage site"],
    rituals_practices: ["Daily pujas", "Animal sacrifice (traditional)"],
    visiting_hours: "4:00 AM - 11:00 PM",
    entry_fee: "Free (special entry/puja may have fees)",
    website: "https://kalighatkalitemple.com/", // Example, actual might vary
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. Special entry/puja tickets may be available on-site.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Sweets", "Fruits", "Khichuri"],
    festivals: [
      { name: "Kali Puja", date_or_period: "October/November", description: "The biggest festival, celebrated with immense fervor." },
      { name: "Durga Puja", date_or_period: "September/October", description: "Celebrated with devotion." }
    ]
  },

  // --- END OF NEW WEST BENGAL TEMPLE ENTRIES ---
  // --- NEW RAJASTHAN TEMPLE ENTRIES TO ADD TO YOUR 'templesData' ARRAY ---

  // New: Birla Mandir, Jaipur
  {
    id: "birla-mandir-jaipur",
    name: "Birla Mandir, Jaipur (Laxmi Narayan Temple)",
    location: {
      city: "Jaipur",
      district: "Jaipur",
      state: "Rajasthan",
      country: "India",
      coordinates: { latitude: 26.8920, longitude: 75.8070 } // Approximate
    },
    category: ["Vaishnava", "Modern"],
    deity: "Lord Vishnu (Laxmi Narayan), Goddess Lakshmi",
    description: "A modern Hindu temple built with white marble, dedicated to Laxmi Narayan (Vishnu and Lakshmi). It is a prominent landmark in Jaipur.",
    history_summary: "The Birla Mandir in Jaipur was built in 1988 by the Birla family, a prominent industrialist family known for building temples across India. It stands as a symbol of modern Indian temple architecture.",
    interesting_facts: [
      "Constructed entirely of white marble, giving it a majestic appearance.",
      "The walls depict mythological scenes and figures from the Puranas and Upanishads.",
      "Features stained-glass windows depicting various Hindu deities."
    ],
    architecture_style: "Modern Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775074/IMG_20250601_101247_evqkef.jpg", alt: "Birla Mandir, Jaipur" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775087/IMG_20250601_101337_ontkqp.jpg", alt: "Birla Mandir idol" }
    ],
    famous_for: ["White marble architecture", "Birla family temples"],
    rituals_practices: ["Daily pujas", "Aarti"],
    visiting_hours: "6:00 AM - 12:00 PM, 3:00 PM - 9:00 PM",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Janmashtami", date_or_period: "August/September", description: "Celebration of Lord Krishna's birth." },
      { name: "Diwali", date_or_period: "October/November", description: "Festival of lights." }
    ]
  },

  // New: Karni Mata Temple, Deshnoke (Bikaner)
  {
    id: "karni-mata-bikaner",
    name: "Karni Mata Temple",
    location: {
      city: "Deshnoke",
      district: "Bikaner",
      state: "Rajasthan",
      country: "India",
      coordinates: { latitude: 27.8060, longitude: 73.3400 } // Approximate
    },
    category: ["Devi Temple", "Unique"],
    deity: "Goddess Karni Mata",
    description: "A unique temple famous for being home to thousands of rats (kabahs) that are considered sacred and are worshipped by devotees.",
    history_summary: "The temple is dedicated to Karni Mata, a female Hindu warrior sage born in the Charan caste, believed to be an incarnation of Durga. The current structure was largely built in the early 20th century.",
    interesting_facts: [
      "Home to over 25,000 black rats, considered sacred and believed to be reincarnated devotees.",
      "Spotting a white rat among them is considered highly auspicious.",
      "Devotees offer milk and sweets to the rats."
    ],
    architecture_style: "Rajasthani",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775188/IMG_20250601_101553_swuyyh.jpg", alt: "Karni Mata Temple, Deshnoke" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775174/960px-La_statue_de_la_d%C3%A9esse_entour%C3%A9e_des_rats_sacr%C3%A9s__Temple_de_Karni_Mata___8423510937_apovkk.jpg", alt: "Karni Mata Temple idol" }
    ],
    famous_for: ["Sacred rats", "Unique rituals"],
    rituals_practices: ["Offering to rats", "Daily pujas"],
    visiting_hours: "4:00 AM - 10:00 PM",
    entry_fee: "Free",
    prasads: ["Milk", "Sweets"],
    festivals: [
      { name: "Karni Mata Fair", date_or_period: "March/April and September/October", description: "Twice a year, attracting many devotees." }
    ]
  },

  // New: Brahma Temple, Pushkar
  {
    id: "brahma-mandir-pushkar",
    name: "Brahma Temple, Pushkar",
    location: {
      city: "Pushkar",
      district: "Ajmer",
      state: "Rajasthan",
      country: "India",
      coordinates: { latitude: 26.4862, longitude: 74.5510 } // Approximate
    },
    category: ["Creator God", "Ancient"],
    deity: "Lord Brahma",
    description: "One of the very few temples in the world dedicated to Lord Brahma, the creator god in Hinduism. It is situated on the Pushkar Lake.",
    history_summary: "The current structure of the temple dates back to the 14th century, though its origins are ancient, with legends associating it with Lord Brahma himself. It is a highly revered pilgrimage site.",
    interesting_facts: [
      "One of the very few temples dedicated to Lord Brahma in the world.",
      "The temple has a distinct red spire and a hamsa (swan) motif.",
      "Pushkar Lake, adjacent to the temple, is considered a sacred bathing spot."
    ],
    architecture_style: "Rajasthani",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775102/107190902_pby0ib.jpg", alt: "Brahma Temple, Pushkar" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775117/IMG_20250601_101815_vpgkpq.jpg", alt: "Brahma Temple idol" }
    ],
    famous_for: ["Lord Brahma", "Sacred lake", "Pilgrimage"],
    rituals_practices: ["Daily pujas", "Offerings"],
    visiting_hours: "6:00 AM - 9:00 PM (Varies seasonally)",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Pushkar Fair", date_or_period: "October/November", description: "An annual multi-day livestock and cultural fair, coinciding with Kartik Purnima." }
    ]
  },

  // New: Salasar Balaji Temple, Churu
  {
    id: "salasar-balaji-churu",
    name: "Salasar Balaji Temple",
    location: {
      city: "Salasar",
      district: "Churu",
      state: "Rajasthan",
      country: "India",
      coordinates: { latitude: 27.7280, longitude: 74.7500 } // Approximate
    },
    category: ["Hanuman Temple"],
    deity: "Lord Hanuman (Balaji)",
    description: "A highly revered temple dedicated to Lord Hanuman. It is a powerful pilgrimage site where devotees offer coconuts and 'Savamani' (a special meal offering).",
    history_summary: "The temple is relatively modern, built in the 18th century, but has gained immense popularity due to the strong belief in the miraculous powers of the deity. The idol of Balaji is believed to be self-manifested from a rock.",
    interesting_facts: [
      "The idol of Lord Hanuman here is unique, with a mustache and beard.",
      "Devotees often walk long distances to reach the temple as an act of devotion.",
      "Famous for 'Savamanis' - a large meal offering dedicated to the deity."
    ],
    architecture_style: "Rajasthani",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775347/IMG_20250601_102028_gzbt6q.jpg", alt: "Salasar Balaji Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775333/IMG_20250601_101950_ewy7ju.jpg", alt: "Salasar Balaji Temple idol" }
    ],
    famous_for: ["Lord Hanuman", "Savamani offering", "Pilgrimage"],
    rituals_practices: ["Daily pujas", "Savamani", "Coconut offering"],
    visiting_hours: "5:00 AM - 10:00 PM",
    entry_fee: "Free",
    prasads: ["Laddu", "Peda", "Savamani (meal)"],
    festivals: [
      { name: "Hanuman Jayanti", date_or_period: "April", description: "Celebration of Lord Hanuman's birth." },
      { name: "Ashwin Purnima", date_or_period: "October", description: "Special fair." }
    ]
  },
  // New: Neelkanth Mahadev Temple, Alwar
  {
    id: "neelkanth-alwar",
    name: "Neelkanth Mahadev Temple",
    location: {
      city: "Rajgarh", // Near Alwar, specific to Neelkanth
      district: "Alwar",
      state: "Rajasthan",
      country: "India",
      coordinates: { latitude: 27.2000, longitude: 76.6000 } // Approximate
    },
    category: ["Shaiva", "Ancient"],
    deity: "Lord Shiva (Neelkanth)",
    description: "An ancient Shiva temple located amidst ruins of an old fort, known for its serene atmosphere and historical significance.",
    history_summary: "Dating back to the 6th-9th centuries, the temple is a remnant of the ancient city of Rajorgarh. It was built during the Gurjara-Pratihara period and reflects early medieval Indian architecture.",
    interesting_facts: [
      "The temple complex is surrounded by remnants of ancient structures.",
      "The Shiva Lingam is believed to be self-manifested.",
      "It's a popular spot for devotees seeking peace and tranquility."
    ],
    architecture_style: "Pratihara",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775228/673296199Neelkanth-Mahadev-Temple_sifskz.jpg", alt: "Neelkanth Mahadev Temple, Alwar" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775214/1200px-Lingam__Neelkanth_temple__Alwar_district_whapeh.jpg", alt: "Neelkanth Mahadev Temple idol" }
    ],
    famous_for: ["Ancient Shiva temple", "Historical ruins"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 7:00 PM",
    entry_fee: "Free",
    prasads: ["Bael Patra", "Milk"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Observed with special prayers." }
    ]
  },

  // New: Galtaji Temple, Jaipur
  {
    id: "galtaji-temple-jaipur",
    name: "Galtaji Temple (Monkey Temple)",
    location: {
      city: "Jaipur",
      district: "Jaipur",
      state: "Rajasthan",
      country: "India",
      coordinates: { latitude: 26.8880, longitude: 75.8450 } // Approximate
    },
    category: ["Vaishnava", "Ancient", "Pilgrimage"],
    deity: "Lord Surya, Lord Hanuman",
    description: "An ancient Hindu pilgrimage site known for its natural springs, holy 'kunds' (water tanks), and a large population of monkeys. It is nestled amidst the Aravalli hills.",
    history_summary: "The temple complex dates back to the 15th century, but the site itself is much older, revered for its natural water springs. It has been a sacred place for bathing and worship for centuries, especially during Makar Sankranti.",
    interesting_facts: [
      "Known as the 'Monkey Temple' due to the large number of monkeys residing there.",
      "Features natural springs that fill several holy 'kunds' (water tanks) where pilgrims take ritual baths.",
      "The complex is carved into a narrow crevice in the Aravalli hills."
    ],
    architecture_style: "Rajasthani",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775145/IMG_20250601_102457_l3atsw.jpg", alt: "Galtaji Temple, Jaipur" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775158/Inside_the_temple_at_the_top__Galtaji__Jaipur__India_rs1d7l.jpg", alt: "Galtaji Temple idol" }
    ],
    famous_for: ["Natural springs", "Monkey population", "Pilgrimage"],
    rituals_practices: ["Holy bathing", "Daily pujas"],
    visiting_hours: "Dawn to Dusk",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Makar Sankranti", date_or_period: "January", description: "Special holy dip in the kunds." }
    ]
  },

  // New: Tanot Mata Temple, Jaisalmer
  {
    id: "tanot-mata-jaisalmer",
    name: "Tanot Mata Temple",
    location: {
      city: "Tanot",
      district: "Jaisalmer",
      state: "Rajasthan",
      country: "India",
      coordinates: { latitude: 27.6530, longitude: 70.3660 } // Approximate
    },
    category: ["Devi Temple", "Border Temple"],
    deity: "Goddess Hinglaj Mata (Tanot Mata)",
    description: "A revered temple near the India-Pakistan border, maintained by the Border Security Force (BSF). It is famous for its miraculous protection during wars.",
    history_summary: "The temple is legendary for remaining unscathed during the 1965 and 1971 Indo-Pak wars, despite heavy shelling. BSF jawans credit the Goddess for their protection and maintain the temple with utmost devotion.",
    interesting_facts: [
      "Maintained and managed by the Border Security Force (BSF) of India.",
      "Legend has it that Pakistani bombs failed to explode near the temple during wars.",
      "A symbol of faith and patriotism for soldiers."
    ],
    architecture_style: "Traditional Rajasthani",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775373/temple_kEy5lyXg_202410161625410_a4uhvx.jpg", alt: "Tanot Mata Temple, Jaisalmer" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775361/IMG_20250601_102637_ha694a.jpg", alt: "Tanot Mata Temple idol" }
    ],
    famous_for: ["BSF maintenance", "Miraculous protection", "Border location"],
    rituals_practices: ["Daily Aarti by BSF", "Offerings"],
    visiting_hours: "6:00 AM - 8:00 PM",
    entry_fee: "Free",
    prasads: ["Sweets", "Chunri"],
    festivals: [
      { name: "Navaratri", date_or_period: "March/April and September/October", description: "Celebrated with devotion." }
    ]
  },

  // New: Rani Sati Temple, Jhunjhunu
  {
    id: "rani-sati-jhunjhunu",
    name: "Rani Sati Temple",
    location: {
      city: "Jhunjhunu",
      district: "Jhunjhunu",
      state: "Rajasthan",
      country: "India",
      coordinates: { latitude: 27.9500, longitude: 75.3900 } // Approximate
    },
    category: ["Devi Temple", "Unique"],
    deity: "Rani Sati (Narayani Devi)",
    description: "A large and revered temple dedicated to Rani Sati, a devotee who committed Sati. It is a significant pilgrimage site, though the practice of Sati is illegal.",
    history_summary: "The temple is dedicated to Narayani Devi, who is said to have committed Sati in the 13th century. While the practice of Sati is condemned, the temple remains a prominent pilgrimage site for her devotees, especially the Marwari community.",
    interesting_facts: [
      "The temple does not have any deity's image or idol, but a Trishul (trident) representing power and strength.",
      "It is a highly revered site for the Marwari community.",
      "The temple complex is beautifully maintained."
    ],
    architecture_style: "Rajasthani",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775317/de-plus-pres_eqjvpv.jpg", alt: "Rani Sati Temple, Jhunjhunu" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775303/08_16_596543224sari-temple-3_bcrmw0.jpg", alt: "Rani Sati Temple idol (Trishul)" }
    ],
    famous_for: ["Rani Sati", "Trishul worship", "Marwari pilgrimage"],
    rituals_practices: ["Daily pujas", "Aarti"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Sweets", "Chunri"],
    festivals: [
      { name: "Bhadra Amavasya", date_or_period: "August/September", description: "Special significance, though large gatherings are now restricted due to legal issues." }
    ]
  },

  // New: Parashuram Mahadev Temple, Pali
  {
    id: "parashuram-mahadev-pali",
    name: "Parashuram Mahadev Temple",
    location: {
      city: "Sadri", // Near Pali, specific to Parashuram Mahadev
      district: "Pali",
      state: "Rajasthan",
      country: "India",
      coordinates: { latitude: 25.4600, longitude: 73.5500 } // Approximate
    },
    category: ["Shaiva", "Cave Temple"],
    deity: "Lord Shiva",
    description: "A cave temple dedicated to Lord Shiva, believed to be the place where Sage Parashuram meditated and created a passage with his axe.",
    history_summary: "This ancient cave temple is associated with Sage Parashuram, the sixth incarnation of Vishnu. Legend states that he carved the cave with his axe. It's a natural rock-cut formation with religious significance.",
    interesting_facts: [
      "Located in a natural cave, accessible through a challenging trek.",
      "Believed to be the meditation spot of Sage Parashuram.",
      "Houses a self-formed Shiva Lingam and a Ganesh idol."
    ],
    architecture_style: "Cave Temple (Natural)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775246/IMG_20250601_103123_wl2pgx.jpg", alt: "Parashuram Mahadev Temple, Pali" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775258/IMG_20250601_103154_hsxuzm.jpg", alt: "Parashuram Mahadev Temple idol" }
    ],
    famous_for: ["Cave temple", "Sage Parashuram", "Trek"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "Dawn to Dusk",
    entry_fee: "Free",
    prasads: ["Bael Patra"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Special prayers and celebration." }
    ]
  },

  // New: Ambika Mata Temple, Jagat (Udaipur)
  {
    id: "ambika-mata-udaipur",
    name: "Ambika Mata Temple, Jagat",
    location: {
      city: "Jagat",
      district: "Udaipur",
      state: "Rajasthan",
      country: "India",
      coordinates: { latitude: 24.3680, longitude: 73.7420 } // Approximate
    },
    category: ["Devi Temple", "Ancient"],
    deity: "Goddess Ambika Mata (Durga)",
    description: "An ancient temple dedicated to Goddess Ambika, a form of Durga. It is a masterpiece of early Rajasthani temple architecture, often called the 'Khajuraho of Rajasthan' due to its sculptures.",
    history_summary: "Built in the 10th century CE by the Guhila dynasty, the temple is an exquisite example of intricate stone carvings and sculptural art, showcasing the Maru-Gurjara style. It is a protected monument.",
    interesting_facts: [
      "Often referred to as the 'Khajuraho of Rajasthan' for its exquisite and elaborate sculptures.",
      "The temple is dedicated to Goddess Ambika, a form of Durga.",
      "Features highly detailed carvings of various deities, apsaras, and mythological scenes."
    ],
    architecture_style: "Maru-Gurjara",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775052/IMG_20250601_103455_w31afx.jpg", alt: "Ambika Mata Temple, Jagat, Udaipur" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748775038/IMG_20250601_103440_vzrrmi.jpg", alt: "Ambika Mata Temple idol" }
    ],
    famous_for: ["Intricate sculptures", "Ancient architecture", "Goddess Ambika"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 6:00 PM",
    entry_fee: "Free",
    prasads: ["Sweets", "Chunri"],
    festivals: [
      { name: "Navaratri", date_or_period: "March/April and September/October", description: "Celebrated with devotion." }
    ]
  },
  // --- END OF NEW RAJASTHAN TEMPLE ENTRIES ---
  // --- NEW KARNATAKA TEMPLE ENTRIES TO ADD TO YOUR 'templesData' ARRAY ---

  // New: Virupaksha Temple, Hampi
  {
    id: "virupaksha-hampi",
    name: "Virupaksha Temple, Hampi",
    location: {
      city: "Hampi",
      district: "Vijayanagara",
      state: "Karnataka",
      country: "India",
      coordinates: { latitude: 15.3350, longitude: 76.4600 } // Approximate
    },
    category: ["Shaiva", "UNESCO World Heritage", "Ancient"],
    deity: "Lord Virupaksha (Shiva)",
    description: "An ancient and active Shiva temple, part of the Group of Monuments at Hampi, a UNESCO World Heritage Site. It is one of the oldest functioning temples in India.",
    history_summary: "The temple's origins date back to the 7th century, but it was significantly expanded during the Vijayanagara Empire, particularly under Krishnadevaraya in the 15th-16th centuries. It has remained continuously active since its construction.",
    interesting_facts: [
      "The temple has a unique 'pinhole camera' effect that projects an inverted image of the main gopuram onto a wall inside the temple.",
      "It is the only temple in Hampi that is still actively worshipped.",
      "Part of the UNESCO World Heritage site, famous for its grand architecture and historical significance."
    ],
    architecture_style: "Dravidian, Vijayanagara",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779500/1000408093_4096_2714_xym4aw.png", alt: "Virupaksha Temple, Hampi" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748778952/IMG_20250601_163334_etvetl.jpg", alt: "Virupaksha Temple idol" }
    ],
    famous_for: ["UNESCO site", "Pinhole camera effect", "Vijayanagara architecture"],
    rituals_practices: ["Daily pujas", "Abhishekam"],
    visiting_hours: "9:00 AM - 1:00 PM, 5:00 PM - 9:00 PM",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Sweets"],
    festivals: [
      { name: "Hampi Utsav", date_or_period: "January/February", description: "Annual cultural festival showcasing Hampi's heritage." },
      { name: "Virupaksha Car Festival", date_or_period: "March", description: "Grand annual chariot festival." }
    ]
  },

  // New: Sringeri Sharada Peetham, Sringeri
  {
    id: "sringeri-sharada-peetham",
    name: "Sringeri Sharada Peetham",
    location: {
      city: "Sringeri",
      district: "Chikkamagaluru",
      state: "Karnataka",
      country: "India",
      coordinates: { latitude: 13.4167, longitude: 75.2500 } // Approximate
    },
    category: ["Shakti Peetha", "Ancient", "Learning Center"],
    deity: "Goddess Sharadamba (Saraswati), Adi Shankara",
    description: "One of the four Advaita Vedanta mathas (monasteries) established by Adi Shankara. It is a prominent center of learning and spiritual tradition.",
    history_summary: "Founded by Adi Shankara in the 8th century, it is the first and foremost of the four Advaita mutts. The temple has seen various renovations, with the present structure of the Sharadamba Temple rebuilt in the 20th century.",
    interesting_facts: [
      "The first of the four Amnaya Peethams established by Adi Shankara.",
      "Known for its unbroken lineage of Jagadgurus (spiritual leaders).",
      "The temple is famous for the Vidyashankara Temple, a unique blend of Hoysala and Vijayanagara architecture."
    ],
    architecture_style: "Dravidian, Hoysala, Vijayanagara",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748778909/shutterstock_778347478_vcs894.webp", alt: "Sringeri Sharada Peetham" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748778900/DSC_5535-684x1024_dzw3d5.jpg", alt: "Sharadamba Temple idol" }
    ],
    famous_for: ["Adi Shankara", "Advaita Vedanta", "Spiritual learning"],
    rituals_practices: ["Daily pujas", "Vedic chanting", "Philosophical discourses"],
    visiting_hours: "6:00 AM - 2:00 PM, 4:00 PM - 9:00 PM",
    entry_fee: "Free",
    prasads: ["Sweets"],
    festivals: [
      { name: "Sharada Navaratri", date_or_period: "September/October", description: "Grand celebrations for Goddess Sharadamba." },
      { name: "Shankara Jayanti", date_or_period: "April/May", description: "Celebrates the birth anniversary of Adi Shankara." }
    ]
  },

  // New: Udupi Sri Krishna Matha, Udupi
  {
    id: "udupi-krishna-matha",
    name: "Udupi Sri Krishna Matha",
    location: {
      city: "Udupi",
      district: "Udupi",
      state: "Karnataka",
      country: "India",
      coordinates: { latitude: 13.3400, longitude: 74.7500 } // Approximate
    },
    category: ["Vaishnava", "Matha", "Pilgrimage"],
    deity: "Lord Krishna",
    description: "A famous Hindu temple and matha (monastery) established by Sri Madhvacharya, the founder of the Dwaita philosophy. The temple is known for its unique Kankanakanadi window through which the deity is worshipped.",
    history_summary: "Founded in the 13th century by Sri Madhvacharya. The unique feature is the 'Kanakana Kindi' (Kanaka's Window), through which the deity is worshipped, associated with the devotee Kanakadasa.",
    interesting_facts: [
      "The deity of Lord Krishna is worshipped through a silver-plated window with nine holes, known as 'Kanakana Kindi'.",
      "The administration of the temple is managed by a rotating system among the eight 'Ashta Mathas' founded by Madhvacharya.",
      "Known for its delicious Udupi cuisine offered as 'prasadam'."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748778928/Udupi-Sri-Krishna-Temple-6_gjrxtx.jpg", alt: "Udupi Sri Krishna Matha" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748778920/Udipi-Sri-Krishna.rev1__p1qdgo.jpg", alt: "Udupi Sri Krishna Matha idol" }
    ],
    famous_for: ["Lord Krishna", "Dwaita philosophy", "Kanakana Kindi", "Udupi cuisine"],
    rituals_practices: ["Daily pujas", "Paryaya festival"],
    visiting_hours: "5:00 AM - 9:00 PM (Varies during festivals)",
    entry_fee: "Free",
    prasads: ["Udupi style prasadam (rice, sambar, etc.)", "Laddu"],
    festivals: [
      { name: "Paryaya Mahotsava", date_or_period: "Every two years (Jan)", description: "Transfer of temple management to a new matha, a grand celebration." },
      { name: "Krishna Janmashtami", date_or_period: "August/September", description: "Celebration of Lord Krishna's birth." }
    ]
  },

  // New: Murudeshwara Temple, Murudeshwar
  {
    id: "murudeshwara-temple",
    name: "Murudeshwara Temple",
    location: {
      city: "Murudeshwar",
      district: "Uttara Kannada",
      state: "Karnataka",
      country: "India",
      coordinates: { latitude: 14.0900, longitude: 74.5000 } // Approximate
    },
    category: ["Shaiva", "Coastal", "Modern"],
    deity: "Lord Shiva",
    description: "A modern temple complex known for its towering statue of Lord Shiva, second tallest in the world, and a huge 20-storied gopuram, located on the Arabian Sea coast.",
    history_summary: "The current temple and its massive structures were built and renovated by businessman R.N. Shetty. The site has ancient roots, with a legend linking it to Ravana's attempt to carry the Atma Lingam.",
    interesting_facts: [
      "Features the world's second-tallest Shiva statue (123 feet).",
      "Has a 20-storied Rajagopuram (gateway tower) with a lift for panoramic views.",
      "Located on a hillock overlooking the Arabian Sea, offering breathtaking views."
    ],
    architecture_style: "Modern Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748778855/35364f_ff030ce419bf4d9db02d3316a846fce5_mv2_ufuqai.webp", alt: "Murudeshwara Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748778868/IMG_20250601_163927_q4g0q7.jpg", alt: "Murudeshwara Temple idol" }
    ],
    famous_for: ["Tallest Shiva statue", "Coastal location", "Panoramic views"],
    rituals_practices: ["Daily pujas"],
    visiting_hours: "6:00 AM - 8:30 PM",
    entry_fee: "Free (Lift to gopuram has a fee)",
    prasads: ["Sweets"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "Grand celebrations for Lord Shiva." }
    ]
  },

  // New: Dharmasthala Temple, Dharmasthala
  {
    id: "dharmasthala-temple",
    name: "Dharmasthala Temple (Shree Kshetra Dharmasthala)",
    location: {
      city: "Dharmasthala",
      district: "Dakshina Kannada",
      state: "Karnataka",
      country: "India",
      coordinates: { latitude: 13.0000, longitude: 75.3600 } // Approximate
    },
    category: ["Unique", "Pilgrimage", "Jain-Hindu Syncretic"],
    deity: "Lord Manjunatha (Shiva), Dharma Devatas (Ammanavaru, Annappa Swamy, Kalarkai)",
    description: "A unique pilgrimage site where the administration is managed by a Jain family (Heggades), and the deity is Lord Shiva. It promotes peace, dharma, and charity.",
    history_summary: "The temple has a unique history of harmonious coexistence of Jain and Hindu traditions. The Heggade family, who are Jains, have been the hereditary administrators of the temple for centuries, promoting dharma and charity.",
    interesting_facts: [
      "Managed by a Jain family (Heggades) for centuries, promoting religious harmony.",
      "The temple operates a massive charitable trust, providing free food (annadana) to thousands daily.",
      "Devotees believe that justice is dispensed here, with disputes often settled at the temple."
    ],
    architecture_style: "Traditional Hindu",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748778839/IMG_20250601_164522_oyrvt6.jpg", alt: "Dharmasthala Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748778827/IMG_20250601_164440_mi6cdx.jpg", alt: "Dharmasthala Temple idol" }
    ],
    famous_for: ["Religious harmony", "Annadana (free food)", "Justice dispensing"],
    rituals_practices: ["Daily pujas", "Annadana"],
    visiting_hours: "6:30 AM - 2:00 PM, 4:00 PM - 8:30 PM",
    entry_fee: "Free",
    prasads: ["Vegetarian meals", "Sweets"],
    festivals: [
      { name: "Laksha Deepotsava", date_or_period: "November/December", description: "A grand festival of lights, illuminating the temple with lakhs of lamps." }
    ]
  },
  // --- END OF NEW KARNATAKA TEMPLE ENTRIES ---

  // --- NEW GUJARAT TEMPLE ENTRIES TO ADD TO YOUR 'templesData' ARRAY ---
  {
    id: "dwarkadhish-temple-dwarka",
    name: "Dwarkadhish Temple (Jagat Mandir)",
    location: {
      city: "Dwarka",
      district: "Devbhoomi Dwarka",
      state: "Gujarat",
      country: "India",
      coordinates: { latitude: 22.3920, longitude: 68.9673 } // Approximate
    },
    category: ["Char Dham", "Vaishnava", "Ancient"],
    deity: "Lord Krishna (Dwarkadhish - King of Dwarka)",
    description: "The Dwarkadhish Temple, also known as the Jagat Mandir, is a revered Hindu temple dedicated to Lord Krishna, who is worshipped here as Dwarkadhish, the 'King of Dwarka'. It is one of the Char Dham pilgrimage sites and one of the Sapta Puri (seven holy cities) of Hinduism. The temple stands majestically on the banks of the Gomti River, with its towering spire dominating the skyline.",
    history_summary: "Legend states that the original temple was built by Vajranabha, Lord Krishna's great-grandson, over Hari-griha (Lord Krishna's residential palace). The present 5-story structure is believed to have been built in the 15th-16th century, though its oldest parts date back to the 7th century. It has been renovated and expanded multiple times over centuries, notably by Adi Shankara in the 8th century, and by kings of the Solanki dynasty and later by the Marathas.",
    interesting_facts: [
      "It is one of the four principal holy places (Char Dham) of Hinduism, along with Badrinath, Puri, and Rameswaram.",
      "The temple has two main entrances: the 'Swarg Dwar' (Gate to Heaven), from which pilgrims enter after taking a holy dip in the Gomti River, and the 'Moksha Dwar' (Gate of Salvation), the exit gate.",
      "The temple spire, approximately 43 meters (141 feet) high, is adorned with a large flag bearing the symbols of the Sun and Moon, which is changed five times a day.",
      "The idol of Lord Dwarkadhish is made of black stone and depicts Lord Krishna with four arms (Chaturbhuja form), holding a conch, discus, mace, and lotus.",
      "The temple's architecture features intricate carvings and sculptural work, reflecting the Chalukya style.",
      "It is believed that the city of Dwarka was submerged in the sea after Lord Krishna's departure from Earth."
    ],
    architecture_style: "Chalukya",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779734/dwarkadhish-temple_xlimsa.jpg", alt: "Dwarkadhish Temple exterior view" }, // Placeholder, use actual image
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779727/62e4e0e0cb9a754d7bffe5d262e1d4e6_levmhj.jpg", alt: "Dwarkadhish Temple flag" } // Placeholder, use actual image
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748756502/Dwarkadhish_Krishna_Mantra.mp3", // Placeholder, use actual audio
    famous_for: ["Char Dham pilgrimage site", "Lord Krishna as King of Dwarka", "Unique flag changing ceremony", "Historical significance"],
    rituals_practices: ["Daily Aartis (Mangala, Shringara, Sandhya, Shayan)", "Flag changing ceremony", "Darshan of Lord Krishna"],
    visiting_hours: "Morning: 6:30 AM - 1:00 PM; Evening: 5:00 PM - 9:30 PM (Timings may vary during festivals)",
    entry_fee: "Free (special entry for certain rituals or darshan types may have fees)",
    website: "https://www.dwarkadhishtemple.org/", // Official website if exists
    darshan_tickets: {
      is_available_online: false, // Generally no online booking for general darshan
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free and does not require online booking. Special pujas or rituals may require on-site booking.",
      approx_cost: "Free - Varies for pujas",
      identification_required: false
    },
    prasads: ["Peda", "Makhan-mishri (butter and sugar candy)", "Sweets"],
    festivals: [
      { name: "Janmashtami", date_or_period: "Shraavana Krishna Paksha Ashtami (August/September)", description: "Grand celebrations for the birth of Lord Krishna, attracting millions of devotees." },
      { name: "Holi", date_or_period: "Phalgun Purnima (March)", description: "Celebrated with great enthusiasm." },
      { name: "Sharad Purnima", date_or_period: "Ashwin Purnima (September/October)", description: "Marked by special prayers." },
      { name: "Annakut", date_or_period: "Diwali (October/November)", description: "Offerings of vast varieties of food to the deity." }
    ],
    how_to_reach: {
      by_air: "Nearest Airport: Jamnagar Airport (JGA), approximately 130 km away. Connected to major Indian cities. Rajkot Airport (RAJ) is another option, about 225 km away.",
      by_rail: "Dwarka Railway Station is well-connected to major cities like Mumbai, Ahmedabad, Delhi, and Kolkata.",
      by_road: "Dwarka is well-connected by state and national highways. Regular bus services from major cities in Gujarat are available."
    },
    nearby_attractions: [
      "Nageshwar Jyotilinga Temple (approx. 16 km from Dwarka)",
      "Rukmini Devi Temple (approx. 2 km from Dwarka)",
      "Gomti Ghat (for holy dip)",
      "Bet Dwarka (an island believed to be Lord Krishna's residence)"
    ]
  },
  // New: Ambaji Temple, Banaskantha
  {
    id: "ambaji-temple",
    name: "Ambaji Temple",
    location: {
      city: "Ambaji",
      district: "Banaskantha",
      state: "Gujarat",
      country: "India",
      coordinates: { latitude: 24.3200, longitude: 72.8500 } // Approximate
    },
    category: ["Shakti Peetha", "Devi Temple"],
    deity: "Goddess Ambaji (Amba)",
    description: "A major Shakti Peetha and a highly revered pilgrimage site dedicated to Goddess Amba. The temple has no idol; instead, a Gokh (niche) with a sacred 'Vishva Yantra' is worshipped.",
    history_summary: "The temple is very ancient, with its origins dating back to the pre-Vedic era. It is one of the 51 Shakti Peethas, where Sati's heart is believed to have fallen. The current temple structure has undergone several renovations over centuries.",
    interesting_facts: [
      "There is no idol of the goddess; a sacred geometric diagram (Vishva Yantra) is worshipped.",
      "Considered one of the 51 Shakti Peethas.",
      "The temple is located in the Aravalli mountain range, near the Gujarat-Rajasthan border."
    ],
    architecture_style: "Rajasthani, North Indian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779690/IMG_20250601_165255_zvvoum.jpg", alt: "Ambaji Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779681/IMG_20250601_165233_o3g7nt.jpg", alt: "Ambaji Temple idol (Vishva Yantra)" }
    ],
    famous_for: ["Shakti Peetha", "Vishva Yantra worship"],
    rituals_practices: ["Daily pujas", "Bhavai dance"],
    visiting_hours: "6:00 AM - 12:00 PM, 2:00 PM - 7:00 PM",
    entry_fee: "Free",
    prasads: ["Mohanthal", "Chunri"],
    festivals: [
      { name: "Bhadarvi Poonam (Full Moon)", date_or_period: "August/September", description: "A grand annual fair attracting millions of devotees." },
      { name: "Navaratri", date_or_period: "October/November", description: "Nine nights of devotion with Garba and Aarti." }
    ]
  },

  // New: Akshardham Temple, Gandhinagar
  {
    id: "akshardham-gandhinagar",
    name: "Akshardham Temple, Gandhinagar",
    location: {
      city: "Gandhinagar",
      district: "Gandhinagar",
      state: "Gujarat",
      country: "India",
      coordinates: { latitude: 23.2386, longitude: 72.6462 } // Approximate
    },
    category: ["Swaminarayan", "Modern"],
    deity: "Lord Swaminarayan",
    description: "A magnificent temple complex dedicated to Lord Swaminarayan, known for its intricate stone carvings, exhibitions, and spiritual ambiance. It serves as a spiritual and cultural hub.",
    history_summary: "Built by BAPS Swaminarayan Sanstha, it was inaugurated in 1992. The temple is a marvel of modern craftsmanship, built with pink sandstone and showcasing traditional Indian art and architecture.",
    interesting_facts: [
      "Features a 10-story high monument, 'Sahajanand Van', dedicated to Lord Swaminarayan's life and teachings.",
      "Known for its intricate carvings (over 6,000 tons of pink sandstone used).",
      "Offers various exhibitions, a boat ride, and a serene garden for visitors."
    ],
    architecture_style: "Traditional Hindu, Swaminarayan",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779651/Akshardham-Ahmedabad-Puja-N-Pujari_o5dw0z.webp", alt: "Akshardham Temple, Gandhinagar" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779661/Spritual-Significance_a6balo.jpg", alt: "Akshardham Temple idol" }
    ],
    famous_for: ["Swaminarayan sect", "Intricate carvings", "Cultural exhibitions"],
    rituals_practices: ["Daily aarti", "Exhibitions"],
    visiting_hours: "9:30 AM - 7:30 PM (Closed on Mondays)",
    entry_fee: "Free (exhibitions have fees)",
    website: "https://akshardham.com", // Example, actual might vary
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "Entry to the complex is free; tickets are required for exhibitions only, not for darshan.",
      approx_cost: "Free (Darshan)",
      identification_required: false
    },
    prasads: ["Vegetarian meals", "Sweets"],
    festivals: [
      { name: "Diwali", date_or_period: "October/November", description: "Special lighting and cultural programs during the festival of lights." },
      { name: "Swaminarayan Jayanti", date_or_period: "April", description: "Celebrates the birth of Lord Swaminarayan." }
    ]
  },

  // New: Sun Temple, Modhera
  {
    id: "sun-temple-modhera",
    name: "Sun Temple, Modhera",
    location: {
      city: "Modhera",
      district: "Mehsana",
      state: "Gujarat",
      country: "India",
      coordinates: { latitude: 23.5780, longitude: 72.1320 } // Approximate
    },
    category: ["Sun Temple", "Ancient", "Architectural Marvel"],
    deity: "Lord Surya (Sun God)",
    description: "An ancient Sun temple dedicated to Lord Surya, built by King Bhima I of the Chaulukya dynasty. It is a masterpiece of Maru-Gurjara architecture.",
    history_summary: "Built in 1026-27 CE by King Bhima I, the temple is a prime example of the Chaulukya dynasty's architectural prowess. It is designed to allow the sun's rays to fall directly on the idol at sunrise during the equinoxes.",
    interesting_facts: [
      "The temple is designed such that the sun's rays illuminate the idol of Surya at dawn during the equinoxes.",
      "The main temple complex consists of three parts: Surya Kund (stepwell), Sabha Mandap (assembly hall), and Guda Mandap (sanctum sanctorum).",
      "Known for its intricate carvings, including depictions of the twelve Adityas (solar deities)."
    ],
    architecture_style: "Māru-Gurjara (Chaulukya)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779802/Sun_Temple19_bywiqb.jpg", alt: "Sun Temple, Modhera" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779793/assembly-hall-modhera-sun-temple_v8pcgs.jpg", alt: "Sun Temple assembly hall" }
    ],
    famous_for: ["Sun Temple", "Chaulukya architecture", "Intricate carvings"],
    rituals_practices: ["Historical site, not an active worship temple"],
    visiting_hours: "Sunrise to Sunset",
    entry_fee: "Yes",
    prasads: [], // Not an active worship temple
    festivals: [
      { name: "Modhera Dance Festival", date_or_period: "January", description: "An annual classical dance festival set against the backdrop of the illuminated temple." }
    ]
  },
  {
    id: "rukmini-devi-temple-dwarka",
    name: "Rukmini Devi Temple",
    location: {
      city: "Dwarka",
      district: "Devbhoomi Dwarka",
      state: "Gujarat",
      country: "India",
      coordinates: { latitude: 22.4100, longitude: 68.9610 } // Approximate
    },
    category: ["Vaishnava", "Ancient"],
    deity: "Goddess Rukmini (Chief Queen of Lord Krishna)",
    description: "Located approximately 2 km north of Dwarka, the Rukmini Devi Temple is a beautiful shrine dedicated to Goddess Rukmini, the chief queen of Lord Krishna. The temple's unique architecture features exquisite carvings and paintings depicting various Hindu deities. It stands apart from the main Dwarkadhish Temple due to a fascinating legend about a curse.",
    history_summary: "The current temple structure is believed to date back to the 12th century, though its origins are much older. Legend has it that Lord Krishna and Rukmini once went to the sage Durvasa to invite him for dinner. Durvasa agreed on the condition that Krishna and Rukmini pull his chariot. While pulling the chariot, Rukmini became thirsty, and Krishna created the Ganga water for her to drink. Durvasa felt insulted that Rukmini drank water without his permission and cursed her that she would be separated from Krishna for 12 years, and the land around would be barren. This is why the temple is located away from Dwarka and the area is dry.",
    interesting_facts: [
      "The temple is architecturally distinct from the main Dwarkadhish Temple, featuring beautiful carvings of gods and goddesses.",
      "The idol of Goddess Rukmini is adorned with rich jewelry and garments.",
      "A common practice is for pilgrims to first visit the Dwarkadhish Temple and then proceed to the Rukmini Devi Temple, as a trip to Dwarka is considered incomplete without visiting Rukmini Devi.",
      "The walls of the temple are adorned with panels of dancers and celestial beings.",
      "The temple is surrounded by a serene environment, providing a peaceful experience for devotees."
    ],
    architecture_style: "Chalukya, blend of Nagara and Dravidian elements",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779749/900551442Dwarka_Rukmini_Temple_Main_ikv82g.jpg", alt: "Rukmini Devi Temple exterior" }, // Placeholder
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779759/Rukmini_Dwarkadhish_2_oji6b9.jpg", alt: "Rukmini Devi idol" } // Placeholder
    ],
    famous_for: ["Chief Queen of Lord Krishna's temple", "Unique legend of separation from Dwarka", "Exquisite carvings"],
    rituals_practices: ["Offering prayers to Goddess Rukmini", "Circumambulation"],
    visiting_hours: "6:00 AM - 12:00 PM; 1:00 PM - 5:00 PM (Timings can vary)",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. No online booking required.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Sweets and offerings"],
    festivals: [
      { name: "Rukmini Ashtami", date_or_period: "Chaitra Shukla Ashtami (March/April)", description: "Special celebrations for the birth anniversary of Goddess Rukmini." }
    ],
    how_to_reach: {
      by_air: "Nearest Airport: Jamnagar Airport (JGA), approx. 130 km. Rajkot Airport (RAJ), approx. 225 km.",
      by_rail: "Dwarka Railway Station is well-connected.",
      by_road: "Located about 2 km from Dwarka city center. Auto-rickshaws and taxis are readily available."
    },
    nearby_attractions: [
      "Dwarkadhish Temple (Jagat Mandir)",
      "Gomti Ghat",
      "Bet Dwarka",
      "Nageshwar Jyotilinga Temple"
    ]
  },
  {
    id: "somnath-temple",
    name: "Somnath Temple",
    location: {
      city: "Prabhas Patan",
      district: "Gir Somnath",
      state: "Gujarat",
      country: "India",
      coordinates: { latitude: 20.8887, longitude: 70.4042 }
    },
    category: ["Jyotirlinga", "Shaiva", "Ancient", "Coastal"],
    deity: "Lord Shiva (Somnath - Lord of the Moon)",
    description: "The Somnath Temple, located on the western coast of Gujarat, is revered as the first among the twelve Jyotirlinga shrines of Lord Shiva. It has a tumultuous history, having been destroyed and reconstructed numerous times by various invaders and rulers. The current magnificent structure, built in the Chalukya style of architecture, stands as a symbol of resilience and devotion.",
    history_summary: "The temple has been destroyed and rebuilt 17 times throughout history, first by Mahmud of Ghazni in 1024 AD and subsequently by various invaders. Its history is marked by cycles of destruction and resurrection, reflecting the enduring faith of the devotees. The present temple was reconstructed in the Chalukya style of temple architecture and completed in 1951, largely due to the efforts of Sardar Vallabhbhai Patel.",
    interesting_facts: [
      "It is considered the first of the twelve sacred Jyotirlingas (lingams of light) of Lord Shiva.",
      "The temple's arrow-pillar ('Baan Stambh') on the seashore indicates that there is no land in a straight line between Somnath and the South Pole, a truly remarkable ancient geographical insight.",
      "The temple stands on the shores of the Arabian Sea, offering breathtaking views and a serene ambiance.",
      "The 'Sound & Light' show in the evenings narrates the temple's glorious history.",
      "Mahatma Gandhi suggested that the temple should not be rebuilt with state funds, but by public contribution, which was honored during its last reconstruction.",
      "Near the temple, there is a Triveni Sangam (confluence) of three rivers: Hiran, Kapila, and Saraswati, where pilgrims take holy dips."
    ],
    architecture_style: "Chalukya style (Kailash Mahameru Prasad style)",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779771/1200px-Somanath_mandir__cropped_lkrkid.jpg", alt: "Somnath Temple exterior" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779781/somnath_mjsj20.jpg", alt: "Somnath Temple night view" }
    ],
    famous_for: ["First Jyotirlinga", "Resilience and reconstruction history", "Coastal location"],
    rituals_practices: ["Abhishekam", "Aarti", "Darshan of the Shiva Lingam"],
    visiting_hours: "6:00 AM - 9:30 PM (Darshan); 7:00 AM, 12:00 PM, 7:00 PM (Aarti)",
    entry_fee: "Free (special pujas and services may have fees)",
    website: "https://somnath.org/",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. Special pujas like Abhishekam can be booked on-site.",
      approx_cost: "Free - Varies for pujas",
      identification_required: false
    },
    prasads: ["Bilva leaves", "Sweets"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "Magha Krishna Chaturdashi (February/March)", description: "The biggest festival, celebrated with grand festivities, special pujas, and a fair." },
      { name: "Kartik Purnima", date_or_period: "Kartik Purnima (November)", description: "Special significance due to the legend of the Moon god." },
      { name: "Shravan Month", date_or_period: "July/August", description: "The entire month is auspicious for Shiva devotees, with special prayers and crowds." }
    ],
    how_to_reach: {
      by_air: "Nearest Airport: Diu Airport (DIU), approx. 80 km. Rajkot Airport (RAJ), approx. 195 km.",
      by_rail: "Nearest Railway Station: Veraval (approx. 7 km), well-connected to major cities. Somnath also has a small station.",
      by_road: "Well-connected by road to major cities in Gujarat and other parts of India. Buses and taxis are easily available."
    },
    nearby_attractions: [
      "Triveni Sangam (Hiran, Kapila, Saraswati rivers confluence)",
      "Bhalka Tirth (spot where Lord Krishna was hit by an arrow)",
      "Prabhas Patan Museum",
      "Suraj Mandir (Sun Temple)"
    ]
  },
  {
    id: "bhadkeshwar-mahadev-temple-dwarka",
    name: "Bhadkeshwar Mahadev Temple",
    location: {
      city: "Dwarka",
      district: "Devbhoomi Dwarka",
      state: "Gujarat",
      country: "India",
      coordinates: { latitude: 22.3879, longitude: 68.9649 } // Approximate, very close to the sea
    },
    category: ["Shaiva", "Coastal", "Unique Location"],
    deity: "Lord Shiva (Mahadev)",
    description: "The Bhadkeshwar Mahadev Temple is a unique and serene Shiva temple situated on a hillock that juts into the Arabian Sea near Dwarka. Accessible by a narrow road during low tide, the temple becomes surrounded by sea water during high tide, creating a breathtaking spiritual experience. It offers stunning views of the confluence of the Gomti River with the Arabian Sea.",
    history_summary: "The temple is believed to be ancient, although its exact construction date is not definitively documented. Its unique location on a rocky outcrop makes it susceptible to tidal changes, adding to its mystique and spiritual significance. The temple's presence at the meeting point of the Gomti River and the Arabian Sea is considered very auspicious.",
    interesting_facts: [
      "The temple is built on a rocky outcrop in the Arabian Sea, making it accessible only during low tide. During high tide, it is surrounded by water.",
      "It offers panoramic views of the Arabian Sea and is a popular spot for watching sunsets.",
      "The confluence of the Gomti River with the Arabian Sea occurs near this temple, which is considered a sacred point.",
      "Devotees often visit this temple after taking a dip in the Gomti River at Gomti Ghat.",
      "The temple attracts not only pilgrims but also tourists drawn by its picturesque location and the unique phenomenon of being submerged by the sea during high tide."
    ],
    architecture_style: "Simple temple structure adapted to coastal environment",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779703/caption_u6dygm.jpg", alt: "Bhadkeshwar Mahadev Temple surrounded by sea" }, // Placeholder
    ],
    famous_for: ["Coastal location", "Submergence during high tide", "Sunset views", "Confluence point"],
    rituals_practices: ["Offering prayers to Lord Shiva", "Performing Jalabhishekam (offering water)"],
    visiting_hours: "6:00 AM - 7:00 PM (subject to tide timings; advisable to check local tide charts)",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. Access depends entirely on tidal conditions.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Bilva leaves", "Flowers"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "Magha Krishna Chaturdashi (February/March)", description: "Special celebrations for Lord Shiva." },
      { name: "Shravan Month", date_or_period: "July/August", description: "Special prayers during the holy month of Shravan." }
    ],
    how_to_reach: {
      by_air: "Nearest Airport: Jamnagar Airport (JGA), approx. 130 km.",
      by_rail: "Dwarka Railway Station is well-connected.",
      by_road: "Located very close to Dwarka town, accessible by auto-rickshaw or walk. Ensure to check tide timings before visiting."
    },
    nearby_attractions: [
      "Dwarkadhish Temple (Jagat Mandir)",
      "Gomti Ghat",
      "Rukmini Devi Temple",
      "Nageshwar Jyotilinga Temple"
    ]
  },
  {
    id: "shree-swaminarayan-temple-vadtaldham",
    name: "Shree Swaminarayan Temple (Vadtal Dham)",
    location: {
      city: "Vadtal",
      district: "Anand",
      state: "Gujarat",
      country: "India",
      coordinates: { latitude: 22.4578, longitude: 72.8441 } // Approximate
    },
    category: ["Swaminarayan Sampradaya", "Vaishnava", "Pilgrimage"],
    deity: "Lord Swaminarayan (also known as Sahajanand Swami), Laxminarayan Dev, Ranchhodrai",
    description: "Shree Swaminarayan Temple in Vadtal, famously known as Vadtal Dham, is one of the most important and prominent pilgrimage centers of the Swaminarayan Sampradaya. Built by Swaminarayan himself, this magnificent temple houses the deities of Laxminarayan Dev, Ranchhodrai (Lord Krishna), and Harikrishna Maharaj (Swaminarayan's own form). Its grand architecture and spiritual ambiance attract millions of devotees annually.",
    history_summary: "The temple was built by Shree Swaminarayan Bhagwan on November 3, 1824, on a plot of land donated by Joban Pagi, a devotee. Swaminarayan himself installed the idols of Laxminarayan Dev, Ranchhodrai, and Harikrishna Maharaj on the central altar. It became the headquarters of the Laxminarayan Dev Gadi (diocese) of the Swaminarayan Sampradaya, one of the two main administrative divisions established by Swaminarayan during his lifetime. The temple complex has expanded significantly over the centuries.",
    interesting_facts: [
      "Vadtal is one of the two major dioceses (Gadhis) of the Swaminarayan Sampradaya established by Swaminarayan himself, the other being Ahmedabad.",
      "The temple is known for its intricate carvings, grand domes, and beautiful idols.",
      "A large pond known as the Gomti lake is located within the temple complex, believed to be filled with water from the holy Gomti river of Dwarka.",
      "The temple campus includes residential facilities for pilgrims, educational institutions, and a cow shelter (Gaushala).",
      "Numerous festivals and events are celebrated throughout the year, drawing massive congregations.",
      "The temple plays a significant role in the cultural and spiritual life of the Swaminarayan followers worldwide."
    ],
    architecture_style: "Traditional Hindu temple architecture, grand and ornate",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779820/2560px-Vadtal-temple_l7xtbt.jpg", alt: "Shree Swaminarayan Temple, Vadtal" }, // Placeholder
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748779828/Shri-Swaminarayan-Mandir-Vadtal_utjusc.jpg", alt: "Gopuram of Vadtal Temple" } // Placeholder
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748756652/Swaminarayan_Mantra.mp3", // Placeholder
    famous_for: ["Headquarters of Laxminarayan Dev Gadi", "Built by Swaminarayan himself", "Important pilgrimage site for Swaminarayan followers"],
    rituals_practices: ["Daily Mangala, Shringar, Rajbhog, Sandhya, Shayan Aartis", "Offering prayers and devotion", "Observing Ekadashi fasts"],
    visiting_hours: "Generally 6:00 AM - 11:30 AM; 4:00 PM - 8:30 PM (Timings may vary during festivals)",
    entry_fee: "Free",
    website: "https://vadtalmandir.org/", // Official website if exists
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. No online booking required for entry.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Sweets", "Traditional Gujarati snacks"],
    festivals: [
      { name: "Swaminarayan Jayanti", date_or_period: "Chaitra Sud Navami (March/April)", description: "The birth anniversary of Lord Swaminarayan, celebrated with great fervor." },
      { name: "Rama Navami", date_or_period: "Chaitra Sud Navami (March/April)", description: "As Swaminarayan Jayanti often coincides with Rama Navami, both are celebrated." },
      { name: "Janmashtami", date_or_period: "Shraavana Krishna Ashtami (August/September)", description: "Celebrated as Lord Krishna's birthday." },
      { name: "Diwali", date_or_period: "Kartika Amavasya (October/November)", description: "Grand celebrations including Annakut festival." }
    ],
    how_to_reach: {
      by_air: "Nearest Airport: Sardar Vallabhbhai Patel International Airport (Ahmedabad - AMD), approx. 85 km. Vadodara Airport (BDQ), approx. 60 km.",
      by_rail: "Nearest Railway Station: Anand Junction (approx. 10 km), a major railway hub. Vadtal also has its own railway station (Vadtal Swaminarayan) with local connectivity.",
      by_road: "Vadtal is well-connected by road. Regular state transport buses and private vehicles ply from major cities like Ahmedabad, Vadodara, and Anand."
    },
    nearby_attractions: [
      "Gomti Lake (within the temple complex)",
      "Satsang Temple (nearby Swaminarayan temple)"
    ]
  },
  // --- END OF NEW GUJARAT TEMPLE ENTRIES ---
  // New entries for 8 Arunachalam Lingams
  {
    id: "arunachalam-indra-lingam",
    name: "Indra Lingam",
    location: {
      city: "Tiruvannamalai",
      district: "Tiruvannamalai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.2263, longitude: 79.0718 } // Approximate for Tiruvannamalai
    },
    category: ["Ashta Lingam", "Shaiva", "Arunachalam Lingam"],
    deity: "Lord Shiva (Indra Lingam)",
    description: "Located in the East direction of the Arunachala hill, the Indra Lingam is associated with prosperity, rain, and divine blessings. Worshipping here is believed to grant success and abundance.",
    history_summary: "These eight lingams are ancient and believed to have been installed by various deities and sages to protect the sacred Arunachala hill. Pilgrims circumambulate the hill (Girivalam) to visit them, a practice that dates back centuries.",
    interesting_facts: [
      "This lingam is associated with Indra, the king of gods, and is believed to bestow prosperity and success.",
      "It is the first lingam encountered during the traditional Girivalam (circumambulation) of Arunachala hill.",
      "The temple is located near the eastern entrance of the main Arunachaleswara Temple."
    ],
    architecture_style: "Dravidian",
    images: [{ url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748783967/IMG_20250601_183625_anwtxo.png", alt: "Indra Lingam" }],
    famous_for: ["East Direction", "Prosperity and Success", "Part of Girivalam"],
    rituals_practices: ["Girivalam worship", "Abhishekam"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Flowers"],
    festivals: [
      { name: "Girivalam", date_or_period: "Every Full Moon", description: "Pilgrimage walk around the Arunachala hill, stopping at each Lingam." }
    ]
  },
  {
    id: "arunachalam-agni-lingam",
    name: "Agni Lingam",
    location: {
      city: "Tiruvannamalai",
      district: "Tiruvannamalai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.2263, longitude: 79.0718 } // Approximate for Tiruvannamalai
    },
    category: ["Ashta Lingam", "Shaiva", "Arunachalam Lingam"],
    deity: "Lord Shiva (Agni Lingam)",
    description: "Situated in the South-East direction, the Agni Lingam represents the element of fire and is associated with purification and energy. It is believed to cleanse sins and bestow vitality.",
    history_summary: "The Agni Lingam is intrinsically linked with the main Arunachaleswara Temple, which itself is the manifestation of the cosmic fire. Pilgrims visit this as part of the sacred Girivalam, seeking purification.",
    interesting_facts: [
      "This lingam represents the element of fire and is associated with purification and energy.",
      "It is located in the South-East direction, corresponding to the Agni corner in Vastu Shastra.",
      "Devotees light lamps and offer prayers for cleansing and vitality here."
    ],
    architecture_style: "Dravidian",
    images: [{ url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748783927/IMG_20250601_184454_pwepz9.png", alt: "Agni Lingam" }],
    famous_for: ["South-East Direction", "Purification and Energy", "Part of Girivalam"],
    rituals_practices: ["Girivalam worship", "Offering ghee/oil lamps"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Kumkum"],
    festivals: [
      { name: "Girivalam", date_or_period: "Every Full Moon", description: "Pilgrimage walk around the Arunachala hill, stopping at each Lingam." }
    ]
  },
  {
    id: "arunachalam-yama-lingam",
    name: "Yama Lingam",
    location: {
      city: "Tiruvannamalai",
      district: "Tiruvannamalai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.2263, longitude: 79.0718 } // Approximate for Tiruvannamalai
    },
    category: ["Ashta Lingam", "Shaiva", "Arunachalam Lingam"],
    deity: "Lord Shiva (Yama Lingam)",
    description: "Located in the South, the Yama Lingam is dedicated to Yama, the god of death and justice. Worshipping here is believed to alleviate karmic burdens and ensure a peaceful transition.",
    history_summary: "Each of the Ashta Lingams has its own unique significance and is visited by devotees during the Girivalam, seeking blessings from the respective directional deities. The Yama Lingam is particularly revered for its association with dharma and destiny.",
    interesting_facts: [
      "This lingam is associated with Yama, the god of death and justice, and is believed to alleviate karmic burdens.",
      "It is located in the South direction, corresponding to Yama's domain.",
      "Devotees offer prayers here for a peaceful life and a smooth transition after death."
    ],
    architecture_style: "Dravidian",
    images: [{ url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748783907/yama-Linga.jpg_rd5m1r.webp", alt: "Yama Lingam" }],
    famous_for: ["South Direction", "Justice and Karmic Alleviation", "Part of Girivalam"],
    rituals_practices: ["Girivalam worship", "Prayers for ancestors"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Flowers"],
    festivals: [
      { name: "Girivalam", date_or_period: "Every Full Moon", description: "Pilgrimage walk around the Arunachala hill, stopping at each Lingam." }
    ]
  },
  {
    id: "arunachalam-niruthi-lingam",
    name: "Niruthi Lingam",
    location: {
      city: "Tiruvannamalai",
      district: "Tiruvannamalai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.2263, longitude: 79.0718 } // Approximate for Tiruvannamalai
    },
    category: ["Ashta Lingam", "Shaiva", "Arunachalam Lingam"],
    deity: "Lord Shiva (Niruthi Lingam)",
    description: "Found in the South-West direction, the Niruthi Lingam is associated with protection from evil forces and negative influences. Devotees seek strength and security here.",
    history_summary: "The Girivalam path around Arunachala is dotted with these ancient shrines, each offering a unique spiritual experience and connection to the cosmic energies. The Niruthi Lingam is particularly sought for its protective energies.",
    interesting_facts: [
      "This lingam is associated with Niruthi, the deity of the South-West direction, and is believed to offer protection from evil.",
      "Devotees pray here for security, stability, and removal of obstacles.",
      "It is located in a serene part of the Girivalam path, offering a peaceful environment for meditation."
    ],
    architecture_style: "Dravidian",
    images: [{ url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748784009/Niruthi-Linga.jpg_qh77qb.webp", alt: "Niruthi Lingam" }],
    famous_for: ["South-West Direction", "Protection from Negativity", "Part of Girivalam"],
    rituals_practices: ["Girivalam worship", "Offering prayers for safety"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Kumkum"],
    festivals: [
      { name: "Girivalam", date_or_period: "Every Full Moon", description: "Pilgrimage walk around the Arunachala hill, stopping at each Lingam." }
    ]
  },
  {
    id: "arunachalam-varuna-lingam",
    name: "Varuna Lingam",
    location: {
      city: "Tiruvannamalai",
      district: "Tiruvannamalai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.2263, longitude: 79.0718 } // Approximate for Tiruvannamalai
    },
    category: ["Ashta Lingam", "Shaiva", "Arunachalam Lingam"],
    deity: "Lord Shiva (Varuna Lingam)",
    description: "Located in the West, the Varuna Lingam is linked to Varuna, the god of water and oceans. Worshipping here is believed to grant peace, emotional balance, and purification. ",
    history_summary: "These lingams are integral to the spiritual magnetism of Arunachala, drawing countless pilgrims who seek inner peace and divine grace. The Varuna Lingam is particularly associated with the element of water and its purifying qualities.",
    interesting_facts: [
      "This lingam is associated with Varuna, the god of water, and is believed to grant peace and emotional balance.",
      "It is located in the West direction, corresponding to the Varuna's domain.",
      "Devotees offer water and pray for purification and harmony here."
    ],
    architecture_style: "Dravidian",
    images: [{ url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748784041/IMG_20250601_184148_zkutfo.png", alt: "Varuna Lingam" }],
    famous_for: ["West Direction", "Peace and Purification", "Part of Girivalam"],
    rituals_practices: ["Girivalam worship", "Offering water"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Flowers"],
    festivals: [
      { name: "Girivalam", date_or_period: "Every Full Moon", description: "Pilgrimage walk around the Arunachala hill, stopping at each Lingam." }
    ]
  },
  {
    id: "arunachalam-vayu-lingam",
    name: "Vayu Lingam",
    location: {
      city: "Tiruvannamalai",
      district: "Tiruvannamalai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.2263, longitude: 79.0718 } // Approximate for Tiruvannamalai
    },
    category: ["Ashta Lingam", "Shaiva", "Arunachalam Lingam"],
    deity: "Lord Shiva (Vayu Lingam)",
    description: "Found in the North-West, the Vayu Lingam represents the element of air and is associated with health, longevity, and freedom from disease. It is believed to bless devotees with good health.",
    history_summary: "Each of the Ashta Lingams plays a vital role in the spiritual energy grid of Arunachala, making the Girivalam a powerful spiritual practice. The Vayu Lingam is particularly invoked for well-being and vitality.",
    interesting_facts: [
      "This lingam represents the element of air and is associated with health, longevity, and freedom from disease.",
      "It is located in the North-West direction, corresponding to Vayu's domain.",
      "Devotees pray here for good health and protection from ailments."
    ],
    architecture_style: "Dravidian",
    images: [{ url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748784059/IMG_20250601_184045_ifzpxn.jpg", alt: "Vayu Lingam" }],
    famous_for: ["North-West Direction", "Health and Longevity", "Part of Girivalam"],
    rituals_practices: ["Girivalam worship", "Prayers for well-being"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Kumkum"],
    festivals: [
      { name: "Girivalam", date_or_period: "Every Full Moon", description: "Pilgrimage walk around the Arunachala hill, stopping at each Lingam." }
    ]
  },
  {
    id: "arunachalam-kubera-lingam",
    name: "Kubera Lingam",
    location: {
      city: "Tiruvannamalai",
      district: "Tiruvannamalai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.2263, longitude: 79.0718 } // Approximate for Tiruvannamalai
    },
    category: ["Ashta Lingam", "Shaiva", "Arunachalam Lingam"],
    deity: "Lord Shiva (Kubera Lingam)",
    description: "Located in the North, the Kubera Lingam is dedicated to Kubera, the god of wealth. Worshipping here is believed to attract financial prosperity and abundance.",
    history_summary: "The Ashta Lingams are not merely shrines but energetic points that amplify the spiritual vibrations of the Arunachala hill. The Kubera Lingam is particularly revered for its association with material and spiritual abundance.",
    interesting_facts: [
      "This lingam is associated with Kubera, the god of wealth, and is believed to grant financial prosperity and abundance.",
      "It is located in the North direction, corresponding to Kubera's domain.",
      "Devotees offer coins and pray for financial well-being here."
    ],
    architecture_style: "Dravidian",
    images: [{ url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748784178/1000408138_4096_3864_nrsdy3.png", alt: "Kubera Lingam" }],
    famous_for: ["North Direction", "Financial Prosperity", "Part of Girivalam"],
    rituals_practices: ["Girivalam worship", "Offering coins/wealth"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Flowers"],
    festivals: [
      { name: "Girivalam", date_or_period: "Every Full Moon", description: "Pilgrimage walk around the Arunachala hill, stopping at each Lingam." }
    ]
  },
  {
    id: "arunachalam-ishanya-lingam",
    name: "Ishanya Lingam",
    location: {
      city: "Tiruvannamalai",
      district: "Tiruvannamalai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { latitude: 12.2263, longitude: 79.0718 } // Approximate for Tiruvannamalai
    },
    category: ["Ashta Lingam", "Shaiva", "Arunachalam Lingam"],
    deity: "Lord Shiva (Ishanya Lingam)",
    description: "Situated in the North-East, the Ishanya Lingam is associated with spiritual wisdom, liberation, and mastery over the self. It is considered highly auspicious for spiritual growth.",
    history_summary: "The culmination of the Girivalam, the Ishanya Lingam holds profound spiritual significance for those seeking ultimate liberation. It is considered the most auspicious of the eight lingams.",
    interesting_facts: [
      "This lingam is associated with Ishanya, the deity of the North-East direction, and is believed to grant spiritual wisdom and liberation.",
      "It is considered highly auspicious for spiritual aspirants and meditators.",
      "It is the final lingam visited during the Girivalam, symbolizing the completion of the spiritual journey."
    ],
    architecture_style: "Dravidian",
    images: [{ url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748783947/IMG_20250601_183741_q7tkrh.png", alt: "Ishanya Lingam" }],
    famous_for: ["North-East Direction", "Spiritual Wisdom and Liberation", "Part of Girivalam"],
    rituals_practices: ["Girivalam worship", "Meditation"],
    visiting_hours: "Varies",
    entry_fee: "Free",
    prasads: ["Vibhuti", "Kumkum"],
    festivals: [
      { name: "Girivalam", date_or_period: "Every Full Moon", description: "Pilgrimage walk around the Arunachala hill, stopping at each Lingam." }
    ]
  },
  // --- END OF ARUNACHALAM LINGAMS ---
  // New entries for Pancharama Kshetrams
  ///pancharama skeethramas
  // 1. Amararama
  {
    id: "amararama",
    name: "Amararama Temple (Amareswara Swamy)",
    location: {
      city: "Amaravati",
      district: "Guntur",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.5728, longitude: 80.3575 }
    },
    category: ["Shaiva", "Pancharama Kshetrams"],
    deity: "Lord Shiva (Amareswara Swamy)",
    description: "A sacred Pancharama temple located on the banks of River Krishna. Known for its historical and spiritual importance.",
    history_summary: "Said to be installed by Lord Indra, the temple is famous for its white marble Lingam and inscriptions from the Chalukya period.",
    interesting_facts: [
      "Located beside the Krishna River.",
      "Features a white marble Lingam.",
      "Has inscriptions from the Eastern Chalukya era."
    ],
    famous_for: ["White Marble Lingam", "Pancharama Kshetram", "Historical Inscriptions"],
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749384215/IMG_20250608_122044_xpve67.jpg", alt: "Amararama Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749384215/IMG_20250608_121950_eetqnu.jpg", alt: "Amararama Temple Lingam" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1749385460/Akhanda_ringtone_fsbdw1.mp3",
    rituals_practices: ["Abhishekam", "Archana", "Harathi"],
    visiting_hours: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM"
  },

  // 2. Draksharama
  {
    id: "draksharama",
    name: "Draksharama Bhimeshwara Swamy Temple",
    location: {
      city: "Draksharamam",
      district: "East Godavari",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.9068, longitude: 82.0205 }
    },
    category: ["Shaiva", "Pancharama Kshetrams", "Shakti Peetha"],
    deity: "Bhimeshwara Swamy",
    description: "A prominent Pancharama Kshetram and one of the 18 Shakti Peethas. The temple is a grand architectural site.",
    history_summary: "Built by the Eastern Chalukya king Bhima in the 9th-10th century.",
    interesting_facts: [
      "Unique massive Shiva Lingam.",
      "Shakti Peetha - Manikyamba Devi Temple.",
      "Intricate carvings on the tower."
    ],
    famous_for: [
      "Massive Shiva Lingam",
      "Pancharama Kshetram",
      "Manikyamba Devi Shakti Peetha"
    ],
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749384282/IMG_20250608_170936_k2zmku.jpg", alt: "Draksharama Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749384280/IMG_20250608_170824_n4xqte.jpg", alt: "Draksharama Temple Lingam" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1749385460/Akhanda_ringtone_fsbdw1.mp3",
    rituals_practices: ["Abhishekam", "Pooja", "Visit to Manikyamba Devi"],
    visiting_hours: "6:00 AM - 8:00 PM"
  },

  // 3. Somarama
  {
    id: "somarama",
    name: "Somarama Temple (Someshwara Swamy Temple)",
    location: {
      city: "Bhimavaram",
      district: "West Godavari",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.5367, longitude: 81.5204 }
    },
    category: ["Shaiva", "Pancharama Kshetrams"],
    deity: "Someshwara Swamy",
    description: "Famous for the Shiva Lingam that changes color. A revered temple in coastal Andhra.",
    history_summary: "Associated with Lord Chandra who worshipped Shiva here.",
    interesting_facts: [
      "Lingam changes to white on full moon and brown on new moon.",
      "Believed to be installed by Lord Chandra.",
      "Located on River Swarnamukhi."
    ],
    famous_for: [
      "Color-changing Lingam",
      "Moon worship",
      "Pancharama Kshetram"
    ],
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749384516/IMG_20250608_121643_ynjbbh.jpg", alt: "Somarama Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749384525/IMG_20250608_121750_rdnenk.jpg", alt: "Somarama Temple Lingam" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1749385460/Akhanda_ringtone_fsbdw1.mp3",
    rituals_practices: ["Pooja on full moon", "Abhishekam", "Daily Harathi"],
    visiting_hours: "6:00 AM - 8:00 PM"
  },

  // 4. Ksheerarama
  {
    id: "ksheerarama",
    name: "Ksheerarama Temple (Ramalingeswara Swamy)",
    location: {
      city: "Palakollu",
      district: "West Godavari",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 16.5162, longitude: 81.7260 }
    },
    category: ["Shaiva", "Pancharama Kshetrams"],
    deity: "Ramalingeswara Swamy",
    description: "Ksheerarama is a Pancharama temple known for its tall Gopuram and sacred white Lingam.",
    history_summary: "Built by Chalukya kings; considered sacred among the five Pancharamas.",
    interesting_facts: [
      "White-colored Lingam.",
      "One of the tallest Gopurams among Pancharamas.",
      "Name signifies 'Ksheera' (milk) colored Lingam."
    ],
    famous_for: ["White Shiva Lingam", "Tall Gopuram", "Pancharama Kshetram"],
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749384326/IMG_20250608_121332_cppa59.jpg", alt: "Ksheerarama Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749384327/IMG_20250608_121417_pngkun.jpg", alt: "Ksheerarama Temple Lingam" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1749385460/Akhanda_ringtone_fsbdw1.mp3",
    rituals_practices: ["Daily poojas", "Festivals like Maha Shivaratri"],
    visiting_hours: "6:00 AM - 9:00 PM"
  },

  // 5. Kumararama
  {
    id: "kumaramarama",
    name: "Kumararama Temple (Kumeswara Swamy)",
    location: {
      city: "Samalkot",
      district: "Kakinada",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 17.0532, longitude: 82.1696 }
    },
    category: ["Shaiva", "Pancharama Kshetrams"],
    deity: "Kumeswara Swamy",
    description: "The temple has a unique two-story sanctum and is one of the Pancharamas.",
    history_summary: "Constructed by Chalukyas; notable for its architecture and twin shrine for Shiva and Parvati.",
    interesting_facts: [
      "Two-story Garbhagriha (sanctum).",
      "Twin sanctums for Shiva and Parvati.",
      "Pancharama Kshetram."
    ],
    famous_for: ["Twin sanctum", "Chalukya architecture", "Pancharama Kshetram"],
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749384364/IMG_20250608_121136_pzfmij.jpg", alt: "Kumararama Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1749384364/IMG_20250608_121047_cccttn.jpg", alt: "Kumararama Temple Lingam" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1749385460/Akhanda_ringtone_fsbdw1.mp3",
    rituals_practices: ["Pooja to Kumeswara Swamy and Balatripura Sundari Devi"],
    visiting_hours: "6:00 AM - 8:00 PM"
  },

  // New entries for Srikakulam Temples
  {
    id: "arasavallitemple",
    name: "Arasavalli Suryanarayana Swamy Temple",
    location: {
      city: "Arasavalli",
      district: "Srikakulam",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 18.2818, longitude: 83.9009 } // Approximate coordinates
    },
    category: ["Sun Temple", "Ancient", "Vaishnava", "Srikakulam"], // Added Srikakulam category
    deity: "Lord Suryanarayana Swamy (Sun God)",
    description: "An ancient Hindu temple dedicated to Lord Suryanarayana, the Sun God. It is one of the oldest and most revered Sun temples in India.",
    history_summary: "The temple is believed to have been built by Devendra Varma, a Kalinga king, in the 7th century. Legend says that the temple was constructed to absolve Indra (Devendra) of his sins. The architecture showcases a blend of Kalinga and Dravidian styles, with intricate carvings depicting solar deities and mythological scenes.",
    interesting_facts: [
      "The temple is designed such that the sun's rays directly fall on the feet of the idol twice a year (around March and September), during the equinoxes.",
      "It is one of the few surviving ancient Sun temples in India.",
      "The five Pancha-Bhutas (elements) - Earth, Water, Fire, Air, and Space - are believed to be present here."
    ],
    architecture_style: "Kalinga, Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748228356/IMG_20250524_151455_dgfe95.jpg", alt: "Arasavalli Suryanarayana Swamy Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748228348/IMG_20250524_150759_kywsth.jpg", alt: "Arasavalli Temple Gopuram" }
    ],
    audio: "https://res.cloudinary.com/dwbz8m9u8/video/upload/v1748785985/videoplayback_mcsol9.webm", // Placeholder audio
    famous_for: ["Sun God", "Architectural marvel", "Direct sun rays on deity"],
    rituals_practices: ["Daily pujas", "Surya Namaskaram"],
    visiting_hours: "6:00 AM - 12:30 PM, 3:30 PM - 8:00 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. No online booking available.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Pulihora", "Laddu"],
    festivals: [
      { name: "Ratha Saptami", date_or_period: "January/February", description: "The major festival celebrating the Sun God's birthday, with special rituals and chariot procession." },
      { name: "Kalyanotsavam", date_or_period: "Annual (Varies)", description: "Celestial wedding ceremony of the deities." }
    ]
  },
  {
    id: "srikurmam",
    name: "Sri Kurmam Temple",
    location: {
      city: "Sri Kurmam",
      district: "Srikakulam",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 18.2917, longitude: 84.0531 } // Approximate coordinates
    },
    category: ["Vaishnava", "Ancient", "Srikakulam"], // Added Srikakulam category
    deity: "Lord Kurmanatha (Vishnu in Tortoise Avatar)",
    description: "One of the few temples in India dedicated to Lord Vishnu's Kurma (tortoise) avatar. It is an ancient and highly revered Vaishnava pilgrimage site.",
    history_summary: "The temple dates back to the 11th century, with inscriptions from various dynasties including the Eastern Gangas and the Cholas. It is believed to be older than the Jagannath Temple of Puri. The temple has unique architectural features, including a Dhwajastambha (flagpost) on the back side.",
    interesting_facts: [
      "It is the only temple in India where the deity is worshipped in the Kurma (tortoise) avatar.",
      "The temple has a unique 100-pillared mandapam with intricate carvings.",
      "There is a unique practice of circumambulating the temple in reverse (anti-clockwise) by some devotees."
    ],
    architecture_style: "Kalinga, Dravidian",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748228359/IMG_20250526_082050_fcpp4e.jpg", alt: "Sri Kurmam Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748228345/IMG_20250524_123530_oiqr4q.jpg", alt: "Sri Kurmam Temple swami" }
    ],
    famous_for: ["Kurma Avatar", "Ancient Vaishnava temple"],
    rituals_practices: ["Daily pujas", "Tiruveedhi Utsavam (procession)"],
    visiting_hours: "6:00 AM - 1:00 PM, 3:00 PM - 8:30 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. No online booking available.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["coconut piece", "Flowers"],
    festivals: [
      { name: "Kurma Jayanti", date_or_period: "April/May", description: "Celebrates the appearance day of Lord Kurma." },
      { name: "Vaikuntha Ekadashi", date_or_period: "December/January", description: "A highly auspicious day for Vaishnavites." }
    ]
  },
  {
    id: "srimukhalingam",
    name: "Srimukhalingam Temple",
    location: {
      city: "Srimukhalingam",
      district: "Srikakulam",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { latitude: 18.6657, longitude: 84.0906 } // Approximate coordinates
    },
    category: ["Shaiva", "Ancient", "Srikakulam"], // Added Srikakulam category
    deity: "Lord Mukhalingeswara (Shiva)",
    description: "A historically significant ancient Shiva temple, known for its exquisite Kalinga architecture. It was once the capital of the Kalinga kingdom.",
    history_summary: "The temple complex consists of three main temples: Mukhalingeswara, Someswara, and Bhimeswara, all built by the Eastern Ganga dynasty between the 9th and 11th centuries. It represents the pinnacle of Kalinga architectural style and is a protected monument.",
    interesting_facts: [
      "The temple is a UNESCO World Heritage Tentative Site, recognized for its exceptional Kalinga architecture.",
      "The carvings on the temple walls depict various aspects of daily life, mythological stories, and intricate floral patterns.",
      "It was once a prominent center of learning and culture in the ancient Kalinga kingdom."
    ],
    architecture_style: "Kalinga",
    images: [
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748228354/IMG_20250524_151149_mrqgri.png", alt: "Srimukhalingam Temple" },
      { url: "https://res.cloudinary.com/dwbz8m9u8/image/upload/v1748228352/IMG_20250524_150845_dbsc0d.png", alt: "Srimukhalingam Temple linga" }
    ],
    famous_for: ["Kalinga architecture", "Ancient capital", "Intricate carvings"],
    rituals_practices: ["Daily pujas", "Maha Shivratri"],
    visiting_hours: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    entry_fee: "Free",
    darshan_tickets: {
      is_available_online: false,
      booking_link: null,
      types_of_darshan: [],
      booking_notes: "General darshan is free. No online booking available.",
      approx_cost: "Free",
      identification_required: false
    },
    prasads: ["Bael Patra", "Flowers"],
    festivals: [
      { name: "Maha Shivratri", date_or_period: "February/March", description: "The major festival, attracting thousands of devotees for special pujas." },
      { name: "Kartika Purnima", date_or_period: "November", description: "Celebrated with traditional rituals and lighting of lamps." }
    ]
  },
];




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
// TOP NAVBAR - Improved with dark mode toggle & search bar
// ============================================================
function TopNavbar({ onNavigate, onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const { dark, toggleDark } = useDarkMode();
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) { onSearch(searchVal.trim()); setSearchVal(''); setIsOpen(false); }
  };

  const navLinks = [
    { label: "🏠 Home", page: "home" },
    { label: "ℹ️ About", page: "about" },
    { label: "🛕 Explore", page: "explore" },
    { label: "📋 Categories", page: "categories" },
    { label: "🎟️ Tickets", page: "tickets" },
    { label: "🎉 Festivals", page: "festivals" },
    { label: "📖 History", page: "history" },
    { label: "🗺️ By State", page: "statewise" },
    { label: "❤️ Favorites", page: "favorites" },
    { label: "🗺️ Map View", page: "mapview" },
    { label: "📍 Nearby", page: "nearby" },
    { label: "📞 Contact", page: "contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 shadow-lg transition-colors duration-300 md:hidden ${dark ? 'bg-gray-900 border-b border-yellow-700' : 'bg-amber-50 border-b border-yellow-200'}`}>
      <span className={`text-xl font-bold ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>🛕 TEMPLEVERSE</span>
      <div className="flex items-center gap-3">
        <button onClick={toggleDark} className={`text-xl p-1 rounded-full ${dark ? 'bg-yellow-700 text-white' : 'bg-yellow-200 text-gray-800'}`}>{dark ? '☀️' : '🌙'}</button>
        <button className={`text-2xl ${dark ? 'text-yellow-400' : 'text-yellow-700'}`} onClick={() => setIsOpen(!isOpen)}>☰</button>
      </div>
      {isOpen && (
        <div className={`absolute top-full left-0 w-full shadow-xl z-40 ${dark ? 'bg-gray-900 border-t border-yellow-700' : 'bg-white border-t border-yellow-200'}`}>
          <form onSubmit={handleSearch} className="px-4 pt-3 pb-1 flex gap-2">
            <input value={searchVal} onChange={e=>setSearchVal(e.target.value)} placeholder="Search temples..." className={`flex-1 border rounded-full px-3 py-1.5 text-sm ${dark ? 'bg-gray-800 border-yellow-700 text-white placeholder-gray-400' : 'border-yellow-300 text-gray-800'}`} />
            <button type="submit" className="bg-yellow-500 text-white px-4 py-1.5 rounded-full text-sm">Go</button>
          </form>
          <div className={`flex flex-col px-4 py-2 text-sm font-raleway ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
            {navLinks.map((item, i) => (
              <a key={i} href={`#${item.page}`} onClick={() => { onNavigate(item.page, null, null, null); setIsOpen(false); }}
                className={`py-2 border-b transition hover:text-yellow-500 ${dark ? 'border-gray-700' : 'border-yellow-50'}`}>
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
// SIDEBAR - Improved with dark mode, icons, hover effects
// ============================================================
function Sidebar({ onNavigate }) {
  const { dark, toggleDark } = useDarkMode();
  const [showStates, setShowStates] = useState(false);

  const getUniqueStates = () => {
    const states = new Set();
    templesData.forEach(t => { if (t.location?.state) states.add(t.location.state.trim()); });
    return Array.from(states).sort();
  };
  const uniqueStates = getUniqueStates();

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
    { icon: "📞", label: "Contact Us", page: "contact" },
  ];

  return (
    <aside className={`fixed top-0 left-0 h-screen w-64 z-50 shadow-2xl p-5 hidden md:flex flex-col transition-colors duration-300 ${dark ? 'bg-gray-900 border-r border-yellow-800' : 'bg-gradient-to-b from-amber-50 to-yellow-50 border-r border-yellow-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-bold tracking-widest ${dark ? 'text-yellow-400' : 'text-yellow-800'}`}>🛕 TEMPLEVERSE</h2>
        <button onClick={toggleDark} title="Toggle dark mode" className={`text-lg p-1.5 rounded-full transition ${dark ? 'bg-yellow-700 text-white hover:bg-yellow-600' : 'bg-yellow-200 text-gray-700 hover:bg-yellow-300'}`}>{dark ? '☀️' : '🌙'}</button>
      </div>
      <nav className={`flex-1 overflow-y-auto space-y-1 text-sm font-raleway ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
        {navLinks.map((item, i) => (
          <button key={i} onClick={() => onNavigate(item.page, null, null, null)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] ${dark ? 'hover:bg-yellow-800/40 hover:text-yellow-300' : 'hover:bg-yellow-100 hover:text-yellow-700'}`}>
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        {/* Temples by State dropdown */}
        <div>
          <button onClick={() => setShowStates(!showStates)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${dark ? 'hover:bg-yellow-800/40 hover:text-yellow-300' : 'hover:bg-yellow-100 hover:text-yellow-700'}`}>
            <span className="flex items-center gap-3"><span>🏛️</span><span>By State</span></span>
            <span className="text-xs">{showStates ? '▲' : '▼'}</span>
          </button>
          {showStates && (
            <div className={`ml-8 mt-1 space-y-0.5 max-h-48 overflow-y-auto text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
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
function HomePage({ onSelectTemple, onNavigate }) {
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
      <section className={`relative z-10 text-center pt-28 pb-12 overflow-hidden ${dark ? '' : ''}`}>
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
          <div className="flex justify-center items-center gap-4 mb-4">
            <motion.span className="text-5xl md:text-7xl text-yellow-600 drop-shadow-[0_0_30px_gold]"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>ॐ</motion.span>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>TEMPLEVERSE</h1>
            <motion.span className="text-5xl md:text-7xl text-yellow-600 drop-shadow-[0_0_30px_gold]"
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
    <section className="relative z-10 pt-28 pb-8">
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

  if (categoryFilter === 'Jyotilinga') { filteredTemples = templesData.filter(t => t.category.includes('Jyotilinga')); pageTitle = "Explore 12 Jyotilingas"; }
  else if (categoryFilter === 'Atma Linga') { filteredTemples = templesData.filter(t => t.category.includes('Atma Linga')); pageTitle = "Explore 5 Atma Lingas"; }
  else if (categoryFilter === 'Maha Shakti Peetha') { filteredTemples = templesData.filter(t => t.category.includes('Maha Shakti Peetha')); pageTitle = "18 Maha Shakti Peethas"; }
  else if (categoryFilter === 'tirupati-famous') { filteredTemples = templesData.filter(t => tirupatiFamousTempleIds.includes(t.id)); pageTitle = "Famous Temples in Tirupati"; }
  else if (categoryFilter === 'arunachalam-lingam') { filteredTemples = templesData.filter(t => t.category.includes('Arunachalam Lingam')); pageTitle = "8 Arunachalam Lingams"; }
  else if (categoryFilter === 'srikakulam-temples') { filteredTemples = templesData.filter(t => srikakulamTempleIds.includes(t.id)); pageTitle = "Temples in Srikakulam"; }
  else if (categoryFilter === 'Pancharama Kshetrams') { filteredTemples = templesData.filter(t => t.category.includes('Pancharama Kshetrams')); pageTitle = "Pancharama Kshetrams"; }
  else if (stateFilter) { filteredTemples = templesData.filter(t => t.location?.state === stateFilter); pageTitle = `Temples in ${stateFilter}`; }
  else {
    const special = new Set([...templesData.filter(t=>t.category.includes('Jyotilinga')).map(t=>t.id),...templesData.filter(t=>t.category.includes('Atma Linga')).map(t=>t.id),...templesData.filter(t=>t.category.includes('Maha Shakti Peetha')).map(t=>t.id),...tirupatiFamousTempleIds,...arunachalamLingamIds,...srikakulamTempleIds]);
    filteredTemples = templesData.filter(t => !special.has(t.id));
  }

  // Apply search
  if (search) { const q = search.toLowerCase(); filteredTemples = filteredTemples.filter(t => t.name.toLowerCase().includes(q) || t.deity?.toLowerCase().includes(q) || t.location?.city?.toLowerCase().includes(q)); }
  // Apply arch filter
  if (archFilter) { filteredTemples = filteredTemples.filter(t => t.architecture_style?.toLowerCase().includes(archFilter.toLowerCase())); }
  // Sort
  if (sortBy === 'name') filteredTemples = [...filteredTemples].sort((a,b) => a.name.localeCompare(b.name));

  const archStyles = [...new Set(templesData.map(t => t.architecture_style).filter(Boolean))].sort();

  return (
    <section className="relative z-10 pt-28 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-center ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>{pageTitle}</h1>
        {/* Filter bar */}
        <div className={`flex flex-wrap gap-3 mb-6 p-4 rounded-2xl border ${dark ? 'bg-gray-800 border-yellow-800' : 'bg-white/80 border-yellow-200'}`}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search by name or deity..."
            className={`flex-1 min-w-[180px] border rounded-full px-4 py-2 text-sm ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-yellow-300 text-gray-800'}`} />
          <select value={archFilter} onChange={e=>setArchFilter(e.target.value)}
            className={`border rounded-full px-4 py-2 text-sm ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'border-yellow-300 text-gray-800 bg-white'}`}>
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
    <section className="relative z-10 pt-28 pb-8">
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
    <section className="relative z-10 pt-28 pb-8">
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
    <section className="relative z-10 pt-28 pb-8">
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
function TempleDetailPage({ templeId, onBack }) {
  const { dark } = useDarkMode();
  const { favorites, toggleFavorite } = useFavorites();
  const temple = templesData.find(t => t.id === templeId);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [showVirtual, setShowVirtual] = useState(false);
  const isFav = favorites.includes(templeId);

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
    <section className="relative z-10 text-center pt-28 pb-8">
      <h1 className="text-4xl text-red-700">Temple Not Found</h1>
      <button onClick={onBack} className="mt-8 px-6 py-3 bg-yellow-600 text-white rounded-full">Back</button>
    </section>
  );

  const playAudio = async () => {
    if (playerRef.current) { await Tone.start(); playerRef.current.start(); setIsPlaying(true); }
  };
  const pauseAudio = () => { if (playerRef.current) { playerRef.current.stop(); setIsPlaying(false); } };

  return (
    <section className="relative z-10 pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <BackButton onBack={onBack} />

        {/* Title + Favorite */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <h1 className={`text-3xl md:text-5xl font-bold ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>{temple.name}</h1>
          <button onClick={() => toggleFavorite(templeId)} className={`text-3xl p-2 rounded-full transition-all hover:scale-110 shrink-0 ${isFav ? 'text-red-500' : dark ? 'text-gray-400' : 'text-gray-300'}`}>{isFav ? '❤️' : '🤍'}</button>
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
    <section className="relative z-10 pt-28 pb-8">
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
// CATEGORIES PAGE
// ============================================================
function CategoriesPage({ onNavigateToExplore, onBack }) {
  const { dark } = useDarkMode();
  const categories = [
    { title: "12 Jyotilingas", filter: "Jyotilinga", icon: "🕉️", description: "Explore the twelve Jyotilinga shrines dedicated to Lord Shiva across India.", color: "orange" },
    { title: "5 Atma Lingas", filter: "Atma Linga", icon: "🌊", description: "The five Shiva temples representing the five great elements of nature.", color: "blue" },
    { title: "18 Maha Shakti Peethas", filter: "Maha Shakti Peetha", icon: "🔥", description: "Eighteen revered Shakti Peethas where parts of Goddess Sati fell.", color: "red" },
    { title: "Famous Temples in Tirupati", filter: "tirupati-famous", icon: "🛕", description: "Renowned temples in and around the sacred city of Tirupati.", color: "green" },
    { title: "8 Arunachalam Lingams", filter: "arunachalam-lingam", icon: "⭐", description: "Eight directional Shiva Lingams surrounding the great Arunachala hill.", color: "purple" },
    { title: "Temples in Srikakulam", filter: "srikakulam-temples", icon: "🏛️", description: "Significant temples in and around Srikakulam, Andhra Pradesh.", color: "teal" },
    { title: "Pancharama Kshetrams", filter: "Pancharama Kshetrams", icon: "🌸", description: "Five Pancharama Kshetram temples in Andhra Pradesh dedicated to Lord Shiva.", color: "pink" },
  ];
  const colorMap = { orange: dark ? 'bg-orange-900/30 border-orange-700' : 'bg-orange-50 border-orange-200', blue: dark ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200', red: dark ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200', green: dark ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200', purple: dark ? 'bg-purple-900/30 border-purple-700' : 'bg-purple-50 border-purple-200', teal: dark ? 'bg-teal-900/30 border-teal-700' : 'bg-teal-50 border-teal-200', pink: dark ? 'bg-pink-900/30 border-pink-700' : 'bg-pink-50 border-pink-200' };

  return (
    <section className="relative z-10 pt-28 pb-8">
      <div className="max-w-5xl mx-auto px-4">
        <BackButton onBack={onBack} />
        <h1 className={`text-4xl font-bold mb-8 text-center ${dark ? 'text-yellow-400' : 'text-yellow-700'}`}>Temple Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03, y: -4 }} transition={{ duration: 0.2 }}
              onClick={() => onNavigateToExplore(cat.filter)}
              className={`p-5 rounded-2xl border cursor-pointer shadow-sm ${colorMap[cat.color]} flex flex-col`}>
              <span className="text-3xl mb-2">{cat.icon}</span>
              <h2 className={`text-lg font-bold mb-1 ${dark ? 'text-white' : 'text-gray-800'}`}>{cat.title}</h2>
              <p className={`text-xs flex-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{cat.description}</p>
              <button className={`mt-3 self-start text-xs px-4 py-1.5 rounded-full font-medium transition ${dark ? 'bg-yellow-700 text-white hover:bg-yellow-600' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}>View →</button>
            </motion.div>
          ))}
        </div>
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
    <section className="relative z-10 pt-28 pb-8">
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
    <section className="relative z-10 pt-28 pb-8">
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
    <section className="relative z-10 pt-28 pb-8">
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
    <section className="relative z-10 pt-28 pb-8">
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
    <section className="relative z-10 pt-28 pb-8">
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
      case 'home': return <HomePage onSelectTemple={id => handleNavigate('templeDetail', id)} onNavigate={handleNavigate} />;
      case 'about': return <AboutPage onBack={handleBack} />;
      case 'explore': return <ExploreTemplesPage onSelectTemple={id => handleNavigate('templeDetail', id)} categoryFilter={currentCategoryFilter} stateFilter={selectedStateFilter} playAudio={playAudio} pauseAudio={pauseAudio} stopAudio={stopAudio} isPlaying={isPlaying} playingTempleId={playingTempleId} />;
      case 'categories': return <CategoriesPage onNavigateToExplore={filter => handleNavigate('explore', null, filter, null)} onBack={handleBack} />;
      case 'tickets': return <TicketsPage onBack={handleBack} />;
      case 'festivals': return <FestivalsPage onBack={handleBack} />;
      case 'history': return <HistoryPage onBack={handleBack} />;
      case 'contact': return <ContactPage onBack={handleBack} />;
      case 'statewise': return <StatewiseTemplesPage onSelectState={state => handleNavigate('explore', null, null, state)} onBack={handleBack} />;
      case 'templeDetail': return <TempleDetailPage templeId={selectedTempleId} onBack={handleBack} />;
      case 'favorites': return <FavoritesPage onSelectTemple={id => handleNavigate('templeDetail', id)} onBack={handleBack} />;
      case 'mapview': return <MapViewPage onSelectTemple={id => handleNavigate('templeDetail', id)} onBack={handleBack} />;
      case 'nearby': return <NearbyTemplesPage onSelectTemple={id => handleNavigate('templeDetail', id)} onBack={handleBack} />;
      case 'search': return <SearchResultsPage query={searchQuery} onSelectTemple={id => handleNavigate('templeDetail', id)} onBack={handleBack} />;
      default: return <HomePage onSelectTemple={id => handleNavigate('templeDetail', id)} onNavigate={handleNavigate} />;
    }
  };

  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>
      <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
        <ReviewsContext.Provider value={{ addReview, getReviews, getAvgRating }}>
          <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-gray-950 text-white' : 'bg-gradient-to-b from-amber-50 via-yellow-50 to-white text-gray-800'}`}>
            <TopNavbar onNavigate={handleNavigate} onSearch={handleSearch} />
            <Sidebar onNavigate={handleNavigate} />
            <div className="md:ml-64">
              {/* Desktop search bar at top */}
              <div className={`hidden md:block sticky top-0 z-40 px-6 py-3 border-b transition-colors ${dark ? 'bg-gray-950 border-yellow-900' : 'bg-amber-50/90 border-yellow-100'} backdrop-blur`}>
                <SearchBar onSearch={handleSearch} />
              </div>
              <main className="px-0">
                {renderPage()}
              </main>
            </div>
          </div>
        </ReviewsContext.Provider>
      </FavoritesContext.Provider>
    </DarkModeContext.Provider>
  );
}

export default App;
