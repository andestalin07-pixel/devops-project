import os
import re
import sys
import json
import urllib.request
import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

load_dotenv()

app = Flask(__name__, static_folder=".")
CORS(app)

DATABASE_URL = os.getenv("DATABASE_URL")
_CACHED_IP = None

def get_db_connection():
    """Connect to Neon PostgreSQL with automatic DNS fallback if system DNS is restricted."""
    global _CACHED_IP
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL not found in .env file!")

    try:
        # First try normal connection string
        return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    except psycopg2.OperationalError as e:
        err_msg = str(e)
        if "could not translate host name" in err_msg or "Name or service not known" in err_msg:
            # Automatic DNS fallback using Google DoH
            if not _CACHED_IP:
                m = re.search(r'@([^:/]+)', DATABASE_URL)
                host = m.group(1) if m else "c-3.ap-southeast-1.aws.neon.tech"
                req = urllib.request.Request(
                    f"https://dns.google/resolve?name={host}&type=A",
                    headers={"User-Agent": "NuggetNeonClient/1.0"}
                )
                with urllib.request.urlopen(req, timeout=5) as res:
                    data = json.loads(res.read().decode())
                    answers = [a["data"] for a in data.get("Answer", []) if a["type"] == 1]
                    if answers:
                        _CACHED_IP = answers[0]
                    else:
                        _CACHED_IP = "52.76.128.157" # Neon ap-southeast-1 backup

            sep = "&" if "?" in DATABASE_URL else "?"
            return psycopg2.connect(f"{DATABASE_URL}{sep}hostaddr={_CACHED_IP}", cursor_factory=RealDictCursor)
        raise

SEED_NUGGETS = [
    {
        "id": "nugget-1",
        "creator": {
            "name": "Dr. Elena Vance",
            "handle": "@elenavance_neuro",
            "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
            "verified": True
        },
        "topic": "neuroscience",
        "topicLabel": "🧠 Neuroscience",
        "readTime": "45s read",
        "title": "The Dopamine Prediction Error: Why Anticipation Feels Better Than the Reward",
        "themeClass": "theme-brain-purple",
        "heroIcon": "⚡",
        "coreConcept": "Your brain does not release peak dopamine when you actually get what you desire. It surges in the exact moment of unexpected possibility. Once an outcome is 100% guaranteed, dopamine flatlines.",
        "takeaways": [
            "Dopamine is the molecule of pursuit, anticipation, and craving — not satisfaction.",
            "Variable rewards (like slot machines and social feeds) hijack this circuit because outcomes remain unpredictable.",
            "To stay motivated on hard goals, celebrate unexpected tiny micro-wins along the path."
        ],
        "quiz": {
            "question": "When does the highest surge of dopamine occur in the brain?",
            "options": [
                "Right after you consume or enjoy the reward",
                "During the unexpected anticipation of the reward",
                "When an outcome is completely guaranteed and predictable"
            ],
            "correctIndex": 1,
            "explanation": "Neuroscience shows dopamine spikes highest in the anticipation phase, especially when there is variable uncertainty."
        },
        "sparks": 1420,
        "comments": [
            { "author": "Marcus K.", "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80", "text": "This explains why waiting for a package is often more exciting than opening it!" },
            { "author": "Sonia Reed", "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80", "text": "Brilliant insight. Re-orienting my habit routines around this right now." }
        ]
    },
    {
        "id": "nugget-2",
        "creator": {
            "name": "Arjun Mehta",
            "handle": "@arjun_quantum",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            "verified": True
        },
        "topic": "quantum",
        "topicLabel": "⚛️ Quantum Physics",
        "readTime": "50s read",
        "title": "Quantum Tunneling: How Particles Teleport Through Solid Energy Walls",
        "themeClass": "theme-neon-quantum",
        "heroIcon": "🌌",
        "coreConcept": "In classical physics, a tennis ball cannot bounce through a brick wall without enough energy. In quantum mechanics, particles exist as wave probability clouds. Part of the wave extends right through the barrier, allowing particles to magically materialize on the other side.",
        "takeaways": [
            "Without quantum tunneling, the Sun wouldn't shine — protons tunnel to trigger nuclear fusion.",
            "The flash memory and SSD inside your smartphone rely on tunneling electrons through insulators.",
            "Even your DNA relies on proton tunneling for spontaneous enzyme mutations."
        ],
        "quiz": {
            "question": "Which of everyday technologies depends directly on quantum tunneling?",
            "options": [
                "Mechanical wristwatches",
                "Flash memory chips (SSDs) and USB drives",
                "Incandescent light bulbs"
            ],
            "correctIndex": 1,
            "explanation": "NAND flash drives write data by forcing electrons to tunnel through an insulating barrier into a floating gate."
        },
        "sparks": 2840,
        "comments": [
            { "author": "Kai Chen", "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80", "text": "The fact that the Sun would literally turn cold without this is wild." }
        ]
    },
    {
        "id": "nugget-3",
        "creator": {
            "name": "Sophia Sterling",
            "handle": "@sophia_arch",
            "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            "verified": True
        },
        "topic": "tech",
        "topicLabel": "💻 Tech & Code",
        "readTime": "40s read",
        "title": "How Transformer Self-Attention Understands Context Better Than Humans",
        "themeClass": "theme-code-cyber",
        "heroIcon": "🤖",
        "coreConcept": "In the sentence 'The animal didn't cross the street because it was too tired', what does 'it' refer to? Prior algorithms struggled. Self-attention calculates mathematical affinity scores between every single word and every other word concurrently.",
        "takeaways": [
            "Instead of reading sequentially word-by-word, attention looks at the whole paragraph simultaneously.",
            "Words project into Query, Key, and Value vectors to weigh contextual relationships.",
            "This single architecture shift in 2017 unlocked modern LLMs like ChatGPT and Gemini."
        ],
        "quiz": {
            "question": "What makes self-attention superior to sequential recurrent networks (RNNs)?",
            "options": [
                "It can process all tokens in parallel and map long-distance dependencies",
                "It consumes zero computer memory",
                "It requires zero training data"
            ],
            "correctIndex": 0,
            "explanation": "Self-attention processes whole sequence tokens simultaneously with matrix operations instead of sequential step-by-step loops."
        },
        "sparks": 3190,
        "comments": [
            { "author": "Devon R.", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", "text": "Attention Is All You Need in under 60 seconds. Love this!" }
        ]
    },
    {
        "id": "nugget-4",
        "creator": {
            "name": "Tariq Al-Mansoor",
            "handle": "@tariq_models",
            "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
            "verified": True
        },
        "topic": "finance",
        "topicLabel": "📈 Finance & Mental Models",
        "readTime": "45s read",
        "title": "The Lindy Effect: Why the Oldest Ideas Will Outlive Modern Trends",
        "themeClass": "theme-amber-gold",
        "heroIcon": "⏳",
        "coreConcept": "For perishable things (like fruits or humans), every day alive decreases remaining life expectancy. But for non-perishable ideas, books, and technologies, every additional year of survival doubles their expected future life.",
        "takeaways": [
            "A book that has been in print for 100 years is mathematically expected to remain in print for another 100.",
            "A tech hype that is 6 months old will likely be forgotten in 6 months.",
            "Filter your reading: prioritize ideas that have withstood decades over tweets from this morning."
        ],
        "quiz": {
            "question": "According to the Lindy Effect, which idea is most likely to be relevant in 100 years?",
            "options": [
                "The latest productivity app released last Tuesday",
                "Stoic philosophy from Marcus Aurelius (2,000 years old)",
                "A trending meme format from last month"
            ],
            "correctIndex": 1,
            "explanation": "Having already survived 20 centuries, Stoic philosophy has demonstrated extraordinary robustness under the Lindy Effect."
        },
        "sparks": 1890,
        "comments": [
            { "author": "Nora F.", "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", "text": "This completely changed how I pick which books to buy." }
        ]
    },
    {
        "id": "nugget-5",
        "creator": {
            "name": "Dr. Maya Lin",
            "handle": "@mayalin_cosmos",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            "verified": True
        },
        "topic": "space",
        "topicLabel": "🌌 Astrophysics",
        "readTime": "55s read",
        "title": "The Fermi Paradox: Where Are All The Alien Civilizations?",
        "themeClass": "theme-neon-quantum",
        "heroIcon": "🛸",
        "coreConcept": "There are roughly 100,000,000,000 stars in our galaxy, and billions are billions of years older than our Sun. Even with slow interstellar travel, any advanced civilization could colonize the entire galaxy within a few million years. So why is the night sky utterly silent?",
        "takeaways": [
            "The Great Filter hypothesis: Life encounters an almost impossible evolutionary barrier.",
            "Zoo hypothesis: They know we exist and are intentionally keeping Earth isolated as an untouched nature reserve.",
            "We may be among the very first conscious beings to awaken in the cosmic timeline."
        ],
        "quiz": {
            "question": "What is the 'Great Filter' in the context of the Fermi Paradox?",
            "options": [
                "A giant asteroid belt that blocks alien signals",
                "A monumental evolutionary hurdle or extinction event that stops life from becoming interstellar",
                "A telescope filter used by NASA to clean planetary imagery"
            ],
            "correctIndex": 1,
            "explanation": "The Great Filter is the statistical wall that life struggles or fails to cross before becoming an advanced galactic civilization."
        },
        "sparks": 4120,
        "comments": [
            { "author": "Liam Vance", "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", "text": "The thought that we might be the first is even more terrifying than being alone." }
        ]
    },
    {
        "id": "nugget-6",
        "creator": {
            "name": "Prof. Lucian Wright",
            "handle": "@lucian_history",
            "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
            "verified": False
        },
        "topic": "history",
        "topicLabel": "🏛️ Untold History",
        "readTime": "45s read",
        "title": "The Antikythera Mechanism: A 2,000-Year-Old Greek Analog Computer",
        "themeClass": "theme-amber-gold",
        "heroIcon": "⚙️",
        "coreConcept": "Recovered from a Greek shipwreck in 1901, this corroded bronze device contained over 30 precision bronze gears. Built around 100 BC, it calculated eclipses, planetary orbits, and Olympic calendar dates with mechanical accuracy unseen again until the 14th century.",
        "takeaways": [
            "Proves ancient Hellenistic mechanics were over a millennium ahead of what historians believed.",
            "Features differential gearing, previously thought to be invented in the Renaissance.",
            "Reveals that human technological progress is not linear — entire civilizations lost master technologies."
        ],
        "quiz": {
            "question": "What was the primary function of the Antikythera Mechanism?",
            "options": [
                "A weapon for firing arrows at naval targets",
                "An astronomical calendar and predictive analog computer for celestial cycles",
                "A scale for measuring trade gold"
            ],
            "correctIndex": 1,
            "explanation": "It computed astronomical positions, moon phases, and solar eclipses using precision gear trains."
        },
        "sparks": 2150,
        "comments": []
    },
    {
        "id": "nugget-7",
        "creator": {
            "name": "Clara Zheng",
            "handle": "@clara_mind",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            "verified": True
        },
        "topic": "psychology",
        "topicLabel": "🧘 Psychology & Habits",
        "readTime": "35s read",
        "title": "Implementation Intentions: The 2x Habit Success Formula",
        "themeClass": "theme-brain-purple",
        "heroIcon": "🎯",
        "coreConcept": "Saying 'I want to read more' or 'I will study code' fails over 80% of the time. Psychology studies by Peter Gollwitzer discovered that structuring habits as 'When Situation X arrives, I will perform Action Y at Location Z' doubles success rates instantly.",
        "takeaways": [
            "It transfers mental control from conscious willpower to environmental triggers.",
            "Example: 'When I pour my morning coffee at 7:30 AM, I will open Nugget for 3 minutes at the kitchen table.'",
            "Decision fatigue is eliminated because you no longer debate when or where to start."
        ],
        "quiz": {
            "question": "Why do 'Implementation Intentions' dramatically improve habit consistency?",
            "options": [
                "They use guilt to force actions",
                "They link the behavior to a specific environmental trigger, removing debate and decision fatigue",
                "They require expensive habit tracking gear"
            ],
            "correctIndex": 1,
            "explanation": "By pairing time and location cues, your brain pre-computes the trigger, automating execution."
        },
        "sparks": 3750,
        "comments": []
    },
    {
        "id": "nugget-8",
        "creator": {
            "name": "Oliver Thorne",
            "handle": "@oliver_philo",
            "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
            "verified": True
        },
        "topic": "philosophy",
        "topicLabel": "🕯️ Deep Philosophy",
        "readTime": "50s read",
        "title": "The Ship of Theseus: If Every Cell in You Replaces Itself, Who Are You?",
        "themeClass": "theme-code-cyber",
        "heroIcon": "⛵",
        "coreConcept": "A wooden ship sails for 100 years. As wooden planks rot, they are replaced one by one. Eventually, zero original planks remain. Is it still the same ship? If someone collected the discarded rotted planks and reassembled them, which one is the true ship?",
        "takeaways": [
            "Every 7 to 10 years, almost every cell in your biological body is replaced.",
            "Identity is not found in static physical matter; it is an enduring continuous pattern through time.",
            "This paradox is now central to AI and digital mind uploading debates."
        ],
        "quiz": {
            "question": "What core truth does the Ship of Theseus paradox illustrate?",
            "options": [
                "Boats should always be made of steel",
                "Identity is an ongoing organizational pattern rather than a permanent pile of static matter",
                "Cells never regenerate in living bodies"
            ],
            "correctIndex": 1,
            "explanation": "Matter changes constantly; continuity of form, memory, and relation defines identity."
        },
        "sparks": 2980,
        "comments": []
    }
]

def init_db():
    """Initializes tables and seeds initial educational nuggets if empty."""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            # 1. Nuggets table
            cur.execute("""
                CREATE TABLE IF NOT EXISTS nuggets (
                    id VARCHAR(64) PRIMARY KEY,
                    topic VARCHAR(64),
                    topic_label VARCHAR(100),
                    read_time VARCHAR(32),
                    title TEXT NOT NULL,
                    theme_class VARCHAR(64),
                    hero_icon VARCHAR(16),
                    core_concept TEXT,
                    takeaways JSONB DEFAULT '[]'::jsonb,
                    quiz JSONB DEFAULT '{}'::jsonb,
                    sparks INT DEFAULT 0,
                    creator JSONB DEFAULT '{}'::jsonb,
                    comments JSONB DEFAULT '[]'::jsonb,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            """)

            # 2. Users table (stores login details, credentials & live learner stats)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    handle VARCHAR(64) PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(255),
                    password VARCHAR(255),
                    avatar TEXT,
                    role VARCHAR(64) DEFAULT 'Learner',
                    streak INT DEFAULT 1,
                    xp INT DEFAULT 100,
                    quizzes_aced INT DEFAULT 0,
                    read_count INT DEFAULT 0,
                    sparks_given INT DEFAULT 0,
                    saved_nugget_ids JSONB DEFAULT '[]'::jsonb,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
                ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255);
                ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);
                ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
                ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW();
            """)

            # Seed demo user credentials into Neon DB if not present
            cur.execute("""
                INSERT INTO users (
                    handle, name, email, password, avatar, role, streak, xp,
                    quizzes_aced, read_count, sparks_given, saved_nugget_ids, created_at, last_login
                ) VALUES (
                    '@curious_mind', 'Curious Mind', 'curious_mind@nugget.io', 'mastery2026',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                    'Creator & Thinker', 5, 450, 12, 19, 48, '[]'::jsonb, NOW(), NOW()
                ) ON CONFLICT (handle) DO UPDATE SET
                    email = EXCLUDED.email,
                    password = EXCLUDED.password;
            """)
            conn.commit()

            # Check if nuggets table is empty, seed with initial rich dataset
            cur.execute("SELECT COUNT(*) AS count FROM nuggets;")
            count = cur.fetchone()["count"]
            if count == 0:
                print("[*] Seeding Neon PostgreSQL with initial educational nuggets...")
                for item in SEED_NUGGETS:
                    cur.execute("""
                        INSERT INTO nuggets (
                            id, topic, topic_label, read_time, title,
                            theme_class, hero_icon, core_concept,
                            takeaways, quiz, sparks, creator, comments
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        ON CONFLICT (id) DO NOTHING;
                    """, (
                        item["id"],
                        item["topic"],
                        item["topicLabel"],
                        item["readTime"],
                        item["title"],
                        item["themeClass"],
                        item["heroIcon"],
                        item["coreConcept"],
                        json.dumps(item["takeaways"]),
                        json.dumps(item["quiz"]),
                        item["sparks"],
                        json.dumps(item["creator"]),
                        json.dumps(item["comments"])
                    ))
                conn.commit()
                print(f"[+] Successfully seeded {len(SEED_NUGGETS)} nuggets into Neon DB!")
            else:
                print(f"[*] Neon DB already contains {count} nuggets.")

    print("[+] Neon PostgreSQL initialized and verified.")

def safe_json_parse(val, default=None):
    """Safely parse JSON values that could be Python dict/list, None, or string."""
    if val is None:
        return default
    if isinstance(val, (dict, list)):
        return val
    if isinstance(val, str):
        val = val.strip()
        if not val or val.lower() == "null":
            return default
        try:
            return json.loads(val)
        except Exception:
            return default
    return default

def format_user_row(row):
    """Formats a user database row into a clean JSON-serializable dictionary."""
    if not row:
        return None
    saved_ids = safe_json_parse(row.get("saved_nugget_ids"), [])
    if not isinstance(saved_ids, list):
        saved_ids = []

    return {
        "handle": row["handle"],
        "name": row["name"],
        "email": row.get("email") or "",
        "password": row.get("password") or "",
        "avatar": row.get("avatar") or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        "role": row.get("role") or "Learner Pass",
        "streak": row.get("streak") or 1,
        "xp": row.get("xp") or 0,
        "quizzesAced": row.get("quizzes_aced") or 0,
        "readCount": row.get("read_count") or 0,
        "sparksGiven": row.get("sparks_given") or 0,
        "savedNuggetIds": saved_ids,
        "createdAt": row["created_at"].strftime("%Y-%m-%d %H:%M:%S") if row.get("created_at") else "",
        "lastLogin": row["last_login"].strftime("%Y-%m-%d %H:%M:%S") if row.get("last_login") else ""
    }

# ==========================================
# REST API ENDPOINTS
# ==========================================

@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint to test connection to Neon DB."""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT version();")
                pg_version = cur.fetchone()["version"]
                cur.execute("SELECT COUNT(*) AS total FROM nuggets;")
                total = cur.fetchone()["total"]
                return jsonify({
                    "status": "connected",
                    "database": "Neon PostgreSQL",
                    "total_nuggets": total,
                    "version": pg_version
                })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/api/nuggets", methods=["GET"])
def get_nuggets():
    """Fetch all nuggets ordered by creation time."""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM nuggets ORDER BY created_at DESC;")
                rows = cur.fetchall()
                results = []
                for row in rows:
                    raw_quiz = safe_json_parse(row.get("quiz"), None)
                    # Normalize empty quiz to None so frontend handles cleanly
                    quiz_obj = raw_quiz if (isinstance(raw_quiz, dict) and raw_quiz.get("question")) else None

                    results.append({
                        "id": row["id"],
                        "topic": row["topic"] or "science",
                        "topicLabel": row["topic_label"] or "💡 Concept",
                        "readTime": row["read_time"] or "45s read",
                        "title": row["title"],
                        "themeClass": row["theme_class"] or "theme-neon-quantum",
                        "heroIcon": row["hero_icon"] or "💡",
                        "coreConcept": row["core_concept"] or "",
                        "takeaways": safe_json_parse(row.get("takeaways"), []),
                        "quiz": quiz_obj,
                        "sparks": row["sparks"] or 0,
                        "creator": safe_json_parse(row.get("creator"), {}),
                        "comments": safe_json_parse(row.get("comments"), []),
                        "timestamp": row["created_at"].strftime("%b %d, %Y") if row.get("created_at") else "Recently"
                    })
                return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/nuggets", methods=["POST"])
def create_nugget():
    """Publish a newly crafted nugget from Creator Studio into Neon DB."""
    data = request.get_json(silent=True) or {}
    if not data or not data.get("title"):
        return jsonify({"error": "Missing nugget title or payload"}), 400

    quiz_val = data.get("quiz")
    quiz_json = json.dumps(quiz_val) if (quiz_val and isinstance(quiz_val, dict) and quiz_val.get("question")) else None

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO nuggets (
                        id, topic, topic_label, read_time, title,
                        theme_class, hero_icon, core_concept,
                        takeaways, quiz, sparks, creator, comments
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (id) DO UPDATE SET
                        title = EXCLUDED.title,
                        core_concept = EXCLUDED.core_concept,
                        takeaways = EXCLUDED.takeaways,
                        quiz = EXCLUDED.quiz;
                """, (
                    data["id"],
                    data.get("topic", "science"),
                    data.get("topicLabel", "💡 Concept"),
                    data.get("readTime", "45s read"),
                    data["title"],
                    data.get("themeClass", "theme-neon-quantum"),
                    data.get("heroIcon", "🚀"),
                    data.get("coreConcept", ""),
                    json.dumps(data.get("takeaways", [])),
                    quiz_json,
                    data.get("sparks", 1),
                    json.dumps(data.get("creator", {})),
                    json.dumps(data.get("comments", []))
                ))
                conn.commit()
        return jsonify({"success": True, "id": data["id"]}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/nuggets/<nugget_id>", methods=["DELETE"])
def delete_nugget(nugget_id):
    """Delete a nugget from Neon DB."""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM nuggets WHERE id = %s RETURNING id;", (nugget_id,))
                row = cur.fetchone()
                conn.commit()
                if row:
                    return jsonify({"success": True, "deleted": nugget_id})
                return jsonify({"error": "Nugget not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/nuggets/<nugget_id>/spark", methods=["POST"])
def toggle_spark(nugget_id):
    """Atomically increment or decrement sparks in Neon DB."""
    data = request.get_json(silent=True) or {}
    delta = data.get("delta", 1)
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE nuggets
                    SET sparks = GREATEST(0, sparks + %s)
                    WHERE id = %s
                    RETURNING sparks;
                """, (delta, nugget_id))
                row = cur.fetchone()
                conn.commit()
                if row:
                    return jsonify({"success": True, "sparks": row["sparks"]})
                return jsonify({"error": "Nugget not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/nuggets/<nugget_id>/comment", methods=["POST"])
def add_comment(nugget_id):
    """Append a user comment into the nugget's JSONB comments array."""
    data = request.get_json(silent=True) or {}
    if not data or not data.get("text"):
        return jsonify({"error": "Missing comment text"}), 400

    comment_obj = {
        "author": data.get("author", "Learner"),
        "avatar": data.get("avatar", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"),
        "text": data["text"]
    }

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE nuggets
                    SET comments = COALESCE(comments, '[]'::jsonb) || %s::jsonb
                    WHERE id = %s
                    RETURNING comments;
                """, (json.dumps([comment_obj]), nugget_id))
                row = cur.fetchone()
                conn.commit()
                if row:
                    return jsonify({"success": True, "comments": safe_json_parse(row["comments"], [])})
                return jsonify({"error": "Nugget not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================================
# AUTH & USER ACCOUNTS (NEON DB VISIBILITY)
# ==========================================

@app.route("/api/auth/register", methods=["POST"])
def auth_register():
    """Register a new user account directly into Neon PostgreSQL."""
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    raw_handle = (data.get("handle") or "").strip().replace("@", "")
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()

    if not name or not raw_handle or not email or not password:
        return jsonify({"error": "Full Name, Handle, Email, and Password are all required"}), 400

    handle = f"@{raw_handle}"
    avatar = data.get("avatar") or "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    role = data.get("role") or "Knowledge Creator"

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Check if handle or email is already taken
                cur.execute("SELECT handle, email FROM users WHERE LOWER(handle) = LOWER(%s) OR LOWER(email) = LOWER(%s);", (handle, email))
                existing = cur.fetchone()
                if existing:
                    # Update credentials if already exists
                    cur.execute("""
                        UPDATE users SET
                            name = %s,
                            email = %s,
                            password = %s,
                            avatar = %s,
                            role = %s,
                            last_login = NOW(),
                            updated_at = NOW()
                        WHERE handle = %s OR LOWER(email) = LOWER(%s)
                        RETURNING *;
                    """, (name, email, password, avatar, role, handle, email))
                    row = cur.fetchone()
                else:
                    cur.execute("""
                        INSERT INTO users (
                            handle, name, email, password, avatar, role,
                            streak, xp, quizzes_aced, read_count, sparks_given,
                            saved_nugget_ids, created_at, last_login, updated_at
                        ) VALUES (%s, %s, %s, %s, %s, %s, 1, 100, 0, 0, 0, '[]'::jsonb, NOW(), NOW(), NOW())
                        RETURNING *;
                    """, (handle, name, email, password, avatar, role))
                    row = cur.fetchone()

                conn.commit()
                return jsonify({"success": True, "user": format_user_row(row)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/auth/login", methods=["POST"])
def auth_login():
    """Login with email/handle and password, persisting and updating Neon DB."""
    data = request.get_json(silent=True) or {}
    identifier = (data.get("email") or data.get("handle") or "").strip()
    password = (data.get("password") or "").strip()

    if not identifier:
        return jsonify({"error": "Email or Username is required"}), 400

    clean_id = identifier.lower()
    clean_handle = f"@{identifier.replace('@', '').lower()}"

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT * FROM users 
                    WHERE LOWER(email) = %s OR LOWER(handle) = %s OR LOWER(handle) = %s;
                """, (clean_id, clean_id, clean_handle))
                row = cur.fetchone()

                if row:
                    # Verify password if user has password set and entered one
                    db_pwd = row.get("password") or ""
                    if db_pwd and password and db_pwd != password:
                        return jsonify({"error": "Incorrect password. Please verify credentials."}), 401

                    # User exists, update last_login
                    cur.execute("""
                        UPDATE users SET last_login = NOW(), updated_at = NOW()
                        WHERE handle = %s
                        RETURNING *;
                    """, (row["handle"],))
                    updated = cur.fetchone()
                    conn.commit()
                    return jsonify({"success": True, "user": format_user_row(updated)})
                else:
                    # Auto-provision user into database so credentials become visible in Neon!
                    name_part = identifier.split("@")[0].replace(".", " ").replace("_", " ")
                    auto_name = name_part.capitalize() or "Curious Thinker"
                    auto_handle = clean_handle if "@" in clean_handle else f"@{identifier}"
                    auto_email = identifier if "@" in identifier else f"{identifier}@nugget.io"

                    cur.execute("""
                        INSERT INTO users (
                            handle, name, email, password, avatar, role,
                            streak, xp, quizzes_aced, read_count, sparks_given,
                            saved_nugget_ids, created_at, last_login, updated_at
                        ) VALUES (
                            %s, %s, %s, %s,
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                            'Creator & Thinker', 5, 450, 12, 19, 48, '[]'::jsonb, NOW(), NOW(), NOW()
                        )
                        RETURNING *;
                    """, (auto_handle, auto_name, auto_email, password or "mastery2026"))
                    new_user = cur.fetchone()
                    conn.commit()
                    return jsonify({"success": True, "user": format_user_row(new_user)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/auth/guest", methods=["POST"])
def auth_guest():
    """Record guest explorer session in Neon DB so even guest logins are visible."""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO users (
                        handle, name, email, password, avatar, role,
                        streak, xp, quizzes_aced, read_count, sparks_given,
                        saved_nugget_ids, created_at, last_login, updated_at
                    ) VALUES (
                        '@guest_learner', 'Guest Explorer', 'guest@nugget.io', 'guest_access',
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                        'Guest Learner', 4, 380, 9, 14, 32, '[]'::jsonb, NOW(), NOW(), NOW()
                    ) ON CONFLICT (handle) DO UPDATE SET
                        last_login = NOW(),
                        updated_at = NOW()
                    RETURNING *;
                """)
                row = cur.fetchone()
                conn.commit()
                return jsonify({"success": True, "user": format_user_row(row)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/users", methods=["GET"])
def get_all_users():
    """Fetch all users from Neon DB with visible login credentials, XP, and stats."""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT handle, name, email, password, avatar, role,
                           streak, xp, quizzes_aced, read_count, sparks_given,
                           saved_nugget_ids, created_at, last_login, updated_at
                    FROM users
                    ORDER BY last_login DESC;
                """)
                rows = cur.fetchall()
                users_list = [format_user_row(r) for r in rows]
                return jsonify({
                    "total": len(users_list),
                    "database": "Neon PostgreSQL",
                    "table": "users",
                    "users": users_list
                })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/user/<handle>", methods=["GET"])
def get_user(handle):
    """Fetch a single user profile from Neon DB."""
    clean_handle = handle if handle.startswith("@") else f"@{handle}"
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM users WHERE LOWER(handle) = LOWER(%s);", (clean_handle,))
                row = cur.fetchone()
                if row:
                    return jsonify({"success": True, "user": format_user_row(row)})
                return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/user/sync", methods=["POST"])
def sync_user():
    """Sync user XP, streak, sparks, bookmarks, and login info into Neon DB whenever any change occurs."""
    data = request.get_json(silent=True) or {}
    if not data or not data.get("handle"):
        return jsonify({"error": "Missing user handle"}), 400

    handle = data["handle"]
    saved_ids = data.get("savedNuggetIds")
    saved_json = json.dumps(saved_ids) if isinstance(saved_ids, list) else None

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO users (
                        handle, name, email, password, avatar, role, streak, xp,
                        quizzes_aced, read_count, sparks_given, saved_nugget_ids, updated_at, last_login
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, COALESCE(%s::jsonb, '[]'::jsonb), NOW(), NOW())
                    ON CONFLICT (handle) DO UPDATE SET
                        name = EXCLUDED.name,
                        email = COALESCE(NULLIF(EXCLUDED.email, ''), users.email),
                        password = COALESCE(NULLIF(EXCLUDED.password, ''), users.password),
                        avatar = EXCLUDED.avatar,
                        role = EXCLUDED.role,
                        streak = GREATEST(users.streak, EXCLUDED.streak),
                        xp = GREATEST(users.xp, EXCLUDED.xp),
                        quizzes_aced = GREATEST(users.quizzes_aced, EXCLUDED.quizzes_aced),
                        read_count = GREATEST(users.read_count, EXCLUDED.read_count),
                        sparks_given = GREATEST(users.sparks_given, EXCLUDED.sparks_given),
                        saved_nugget_ids = CASE WHEN %s::jsonb IS NOT NULL THEN %s::jsonb ELSE users.saved_nugget_ids END,
                        updated_at = NOW(),
                        last_login = NOW()
                    RETURNING *;
                """, (
                    handle,
                    data.get("name", "Learner"),
                    data.get("email", ""),
                    data.get("password", ""),
                    data.get("avatar", ""),
                    data.get("role", "Learner Pass"),
                    data.get("streak", 1),
                    data.get("xp", 0),
                    data.get("quizzesAced", 0),
                    data.get("readCount", 0),
                    data.get("sparksGiven", 0),
                    saved_json,
                    saved_json,
                    saved_json
                ))
                row = cur.fetchone()
                conn.commit()
                return jsonify({"success": True, "user": format_user_row(row)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/user/save-nugget", methods=["POST"])
def toggle_save_nugget():
    """Save or remove a nugget in the user's Brain Vault directly in Neon DB."""
    data = request.get_json(silent=True) or {}
    handle = data.get("handle")
    nugget_id = data.get("nuggetId")
    is_saved = data.get("isSaved", True)

    if not handle or not nugget_id:
        return jsonify({"error": "Handle and nuggetId are required"}), 400

    clean_handle = handle if handle.startswith("@") else f"@{handle}"

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT saved_nugget_ids FROM users WHERE LOWER(handle) = LOWER(%s);", (clean_handle,))
                row = cur.fetchone()
                saved_ids = safe_json_parse(row.get("saved_nugget_ids") if row else None, [])
                if not isinstance(saved_ids, list):
                    saved_ids = []

                if is_saved:
                    if nugget_id not in saved_ids:
                        saved_ids.append(nugget_id)
                else:
                    saved_ids = [nid for nid in saved_ids if nid != nugget_id]

                cur.execute("""
                    INSERT INTO users (handle, name, saved_nugget_ids, updated_at, last_login)
                    VALUES (%s, %s, %s::jsonb, NOW(), NOW())
                    ON CONFLICT (handle) DO UPDATE SET
                        saved_nugget_ids = EXCLUDED.saved_nugget_ids,
                        updated_at = NOW()
                    RETURNING saved_nugget_ids;
                """, (clean_handle, clean_handle.replace("@", "").capitalize(), json.dumps(saved_ids)))
                conn.commit()
                return jsonify({"success": True, "savedNuggetIds": saved_ids})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================================
# STATIC FRONTEND SERVING
# ==========================================

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def static_proxy(path):
    if os.path.exists(path):
        return send_from_directory(".", path)
    return send_from_directory(".", "index.html")

if __name__ == "__main__":
    print("=" * 60)
    print("[*] Connecting Nugget to Neon PostgreSQL...")
    init_db()
    port = int(os.getenv("PORT", 5000))
    print("=" * 60)
    print("[+] NUGGET FULL-STACK SERVER RUNNING!")
    print(f"[+] Open your browser at: http://localhost:{port}")
    print("=" * 60)
    app.run(host="0.0.0.0", port=port, debug=False)
