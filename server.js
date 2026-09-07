/**
 * server.js — Portfolio backend proxy
 * - Serves all static files
 * - Proxies /api/chat to Groq (API key never leaves server)
 * - Rate-limits chatbot to 10 requests per IP per 24 hours
 * - /api/auth: email+password login (owner only), returns signed JWT-like token
 * - /api/auth/verify: verifies token for dashboard access
 * - All secrets read from .env — never sent to browser
 */

require("dotenv").config();
const express = require("express");
const fetch   = require("node-fetch");  // used for non-streaming requests
const path    = require("path");
const crypto  = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_API_KEY  = (process.env.GROQ_API_KEY  || "").trim();
const OWNER_EMAIL = (process.env.OWNER_EMAIL || "").toLowerCase().trim();
const OWNER_PASSWORD = process.env.OWNER_PASSWORD || "";

// ── JWT-like token secret (derived from owner password — never leaves server) ──
const TOKEN_SECRET = crypto.createHash("sha256").update(OWNER_PASSWORD + OWNER_EMAIL).digest("hex");
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function signToken(email) {
  const payload = { email, exp: Date.now() + TOKEN_TTL_MS };
  const data = JSON.stringify(payload);
  const sig = crypto.createHmac("sha256", TOKEN_SECRET).update(data).digest("hex");
  return Buffer.from(data).toString("base64url") + "." + sig;
}

function verifyToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  try {
    const data = Buffer.from(parts[0], "base64url").toString("utf8");
    const expectedSig = crypto.createHmac("sha256", TOKEN_SECRET).update(data).digest("hex");
    // Timing-safe compare
    const actualSigBuf = Buffer.from(parts[1], "hex");
    const expectedSigBuf = Buffer.from(expectedSig, "hex");
    if (actualSigBuf.length !== expectedSigBuf.length) return null;
    if (!crypto.timingSafeEqual(actualSigBuf, expectedSigBuf)) return null;
    const payload = JSON.parse(data);
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch { return null; }
}

// ── Rate limiter factory ────────────────────────────────────────────────────────
function createRateLimiter(limit, windowMs) {
  const store = new Map();
  return function check(ip) {
    const now = Date.now();
    let entry = store.get(ip);
    if (!entry || now >= entry.resetAt) {
      entry = { count: 0, resetAt: now + windowMs };
      store.set(ip, entry);
    }
    return entry;
  };
}

// Chatbot: 10 req / 24h per IP
const CHAT_LIMIT = 10;
const chatRateCheck = createRateLimiter(CHAT_LIMIT, 24 * 60 * 60 * 1000);

// Login: 5 attempts / 15min per IP (brute-force protection)
const LOGIN_LIMIT = 5;
const loginRateCheck = createRateLimiter(LOGIN_LIMIT, 15 * 60 * 1000);

function getIp(req) {
  return (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket.remoteAddress || "unknown";
}

function chatRateLimitMiddleware(req, res, next) {
  const ip = getIp(req);
  const entry = chatRateCheck(ip);
  res.setHeader("X-RateLimit-Limit", CHAT_LIMIT);
  res.setHeader("X-RateLimit-Remaining", Math.max(0, CHAT_LIMIT - entry.count));
  res.setHeader("X-RateLimit-Reset", entry.resetAt);
  if (entry.count >= CHAT_LIMIT) {
    const retryAfterSec = Math.ceil((entry.resetAt - Date.now()) / 1000);
    return res.status(429).json({ error: "rate_limited", remaining: 0, retryAfterSeconds: retryAfterSec });
  }
  entry.count++;
  req.rateLimitRemaining = CHAT_LIMIT - entry.count;
  next();
}

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname)));

// ── /api/auth — Login endpoint (owner only) ───────────────────────────────────
app.post("/api/auth", (req, res) => {
  const ip = getIp(req);
  const loginEntry = loginRateCheck(ip);

  if (loginEntry.count >= LOGIN_LIMIT) {
    const wait = Math.ceil((loginEntry.resetAt - Date.now()) / 60000);
    return res.status(429).json({ error: "too_many_attempts", message: `Too many login attempts. Try again in ${wait} minute(s).` });
  }

  const { email, password } = req.body || {};

  // Basic input validation
  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    loginEntry.count++;
    return res.status(400).json({ error: "invalid_input" });
  }

  const emailOk = email.toLowerCase().trim() === OWNER_EMAIL;

  // Timing-safe password compare using Buffer
  const pwBuf = Buffer.from(password);
  const ownerBuf = Buffer.from(OWNER_PASSWORD);
  const lengthsMatch = pwBuf.length === ownerBuf.length;
  const pwMatch = lengthsMatch && crypto.timingSafeEqual(pwBuf, ownerBuf);

  if (!emailOk || !pwMatch) {
    loginEntry.count++;
    // Don't reveal which field was wrong
    return res.status(401).json({ error: "invalid_credentials", message: "Incorrect email or password." });
  }

  // Success — issue token, reset login rate limit
  loginEntry.count = 0;
  const token = signToken(email.toLowerCase().trim());
  return res.json({ token, expiresIn: TOKEN_TTL_MS });
});

// ── /api/auth/verify — Verify token ──────────────────────────────────────────
app.post("/api/auth/verify", (req, res) => {
  const { token } = req.body || {};
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ valid: false });
  return res.json({ valid: true, email: payload.email });
});

// ── Resume context (server-side only, never sent to browser) ──────────────────
const RESUME_CONTEXT = `Name: Divyom Chaudhary
Location: Meerut, India
Email: divyomchaudhary@gmail.com
LinkedIn: https://www.linkedin.com/in/divyom-chaudhary
GitHub: https://www.github.com/DivyomChaudhary

Current Status: B.Tech CSE graduate - 2026 batch. Constantly searching for the right opportunity. Available for freshers roles in AI/ML and Data Science.

Education:
- Senior Secondary (Class XII, CBSE, PCM + CS), Completed 2022
- B.Tech Computer Science & Engineering, MIET, Meerut, 2022–2026

Achievement: TPO top 5% programmers — Rank 12/500 across all CSE-allied branches at MIET, 2025–2026

Certification: AWS Certified Cloud Practitioner (CLF-C02), Jul 2025, Valid through Jul 2028

Projects:
1. NetraFlow (2025-Present) — Traffic Edge Security System
   - Real-time video & data pipeline with Python, SQLite, AWS S3 across 400+ deployment zones
   - Agentic RAG dashboard with LangGraph for natural-language analytical queries
   - Cut model inference time by 66% via multithreaded preprocessing
   - Find more in the projects section

2. Level_Up (2026) — Habit Builder & Routine Planning System
   - Gamification engine with multi-tier quests, penalty/reward logic, streak tracking
   - NLP parser classifying free-text into 3 schedule tiers, AI task planning
   - Accountability system with UPI wallet — QR payments and fund-freezing on missed goals
   - Find more in the projects section

3. Stokd (Under Development) — AI/ML enabled Inventory and Stock management
   - Stock and inventory tracking for everyday item management
   - Ask me for collaboration in the contacts section

Open to relocation: Yes, willing to relocate for the right opportunity, especially Bangalore, Delhi NCR, Hyderabad and Gurugram.

Working remotely: Yes, wholeheartedly accepts remote work.

What sets you apart from other candidates?: Believes in continuous self-improvement and strong work ethic. Proved by projects and GitHub profile, visible in the projects and contact sections.

What are you doing right now: Has some offers from on-campus opportunities, waiting for their onboarding details.

How much salary are you expecting?: Flexible depending on total compensation, role, and location. Expected range: 6 LPA to 10 LPA. Actively upskilling in AI, cloud, and data science to hit the ground running.

Why should we hire you?: Believes in showing proof of work instead of listing soft skills. The work is waiting to be explored in the portfolio.

Skills: Python, SQL, PyTorch, LangChain, LangGraph, Pandas, NumPy, Streamlit, Git, GitHub, Docker, Linux, AWS, Terraform, SQLite, MySQL, PostgreSQL, RAG, Machine Learning, NLP, Generative AI, CUDNN

Contact: divyomchaudhary@gmail.com
Resume: https://drive.google.com/file/d/1JuBGFE1qIOhJW1V6c6dUDudGLlS9y1yY/view`;

// Simple markdown → plain text converter for bot responses
function mdToText(text) {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")  // strip reasoning chain-of-thought
    .replace(/\*\*(.+?)\*\*/g, "$1")   // bold
    .replace(/\*(.+?)\*/g, "$1")        // italic
    .replace(/^#{1,6}\s+/gm, "")        // headings
    .replace(/^[\*\-]\s+/gm, "• ")      // bullets
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1"); // links
}

// ── /api/chat — Chatbot proxy with Groq streaming ───────────────────────────
app.post("/api/chat", chatRateLimitMiddleware, async (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== "string" || question.trim().length === 0)
    return res.status(400).json({ error: "No question provided" });
  const safeQuestion = question.trim().slice(0, 400);
  if (!GROQ_API_KEY)
    return res.status(500).json({ error: "AI API key not configured" });

  const systemPrompt =
    "You are a casual, friendly portfolio assistant for Divyom Chaudhary. " +
    "Keep every reply to 2-3 short sentences — plain text only, no asterisks or markdown. " +
    "Be warm and direct, like texting a friend. " +
    "End each reply with a natural suggestion to check the relevant section of his portfolio. " +
    "For certifications: just say the name and year, skip verification links. " +
    "If something isn't in the resume, admit it briefly and point to divyomchaudhary@gmail.com. " +
    "Never list more than 3 things — summarise instead. " +
    "Only answer from the resume data below.\n\n" +
    "=== RESUME ===\n" + RESUME_CONTEXT + "\n=== END ===";

  // ─ Open SSE stream to browser ─────────────────────────────
  res.setHeader("Content-Type",      "text/event-stream");
  res.setHeader("Cache-Control",     "no-cache");
  res.setHeader("Connection",        "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  const sseWrite = (obj) => {
    try { res.write("data: " + JSON.stringify(obj) + "\n\n"); } catch (_) {}
  };


  // ─ Call Groq with node-fetch streaming ─────────────────────────────────
  const postBody = JSON.stringify({
    model:       "groq/compound-mini",
    messages:    [
      { role: "system", content: systemPrompt },
      { role: "user",   content: safeQuestion }
    ],
    stream:      true,
    max_tokens:  250,
    temperature: 0.45
  });

  console.log(`[chat] q="${safeQuestion.slice(0, 60)}" groq_key_len=${GROQ_API_KEY.length}`);

  let groqRes;
  try {
    groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method:  "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type":  "application/json"
      },
      body: postBody
    });
  } catch (netErr) {
    console.error("[chat] fetch error:", netErr.message);
    sseWrite({ error: true, message: "network_error" });
    return res.end();
  }

  console.log(`[chat] Groq HTTP status: ${groqRes.status}`);

  if (!groqRes.ok) {
    const errText = await groqRes.text().catch(() => "");
    console.error(`[chat] Groq ${groqRes.status}:`, errText.slice(0, 300));
    sseWrite({ error: true, message: "upstream_error", status: groqRes.status });
    return res.end();
  }

  // ─ Parse OpenAI SSE stream ───────────────────────────────────────────────
  let buf = "";
  groqRes.body.setEncoding("utf8");

  groqRes.body.on("data", (chunk) => {
    buf += chunk;
    const frames = buf.split("\n\n");
    buf = frames.pop();
    for (const frame of frames) {
      const line = frame.trim();
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (payload === "[DONE]") continue;
      try {
        const json = JSON.parse(payload);
        const text = json.choices?.[0]?.delta?.content;
        if (text) sseWrite({ chunk: mdToText(text) });
      } catch (_) {}
    }
  });

  groqRes.body.on("end", () => {
    sseWrite({ done: true, remaining: req.rateLimitRemaining, limit: CHAT_LIMIT });
    res.end();
  });

  groqRes.body.on("error", (err) => {
    console.error("[chat] stream error:", err.message);
    sseWrite({ error: true, message: "stream_error" });
    res.end();
  });

  req.on("close", () => { try { groqRes.body.destroy(); } catch (_) {} });

});


// ── /api/ratelimit/reset — DEV ONLY: reset your IP's count (localhost only) ─────
app.get("/api/ratelimit/reset", (req, res) => {
  const ip = getIp(req);
  const isLocal = ["::1", "127.0.0.1", "::ffff:127.0.0.1"].includes(ip);
  if (!isLocal) return res.status(403).json({ error: "localhost only" });
  // Wipe this IP's entry so it gets a fresh window next request
  const store = chatRateCheck(ip);
  store.count = 0;
  store.resetAt = Date.now() + 24 * 60 * 60 * 1000;
  res.send(`<html><body style="font-family:sans-serif;padding:2rem">
    <h2>✅ Server-side rate limit reset for ${ip}</h2>
    <p>Now run this in your browser console to clear the UI counter too:</p>
    <pre style="background:#f0f0f0;padding:1rem;border-radius:8px">localStorage.removeItem('portfolio_rate'); location.href='/';</pre>
    <a href="/">← Back to portfolio</a>
  </body></html>`);
});

// ── /api/ratelimit — check remaining without consuming one ────────────────────
app.get("/api/ratelimit", (req, res) => {
  const ip = getIp(req);
  const entry = chatRateCheck(ip);
  res.json({ remaining: Math.max(0, CHAT_LIMIT - entry.count), limit: CHAT_LIMIT, resetAt: entry.resetAt });
});

// ── Start server ─────────────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n✅ Portfolio server running at http://localhost:${PORT}`);
    console.log(`   Groq API key:  ${GROQ_API_KEY  ? "✓ loaded" : "✗ MISSING — add GROQ_API_KEY to .env"}`);
    console.log(`   Owner email: ${OWNER_EMAIL || "✗ MISSING"}`);
    console.log(`   Owner password: ${OWNER_PASSWORD ? "✓ loaded" : "✗ MISSING"}`);
    console.log(`   Chatbot rate limit: ${CHAT_LIMIT} questions per 24h per IP`);
    console.log(`   Login brute-force protection: ${LOGIN_LIMIT} attempts per 15 min\n`);
  });
}

module.exports = app;
