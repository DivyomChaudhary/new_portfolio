/**
 * main.js — Portfolio interactivity
 * - Nav / scroll-spy
 * - Mobile menu
 * - Balls: circular orbit, 12s period, hover-pause
 * - Chatbot: /api/chat proxy, 10 questions/24h rate limit
 * - Contact form
 * - Account: email+password login via /api/auth (secure, server-side)
 */
(function () {
  "use strict";

  /* ══════════════════════════════════════════════════════
     1. NAV / SCROLL SPY
  ══════════════════════════════════════════════════════ */
  var tabs = document.querySelectorAll("[data-nav]");
  var sectionIds = ["me", "work", "education", "contact", "resume", "account"];

  function activateTab(id) {
    tabs.forEach(function (t) {
      t.classList.toggle("active", t.getAttribute("data-nav") === id);
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      activateTab(t.getAttribute("data-nav"));
      closeMobile();
    });
  });

  if ("IntersectionObserver" in window) {
    var sections = sectionIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) activateTab(e.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ══════════════════════════════════════════════════════
     2. MOBILE MENU
  ══════════════════════════════════════════════════════ */
  var overlay = document.getElementById("mobileOverlay");
  var burgerBtn = document.getElementById("burgerBtn");
  var mobileClose = document.getElementById("mobileClose");
  var mobileBackdrop = document.getElementById("mobileBackdrop");

  function openMobile() {
    overlay.hidden = false;
    document.documentElement.style.overflow = "hidden";
    burgerBtn.setAttribute("aria-expanded", "true");
  }
  function closeMobile() {
    overlay.hidden = true;
    document.documentElement.style.overflow = "";
    burgerBtn.setAttribute("aria-expanded", "false");
  }

  if (burgerBtn) burgerBtn.addEventListener("click", openMobile);
  if (mobileClose) mobileClose.addEventListener("click", closeMobile);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMobile);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMobile(); });

  /* ══════════════════════════════════════════════════════
     3. BALL ORBIT ANIMATION
     The three triangle vertices for the container (288x288):
       A (top):          (144, 56)
       B (bottom-left):  ( 42, 232)
       C (bottom-right): (245, 224)

     The circumscribed circle passes through all three vertices.
     Each ball orbits this circle at 2π/3 offset from each other.
     Period = 12 seconds. Direction = anti-clockwise (negative angular velocity).
     No actual circle drawn — just the orbit path.
  ══════════════════════════════════════════════════════ */
  function initBalls() {
    var container = document.getElementById("buildsContainer");
    if (!container) return;
    var ballN = document.getElementById("ballNetraflow");
    var ballL = document.getElementById("ballLevelup");
    var ballS = document.getElementById("ballStokd");
    if (!ballN || !ballL || !ballS) return;

    // Triangle vertices (match the SVG viewBox 288×288)
    var vA = { x: 144, y: 56  };
    var vB = { x: 42,  y: 232 };
    var vC = { x: 245, y: 224 };

    // Compute circumscribed circle of the triangle
    function circumscribed(a, b, c) {
      var ax = a.x, ay = a.y, bx = b.x, by = b.y, cx = c.x, cy = c.y;
      var D = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
      if (Math.abs(D) < 1e-6) return { x: (ax+bx+cx)/3, y: (ay+by+cy)/3, r: 100 };
      var ux = ((ax*ax + ay*ay) * (by - cy) + (bx*bx + by*by) * (cy - ay) + (cx*cx + cy*cy) * (ay - by)) / D;
      var uy = ((ax*ax + ay*ay) * (cx - bx) + (bx*bx + by*by) * (ax - cx) + (cx*cx + cy*cy) * (bx - ax)) / D;
      var r = Math.sqrt((ax - ux)*(ax - ux) + (ay - uy)*(ay - uy));
      return { x: ux, y: uy, r: r };
    }

    var circle = circumscribed(vA, vB, vC);

    // Find the starting angle for vertex A on the circle
    function angleOf(v) { return Math.atan2(v.y - circle.y, v.x - circle.x); }
    var startAngleA = angleOf(vA);

    // Ball sizes
    var SIZE = { n: 118, l: 104, s: 92 };

    // Period: 12 000 ms
    var PERIOD = 12000;
    var ballsPaused = false;
    var T = 0; // accumulated time (ms)
    var lastTs = null;

    function applyBall(el, angle, size) {
      var x = circle.x + circle.r * Math.cos(angle);
      var y = circle.y + circle.r * Math.sin(angle);
      el.style.position = "absolute";
      el.style.left  = (x - size / 2) + "px";
      el.style.top   = (y - size / 2) + "px";
      el.style.width  = size + "px";
      el.style.height = size + "px";
      el.style.transform = "none";
    }

    function animate(ts) {
      if (lastTs === null) lastTs = ts;
      if (!ballsPaused) T += ts - lastTs;
      lastTs = ts;

      // Full revolution in PERIOD ms, anti-clockwise → subtract angle
      var progress = (T % PERIOD) / PERIOD; // 0→1
      var theta = startAngleA - 2 * Math.PI * progress; // anti-clockwise

      applyBall(ballN, theta,                   SIZE.n);
      applyBall(ballL, theta + 2*Math.PI/3,     SIZE.l);
      applyBall(ballS, theta + 4*Math.PI/3,     SIZE.s);

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // Hover pause for the whole container
    var container2 = document.getElementById("buildsContainer");
    if (container2) {
      container2.addEventListener("mouseenter", function () { ballsPaused = true; });
      container2.addEventListener("mouseleave", function () { ballsPaused = false; });
    }
  }

  initBalls();

  /* ══════════════════════════════════════════════════════
     4. CHATBOT — calls /api/chat (server proxy, key hidden)
        Rate limit: 5 per 24h per IP (enforced server-side)
        UI counter uses localStorage as a hint (cosmetic only)
  ══════════════════════════════════════════════════════ */
  var chatMessages    = document.getElementById("chatMessages");
  var chatForm        = document.getElementById("chatForm");
  var chatInput       = document.getElementById("chatInput");
  var chatChips       = document.getElementById("chatChips");
  var rateBadge       = document.getElementById("rateBadge");
  var chatbotSubText  = document.getElementById("chatbotSubText");

  var LIMIT = 10;
  var LS_RATE = "portfolio_rate";

  function getRateInfo() {
    try {
      var raw = JSON.parse(localStorage.getItem(LS_RATE) || "{}");
      var now = Date.now();
      if (!raw.resetAt || now >= raw.resetAt) {
        raw = { used: 0, resetAt: now + 24*60*60*1000 };
      }
      return raw;
    } catch (e) { return { used: 0, resetAt: Date.now() + 24*60*60*1000 }; }
  }

  function saveRateInfo(info) {
    try { localStorage.setItem(LS_RATE, JSON.stringify(info)); } catch (e) {}
  }

  function updateRateBadge(remaining) {
    if (!rateBadge) return;
    rateBadge.textContent = remaining + " left";
    rateBadge.className = "rate-badge" + (remaining === 0 ? " rate-badge--empty" : remaining <= 2 ? " rate-badge--low" : "");
  }

  function setThrottledUI() {
    if (chatbotSubText) chatbotSubText.textContent = "We're being asked too many questions right now, please wait.";
    if (chatInput) { chatInput.disabled = true; chatInput.placeholder = "Daily limit reached — come back tomorrow"; }
    if (chatChips) chatChips.style.opacity = "0.4";
    updateRateBadge(0);
  }

  // Fetch remaining from server on load
  fetch("/api/ratelimit").then(function (r) { return r.json(); }).then(function (d) {
    updateRateBadge(d.remaining);
    if (d.remaining === 0) setThrottledUI();
  }).catch(function () {
    var info = getRateInfo();
    updateRateBadge(Math.max(0, LIMIT - info.used));
  });

  function appendMessage(text, role) {
    var div = document.createElement("div");
    div.className = "msg " + (role === "user" ? "msg-user" : "msg-bot");
    var p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
  }

  // Custom answers (from account section)
  var customAnswers = [];
  try { customAnswers = JSON.parse(localStorage.getItem("portfolio_custom_answers") || "[]"); } catch (e) {}

  function checkCustomAnswer(q) {
    var ql = q.toLowerCase();
    for (var i = 0; i < customAnswers.length; i++) {
      if (customAnswers[i].q && ql.includes(customAnswers[i].q.toLowerCase())) return customAnswers[i].a;
    }
    return null;
  }

  async function sendMessage(text) {
    text = text.trim();
    if (!text) return;

    // Check custom answers first (no rate limit cost)
    var custom = checkCustomAnswer(text);
    if (custom) {
      appendMessage(text, "user");
      chatInput.value = "";
      appendMessage(custom, "bot");
      logQuestion(text);
      return;
    }

    // UI check (cosmetic)
    var info = getRateInfo();
    if (info.used >= LIMIT) { setThrottledUI(); return; }

    appendMessage(text, "user");
    chatInput.value = "";
    logQuestion(text);

    // Add typing bubble with blinking cursor
    var typing = appendMessage("▍", "bot");
    typing.classList.add("msg-typing");
    var typingP = typing.querySelector("p");

    try {
      var res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text })
      });

      // 429 comes back as JSON before SSE is established
      if (res.status === 429) {
        typingP.textContent = "Daily limit reached. Come back tomorrow!";
        typing.classList.remove("msg-typing");
        setThrottledUI();
        return;
      }

      if (!res.ok || !res.body) {
        typingP.textContent = "Couldn't reach the AI right now. Email divyomchaudhary@gmail.com for a faster reply!";
        typing.classList.remove("msg-typing");
        return;
      }

      // ── Stream reading ────────────────────────────────────────────────────────
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var sseBuffer = "";
      var fullText = "";
      var started = false;

      while (true) {
        var readResult = await reader.read();
        if (readResult.done) break;

        sseBuffer += decoder.decode(readResult.value, { stream: true });
        // SSE frames end with double newline
        var frames = sseBuffer.split("\n\n");
        sseBuffer = frames.pop(); // keep incomplete frame

        for (var i = 0; i < frames.length; i++) {
          var frame = frames[i].trim();
          if (!frame.startsWith("data: ")) continue;
          try {
            var evt = JSON.parse(frame.slice(6));

            if (evt.error) {
              typingP.textContent = "Something went wrong. Email divyomchaudhary@gmail.com!";
              typing.classList.remove("msg-typing");
              break;
            }

            if (evt.chunk) {
              if (!started) {
                // First real text — clear the cursor placeholder
                fullText = "";
                started = true;
              }
              fullText += evt.chunk;
              typingP.textContent = fullText + " ▍"; // live cursor
              chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            if (evt.done) {
              // Remove cursor, finalise text
              typingP.textContent = fullText;
              typing.classList.remove("msg-typing");

              // Nav highlight
              var al = fullText.toLowerCase();
              if (/project|netraflow|level_up|stokd|skill|python|aws|langchain|pytorch|docker|numpy|pandas/.test(al)) {
                highlightNav("work");
              } else if (/education|b\.tech|miet|degree|college/.test(al)) {
                highlightNav("education");
              } else if (/contact|email|linkedin|hire|reach|connect/.test(al)) {
                highlightNav("contact");
              }

              // Update rate badge
              info.used++;
              saveRateInfo(info);
              var remaining = typeof evt.remaining === "number" ? evt.remaining : Math.max(0, LIMIT - info.used);
              updateRateBadge(remaining);
              if (remaining === 0) setThrottledUI();
            }
          } catch (_) { /* skip malformed SSE frame */ }
        }
      }

      // Fallback: if stream ended without a done event, clean up cursor
      if (fullText && typingP.textContent.endsWith(" ▍")) {
        typingP.textContent = fullText;
        typing.classList.remove("msg-typing");
      }

    } catch (err) {
      typingP.textContent = "Connection issue. Please try again or email divyomchaudhary@gmail.com.";
      typing.classList.remove("msg-typing");
    }
  }


  if (chatForm) {
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (chatInput && !chatInput.disabled) sendMessage(chatInput.value);
    });
  }

  if (chatChips) {
    chatChips.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip || (chatInput && chatInput.disabled)) return;
      var q = chip.getAttribute("data-q");
      if (q) sendMessage(q);
    });
  }

  /* ══════════════════════════════════════════════════════
     NAV HIGHLIGHT — called after chatbot answers about a section
  ══════════════════════════════════════════════════════ */
  function highlightNav(sectionId) {
    var tab = document.querySelector('[data-nav="' + sectionId + '"]');
    if (!tab) return;
    tab.classList.remove("nav-flash");
    // Force reflow so animation restarts
    void tab.offsetWidth;
    tab.classList.add("nav-flash");
    tab.addEventListener("animationend", function () { tab.classList.remove("nav-flash"); }, { once: true });
  }

  /* ══════════════════════════════════════════════════════
     5. CONTACT FORM
  ══════════════════════════════════════════════════════ */
  var contactForm = document.getElementById("contactForm");
  var formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var subject  = document.getElementById("fc_subject") ? document.getElementById("fc_subject").value.trim() : "Portfolio inquiry";
      var message  = document.getElementById("fc_msg").value.trim();
      var mailtoUrl = "mailto:divyomchaudhary@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
      window.open(mailtoUrl, "_blank");
      if (formSuccess) { formSuccess.hidden = false; setTimeout(function () { formSuccess.hidden = true; }, 7000); }
      contactForm.reset();
    });
  }

  /* ══════════════════════════════════════════════════════
     6. ACCOUNT DASHBOARD — Email + Password Auth
        - Form in HTML submits to /api/auth (server-side compare)
        - Server checks email+password from .env (never in browser)
        - Token stored in sessionStorage (cleared on tab close)
        - Token verified on page load for auto-restore
  ══════════════════════════════════════════════════════ */
  var OWNER_EMAIL_HINT = "divyomchaudhary@gmail.com";
  var LS_TOKEN_KEY = "portfolio_auth_token";
  var LS_QUESTIONS = "portfolio_questions";
  var LS_CUSTOM = "portfolio_custom_answers";

  var accountGate = document.getElementById("accountGate");
  var accountDashboard = document.getElementById("accountDashboard");
  var authForm = document.getElementById("authForm");
  var authEmailEl = document.getElementById("authEmail");
  var authPasswordEl = document.getElementById("authPassword");
  var authError = document.getElementById("authError");
  var authSubmit = document.getElementById("authSubmit");
  var pwToggle = document.getElementById("pwToggle");

  // Password show/hide toggle
  if (pwToggle && authPasswordEl) {
    pwToggle.addEventListener("click", function () {
      var isText = authPasswordEl.type === "text";
      authPasswordEl.type = isText ? "password" : "text";
    });
  }

  function showAuthError(msg) {
    if (!authError) return;
    authError.textContent = msg;
    authError.hidden = false;
    authError.style.animation = "none";
    requestAnimationFrame(function () { authError.style.animation = ""; });
  }

  function hideAuthError() { if (authError) authError.hidden = true; }

  function sanitizeInput(str) {
    // Remove any HTML/script injection attempts; return plain text only
    return String(str).replace(/[<>"'`;]/g, "").trim();
  }

  if (authForm) {
    authForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      hideAuthError();

      var rawEmail = authEmailEl ? authEmailEl.value : "";
      var rawPw = authPasswordEl ? authPasswordEl.value : "";
      var email = sanitizeInput(rawEmail).toLowerCase();
      var password = rawPw.trim().slice(0, 128); // limit length, no sanitize (pw may contain special chars)

      if (!email || !password) { showAuthError("Please fill in both fields."); return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { showAuthError("Enter a valid email address."); return; }

      if (authSubmit) { authSubmit.disabled = true; authSubmit.textContent = "Signing in..."; }

      try {
        var res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        var data = await res.json();

        if (!res.ok) {
          var msg = data.message || (res.status === 429 ? "Too many attempts. Wait a few minutes." : "Incorrect email or password.");
          showAuthError(msg);
          if (authSubmit) { authSubmit.disabled = false; authSubmit.textContent = "Sign in"; }
          return;
        }

        try { sessionStorage.setItem(LS_TOKEN_KEY, data.token); } catch (er) {}
        showDashboard(email);

      } catch (err) {
        showAuthError("Network error. Is the server running?");
        if (authSubmit) { authSubmit.disabled = false; authSubmit.textContent = "Sign in"; }
      }
    });
  }
  var questionsList    = document.getElementById("questionsList");
  var statQEl          = document.getElementById("statQuestions");
  var statAEl          = document.getElementById("statAnswered");
  var statCEl          = document.getElementById("statCustom");

  function getQuestions() {
    try { return JSON.parse(localStorage.getItem(LS_QUESTIONS) || "[]"); } catch (e) { return []; }
  }

  function getCustom() {
    try { return JSON.parse(localStorage.getItem(LS_CUSTOM) || "[]"); } catch (e) { return []; }
  }

  function saveCustom(list) {
    try { localStorage.setItem(LS_CUSTOM, JSON.stringify(list)); } catch (e) {}
    customAnswers = list;
  }

  function updateStats() {
    var qs = getQuestions(), cu = getCustom();
    if (statQEl) statQEl.textContent = qs.length;
    if (statAEl) statAEl.textContent = qs.filter(function (q) { return q.answered; }).length;
    if (statCEl) statCEl.textContent = cu.length;
  }

  function escHtml(str) {
    return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  function renderQuestions() {
    if (!questionsList) return;
    var qs = getQuestions().slice().reverse();
    if (!qs.length) { questionsList.innerHTML = "<p style='font-size:0.8rem;color:var(--muted-foreground);font-style:italic'>No questions logged yet.</p>"; return; }
    questionsList.innerHTML = qs.map(function (item) {
      var d = new Date(item.ts);
      var ds = d.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
      return '<div class="question-item"><div><p class="question-text">' + escHtml(item.q) + '</p><p class="question-meta">' + ds + '</p></div><span class="question-status">answered</span></div>';
    }).join("");
  }

  function renderCustomAnswers() {
    var list = getCustom();
    var container = document.getElementById("customAnswers");
    var noMsg = document.getElementById("noAnswersMsg");
    if (!container) return;
    if (!list.length) {
      if (noMsg) { noMsg.hidden = false; container.innerHTML = ""; container.appendChild(noMsg); }
      return;
    }
    if (noMsg) noMsg.hidden = true;
    container.innerHTML = list.map(function (item, i) {
      return '<div class="custom-answer-item"><b>' + escHtml(item.q) + '</b><br><span>' + escHtml(item.a) + '</span><button class="rm-btn" data-i="' + i + '" style="float:right;font-size:0.7rem;color:var(--primary);background:none;border:none;cursor:pointer;">Remove</button></div>';
    }).join("");
    container.querySelectorAll(".rm-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-i"), 10);
        var l2 = getCustom(); l2.splice(idx, 1); saveCustom(l2); renderCustomAnswers(); updateStats();
      });
    });
  }

  function showDashboard(email) {
    if (accountGate) accountGate.hidden = true;
    if (accountDashboard) accountDashboard.hidden = false;
    var el1 = document.getElementById("signedInEmail");
    var el2 = document.getElementById("userName");
    var el3 = document.getElementById("userAvatar");
    var displayName = "Divyom Chaudhary";
    if (el1) el1.textContent = email;
    if (el2) el2.textContent = displayName;
    if (el3) el3.textContent = displayName.charAt(0).toUpperCase();
    if (authSubmit) { authSubmit.disabled = false; authSubmit.textContent = "Sign in"; }
    updateStats(); renderQuestions(); renderCustomAnswers();
    customAnswers = getCustom();
  }

  window.handleSignOut = function () {
    if (accountGate) accountGate.hidden = false;
    if (accountDashboard) accountDashboard.hidden = true;
    try { sessionStorage.removeItem(LS_TOKEN_KEY); } catch (e) {}
    if (authEmailEl) authEmailEl.value = "";
    if (authPasswordEl) authPasswordEl.value = "";
    hideAuthError();
  };

  // Auto-restore session — verify stored token with server
  (async function () {
    try {
      var storedToken = sessionStorage.getItem(LS_TOKEN_KEY);
      if (!storedToken) return;
      var r = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: storedToken })
      });
      var d = await r.json();
      if (d.valid) showDashboard(d.email);
      else sessionStorage.removeItem(LS_TOKEN_KEY);
    } catch (e) {}
  })();

  // Teach form
  var teachForm = document.getElementById("teachForm");
  if (teachForm) {
    teachForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = document.getElementById("teachQ").value.trim();
      var a = document.getElementById("teachA").value.trim();
      if (!q || !a) return;
      var list = getCustom(); list.push({ q, a }); saveCustom(list);
      updateStats(); renderCustomAnswers();
      document.getElementById("teachQ").value = "";
      document.getElementById("teachA").value = "";
    });
  }

  /* ══════════════════════════════════════════════════════
     7. QUESTION LOGGER (for analytics)
  ══════════════════════════════════════════════════════ */
  function logQuestion(q) {
    var list = getQuestions();
    list.push({ q: q, ts: new Date().toISOString(), answered: true });
    if (list.length > 200) list = list.slice(-200);
    try { localStorage.setItem(LS_QUESTIONS, JSON.stringify(list)); } catch (e) {}
    if (accountDashboard && !accountDashboard.hidden) { renderQuestions(); updateStats(); }
  }

  /* ══════════════════════════════════════════════════════
     8. SCROLL REVEAL
  ══════════════════════════════════════════════════════ */
  if ("IntersectionObserver" in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("rise"); revealIO.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".card, .toolbox-card, .achieve-card, .edu-card, .contact-card, .stat-card").forEach(function (el) {
      if (!el.classList.contains("rise")) revealIO.observe(el);
    });
  }

})();
