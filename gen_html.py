
# Run this script to regenerate index.html
html = """<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Divyom Chaudhary &mdash; AI &amp; Cloud Developer | Python &middot; AWS &middot; LangGraph</title>
  <meta name="description" content="Portfolio of Divyom Chaudhary, software developer building AI-powered, cloud-native systems with Python, SQL and AWS. Explore NetraFlow, Level_Up, Stokd and chat with my resume.">
  <meta name="keywords" content="Divyom Chaudhary, AI developer, Python, AWS, LangGraph, LangChain, PyTorch, RAG, NetraFlow, Level_Up, Stokd, cloud developer, portfolio, Meerut">
  <meta name="author" content="Divyom Chaudhary">
  <link rel="canonical" href="https://divyomchaudhary.me/">
  <meta name="robots" content="index,follow">
  <meta property="og:title" content="Divyom Chaudhary - AI and Cloud Developer Portfolio">
  <meta property="og:description" content="Portfolio of Divyom Chaudhary, software developer building AI-powered, cloud-native systems with Python, SQL and AWS.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://divyomchaudhary.me/">
  <meta property="og:image" content="assets/profile.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Divyom Chaudhary - AI and Cloud Developer Portfolio">
  <meta name="twitter:image" content="assets/profile.jpg">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"Divyom Chaudhary","url":"https://divyomchaudhary.dev/","jobTitle":"Software Developer","description":"AI and Cloud Developer specialising in Python, AWS, LangGraph and real-time pipelines","email":"divyomchaudhary@gmail.com","address":{"@type":"PostalAddress","addressLocality":"Meerut","addressCountry":"IN"},"sameAs":["https://www.linkedin.com/in/divyom-chaudhary","https://www.github.com/DivyomChaudhary"]}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Figtree:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="page-bg grain">

  <!-- HEADER -->
  <header class="site-header">
    <div class="header-inner">
      <a href="#me" class="logo-link" data-nav="me">
        <span class="logo-badge">DC</span>
        <span class="logo-text">Divyom<span class="logo-dot">.</span></span>
      </a>
      <nav class="main-nav" id="mainNav">
        <a href="#me" class="tab active" data-nav="me">Me</a>
        <a href="#work" class="tab" data-nav="work">Projects &amp; Skills</a>
        <a href="#education" class="tab" data-nav="education">Education</a>
        <a href="#contact" class="tab" data-nav="contact">Contact</a>
        <a href="#resume" class="tab" data-nav="resume">Resume &#8615;</a>
        <a href="#account" class="tab" data-nav="account">Account</a>
      </nav>
      <button class="burger" id="burgerBtn" aria-label="Open menu" aria-expanded="false">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </header>

  <!-- MOBILE DRAWER -->
  <div class="mobile-overlay" id="mobileOverlay" hidden>
    <div class="mobile-backdrop" id="mobileBackdrop"></div>
    <nav class="mobile-panel" aria-label="Mobile Menu">
      <button class="mobile-close" id="mobileClose" aria-label="Close menu">&times;</button>
      <a href="#me" class="mobile-link" data-nav="me">Me</a>
      <a href="#work" class="mobile-link" data-nav="work">Projects &amp; Skills</a>
      <a href="#education" class="mobile-link" data-nav="education">Education</a>
      <a href="#contact" class="mobile-link" data-nav="contact">Contact</a>
      <a href="#resume" class="mobile-link" data-nav="resume">Resume</a>
      <a href="#account" class="mobile-link" data-nav="account">Account</a>
    </nav>
  </div>

  <main>
    <!-- ===== ME SECTION ===== -->
    <section id="me" class="section-me scroll-mt">
      <div class="me-grid">
        <!-- Left: Featured Builds -->
        <div class="me-left rise" style="animation-delay:.05s">
          <p class="eyebrow">Featured Builds</p>
          <div class="builds-container" id="buildsContainer">
            <a href="https://github.com/DivyomChaudhary/NetraFlow" target="_blank" rel="noopener" class="ball ball-netraflow" id="ballNetraflow">
              <b>NetraFlow</b><span>Traffic-edge AI</span>
            </a>
            <a href="https://github.com/DivyomChaudhary/Level_Up_The_System" target="_blank" rel="noopener" class="ball ball-levelup" id="ballLevelup">
              <b>Level_Up</b><span>Habit engine</span>
            </a>
            <a href="#work" class="ball ball-stokd" id="ballStokd">
              <b>Stokd</b><span>AI/ML Inventory</span>
            </a>
            <svg class="builds-svg" viewBox="0 0 288 288" fill="none" aria-hidden="true">
              <path d="M144 64 L46 234 L242 226 Z" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="5 6"/>
            </svg>
          </div>
        </div>
        <!-- Centre: Portrait -->
        <div class="me-center rise" style="animation-delay:.12s">
          <div class="portrait-wrap">
            <div class="portrait-glow"></div>
            <div class="portrait-oval-frame">
              <img src="assets/profile.jpg" alt="Portrait of Divyom Chaudhary" class="portrait-img" width="320" height="400">
            </div>
            <span class="location-badge">&#128205; Meerut, India</span>
          </div>
          <h1 class="hero-name">Divyom <span class="gradient-text">Chaudhary</span></h1>
          <p class="hero-bio">CSE 2026 graduate & Aspiring AI Engineer &mdash; building AI-powered, cloud-native systems with Python, LangGraph &amp; AWS.</p>
          <div class="hero-ctas">
            <a href="#work" class="btn-primary">View projects</a>
            <a href="#contact" class="btn-outline">Say hello</a>
          </div>
        </div>
        <!-- Right: Skill Globe -->
        <div class="me-right rise" style="animation-delay:.2s">
          <p class="eyebrow">Skill Globe</p>
          <div class="globe-wrap" id="globeWrap">
            <canvas id="globeCanvas" width="340" height="340"></canvas>
          </div>
        </div>
      </div>

      <!-- Mobile balls -->
      <div class="mobile-balls">
        <a href="https://github.com/DivyomChaudhary/NetraFlow" target="_blank" rel="noopener" class="ball ball-netraflow"><b>NetraFlow</b></a>
        <a href="https://github.com/DivyomChaudhary/Level_Up_The_System" target="_blank" rel="noopener" class="ball ball-levelup"><b>Level_Up</b></a>
        <a href="#work" class="ball ball-stokd"><b>Stokd</b></a>
      </div>

      <!-- Chatbot Intro -->
      <div class="chatbot-intro rise" style="animation-delay:.3s">
        <p class="eyebrow" style="color:var(--brand-dark)">Resume, but alive</p>
        <h2 class="section-h2">Chat with my resume</h2>
        <p class="chatbot-subtitle">Ask about my background, skills, projects or certification &mdash; it answers from my actual CV.</p>
      </div>
      <div class="chatbot-wrap rise" style="animation-delay:.4s">
        <div class="chatbot" id="chatbot">
          <div class="chatbot-header">
            <span class="chatbot-avatar">DC<span class="online-dot"></span></span>
            <div>
              <p class="chatbot-name">Ask my resume</p>
              <p class="chatbot-sub">answers instantly, no sign-up</p>
            </div>
          </div>
          <div class="chatbot-messages" id="chatMessages">
            <div class="msg msg-bot">
              <p>Hi! I&#39;m Divyom&#39;s resume, in chat form. Ask me anything about him &mdash; skills, projects, certification, contact.</p>
            </div>
          </div>
          <div class="chatbot-chips" id="chatChips">
            <button class="chip" data-q="Who is Divyom?">Who am I?</button>
            <button class="chip" data-q="Tell me about NetraFlow">Tell me about NetraFlow</button>
            <button class="chip" data-q="What are Divyom's skills?">Your skills?</button>
            <button class="chip" data-q="What certifications does Divyom have?">Certifications?</button>
            <button class="chip" data-q="How can I hire or contact Divyom?">How can I hire you?</button>
          </div>
          <form class="chatbot-form" id="chatForm">
            <input type="text" id="chatInput" placeholder="Ask about skills, projects, AWS..." aria-label="Ask my resume a question" autocomplete="off">
            <button type="submit" aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9Z"/></svg>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- ===== PROJECTS & SKILLS ===== -->
    <section id="work" class="section-work scroll-mt">
      <p class="eyebrow" style="color:var(--k-teal)">The proof of work</p>
      <h2 class="section-h2">Projects &amp; Skills</h2>
      <div class="projects-grid">
        <!-- NetraFlow -->
        <article class="card rise">
          <a href="https://github.com/DivyomChaudhary/NetraFlow" target="_blank" rel="noopener" class="card-media-link">
            <div class="card-media">
              <img src="https://divyom-github-assets.s3.ap-south-1.amazonaws.com/animated.gif" alt="NetraFlow demo" loading="lazy">
              <div class="card-media-overlay"><span class="github-badge">View on GitHub &#8599;</span></div>
            </div>
          </a>
          <div class="card-body">
            <div class="card-stripe" style="background:#E4572E;"></div>
            <h3 class="card-title">NetraFlow</h3>
            <p class="card-meta">Traffic Edge Security System &mdash; AI Full-stack Engineering &middot; 2025&ndash;Present</p>
            <ul class="card-list">
              <li><span class="bullet" style="background:#E4572E;"></span><span>Real-time video &amp; data pipeline with Python, SQLite and AWS S3 &mdash; automated extraction, tracking and analytics across 400+ deployment zones</span></li>
              <li><span class="bullet" style="background:#E4572E;"></span><span>Agentic RAG dashboard connecting object tracking with a LangGraph system over SQL &mdash; sub-second natural-language analytical queries</span></li>
              <li><span class="bullet" style="background:#E4572E;"></span><span>Cut model inference time by 66% via an end-to-end preprocessing pipeline with multithreaded execution</span></li>
            </ul>
            <div class="tags">
              <span class="tag">Python</span><span class="tag">SQLite</span><span class="tag">Streamlit</span><span class="tag">Generative AI</span><span class="tag">Docker</span><span class="tag">PyTorch</span><span class="tag">CUDNN</span><span class="tag">RAG</span><span class="tag">LangChain</span><span class="tag">LangGraph</span><span class="tag">AWS</span><span class="tag">Pandas</span><span class="tag">NumPy</span>
            </div>
          </div>
        </article>
        <!-- Level_Up -->
        <article class="card rise" style="animation-delay:.1s">
          <a href="https://github.com/DivyomChaudhary/Level_Up_The_System" target="_blank" rel="noopener" class="card-media-link">
            <div class="card-media">
              <img src="https://divyom-github-assets.s3.ap-south-1.amazonaws.com/Level_Up_Animated.gif" alt="Level_Up demo" loading="lazy">
              <div class="card-media-overlay"><span class="github-badge">View on GitHub &#8599;</span></div>
            </div>
          </a>
          <div class="card-body">
            <div class="card-stripe" style="background:#0E7C7B;"></div>
            <h3 class="card-title">Level_Up</h3>
            <p class="card-meta">Habit Builder &amp; Routine Planning System &mdash; AI-Assisted Development &middot; 2026</p>
            <ul class="card-list">
              <li><span class="bullet" style="background:#0E7C7B;"></span><span>Gamification engine with multi-tier quests, penalty/reward logic, streak tracking</span></li>
              <li><span class="bullet" style="background:#0E7C7B;"></span><span>NLP parser classifying free-text into 3 schedule tiers, plus AI task planning with API fallback</span></li>
              <li><span class="bullet" style="background:#0E7C7B;"></span><span>Accountability system with a UPI wallet &mdash; QR payments and fund-freezing on missed goals</span></li>
            </ul>
            <div class="tags">
              <span class="tag">Reflex</span><span class="tag">Radix UI</span><span class="tag">Recharts</span><span class="tag">Tailwind CSS</span><span class="tag">Machine Learning</span><span class="tag">NLP</span>
            </div>
          </div>
        </article>
        <!-- Stokd -->
        <article class="card rise" style="animation-delay:.2s">
          <div class="card-body" style="padding-top:1.75rem;">
            <div class="card-stripe" style="background:#7C5CBF;"></div>
            <h3 class="card-title">Stokd</h3>
            <p class="card-meta">AI/ML enabled Inventory and Stock management</p>
            <ul class="card-list">
              <li><span class="bullet" style="background:#7C5CBF;"></span><span>AI/ML enabled Inventory and Stock management</span></li>
              <li><span class="bullet" style="background:#7C5CBF;"></span><span>Stock and inventory tracking built for clean, everyday item management</span></li>
              <li><span class="bullet" style="background:#7C5CBF;"></span><span>Ask the chatbot for a walkthrough &mdash; or grab my resume below for the full story</span></li>
              <li class="under-dev-li">
                <span class="bullet bullet-green-pulse"></span>
                <span class="under-dev-text">Under development</span>
              </li>
            </ul>
            <div class="tags"><span class="tag">Python</span><span class="tag">SQL</span></div>
          </div>
        </article>
      </div>

      <h3 class="toolbox-title">Toolbox</h3>
      <div class="toolbox-grid">
        <div class="toolbox-card">
          <div class="toolbox-header"><span class="toolbox-dot" style="background:#E4572E;"></span><h4 class="toolbox-name">Programming</h4></div>
          <div class="toolbox-tags"><span class="ttag" style="background:#E4572E22;color:#C7431F;">Python</span><span class="ttag" style="background:#E4572E22;color:#C7431F;">SQL</span></div>
        </div>
        <div class="toolbox-card">
          <div class="toolbox-header"><span class="toolbox-dot" style="background:#7C5CBF;"></span><h4 class="toolbox-name">Frameworks &amp; Libraries</h4></div>
          <div class="toolbox-tags">
            <span class="ttag" style="background:#7C5CBF22;color:#6A4BA8;">PyTorch</span><span class="ttag" style="background:#7C5CBF22;color:#6A4BA8;">LangChain</span><span class="ttag" style="background:#7C5CBF22;color:#6A4BA8;">LangGraph</span><span class="ttag" style="background:#7C5CBF22;color:#6A4BA8;">Pandas</span><span class="ttag" style="background:#7C5CBF22;color:#6A4BA8;">NumPy</span><span class="ttag" style="background:#7C5CBF22;color:#6A4BA8;">Streamlit</span><span class="ttag" style="background:#7C5CBF22;color:#6A4BA8;">Reflex</span>
          </div>
        </div>
        <div class="toolbox-card">
          <div class="toolbox-header"><span class="toolbox-dot" style="background:#0E7C7B;"></span><h4 class="toolbox-name">Tools &amp; Platforms</h4></div>
          <div class="toolbox-tags">
            <span class="ttag" style="background:#0E7C7B22;color:#0E7C7B;">Git</span><span class="ttag" style="background:#0E7C7B22;color:#0E7C7B;">GitHub</span><span class="ttag" style="background:#0E7C7B22;color:#0E7C7B;">Docker</span><span class="ttag" style="background:#0E7C7B22;color:#0E7C7B;">Linux</span><span class="ttag" style="background:#0E7C7B22;color:#0E7C7B;">AWS</span><span class="ttag" style="background:#0E7C7B22;color:#0E7C7B;">Terraform</span>
          </div>
        </div>
        <div class="toolbox-card">
          <div class="toolbox-header"><span class="toolbox-dot" style="background:#F2B441;"></span><h4 class="toolbox-name">Databases</h4></div>
          <div class="toolbox-tags"><span class="ttag" style="background:#F2B44122;color:#A16207;">SQLite</span><span class="ttag" style="background:#F2B44122;color:#A16207;">MySQL</span><span class="ttag" style="background:#F2B44122;color:#A16207;">PostgreSQL</span></div>
        </div>
        <div class="toolbox-card toolbox-cert">
          <div class="toolbox-header"><span class="toolbox-dot" style="background:#F29019;"></span><h4 class="toolbox-name">Certification</h4></div>
          <div class="cert-content">
            <div class="cert-icon">&#9729;</div>
            <div>
              <p class="cert-name">AWS Certified Cloud Practitioner</p>
              <p class="cert-sub">Amazon Web Services &middot; CLF-C02 &middot; Jul 2025 &ndash; Jul 2028</p>
              <a href="https://cp.certmetrics.com/amazon/en/public/verify/credential/a26c7a8fad414f9ba36ef928af16322a" target="_blank" rel="noopener" class="cert-link">Verify credential &#8599;</a>
            </div>
          </div>
        </div>
        <div class="toolbox-card">
          <div class="toolbox-header"><span class="toolbox-dot" style="background:#3776AB;"></span><h4 class="toolbox-name">AI / ML</h4></div>
          <div class="toolbox-tags">
            <span class="ttag" style="background:#3776AB22;color:#3776AB;">PyTorch</span><span class="ttag" style="background:#3776AB22;color:#3776AB;">CUDNN</span><span class="ttag" style="background:#3776AB22;color:#3776AB;">RAG</span><span class="ttag" style="background:#3776AB22;color:#3776AB;">Machine Learning</span><span class="ttag" style="background:#3776AB22;color:#3776AB;">NLP</span><span class="ttag" style="background:#3776AB22;color:#3776AB;">Generative AI</span>
          </div>
        </div>
      </div>

      <div class="achieve-grid">
        <div class="achieve-card achieve-cert rise">
          <div class="achieve-icon" style="background:rgba(242,144,25,0.15);">&#9729;</div>
          <div>
            <h4 class="achieve-title">AWS Certified Cloud Practitioner</h4>
            <p class="achieve-sub">Amazon Web Services &middot; CLF-C02</p>
          </div>
          <p class="achieve-body">Earned Jul 2025 &mdash; valid through Jul 2028. Backed by real deployments: end-to-end project delivery on AWS.</p>
          <a href="https://cp.certmetrics.com/amazon/en/public/verify/credential/a26c7a8fad414f9ba36ef928af16322a" target="_blank" rel="noopener" class="verify-link">Verify credential &#8599;</a>
        </div>
        <div class="achieve-card achieve-award rise" style="animation-delay:.1s">
          <div class="achieve-icon" style="background:rgba(228,87,46,0.15);">&#127942;</div>
          <div><h4 class="achieve-title">Awards &amp; Achievements</h4></div>
          <ul class="achieve-list">
            <li>TPO top 5% programmers &mdash; Rank 12/500, all CSE-allied branches</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ===== EDUCATION ===== -->
    <section id="education" class="section-education scroll-mt">
      <p class="eyebrow" style="color:var(--k-violet)">Learning journey</p>
      <h2 class="section-h2">Education</h2>
      <div class="edu-grid">
        <div class="edu-card rise">
          <div class="edu-timeline-dot" style="background:#E4572E;"></div>
          <div class="edu-card-inner">
            <div class="edu-icon" style="background:rgba(228,87,46,0.12);">&#127891;</div>
            <div class="edu-info">
              <h3 class="edu-degree">B.Tech &mdash; Computer Science &amp; Engineering</h3>
              <p class="edu-inst">Meerut Institute of Engineering &amp; Technology (MIET), Meerut</p>
              <p class="edu-year">2022 &ndash; 2026</p>
            </div>
          </div>
          <p class="edu-desc">Pursuing a four-year engineering degree focused on computer science fundamentals, software development, AI/ML, and cloud computing. Active participant in department tech events and coding competitions.</p>
        </div>
        <div class="edu-card rise" style="animation-delay:.1s">
          <div class="edu-timeline-dot" style="background:#0E7C7B;"></div>
          <div class="edu-card-inner">
            <div class="edu-icon" style="background:rgba(14,124,123,0.12);">&#128218;</div>
            <div class="edu-info">
              <h3 class="edu-degree">Senior Secondary &mdash; PCM + CS</h3>
              <p class="edu-inst">Class XII &middot; CBSE</p>
              <p class="edu-year">Completed 2022</p>
            </div>
          </div>
          <p class="edu-desc">Physics, Chemistry, Mathematics with Computer Science. Built a strong foundation in analytical thinking and programming basics.</p>
        </div>
        <div class="edu-card edu-achieve rise" style="animation-delay:.2s">
          <div class="edu-timeline-dot" style="background:#F2B441;"></div>
          <div class="edu-card-inner">
            <div class="edu-icon" style="background:rgba(242,180,65,0.18);">&#127942;</div>
            <div class="edu-info">
              <h3 class="edu-degree">Top 5% Programmer &mdash; TPO Recognition</h3>
              <p class="edu-inst">Placement &amp; Training Office, MIET</p>
              <p class="edu-year">2024</p>
            </div>
          </div>
          <p class="edu-desc">Ranked <strong>12 out of 500</strong> across all CSE-allied branches in the TPO-conducted programming evaluation &mdash; placing in the top 5% institute-wide.</p>
        </div>
      </div>
    </section>

    <!-- ===== CONTACT ===== -->
    <section id="contact" class="section-contact scroll-mt">
      <p class="eyebrow" style="color:var(--k-violet)">Find me everywhere</p>
      <h2 class="section-h2">Let&#39;s build something</h2>
      <div class="contact-grid">
        <a href="mailto:divyomchaudhary@gmail.com" class="contact-card" id="contact-email">
          <span class="contact-icon" style="background:rgba(228,87,46,.15);color:var(--primary);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m22 7-10 6L2 7"/></svg>
          </span>
          <h4 class="contact-label">Email</h4>
          <p class="contact-value">divyomchaudhary@gmail.com</p>
        </a>
        <a href="https://github.com/DivyomChaudhary" target="_blank" rel="noopener" class="contact-card" id="contact-github">
          <span class="contact-icon" style="background:rgba(51,38,27,.12);color:var(--foreground);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14v3.17c0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
          </span>
          <h4 class="contact-label">GitHub</h4>
          <p class="contact-value">github.com/DivyomChaudhary</p>
        </a>
        <a href="https://www.linkedin.com/in/divyom-chaudhary" target="_blank" rel="noopener" class="contact-card" id="contact-linkedin">
          <span class="contact-icon" style="background:rgba(62,124,177,.15);color:#3E7CB1;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45Z"/></svg>
          </span>
          <h4 class="contact-label">LinkedIn</h4>
          <p class="contact-value">linkedin.com/in/divyom-chaudhary</p>
        </a>
      </div>
      <div class="contact-form-wrap">
        <form class="contact-form" id="contactForm">
          <h3 class="form-title">Drop me a message</h3>
          <div class="form-group">
            <label for="fc_name">Your name <span class="req">*</span></label>
            <input id="fc_name" type="text" name="name" required placeholder="Jane Smith">
          </div>
          <div class="form-group">
            <label for="fc_email">Your email <span class="req">*</span></label>
            <input id="fc_email" type="email" name="email" required placeholder="jane@example.com">
          </div>
          <div class="form-group">
            <label for="fc_msg">Message <span class="req">*</span></label>
            <textarea id="fc_msg" name="message" required rows="4" placeholder="Hi Divyom, I&#39;d love to chat about..."></textarea>
          </div>
          <button type="submit" class="btn-primary" id="formSubmitBtn">Send message</button>
          <p class="form-success" id="formSuccess" hidden>Message noted! I&#39;ll get back to you soon.</p>
        </form>
      </div>
    </section>

    <!-- ===== RESUME ===== -->
    <section id="resume" class="section-resume scroll-mt">
      <div class="resume-card">
        <p class="eyebrow" style="color:#A16207;">One page, whole story</p>
        <h2 class="section-h2">Grab my resume</h2>
        <p class="resume-desc">Summary in brief: Python &amp; SQL at the core, AI with PyTorch / LangChain / LangGraph, cloud-native delivery on AWS (certified practitioner), CI/CD with Git &amp; Docker, and three shipped projects &mdash; NetraFlow, Level_Up and Stokd.</p>
        <div class="resume-ctas">
          <a href="https://drive.google.com/file/d/1JuBGFE1qIOhJW1V6c6dUDudGLlS9y1yY/view?usp=drive_link" target="_blank" rel="noopener" class="btn-primary" id="downloadResume">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume (PDF)
          </a>
          <a href="#contact" class="btn-outline">Or just email me</a>
        </div>
      </div>
    </section>

    <!-- ===== ACCOUNT ===== -->
    <section id="account" class="section-account scroll-mt">
      <p class="eyebrow" style="color:var(--brand-dark)">Control room</p>
      <h2 class="section-h2">Account</h2>
      <p class="account-intro">The control room of this portfolio &mdash; track the questions visitors ask, and teach the chatbot new answers.</p>
      <div id="accountGate" class="account-gate">
        <div class="auth-card">
          <div class="auth-logo">&#128274;</div>
          <h3 class="auth-title">Owner access only</h3>
          <p class="auth-sub">Sign in with the owner email to view analytics and teach the chatbot.</p>
          <button class="btn-primary google-btn" id="googleSignIn" onclick="handleGoogleSignIn()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>
        </div>
      </div>
      <div id="accountDashboard" class="account-dashboard" hidden>
        <div class="signed-in-bar">
          <div>
            <p class="signed-in-label">SIGNED IN</p>
            <p class="signed-in-email" id="signedInEmail">divyomchaudhary@gmail.com</p>
          </div>
          <div class="signed-in-right">
            <div class="user-avatar" id="userAvatar">D</div>
            <span id="userName">Divyom Chaudhary</span>
            <button class="sign-out-btn" onclick="handleSignOut()">Sign out</button>
          </div>
        </div>
        <div class="stats-grid">
          <div class="stat-card"><span class="stat-num" id="statQuestions">0</span><span class="stat-label">Questions asked</span><span class="stat-sub">by visitors, all time</span></div>
          <div class="stat-card"><span class="stat-num" id="statAnswered">0</span><span class="stat-label">Answered</span><span class="stat-sub">matched the resume</span></div>
          <div class="stat-card"><span class="stat-num" id="statCustom">0</span><span class="stat-label">Custom answers</span><span class="stat-sub">taught by you</span></div>
        </div>
        <div class="account-two-col">
          <div class="teach-card">
            <h3 class="teach-title">Teach the chatbot</h3>
            <p class="teach-sub">Add a question and the answer the chatbot should give. It uses these before anything else.</p>
            <form id="teachForm">
              <input type="text" id="teachQ" placeholder="Visitor might ask... e.g. Are you open to relocation?" class="teach-input">
              <textarea id="teachA" placeholder="The chatbot should reply..." class="teach-textarea" rows="4"></textarea>
              <button type="submit" class="btn-primary" id="teachSubmit">Add answer</button>
            </form>
            <div class="custom-answers" id="customAnswers">
              <p class="no-answers" id="noAnswersMsg">No custom answers yet &mdash; add your first above.</p>
            </div>
          </div>
          <div class="questions-card">
            <h3 class="questions-title">What visitors asked</h3>
            <p class="questions-sub">Live log of questions sent to the chatbot.</p>
            <div class="questions-list" id="questionsList"></div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <p>&copy; 2026 Divyom Chaudhary &mdash; built with passion from Meerut, India.</p>
      <div class="footer-links">
        <a href="mailto:divyomchaudhary@gmail.com">Email</a>
        <a href="https://github.com/DivyomChaudhary" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.linkedin.com/in/divyom-chaudhary" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  </footer>
</div>
<script src="config.js"></script>
<script src="globe.js"></script>
<script src="main.js"></script>
</body>
</html>"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("index.html written successfully:", len(html), "chars")
