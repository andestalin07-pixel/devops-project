/* ==========================================================
   NUGGET — Core Application Logic
   Features:
   - Mandatory Guest & Credential Auth Flows
   - Real-time Topic Filtering & Compulsory Search Bar
   - Instagram-style Micro-Learning Feed & Dynamic Post Render
   - Creator Studio: Create & Publish New Nuggets
   - Interactive Quizzes with Instant XP & Feedback
   - Brain Vault (Bookmark/Save) with Persistent Storage
   - Text-to-Speech (Audio Reader) for Hands-free Learning
   - Instagram-style Stories Viewer
   ========================================================== */

// --- INITIAL SEED DATA: Rich Educational Nuggets ---
const DEFAULT_NUGGETS = [
  {
    id: "nugget-1",
    creator: {
      name: "Dr. Elena Vance",
      handle: "@elenavance_neuro",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    topic: "neuroscience",
    topicLabel: "🧠 Neuroscience",
    readTime: "45s read",
    title: "The Dopamine Prediction Error: Why Anticipation Feels Better Than the Reward",
    themeClass: "theme-brain-purple",
    heroIcon: "⚡",
    coreConcept: "Your brain does not release peak dopamine when you actually get what you desire. It surges in the exact moment of *unexpected possibility*. Once an outcome is 100% guaranteed, dopamine flatlines.",
    takeaways: [
      "Dopamine is the molecule of pursuit, anticipation, and craving — not satisfaction.",
      "Variable rewards (like slot machines and social feeds) hijack this circuit because outcomes remain unpredictable.",
      "To stay motivated on hard goals, celebrate unexpected tiny micro-wins along the path."
    ],
    quiz: {
      question: "When does the highest surge of dopamine occur in the brain?",
      options: [
        "Right after you consume or enjoy the reward",
        "During the unexpected anticipation of the reward",
        "When an outcome is completely guaranteed and predictable"
      ],
      correctIndex: 1,
      explanation: "Neuroscience shows dopamine spikes highest in the anticipation phase, especially when there is variable uncertainty."
    },
    sparks: 1420,
    userSparked: false,
    userSaved: false,
    timestamp: "2 hours ago",
    comments: [
      { author: "Marcus K.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80", text: "This explains why waiting for a package is often more exciting than opening it!" },
      { author: "Sonia Reed", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80", text: "Brilliant insight. Re-orienting my habit routines around this right now." }
    ]
  },
  {
    id: "nugget-2",
    creator: {
      name: "Arjun Mehta",
      handle: "@arjun_quantum",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    topic: "quantum",
    topicLabel: "⚛️ Quantum Physics",
    readTime: "50s read",
    title: "Quantum Tunneling: How Particles Teleport Through Solid Energy Walls",
    themeClass: "theme-neon-quantum",
    heroIcon: "🌌",
    coreConcept: "In classical physics, a tennis ball cannot bounce through a brick wall without enough energy. In quantum mechanics, particles exist as wave probability clouds. Part of the wave extends right through the barrier, allowing particles to magically materialize on the other side.",
    takeaways: [
      "Without quantum tunneling, the Sun wouldn't shine — protons tunnel to trigger nuclear fusion.",
      "The flash memory and SSD inside your smartphone rely on tunneling electrons through insulators.",
      "Even your DNA relies on proton tunneling for spontaneous enzyme mutations."
    ],
    quiz: {
      question: "Which of everyday technologies depends directly on quantum tunneling?",
      options: [
        "Mechanical wristwatches",
        "Flash memory chips (SSDs) and USB drives",
        "Incandescent light bulbs"
      ],
      correctIndex: 1,
      explanation: "NAND flash drives write data by forcing electrons to tunnel through an insulating barrier into a floating gate."
    },
    sparks: 2840,
    userSparked: true,
    userSaved: true,
    timestamp: "5 hours ago",
    comments: [
      { author: "Kai Chen", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80", text: "The fact that the Sun would literally turn cold without this is wild." }
    ]
  },
  {
    id: "nugget-3",
    creator: {
      name: "Sophia Sterling",
      handle: "@sophia_arch",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    topic: "tech",
    topicLabel: "💻 Tech & Code",
    readTime: "40s read",
    title: "How Transformer Self-Attention Understands Context Better Than Humans",
    themeClass: "theme-code-cyber",
    heroIcon: "🤖",
    coreConcept: "In the sentence 'The animal didn't cross the street because it was too tired', what does 'it' refer to? Prior algorithms struggled. Self-attention calculates mathematical affinity scores between every single word and every other word concurrently.",
    takeaways: [
      "Instead of reading sequentially word-by-word, attention looks at the whole paragraph simultaneously.",
      "Words project into Query, Key, and Value vectors to weigh contextual relationships.",
      "This single architecture shift in 2017 unlocked modern LLMs like ChatGPT and Gemini."
    ],
    quiz: {
      question: "What makes self-attention superior to sequential recurrent networks (RNNs)?",
      options: [
        "It can process all tokens in parallel and map long-distance dependencies",
        "It consumes zero computer memory",
        "It requires zero training data"
      ],
      correctIndex: 0,
      explanation: "Self-attention processes whole sequence tokens simultaneously with matrix operations instead of sequential step-by-step loops."
    },
    sparks: 3190,
    userSparked: false,
    userSaved: false,
    timestamp: "7 hours ago",
    comments: [
      { author: "Devon R.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", text: "Attention Is All You Need in under 60 seconds. Love this!" }
    ]
  },
  {
    id: "nugget-4",
    creator: {
      name: "Tariq Al-Mansoor",
      handle: "@tariq_models",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    topic: "finance",
    topicLabel: "📈 Finance & Mental Models",
    readTime: "45s read",
    title: "The Lindy Effect: Why the Oldest Ideas Will Outlive Modern Trends",
    themeClass: "theme-amber-gold",
    heroIcon: "⏳",
    coreConcept: "For perishable things (like fruits or humans), every day alive decreases remaining life expectancy. But for non-perishable ideas, books, and technologies, every additional year of survival *doubles* their expected future life.",
    takeaways: [
      "A book that has been in print for 100 years is mathematically expected to remain in print for another 100.",
      "A tech hype that is 6 months old will likely be forgotten in 6 months.",
      "Filter your reading: prioritize ideas that have withstood decades over tweets from this morning."
    ],
    quiz: {
      question: "According to the Lindy Effect, which idea is most likely to be relevant in 100 years?",
      options: [
        "The latest productivity app released last Tuesday",
        "Stoic philosophy from Marcus Aurelius (2,000 years old)",
        "A trending meme format from last month"
      ],
      correctIndex: 1,
      explanation: "Having already survived 20 centuries, Stoic philosophy has demonstrated extraordinary robustness under the Lindy Effect."
    },
    sparks: 1890,
    userSparked: false,
    userSaved: true,
    timestamp: "12 hours ago",
    comments: [
      { author: "Nora F.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", text: "This completely changed how I pick which books to buy." }
    ]
  },
  {
    id: "nugget-5",
    creator: {
      name: "Dr. Maya Lin",
      handle: "@mayalin_cosmos",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    topic: "space",
    topicLabel: "🌌 Astrophysics",
    readTime: "55s read",
    title: "The Fermi Paradox: Where Are All The Alien Civilizations?",
    themeClass: "theme-neon-quantum",
    heroIcon: "🛸",
    coreConcept: "There are roughly 100,000,000,000 stars in our galaxy, and billions are billions of years older than our Sun. Even with slow interstellar travel, any advanced civilization could colonize the entire galaxy within a few million years. So why is the night sky utterly silent?",
    takeaways: [
      "The Great Filter hypothesis: Life encounters an almost impossible evolutionary barrier (e.g. single cell to complex life, or self-destruction by nuclear/AI weapons).",
      "Zoo hypothesis: They know we exist and are intentionally keeping Earth isolated as an untouched nature reserve.",
      "We may be among the very first conscious beings to awaken in the cosmic timeline."
    ],
    quiz: {
      question: "What is the 'Great Filter' in the context of the Fermi Paradox?",
      options: [
        "A giant asteroid belt that blocks alien signals",
        "A monumental evolutionary hurdle or extinction event that stops life from becoming interstellar",
        "A telescope filter used by NASA to clean planetary imagery"
      ],
      correctIndex: 1,
      explanation: "The Great Filter is the statistical wall that life struggles or fails to cross before becoming an advanced galactic civilization."
    },
    sparks: 4120,
    userSparked: true,
    userSaved: false,
    timestamp: "1 day ago",
    comments: [
      { author: "Liam Vance", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", text: "The thought that we might be the first is even more terrifying than being alone." }
    ]
  },
  {
    id: "nugget-6",
    creator: {
      name: "Prof. Lucian Wright",
      handle: "@lucian_history",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      verified: false
    },
    topic: "history",
    topicLabel: "🏛️ Untold History",
    readTime: "45s read",
    title: "The Antikythera Mechanism: A 2,000-Year-Old Greek Analog Computer",
    themeClass: "theme-amber-gold",
    heroIcon: "⚙️",
    coreConcept: "Recovered from a Greek shipwreck in 1901, this corroded bronze device contained over 30 precision bronze gears. Built around 100 BC, it calculated eclipses, planetary orbits, and Olympic calendar dates with mechanical accuracy unseen again until the 14th century.",
    takeaways: [
      "Proves ancient Hellenistic mechanics were over a millennium ahead of what historians believed.",
      "Features differential gearing, previously thought to be invented in the Renaissance.",
      "Reveals that human technological progress is not linear — entire civilizations lost master technologies."
    ],
    quiz: {
      question: "What was the primary function of the Antikythera Mechanism?",
      options: [
        "A weapon for firing arrows at naval targets",
        "An astronomical calendar and predictive analog computer for celestial cycles",
        "A scale for measuring trade gold"
      ],
      correctIndex: 1,
      explanation: "It computed astronomical positions, moon phases, and solar eclipses using precision gear trains."
    },
    sparks: 2150,
    userSparked: false,
    userSaved: false,
    timestamp: "1 day ago",
    comments: []
  },
  {
    id: "nugget-7",
    creator: {
      name: "Clara Zheng",
      handle: "@clara_mind",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    topic: "psychology",
    topicLabel: "🧘 Psychology & Habits",
    readTime: "35s read",
    title: "Implementation Intentions: The 2x Habit Success Formula",
    themeClass: "theme-brain-purple",
    heroIcon: "🎯",
    coreConcept: "Saying 'I want to read more' or 'I will study code' fails over 80% of the time. Psychology studies by Peter Gollwitzer discovered that structuring habits as 'When Situation X arrives, I will perform Action Y at Location Z' doubles success rates instantly.",
    takeaways: [
      "It transfers mental control from conscious willpower to environmental triggers.",
      "Example: 'When I pour my morning coffee at 7:30 AM, I will open Nugget for 3 minutes at the kitchen table.'",
      "Decision fatigue is eliminated because you no longer debate when or where to start."
    ],
    quiz: {
      question: "Why do 'Implementation Intentions' dramatically improve habit consistency?",
      options: [
        "They use guilt to force actions",
        "They link the behavior to a specific environmental trigger, removing debate and decision fatigue",
        "They require expensive habit tracking gear"
      ],
      correctIndex: 1,
      explanation: "By pairing time and location cues, your brain pre-computes the trigger, automating execution."
    },
    sparks: 3750,
    userSparked: false,
    userSaved: true,
    timestamp: "2 days ago",
    comments: []
  },
  {
    id: "nugget-8",
    creator: {
      name: "Oliver Thorne",
      handle: "@oliver_philo",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    topic: "philosophy",
    topicLabel: "🕯️ Deep Philosophy",
    readTime: "50s read",
    title: "The Ship of Theseus: If Every Cell in You Replaces Itself, Who Are You?",
    themeClass: "theme-code-cyber",
    heroIcon: "⛵",
    coreConcept: "A wooden ship sails for 100 years. As wooden planks rot, they are replaced one by one. Eventually, zero original planks remain. Is it still the same ship? If someone collected the discarded rotted planks and reassembled them, which one is the true ship?",
    takeaways: [
      "Every 7 to 10 years, almost every cell in your biological body is replaced.",
      "Identity is not found in static physical matter; it is an enduring continuous pattern through time.",
      "This paradox is now central to AI and digital mind uploading debates."
    ],
    quiz: {
      question: "What core truth does the Ship of Theseus paradox illustrate?",
      options: [
        "Boats should always be made of steel",
        "Identity is an ongoing organizational pattern rather than a permanent pile of static matter",
        "Cells never regenerate in living bodies"
      ],
      correctIndex: 1,
      explanation: "Matter changes constantly; continuity of form, memory, and relation defines identity."
    },
    sparks: 2980,
    userSparked: false,
    userSaved: false,
    timestamp: "2 days ago",
    comments: []
  }
];

// --- STORY DATA (Instagram style concept stories) ---
const CONCEPT_STORIES = [
  {
    id: "s1",
    author: "Dr. Elena Vance",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    title: "Synaptic Pruning",
    graphic: "🧠",
    content: "When you sleep, your brain physically prunes away weak neural connections so your strongest thoughts can fire 10x faster tomorrow. Sleep isn't rest; it's active brain defragmentation."
  },
  {
    id: "s2",
    author: "Dr. Maya Lin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    title: "Einstein-Rosen Bridges",
    graphic: "🌌",
    content: "A wormhole connects two distant points in space-time like folding a sheet of paper. While mathematically proven by general relativity, keeping one open requires exotic negative-energy matter."
  },
  {
    id: "s3",
    author: "Sophia Sterling",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    title: "The Boy Scout Rule",
    graphic: "💻",
    content: "'Always leave the campground cleaner than you found it.' When touching legacy code, refactor just one variable name or add one test. Compounded over months, technical debt vanishes."
  },
  {
    id: "s4",
    author: "Marcus K.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    title: "The Golden Ratio in Art",
    graphic: "📐",
    content: "1.618 (Phi). From sunflower seeds and hurricane swirls to the Parthenon and Apple logos, human brains are wired to perceive this mathematical proportion as natural harmony."
  },
  {
    id: "s5",
    author: "Tariq Al-Mansoor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    title: "First Principles Thinking",
    graphic: "💡",
    content: "Boil things down to the most fundamental truths you know, and reason up from there rather than reasoning by analogy. That is how battery costs dropped from $600/kWh to $80/kWh."
  }
];

// --- APP STATE ---
class NuggetApp {
  constructor() {
    this.currentUser = this.loadUserSession();
    this.nuggets = this.loadNuggets();
    this.activeTopic = "all";
    this.searchQuery = "";
    this.activeTab = "for-you";
    this.activeFilterSpecial = null; // 'creators', 'quiz-only', 'saved-only'
    this.activeSpeechUtterance = null;
    this.activeStoryIndex = 0;
    this.storyTimer = null;
    this.activeCommentNuggetId = null;

    this.initElements();
    this.initEventListeners();
    this.checkInitialAuth();
    this.renderHeaderUserInfo();
    this.renderTopicsCount();
    this.renderFeed();
    this.renderTopCreators();
    this.updateVaultCounter();

    // Fetch live data from Neon PostgreSQL
    this.fetchNuggetsFromDatabase();
  }

  // --- Session & LocalStorage Helpers ---
  loadUserSession() {
    const saved = localStorage.getItem("nugget_user");
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (!Array.isArray(u.savedNuggetIds)) u.savedNuggetIds = [];
        return u;
      } catch (e) { /* fallback */ }
    }
    // Default guest profile
    return {
      isGuest: true,
      name: "Guest Explorer",
      handle: "@guest_learner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "Guest Learner",
      streak: 4,
      xp: 380,
      quizzesAced: 9,
      readCount: 14,
      sparksGiven: 32,
      savedNuggetIds: []
    };
  }

  saveUserSession() {
    if (!this.currentUser.savedNuggetIds) {
      const vaultIds = JSON.parse(localStorage.getItem("nugget_vault_ids") || "[]");
      this.currentUser.savedNuggetIds = vaultIds;
    }
    localStorage.setItem("nugget_user", JSON.stringify(this.currentUser));
    // Asynchronously sync user stats with Neon DB
    fetch("/api/user/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.currentUser)
    }).catch(() => {});
  }

  loadNuggets() {
    const saved = localStorage.getItem("nugget_posts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) { /* fallback */ }
    }
    return DEFAULT_NUGGETS;
  }

  saveNuggets() {
    localStorage.setItem("nugget_posts", JSON.stringify(this.nuggets));
  }

  async fetchNuggetsFromDatabase() {
    try {
      const res = await fetch("/api/nuggets");
      if (!res.ok) throw new Error("Status " + res.status);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const vaultIds = JSON.parse(localStorage.getItem("nugget_vault_ids") || "[]");
        const sparkedIds = JSON.parse(localStorage.getItem("nugget_sparked_ids") || "[]");

        this.nuggets = data.map(item => ({
          ...item,
          userSaved: vaultIds.includes(item.id) || !!item.userSaved,
          userSparked: sparkedIds.includes(item.id) || !!item.userSparked
        }));

        this.saveNuggets();
        this.renderFeed();
        this.renderTopicsCount();
        this.updateVaultCounter();
        this.updateDbStatus(true, data.length);
      }
    } catch (err) {
      console.info("Neon DB offline or static mode, using cached data:", err);
      this.updateDbStatus(false);
    }
  }

  updateDbStatus(online, count) {
    const pill = document.getElementById("dbStatusPill");
    const text = document.getElementById("dbStatusText");
    if (!pill || !text) return;
    if (online) {
      pill.classList.remove("offline");
      pill.title = `Connected to Neon PostgreSQL (${count || this.nuggets.length} nuggets synced) — Click to inspect tables`;
      text.textContent = "Neon DB";
    } else {
      pill.classList.add("offline");
      pill.title = "Offline / Local Mode. Start python server.py to sync with Neon DB.";
      text.textContent = "Local";
    }
  }

  // --- Neon Cloud Database Inspector ---
  openDbInspector() {
    if (!this.dbViewerModal) return;
    this.dbViewerModal.style.display = "flex";
    this.fetchAndRenderDbInspector();
  }

  async fetchAndRenderDbInspector() {
    if (!this.dbRefreshBtn) return;
    this.dbRefreshBtn.textContent = "⏳ Fetching Neon...";
    try {
      // 1. Fetch live registered users & credentials
      const userRes = await fetch("/api/users");
      const userData = await userRes.json();
      const users = userData.users || [];
      if (this.dbUsersCount) this.dbUsersCount.textContent = users.length;

      if (this.dbUsersTableBody) {
        if (users.length === 0) {
          this.dbUsersTableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:1.5rem; color:#94a3b8;">No registered users yet. Log in or create an account to see your data!</td></tr>`;
        } else {
          this.dbUsersTableBody.innerHTML = users.map(u => `
            <tr>
              <td class="db-handle-cell">${u.handle}</td>
              <td><strong>${u.name}</strong></td>
              <td class="db-email-cell">${u.email || '<span style="color:#64748b;">(guest)</span>'}</td>
              <td><span class="db-cred-badge">${u.password || '••••••'}</span></td>
              <td>${u.role}</td>
              <td><strong style="color:#f59e0b;">${u.xp} XP</strong></td>
              <td>🔥 ${u.streak}d</td>
              <td>${u.quizzesAced} aced</td>
              <td style="color:#94a3b8; font-size:0.75rem;">${u.lastLogin || u.createdAt || 'Active'}</td>
            </tr>
          `).join("");
        }
      }

      // 2. Fetch live nuggets from database
      const nugRes = await fetch("/api/nuggets");
      const nuggets = await nugRes.json();
      if (this.dbNuggetsCount) this.dbNuggetsCount.textContent = Array.isArray(nuggets) ? nuggets.length : 0;

      if (this.dbNuggetsTableBody && Array.isArray(nuggets)) {
        this.dbNuggetsTableBody.innerHTML = nuggets.map(n => `
          <tr>
            <td style="font-family:'JetBrains Mono',monospace; color:#38bdf8;">${n.id}</td>
            <td><strong>${n.title}</strong></td>
            <td>${n.topicLabel || n.topic}</td>
            <td>⚡ ${n.sparks}</td>
            <td>💬 ${(n.comments && n.comments.length) || 0}</td>
            <td style="color:#94a3b8; font-size:0.75rem;">${n.timestamp || 'Recent'}</td>
          </tr>
        `).join("");
      }
    } catch (err) {
      console.error("Database inspector fetch error:", err);
      this.showToast("⚠️ Could not load database records from server.");
    } finally {
      if (this.dbRefreshBtn) this.dbRefreshBtn.textContent = "🔄 Refresh Data";
    }
  }

  // --- Element Binding ---
  initElements() {
    // Auth elements
    this.authModal = document.getElementById("authModal");
    this.tabLoginBtn = document.getElementById("tabLoginBtn");
    this.tabRegisterBtn = document.getElementById("tabRegisterBtn");
    this.loginForm = document.getElementById("loginForm");
    this.registerForm = document.getElementById("registerForm");
    this.continueGuestBtn = document.getElementById("continueGuestBtn");
    this.demoFillBtn = document.getElementById("demoFillBtn");

    // Header & Search
    this.globalSearchInput = document.getElementById("globalTopicSearch");
    this.clearSearchBtn = document.getElementById("clearSearchBtn");
    this.searchSuggestions = document.getElementById("searchSuggestions");
    this.streakCountText = document.getElementById("streakCountText");
    this.xpText = document.getElementById("xpText");
    this.openCreateModalBtn = document.getElementById("openCreateModalBtn");
    this.openSavedDrawerBtn = document.getElementById("openSavedDrawerBtn");
    this.savedCounterBadge = document.getElementById("savedCounterBadge");
    this.savedCountSide = document.getElementById("savedCountSide");
    this.avatarMenuBtn = document.getElementById("avatarMenuBtn");
    this.userDropdownMenu = document.getElementById("userDropdownMenu");
    this.switchAccountBtn = document.getElementById("switchAccountBtn");
    this.logoutBtn = document.getElementById("logoutBtn");

    // Feed & Layout
    this.nuggetsFeed = document.getElementById("nuggetsFeed");
    this.emptyFeedCard = document.getElementById("emptyFeedCard");
    this.emptyFeedMessage = document.getElementById("emptyFeedMessage");
    this.resetFiltersBtn = document.getElementById("resetFiltersBtn");
    this.topicsTaskbar = document.getElementById("topicsTaskbar");
    this.creatorList = document.getElementById("creatorList");

    // Feed Tabs
    this.tabForYou = document.getElementById("tabForYou");
    this.tabTrending = document.getElementById("tabTrending");
    this.tabLatest = document.getElementById("tabLatest");

    // Left Filters
    this.filterAllBtn = document.getElementById("filterAllBtn");
    this.filterCreatorSpotlightBtn = document.getElementById("filterCreatorSpotlightBtn");
    this.filterQuizOnlyBtn = document.getElementById("filterQuizOnlyBtn");
    this.filterSavedOnlyBtn = document.getElementById("filterSavedOnlyBtn");

    // Create Modal
    this.createNuggetModal = document.getElementById("createNuggetModal");
    this.closeCreateModalBtn = document.getElementById("closeCreateModalBtn");
    this.createNuggetForm = document.getElementById("createNuggetForm");
    this.cancelCreateBtn = document.getElementById("cancelCreateBtn");

    // Saved Drawer
    this.savedDrawer = document.getElementById("savedDrawer");
    this.closeSavedDrawerBtn = document.getElementById("closeSavedDrawerBtn");
    this.savedCardsList = document.getElementById("savedCardsList");
    this.savedEmptyState = document.getElementById("savedEmptyState");

    // Comments Drawer
    this.commentsDrawer = document.getElementById("commentsDrawer");
    this.closeCommentsBtn = document.getElementById("closeCommentsBtn");
    this.commentsListContainer = document.getElementById("commentsListContainer");
    this.newCommentForm = document.getElementById("newCommentForm");
    this.newCommentText = document.getElementById("newCommentText");
    this.commentModalNuggetTitle = document.getElementById("commentModalNuggetTitle");

    // Story Modal
    this.storyModal = document.getElementById("storyModal");
    this.closeStoryBtn = document.getElementById("closeStoryBtn");
    this.storyPrevBtn = document.getElementById("storyPrevBtn");
    this.storyNextBtn = document.getElementById("storyNextBtn");
    this.storyReactBtn = document.getElementById("storyReactBtn");
    this.storyProgressFill = document.getElementById("storyProgressFill");
    this.storyViewerAvatar = document.getElementById("storyViewerAvatar");
    this.storyViewerName = document.getElementById("storyViewerName");
    this.storyGraphic = document.getElementById("storyGraphic");
    this.storyTitle = document.getElementById("storyTitle");
    this.storyContent = document.getElementById("storyContent");

    // Toast & Audio
    this.toastContainer = document.getElementById("toastContainer");
    this.audioPlayingBar = document.getElementById("audioPlayingBar");
    this.audioTitleText = document.getElementById("audioTitleText");
    this.stopAudioBtn = document.getElementById("stopAudioBtn");

    // Database Inspector Modal
    this.dbStatusPill = document.getElementById("dbStatusPill");
    this.dbViewerModal = document.getElementById("dbViewerModal");
    this.closeDbModalBtn = document.getElementById("closeDbModalBtn");
    this.dbRefreshBtn = document.getElementById("dbRefreshBtn");
    this.dbTabUsersBtn = document.getElementById("dbTabUsersBtn");
    this.dbTabNuggetsBtn = document.getElementById("dbTabNuggetsBtn");
    this.dbUsersTableWrap = document.getElementById("dbUsersTableWrap");
    this.dbNuggetsTableWrap = document.getElementById("dbNuggetsTableWrap");
    this.dbUsersTableBody = document.getElementById("dbUsersTableBody");
    this.dbNuggetsTableBody = document.getElementById("dbNuggetsTableBody");
    this.dbUsersCount = document.getElementById("dbUsersCount");
    this.dbNuggetsCount = document.getElementById("dbNuggetsCount");

    // Challenge
    this.startMiniChallengeBtn = document.getElementById("startMiniChallengeBtn");
    this.challengeAnswerReveal = document.getElementById("challengeAnswerReveal");
  }

  // --- Auth & Initial State Check ---
  checkInitialAuth() {
    const hasChosenAuth = localStorage.getItem("nugget_auth_chosen");
    if (hasChosenAuth === "true") {
      this.authModal.style.display = "none";
    } else {
      // Mandatory login & guest modal is shown
      this.authModal.style.display = "flex";
    }
  }

  // --- Event Listeners Initialization ---
  initEventListeners() {
    // 1. Mandatory Login & Guest Actions
    this.continueGuestBtn.addEventListener("click", async () => {
      try {
        const res = await fetch("/api/auth/guest", { method: "POST" });
        const data = await res.json();
        if (data.success && data.user) {
          this.currentUser = { ...data.user, isGuest: true };
        }
      } catch (e) {
        console.warn("Continuing in offline guest mode:", e);
      }
      this.saveUserSession();
      localStorage.setItem("nugget_auth_chosen", "true");
      this.authModal.style.display = "none";
      this.renderHeaderUserInfo();
      this.showToast("🚀 Welcome! Guest session recorded in Neon DB.");
    });

    this.tabLoginBtn.addEventListener("click", () => {
      this.tabLoginBtn.classList.add("active");
      this.tabRegisterBtn.classList.remove("active");
      this.loginForm.style.display = "flex";
      this.registerForm.style.display = "none";
    });

    this.tabRegisterBtn.addEventListener("click", () => {
      this.tabRegisterBtn.classList.add("active");
      this.tabLoginBtn.classList.remove("active");
      this.registerForm.style.display = "flex";
      this.loginForm.style.display = "none";
    });

    this.demoFillBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("loginEmail").value = "curious_mind@nugget.io";
      document.getElementById("loginPassword").value = "mastery2026";
      this.showToast("✨ Filled demo credentials (seeded in Neon DB)!");
    });

    // Login Form: Direct Neon DB Verification & Update
    this.loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      const submitBtn = document.getElementById("submitLoginBtn");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Checking Neon DB...</span>";

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.success && data.user) {
          this.currentUser = { ...data.user, isGuest: false };
          this.saveUserSession();
          localStorage.setItem("nugget_auth_chosen", "true");
          this.authModal.style.display = "none";
          this.renderHeaderUserInfo();
          this.updateVaultCounter();
          this.showToast(`🎉 Logged in as ${this.currentUser.name}! Verified in Neon DB.`);
        } else {
          this.showToast(`⚠️ ${data.error || "Login failed"}`);
        }
      } catch (err) {
        console.warn("Falling back to local session:", err);
        const userName = email.split("@")[0].replace(/[._]/g, " ");
        this.currentUser = {
          isGuest: false,
          name: userName.charAt(0).toUpperCase() + userName.slice(1),
          handle: `@${email.split("@")[0]}`,
          email: email,
          password: password,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          role: "Creator & Thinker",
          streak: 5,
          xp: 450,
          quizzesAced: 12,
          readCount: 19,
          sparksGiven: 48
        };
        this.saveUserSession();
        localStorage.setItem("nugget_auth_chosen", "true");
        this.authModal.style.display = "none";
        this.renderHeaderUserInfo();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });

    // Register Form: Direct Neon DB Insertion
    this.registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("regFullName").value.trim();
      const handle = document.getElementById("regHandle").value.trim().replace("@", "");
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value.trim();

      const submitBtn = this.registerForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Saving to Neon DB...</span>";

      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, handle, email, password })
        });
        const data = await res.json();
        if (data.success && data.user) {
          this.currentUser = { ...data.user, isGuest: false };
          this.saveUserSession();
          localStorage.setItem("nugget_auth_chosen", "true");
          this.authModal.style.display = "none";
          this.renderHeaderUserInfo();
          this.updateVaultCounter();
          this.showToast(`🌟 Account created & saved to Neon DB! Welcome, ${name}.`);
        } else {
          this.showToast(`⚠️ ${data.error || "Could not register user"}`);
        }
      } catch (err) {
        console.warn("Register network issue:", err);
        this.showToast("⚠️ Could not connect to database server.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });

    // Database Inspector Modal Controls
    if (this.dbStatusPill) {
      this.dbStatusPill.addEventListener("click", () => {
        this.openDbInspector();
      });
    }
    if (this.closeDbModalBtn) {
      this.closeDbModalBtn.addEventListener("click", () => {
        this.dbViewerModal.style.display = "none";
      });
    }
    if (this.dbRefreshBtn) {
      this.dbRefreshBtn.addEventListener("click", () => {
        this.fetchAndRenderDbInspector();
      });
    }
    if (this.dbTabUsersBtn) {
      this.dbTabUsersBtn.addEventListener("click", () => {
        this.dbTabUsersBtn.classList.add("active");
        this.dbTabNuggetsBtn.classList.remove("active");
        this.dbUsersTableWrap.style.display = "block";
        this.dbNuggetsTableWrap.style.display = "none";
      });
    }
    if (this.dbTabNuggetsBtn) {
      this.dbTabNuggetsBtn.addEventListener("click", () => {
        this.dbTabNuggetsBtn.classList.add("active");
        this.dbTabUsersBtn.classList.remove("active");
        this.dbNuggetsTableWrap.style.display = "block";
        this.dbUsersTableWrap.style.display = "none";
      });
    }

    // User Dropdown & Account Switching
    this.avatarMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = this.userDropdownMenu.style.display === "block";
      this.userDropdownMenu.style.display = isVisible ? "none" : "block";
    });

    document.addEventListener("click", () => {
      this.userDropdownMenu.style.display = "none";
      this.searchSuggestions.style.display = "none";
    });

    this.userDropdownMenu.addEventListener("click", (e) => e.stopPropagation());

    this.switchAccountBtn.addEventListener("click", () => {
      this.userDropdownMenu.style.display = "none";
      this.authModal.style.display = "flex";
    });

    this.logoutBtn.addEventListener("click", () => {
      this.userDropdownMenu.style.display = "none";
      localStorage.removeItem("nugget_auth_chosen");
      this.authModal.style.display = "flex";
      this.showToast("👋 Logged out. Choose guest or login credentials.");
    });

    // 2. Compulsory Search Bar Interactions
    this.globalSearchInput.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.clearSearchBtn.style.display = this.searchQuery ? "block" : "none";
      this.renderFeed();
    });

    this.globalSearchInput.addEventListener("focus", () => {
      this.searchSuggestions.style.display = "block";
    });

    this.clearSearchBtn.addEventListener("click", () => {
      this.globalSearchInput.value = "";
      this.searchQuery = "";
      this.clearSearchBtn.style.display = "none";
      this.renderFeed();
    });

    // Keyboard shortcut '/' to focus search
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== this.globalSearchInput && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        this.globalSearchInput.focus();
      }
    });

    // Suggestion chips
    document.querySelectorAll(".suggestion-chip").forEach(chip => {
      chip.addEventListener("click", (e) => {
        const query = e.target.dataset.search;
        this.globalSearchInput.value = query;
        this.searchQuery = query.toLowerCase();
        this.clearSearchBtn.style.display = "block";
        this.searchSuggestions.style.display = "none";
        this.renderFeed();
      });
    });

    // 3. Topics Taskbar Carousel Filters
    this.topicsTaskbar.addEventListener("click", (e) => {
      const pill = e.target.closest(".topic-pill");
      if (!pill) return;
      document.querySelectorAll(".topic-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const topic = pill.dataset.topic;
      if (topic === "creators") {
        this.activeTopic = "all";
        this.activeFilterSpecial = "creators";
      } else {
        this.activeTopic = topic;
        this.activeFilterSpecial = null;
      }
      this.renderFeed();
    });

    // 4. Feed Tab Switcher
    this.tabForYou.addEventListener("click", () => this.switchTab("for-you", this.tabForYou));
    this.tabTrending.addEventListener("click", () => this.switchTab("trending", this.tabTrending));
    this.tabLatest.addEventListener("click", () => this.switchTab("latest", this.tabLatest));

    // 5. Left Sidebar Quick Nav
    this.filterAllBtn.addEventListener("click", () => {
      this.setSpecialFilter(null, this.filterAllBtn);
    });
    this.filterCreatorSpotlightBtn.addEventListener("click", () => {
      this.setSpecialFilter("creators", this.filterCreatorSpotlightBtn);
    });
    this.filterQuizOnlyBtn.addEventListener("click", () => {
      this.setSpecialFilter("quiz-only", this.filterQuizOnlyBtn);
    });
    this.filterSavedOnlyBtn.addEventListener("click", () => {
      this.openSavedDrawer();
    });

    // 6. Creator Posting Modal
    this.openCreateModalBtn.addEventListener("click", () => {
      this.createNuggetModal.style.display = "flex";
    });
    this.closeCreateModalBtn.addEventListener("click", () => {
      this.createNuggetModal.style.display = "none";
    });
    this.cancelCreateBtn.addEventListener("click", () => {
      this.createNuggetModal.style.display = "none";
    });

    this.createNuggetForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handlePublishNugget();
    });

    // 7. Saved Drawer (Brain Vault)
    this.openSavedDrawerBtn.addEventListener("click", () => this.openSavedDrawer());
    this.closeSavedDrawerBtn.addEventListener("click", () => {
      this.savedDrawer.style.display = "none";
    });

    // 8. Comments Drawer
    this.closeCommentsBtn.addEventListener("click", () => {
      this.commentsDrawer.style.display = "none";
    });
    this.newCommentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handlePostComment();
    });

    // 9. Reset Filters
    this.resetFiltersBtn.addEventListener("click", () => {
      this.globalSearchInput.value = "";
      this.searchQuery = "";
      this.clearSearchBtn.style.display = "none";
      this.activeTopic = "all";
      this.activeFilterSpecial = null;
      document.querySelectorAll(".topic-pill").forEach(p => {
        p.classList.toggle("active", p.dataset.topic === "all");
      });
      this.renderFeed();
    });

    // 10. Stories Tray Clicks
    document.querySelectorAll(".story-circle-item").forEach(item => {
      item.addEventListener("click", () => {
        const storyId = item.dataset.storyId;
        if (!storyId) {
          // Add note prompt
          this.createNuggetModal.style.display = "flex";
          return;
        }
        const index = CONCEPT_STORIES.findIndex(s => s.id === storyId);
        if (index !== -1) {
          this.openStoryViewer(index);
        }
      });
    });

    this.closeStoryBtn.addEventListener("click", () => this.closeStoryViewer());
    this.storyPrevBtn.addEventListener("click", () => this.navStory(-1));
    this.storyNextBtn.addEventListener("click", () => this.navStory(1));
    this.storyReactBtn.addEventListener("click", () => {
      this.addXP(10);
      this.showToast("🔥 Mind Blown! +10 Brain XP earned.");
    });

    // 11. TTS Stop button
    this.stopAudioBtn.addEventListener("click", () => {
      this.stopTTS();
    });

    // 12. Daily Challenge Reveal
    this.startMiniChallengeBtn.addEventListener("click", () => {
      const isVisible = this.challengeAnswerReveal.style.display === "block";
      this.challengeAnswerReveal.style.display = isVisible ? "none" : "block";
      if (!isVisible) {
        this.addXP(15);
        this.showToast("⚡ Insight Unlocked! +15 Brain XP");
      }
    });

    // 13. Mobile Bottom Nav items
    const mobileHomeBtn = document.getElementById("mobileHomeBtn");
    if (mobileHomeBtn) {
      mobileHomeBtn.addEventListener("click", () => {
        this.globalSearchInput.value = "";
        this.searchQuery = "";
        this.clearSearchBtn.style.display = "none";
        this.activeTopic = "all";
        this.activeFilterSpecial = null;
        document.querySelectorAll(".topic-pill").forEach(p => p.classList.toggle("active", p.dataset.topic === "all"));
        document.querySelectorAll(".mobile-nav-btn").forEach(b => b.classList.remove("active"));
        mobileHomeBtn.classList.add("active");
        this.renderFeed();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    const mobileCreateBtn = document.getElementById("mobileCreateBtn");
    if (mobileCreateBtn) {
      mobileCreateBtn.addEventListener("click", () => {
        this.createNuggetModal.style.display = "flex";
      });
    }
    const mobileSavedBtn = document.getElementById("mobileSavedBtn");
    if (mobileSavedBtn) {
      mobileSavedBtn.addEventListener("click", () => {
        this.openSavedDrawer();
      });
    }
    const mobileSearchBtn = document.getElementById("mobileSearchBtn");
    if (mobileSearchBtn) {
      mobileSearchBtn.addEventListener("click", () => {
        this.globalSearchInput.focus();
      });
    }
    const mobileProfileBtn = document.getElementById("mobileProfileBtn");
    if (mobileProfileBtn) {
      mobileProfileBtn.addEventListener("click", () => {
        this.userDropdownMenu.style.display = "block";
      });
    }

    // 14. Brand Logo Click (Reset & Scroll Home)
    const brandLogoBtn = document.getElementById("brandLogoBtn");
    if (brandLogoBtn) {
      brandLogoBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.globalSearchInput.value = "";
        this.searchQuery = "";
        this.clearSearchBtn.style.display = "none";
        this.activeTopic = "all";
        this.activeFilterSpecial = null;
        document.querySelectorAll(".topic-pill").forEach(p => p.classList.toggle("active", p.dataset.topic === "all"));
        this.renderFeed();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // 15. Feed View Mode Toggle: Stream / Reel (Focus view)
    const modeToggleBtn = document.getElementById("modeToggleBtn");
    if (modeToggleBtn) {
      modeToggleBtn.addEventListener("click", () => {
        this.userDropdownMenu.style.display = "none";
        this.isReelMode = !this.isReelMode;
        if (this.isReelMode) {
          document.body.classList.add("reel-mode-active");
          this.showToast("📱 Reel View Activated: Focused 1-card mode!");
          const firstCard = document.querySelector(".nugget-card");
          if (firstCard) firstCard.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          document.body.classList.remove("reel-mode-active");
          this.showToast("📜 Stream View Activated: Standard continuous feed.");
        }
      });
    }

    // 16. Keyboard Navigation (ArrowDown / ArrowUp / J / K / Escape)
    window.addEventListener("keydown", (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;

      if (e.key === "ArrowDown" || e.key === "j" || e.key === "J") {
        e.preventDefault();
        this.scrollCardBy(1);
      } else if (e.key === "ArrowUp" || e.key === "k" || e.key === "K") {
        e.preventDefault();
        this.scrollCardBy(-1);
      } else if (e.key === "Escape") {
        if (this.savedDrawer) this.savedDrawer.style.display = "none";
        if (this.commentsDrawer) this.commentsDrawer.style.display = "none";
        if (this.storyModal) this.closeStoryViewer();
        if (this.createNuggetModal) this.createNuggetModal.style.display = "none";
        if (this.dbViewerModal) this.dbViewerModal.style.display = "none";
        if (this.userDropdownMenu) this.userDropdownMenu.style.display = "none";
        if (this.searchSuggestions) this.searchSuggestions.style.display = "none";
      }
    });

    // 17. Modal Backdrop Click Dismissers
    [this.savedDrawer, this.commentsDrawer, this.createNuggetModal, this.dbViewerModal, this.storyModal].forEach(modal => {
      if (!modal) return;
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
          if (modal === this.storyModal) this.closeStoryViewer();
        }
      });
    });
  }

  // --- Smooth Keyboard Card Navigator ---
  scrollCardBy(dir) {
    const cards = Array.from(document.querySelectorAll(".nugget-card"));
    if (cards.length === 0) return;
    const viewportMiddle = window.scrollY + window.innerHeight / 2;
    let closestIndex = 0;
    let minDiff = Infinity;
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardMiddle = window.scrollY + rect.top + rect.height / 2;
      const diff = Math.abs(cardMiddle - viewportMiddle);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    });
    const targetIndex = Math.max(0, Math.min(cards.length - 1, closestIndex + dir));
    cards[targetIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    cards[targetIndex].style.borderColor = "var(--accent-gold)";
    setTimeout(() => { cards[targetIndex].style.borderColor = ""; }, 1200);
  }

  // --- Header & Stats UI Update ---
  renderHeaderUserInfo() {
    document.getElementById("dropdownUserName").textContent = this.currentUser.name;
    document.getElementById("dropdownUserRole").textContent = this.currentUser.role;
    document.getElementById("sidebarUserName").textContent = this.currentUser.name;
    document.getElementById("sidebarUserHandle").textContent = this.currentUser.handle;
    document.getElementById("sidebarNuggetsLearned").textContent = this.currentUser.readCount;
    document.getElementById("sidebarSparksGiven").textContent = this.currentUser.sparksGiven;
    document.getElementById("sidebarQuizzesAced").textContent = this.currentUser.quizzesAced;

    this.streakCountText.textContent = `${this.currentUser.streak} Day Streak`;
    this.xpText.textContent = `${this.currentUser.xp} XP`;

    // Dynamic Avatars
    const headerAvatar = document.getElementById("headerUserAvatar");
    if (headerAvatar && this.currentUser.avatar) headerAvatar.src = this.currentUser.avatar;
    const sidebarAvatar = document.getElementById("sidebarAvatar");
    if (sidebarAvatar && this.currentUser.avatar) sidebarAvatar.src = this.currentUser.avatar;

    // Dynamic Anti-Doomscroll Meter
    const read = this.currentUser.readCount || 0;
    const timeSaved = Math.max(read * 3, 3);
    const timeElem = document.querySelector(".time-saved");
    if (timeElem) timeElem.textContent = `⏱️ ${timeSaved}m Saved`;

    const descElem = document.querySelector(".tracker-desc");
    if (descElem) {
      descElem.innerHTML = `You turned ${timeSaved} minutes of mindless scrolling into <strong>${read} permanent concepts</strong> learned today.`;
    }

    const targetNuggets = 10;
    const pct = Math.min(100, Math.round((read / targetNuggets) * 100));
    const barFill = document.querySelector(".progress-bar-fill");
    if (barFill) barFill.style.width = `${pct}%`;

    const captionElem = document.querySelector(".progress-caption");
    if (captionElem) {
      captionElem.textContent = `Daily Target: ${Math.min(read, targetNuggets)}/${targetNuggets} Nuggets (${pct}%)`;
    }
  }

  addXP(amount) {
    this.currentUser.xp += amount;
    this.saveUserSession();
    this.xpText.textContent = `${this.currentUser.xp} XP`;
  }

  // --- Filter Navigation Helpers ---
  switchTab(tabKey, element) {
    [this.tabForYou, this.tabTrending, this.tabLatest].forEach(tab => tab.classList.remove("active"));
    element.classList.add("active");
    this.activeTab = tabKey;
    this.renderFeed();
  }

  setSpecialFilter(filterType, element) {
    [this.filterAllBtn, this.filterCreatorSpotlightBtn, this.filterQuizOnlyBtn, this.filterSavedOnlyBtn].forEach(b => b.classList.remove("active"));
    element.classList.add("active");
    this.activeFilterSpecial = filterType;
    this.renderFeed();
  }

  renderTopicsCount() {
    const allCountElem = document.getElementById("count-all");
    if (allCountElem) allCountElem.textContent = this.nuggets.length;
  }

  updateVaultCounter() {
    const savedCount = this.nuggets.filter(n => n.userSaved).length;
    this.savedCounterBadge.textContent = savedCount;
    this.savedCountSide.textContent = savedCount;
  }

  // --- Feed Rendering Engine (Instagram-Style Vertical Cards) ---
  renderFeed() {
    let filtered = [...this.nuggets];

    // 1. Topic Filter
    if (this.activeTopic !== "all") {
      filtered = filtered.filter(n => n.topic.toLowerCase() === this.activeTopic.toLowerCase());
    }

    // 2. Special Filter
    if (this.activeFilterSpecial === "creators") {
      filtered = filtered.filter(n => n.creator && n.creator.verified);
    } else if (this.activeFilterSpecial === "quiz-only") {
      filtered = filtered.filter(n => n.quiz && n.quiz.question);
    } else if (this.activeFilterSpecial === "saved-only") {
      filtered = filtered.filter(n => n.userSaved);
    }

    // 3. Compulsory Search Bar Filter
    if (this.searchQuery) {
      filtered = filtered.filter(n => {
        const inTitle = (n.title || "").toLowerCase().includes(this.searchQuery);
        const inConcept = (n.coreConcept || "").toLowerCase().includes(this.searchQuery);
        const inTopic = (n.topicLabel || "").toLowerCase().includes(this.searchQuery);
        const inCreator = (n.creator && n.creator.name ? n.creator.name.toLowerCase() : "").includes(this.searchQuery) || 
                          (n.creator && n.creator.handle ? n.creator.handle.toLowerCase() : "").includes(this.searchQuery);
        const inTakeaways = n.takeaways && Array.isArray(n.takeaways) && n.takeaways.some(t => t.toLowerCase().includes(this.searchQuery));
        return inTitle || inConcept || inTopic || inCreator || inTakeaways;
      });
    }

    // 4. Tab Sorting
    if (this.activeTab === "trending") {
      filtered.sort((a, b) => b.sparks - a.sparks);
    } else if (this.activeTab === "latest") {
      // Latest drops first without mutating this.nuggets in place
      filtered = [...filtered].reverse();
    }

    // Empty state handling
    if (filtered.length === 0) {
      this.nuggetsFeed.innerHTML = "";
      this.emptyFeedCard.style.display = "block";
      this.emptyFeedMessage.textContent = this.searchQuery 
        ? `No nuggets match "${this.searchQuery}". Try exploring other topics or post your own!` 
        : `No nuggets in this category yet. Be the first creator to drop knowledge here!`;
      return;
    }

    this.emptyFeedCard.style.display = "none";
    this.nuggetsFeed.innerHTML = "";

    // Render cards
    filtered.forEach(nugget => {
      const card = this.createNuggetCardElement(nugget);
      this.nuggetsFeed.appendChild(card);
    });
  }

  createNuggetCardElement(nugget) {
    const card = document.createElement("article");
    card.className = "nugget-card";
    card.id = `card-${nugget.id}`;

    // Bullet takeaways HTML
    const takeawaysHTML = (Array.isArray(nugget.takeaways) ? nugget.takeaways : []).map(item => `
      <li class="takeaway-item">
        <span class="bullet-dot">⚡</span>
        <span>${item}</span>
      </li>
    `).join("");

    // Quiz HTML (safely render only if question and options exist)
    let quizHTML = "";
    if (nugget.quiz && nugget.quiz.question && Array.isArray(nugget.quiz.options) && nugget.quiz.options.length > 0) {
      const optionsHTML = nugget.quiz.options.map((opt, i) => `
        <button class="quiz-opt-btn" data-nugget-id="${nugget.id}" data-opt-index="${i}">
          <span class="opt-alpha">${String.fromCharCode(65 + i)}.</span>
          <span>${opt}</span>
        </button>
      `).join("");

      quizHTML = `
        <div class="nugget-quiz-box" id="quiz-box-${nugget.id}">
          <div class="quiz-header-toggle" title="Click to expand/collapse quiz">
            <div class="quiz-badge-wrap">
              <span>🎯 Test Your Memory</span>
              <span class="quiz-xp-badge">+10 XP</span>
            </div>
            <span class="quiz-arrow">▾</span>
          </div>
          <div class="quiz-content">
            <p class="quiz-question-text">${nugget.quiz.question}</p>
            <div class="quiz-options-group">
              ${optionsHTML}
            </div>
            <div class="quiz-feedback-banner" id="feedback-${nugget.id}" style="display: none;"></div>
          </div>
        </div>
      `;
    }

    // Determine if current user can delete this nugget (custom nuggets or creator's handle)
    const isOwner = nugget.id.startsWith("custom-") || (nugget.creator && nugget.creator.handle === this.currentUser.handle);
    const deleteBtnHTML = isOwner ? `
      <button class="delete-nugget-btn" data-id="${nugget.id}" title="Delete this custom nugget" aria-label="Delete nugget">
        🗑️
      </button>
    ` : '';

    const creatorAvatar = (nugget.creator && nugget.creator.avatar) || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
    const creatorName = (nugget.creator && nugget.creator.name) || "Curious Creator";
    const creatorHandle = (nugget.creator && nugget.creator.handle) || "@creator";
    const isVerified = nugget.creator && nugget.creator.verified;

    card.innerHTML = `
      <!-- Card Header -->
      <header class="card-header">
        <div class="creator-info">
          <div class="creator-avatar-wrap">
            <img src="${creatorAvatar}" alt="${creatorName}" class="creator-avatar">
          </div>
          <div class="creator-meta">
            <div class="creator-name-row">
              <span class="creator-name">${creatorName}</span>
              ${isVerified ? '<span class="verified-badge" title="Verified Creator">✓</span>' : ''}
            </div>
            <div class="creator-handle-row">
              <span>${creatorHandle}</span>
              <span>•</span>
              <span>${nugget.timestamp || 'Fresh Drop'}</span>
            </div>
          </div>
        </div>
        <div class="card-header-actions">
          ${deleteBtnHTML}
          <button class="follow-pill-btn" data-handle="${creatorHandle}">+ Follow</button>
        </div>
      </header>

      <!-- Visual Media Showcase -->
      <div class="card-visual-hero ${nugget.themeClass || 'theme-neon-quantum'}">
        <div class="card-topic-tag-row">
          <span class="card-topic-badge">${nugget.topicLabel || '💡 Concept'}</span>
          <span class="read-time-badge">⏱️ ${nugget.readTime || '45s read'}</span>
        </div>
        <div class="hero-concept-preview">
          <span class="hero-concept-icon">${nugget.heroIcon || '💡'}</span>
          <h2 class="hero-concept-title">${nugget.title}</h2>
        </div>
      </div>

      <!-- Card Body: Concept & Bullet Takeaways -->
      <div class="card-body">
        <p class="concept-explanation">${nugget.coreConcept || ''}</p>

        <div class="concept-takeaways">
          <div class="takeaways-heading">
            <span>✨ The 30-Second Bite</span>
          </div>
          <ul class="takeaway-list">
            ${takeawaysHTML}
          </ul>
        </div>

        <!-- Interactive Quiz -->
        ${quizHTML}
      </div>

      <!-- Card Actions Bar (Instagram style) -->
      <footer class="card-actions-bar">
        <div class="action-left-group">
          <!-- Spark / Like Button -->
          <button class="action-btn spark-btn ${nugget.userSparked ? 'sparked' : ''}" data-id="${nugget.id}" aria-label="Spark this concept">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span class="spark-count">${nugget.sparks || 0}</span>
          </button>

          <!-- Comment Button -->
          <button class="action-btn comment-btn" data-id="${nugget.id}" aria-label="Open Discussion">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>${nugget.comments ? nugget.comments.length : 0}</span>
          </button>

          <!-- Share Button -->
          <button class="action-btn share-btn" data-id="${nugget.id}" aria-label="Share Nugget">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>

        <div class="action-right-group">
          <!-- Text-to-Speech Listen Button -->
          <button class="tts-listen-btn" data-id="${nugget.id}">
            <span>🔊 Listen</span>
          </button>

          <!-- Bookmark / Save Button -->
          <button class="action-btn bookmark-btn ${nugget.userSaved ? 'saved' : ''}" data-id="${nugget.id}" aria-label="Save to Brain Vault">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </footer>
    `;

    // Attach card-level event listeners
    this.attachCardEventListeners(card, nugget);

    return card;
  }

  attachCardEventListeners(card, nugget) {
    // 1. Spark / Like
    const sparkBtn = card.querySelector(".spark-btn");
    sparkBtn.addEventListener("click", () => {
      nugget.userSparked = !nugget.userSparked;
      const delta = nugget.userSparked ? 1 : -1;
      nugget.sparks = Math.max(0, (nugget.sparks || 0) + delta);
      sparkBtn.classList.toggle("sparked", nugget.userSparked);
      sparkBtn.querySelector(".spark-count").textContent = nugget.sparks;

      // Track sparked items locally
      let sparkedIds = JSON.parse(localStorage.getItem("nugget_sparked_ids") || "[]");
      if (nugget.userSparked) {
        if (!sparkedIds.includes(nugget.id)) sparkedIds.push(nugget.id);
      } else {
        sparkedIds = sparkedIds.filter(id => id !== nugget.id);
      }
      localStorage.setItem("nugget_sparked_ids", JSON.stringify(sparkedIds));

      if (nugget.userSparked) {
        this.addXP(5);
        this.currentUser.sparksGiven = (this.currentUser.sparksGiven || 0) + 1;
        this.saveUserSession();
        this.renderHeaderUserInfo();
        this.showToast("⚡ Sparked! Concept boosted (+5 XP).");
      }
      this.saveNuggets();

      // Sync spark to Neon DB
      fetch(`/api/nuggets/${nugget.id}/spark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta })
      }).catch(() => {});
    });

    // 2. Bookmark / Save
    const bookmarkBtn = card.querySelector(".bookmark-btn");
    bookmarkBtn.addEventListener("click", () => {
      nugget.userSaved = !nugget.userSaved;
      bookmarkBtn.classList.toggle("saved", nugget.userSaved);

      // Track saved vault items locally
      let vaultIds = JSON.parse(localStorage.getItem("nugget_vault_ids") || "[]");
      if (nugget.userSaved) {
        if (!vaultIds.includes(nugget.id)) vaultIds.push(nugget.id);
      } else {
        vaultIds = vaultIds.filter(id => id !== nugget.id);
      }
      localStorage.setItem("nugget_vault_ids", JSON.stringify(vaultIds));
      this.currentUser.savedNuggetIds = vaultIds;

      this.updateVaultCounter();
      this.saveNuggets();
      this.saveUserSession();

      // Sync bookmark change directly into Neon DB users table
      fetch("/api/user/save-nugget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: this.currentUser.handle,
          nuggetId: nugget.id,
          isSaved: nugget.userSaved
        })
      }).catch(() => {});

      if (nugget.userSaved) {
        this.showToast("🔖 Saved to your Brain Vault (synced to Neon DB)!");
      } else {
        this.showToast("Removed from Brain Vault.");
      }
    });

    // 3. Comments Drawer Trigger
    const commentBtn = card.querySelector(".comment-btn");
    commentBtn.addEventListener("click", () => {
      this.openCommentsDrawer(nugget);
    });

    // 4. TTS Listen (rewards reading XP & increases read count in Neon DB)
    const ttsBtn = card.querySelector(".tts-listen-btn");
    ttsBtn.addEventListener("click", () => {
      this.playTTS(nugget);
      this.currentUser.readCount = (this.currentUser.readCount || 0) + 1;
      this.addXP(5);
      this.renderHeaderUserInfo();
      this.saveUserSession();
    });

    // 5. Share
    const shareBtn = card.querySelector(".share-btn");
    shareBtn.addEventListener("click", async () => {
      const shareUrl = window.location.href;
      const shareData = {
        title: `Nugget: ${nugget.title}`,
        text: `🧠 Learned "${nugget.title}" on Nugget: ${nugget.coreConcept || ''}`,
        url: shareUrl
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          this.showToast("🚀 Shared concept successfully!");
          return;
        } catch(err) {
          // Fallback to clipboard
        }
      }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${nugget.title} — Learned on Nugget: ${shareUrl}`);
        this.showToast("📋 Link copied to clipboard! Share with friends.");
      } else {
        this.showToast("💡 Shared concept to clipboard!");
      }
    });

    // 6. Follow Creator Pill
    const followBtn = card.querySelector(".follow-pill-btn");
    followBtn.addEventListener("click", () => {
      const isFollowing = followBtn.classList.contains("following");
      if (isFollowing) {
        followBtn.classList.remove("following");
        followBtn.textContent = "+ Follow";
      } else {
        followBtn.classList.add("following");
        followBtn.textContent = "Following ✓";
        const cName = (nugget.creator && nugget.creator.name) || "Creator";
        this.showToast(`Following ${cName}! You'll see their micro-lessons first.`);
      }
    });

    // 7. Delete Button (for custom / user-owned nuggets)
    const deleteBtn = card.querySelector(".delete-nugget-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        if (!confirm(`Are you sure you want to remove "${nugget.title}"?`)) return;
        this.nuggets = this.nuggets.filter(n => n.id !== nugget.id);
        this.saveNuggets();
        this.renderFeed();
        this.renderTopicsCount();
        this.showToast("🗑️ Nugget removed.");
        try {
          await fetch(`/api/nuggets/${nugget.id}`, { method: "DELETE" });
          this.fetchAndRenderDbInspector();
        } catch(err) {
          console.warn("Delete DB sync error:", err);
        }
      });
    }

    // 8. Quiz Accordion Toggle
    const quizToggle = card.querySelector(".quiz-header-toggle");
    if (quizToggle) {
      quizToggle.style.cursor = "pointer";
      quizToggle.addEventListener("click", () => {
        const content = card.querySelector(".quiz-content");
        const arrow = card.querySelector(".quiz-arrow");
        if (content) {
          const isHidden = content.style.display === "none";
          content.style.display = isHidden ? "block" : "none";
          if (arrow) arrow.textContent = isHidden ? "▾" : "▸";
        }
      });
    }

    // 9. Interactive Quiz handling
    const optButtons = card.querySelectorAll(".quiz-opt-btn");
    const feedbackBanner = card.querySelector(`#feedback-${nugget.id}`);

    if (nugget.quiz && optButtons.length > 0) {
      optButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const selectedIndex = parseInt(btn.dataset.optIndex, 10);
          const correctIndex = parseInt(nugget.quiz.correctIndex, 10);

          optButtons.forEach(b => b.disabled = true);

          if (selectedIndex === correctIndex) {
            btn.classList.add("correct");
            feedbackBanner.className = "quiz-feedback-banner success";
            feedbackBanner.innerHTML = `<strong>🎉 Nailed it!</strong> ${nugget.quiz.explanation || 'Correct answer!'} (+10 XP)`;
            feedbackBanner.style.display = "block";
            this.addXP(10);
            this.currentUser.quizzesAced = (this.currentUser.quizzesAced || 0) + 1;
            this.saveUserSession();
            this.renderHeaderUserInfo();
            this.showToast("🧠 Brain XP +10! Quiz aced.");
          } else {
            btn.classList.add("wrong");
            if (optButtons[correctIndex]) {
              optButtons[correctIndex].classList.add("correct");
            }
            feedbackBanner.className = "quiz-feedback-banner failure";
            feedbackBanner.innerHTML = `<strong>💡 Almost!</strong> ${nugget.quiz.explanation || 'Try reviewing the takeaways.'}`;
            feedbackBanner.style.display = "block";
          }
        });
      });
    }
  }

  // --- Creator Publishing Studio ---
  handlePublishNugget() {
    const title = document.getElementById("nuggetTitle").value.trim();
    const topic = document.getElementById("nuggetTopic").value;
    const readTime = document.getElementById("nuggetReadTime").value.trim() || "45s read";
    const coreConcept = document.getElementById("nuggetCoreConcept").value.trim();
    const t1 = document.getElementById("nuggetTakeaway1").value.trim();
    const t2 = document.getElementById("nuggetTakeaway2").value.trim();
    const t3 = document.getElementById("nuggetTakeaway3").value.trim();
    const themeChecked = document.querySelector('input[name="cardTheme"]:checked');
    const themeClass = themeChecked ? themeChecked.value : "theme-neon-quantum";

    // Optional Quiz
    const quizQ = document.getElementById("nuggetQuizQ").value.trim();
    const quizO1 = document.getElementById("nuggetQuizOpt1").value.trim();
    const quizO2 = document.getElementById("nuggetQuizOpt2").value.trim();
    const quizCorrect = parseInt(document.getElementById("nuggetQuizCorrect").value, 10);

    const takeaways = [t1];
    if (t2) takeaways.push(t2);
    if (t3) takeaways.push(t3);

    const topicLabels = {
      quantum: "⚛️ Quantum Physics",
      neuroscience: "🧠 Neuroscience",
      tech: "💻 Tech & Code",
      finance: "📈 Wealth & Models",
      space: "🌌 Astrophysics",
      psychology: "🧘 Psychology",
      history: "🏛️ Untold History",
      philosophy: "🕯️ Philosophy"
    };

    let quiz = null;
    if (quizQ && quizO1 && quizO2) {
      quiz = {
        question: quizQ,
        options: [quizO1, quizO2],
        correctIndex: quizCorrect,
        explanation: "Key intuition behind this concept."
      };
    }

    const newNugget = {
      id: `custom-${Date.now()}`,
      creator: {
        name: this.currentUser.name,
        handle: this.currentUser.handle,
        avatar: this.currentUser.avatar,
        verified: !this.currentUser.isGuest
      },
      topic: topic,
      topicLabel: topicLabels[topic] || "✨ Micro Knowledge",
      readTime: readTime,
      title: title,
      themeClass: themeClass,
      heroIcon: "🚀",
      coreConcept: coreConcept,
      takeaways: takeaways,
      quiz: quiz,
      sparks: 1,
      userSparked: true,
      userSaved: false,
      timestamp: "Just now",
      comments: []
    };

    // Prepend to feed
    this.nuggets.unshift(newNugget);
    this.saveNuggets();

    // Persist asynchronously to Neon PostgreSQL
    fetch("/api/nuggets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNugget)
    }).then(res => res.json()).then(() => {
      this.updateDbStatus(true, this.nuggets.length);
    }).catch(err => {
      console.warn("Neon DB sync pending:", err);
    });

    // Reward user
    this.addXP(30);
    this.currentUser.readCount += 1;
    this.saveUserSession();
    this.renderHeaderUserInfo();
    this.renderTopicsCount();

    // Reset & close modal
    this.createNuggetForm.reset();
    this.createNuggetModal.style.display = "none";

    // Re-render feed at top
    this.activeTopic = "all";
    document.querySelectorAll(".topic-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.topic === "all");
    });
    this.renderFeed();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.showToast("🚀 Nugget Published & Saved to Neon DB! +30 XP.");
  }

  // --- Saved Vault Drawer ---
  openSavedDrawer() {
    const saved = this.nuggets.filter(n => n.userSaved);
    this.savedCardsList.innerHTML = "";

    if (saved.length === 0) {
      this.savedEmptyState.style.display = "block";
    } else {
      this.savedEmptyState.style.display = "none";
      saved.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.className = "saved-item-card";
        itemCard.innerHTML = `
          <div class="saved-item-topic">${item.topicLabel}</div>
          <h4 class="saved-item-title">${item.title}</h4>
          <div class="saved-item-footer">
            <span>By ${item.creator.name}</span>
            <span>⏱️ ${item.readTime}</span>
          </div>
        `;
        itemCard.addEventListener("click", () => {
          this.savedDrawer.style.display = "none";
          const cardElem = document.getElementById(`card-${item.id}`);
          if (cardElem) {
            cardElem.scrollIntoView({ behavior: "smooth", block: "center" });
            cardElem.style.borderColor = "var(--accent-gold)";
            setTimeout(() => cardElem.style.borderColor = "", 2000);
          }
        });
        this.savedCardsList.appendChild(itemCard);
      });
    }

    this.savedDrawer.style.display = "flex";
  }

  // --- Comments Drawer Engine ---
  openCommentsDrawer(nugget) {
    this.activeCommentNuggetId = nugget.id;
    this.commentModalNuggetTitle.textContent = nugget.title;
    this.renderCommentsList(nugget);
    this.commentsDrawer.style.display = "flex";
  }

  renderCommentsList(nugget) {
    this.commentsListContainer.innerHTML = "";
    if (!nugget.comments || nugget.comments.length === 0) {
      this.commentsListContainer.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 2rem 0;">
          No thoughts shared yet. Be the first to spark a discussion!
        </div>
      `;
      return;
    }

    nugget.comments.forEach(c => {
      const row = document.createElement("div");
      row.className = "comment-row";
      row.innerHTML = `
        <img src="${c.avatar}" alt="${c.author}" class="comment-avatar">
        <div class="comment-body">
          <div class="comment-author">${c.author}</div>
          <div class="comment-text">${c.text}</div>
        </div>
      `;
      this.commentsListContainer.appendChild(row);
    });
  }

  handlePostComment() {
    const text = this.newCommentText.value.trim();
    if (!text || !this.activeCommentNuggetId) return;

    const nugget = this.nuggets.find(n => n.id === this.activeCommentNuggetId);
    if (nugget) {
      if (!nugget.comments) nugget.comments = [];
      nugget.comments.push({
        author: this.currentUser.name,
        avatar: this.currentUser.avatar,
        text: text
      });
      this.saveNuggets();
      this.renderCommentsList(nugget);
      this.newCommentText.value = "";
      this.addXP(5);
      this.showToast("💬 Comment posted! +5 Brain XP.");

      // Sync comment to Neon DB
      fetch(`/api/nuggets/${nugget.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: this.currentUser.name,
          avatar: this.currentUser.avatar,
          text: text
        })
      }).catch(() => {});

      // Update count on card
      const card = document.getElementById(`card-${nugget.id}`);
      if (card) {
        const commentCountElem = card.querySelector(".comment-btn span");
        if (commentCountElem) commentCountElem.textContent = nugget.comments.length;
      }
    }
  }

  // --- Instagram Stories Viewer Engine ---
  openStoryViewer(index) {
    this.activeStoryIndex = index;
    this.renderCurrentStory();
    this.storyModal.style.display = "flex";
  }

  renderCurrentStory() {
    const story = CONCEPT_STORIES[this.activeStoryIndex];
    if (!story) return;

    this.storyViewerAvatar.src = story.avatar;
    this.storyViewerName.textContent = story.author;
    this.storyGraphic.textContent = story.graphic;
    this.storyTitle.textContent = story.title;
    this.storyContent.textContent = story.content;

    // Reset progress animation
    this.storyProgressFill.style.transition = "none";
    this.storyProgressFill.style.width = "0%";
    clearTimeout(this.storyTimer);

    setTimeout(() => {
      this.storyProgressFill.style.transition = "width 6s linear";
      this.storyProgressFill.style.width = "100%";
    }, 50);

    // Auto advance after 6s
    this.storyTimer = setTimeout(() => {
      this.navStory(1);
    }, 6050);
  }

  navStory(dir) {
    const newIndex = this.activeStoryIndex + dir;
    if (newIndex >= 0 && newIndex < CONCEPT_STORIES.length) {
      this.activeStoryIndex = newIndex;
      this.renderCurrentStory();
    } else {
      this.closeStoryViewer();
    }
  }

  closeStoryViewer() {
    clearTimeout(this.storyTimer);
    this.storyModal.style.display = "none";
  }

  // --- Text-to-Speech (TTS Audio Reader) ---
  playTTS(nugget) {
    if (!('speechSynthesis' in window)) {
      this.showToast("⚠️ Speech Synthesis is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const speechText = `${nugget.title}. ${nugget.coreConcept}. Key takeaways: ${nugget.takeaways.join(". ")}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    this.audioPlayingBar.style.display = "flex";
    this.audioTitleText.textContent = `Reading: "${nugget.title.slice(0, 35)}..."`;

    utterance.onend = () => {
      this.audioPlayingBar.style.display = "none";
    };
    utterance.onerror = () => {
      this.audioPlayingBar.style.display = "none";
    };

    window.speechSynthesis.speak(utterance);
    this.showToast("🔊 Reading nugget aloud for hands-free learning!");
  }

  stopTTS() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.audioPlayingBar.style.display = "none";
  }

  // --- Sidebar Creators Showcase ---
  renderTopCreators() {
    const creators = [
      { name: "Dr. Elena Vance", field: "Neurobiology", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80", count: "48 Nuggets" },
      { name: "Arjun Mehta", field: "Theoretical Physics", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", count: "32 Nuggets" },
      { name: "Sophia Sterling", field: "AI Architecture", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", count: "61 Nuggets" },
      { name: "Tariq Al-Mansoor", field: "Mental Models", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80", count: "29 Nuggets" }
    ];

    this.creatorList.innerHTML = creators.map(c => `
      <div class="creator-row-item" data-creator="${c.name}">
        <div class="creator-row-left">
          <img src="${c.avatar}" alt="${c.name}" class="creator-row-avatar">
          <div class="creator-row-names">
            <span class="creator-row-name">${c.name}</span>
            <span class="creator-row-field">${c.field} • ${c.count}</span>
          </div>
        </div>
        <button class="btn-mini-follow">+ Follow</button>
      </div>
    `).join("");

    this.creatorList.querySelectorAll(".creator-row-item").forEach(item => {
      const creatorName = item.dataset.creator;
      item.style.cursor = "pointer";
      item.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-mini-follow")) return;
        this.globalSearchInput.value = creatorName;
        this.searchQuery = creatorName.toLowerCase();
        this.clearSearchBtn.style.display = "block";
        this.renderFeed();
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.showToast(`🔍 Showing all nuggets by ${creatorName}`);
      });
    });

    this.creatorList.querySelectorAll(".btn-mini-follow").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (btn.textContent === "+ Follow") {
          btn.textContent = "Following";
          btn.style.background = "var(--accent-gold)";
          btn.style.color = "var(--text-dark)";
        } else {
          btn.textContent = "+ Follow";
          btn.style.background = "";
          btn.style.color = "";
        }
      });
    });
  }

  // --- Toast Notifications ---
  showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  window.nuggetApp = new NuggetApp();
});
