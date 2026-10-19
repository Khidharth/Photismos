/* ==========================================================
   PHOTISMOS: script.js
   Plain JavaScript, no build step. Sections:
     1. DATA      sections, verses and quiz questions (edit these to add content)
     2. HELPERS   storage, sharing, shuffling
     3. PAGES     one function per page, each returns HTML
     4. ROUTER    shows the right page for the address after the "#"
     5. QUIZ      the working Bible trivia game
   ========================================================== */

/* ---------- 1. DATA ---------- */
// Quiz questions: copy a block to add one. correctIndex: 0 = first answer.
// Every reference must be checked against a trusted Bible before launch.
const QUESTIONS = [
  {
    "id": 1,
    "question": "Who was instructed to build an ark before the great flood?",
    "options": [
      "Moses",
      "Noah",
      "Abraham",
      "Elijah"
    ],
    "correctIndex": 1,
    "reference": "Genesis 6:14",
    "explanation": "God told Noah to make an ark, and Noah did according to all that God commanded him."
  },
  {
    "id": 2,
    "question": "How long did the rain fall on the earth in the flood account?",
    "options": [
      "7 days and 7 nights",
      "40 days and 40 nights",
      "12 days and 12 nights",
      "100 days and 100 nights"
    ],
    "correctIndex": 1,
    "reference": "Genesis 7:12",
    "explanation": "The rain was upon the earth forty days and forty nights."
  },
  {
    "id": 3,
    "question": "Who killed the Philistine giant Goliath with a sling and a stone?",
    "options": [
      "Saul",
      "Jonathan",
      "David",
      "Samuel"
    ],
    "correctIndex": 2,
    "reference": "1 Samuel 17:50",
    "explanation": "David prevailed over the Philistine with a sling and a stone."
  },
  {
    "id": 4,
    "question": "Which prophet was placed in a den of lions for continuing to pray to God?",
    "options": [
      "Daniel",
      "Isaiah",
      "Jeremiah",
      "Ezekiel"
    ],
    "correctIndex": 0,
    "reference": "Daniel 6:16",
    "explanation": "King Darius ordered Daniel to be cast into the den of lions, yet God preserved him."
  },
  {
    "id": 5,
    "question": "What is the first book of the Bible?",
    "options": [
      "Exodus",
      "Psalms",
      "Matthew",
      "Genesis"
    ],
    "correctIndex": 3,
    "reference": "Genesis 1:1",
    "explanation": "The Bible opens with Genesis: “In the beginning God created the heaven and the earth.”"
  },
  {
    "id": 6,
    "question": "Whom did God send to Pharaoh to bring the Israelites out of Egypt?",
    "options": [
      "Aaron alone",
      "Joshua",
      "Joseph",
      "Moses"
    ],
    "correctIndex": 3,
    "reference": "Exodus 3:10",
    "explanation": "God said, “Come now therefore, and I will send thee unto Pharaoh,” that Moses might bring the people out."
  },
  {
    "id": 7,
    "question": "Which prophet was swallowed by a great fish?",
    "options": [
      "Jonah",
      "Amos",
      "Hosea",
      "Micah"
    ],
    "correctIndex": 0,
    "reference": "Jonah 1:17",
    "explanation": "The LORD had prepared a great fish to swallow up Jonah."
  },
  {
    "id": 8,
    "question": "In which town was Jesus born?",
    "options": [
      "Nazareth",
      "Jerusalem",
      "Bethlehem",
      "Capernaum"
    ],
    "correctIndex": 2,
    "reference": "Matthew 2:1",
    "explanation": "Jesus was born in Bethlehem of Judaea in the days of Herod the king."
  },
  {
    "id": 9,
    "question": "How many apostles did Jesus choose from among His disciples?",
    "options": [
      "Seven",
      "Ten",
      "Twelve",
      "Seventy"
    ],
    "correctIndex": 2,
    "reference": "Luke 6:13",
    "explanation": "Jesus called his disciples and chose twelve, whom he also named apostles."
  },
  {
    "id": 10,
    "question": "Which of Jacob’s sons was sold by his brothers into slavery?",
    "options": [
      "Reuben",
      "Joseph",
      "Benjamin",
      "Judah"
    ],
    "correctIndex": 1,
    "reference": "Genesis 37:28",
    "explanation": "Joseph’s brothers sold him to the Ishmaelite traders, who took him to Egypt."
  },
  {
    "id": 11,
    "question": "Who stepped out of the boat and walked on the water toward Jesus?",
    "options": [
      "John",
      "Andrew",
      "Thomas",
      "Peter"
    ],
    "correctIndex": 3,
    "reference": "Matthew 14:29",
    "explanation": "At Jesus’ word “Come,” Peter walked on the water to go to Jesus."
  },
  {
    "id": 12,
    "question": "Which Moabite woman told her mother-in-law, “Whither thou goest, I will go”?",
    "options": [
      "Ruth",
      "Esther",
      "Rahab",
      "Deborah"
    ],
    "correctIndex": 0,
    "reference": "Ruth 1:16",
    "explanation": "Ruth chose to stay with Naomi and to take Naomi’s people and God as her own."
  },
  {
    "id": 13,
    "question": "When Solomon became king, what did he ask God to give him?",
    "options": [
      "Long life",
      "Great riches",
      "Victory over his enemies",
      "An understanding heart"
    ],
    "correctIndex": 3,
    "reference": "1 Kings 3:9",
    "explanation": "Solomon asked for an understanding heart to judge God’s people and discern good from bad."
  },
  {
    "id": 14,
    "question": "Which book is the last book of the Bible?",
    "options": [
      "Jude",
      "Revelation",
      "Acts",
      "Malachi"
    ],
    "correctIndex": 1,
    "reference": "Revelation 22:21",
    "explanation": "The Bible closes with the book of Revelation."
  },
  {
    "id": 15,
    "question": "Who was the Jewish queen whom God used to help save her people from Haman’s plot?",
    "options": [
      "Vashti",
      "Sarah",
      "Esther",
      "Miriam"
    ],
    "correctIndex": 2,
    "reference": "Esther 7:3",
    "explanation": "Esther pleaded with the king for her life and her people’s, exposing Haman’s plan."
  }
];

// Sections: one list drives the menu, the home tiles and the "coming soon" pages.
// status: 'live' works today, 'soon' shows an honest "not built yet" notice.
const SECTIONS = [
  {
    "path": "/the-word",
    "nav": "The Word",
    "title": "The Word",
    "blurb": "Read the Bible (KJV), jump to any passage, bookmark it and play Bible trivia.",
    "status": "live",
    "phase": 2
  },
  {
    "path": "/chronicles",
    "nav": "Chronicles",
    "title": "The Biblical Chronicles",
    "blurb": "Study David, Joseph, Esther, Ruth and Daniel: their story, events, victories, failures and lessons.",
    "status": "live",
    "phase": 3
  },
  {
    "path": "/chokmah",
    "nav": "CHOKMAH",
    "title": "CHOKMAH — Solomon’s Daily Wisdom",
    "blurb": "A daily wisdom entry from Proverbs with an application, an action and a reflection.",
    "status": "live",
    "phase": 3
  },
  {
    "path": "/daily-bread",
    "nav": "My Daily Bread",
    "title": "MY DAILY BREAD",
    "blurb": "A daily devotional with a private journal, prayer and a streak that tracks your habit.",
    "status": "live",
    "phase": 4
  },
  {
    "path": "/colour-symbols",
    "nav": "Colour Symbols",
    "title": "Colour Symbols",
    "blurb": "Study how colours appear in Scripture, separating what the text says from interpretation.",
    "status": "live",
    "phase": 4
  },
  {
    "path": "/bible-arena",
    "nav": "Bible Arena",
    "title": "Bible Arena",
    "blurb": "A multiplayer Bible trivia game with a spinning bottle. This needs a real-time backend (Supabase), so it is not available in this simple version.",
    "status": "soon",
    "phase": 7,
    "plan": [
      "Real-time rooms through Supabase Realtime",
      "Server-authoritative turns, timers and scoring",
      "Needs your Supabase project (see README)"
    ]
  },
  {
    "path": "/daily-challenges",
    "nav": "Challenges",
    "title": "Daily Challenges",
    "blurb": "Unwrap the Word puzzle, a daily Bible question, Scripture memory practice and achievements.",
    "status": "live",
    "phase": 5
  }
];

// Featured verses (King James Version, public domain). Check against a trusted KJV source before launch.
// "reflection" is our own commentary, not Scripture.
const TRANSLATION = 'King James Version (KJV)';
const VERSES = [
  {
    "ref": "Psalm 119:105",
    "text": "Thy word is a lamp unto my feet, and a light unto my path.",
    "reflection": "A lamp lights the next step, not the whole road. Let today’s reading guide today’s decisions."
  },
  {
    "ref": "Proverbs 3:5-6",
    "text": "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    "reflection": "Trust is practised in ordinary choices. Where are you leaning on your own understanding this week?"
  },
  {
    "ref": "John 8:12",
    "text": "Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.",
    "reflection": "Light is received by following. Notice the verb: walking, not just admiring."
  },
  {
    "ref": "Psalm 119:130",
    "text": "The entrance of thy words giveth light; it giveth understanding unto the simple.",
    "reflection": "Understanding begins when the Word is opened. You do not have to be an expert to start."
  },
  {
    "ref": "Joshua 1:9",
    "text": "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    "reflection": "Courage here rests on a promise of presence, not on the absence of difficulty."
  },
  {
    "ref": "Matthew 5:14",
    "text": "Ye are the light of the world. A city that is set on an hill cannot be hid.",
    "reflection": "Being illuminated is meant to be seen in how we live, quietly and consistently."
  },
  {
    "ref": "Philippians 4:13",
    "text": "I can do all things through Christ which strengtheneth me.",
    "reflection": "Read it in its context (Philippians 4:10-13), where Paul speaks of contentment in every circumstance."
  }
];

const ROUND_SIZE = 10;

/* ---------- 2. HELPERS ---------- */
const $ = (sel) => document.querySelector(sel);

// Escape text before putting it into HTML.
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Saved on this device only (localStorage). This is not an account.
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked: app still works */ }
}

// Verse changes once per calendar day (not random), so reloading never changes it.
function dailyVerse(date = new Date()) {
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  return VERSES[dayOfYear % VERSES.length];
}

// Phone share sheet (WhatsApp etc.) when available, otherwise copy to clipboard.
async function shareText({ title, text, url }) {
  const full = [text, url].filter(Boolean).join('\n');
  try {
    if (navigator.share) { await navigator.share({ title, text, url }); return 'shared'; }
  } catch (e) {
    if (e && e.name === 'AbortError') return 'cancelled';
  }
  try { await navigator.clipboard.writeText(full); return 'copied'; } catch (e) { return 'failed'; }
}
function shareMessage(outcome) {
  return { shared: 'Shared!', copied: 'Copied to your clipboard.', cancelled: 'Sharing was cancelled.', failed: 'Sharing is not available here.' }[outcome];
}
function siteUrl() { return location.protocol.startsWith('http') ? location.origin + location.pathname : ''; }

// Fair shuffle (Fisher-Yates).
function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function buildRound(bank, count) {
  return shuffle(bank).slice(0, Math.min(count, bank.length)).map((q) => {
    const correctText = q.options[q.correctIndex];
    const options = shuffle(q.options);
    return { ...q, options, correctIndex: options.indexOf(correctText) };
  });
}

/* ---------- 1b. MORE DATA (all our own commentary; Scripture text is loaded live) ---------- */
// IMPORTANT: the only Bible text in this file is the short featured verses above.
// Everything else stores REFERENCES only. The verse words are fetched in KJV when
// the page opens (see "Bible text source" below), so we never retype Scripture by hand.
// All commentary below is our own writing and should be reviewed before launch.

const BIBLE_API = 'https://bible-api.com/'; // free KJV text service; needs internet

// [book, number of chapters]
const BOOKS = [
  ['Genesis',50],['Exodus',40],['Leviticus',27],['Numbers',36],['Deuteronomy',34],['Joshua',24],['Judges',21],['Ruth',4],
  ['1 Samuel',31],['2 Samuel',24],['1 Kings',22],['2 Kings',25],['1 Chronicles',29],['2 Chronicles',36],['Ezra',10],
  ['Nehemiah',13],['Esther',10],['Job',42],['Psalms',150],['Proverbs',31],['Ecclesiastes',12],['Song of Solomon',8],
  ['Isaiah',66],['Jeremiah',52],['Lamentations',5],['Ezekiel',48],['Daniel',12],['Hosea',14],['Joel',3],['Amos',9],
  ['Obadiah',1],['Jonah',4],['Micah',7],['Nahum',3],['Habakkuk',3],['Zephaniah',3],['Haggai',2],['Zechariah',14],['Malachi',4],
  ['Matthew',28],['Mark',16],['Luke',24],['John',21],['Acts',28],['Romans',16],['1 Corinthians',16],['2 Corinthians',13],
  ['Galatians',6],['Ephesians',6],['Philippians',4],['Colossians',4],['1 Thessalonians',5],['2 Thessalonians',3],
  ['1 Timothy',6],['2 Timothy',4],['Titus',3],['Philemon',1],['Hebrews',13],['James',5],['1 Peter',5],['2 Peter',3],
  ['1 John',5],['2 John',1],['3 John',1],['Jude',1],['Revelation',22],
];

/* CHOKMAH: one entry per day, chosen by day of the year. Add entries freely. */
const WISDOM = [
  { id: 'w1', theme: 'Teachability', title: 'The Gift of Being Corrected', ref: 'Proverbs 12:1',
    explanation: 'Wisdom begins with a willingness to be taught. The verse sets two people side by side: one loves instruction, the other hates being corrected, and it does not soften the contrast.',
    application: 'Next time a parent, teacher, pastor or friend points out a mistake, pause before defending yourself and ask what you can learn from it.',
    action: 'Ask one trusted person today: “What is one thing I could do better?” Then only listen.',
    reflection: 'Whose correction do I tend to dismiss, and why?' },
  { id: 'w2', theme: 'Anger', title: 'The Soft Answer', ref: 'Proverbs 15:1',
    explanation: 'The way we answer can raise the temperature of a conflict or lower it. This proverb observes how gentle words and harsh words tend to work.',
    application: 'In a heated message or conversation, reply more slowly and more quietly than you feel like replying.',
    action: 'Before you answer anything sharp today, take one slow breath and soften the first sentence.',
    reflection: 'Which recent argument could have gone differently with a gentler first reply?' },
  { id: 'w3', theme: 'Diligence', title: 'Lessons from an Ant', ref: 'Proverbs 6:6-8',
    explanation: 'The writer points to the ant: no one is standing over it, yet it prepares ahead. Wisdom here is steady work that does not depend on being watched.',
    application: 'Do the small unseen tasks (studying, saving, preparing) before they become emergencies.',
    action: 'Pick one task you have been putting off and work on it for 20 minutes.',
    reflection: 'What would I do differently this week if nobody was checking on me?' },
  { id: 'w4', theme: 'Humility', title: 'Before the Fall', ref: 'Proverbs 11:2',
    explanation: 'This proverb connects pride with shame and humility with wisdom. Pride tends to hide our blind spots; humility lets us see them.',
    application: 'Notice when you rush to be right, to be praised or to be noticed, and choose to let someone else have the moment.',
    action: 'Give credit to someone else publicly today.',
    reflection: 'Where might pride be keeping me from asking for help?' },
  { id: 'w5', theme: 'Friendship', title: 'A Friend at All Times', ref: 'Proverbs 17:17',
    explanation: 'Real friendship is measured in hard seasons, not only in good ones. The verse describes loyalty that stays when things get difficult.',
    application: 'Show up for someone going through a hard time, even if all you can offer is your presence.',
    action: 'Send a message today to a friend you have not checked on lately.',
    reflection: 'Who needs me to be that kind of friend right now?' },
  { id: 'w6', theme: 'Money and stewardship', title: 'The Weight of Debt', ref: 'Proverbs 22:7',
    explanation: 'The proverb makes an observation about power: the one who lends has influence over the one who borrows. It is a caution, not a rule for every situation.',
    application: 'Before taking on a loan or a purchase on credit, count the cost and ask whether it limits your freedom later.',
    action: 'Write down what you owe (if anything) and one step to reduce it.',
    reflection: 'What does my spending say about what I trust?' },
  { id: 'w7', theme: 'Integrity', title: 'A Guide That Cannot Be Bought', ref: 'Proverbs 11:3',
    explanation: 'Integrity works like a compass: it guides a person through choices when no rule covers the situation. The verse also warns about the opposite, a crooked path that eventually undoes the one who walks it.',
    application: 'Do the honest thing when a shortcut is easy and no one would know.',
    action: 'Correct one small untruth or exaggeration today.',
    reflection: 'Where is there a gap between who I am in public and in private?' },
  { id: 'w8', theme: 'Patience', title: 'Slow to Anger', ref: 'Proverbs 14:29',
    explanation: 'The verse says patience reveals understanding, while a quick temper shows the opposite. Patience is treated as a sign of insight, not of weakness.',
    application: 'When something irritates you, add a pause between the feeling and the response.',
    action: 'Count to ten (or pray one sentence) the next time you feel irritated.',
    reflection: 'What situation tests my patience most, and what is it teaching me?' },
  { id: 'w9', theme: 'Decision-making', title: 'Commit Your Plans', ref: 'Proverbs 16:3',
    explanation: 'This verse invites us to bring our work and plans to God. It does not promise every plan will succeed; it describes the posture of entrusting our work to Him.',
    application: 'Before an important decision, pray over it, seek wise counsel and then act.',
    action: 'Name one decision you are facing and pray about it by name.',
    reflection: 'Have I asked God about this decision, or only informed Him?' },
  { id: 'w10', theme: 'Speech', title: 'Words Have Power', ref: 'Proverbs 18:21',
    explanation: 'The proverb says the tongue has power over life and death. It is a reminder that words can build up or tear down.',
    application: 'Use your words today to encourage, not just to inform or criticise.',
    action: 'Say one specific encouraging sentence to someone.',
    reflection: 'What words do I regularly speak over myself and others?' },
];

/* MY DAILY BREAD: one devotional per day, chosen by day of the year. */
const DEVOTIONALS = [
  { id: 'd1', title: 'The Lord My Shepherd', ref: 'Psalm 23:1-6',
    reflection: 'David writes as a shepherd who knows what a flock needs: rest, water, direction and protection. The psalm moves from “He” (the Lord does these things) to “Thou” (You are with me) in the dark valley, as though the closer the danger, the more personal the trust becomes.',
    lesson: 'God’s care is personal and continues through hard places, not only the easy ones.',
    application: 'Name one area where you feel anxious today and consciously hand it to the Shepherd.',
    prayer: 'Lord, You are my Shepherd. Lead me today, and when the path is dark, remind me that You are with me. Amen.' },
  { id: 'd2', title: 'Learning to Pray', ref: 'Matthew 6:9-13',
    reflection: 'Jesus gives a pattern rather than a script. It begins with who God is, then asks for daily bread, forgiveness and protection. Notice how much of the prayer is plural: our bread, our debts.',
    lesson: 'Prayer starts with God’s honour before our needs, and it is not only private but shared.',
    application: 'Pray through the pattern slowly today, spending a minute on each phrase.',
    prayer: 'Father, teach me to pray. Let Your name be honoured in my life, and give me what I need for today. Amen.' },
  { id: 'd3', title: 'Anxiety and Peace', ref: 'Philippians 4:6-9',
    reflection: 'Paul writes from imprisonment, yet he tells the Philippians not to be anxious. He gives a practical path: bring requests to God with thanksgiving, then direct your thoughts toward what is true, honourable and pure.',
    lesson: 'Peace grows when worry is turned into prayer and attention is deliberately redirected.',
    application: 'Write down one worry, turn it into a prayer, and list three things you are thankful for.',
    prayer: 'God of peace, take my worries and guard my heart and mind. Help me think on what is good. Amen.' },
  { id: 'd4', title: 'Strength for the Weary', ref: 'Isaiah 40:28-31',
    reflection: 'The passage first describes God as the everlasting Creator who does not grow tired, and only then speaks of those who wait on Him. Our strength is renewed by connection to His, not by trying harder alone.',
    lesson: 'Waiting on the Lord is an active trust that receives strength we do not have.',
    application: 'Where are you running on empty? Ask God for strength for that one thing today.',
    prayer: 'Everlasting God, I am weary. Renew my strength as I wait on You. Amen.' },
  { id: 'd5', title: 'Be Strong and Courageous', ref: 'Joshua 1:6-9',
    reflection: 'Joshua is stepping into Moses’ role. God repeats “be strong and of good courage”, and then ties it to two things: obedience to His word and the promise of His presence.',
    lesson: 'Courage in Scripture rests on God’s presence and word, not on how we feel.',
    application: 'Identify one step of obedience you have been avoiding and take it today.',
    prayer: 'Lord, give me courage to follow You where You lead, knowing You are with me. Amen.' },
  { id: 'd6', title: 'A Renewed Mind', ref: 'Romans 12:1-2',
    reflection: 'Paul moves from what God has done (the earlier chapters of Romans) to how we live in response: offering ourselves and allowing our thinking to be renewed rather than shaped by the surrounding culture.',
    lesson: 'Transformation begins in the mind and shows up in how we live.',
    application: 'Notice one habit of thought you have picked up from the world and replace it with a truth from Scripture.',
    prayer: 'Father, I give You my life today. Renew my mind and shape me into Your likeness. Amen.' },
  { id: 'd7', title: 'Remaining in the Vine', ref: 'John 15:1-8',
    reflection: 'Jesus uses a vine and branches to show that fruitfulness comes from staying connected to Him. A branch does not strain to produce fruit; it stays attached and receives life.',
    lesson: 'Spiritual fruit is the result of staying close to Christ, not of striving apart from Him.',
    application: 'Set aside a few quiet minutes today simply to remain with Jesus in prayer and Scripture.',
    prayer: 'Jesus, help me to remain in You. Let my life bear fruit that honours You. Amen.' },
];

/* COLOUR SYMBOLS. Each section separates what the text says from interpretation. */
const COLOURS = [
  { id: 'purple', name: 'Purple', hex: '#6b3fa0',
    overview: 'In Scripture purple is mostly an expensive dyed cloth. It appears in the tabernacle furnishings, on the clothes of kings and in the trade of merchants.',
    explicit: 'The Bible does not explain what purple means. No verse says “purple stands for…”.',
    supported: 'Judges 8:26 lists purple raiment among the possessions of the kings of Midian, and in Mark 15:17-20 soldiers dress Jesus in purple to mock Him as king. Both link purple with royalty.',
    cultural: 'Purple dye was costly in the ancient world, which is why purple cloth is widely linked with wealth and rank. This is historical background, not stated in the verses. Acts 16:14 mentions Lydia as a seller of purple.',
    plausible: 'Because purple appears in the tabernacle curtains (Exodus 26:1), some writers connect it to the kingship of God. That is a reasonable reading but the text does not say it.',
    refs: ['Judges 8:26', 'Mark 15:17-20', 'Acts 16:14', 'Exodus 26:1'],
    examples: 'Mark 15:17-20: the purple robe is placed on Jesus as mockery, yet the Gospel presents Him as truly the King. Judges 8:26: purple belongs to defeated kings, showing it as a mark of status.',
    reflection: 'Read Mark 15:17-20 slowly. What irony do you notice in the soldiers’ use of royal clothing?' },
  { id: 'white', name: 'White', hex: '#f3efe6',
    overview: 'White appears in clothing, snow, wool, manna and visions of heaven. It is used in very different contexts.',
    explicit: 'Revelation 7:14 explains the white robes in that vision: they were washed and made white “in the blood of the Lamb”. Here the text itself gives the meaning.',
    supported: 'Isaiah 1:18 uses “white as snow” for sins that are forgiven, contrasted with scarlet. Daniel 7:9 describes a garment white as snow in a vision of the Ancient of Days. In Mark 9:3 Jesus’ clothes become shining white at the Transfiguration.',
    cultural: 'Mark 9:3 notes that no launderer on earth could make clothes that white, which shows how striking the whiteness is meant to be.',
    plausible: 'Many people say white always means purity. Scripture shows more variety: in Exodus 16:31 the manna is described as white simply to describe its appearance, and in Leviticus 13 a white change in the skin is a sign the priest examines, not a sign of purity.',
    refs: ['Revelation 7:9-14', 'Isaiah 1:18', 'Daniel 7:9', 'Mark 9:3', 'Exodus 16:31'],
    examples: 'Revelation 7:9-14: a great crowd in white robes, and the elder explains where the whiteness comes from. Isaiah 1:18: forgiveness is pictured as a stain removed.',
    reflection: 'Compare Isaiah 1:18 with Exodus 16:31. How does context change what “white” is doing?' },
  { id: 'scarlet', name: 'Scarlet / Red', hex: '#b3202e',
    overview: 'Scarlet and red appear in cleansing rituals, in a cord on a window, in royal and mocking robes, and in visions of empire.',
    explicit: 'Isaiah 1:18 uses scarlet and red as an image of sins that stain, and promises cleansing. Joshua 2:18 states the function of the scarlet cord: it is the sign by which Rahab’s household is recognised and spared.',
    supported: 'Leviticus 14:4 includes scarlet in the ritual cleansing of a person healed of a skin disease. Matthew 27:28 describes a scarlet robe put on Jesus by soldiers. Revelation 17:3 shows a scarlet beast in an unfriendly vision.',
    cultural: 'Scarlet was a costly dye, so scarlet cloth also signalled wealth and status.',
    plausible: 'A popular reading connects Rahab’s scarlet cord with the blood of Christ. Joshua 2 does not say this, and Isaiah 1:18, Leviticus 14:4 and Revelation 17:3 use scarlet in very different ways, so be careful about applying one meaning everywhere.',
    refs: ['Isaiah 1:18', 'Joshua 2:18', 'Leviticus 14:4', 'Matthew 27:28', 'Revelation 17:3'],
    examples: 'Joshua 2:18-21: a cord marks a house for deliverance. Isaiah 1:18: scarlet and red describe guilt, and the verse promises it can be made white.',
    reflection: 'Place Joshua 2:18 beside Isaiah 1:18. Why might we avoid giving scarlet only one meaning?' },
  { id: 'green', name: 'Green', hex: '#3f7d4e',
    overview: 'Green appears mostly in plants and pasture: trees, leaves and grass. In a dry land it points to water and life.',
    explicit: 'No verse states “green means…”. The images carry their own meaning in context.',
    supported: 'Psalm 52:8 pictures the trusting person as a green olive tree in God’s house. Psalm 23:2 speaks of green pastures. Jeremiah 17:8 says the person who trusts the LORD has leaves that stay green even in drought.',
    cultural: 'In a land with dry seasons, greenery meant water was present. This explains why green is a natural image of flourishing.',
    plausible: 'Psalm 37:35 uses a green tree for the outwardly flourishing wicked, who then pass away (v.36). So green can describe prosperity that does not last. The image depends on what surrounds it.',
    refs: ['Psalm 52:8', 'Psalm 23:2', 'Jeremiah 17:8', 'Psalm 37:35'],
    examples: 'Psalm 52:8 and Jeremiah 17:8 both link a flourishing tree with trust in God. Psalm 37:35-36 shows that being green outwardly does not guarantee lasting life.',
    reflection: 'What is the difference between the green tree in Psalm 52:8 and the one in Psalm 37:35?' },
  { id: 'gold', name: 'Gold', hex: '#c9a24b',
    overview: 'Gold is the most common precious metal in Scripture. It covers the ark and the temple, makes up idols and fills the vision of the heavenly city.',
    explicit: 'Proverbs 8:10 says to prefer instruction and knowledge to choice gold, so the text itself ranks wisdom above gold.',
    supported: 'Exodus 25:11 has the ark overlaid with pure gold, and 1 Kings 6:21-22 describes the temple interior overlaid with gold, which shows gold in the service of God’s dwelling. Revelation 21:18 describes the city as pure gold.',
    cultural: 'Gold was prized as treasure across the ancient world because of its beauty and because it does not tarnish.',
    plausible: 'Gold is often said to symbolise divinity or glory. The texts show it also used for a golden calf (Exodus 32:2-4) and a golden image (Daniel 3:1), so its meaning depends on how it is used.',
    refs: ['Exodus 25:11', '1 Kings 6:21-22', 'Exodus 32:2-4', 'Daniel 3:1', 'Revelation 21:18', 'Proverbs 8:10'],
    examples: 'Exodus 25:11 and Exodus 32:2-4 use gold in opposite ways: one for the ark, one for the calf. The material is the same; the use is different.',
    reflection: 'What does the contrast between Exodus 25 and Exodus 32 teach about how we use what is valuable?' },
  { id: 'blue', name: 'Blue', hex: '#2c4f9e',
    overview: 'Blue appears in the tabernacle curtains, in priestly clothing, in tassels worn by Israelites, and in the splendour of a Persian palace.',
    explicit: 'Numbers 15:38-39 states the purpose of a blue cord on the tassels: so that the people would look at it and remember all the commandments of the LORD.',
    supported: 'Exodus 28:31 describes the robe of the ephod as all blue, and Exodus 26:1 lists blue with purple and scarlet in the tabernacle curtains.',
    cultural: 'Esther 1:6 mentions blue hangings in the Persian court, so blue was also a colour of luxury outside Israel.',
    plausible: 'Blue is often linked to heaven. Exodus 24:10 describes a pavement like sapphire and “the body of heaven in his clearness”, which gives some basis. Scholars also discuss exactly which shade the Hebrew word for blue dye referred to, so this connection is suggestive, not certain.',
    refs: ['Numbers 15:38-39', 'Exodus 28:31', 'Exodus 26:1', 'Esther 1:6', 'Exodus 24:10'],
    examples: 'Numbers 15:38-39: a colour used as a reminder to obey. Esther 1:6: the same kind of colour decorating a royal palace.',
    reflection: 'What everyday “reminders” could help you remember God’s word the way the blue cord did?' },
];

/* DAILY CHALLENGES: Unwrap the Word (answers are checked in the page; this is a learning game, not a secure test). */
const UNWRAP = [
  { answer: 'FAITH', clue: 'Trust in God, described as the substance of things hoped for.', ref: 'Hebrews 11:1',
    explanation: 'Hebrews 11 introduces faith as confident trust in what God has promised, even before it is seen.',
    reflection: 'What is one promise of God I am trusting without seeing yet?', challenge: 'Write down one thing you are trusting God for, and thank Him in advance.' },
  { answer: 'GRACE', clue: 'God’s undeserved favour, the gift by which believers are saved.', ref: 'Ephesians 2:8-9',
    explanation: 'Paul says salvation is a gift of God and not the result of our works.',
    reflection: 'Where am I still trying to earn what God has given freely?', challenge: 'Extend grace to someone who does not deserve it today.' },
  { answer: 'WISDOM', clue: 'What James says to ask God for if you lack it.', ref: 'James 1:5',
    explanation: 'James promises that God gives generously to those who ask for wisdom.',
    reflection: 'What decision do I need wisdom for right now?', challenge: 'Ask God for wisdom about one specific decision.' },
  { answer: 'PEACE', clue: 'What passes all understanding and guards hearts and minds in Christ Jesus.', ref: 'Philippians 4:7',
    explanation: 'Paul connects this peace with bringing requests to God in prayer with thanksgiving.',
    reflection: 'What is stealing my peace today?', challenge: 'Pray about one worry and thank God for three things.' },
  { answer: 'HOPE', clue: 'The God of ____ fill you with all joy and peace in believing.', ref: 'Romans 15:13',
    explanation: 'Paul calls God the God of hope and prays that believers abound in it by the power of the Holy Spirit.',
    reflection: 'Where do I most need hope to be renewed?', challenge: 'Encourage someone who feels discouraged.' },
  { answer: 'MERCY', clue: 'Micah 6:8 says to love ____, do justly, and walk humbly with your God.', ref: 'Micah 6:8',
    explanation: 'Micah summarises what God requires: justice, a love of mercy and humility.',
    reflection: 'Who needs mercy from me?', challenge: 'Show mercy to someone who has wronged you.' },
  { answer: 'LOVE', clue: 'What 1 John says God is.', ref: '1 John 4:8',
    explanation: 'John says the one who does not love does not know God, because God is love.',
    reflection: 'How can I show this kind of love today?', challenge: 'Do one act of kindness without expecting anything back.' },
];

/* Scripture memory: references only; the text is loaded live. */
const MEMORY_VERSES = ['Psalm 119:11', 'Proverbs 3:5', 'John 3:16', 'Isaiah 41:10', 'Romans 8:28', 'Psalm 46:1'];

/* THE BIBLICAL CHRONICLES: add a character by copying one block. The page template is shared. */
const CHARACTERS = [
  { id: 'david', name: 'David', hue: 38, tagline: 'Shepherd, warrior, king and psalmist',
    intro: 'David was the youngest son of Jesse of Bethlehem who became king of Israel. Scripture presents him as a man of real faith and real failure.',
    setting: 'Israel at the time of the early monarchy, under the reign of Saul and then his own.',
    traits: ['Courageous', 'Worshipful', 'Loyal', 'Capable of serious failure', 'Repentant'],
    refs: ['1 Samuel 16-17', '2 Samuel 5-12', 'Psalm 51'],
    story: [
      'David was a shepherd boy when the prophet Samuel anointed him as the next king (1 Samuel 16). He later faced the Philistine champion Goliath, trusting in the LORD rather than in armour (1 Samuel 17).',
      'He entered Saul’s service, but Saul grew jealous and sought his life. David fled, yet twice spared Saul when he could have killed him (1 Samuel 24; 26). After Saul’s death David became king, first of Judah and then of all Israel, and made Jerusalem his capital (2 Samuel 2; 5).',
      'At the height of his reign David committed adultery with Bathsheba and arranged the death of her husband Uriah (2 Samuel 11). The prophet Nathan confronted him, and David confessed (2 Samuel 12). The consequences included trouble within his own family (2 Samuel 12:10-14; 15).',
    ],
    events: [
      { icon: '🛢️', title: 'Anointed as king', refs: ['1 Samuel 16:1-13'], text: 'Samuel goes to Jesse’s house and anoints the youngest son, who was out with the sheep.', significance: 'God looks beyond outward appearance (1 Samuel 16:7).' },
      { icon: '🪨', title: 'Facing Goliath', refs: ['1 Samuel 17'], text: 'David faces the Philistine champion with a sling and a stone and speaks of the LORD’s name as his confidence.', significance: 'The victory is credited to the LORD rather than to human strength.' },
      { icon: '🏔️', title: 'Sparing Saul', refs: ['1 Samuel 24:1-7'], text: 'In a cave David has the chance to kill Saul but chooses not to harm the LORD’s anointed.', significance: 'David waits for God’s timing instead of taking power by force.' },
      { icon: '👑', title: 'Becoming king', refs: ['2 Samuel 5:1-5'], text: 'The tribes of Israel come to David at Hebron and he is made king over all Israel.', significance: 'The promise of Samuel’s anointing is fulfilled after years of waiting.' },
      { icon: '⚠️', title: 'Sin and repentance', refs: ['2 Samuel 11', '2 Samuel 12:1-13', 'Psalm 51'], text: 'David’s sin with Bathsheba and against Uriah is exposed by Nathan, and David acknowledges his sin. Psalm 51 is traditionally connected with this event.', significance: 'Scripture records the failure honestly and shows both forgiveness and lasting consequences.' },
    ],
    victories: ['Trusted God in the face of Goliath', 'Refused to take Saul’s life', 'Led Israel and brought unity', 'Wrote many psalms of worship and honesty'],
    failures: ['Adultery with Bathsheba and the death of Uriah', 'Family conflict that followed (see 2 Samuel 13-18)'],
    lessons: ['Waiting on God’s timing is part of leadership.', 'A person of faith can still fall; honest repentance matters.', 'Sin has consequences even when it is forgiven.'],
    reflections: ['Where am I tempted to take control instead of waiting?', 'How do I respond when someone confronts my wrongdoing?', 'What would honest confession look like for me today?'],
    scenario: { situation: 'A coworker you dislike makes a mistake that would get them in serious trouble, and you could easily let it happen to benefit yourself. What do you do?',
      options: [
        { text: 'Let it happen. It is not my problem.', principle: 'David could have taken advantage of Saul but chose not to (1 Samuel 24:6). Scripture consistently calls for treating people with integrity even when we gain from their failure.', refs: ['1 Samuel 24:6', 'Proverbs 24:17'] },
        { text: 'Quietly help them fix it.', principle: 'This reflects Romans 12:17-21, which speaks of not repaying evil with evil and overcoming evil with good.', refs: ['Romans 12:17-21'] },
        { text: 'Report it honestly and without gloating.', principle: 'Honest accountability, delivered without delight in their downfall, fits Proverbs 24:17 and Ephesians 4:15.', refs: ['Proverbs 24:17', 'Ephesians 4:15'] },
      ] },
  },
  { id: 'joseph', name: 'Joseph', hue: 14, tagline: 'From the pit to the palace',
    intro: 'Joseph was the eleventh son of Jacob, sold into slavery by his brothers and later raised to a position of high authority in Egypt.',
    setting: 'The family of Jacob in Canaan, and then Egypt under Pharaoh.',
    traits: ['Faithful in hardship', 'Wise administrator', 'Willing to forgive'],
    refs: ['Genesis 37', 'Genesis 39-41', 'Genesis 45', 'Genesis 50:15-21'],
    story: [
      'Jacob favoured Joseph, and the brothers’ jealousy grew when Joseph told them his dreams. They sold him to traders who took him to Egypt (Genesis 37).',
      'In Egypt Joseph served in Potiphar’s house, was falsely accused, and was imprisoned. There he interpreted the dreams of two fellow prisoners (Genesis 39-40). Later he explained Pharaoh’s dreams, advised storing grain, and was made ruler under Pharaoh (Genesis 41).',
      'When famine came, Joseph’s brothers travelled to Egypt for food. After testing them, Joseph revealed himself and forgave them, saying that God had been at work through what happened (Genesis 42-45; 50:20).',
    ],
    events: [
      { icon: '🧥', title: 'Sold by his brothers', refs: ['Genesis 37:23-28'], text: 'Joseph is thrown into a pit and then sold to traders heading to Egypt.', significance: 'An act of jealousy becomes the beginning of a much larger story.' },
      { icon: '⛓️', title: 'Falsely accused', refs: ['Genesis 39:7-20'], text: 'Joseph refuses Potiphar’s wife and is accused and imprisoned.', significance: 'Doing right is not always rewarded immediately.' },
      { icon: '🌾', title: 'Ruler of Egypt', refs: ['Genesis 41:37-45'], text: 'After interpreting Pharaoh’s dreams, Joseph is placed over the land of Egypt.', significance: 'God’s faithfulness through long years of hardship.' },
      { icon: '🤝', title: 'Forgiving his brothers', refs: ['Genesis 45:1-8', 'Genesis 50:20'], text: 'Joseph reveals himself to his brothers and speaks of God’s purpose in what happened.', significance: 'Forgiveness does not deny the wrong, but sees God’s purpose beyond it.' },
    ],
    victories: ['Resisted temptation in Potiphar’s house', 'Served faithfully in prison', 'Managed Egypt’s resources wisely', 'Forgave his brothers'],
    failures: ['Scripture does not describe Joseph’s moral failures explicitly. It does record that his sharing of dreams stirred his brothers’ anger (Genesis 37:5-11) and that he tested his brothers before revealing himself (Genesis 42-44).'],
    lessons: ['Faithfulness in hard places matters even when no one notices.', 'God can bring good out of evil without excusing the evil.', 'Forgiveness can restore relationships.'],
    reflections: ['Where am I waiting in a “pit” or “prison” right now?', 'Who do I need to forgive?', 'How can I serve faithfully where I am?'],
    scenario: { situation: 'You were treated unfairly by a relative years ago, and now they come to you for help. What do you do?',
      options: [
        { text: 'Refuse. They do not deserve help.', principle: 'Joseph had the power to refuse but chose otherwise. Scripture warns against vengeance in Romans 12:19.', refs: ['Romans 12:19'] },
        { text: 'Help, but make them feel it.', principle: 'Joseph did test his brothers, yet he ultimately revealed himself with mercy (Genesis 45). Mercy is meant to be genuine, not a tool to humiliate.', refs: ['Genesis 45:1-8', 'Micah 6:8'] },
        { text: 'Help and openly forgive.', principle: 'This reflects the posture of Genesis 50:20-21 and Colossians 3:13.', refs: ['Genesis 50:20-21', 'Colossians 3:13'] },
      ] },
  },
  { id: 'esther', name: 'Esther', hue: 320, tagline: 'Courage for such a time',
    intro: 'Esther was a Jewish woman who became queen of Persia and risked her life to plead for her people.',
    setting: 'The Persian empire during the reign of King Ahasuerus (Xerxes).',
    traits: ['Courageous', 'Prudent', 'Willing to risk herself for others'],
    refs: ['Esther 2', 'Esther 4', 'Esther 7-9'],
    story: [
      'After Queen Vashti was removed, Esther was chosen as queen. Her cousin Mordecai advised her to keep her Jewish identity quiet (Esther 2).',
      'Haman, a high official, became enraged when Mordecai would not bow to him and secured a decree to destroy the Jews (Esther 3). Mordecai urged Esther to approach the king (Esther 4:13-14).',
      'Esther asked the Jews to fast, then went to the king uninvited, which carried risk (Esther 4:16). She exposed Haman’s plot, the decree was countered, and the feast of Purim marked the deliverance (Esther 7-9). The book of Esther is notable for never naming God directly, yet readers see His providence throughout.',
    ],
    events: [
      { icon: '👑', title: 'Made queen', refs: ['Esther 2:17'], text: 'Esther wins the king’s favour and becomes queen.', significance: 'She is placed in a position of influence.' },
      { icon: '📜', title: 'Haman’s decree', refs: ['Esther 3:8-13'], text: 'Haman persuades the king to issue a decree against the Jews.', significance: 'Introduces the threat that Esther will confront.' },
      { icon: '🕯️', title: 'For such a time as this', refs: ['Esther 4:13-16'], text: 'Mordecai challenges Esther; she asks for a fast and decides to go to the king.', significance: 'Courage involves counting the cost and acting anyway.' },
      { icon: '🍽️', title: 'The banquet and Haman’s fall', refs: ['Esther 7'], text: 'Esther reveals Haman’s plot at a banquet, and Haman is condemned.', significance: 'The threat is reversed through patient, careful action.' },
    ],
    victories: ['Risked her own life for her people', 'Acted wisely and patiently', 'Rallied others to fast and support her'],
    failures: ['At first Esther hesitated because of the danger (Esther 4:10-11). Scripture presents this as realistic fear rather than a condemned failure.'],
    lessons: ['Influence is a responsibility.', 'Courage often follows prayer and preparation.', 'God can work through ordinary providence.'],
    reflections: ['What position or influence do I have that could help someone else?', 'What risk am I avoiding that I should face?', 'Who can I ask to stand with me?'],
    scenario: { situation: 'You see a classmate being bullied, and speaking up could make you a target. What do you do?',
      options: [
        { text: 'Stay quiet to stay safe.', principle: 'Esther first felt this way (Esther 4:10-11), but Mordecai warned that silence was not safe or right (Esther 4:13-14). Proverbs 31:8-9 speaks of speaking up for others.', refs: ['Esther 4:10-14', 'Proverbs 31:8-9'] },
        { text: 'Speak up with a trusted friend or adult.', principle: 'Esther gathered support through the fast before acting (Esther 4:16). Seeking wise help is not weakness.', refs: ['Esther 4:16', 'Ecclesiastes 4:9-10'] },
        { text: 'Confront the bully alone and angrily.', principle: 'Esther acted with courage but also with careful planning (Esther 5; 7). Proverbs 15:1 reminds us that gentle responses carry weight.', refs: ['Proverbs 15:1', 'Esther 5:1-8'] },
      ] },
  },
  { id: 'ruth', name: 'Ruth', hue: 100, tagline: 'Loyalty and redemption',
    intro: 'Ruth was a Moabite woman who remained with her mother-in-law Naomi, came to Bethlehem, and became part of the family line leading to David.',
    setting: 'Moab and Bethlehem in the time of the judges.',
    traits: ['Loyal', 'Hardworking', 'Humble'],
    refs: ['Ruth 1-4', 'Matthew 1:5'],
    story: [
      'A famine drove Naomi’s family to Moab. There her husband and two sons died, leaving Naomi with her daughters-in-law (Ruth 1). Naomi decided to return to Bethlehem, and Ruth insisted on going with her (Ruth 1:16-17).',
      'In Bethlehem Ruth gathered leftover grain in the field of Boaz, a relative of Naomi’s late husband, who treated her kindly (Ruth 2). Following Naomi’s advice, Ruth approached Boaz at the threshing floor (Ruth 3).',
      'Boaz acted as a redeemer in the presence of the elders and married Ruth. Their son Obed became the grandfather of David (Ruth 4). Matthew 1:5 includes Ruth in the genealogy of Jesus.',
    ],
    events: [
      { icon: '🛤️', title: 'Staying with Naomi', refs: ['Ruth 1:16-17'], text: 'Ruth chooses to follow Naomi and Naomi’s God.', significance: 'A pledge of loyalty beyond what duty required.' },
      { icon: '🌾', title: 'Gleaning in the field', refs: ['Ruth 2:1-12'], text: 'Ruth gathers grain behind the harvesters and finds favour with Boaz.', significance: 'Provision comes through humble, steady work and through God’s law caring for the poor.' },
      { icon: '🤲', title: 'Redemption at the gate', refs: ['Ruth 4:1-10'], text: 'Boaz takes on the responsibility of redeeming the family’s land and marries Ruth.', significance: 'A picture of care that restores what was lost.' },
    ],
    victories: ['Showed steady loyalty', 'Worked faithfully to provide for Naomi', 'Became part of the line of David'],
    failures: ['Scripture records no explicit failure for Ruth. It does record Naomi’s bitterness after her loss (Ruth 1:20-21), which later turns to joy (Ruth 4:14-17).'],
    lessons: ['Faithfulness in ordinary work matters.', 'God’s care can come through other people.', 'Belonging in God’s family is open to outsiders.'],
    reflections: ['Who has shown me loyalty I should thank?', 'Whom could I stand with in a hard season?', 'How is God caring for me through ordinary people?'],
    scenario: { situation: 'A friend’s family is going through a long, difficult season and you could easily step back. What do you do?',
      options: [
        { text: 'Step back. It is too hard.', principle: 'Naomi urged Ruth to go back (Ruth 1:8-15), but Ruth stayed. Proverbs 17:17 describes a friend who loves at all times.', refs: ['Ruth 1:8-18', 'Proverbs 17:17'] },
        { text: 'Offer practical help regularly.', principle: 'Ruth’s loyalty was shown in daily work for Naomi’s needs (Ruth 2). Galatians 6:2 speaks of carrying one another’s burdens.', refs: ['Ruth 2:2-3', 'Galatians 6:2'] },
        { text: 'Send a message and leave it there.', principle: 'Kind words help, but Ruth’s example shows love expressed in action as well (compare 1 John 3:18).', refs: ['1 John 3:18'] },
      ] },
  },
  { id: 'daniel', name: 'Daniel', hue: 220, tagline: 'Faithful in a foreign land',
    intro: 'Daniel was taken as a young man from Judah to Babylon, where he served in the royal court while remaining faithful to God.',
    setting: 'The Babylonian and then Medo-Persian empires.',
    traits: ['Faithful', 'Wise', 'Prayerful'],
    refs: ['Daniel 1', 'Daniel 2', 'Daniel 6', 'Daniel 9'],
    story: [
      'Daniel and his companions were taken to Babylon and trained for the king’s service. Daniel chose not to defile himself with the king’s food and found a respectful way to ask for an alternative (Daniel 1).',
      'God enabled Daniel to explain Nebuchadnezzar’s dream, and Daniel gave the credit to God (Daniel 2). Later he interpreted the writing on the wall for Belshazzar (Daniel 5).',
      'Under Darius, officials who envied Daniel tricked the king into a decree against prayer. Daniel kept praying as he always had and was thrown into the lions’ den, from which God preserved him (Daniel 6). Daniel also prayed a prayer of confession for his people (Daniel 9).',
    ],
    events: [
      { icon: '🍽️', title: 'A respectful stand', refs: ['Daniel 1:8-16'], text: 'Daniel asks permission not to eat the king’s food and proposes a test.', significance: 'Convictions can be held firmly and expressed respectfully.' },
      { icon: '🌙', title: 'Giving God the credit', refs: ['Daniel 2:27-30'], text: 'Daniel tells the king that the interpretation comes from God and not from his own wisdom.', significance: 'Humility in the face of recognition.' },
      { icon: '🦁', title: 'The lions’ den', refs: ['Daniel 6:10', 'Daniel 6:16-23'], text: 'Daniel continues his habit of prayer despite the decree and is delivered.', significance: 'Faithfulness in private habits becomes public witness.' },
      { icon: '🙏', title: 'A prayer of confession', refs: ['Daniel 9:3-19'], text: 'Daniel confesses the sins of the people, including himself, and appeals to God’s mercy.', significance: 'Even a faithful person confesses and depends on mercy.' },
    ],
    victories: ['Held to his convictions respectfully', 'Gave credit to God', 'Remained faithful in prayer under pressure'],
    failures: ['Scripture does not record a specific moral failure of Daniel. Daniel 9:5 shows him including himself in confession (“we have sinned”).'],
    lessons: ['Daily habits prepare us for pressure.', 'Respectful firmness can be wiser than loud protest.', 'Humility keeps us pointed to God.'],
    reflections: ['Which of my daily habits would stand under pressure?', 'Where do I need to give God the credit?', 'How can I stand for my convictions respectfully?'],
    scenario: { situation: 'At work, you are asked to do something that conflicts with your convictions, but you do not want to cause a scene. What do you do?',
      options: [
        { text: 'Go along quietly.', principle: 'Daniel 1:8 says Daniel “purposed in his heart” not to defile himself. Peter said it is better to obey God than people (Acts 5:29).', refs: ['Daniel 1:8', 'Acts 5:29'] },
        { text: 'Respectfully explain and propose an alternative.', principle: 'This mirrors Daniel 1:8-14, where Daniel asked courteously and offered a test.', refs: ['Daniel 1:8-14', '1 Peter 3:15'] },
        { text: 'Publicly condemn everyone involved.', principle: 'Daniel’s approach was respectful (Daniel 1:8-12). Colossians 4:6 speaks of speech that is gracious.', refs: ['Colossians 4:6'] },
      ] },
  },
];

/* ---------- 2b. MORE HELPERS: storage keys, Bible text, actions ---------- */
const K = {
  quiz: 'photismos.quizResults', bookmarks: 'photismos.bookmarks', last: 'photismos.lastRead', size: 'photismos.fontSize',
  devo: 'photismos.devoDone', best: 'photismos.bestStreak', notes: 'photismos.notes', studies: 'photismos.studies',
  wisdom: 'photismos.wisdom', ch: 'photismos.challenges', mem: 'photismos.memory',
};

function fmtDate(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function today() { return fmtDate(new Date()); }
function dayOfYear(date = new Date()) {
  return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
}

// Streak rule: a day counts when you complete at least one devotional that day.
// The streak is the number of consecutive days ending today (or yesterday, if you
// have not finished today's yet). Missing a whole day resets the streak to 0.
function currentStreak() {
  const days = new Set(load(K.devo, []).map((d) => d.date));
  const d = new Date();
  if (!days.has(fmtDate(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(fmtDate(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function updateBestStreak() {
  const s = currentStreak();
  if (s > load(K.best, 0)) save(K.best, s);
}

function getNote(key) { return (load(K.notes, {})[key]) || ''; }
function setNote(key, value) { const n = load(K.notes, {}); n[key] = value; save(K.notes, n); }

/* Bible text source: bible-api.com (KJV, public domain). We fetch in the visitor's browser.
   If the service is down or offline, pages show a clear message instead of fake text. */
const bibleCache = {};
async function fetchPassage(ref) {
  if (bibleCache[ref]) return bibleCache[ref];
  const url = BIBLE_API + ref.trim().replace(/\s+/g, '+') + '?translation=kjv';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Passage not found');
  const data = await res.json();
  if (!data || !data.verses || !data.verses.length) throw new Error('Passage not found');
  bibleCache[ref] = data;
  return data;
}
function plainText(data) { return data.verses.map((v) => v.text.replace(/\s+/g, ' ').trim()).join(' '); }
function cachedQuote(ref) {
  const d = bibleCache[ref];
  return d ? `“${plainText(d)}” — ${ref} (KJV)` : `${ref} (KJV)`;
}

// Any element with class "verse-load" and a data-ref is filled in with the verse text.
async function showVerse(el) {
  const ref = el.dataset.ref;
  el.innerHTML = '<span class="muted">Loading ' + esc(ref) + '…</span>';
  try {
    const data = await fetchPassage(ref);
    const multi = data.verses.length > 1;
    const body = data.verses.map((v) => (multi ? `<sup>${v.verse}</sup> ` : '') + esc(v.text.replace(/\s+/g, ' ').trim())).join(' ');
    el.innerHTML = `<span class="vtext">“${body}”</span><div class="vsrc">${esc(ref)} · ${TRANSLATION}</div>`;
  } catch (e) {
    el.innerHTML = `<span class="muted">Could not load ${esc(ref)}. Check your internet connection.</span> <button type="button" class="btn btn-small" data-act="retry-verse" data-ref="${esc(ref)}">Try again</button>`;
  }
}
function hydrateVerses(root = document) { root.querySelectorAll('.verse-load[data-ref]').forEach(showVerse); }
function verseBox(ref) { return `<div class="verse-load" data-ref="${esc(ref)}"><span class="muted">Loading ${esc(ref)}…</span></div>`; }

// Event handling: buttons carry data-act="name"; forms carry data-submit; inputs data-note / data-filter.
const ACT = {};
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (el && ACT[el.dataset.act]) ACT[el.dataset.act](el, e);
});
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[role="button"][data-act]')) {
    e.preventDefault(); e.target.click();
  }
});
document.addEventListener('submit', (e) => {
  const f = e.target.closest('[data-submit]');
  if (f && ACT[f.dataset.submit]) { e.preventDefault(); ACT[f.dataset.submit](f, e); }
});
document.addEventListener('change', (e) => {
  const el = e.target.closest('[data-change]');
  if (el && ACT[el.dataset.change]) ACT[el.dataset.change](el, e);
});
document.addEventListener('input', (e) => {
  const el = e.target;
  if (el.dataset && el.dataset.note) {
    setNote(el.dataset.note, el.value);
    const m = el.parentElement.querySelector('.note-msg');
    if (m) m.textContent = 'Saved on this device.';
  }
  if (el.dataset && el.dataset.filter) {
    const q = el.value.trim().toLowerCase();
    document.querySelectorAll(el.dataset.filter).forEach((c) => { c.hidden = q && !c.dataset.search.includes(q); });
    const any = [...document.querySelectorAll(el.dataset.filter)].some((c) => !c.hidden);
    const empty = $('#filter-empty'); if (empty) empty.hidden = any;
  }
});
ACT['retry-verse'] = (el) => showVerse(el.closest('.verse-load'));

async function doShare(el, title, text) {
  const out = await shareText({ title, text, url: siteUrl() });
  const scope = el.closest('[data-share-scope]') || document;
  const msg = scope.querySelector('.share-msg');
  if (msg) msg.textContent = shareMessage(out);
}

/* ---------- 3b. ACHIEVEMENTS (computed from recorded activity, never granted by opening a page) ---------- */
function achievementList() {
  const devo = load(K.devo, []), studies = load(K.studies, []), quiz = load(K.quiz, []);
  const ch = load(K.ch, { unwrap: [], daily: [] }), mem = load(K.mem, { attempts: 0, correct: 0 });
  const marks = load(K.bookmarks, []);
  const challenges = (ch.unwrap || []).length + (ch.daily || []).length;
  return [
    { name: 'First Bread', text: 'Complete your first devotional.', earned: devo.length >= 1 },
    { name: 'Student of the Story', text: 'Finish a Biblical Chronicles study.', earned: studies.length >= 1 },
    { name: 'Quiz Taker', text: 'Complete a Bible trivia round.', earned: quiz.length >= 1 },
    { name: 'Three Days Strong', text: 'Reach a 3-day devotional streak.', earned: load(K.best, 0) >= 3 },
    { name: 'Challenge Seeker', text: 'Complete 5 daily challenges.', earned: challenges >= 5 },
    { name: 'Hidden in the Heart', text: 'Complete a Scripture memory exercise correctly.', earned: (mem.correct || 0) >= 1 },
    { name: 'Marked Passage', text: 'Bookmark a passage in The Word.', earned: marks.length >= 1 },
  ];
}

/* ---------- 3c. THE WORD: Bible reader and reference search ---------- */
const reader = { ref: '', book: 'John', chapter: 1, selected: new Set(), data: null, fromQuery: false };

function norm(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
function findBooks(q) {
  const n = norm(q);
  if (!n) return [];
  const exact = BOOKS.filter((b) => norm(b[0]) === n);
  if (exact.length) return exact.map((b) => b[0]);
  const alias = { psalm: 'Psalms', songofsongs: 'Song of Solomon', canticles: 'Song of Solomon', revelations: 'Revelation' };
  if (alias[n]) return [alias[n]];
  return BOOKS.filter((b) => norm(b[0]).startsWith(n) && n.length >= 2).map((b) => b[0]);
}
// Understands "John 3", "Romans 8:28", "1 Cor 13:4-7". Returns null when it is not a reference.
function parseRef(text) {
  const m = text.trim().match(/^((?:[1-3]\s*)?[A-Za-z][A-Za-z.\s]*?)\s*(\d+)(?::(\d+)(?:\s*-\s*(\d+))?)?$/);
  if (!m) return null;
  const books = findBooks(m[1].replace(/\./g, ''));
  if (books.length !== 1) return { ambiguous: books };
  const book = books[0], chapter = Number(m[2]);
  const max = BOOKS.find((b) => b[0] === book)[1];
  if (chapter < 1 || chapter > max) return { error: `${book} has ${max} chapter${max > 1 ? 's' : ''}.` };
  let ref = `${book} ${chapter}`;
  if (m[3]) ref += ':' + m[3] + (m[4] ? '-' + m[4] : '');
  return { book, chapter, ref };
}

function readerPage(query) {
  const last = load(K.last, { book: 'John', chapter: 1 });
  let target = last;
  reader.fromQuery = false;
  if (query.get('ref')) {
    const p = parseRef(query.get('ref'));
    if (p && p.ref) { target = { book: p.book, chapter: p.chapter, ref: p.ref }; reader.fromQuery = true; }
  }
  reader.book = target.book; reader.chapter = target.chapter;
  reader.ref = target.ref || `${target.book} ${target.chapter}`;
  reader.selected = new Set();

  const bookOpts = BOOKS.map((b) => `<option ${b[0] === reader.book ? 'selected' : ''}>${esc(b[0])}</option>`).join('');
  return `<div class="container">
    <div class="page-head"><p class="eyebrow">Section</p><h1>The Word</h1>
      <p class="muted">Read the Bible in the King James Version (public domain), search by reference, and test yourself with trivia.</p></div>
    <nav class="tabs" aria-label="The Word tools">
      <a class="tab active" href="#/the-word">Read &amp; search</a>
      <a class="tab" href="#/the-word/trivia">Bible Trivia</a>
    </nav>

    <div class="card" style="margin-bottom:16px">
      <form data-submit="search" class="search-form" role="search">
        <label for="search-q" class="sr">Search by reference or book</label>
        <input id="search-q" type="search" placeholder="Go to a passage, e.g. Romans 8:28 or Psalm 23" autocomplete="off" />
        <button class="btn btn-gold" type="submit">Go</button>
      </form>
      <div id="search-results" role="status" aria-live="polite"></div>
      <p class="muted small" style="margin:8px 0 0">Search works by Bible book and reference. Searching for a word or phrase inside the Bible needs a full-text Bible search service, which is not connected yet.</p>
    </div>

    <div class="card reader">
      <div class="reader-bar">
        <label class="sr" for="sel-book">Book</label>
        <select id="sel-book" data-change="pick-book">${bookOpts}</select>
        <label class="sr" for="sel-ch">Chapter</label>
        <select id="sel-ch" data-change="pick-chapter"></select>
        <div class="reader-size">
          <button type="button" class="icon-btn" data-act="font-down" aria-label="Smaller text">A−</button>
          <button type="button" class="icon-btn" data-act="font-up" aria-label="Larger text">A+</button>
        </div>
      </div>
      <h2 id="reader-title">${esc(reader.ref)}</h2>
      <div id="reader-text" class="reader-text" style="font-size:${load(K.size, 18)}px"></div>
      <div class="selection-bar" id="selection-bar" hidden>
        <span id="sel-count"></span>
        <button type="button" class="btn btn-small" data-act="copy-sel">Copy</button>
        <button type="button" class="btn btn-small" data-act="share-sel">Share</button>
        <button type="button" class="btn btn-small" data-act="clear-sel">Clear</button>
      </div>
      <p role="status" class="muted small" id="reader-msg" style="min-height:1.4em"></p>
      <div class="reader-nav">
        <button type="button" class="btn btn-small" data-act="prev-ch">← Previous chapter</button>
        <button type="button" class="btn btn-small" data-act="bookmark">☆ Bookmark this chapter</button>
        <button type="button" class="btn btn-small" data-act="return-place" id="return-place" ${reader.fromQuery ? '' : 'hidden'}>Return to my place</button>
        <button type="button" class="btn btn-small" data-act="next-ch">Next chapter →</button>
      </div>
      <p class="muted small" style="margin:12px 0 0">Tap a verse to select it, then copy or share. Scripture: ${TRANSLATION}, loaded from bible-api.com.</p>
    </div>

    <div class="card" style="margin-top:16px"><h3>Saved bookmarks</h3><div id="bookmark-list"></div></div>

    <div class="card" style="margin:16px 0 24px"><h3>Still planned for The Word</h3>
      <p class="muted" style="margin:0">Verse explanations (context, key words, cross-references) and Word of the Day. These need carefully reviewed commentary and are not built yet.</p></div>
  </div>`;
}

function fillChapterSelect() {
  const max = BOOKS.find((b) => b[0] === reader.book)[1];
  const sel = $('#sel-ch');
  sel.innerHTML = Array.from({ length: max }, (_, i) => `<option value="${i + 1}" ${i + 1 === reader.chapter ? 'selected' : ''}>Chapter ${i + 1}</option>`).join('');
}

async function loadReader() {
  const box = $('#reader-text');
  if (!box) return;
  const ref = reader.ref;
  $('#reader-title').textContent = ref;
  fillChapterSelect();
  $('#sel-book').value = reader.book;
  reader.selected = new Set(); updateSelectionBar();
  box.innerHTML = '<p class="muted">Loading…</p>';
  renderBookmarks();
  try {
    const data = await fetchPassage(ref);
    if (reader.ref !== ref) return; // the user moved on while loading
    reader.data = data;
    box.innerHTML = data.verses.map((v) =>
      `<span class="v" role="button" tabindex="0" data-act="pick-verse" data-v="${v.verse}"><sup>${v.verse}</sup>${esc(v.text.replace(/\s+/g, ' ').trim())} </span>`).join('');
  } catch (e) {
    box.innerHTML = `<p class="muted">Could not load ${esc(ref)}. Check your internet connection.</p><button type="button" class="btn btn-small" data-act="reload-reader">Try again</button>`;
  }
}
function goTo(book, chapter, remember = true) {
  reader.book = book; reader.chapter = chapter; reader.ref = `${book} ${chapter}`;
  if (remember) save(K.last, { book, chapter });
  reader.fromQuery = false;
  const rp = $('#return-place'); if (rp) rp.hidden = true;
  loadReader();
}
function renderBookmarks() {
  const list = $('#bookmark-list');
  if (!list) return;
  const marks = load(K.bookmarks, []);
  list.innerHTML = marks.length
    ? marks.map((r, i) => `<div class="bm"><span>${esc(r)}</span><span><button type="button" class="btn btn-small" data-act="open-bm" data-ref="${esc(r)}">Open</button> <button type="button" class="btn btn-small" data-act="del-bm" data-i="${i}" aria-label="Remove bookmark ${esc(r)}">Remove</button></span></div>`).join('')
    : '<p class="muted" style="margin:0">No bookmarks yet. Use “Bookmark this chapter” while reading. Saved on this device only.</p>';
  const btn = document.querySelector('[data-act="bookmark"]');
  if (btn) btn.textContent = marks.includes(`${reader.book} ${reader.chapter}`) ? '★ Bookmarked' : '☆ Bookmark this chapter';
}
function updateSelectionBar() {
  const bar = $('#selection-bar'); if (!bar) return;
  bar.hidden = reader.selected.size === 0;
  $('#sel-count').textContent = reader.selected.size + ' verse' + (reader.selected.size === 1 ? '' : 's') + ' selected';
}
function selectionText() {
  const nums = [...reader.selected].sort((a, b) => a - b);
  const lines = nums.map((n) => { const v = reader.data.verses.find((x) => x.verse === n); return v ? `${n}. ${v.text.replace(/\s+/g, ' ').trim()}` : ''; });
  return lines.join('\n') + `\n— ${reader.book} ${reader.chapter}:${nums.join(', ')} (KJV)`;
}

ACT['pick-book'] = (el) => goTo(el.value, 1);
ACT['pick-chapter'] = (el) => goTo(reader.book, Number(el.value));
ACT['prev-ch'] = () => {
  let i = BOOKS.findIndex((b) => b[0] === reader.book), c = reader.chapter - 1;
  if (c < 1) { if (i === 0) return; i--; c = BOOKS[i][1]; }
  goTo(BOOKS[i][0], c);
};
ACT['next-ch'] = () => {
  let i = BOOKS.findIndex((b) => b[0] === reader.book), c = reader.chapter + 1;
  if (c > BOOKS[i][1]) { if (i === BOOKS.length - 1) return; i++; c = 1; }
  goTo(BOOKS[i][0], c);
};
ACT['reload-reader'] = () => loadReader();
ACT['font-up'] = () => { const s = Math.min(30, load(K.size, 18) + 2); save(K.size, s); $('#reader-text').style.fontSize = s + 'px'; };
ACT['font-down'] = () => { const s = Math.max(14, load(K.size, 18) - 2); save(K.size, s); $('#reader-text').style.fontSize = s + 'px'; };
ACT['pick-verse'] = (el) => {
  const n = Number(el.dataset.v);
  if (reader.selected.has(n)) reader.selected.delete(n); else reader.selected.add(n);
  el.classList.toggle('sel', reader.selected.has(n));
  updateSelectionBar();
};
ACT['clear-sel'] = () => { reader.selected.clear(); document.querySelectorAll('.v.sel').forEach((v) => v.classList.remove('sel')); updateSelectionBar(); };
ACT['copy-sel'] = async () => {
  try { await navigator.clipboard.writeText(selectionText()); $('#reader-msg').textContent = 'Copied to your clipboard.'; }
  catch (e) { $('#reader-msg').textContent = 'Copying is not available here.'; }
};
ACT['share-sel'] = async () => {
  const out = await shareText({ title: 'PHOTISMOS', text: selectionText() + '\nPHOTISMOS · Illuminated by the Word.', url: siteUrl() });
  $('#reader-msg').textContent = shareMessage(out);
};
ACT.bookmark = () => {
  const ref = `${reader.book} ${reader.chapter}`;
  let marks = load(K.bookmarks, []);
  marks = marks.includes(ref) ? marks.filter((m) => m !== ref) : [...marks, ref];
  save(K.bookmarks, marks); renderBookmarks();
};
ACT['open-bm'] = (el) => { location.hash = '#/the-word?ref=' + encodeURIComponent(el.dataset.ref); };
ACT['del-bm'] = (el) => { const m = load(K.bookmarks, []); m.splice(Number(el.dataset.i), 1); save(K.bookmarks, m); renderBookmarks(); };
ACT['return-place'] = () => { const l = load(K.last, { book: 'John', chapter: 1 }); goTo(l.book, l.chapter, false); };
ACT.search = (form) => {
  const q = $('#search-q').value.trim();
  const out = $('#search-results');
  if (!q) { out.innerHTML = '<p class="muted">Type a reference such as “John 3:16” or a book name.</p>'; return; }
  const p = parseRef(q);
  if (p && p.ref) { out.innerHTML = ''; location.hash = '#/the-word?ref=' + encodeURIComponent(p.ref); return; }
  if (p && p.error) { out.innerHTML = `<p class="muted">${esc(p.error)}</p>`; return; }
  const books = p && p.ambiguous ? p.ambiguous : findBooks(q);
  if (books.length) {
    out.innerHTML = '<p class="muted">Matching books:</p><div class="chips">' +
      books.map((b) => `<button type="button" class="chip" data-act="open-bm" data-ref="${esc(b)} 1">${esc(b)}</button>`).join('') + '</div>';
  } else {
    out.innerHTML = '<p class="muted">No book or reference matched. Searching for words inside the Bible is not available yet; try a reference like “Psalm 23”.</p>';
  }
};

/* ---------- 3d. THE BIBLICAL CHRONICLES ---------- */
function portrait(c) {
  const h = c.hue;
  return `<svg class="portrait" viewBox="0 0 200 240" role="img" aria-label="Artistic emblem for ${esc(c.name)}">
    <defs>
      <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${h},45%,30%)"/><stop offset="1" stop-color="#0b1530"/></linearGradient>
      <radialGradient id="halo"><stop offset="0" stop-color="#e3c476" stop-opacity=".55"/><stop offset="1" stop-color="#e3c476" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="200" height="240" rx="14" fill="url(#pg)"/>
    <circle cx="100" cy="92" r="72" fill="url(#halo)"/>
    <path d="M30 240c0-52 30-80 70-80s70 28 70 80z" fill="hsl(${h},35%,38%)" stroke="#c9a24b" stroke-width="2"/>
    <circle cx="100" cy="92" r="34" fill="#e8d3ad" stroke="#c9a24b" stroke-width="2"/>
    <path d="M64 88c2-30 20-44 36-44s34 14 36 44c-8-14-20-20-36-20s-28 6-36 20z" fill="hsl(${h},30%,22%)"/>
  </svg>`;
}

function chroniclesPage() {
  const done = load(K.studies, []).map((s) => s.id);
  const cards = CHARACTERS.map((c) => `
    <a class="card tile" href="#/chronicles/${c.id}" data-search="${esc((c.name + ' ' + c.tagline + ' ' + c.intro).toLowerCase())}">
      <div class="tile-top"><h3>${esc(c.name)}</h3>${done.includes(c.id) ? '<span class="badge badge-live">Completed</span>' : ''}</div>
      <p>${esc(c.tagline)}</p>
    </a>`).join('');
  return `<div class="container">
    <div class="page-head"><p class="eyebrow">Section</p><h1>The Biblical Chronicles</h1>
      <p class="muted">Explore biblical personalities through their story, events, victories, failures and lessons. ${CHARACTERS.length} studies are ready. More people (Jesus Christ, Abraham, Moses, Nehemiah, Peter, Paul) are still to be written.</p></div>
    <div class="card" style="margin-bottom:16px">
      <label for="char-filter" class="sr">Search characters</label>
      <input id="char-filter" type="search" placeholder="Search characters…" data-filter=".grid .tile" autocomplete="off" />
    </div>
    <div class="grid section" style="padding-top:8px">${cards}</div>
    <p id="filter-empty" class="muted" hidden>No characters match your search.</p>
  </div>`;
}

function characterPage(id) {
  const c = CHARACTERS.find((x) => x.id === id);
  if (!c) return notFoundPage();
  const done = load(K.studies, []).some((s) => s.id === id);
  const events = c.events.map((e, i) => `
    <li class="event">
      <div class="event-icon" aria-hidden="true">${e.icon}</div>
      <div><h3>${i + 1}. ${esc(e.title)}</h3>
        <p>${esc(e.text)}</p>
        <p class="muted small">Read: ${esc(e.refs.join('; '))}</p>
        <p class="sig"><strong>Why it matters:</strong> ${esc(e.significance)}</p></div>
    </li>`).join('');
  const list = (arr) => `<ul class="status-list">${arr.map((x) => `<li><span aria-hidden="true">•</span><span>${esc(x)}</span></li>`).join('')}</ul>`;
  const scen = c.scenario.options.map((o, i) => `
    <div class="scn">
      <button type="button" class="option" data-act="scenario" data-i="${i}"><span>${String.fromCharCode(65 + i)}.</span><span>${esc(o.text)}</span></button>
      <div class="feedback scn-reveal" hidden><strong>Principle to consider:</strong> ${esc(o.principle)}<div class="muted small">See: ${esc(o.refs.join('; '))}</div></div>
    </div>`).join('');

  return `<div class="container" data-share-scope>
    <p style="margin:24px 0 0"><a href="#/chronicles">← All characters</a></p>
    <div class="char-head">
      <div>${portrait(c)}<p class="muted small" style="max-width:200px">Artistic emblem only. It is not a likeness; Scripture does not describe what ${esc(c.name)} looked like.</p></div>
      <div>
        <p class="eyebrow">Biblical Chronicles</p><h1>${esc(c.name)}</h1>
        <p class="lead2">${esc(c.tagline)}</p>
        <p>${esc(c.intro)}</p>
        <p><strong>Setting:</strong> ${esc(c.setting)}</p>
        <div class="chips">${c.traits.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <p class="muted small" style="margin-top:12px">Main readings: ${esc(c.refs.join('; '))}</p>
      </div>
    </div>

    <section class="card section-card"><h2>The story</h2>${c.story.map((p) => `<p>${esc(p)}</p>`).join('')}
      <p class="muted small">This summary follows the Bible text and is our own wording. Read the passages listed for the full account.</p></section>

    <section class="card section-card"><h2>Key events in order</h2><ol class="timeline">${events}</ol>
      <p class="muted small">Event icons are simple decorative symbols. Full illustrations are still planned.</p></section>

    <section class="grid2 section-card">
      <div class="card"><h2>Victories</h2>${list(c.victories)}</div>
      <div class="card"><h2>Failures and struggles</h2>${list(c.failures)}</div>
    </section>

    <section class="card section-card"><h2>Lessons for modern life</h2>${list(c.lessons)}</section>
    <section class="card section-card"><h2>Reflection questions</h2>${list(c.reflections)}</section>

    <section class="card section-card"><h2>A Day in Their Shoes</h2>
      <p class="muted">A reflection exercise, not a Bible account. It does not claim what ${esc(c.name)} would have done in a modern situation; it points to principles from Scripture.</p>
      <p><strong>${esc(c.scenario.situation)}</strong></p>${scen}</section>

    <section class="card section-card"><h2>Your study</h2>
      <label for="study-note"><strong>Private notes</strong> (saved on this device only)</label>
      <div><textarea id="study-note" rows="4" data-note="study:${id}" placeholder="What stood out to you?">${esc(getNote('study:' + id))}</textarea><span class="note-msg muted small"></span></div>
      <div class="hero-actions" style="justify-content:flex-start;margin-top:12px">
        <button type="button" class="btn btn-gold" data-act="study-done" data-id="${id}">${done ? '✓ Completed (tap to undo)' : 'Mark study as completed'}</button>
        <button type="button" class="btn" data-act="share-study" data-id="${id}">Share this study</button>
      </div>
      <p role="status" class="muted share-msg"></p>
      <p class="muted small">Your notes are never shared unless you copy them yourself.</p>
    </section>
  </div>`;
}
ACT.scenario = (el) => {
  const box = el.closest('.card');
  box.querySelectorAll('.scn-reveal').forEach((r) => { r.hidden = false; });
  box.querySelectorAll('.scn .option').forEach((b) => { b.disabled = true; b.classList.remove('picked'); });
  el.classList.add('picked');
};
ACT['study-done'] = (el) => {
  let s = load(K.studies, []);
  s = s.some((x) => x.id === el.dataset.id) ? s.filter((x) => x.id !== el.dataset.id) : [...s, { id: el.dataset.id, date: today() }];
  save(K.studies, s);
  el.textContent = s.some((x) => x.id === el.dataset.id) ? '✓ Completed (tap to undo)' : 'Mark study as completed';
};
ACT['share-study'] = (el) => {
  const c = CHARACTERS.find((x) => x.id === el.dataset.id);
  doShare(el, 'PHOTISMOS', `I studied ${c.name} on PHOTISMOS: ${c.tagline}.\nMain readings: ${c.refs.join('; ')}\nPHOTISMOS · Illuminated by the Word.`);
};

/* ---------- 3e. CHOKMAH ---------- */
function chokmahPage(query) {
  const todayI = dayOfYear() % WISDOM.length;
  let i = query.get('i') !== null ? Number(query.get('i')) : todayI;
  if (!(i >= 0 && i < WISDOM.length)) i = todayI;
  const w = WISDOM[i];
  const st = load(K.wisdom, { done: [], saved: [] });
  return `<div class="container" data-share-scope>
    <div class="page-head"><p class="eyebrow">Solomon’s Daily Wisdom</p><h1>CHOKMAH</h1>
      <p class="muted"><span lang="he">חָכְמָה</span> (chokmah) is the Hebrew word for wisdom. A new entry appears each day, chosen by the date. Entry ${i + 1} of ${WISDOM.length}${i === todayI ? ' · today’s entry' : ''}.</p></div>
    <div class="parchment-card">
      <p class="eyebrow" style="color:var(--bronze)">${esc(w.theme)}</p>
      <h2>${esc(w.title)}</h2>
      <div class="verse-big">${verseBox(w.ref)}</div>
      <h3>The principle</h3><p>${esc(w.explanation)}</p>
      <h3>In real life</h3><p>${esc(w.application)}</p>
      <h3>Today’s action</h3><p>${esc(w.action)}</p>
      <h3>Reflect</h3><p><em>${esc(w.reflection)}</em></p>
      <label for="w-note"><strong>My private reflection</strong> (saved on this device only)</label>
      <div><textarea id="w-note" rows="3" data-note="wisdom:${w.id}" placeholder="Write your thoughts…">${esc(getNote('wisdom:' + w.id))}</textarea><span class="note-msg small"></span></div>
      <div class="verse-actions">
        <button type="button" class="btn btn-gold btn-small" data-act="w-done" data-id="${w.id}">${st.done.includes(w.id) ? '✓ Challenge done (tap to undo)' : 'I did today’s action'}</button>
        <button type="button" class="btn btn-small" data-act="w-save" data-id="${w.id}">${st.saved.includes(w.id) ? '★ Saved' : '☆ Save entry'}</button>
        <button type="button" class="btn btn-small" data-act="w-share" data-id="${w.id}">Share card</button>
      </div>
      <p role="status" class="share-msg" style="margin:10px 0 0;font-size:.85rem"></p>
    </div>
    <div class="reader-nav" style="margin:16px 0 24px">
      <a class="btn btn-small" href="#/chokmah?i=${(i - 1 + WISDOM.length) % WISDOM.length}">← Previous</a>
      <a class="btn btn-small" href="#/chokmah">Today</a>
      <a class="btn btn-small" href="#/chokmah?i=${(i + 1) % WISDOM.length}">Next →</a>
    </div>
  </div>`;
}
ACT['w-done'] = (el) => {
  const st = load(K.wisdom, { done: [], saved: [] });
  st.done = st.done.includes(el.dataset.id) ? st.done.filter((x) => x !== el.dataset.id) : [...st.done, el.dataset.id];
  save(K.wisdom, st);
  el.textContent = st.done.includes(el.dataset.id) ? '✓ Challenge done (tap to undo)' : 'I did today’s action';
};
ACT['w-save'] = (el) => {
  const st = load(K.wisdom, { done: [], saved: [] });
  st.saved = st.saved.includes(el.dataset.id) ? st.saved.filter((x) => x !== el.dataset.id) : [...st.saved, el.dataset.id];
  save(K.wisdom, st);
  el.textContent = st.saved.includes(el.dataset.id) ? '★ Saved' : '☆ Save entry';
};
ACT['w-share'] = (el) => {
  const w = WISDOM.find((x) => x.id === el.dataset.id);
  doShare(el, 'PHOTISMOS CHOKMAH', `${w.title}\n${cachedQuote(w.ref)}\n${w.explanation}\nToday’s action: ${w.action}\nPHOTISMOS · CHOKMAH · Illuminated by the Word.`);
};

/* ---------- 3f. MY DAILY BREAD ---------- */
function dailyBreadPage(query) {
  const todayI = dayOfYear() % DEVOTIONALS.length;
  let i = query.get('i') !== null ? Number(query.get('i')) : todayI;
  if (!(i >= 0 && i < DEVOTIONALS.length)) i = todayI;
  const d = DEVOTIONALS[i];
  const doneToday = load(K.devo, []).some((x) => x.id === d.id && x.date === today());
  const dateLabel = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return `<div class="container" data-share-scope>
    <div class="page-head"><p class="eyebrow">Daily devotional</p><h1>MY DAILY BREAD</h1>
      <p class="muted">${i === todayI ? 'Today’s devotional' : 'Devotional ' + (i + 1) + ' of ' + DEVOTIONALS.length} · ${esc(dateLabel)}</p></div>
    <div class="card" style="margin-bottom:16px"><div class="stats">
      <div class="stat"><strong>${currentStreak()}</strong><span>Day streak</span></div>
      <div class="stat"><strong>${load(K.devo, []).length}</strong><span>Devotionals completed</span></div></div>
      <p class="muted small" style="margin:10px 0 0">Streak rule: a day counts when you complete a devotional. The streak is the run of consecutive days; if you miss a whole day it starts again from zero.</p></div>
    <article class="parchment-card">
      <h2>${esc(d.title)}</h2>
      <p class="eyebrow" style="color:var(--bronze)">${esc(d.ref)}</p>
      <div class="verse-big">${verseBox(d.ref)}</div>
      <h3>Reflection</h3><p>${esc(d.reflection)}</p>
      <h3>Main lesson</h3><p>${esc(d.lesson)}</p>
      <h3>Practical application</h3><p>${esc(d.application)}</p>
      <h3>Prayer</h3><p><em>${esc(d.prayer)}</em></p>
      <label for="devo-note"><strong>My journal</strong> (private, saved on this device only)</label>
      <div><textarea id="devo-note" rows="4" data-note="devo:${d.id}" placeholder="Write what God is showing you…">${esc(getNote('devo:' + d.id))}</textarea><span class="note-msg small"></span></div>
      <div class="verse-actions">
        <button type="button" class="btn btn-gold" data-act="devo-done" data-id="${d.id}">${doneToday ? '✓ Completed today (tap to undo)' : 'Mark as completed'}</button>
        <button type="button" class="btn" data-act="devo-share" data-id="${d.id}">Share</button>
      </div>
      <p role="status" class="share-msg" style="margin:10px 0 0;font-size:.85rem"></p>
      <p class="muted small" style="margin:0">Sharing sends only the title, verse and lesson. Your journal is never shared.</p>
    </article>
    <div class="reader-nav" style="margin:16px 0 24px">
      <a class="btn btn-small" href="#/daily-bread?i=${(i - 1 + DEVOTIONALS.length) % DEVOTIONALS.length}">← Previous</a>
      <a class="btn btn-small" href="#/daily-bread">Today</a>
      <a class="btn btn-small" href="#/daily-bread?i=${(i + 1) % DEVOTIONALS.length}">Next →</a>
    </div>
  </div>`;
}
ACT['devo-done'] = (el) => {
  let list = load(K.devo, []);
  const has = list.some((x) => x.id === el.dataset.id && x.date === today());
  list = has ? list.filter((x) => !(x.id === el.dataset.id && x.date === today())) : [...list, { id: el.dataset.id, date: today() }];
  save(K.devo, list); updateBestStreak();
  el.textContent = has ? 'Mark as completed' : '✓ Completed today (tap to undo)';
  const stat = document.querySelector('.stat strong'); if (stat) stat.textContent = currentStreak();
};
ACT['devo-share'] = (el) => {
  const d = DEVOTIONALS.find((x) => x.id === el.dataset.id);
  doShare(el, 'PHOTISMOS', `${d.title}\n${cachedQuote(d.ref)}\nLesson: ${d.lesson}\nPHOTISMOS · My Daily Bread · Illuminated by the Word.`);
};

/* ---------- 3g. COLOUR SYMBOLS ---------- */
function coloursPage() {
  const cards = COLOURS.map((c) => `
    <a class="card tile" href="#/colour-symbols/${c.id}" data-search="${esc((c.name + ' ' + c.overview).toLowerCase())}">
      <div class="swatch" style="background:${c.hex}"></div>
      <h3>${esc(c.name)}</h3><p>${esc(c.overview)}</p></a>`).join('');
  return `<div class="container">
    <div class="page-head"><p class="eyebrow">Section</p><h1>Colour Symbols</h1>
      <p class="muted">Study how colours appear in Scripture. Each page separates what the text says from interpretation, because a colour does not carry one fixed meaning everywhere.</p></div>
    <div class="card" style="margin-bottom:16px"><label for="col-filter" class="sr">Search colours</label>
      <input id="col-filter" type="search" placeholder="Search colours…" data-filter=".grid .tile" autocomplete="off" /></div>
    <div class="grid section" style="padding-top:8px">${cards}</div>
    <p id="filter-empty" class="muted" hidden>No colours match your search.</p>
  </div>`;
}
function colourPage(id) {
  const c = COLOURS.find((x) => x.id === id);
  if (!c) return notFoundPage();
  const block = (title, cls, text) => `<div class="kind ${cls}"><h3>${title}</h3><p>${esc(text)}</p></div>`;
  return `<div class="container" data-share-scope>
    <p style="margin:24px 0 0"><a href="#/colour-symbols">← All colours</a></p>
    <div class="colour-hero" style="background:linear-gradient(135deg, ${c.hex}, #0b1530)"><h1>${esc(c.name)}</h1></div>
    <section class="card section-card"><h2>Overview</h2><p>${esc(c.overview)}</p></section>
    <section class="card section-card"><h2>Biblical symbolism</h2>
      <p class="muted small">Four labelled layers, from strongest to weakest support.</p>
      ${block('1. What the Bible says explicitly', 'k1', c.explicit)}
      ${block('2. Associations supported by passages', 'k2', c.supported)}
      ${block('3. Historical or cultural context', 'k3', c.cultural)}
      ${block('4. Plausible but not stated (debated)', 'k4', c.plausible)}
    </section>
    <section class="card section-card"><h2>Bible references</h2>
      ${c.refs.map((r) => `<div class="refrow"><strong>${esc(r)}</strong>${verseBox(r)}</div>`).join('')}</section>
    <section class="card section-card"><h2>Examples in context</h2><p>${esc(c.examples)}</p></section>
    <section class="card section-card"><h2>Reflect and study</h2><p><em>${esc(c.reflection)}</em></p>
      <button type="button" class="btn" data-act="share-colour" data-id="${c.id}">Share colour card</button>
      <p role="status" class="muted share-msg"></p></section>
  </div>`;
}
ACT['share-colour'] = (el) => {
  const c = COLOURS.find((x) => x.id === el.dataset.id);
  doShare(el, 'PHOTISMOS Colour Symbols', `${c.name} in Scripture\n${c.overview}\nStudy: ${c.refs.slice(0, 2).join('; ')} (KJV)\nPHOTISMOS · Colour Symbols · Illuminated by the Word.`);
};

/* ---------- 3h. DAILY CHALLENGES ---------- */
function seededScramble(word, seed) {
  const letters = word.split('');
  let s = seed * 9301 + 49297;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let tries = 0; tries < 20; tries++) {
    for (let i = letters.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [letters[i], letters[j]] = [letters[j], letters[i]]; }
    if (letters.join('') !== word) break;
  }
  return letters;
}
const challenge = { puzzle: null, memory: { ref: MEMORY_VERSES[0], mode: 'missing', data: null } };

function challengesPage() {
  const p = UNWRAP[dayOfYear() % UNWRAP.length];
  challenge.puzzle = p;
  const ch = load(K.ch, { unwrap: [], daily: [] });
  const solved = ch.unwrap.includes(today());
  const q = QUESTIONS[dayOfYear() % QUESTIONS.length];
  const answered = ch.daily.find((d) => d.date === today());
  const letters = seededScramble(p.answer, dayOfYear());
  const ach = achievementList();

  return `<div class="container" data-share-scope>
    <div class="page-head"><p class="eyebrow">Section</p><h1>Daily Challenges</h1>
      <p class="muted">Short activities that change each day. Results are saved on this device.</p></div>

    <section class="card section-card"><h2>Unwrap the Word</h2>
      <p>Unscramble the letters to reveal today’s anchor word.</p>
      <p class="clue"><strong>Clue:</strong> ${esc(p.clue)}</p>
      <div class="tiles" aria-label="Scrambled letters">${letters.map((l) => `<span class="letter">${l}</span>`).join('')}</div>
      <form data-submit="unwrap-check" class="search-form" id="unwrap-form" ${solved ? 'hidden' : ''}>
        <label for="unwrap-in" class="sr">Your answer</label>
        <input id="unwrap-in" autocomplete="off" maxlength="${p.answer.length + 2}" placeholder="${p.answer.length} letters" />
        <button class="btn btn-gold" type="submit">Check</button>
        <button type="button" class="btn" data-act="unwrap-hint">Hint</button>
      </form>
      <p role="status" id="unwrap-msg" class="muted"></p>
      <div id="unwrap-reveal" ${solved ? '' : 'hidden'}>${solved ? unwrapReveal(p) : ''}</div>
    </section>

    <section class="card section-card"><h2>Daily Bible question</h2>
      <p><strong>${esc(q.question)}</strong></p>
      <div class="options" id="daily-q">${q.options.map((o, i) => {
        let cls = 'option', mark = '';
        if (answered) { if (i === q.correctIndex) { cls += ' correct'; mark = '✓ Correct'; } else if (i === answered.chosen) { cls += ' wrong'; mark = '✗ Your answer'; } }
        return `<button type="button" class="${cls}" data-act="daily-pick" data-i="${i}" ${answered ? 'disabled' : ''}><span>${String.fromCharCode(65 + i)}.</span><span>${esc(o)}</span><span class="mark">${mark}</span></button>`;
      }).join('')}</div>
      <div id="daily-fb" role="status" aria-live="polite">${answered ? dailyFeedback(q, answered.chosen === q.correctIndex) : ''}</div>
    </section>

    <section class="card section-card"><h2>Scripture memory trainer</h2>
      <p class="muted">Choose a verse and an exercise. The verse text is loaded in KJV.</p>
      <div class="search-form">
        <label for="mem-verse" class="sr">Verse</label>
        <select id="mem-verse" data-change="mem-verse">${MEMORY_VERSES.map((r) => `<option>${esc(r)}</option>`).join('')}</select>
        <label for="mem-mode" class="sr">Exercise</label>
        <select id="mem-mode" data-change="mem-mode">
          <option value="missing">Missing words</option><option value="arrange">Arrange the words</option><option value="match">Reference matching</option></select>
      </div>
      <div id="mem-area" class="mem-area"><p class="muted">Loading…</p></div>
    </section>

    <section class="card section-card"><h2>Achievements</h2>
      <p class="muted small">Earned only from activity recorded on this device.</p>
      <div class="grid">${ach.map((a) => `<div class="card ach ${a.earned ? 'earned' : ''}"><strong>${a.earned ? '🏅 ' : '🔒 '}${esc(a.name)}</strong><p class="muted small" style="margin:4px 0 0">${esc(a.text)}</p></div>`).join('')}</div>
    </section>
    <p class="muted small" style="margin-bottom:24px">Note: this simple version checks answers in your browser, so it is meant for learning rather than for competitions.</p>
  </div>`;
}
function unwrapReveal(p) {
  return `<div class="feedback good"><strong>The word is ${p.answer}.</strong></div>
    ${verseBox(p.ref)}
    <p>${esc(p.explanation)}</p>
    <p><strong>Reflect:</strong> <em>${esc(p.reflection)}</em></p>
    <p><strong>Today’s challenge:</strong> ${esc(p.challenge)}</p>
    <button type="button" class="btn btn-small" data-act="share-unwrap">Share result</button>
    <span role="status" class="muted share-msg"></span>`;
}
function dailyFeedback(q, correct) {
  return `<div class="feedback ${correct ? 'good' : 'bad'}"><strong>${correct ? 'Correct!' : 'Not quite.'}</strong> ${esc(q.explanation)}<div class="muted">Reference: ${esc(q.reference)}</div></div>`;
}
ACT['unwrap-check'] = () => {
  const p = challenge.puzzle;
  const guess = $('#unwrap-in').value.trim().toUpperCase();
  const msg = $('#unwrap-msg');
  if (!guess) { msg.textContent = 'Type your answer first.'; return; }
  if (guess !== p.answer) { msg.textContent = 'Not quite. Try again, or tap Hint.'; return; }
  const ch = load(K.ch, { unwrap: [], daily: [] });
  if (!ch.unwrap.includes(today())) { ch.unwrap.push(today()); save(K.ch, ch); }
  msg.textContent = '';
  $('#unwrap-form').hidden = true;
  const box = $('#unwrap-reveal'); box.hidden = false; box.innerHTML = unwrapReveal(p);
  hydrateVerses(box);
};
ACT['unwrap-hint'] = () => { $('#unwrap-msg').textContent = `Hint: it has ${challenge.puzzle.answer.length} letters and starts with “${challenge.puzzle.answer[0]}”.`; };
ACT['share-unwrap'] = (el) => {
  const p = challenge.puzzle;
  doShare(el, 'PHOTISMOS', `I unwrapped today’s word on PHOTISMOS: ${p.answer} (${p.ref}).\nPHOTISMOS · Illuminated by the Word.`);
};
ACT['daily-pick'] = (el) => {
  const q = QUESTIONS[dayOfYear() % QUESTIONS.length];
  const ch = load(K.ch, { unwrap: [], daily: [] });
  if (ch.daily.find((d) => d.date === today())) return;
  const chosen = Number(el.dataset.i);
  ch.daily.push({ date: today(), chosen, correct: chosen === q.correctIndex });
  save(K.ch, ch);
  document.querySelectorAll('#daily-q .option').forEach((b, i) => {
    b.disabled = true;
    if (i === q.correctIndex) { b.classList.add('correct'); b.querySelector('.mark').textContent = '✓ Correct'; }
    else if (i === chosen) { b.classList.add('wrong'); b.querySelector('.mark').textContent = '✗ Your answer'; }
  });
  $('#daily-fb').innerHTML = dailyFeedback(q, chosen === q.correctIndex);
};

// Scripture memory trainer
const cleanWord = (w) => w.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
function recordMemory(ok) {
  const m = load(K.mem, { attempts: 0, correct: 0 });
  m.attempts++; if (ok) m.correct++;
  save(K.mem, m);
}
async function loadMemory() {
  const area = $('#mem-area'); if (!area) return;
  const st = challenge.memory;
  area.innerHTML = '<p class="muted">Loading…</p>';
  try {
    st.data = await fetchPassage(st.ref);
    renderMemory();
  } catch (e) {
    area.innerHTML = `<p class="muted">Could not load ${esc(st.ref)}. Check your internet connection.</p><button type="button" class="btn btn-small" data-act="mem-retry">Try again</button>`;
  }
}
ACT['mem-retry'] = loadMemory;
ACT['mem-verse'] = (el) => { challenge.memory.ref = el.value; loadMemory(); };
ACT['mem-mode'] = (el) => { challenge.memory.mode = el.value; if (challenge.memory.data) renderMemory(); };
function renderMemory() {
  const st = challenge.memory, area = $('#mem-area');
  const words = plainText(st.data).split(/\s+/);
  if (st.mode === 'missing') {
    const cands = words.map((w, i) => [w, i]).filter(([w]) => cleanWord(w).length >= 4);
    const pick = [];
    const step = Math.max(1, Math.floor(cands.length / Math.min(4, cands.length)));
    for (let i = 0; i < cands.length && pick.length < 4; i += step) pick.push(cands[i][1]);
    st.blanks = pick;
    area.innerHTML = `<p>Fill in the missing words.</p><div class="cloze">${words.map((w, i) =>
      pick.includes(i) ? `<input class="blank" data-i="${i}" size="${Math.max(4, cleanWord(w).length)}" aria-label="Missing word ${pick.indexOf(i) + 1}" autocomplete="off" />` : esc(w)).join(' ')}</div>
      <p><button type="button" class="btn btn-gold btn-small" data-act="mem-check-missing">Check</button></p>
      <div role="status" id="mem-fb"></div>`;
  } else if (st.mode === 'arrange') {
    st.words = words; st.built = [];
    st.pool = shuffle(words.map((w, i) => ({ w, i })));
    drawArrange();
  } else {
    const others = shuffle(MEMORY_VERSES.filter((r) => r !== st.ref)).slice(0, 3);
    const opts = shuffle([st.ref, ...others]);
    area.innerHTML = `<p>Which reference is this verse from?</p><blockquote class="vtext">“${esc(words.join(' '))}”</blockquote>
      <div class="options">${opts.map((o) => `<button type="button" class="option" data-act="mem-match" data-ref="${esc(o)}"><span>${esc(o)}</span><span class="mark"></span></button>`).join('')}</div>
      <div role="status" id="mem-fb"></div>`;
  }
}
ACT['mem-check-missing'] = () => {
  const st = challenge.memory;
  const words = plainText(st.data).split(/\s+/);
  let right = 0;
  document.querySelectorAll('.blank').forEach((inp) => {
    const ok = cleanWord(inp.value) === cleanWord(words[Number(inp.dataset.i)]);
    inp.classList.toggle('ok', ok); inp.classList.toggle('bad', !ok);
    if (ok) right++;
  });
  const all = right === st.blanks.length;
  recordMemory(all);
  $('#mem-fb').innerHTML = `<div class="feedback ${all ? 'good' : 'bad'}">${all ? 'All correct!' : right + ' of ' + st.blanks.length + ' correct. Red boxes are wrong; try again.'}</div>`;
};
function drawArrange() {
  const st = challenge.memory;
  $('#mem-area').innerHTML = `<p>Tap the words in the correct order.</p>
    <div class="built" aria-label="Your answer">${st.built.length ? st.built.map((x, k) => `<button type="button" class="chip" data-act="mem-unplace" data-k="${k}">${esc(x.w)}</button>`).join('') : '<span class="muted">Your verse appears here</span>'}</div>
    <div class="chips pool" aria-label="Word bank">${st.pool.map((x, k) => `<button type="button" class="chip" data-act="mem-place" data-k="${k}">${esc(x.w)}</button>`).join('')}</div>
    <p><button type="button" class="btn btn-gold btn-small" data-act="mem-check-arrange" ${st.pool.length ? 'disabled' : ''}>Check</button>
    <button type="button" class="btn btn-small" data-act="mem-reset">Start over</button></p><div role="status" id="mem-fb"></div>`;
}
ACT['mem-place'] = (el) => { const st = challenge.memory; st.built.push(st.pool.splice(Number(el.dataset.k), 1)[0]); drawArrange(); };
ACT['mem-unplace'] = (el) => { const st = challenge.memory; st.pool.push(st.built.splice(Number(el.dataset.k), 1)[0]); drawArrange(); };
ACT['mem-reset'] = () => renderMemory();
ACT['mem-check-arrange'] = () => {
  const st = challenge.memory;
  const ok = st.built.every((x, k) => cleanWord(x.w) === cleanWord(st.words[k]));
  recordMemory(ok);
  $('#mem-fb').innerHTML = `<div class="feedback ${ok ? 'good' : 'bad'}">${ok ? 'Perfect order!' : 'Not quite. Tap “Start over” and try again.'}</div>`;
};
ACT['mem-match'] = (el) => {
  const st = challenge.memory;
  const ok = el.dataset.ref === st.ref;
  recordMemory(ok);
  document.querySelectorAll('.options .option').forEach((b) => {
    b.disabled = true;
    if (b.dataset.ref === st.ref) { b.classList.add('correct'); b.querySelector('.mark').textContent = '✓ Correct'; }
    else if (b === el) { b.classList.add('wrong'); b.querySelector('.mark').textContent = '✗ Your answer'; }
  });
  $('#mem-fb').innerHTML = `<div class="feedback ${ok ? 'good' : 'bad'}">${ok ? 'Correct!' : 'The answer is ' + esc(st.ref) + '.'}</div>`;
};

/* ---------- 3i. PROGRESS (overrides the earlier simple version) ---------- */
function progressPage() {
  const quiz = load(K.quiz, []), devo = load(K.devo, []), studies = load(K.studies, []);
  const ch = load(K.ch, { unwrap: [], daily: [] }), mem = load(K.mem, { attempts: 0, correct: 0 });
  const correct = quiz.reduce((n, r) => n + r.correct, 0), total = quiz.reduce((n, r) => n + r.total, 0);
  const marks = load(K.bookmarks, []);
  const ach = achievementList();
  const any = quiz.length + devo.length + studies.length + ch.unwrap.length + ch.daily.length + mem.attempts + marks.length > 0;
  const recent = [...quiz].reverse().slice(0, 5)
    .map((r) => `<li><span aria-hidden="true">✦</span><span>${esc(new Date(r.date).toLocaleString())} — ${r.correct}/${r.total} correct</span></li>`).join('');
  const stat = (n, label) => `<div class="stat"><strong>${n}</strong><span>${label}</span></div>`;

  return `<div class="container">
    <div class="page-head"><p class="eyebrow">Section</p><h1>My Progress</h1>
      <p class="muted">Everything here is real activity recorded on this device. Account sync needs a backend and is planned for later.</p></div>
    ${any ? '' : `<div class="card empty section"><h2>Your journey starts here</h2>
      <p class="muted">No activity yet. Complete a devotional, play a quiz or try a daily challenge and it will show up here.</p>
      <a href="#/daily-bread" class="btn btn-gold">Begin today’s devotional</a></div>`}
    <div class="card section-card"><div class="stats">
      ${stat(currentStreak(), 'Day streak')}${stat(devo.length, 'Devotionals completed')}${stat(studies.length, 'Character studies completed')}
      ${stat(quiz.length, 'Quizzes attempted')}${stat(total ? Math.round((correct / total) * 100) + '%' : '–', 'Quiz accuracy')}
      ${stat(ch.unwrap.length + ch.daily.length, 'Daily challenges completed')}
      ${stat(mem.correct + ' / ' + mem.attempts, 'Memory exercises correct')}${stat(marks.length, 'Bookmarked passages')}
      ${stat(ach.filter((a) => a.earned).length + ' / ' + ach.length, 'Achievements')}
    </div></div>
    ${quiz.length ? `<div class="card section-card"><h2>Recent quiz rounds</h2><ul class="status-list">${recent}</ul></div>` : ''}
    <div class="card section-card"><h2>Achievements</h2><div class="grid">${ach.map((a) => `<div class="card ach ${a.earned ? 'earned' : ''}"><strong>${a.earned ? '🏅 ' : '🔒 '}${esc(a.name)}</strong><p class="muted small" style="margin:4px 0 0">${esc(a.text)}</p></div>`).join('')}</div></div>
    <p class="muted small" style="margin-bottom:24px">Clearing your browser data removes this progress, because it is stored only in this browser.</p>
  </div>`;
}

/* ---------- 3. PAGES ---------- */
function homePage() {
  const v = dailyVerse();
  const results = load('photismos.quizResults', []);
  const correct = results.reduce((n, r) => n + r.correct, 0);
  const asked = results.reduce((n, r) => n + r.total, 0);

  const tiles = SECTIONS.map((s) => `
    <a class="card tile" href="#${s.path}">
      <div class="tile-top">
        <h3>${esc(s.title.split(' — ')[0])}</h3>
        ${s.status === 'live' ? '<span class="badge badge-live">Live</span>' : `<span class="badge">Phase ${s.phase}</span>`}
      </div>
      <p>${esc(s.blurb)}</p>
    </a>`).join('');

  const journey = results.length
    ? `<div class="stats">
         <div class="stat"><strong>${results.length}</strong><span>Quiz rounds played</span></div>
         <div class="stat"><strong>${asked ? Math.round((correct / asked) * 100) : 0}%</strong><span>Quiz accuracy</span></div>
       </div>
       <p class="muted" style="margin-top:14px">Saved on this device only. Accounts that sync your progress arrive in a later phase.</p>`
    : `<p class="muted">No activity yet. <a href="#/the-word/trivia">Try the Bible trivia</a> and your results will appear here. You never need an account to explore.</p>`;

  return `
  <section class="hero"><div class="container">
    <div class="divider"></div>
    <p class="eyebrow">Illuminated by the Word</p>
    <h1>Illuminate Your Walk with the Word.</h1>
    <p class="lead">Discover the Scriptures, explore the lives of biblical personalities, grow in wisdom, and make the Word part of your everyday life.</p>
    <div class="hero-actions">
      <a href="#/the-word" class="btn btn-gold">Explore the Word</a>
      <a href="#/daily-bread" class="btn">Begin Today’s Devotional</a>
    </div>
  </div></section>

  <section class="container" aria-labelledby="verse-heading">
    <div class="parchment-card">
      <p class="eyebrow" id="verse-heading" style="color:var(--bronze)">Scripture of the day</p>
      <blockquote style="margin:0"><p class="verse-text">“${esc(v.text)}”</p></blockquote>
      <div class="verse-ref">${esc(v.ref)} · ${TRANSLATION}</div>
      <p><em>Reflection:</em> ${esc(v.reflection)}</p>
      <div class="verse-actions">
        <a href="#/the-word" class="btn btn-gold btn-small">Explore the Word</a>
        <button type="button" class="btn btn-small" id="share-verse">Share verse</button>
      </div>
      <p role="status" id="verse-msg" style="margin:10px 0 0;font-size:.85rem"></p>
    </div>
  </section>

  <section class="section container" aria-labelledby="features-heading">
    <p class="eyebrow">Inside PHOTISMOS</p>
    <h2 id="features-heading">Where would you like to begin?</h2>
    <div class="grid">${tiles}</div>
  </section>

  <section class="container" aria-labelledby="dash-heading">
    <div class="card"><h2 id="dash-heading">Your journey</h2>${journey}</div>
  </section>`;
}

function homeAfter() {
  const v = dailyVerse();
  $('#share-verse').addEventListener('click', async () => {
    const out = await shareText({
      title: 'PHOTISMOS',
      text: `“${v.text}” — ${v.ref} (KJV)\nPHOTISMOS · Illuminated by the Word.`,
      url: siteUrl(),
    });
    $('#verse-msg').textContent = shareMessage(out);
  });
}

function comingSoonPage(s) {
  const plan = (s.plan || []).map((i) => `<li><span aria-hidden="true">○</span><span>${esc(i)}</span></li>`).join('');
  return `<div class="container">
    <div class="page-head"><p class="eyebrow">Planned · Phase ${s.phase}</p><h1>${esc(s.title)}</h1><p class="muted">${esc(s.blurb)}</p></div>
    <div class="card section" style="margin-top:24px">
      <h2>Not built yet</h2>
      <p>This section is not available in the current version. What is planned:</p>
      <ul class="status-list">${plan}</ul>
      <p style="margin-top:18px"><a href="#/the-word/trivia" class="btn btn-gold">Try Bible Trivia meanwhile</a></p>
    </div></div>`;
}

function profilePage() {
  return `<div class="container">
    <div class="page-head"><p class="eyebrow">Planned · Phase 6</p><h1>Profile and Settings</h1><p class="muted">Sign-in is not available in this version.</p></div>
    <div class="card section" style="margin-top:24px"><h2>Accounts are coming</h2>
      <p>Registration, sign-in, password reset and preferences need a backend such as Supabase Auth. This simple HTML version has no server, so there is no sign-in form.</p>
      <p class="muted" style="margin:0">Until then, everything public works without an account, and quiz results are kept on this device.</p></div></div>`;
}

function notFoundPage() {
  return `<div class="container section empty"><h1>Page not found</h1><p class="muted">That page does not exist.</p><a href="#/" class="btn btn-gold">Back to home</a></div>`;
}

/* ---------- 5. QUIZ ---------- */
// Three screens: 'intro' -> 'playing' -> 'done'.
const quiz = { screen: 'intro', round: [], index: 0, picked: null, answers: [], shareMsg: '' };

function quizPage() {
  const root = $('#quiz-root');
  const results = load('photismos.quizResults', []);

  if (quiz.screen === 'intro') {
    root.innerHTML = `<div class="quiz card">
      <p class="eyebrow">The Word · Bible Trivia</p><h1>Test your Bible knowledge</h1>
      <p class="muted">${Math.min(ROUND_SIZE, QUESTIONS.length)} questions drawn from a bank of ${QUESTIONS.length}. Each answer shows an explanation and the supporting Bible reference. One point for every correct answer.</p>
      ${results.length ? `<p class="muted">Rounds played on this device: ${results.length}</p>` : ''}
      <button type="button" class="btn btn-gold" id="q-start">Begin quiz</button></div>`;
    $('#q-start').addEventListener('click', quizStart);
    return;
  }

  if (quiz.screen === 'done') {
    const correct = quiz.answers.filter((a) => a.isCorrect).length;
    const total = quiz.answers.length;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    const msg = percent === 100 ? 'Perfect score. Well done!' : percent >= 70 ? 'Strong work.' : 'Keep studying. Every round teaches something.';
    root.innerHTML = `<div class="quiz card" style="text-align:center">
      <p class="eyebrow">Results</p><div class="score-big">${correct}/${total}</div>
      <p>${percent}% correct. ${msg}</p>
      <div class="hero-actions">
        <button type="button" class="btn btn-gold" id="q-again">Play again</button>
        <button type="button" class="btn" id="q-share">Share result</button>
        <a href="#/progress" class="btn">View progress</a>
      </div>
      <p role="status" class="muted" id="q-msg">${esc(quiz.shareMsg)}</p></div>`;
    $('#q-again').addEventListener('click', quizStart);
    $('#q-share').addEventListener('click', async () => {
      const out = await shareText({
        title: 'PHOTISMOS Bible Trivia',
        text: `I scored ${correct}/${total} on PHOTISMOS Bible Trivia. Illuminated by the Word.`,
        url: siteUrl(),
      });
      quiz.shareMsg = shareMessage(out);
      $('#q-msg').textContent = quiz.shareMsg;
    });
    return;
  }

  // playing
  const q = quiz.round[quiz.index];
  const answered = quiz.picked !== null;
  const wasCorrect = answered && quiz.picked === q.correctIndex;
  const score = quiz.answers.filter((a) => a.isCorrect).length;
  const progress = quiz.index + (answered ? 1 : 0);

  const options = q.options.map((opt, i) => {
    let cls = 'option', mark = '';
    if (answered && i === q.correctIndex) { cls += ' correct'; mark = '✓ Correct'; }
    else if (answered && i === quiz.picked) { cls += ' wrong'; mark = '✗ Your answer'; }
    return `<button type="button" class="${cls}" data-i="${i}" ${answered ? 'disabled' : ''}>
      <span>${String.fromCharCode(65 + i)}.</span><span>${esc(opt)}</span><span class="mark">${mark}</span></button>`;
  }).join('');

  const feedback = answered
    ? `<div class="feedback ${wasCorrect ? 'good' : 'bad'}"><strong>${wasCorrect ? 'Correct!' : 'Not quite.'}</strong> ${esc(q.explanation)}
         <div class="muted">Reference: ${esc(q.reference)}</div></div>` : '';

  root.innerHTML = `<div class="quiz card">
    <div class="quiz-meta"><span>Question ${quiz.index + 1} of ${quiz.round.length}</span><span>Score: ${score}</span></div>
    <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${quiz.round.length}" aria-valuenow="${progress}">
      <div style="width:${(progress / quiz.round.length) * 100}%"></div></div>
    <h2 class="quiz-question">${esc(q.question)}</h2>
    <div class="options" role="group" aria-label="Answer choices">${options}</div>
    <div role="status" aria-live="polite">${feedback}</div>
    ${answered ? `<button type="button" class="btn btn-gold" id="q-next">${quiz.index + 1 < quiz.round.length ? 'Next question' : 'See results'}</button>` : ''}
  </div>`;

  root.querySelectorAll('.option').forEach((btn) => btn.addEventListener('click', () => quizChoose(Number(btn.dataset.i))));
  const next = $('#q-next');
  if (next) { next.addEventListener('click', quizNext); next.focus(); }
}

function quizStart() {
  quiz.round = buildRound(QUESTIONS, ROUND_SIZE);
  quiz.index = 0; quiz.picked = null; quiz.answers = []; quiz.shareMsg = '';
  quiz.screen = 'playing';
  quizPage();
}
function quizChoose(i) {
  if (quiz.picked !== null) return; // locked once chosen
  const q = quiz.round[quiz.index];
  quiz.picked = i;
  quiz.answers.push({ id: q.id, chosen: i, isCorrect: i === q.correctIndex });
  quizPage();
}
function quizNext() {
  if (quiz.index + 1 < quiz.round.length) { quiz.index++; quiz.picked = null; quizPage(); return; }
  const correct = quiz.answers.filter((a) => a.isCorrect).length;
  const results = load('photismos.quizResults', []);
  results.push({ date: new Date().toISOString(), correct, total: quiz.answers.length });
  save('photismos.quizResults', results);
  quiz.screen = 'done';
  quizPage();
}

/* ---------- 4. ROUTER ---------- */
// Addresses look like index.html#/progress. Works when you simply open the file,
// and on any host, with no server settings needed.
const NAV = [{ path: '/', nav: 'Home' }, ...SECTIONS, { path: '/progress', nav: 'My Progress' }, { path: '/profile', nav: 'Profile' }];

function renderNav(current) {
  $('#main-nav').innerHTML = NAV.map((l) =>
    `<a href="#${l.path}" ${l.path === current ? 'class="active" aria-current="page"' : ''}>${esc(l.nav)}</a>`).join('');
}

function route() {
  const [path, qs] = (location.hash.replace(/^#/, '') || '/').split('?');
  const query = new URLSearchParams(qs || '');
  const parts = path.split('/').filter(Boolean);
  const main = $('#main');
  let after = null;

  if (path === '/') { main.innerHTML = homePage(); after = homeAfter; }
  else if (path === '/the-word') { main.innerHTML = readerPage(query); after = loadReader; }
  else if (path === '/the-word/trivia') {
    main.innerHTML = '<div class="container section" id="quiz-root"></div>';
    quiz.screen = 'intro';
    after = quizPage;
  }
  else if (parts[0] === 'chronicles') main.innerHTML = parts[1] ? characterPage(parts[1]) : chroniclesPage();
  else if (path === '/chokmah') main.innerHTML = chokmahPage(query);
  else if (path === '/daily-bread') main.innerHTML = dailyBreadPage(query);
  else if (parts[0] === 'colour-symbols') main.innerHTML = parts[1] ? colourPage(parts[1]) : coloursPage();
  else if (path === '/daily-challenges') {
    challenge.memory = { ref: MEMORY_VERSES[0], mode: 'missing', data: null };
    main.innerHTML = challengesPage();
    after = loadMemory;
  }
  else if (path === '/progress') main.innerHTML = progressPage();
  else if (path === '/profile') main.innerHTML = profilePage();
  else {
    const s = SECTIONS.find((x) => x.path === path && x.status === 'soon');
    main.innerHTML = s ? comingSoonPage(s) : notFoundPage();
  }

  if (after) after();
  hydrateVerses(main);
  renderNav('/' + (parts[0] || ''));
  $('#main-nav').classList.remove('open');
  $('#nav-toggle').setAttribute('aria-expanded', 'false');
  $('#nav-toggle').textContent = '☰';
  window.scrollTo(0, 0);
  document.title = 'PHOTISMOS — Illuminated by the Word';
}

document.addEventListener('DOMContentLoaded', () => {
  $('#footer-year').textContent = new Date().getFullYear();
  $('#nav-toggle').addEventListener('click', () => {
    const open = $('#main-nav').classList.toggle('open');
    $('#nav-toggle').setAttribute('aria-expanded', String(open));
    $('#nav-toggle').textContent = open ? '✕' : '☰';
  });
  window.addEventListener('hashchange', route);
  route();
});
