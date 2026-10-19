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
    "blurb": "Bible trivia is live. Reading, search and verse explanations come next.",
    "status": "live",
    "phase": 2
  },
  {
    "path": "/chronicles",
    "nav": "Chronicles",
    "title": "The Biblical Chronicles",
    "blurb": "Walk through the lives of David, Esther, Paul and more: their victories, failures and lessons.",
    "status": "soon",
    "phase": 3,
    "plan": [
      "Character library with search",
      "Portrait-first profile pages built from structured content",
      "Illustrated timeline of events with Bible references",
      "\"A Day in Their Shoes\" reflection scenarios"
    ]
  },
  {
    "path": "/chokmah",
    "nav": "CHOKMAH",
    "title": "CHOKMAH — Solomon’s Daily Wisdom",
    "blurb": "A daily wisdom entry from Proverbs with an application, an action and a reflection.",
    "status": "soon",
    "phase": 3,
    "plan": [
      "Daily entry chosen by date, not at random",
      "Practical application and a daily action",
      "Shareable wisdom card"
    ]
  },
  {
    "path": "/daily-bread",
    "nav": "My Daily Bread",
    "title": "MY DAILY BREAD",
    "blurb": "A daily devotional with a private journal, prayer and a streak that tracks your habit.",
    "status": "soon",
    "phase": 4,
    "plan": [
      "Devotional reader with previous / next navigation",
      "Private notes (stored on your account in Phase 6)",
      "Completion tracking and streak rules"
    ]
  },
  {
    "path": "/colour-symbols",
    "nav": "Colour Symbols",
    "title": "Colour Symbols",
    "blurb": "Study how colours appear in Scripture, carefully separating what the text says from interpretation.",
    "status": "soon",
    "phase": 4,
    "plan": [
      "Purple, white, scarlet, green, gold and blue",
      "Explicit meaning vs. passage-based association vs. debated interpretation",
      "Shareable colour cards"
    ]
  },
  {
    "path": "/bible-arena",
    "nav": "Bible Arena",
    "title": "Bible Arena",
    "blurb": "A multiplayer Bible trivia game with a spinning bottle, up to 20 players per room.",
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
    "status": "soon",
    "phase": 5,
    "plan": [
      "Unwrap the Word with real answer checking",
      "Daily Bible question",
      "Scripture memory trainer",
      "Achievements earned from recorded activity"
    ]
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

function theWordPage() {
  const tools = [
    { title: 'Bible Trivia', text: 'Multiple-choice questions with explanations and references.', to: '#/the-word/trivia', live: true },
    { title: 'Bible Reading', text: 'Books, chapters, bookmarks and text size. Needs a Bible text source.', phase: 2 },
    { title: 'Scripture Search', text: 'Search by word, phrase or reference. Needs a Bible text source.', phase: 2 },
    { title: 'Verse Explanations', text: 'Context, key words, cross-references and reflection questions.', phase: 2 },
    { title: 'Word of the Day', text: 'A scheduled daily word with a shareable card.', phase: 2 },
  ];
  const cards = tools.map((t) => {
    const body = `<div class="tile-top"><h3>${t.title}</h3>${t.live ? '<span class="badge badge-live">Live</span>' : `<span class="badge">Phase ${t.phase}</span>`}</div><p>${t.text}</p>`;
    return t.live ? `<a class="card tile" href="${t.to}">${body}</a>` : `<div class="card tile" aria-disabled="true">${body}</div>`;
  }).join('');
  return `<div class="container">
    <div class="page-head"><p class="eyebrow">Section</p><h1>The Word</h1>
    <p class="muted">The main place to learn Scripture. Bible trivia works today; the rest of this section is planned for Phase 2.</p></div>
    <div class="grid section">${cards}</div></div>`;
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

function progressPage() {
  const results = load('photismos.quizResults', []);
  const correct = results.reduce((n, r) => n + r.correct, 0);
  const total = results.reduce((n, r) => n + r.total, 0);
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  const recent = [...results].reverse().slice(0, 5)
    .map((r) => `<li><span aria-hidden="true">✦</span><span>${esc(new Date(r.date).toLocaleString())} — ${r.correct}/${r.total} correct</span></li>`).join('');

  const body = results.length === 0
    ? `<div class="card empty section"><h2>Your journey starts here</h2>
         <p class="muted">You have no recorded activity yet. Finish a Bible trivia round and it will appear here.</p>
         <a href="#/the-word/trivia" class="btn btn-gold">Start Bible Trivia</a></div>`
    : `<div class="section">
         <div class="card"><div class="stats">
           <div class="stat"><strong>${results.length}</strong><span>Quizzes attempted</span></div>
           <div class="stat"><strong>${accuracy}%</strong><span>Quiz accuracy</span></div>
           <div class="stat"><strong>${correct}</strong><span>Correct answers</span></div>
         </div></div>
         <div class="card" style="margin-top:16px"><h2>Recent rounds</h2><ul class="status-list">${recent}</ul></div>
       </div>`;

  return `<div class="container">
    <div class="page-head"><p class="eyebrow">Section</p><h1>My Progress</h1><p class="muted">Stored on this device only. Account sync is planned for a later phase.</p></div>
    ${body}
    <div class="card" style="margin-bottom:24px"><h3>Not tracked yet</h3>
      <p class="muted" style="margin:0">Devotionals, character studies, challenges, memory practice, streaks, achievements and saved verses will appear here as those sections are built.</p></div>
  </div>`;
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
  const path = location.hash.replace(/^#/, '') || '/';
  const main = $('#main');
  let after = null;

  if (path === '/') { main.innerHTML = homePage(); after = homeAfter; }
  else if (path === '/the-word') main.innerHTML = theWordPage();
  else if (path === '/the-word/trivia') {
    main.innerHTML = '<div class="container section" id="quiz-root"></div>';
    quiz.screen = 'intro';
    after = quizPage;
  }
  else if (path === '/progress') main.innerHTML = progressPage();
  else if (path === '/profile') main.innerHTML = profilePage();
  else {
    const s = SECTIONS.find((x) => x.path === path && x.status === 'soon');
    main.innerHTML = s ? comingSoonPage(s) : notFoundPage();
  }

  if (after) after();
  renderNav(path === '/the-word/trivia' ? '/the-word' : path);
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
