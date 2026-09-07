/**
 * globe.js — Skill Globe (Canvas 2D)
 * Accurate brand icons, hover-pause, anti-clockwise rotation
 */
(function () {
  "use strict";

  /* ── AWS: official black bg / white "aws" / yellow smile ─────────────────── */
  /* ── CUDNN/Nvidia: green eye logo ──────────────────────────────────────────── */
  /* ── SQLite: feather quill icon ─────────────────────────────────────────────── */
  /* ── Streamlit: red crown / boat shape ──────────────────────────────────────── */
  /* ── Pandas: blue-pink vertical bars ────────────────────────────────────────── */
  /* ── NumPy: teal 3D cube with N ─────────────────────────────────────────────── */
  /* ── Linux Tux: black body / yellow beak / white belly ───────────────────────  */
  /* ── PostgreSQL: blue elephant ───────────────────────────────────────────────── */
  /* ── MySQL: official dolphin blue ────────────────────────────────────────────── */
  /* ── PyTorch: red flame logo ──────────────────────────────────────────────────── */

  // Each skill: name, color, drawFn(ctx, size) — draw centered at (0,0) in 24×24 box
  var SKILLS = [
    /* ── Python ────────────────────────────────────────────────────────────── */
    {
      name: "Python", color: "#3776AB",
      draw: function (ctx) {
        ctx.fillStyle = "#FFD43B";
        var p1 = new Path2D("M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.89S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.131V3.19S18.28 0 11.914 0zm-3.2 1.848a1.04 1.04 0 1 1 0 2.079 1.04 1.04 0 0 1 0-2.079z");
        ctx.fillStyle = "#3776AB"; ctx.fill(p1);
        ctx.fillStyle = "#FFD43B";
        var p2 = new Path2D("M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H11.98v-.826h8.13S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.402-3.35 3.402H9.451s-3.24-.052-3.24 3.131v5.309S5.72 24 12.086 24zm3.2-1.848a1.04 1.04 0 1 1 0-2.079 1.04 1.04 0 0 1 0 2.079z");
        ctx.fill(p2);
        // Draw the blue snake body over yellow
        ctx.fillStyle = "#3776AB"; ctx.fill(p1);
      }
    },

    /* ── AWS ────────────────────────────────────────────────────────────────── */
    {
      name: "AWS", color: "#232F3E",
      draw: function (ctx) {
        // "aws" in white — clean, readable, no distortion
        ctx.fillStyle = "#fff";
        ctx.font = "bold 8.5px 'Arial Narrow', Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("aws", 12, 10);
        // Orange smile arc beneath the text
        ctx.strokeStyle = "#FF9900";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(12, 18, 5, Math.PI * 0.15, Math.PI * 0.85, false);
        ctx.stroke();
        // Arrow tip at the right end of the smile
        ctx.beginPath();
        ctx.moveTo(16.2, 15.8); ctx.lineTo(17, 18); ctx.lineTo(15, 17.5);
        ctx.stroke();
      }
    },

    /* ── PyTorch ─────────────────────────────────────────────────────────────── */
    {
      name: "PyTorch", color: "#EE4C2C",
      draw: function (ctx) {
        ctx.fillStyle = "#fff";
        // Flame base
        var p = new Path2D("M12.3 2C9.1 5.5 7 8.4 7 11.6 7 15.6 9.2 19 12 19s5-3.4 5-7.4c0-1.7-.6-3.4-1.5-4.9-.4.7-.8 1.1-1.4 1.1-1.5 0-2.3-2-1.8-5.8z");
        ctx.fill(p);
        // Red dot at top of flame
        ctx.fillStyle = "#EE4C2C";
        ctx.beginPath(); ctx.arc(13.5, 9, 1.4, 0, Math.PI * 2); ctx.fill();
      }
    },

    /* ── Docker ─────────────────────────────────────────────────────────────── */
    {
      name: "Docker", color: "#2496ED",
      draw: function (ctx) {
        ctx.fillStyle = "#fff";
        var p = new Path2D("M13.98 11.08h2.12v-2.1H13.98v2.1zm-3.02 0h2.12v-2.1H10.96v2.1zm-3.02 0h2.12v-2.1H7.94v2.1zm3.02-2.96h2.12V6.02H10.96v2.1zm-3.02 0h2.12V6.02H7.94v2.1zm6.04 0h2.12V6.02H13.98v2.1zM7.94 11.08H5.82v-2.1h2.12v2.1zM21.7 11.73c-.47-.35-1.55-.48-2.37-.3-.1-.8-.56-1.5-1.37-2.06l-.47-.3-.32.46c-.4.6-.52 1.6-.1 2.26-.19.1-.56.26-.7.3H.7c-.4 0-.7.3-.7.7-.02 1.6.46 3.15 1.44 4.34.97 1.2 2.42 2.04 4.2 2.47.7.18 1.43.26 2.17.26 1.1 0 2.18-.2 3.17-.57 1.22-.46 2.27-1.22 3.13-2.21.95 1.1 2.12 1.78 3.74 1.78h.15c.2 0 .4-.02.58-.05.18-.03.35-.08.5-.15l.27-.13-.07-.28c-.27-1.05.07-1.75.56-2.28.23-.25.5-.46.8-.6z");
        ctx.fill(p);
      }
    },

    /* ── Linux Tux (colored) ─────────────────────────────────────────────────── */
    {
      name: "Linux", color: "#1a1a1a",
      draw: function (ctx) {
        // Black body
        ctx.fillStyle = "#1a1a1a";
        var body = new Path2D("M12 3c-2.5 0-4 1.8-4 4 0 1 .3 2 .8 2.8C7.6 11 7 12.5 7 14.5c0 3.5 2 5.5 5 5.5s5-2 5-5.5c0-2-.6-3.5-1.8-4.7.5-.8.8-1.8.8-2.8 0-2.2-1.5-4-4-4z");
        ctx.fill(body);
        // White belly
        ctx.fillStyle = "#ffffff";
        var belly = new Path2D("M12 10c1.5 0 2.8 1.5 2.8 4.5s-1 3.5-2.8 3.5-2.8-.5-2.8-3.5S10.5 10 12 10z");
        ctx.fill(belly);
        // Yellow beak + feet
        ctx.fillStyle = "#f0c020";
        var beak = new Path2D("M11 7.5c0 .3-.5.8-1 .8s-.5-.3-.5-.5c0-.4.5-.8 1-.8s.5.2.5.5zm2 0c0 .3.5.5.5.5s1-.5 1-.8-.5-.5-.5-.5c-.5 0-1 .4-1 .8z");
        ctx.fill(beak);
        // Beak center line
        ctx.fillStyle = "#e0a000";
        var beakCenter = new Path2D("M10.5 8.2h3c.3 0 .5.2.5.4v.4c0 .5-.5.8-1.5.8h-1c-1 0-1.5-.3-1.5-.8v-.4c0-.2.2-.4.5-.4z");
        ctx.fill(beakCenter);
        // Eyes (white)
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(10.5, 6, 1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(13.5, 6, 1, 0, Math.PI * 2); ctx.fill();
        // Pupils
        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath(); ctx.arc(10.7, 6, 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(13.7, 6, 0.4, 0, Math.PI * 2); ctx.fill();
        // Feet
        ctx.fillStyle = "#f0c020";
        ctx.beginPath(); ctx.moveTo(9, 20); ctx.lineTo(8, 22); ctx.lineTo(11, 22); ctx.lineTo(10, 20); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(14, 20); ctx.lineTo(13, 22); ctx.lineTo(16, 22); ctx.lineTo(15, 20); ctx.closePath(); ctx.fill();
      }
    },

    /* ── Git ─────────────────────────────────────────────────────────────────── */
    {
      name: "Git", color: "#F05033",
      draw: function (ctx) {
        ctx.fillStyle = "#fff";
        var p = new Path2D("M21.6 12.2L12.8 3.4a1.9 1.9 0 0 0-2.7 0l-1.7 1.7 2.4 2.4a1.5 1.5 0 0 1 1.9 1.9l2.3 2.3a1.5 1.5 0 1 1-.9.9l-2.2-2.3v6a1.5 1.5 0 1 1-1 0V9.7a1.5 1.5 0 0 1-.8-1L8.6 6.3 2.4 12.5a1.9 1.9 0 0 0 0 2.7l8.8 8.8a1.9 1.9 0 0 0 2.7 0l7.7-7.7a1.9 1.9 0 0 0 0-2.7z");
        ctx.fill(p);
      }
    },

    /* ── GitHub ──────────────────────────────────────────────────────────────── */
    {
      name: "GitHub", color: "#24292e",
      draw: function (ctx) {
        ctx.fillStyle = "#fff";
        var p = new Path2D("M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3");
        ctx.fill(p);
      }
    },

    /* ── LangChain ───────────────────────────────────────────────────────────── */
    {
      name: "LangChain", color: "#1C7A4B",
      draw: function (ctx) {
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.stroke(new Path2D("M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7.07-7.07L11 5.5"));
        ctx.stroke(new Path2D("M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7.07 7.07L13 18.5"));
      }
    },

    /* ── LangGraph ───────────────────────────────────────────────────────────── */
    {
      name: "LangGraph", color: "#7C5CBF",
      draw: function (ctx) {
        ctx.fillStyle = "#fff";
        [{ x: 5, y: 5 }, { x: 19, y: 5 }, { x: 5, y: 19 }, { x: 19, y: 19 }, { x: 12, y: 12 }].forEach(function (pt) {
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2); ctx.fill();
        });
        ctx.strokeStyle = "rgba(255,255,255,0.7)"; ctx.lineWidth = 1.5;
        [[5, 5, 12, 12], [19, 5, 12, 12], [5, 19, 12, 12], [19, 19, 12, 12]].forEach(function (l) {
          ctx.beginPath(); ctx.moveTo(l[0], l[1]); ctx.lineTo(l[2], l[3]); ctx.stroke();
        });
      }
    },

    /* ── NumPy — teal cube with N on face ────────────────────────────────────── */
    {
      name: "NumPy", color: "#013243",
      draw: function (ctx) {
        // Top face
        ctx.fillStyle = "#4DABCF";
        ctx.beginPath(); ctx.moveTo(12, 2); ctx.lineTo(21, 7); ctx.lineTo(12, 12); ctx.lineTo(3, 7); ctx.closePath(); ctx.fill();
        // Right face
        ctx.fillStyle = "#008DCA";
        ctx.beginPath(); ctx.moveTo(21, 7); ctx.lineTo(21, 17); ctx.lineTo(12, 22); ctx.lineTo(12, 12); ctx.closePath(); ctx.fill();
        // Left face
        ctx.fillStyle = "#013243";
        ctx.beginPath(); ctx.moveTo(3, 7); ctx.lineTo(12, 12); ctx.lineTo(12, 22); ctx.lineTo(3, 17); ctx.closePath(); ctx.fill();
        // "N" on front-left face
        ctx.fillStyle = "#4DABCF";
        ctx.font = "bold 6px sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.save(); ctx.translate(7.5, 14.5); ctx.rotate(-Math.PI / 6); ctx.fillText("N", 0, 0); ctx.restore();
      }
    },

    /* ── Pandas — official blue/pink vertical bars ───────────────────────────── */
    {
      name: "Pandas", color: "#150458",
      draw: function (ctx) {
        // Left column (dark blue)
        ctx.fillStyle = "#150458";
        ctx.fillRect(3, 4, 4, 16);
        // Middle column top (pink)
        ctx.fillStyle = "#E70488";
        ctx.fillRect(10, 4, 4, 6);
        // Middle column bottom (dark blue)
        ctx.fillStyle = "#150458";
        ctx.fillRect(10, 14, 4, 6);
        // Right column (dark blue)
        ctx.fillStyle = "#150458";
        ctx.fillRect(17, 4, 4, 16);
        // Small squares (pandas logo style)
        ctx.fillStyle = "#E70488";
        ctx.fillRect(3, 11, 4, 3);
        ctx.fillStyle = "#150458";
        ctx.fillRect(17, 8, 4, 3);
        ctx.fillStyle = "#E70488";
        ctx.fillRect(17, 12, 4, 3);
      }
    },

    /* ── Terraform ───────────────────────────────────────────────────────────── */
    {
      name: "Terraform", color: "#7B42BC",
      draw: function (ctx) {
        ctx.fillStyle = "#fff";
        var p = new Path2D("M3 5l6 3v6L3 11V5zm8 4l6 3v6l-6-3V9zm-1 1v6l-6 3v-6l6-3zm8-1l3-1.5v6L18 15V9z");
        ctx.fill(p);
      }
    },

    /* ── RAG ─────────────────────────────────────────────────────────────────── */
    {
      name: "RAG", color: "#D97706",
      draw: function (ctx) {
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.fill(new Path2D("M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"));
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.8; ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.stroke(new Path2D("M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"));
        ctx.stroke(new Path2D("M14 2v6h6M8 13h8M8 17h6M8 9h2"));
      }
    },

    /* ── Streamlit — 3-peak crown matching official logo ──────────────────── */
    {
      name: "Streamlit", color: "#FF4B4B",
      draw: function (ctx) {
        ctx.fillStyle = "#fff";
        // Crown base
        ctx.fillRect(2, 17, 20, 4);
        // Left tooth
        ctx.beginPath(); ctx.moveTo(2, 17); ctx.lineTo(5.5, 8); ctx.lineTo(9, 17); ctx.closePath(); ctx.fill();
        // Centre tooth (tallest)
        ctx.beginPath(); ctx.moveTo(8.5, 17); ctx.lineTo(12, 5); ctx.lineTo(15.5, 17); ctx.closePath(); ctx.fill();
        // Right tooth
        ctx.beginPath(); ctx.moveTo(15, 17); ctx.lineTo(18.5, 8); ctx.lineTo(22, 17); ctx.closePath(); ctx.fill();
      }
    },

    /* ── NLP ─────────────────────────────────────────────────────────────────── */
    {
      name: "NLP", color: "#0EA5E9",
      draw: function (ctx) {
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.8; ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.stroke(new Path2D("M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"));
      }
    },

    /* ── CUDNN / Nvidia — green eye logo ──────────────────────────────────────── */
    {
      name: "CUDNN", color: "#76B900",
      draw: function (ctx) {
        ctx.fillStyle = "#fff";
        // Nvidia eye: an open eye shape
        ctx.beginPath(); ctx.moveTo(2, 12); ctx.bezierCurveTo(2, 6, 22, 6, 22, 12); ctx.bezierCurveTo(22, 18, 2, 18, 2, 12); ctx.closePath();
        ctx.fill();
        // Pupil (green)
        ctx.fillStyle = "#76B900";
        ctx.beginPath(); ctx.arc(12, 12, 4.5, 0, Math.PI * 2); ctx.fill();
        // Inner pupil (white)
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(10.5, 10.5, 1.5, 0, Math.PI * 2); ctx.fill();
      }
    },

    /* ── SQLite — feather quill icon ─────────────────────────────────────────── */
    {
      name: "SQLite", color: "#4B8BBE",
      draw: function (ctx) {
        ctx.fillStyle = "#fff";
        // Feather quill
        var p = new Path2D("M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 13H11V8");
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.8; ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.stroke(p);
        // Quill tip detail
        ctx.stroke(new Path2D("M15 5.5l3.5 3.5"));
        // Bottom line
        ctx.stroke(new Path2D("M2 20l4-4"));
      }
    },

    /* ── MySQL — blue & orange official dolphin ──────────────────────────────── */
    {
      name: "MySQL", color: "#4479A1",
      draw: function (ctx) {
        // Body — leaping dolphin arc
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(4, 18);
        ctx.bezierCurveTo(3, 12, 6, 6, 12, 5);
        ctx.bezierCurveTo(17, 4, 20, 8, 19, 12);
        ctx.bezierCurveTo(18, 16, 15, 17, 13, 16);
        ctx.bezierCurveTo(11, 15, 10, 13, 12, 12);
        ctx.bezierCurveTo(14, 11, 16, 13, 15, 15);
        ctx.lineTo(18, 13);
        ctx.bezierCurveTo(19, 9, 16, 6, 12, 7);
        ctx.bezierCurveTo(7, 8, 5, 13, 7, 18);
        ctx.closePath();
        ctx.fill();
        // Dorsal fin
        ctx.beginPath();
        ctx.moveTo(15, 8);
        ctx.bezierCurveTo(17, 5, 20, 4, 21, 5);
        ctx.bezierCurveTo(20, 7, 18, 8, 16, 9);
        ctx.closePath();
        ctx.fill();
        // Tail fluke (orange accent)
        ctx.fillStyle = "#FF6600";
        ctx.beginPath();
        ctx.moveTo(4, 18);
        ctx.bezierCurveTo(2, 20, 1, 22, 3, 22);
        ctx.bezierCurveTo(5, 22, 6, 20, 7, 18);
        ctx.bezierCurveTo(5, 17, 4.5, 18, 4, 18);
        ctx.closePath();
        ctx.fill();
      }
    },

    /* ── PostgreSQL — blue elephant head ──────────────────────────────────────── */
    {
      name: "PostgreSQL", color: "#336791",
      draw: function (ctx) {
        ctx.fillStyle = "#fff";
        // Elephant head silhouette
        var head = new Path2D("M16 4c2.2 0 4 1.8 4 4 0 1.4-.7 2.6-1.8 3.4C18.7 12.2 19 13 19 14c0 2.8-2.2 5-5 5h-4c-2.8 0-5-2.2-5-5 0-1 .3-1.8.8-2.6C4.7 10.6 4 9.4 4 8c0-2.2 1.8-4 4-4h.2C8.8 3.4 9.7 3 11 3c.8 0 1.5.2 2.1.5.9-.3 1.9-.5 2.9-.5zm-4 2c-1 0-1.8.4-2.3 1H9c-1.1 0-2 .9-2 2s.9 2 2 2h6c1.1 0 2-.9 2-2s-.9-2-2-2h-.7C13.8 6.4 13 6 12 6zm-2 7c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm4 0c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z");
        ctx.fill(head);
        // Trunk
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(15, 7); ctx.bezierCurveTo(18, 5, 20, 2, 19, 1); ctx.stroke();
      }
    },
  ];

  /* ── Fibonacci sphere distribution ────────────────────────────────────────── */
  function fibonacciSphere(n) {
    var pts = [], golden = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < n; i++) {
      var y = 1 - (i / (n - 1)) * 2;
      var r = Math.sqrt(1 - y * y);
      var theta = golden * i;
      pts.push({ x: Math.cos(theta) * r, y: y, z: Math.sin(theta) * r });
    }
    return pts;
  }

  /* ── Draw one icon tile ────────────────────────────────────────────────────── */
  function drawIcon(ctx, skill, cx, cy, size, alpha) {
    var r = size / 2;
    ctx.save();
    ctx.globalAlpha = Math.max(0.12, alpha);

    // Background circle
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = skill.color; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.22)"; ctx.lineWidth = 0.8; ctx.stroke();

    // Icon (24×24 viewBox scaled to fit inside circle)
    var s = (size * 0.62) / 24;
    ctx.save();
    ctx.translate(cx - 12 * s, cy - 12 * s);
    ctx.scale(s, s);
    ctx.lineWidth = 2 / s;
    skill.draw(ctx);
    ctx.restore();

    // Name label
    var labelSize = Math.max(7, size * 0.26);
    ctx.font = "600 " + labelSize + "px 'Figtree',sans-serif";
    ctx.fillStyle = "rgba(26,23,20,0.88)";
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(skill.name, cx, cy + r + 3);
    ctx.restore();
  }

  /* ── Globe init ────────────────────────────────────────────────────────────── */
  function initGlobe() {
    var canvas = document.getElementById("globeCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    var cxC = W / 2, cyC = H / 2;
    var R = Math.min(W, H) * 0.40;
    var pts = fibonacciSphere(SKILLS.length);
    var angleY = 0, paused = false;

    function render() {
      ctx.clearRect(0, 0, W, H);
      var items = pts.map(function (p, i) {
        var cosA = Math.cos(angleY), sinA = Math.sin(angleY);
        var x3 = p.x * cosA - p.z * sinA;
        var z3 = p.x * sinA + p.z * cosA;
        return { skill: SKILLS[i], x: cxC + x3 * R, y: cyC + p.y * R, z: z3, scale: (z3 + 1.6) / 2.6, alpha: (z3 + 1.5) / 2.5 };
      });
      items.sort(function (a, b) { return a.z - b.z; });
      items.forEach(function (item) { drawIcon(ctx, item.skill, item.x, item.y, Math.max(18, 34 * item.scale), item.alpha); });
      if (!paused) angleY -= 0.006;
      requestAnimationFrame(render);
    }
    render();

    canvas.addEventListener("mouseenter", function () { paused = true; });
    canvas.addEventListener("mouseleave", function () { paused = false; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initGlobe);
  else initGlobe();
})();
