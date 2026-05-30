/* ORM — All 10 Automation Features Engine
   Features: Pledge Wall, Countdown, Progress Bar, Certificate,
   Broadcast Generator, School Reg, Stats Animation,
   Social Sharing, Push Notifications */

// ================================================
// FEATURE 1 — PLEDGE WALL
// ================================================
function initPledgeWall() {
  const pledgeForm = document.getElementById("pledge-form");
  const pledgeCounter = document.getElementById("pledge-counter");
  const pledgeList = document.getElementById("pledge-names-list");

  function getPledges() {
    return JSON.parse(localStorage.getItem("orm_pledges") || "[]");
  }

  function renderPledgeWall() {
    const pledges = getPledges();
    if (pledgeCounter) animateCount(pledgeCounter, pledges.length, 1200);
    if (pledgeList) {
      pledgeList.innerHTML = pledges.slice(0, 30).map(p =>
        `<div class="pledge-chip">
          <span class="pledge-avatar">${p.name.charAt(0).toUpperCase()}</span>
          <span class="pledge-name">${p.name}</span>
          <span class="pledge-loc">${p.state || "Nigeria"}</span>
        </div>`
      ).join("") + (pledges.length > 30 ? `<div class="pledge-chip-more">+${pledges.length - 30} more pledges</div>` : "");
    }
  }

  if (pledgeForm) {
    pledgeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("pledge-name").value.trim();
      const state = document.getElementById("pledge-state").value.trim();
      if (!name) return;
      const pledges = getPledges();
      // Prevent duplicates
      if (pledges.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        window.showToast("You have already signed the pledge! 🌿");
        return;
      }
      pledges.unshift({ name, state, date: new Date().toISOString() });
      localStorage.setItem("orm_pledges", JSON.stringify(pledges));
      pledgeForm.reset();
      renderPledgeWall();
      window.showToast(`Thank you ${name}! Your integrity pledge is recorded. 🌿`);
      // Auto social share offer
      showSocialShare("pledge", name, state);
    });
  }

  renderPledgeWall();
}

// ================================================
// FEATURE 2 — LIVE EVENT COUNTDOWN TIMER
// ================================================
function initEventCountdown() {
  const container = document.getElementById("event-countdown-widget");
  if (!container) return;

  function updateCountdown() {
    const events = window.db ? window.db.getEvents() : [];
    const now = new Date();
    const upcoming = events
      .filter(e => new Date(e.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!upcoming.length) {
      container.innerHTML = `<div class="countdown-empty">No upcoming events scheduled</div>`;
      return;
    }

    const next = upcoming[0];
    const target = new Date(next.date + "T" + (next.time || "09:00"));
    const diff = target - now;

    if (diff <= 0) {
      container.innerHTML = `<div class="countdown-live"><i class="fas fa-circle" style="color:#25D366;"></i> Event is LIVE now!</div>`;
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    container.innerHTML = `
      <div class="countdown-label">⏱ Next Event: <strong>${next.title}</strong></div>
      <div class="countdown-timer">
        <div class="countdown-unit"><span class="countdown-num">${String(days).padStart(2,"0")}</span><span class="countdown-sub">Days</span></div>
        <div class="countdown-sep">:</div>
        <div class="countdown-unit"><span class="countdown-num">${String(hours).padStart(2,"0")}</span><span class="countdown-sub">Hours</span></div>
        <div class="countdown-sep">:</div>
        <div class="countdown-unit"><span class="countdown-num">${String(mins).padStart(2,"0")}</span><span class="countdown-sub">Mins</span></div>
        <div class="countdown-sep">:</div>
        <div class="countdown-unit"><span class="countdown-num">${String(secs).padStart(2,"0")}</span><span class="countdown-sub">Secs</span></div>
      </div>
      <div class="countdown-location"><i class="fas fa-map-marker-alt"></i> ${next.location}</div>
    `;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ================================================
// FEATURE 3 — DONATION FUNDRAISING PROGRESS BAR
// ================================================
function initDonationProgressBar() {
  const bar = document.getElementById("donation-progress-bar");
  const raised = document.getElementById("donation-raised-amount");
  const goal = document.getElementById("donation-goal-amount");
  const recentList = document.getElementById("recent-donors-list");
  if (!bar) return;

  const GOAL = 500000;
  const donations = window.db ? window.db.getDonations() : [];
  const totalRaised = donations.reduce((s, d) => s + Number(d.amount), 0);
  const pct = Math.min((totalRaised / GOAL) * 100, 100);

  if (raised) raised.textContent = "₦" + totalRaised.toLocaleString();
  if (goal) goal.textContent = "₦" + GOAL.toLocaleString();

  setTimeout(() => {
    bar.style.width = pct.toFixed(1) + "%";
    bar.setAttribute("aria-valuenow", pct.toFixed(1));
  }, 300);

  if (recentList) {
    recentList.innerHTML = donations.slice(0, 5).map(d =>
      `<div class="donor-chip"><i class="fas fa-heart" style="color:var(--accent);"></i> <strong>${d.name}</strong> — ₦${Number(d.amount).toLocaleString()}</div>`
    ).join("");
  }
}

// ================================================
// FEATURE 4 — DIGITAL AMBASSADOR CERTIFICATE (Canvas)
// ================================================
window.generateCertificate = function(volunteer) {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");

  // Background
  const grad = ctx.createLinearGradient(0, 0, 900, 640);
  grad.addColorStop(0, "#062E22");
  grad.addColorStop(1, "#0A4D38");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 640);

  // Gold border
  ctx.strokeStyle = "#C59B27";
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 860, 600);
  ctx.strokeStyle = "rgba(197,155,39,0.3)";
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, 836, 576);

  // Header
  ctx.fillStyle = "#C59B27";
  ctx.font = "bold 18px Georgia";
  ctx.textAlign = "center";
  ctx.fillText("OMOLUABI REBIRTH MOVEMENT (ORM)", 450, 80);

  ctx.fillStyle = "rgba(197,155,39,0.5)";
  ctx.fillRect(100, 92, 700, 2);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 38px Georgia";
  ctx.fillText("Certificate of Appointment", 450, 155);

  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = "16px Arial";
  ctx.fillText("This is to certify that", 450, 205);

  // Name
  ctx.fillStyle = "#C59B27";
  ctx.font = "bold 46px Georgia";
  ctx.fillText(volunteer.name || "Ambassador Name", 450, 270);

  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = "16px Arial";
  ctx.fillText("has been officially appointed as an", 450, 315);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px Arial";
  ctx.fillText((volunteer.role || "Volunteer").toUpperCase(), 450, 355);

  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = "15px Arial";
  ctx.fillText(`State: ${volunteer.state || "Nigeria"}  •  ORM-ID: ORM-${(volunteer.id || Date.now()).toString().slice(-6)}`, 450, 395);
  ctx.fillText(`Date of Appointment: ${new Date().toLocaleDateString("en-GB", {day:"numeric", month:"long", year:"numeric"})}`, 450, 425);

  ctx.fillStyle = "rgba(197,155,39,0.5)";
  ctx.fillRect(100, 455, 700, 2);

  ctx.fillStyle = "#C59B27";
  ctx.font = "italic 15px Georgia";
  ctx.fillText('"Iwa l\'ewa — Character is Beauty"', 450, 490);

  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "13px Arial";
  ctx.fillText("Engr. Jimoh Lawal Akinlabi (Akinkanjuoyo) — Founder & Visionary Leader", 450, 540);
  ctx.fillText("omoluabirebirthmovement@gmail.com  •  +234 904 965 6467", 450, 565);

  // Download
  const link = document.createElement("a");
  link.download = `ORM_Certificate_${(volunteer.name || "ambassador").replace(/\s+/g, "_")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  window.showToast(`Certificate generated for ${volunteer.name}! ✅`);
};

// ================================================
// FEATURE 5 — ADMIN WHATSAPP BROADCAST GENERATOR
// ================================================
window.generateBroadcast = function(type) {
  const modal = document.getElementById("broadcast-modal");
  const output = document.getElementById("broadcast-output");
  const copyBtn = document.getElementById("broadcast-copy-btn");
  if (!modal || !output) return;

  let numbers = [];
  let message = "";

  if (type === "volunteers") {
    const vols = window.db.getVolunteers().filter(v => v.whatsapp || v.phone);
    numbers = vols.map(v => v.whatsapp || v.phone);
    message = `Hello [Name],\n\nGreetings from the Omoluabi Rebirth Movement (ORM)!\n\nWe are excited to have you as part of our growing movement. Please stay tuned for our upcoming events, training programs, and updates.\n\n🌿 #CharacterIsWealth\n#OmoluabiRebirth\n\nFor info: wa.me/2349049656467`;
  } else if (type === "rsvps") {
    const events = window.db.getEvents();
    events.forEach(ev => { if (ev.rsvps) ev.rsvps.forEach(r => { if (r.phone) numbers.push(r.phone); }); });
    const next = events.sort((a, b) => new Date(a.date) - new Date(b.date)).find(e => new Date(e.date) > new Date());
    message = `Hello!\n\nThis is a reminder about the upcoming ORM event:\n\n📅 *${next ? next.title : "ORM Summit"}*\n🗓 Date: ${next ? next.date : "TBD"}\n⏰ Time: ${next ? next.time : "TBD"}\n📍 Venue: ${next ? next.location : "TBD"}\n\nPlease confirm your attendance. We look forward to seeing you!\n\n— ORM Team\n📞 +234 904 965 6467`;
  }

  const uniqueNums = [...new Set(numbers)].filter(Boolean);
  const broadcastText = `=== ORM BROADCAST MESSAGE ===\n\n${message}\n\n=== RECIPIENT NUMBERS (${uniqueNums.length}) ===\n${uniqueNums.join("\n")}`;

  output.value = broadcastText;
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(broadcastText).then(() => window.showToast("Broadcast message copied! Paste into WhatsApp Business. ✅"));
    };
  }
  modal.classList.add("active");
};

// ================================================
// FEATURE 6 — SCHOOL REGISTRATION FORM
// ================================================
function initSchoolRegistration() {
  const schoolForm = document.getElementById("school-reg-form");
  if (!schoolForm) return;

  schoolForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const schoolName = document.getElementById("sch-name").value.trim();
    const principal = document.getElementById("sch-principal").value.trim();
    const email = document.getElementById("sch-email").value.trim();
    const phone = document.getElementById("sch-phone").value.trim();
    const state = document.getElementById("sch-state").value.trim();
    const address = document.getElementById("sch-address").value.trim();
    const students = document.getElementById("sch-students").value;
    const notes = document.getElementById("sch-notes").value.trim();

    const schools = JSON.parse(localStorage.getItem("orm_schools") || "[]");
    const newSchool = {
      id: "sch-" + Date.now(), schoolName, principal, email, phone,
      state, address, students, notes, status: "pending",
      createdAt: new Date().toISOString().split("T")[0]
    };
    schools.unshift(newSchool);
    localStorage.setItem("orm_schools", JSON.stringify(schools));

    window.showToast(`Thank you ${schoolName}! Your registration is received. We will contact ${principal} within 48 hours.`);
    schoolForm.reset();

    // WhatsApp notify admin
    if (window.showFollowUpBanner) {
      setTimeout(() => {
        const waLink = `https://wa.me/2349049656467?text=${encodeURIComponent(`Hello ORM Team!\n\n*School Registration*\n\n🏫 School: *${schoolName}*\n👤 Principal: ${principal}\n📍 State: ${state}\n📞 Phone: ${phone}\n👥 Students: ${students}\n\nPlease follow up with this school about hosting an ORM outreach summit.`)}`;
        document.getElementById("wa-followup-text").textContent = "Notify ORM about your school registration";
        document.getElementById("wa-followup-btn").href = waLink;
        document.getElementById("wa-followup-banner").classList.add("active");
        setTimeout(() => document.getElementById("wa-followup-banner").classList.remove("active"), 15000);
      }, 700);
    }
    window.router("home-view");
  });
}

// ================================================
// FEATURE 8 — LIVE STATS COUNTER ANIMATION
// ================================================
function animateCount(el, target, duration) {
  if (!el) return;
  const start = 0;
  const step = (target / (duration / 16));
  let current = start;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString() + (target >= 100 ? "+" : "");
    if (current >= target) clearInterval(timer);
  }, 16);
}

function initLiveStats() {
  if (!window.db) return;
  const volunteers = window.db.getVolunteers();
  const stories = window.db.getStories();
  const events = window.db.getEvents();
  const donations = window.db.getDonations();
  const pledges = JSON.parse(localStorage.getItem("orm_pledges") || "[]");

  // Base numbers + DB counts
  const statMap = {
    "stat-count-vols":     4850 + volunteers.length,
    "stat-count-schools":  120  + events.length,
    "stat-count-reformed": 350  + stories.length,
    "stat-count-sponsors": 15   + donations.length,
    "stat-count-pledges":  pledges.length
  };

  // Animate when element comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const id = el.id;
        if (statMap[id] !== undefined) animateCount(el, statMap[id], 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  Object.keys(statMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ================================================
// FEATURE 9 — SOCIAL SHARING
// ================================================
function showSocialShare(type, name, extra) {
  const modal = document.getElementById("social-share-modal");
  const body = document.getElementById("social-share-body");
  if (!modal || !body) return;

  const messages = {
    pledge: {
      title: "Share Your Pledge!",
      text: `I just signed the Omoluabi Integrity Pledge! 🌿\n\nI commit to live with CHARACTER, HONESTY, and INTEGRITY. No cybercrime. No shortcuts.\n\nJoin me: orm-kappa.vercel.app\n\n#OmoluabiRebirth #CharacterIsWealth #HonorOverFastMoney`,
      emoji: "🤝"
    },
    join: {
      title: "Share the Movement!",
      text: `I just joined the Omoluabi Rebirth Movement as a ${extra || "Volunteer"}! 🌿\n\nHelping to rebuild a generation of Nigerian youths with integrity and purpose.\n\nJoin us: orm-kappa.vercel.app\n\n#OmoluabiRebirth #ORM #RebuildingAGeneration`,
      emoji: "🌍"
    },
    story: {
      title: "Inspire Others — Share Your Story",
      text: `I just shared my transformation story on the Omoluabi Rebirth Movement platform. 💚\n\nCharacter is wealth. Read more at: orm-kappa.vercel.app\n\n#CharacterIsWealth #ORM #TransformationStory`,
      emoji: "📖"
    }
  };

  const m = messages[type] || messages.pledge;
  const waLink = `https://wa.me/?text=${encodeURIComponent(m.text)}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(m.text)}`;
  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://orm-kappa.vercel.app")}&quote=${encodeURIComponent(m.text)}`;

  body.innerHTML = `
    <div style="text-align:center; margin-bottom:20px;">
      <div style="font-size:2.5rem;margin-bottom:10px;">${m.emoji}</div>
      <h4 style="margin-bottom:8px;">${m.title}</h4>
      <p style="color:var(--text-secondary);font-size:0.88rem;">Inspire others — share your commitment on social media!</p>
    </div>
    <div style="background:var(--bg-tertiary);border-radius:10px;padding:14px;margin-bottom:20px;font-size:0.84rem;line-height:1.7;color:var(--text-secondary);">${m.text.replace(/\n/g,"<br>")}</div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <a href="${waLink}" target="_blank" style="display:flex;align-items:center;gap:12px;padding:13px 18px;background:#25D366;color:white;border-radius:10px;text-decoration:none;font-weight:700;">
        <i class="fab fa-whatsapp" style="font-size:1.3rem;"></i> Share on WhatsApp
      </a>
      <a href="${twitterLink}" target="_blank" style="display:flex;align-items:center;gap:12px;padding:13px 18px;background:#1DA1F2;color:white;border-radius:10px;text-decoration:none;font-weight:700;">
        <i class="fab fa-twitter" style="font-size:1.3rem;"></i> Share on X / Twitter
      </a>
      <a href="${fbLink}" target="_blank" style="display:flex;align-items:center;gap:12px;padding:13px 18px;background:#1877F2;color:white;border-radius:10px;text-decoration:none;font-weight:700;">
        <i class="fab fa-facebook" style="font-size:1.3rem;"></i> Share on Facebook
      </a>
      <button onclick="navigator.clipboard.writeText(${JSON.stringify(m.text)}).then(()=>window.showToast('Message copied! Paste anywhere.'))" style="display:flex;align-items:center;gap:12px;padding:13px 18px;background:var(--bg-tertiary);color:var(--text-primary);border:1px solid var(--border);border-radius:10px;cursor:pointer;font-weight:600;">
        <i class="fas fa-copy"></i> Copy Message
      </button>
    </div>
  `;
  modal.classList.add("active");
}
window.showSocialShare = showSocialShare;

// ================================================
// FEATURE 10 — PUSH NOTIFICATION SUBSCRIPTION
// ================================================
function initPushNotifications() {
  if (!("Notification" in window)) return;
  const btn = document.getElementById("push-notify-btn");
  if (!btn) return;

  if (Notification.permission === "granted") {
    btn.textContent = "🔔 Notifications On";
    btn.disabled = true;
    return;
  }

  btn.addEventListener("click", () => {
    Notification.requestPermission().then(perm => {
      if (perm === "granted") {
        btn.textContent = "🔔 Notifications On";
        btn.disabled = true;
        new Notification("ORM Notifications Enabled!", {
          body: "You will be notified about new events, summits, and ORM news.",
          icon: "images/logo.png"
        });
        window.showToast("Push notifications enabled! ✅");
        localStorage.setItem("orm_push_enabled", "true");
      } else {
        window.showToast("Notifications blocked. Enable in browser settings.");
      }
    });
  });
}

// Trigger a push notification (call from admin when new event added)
window.sendPushNotification = function(title, body) {
  if (Notification.permission === "granted" && localStorage.getItem("orm_push_enabled")) {
    new Notification(title || "ORM Update", {
      body: body || "Check the latest news from Omoluabi Rebirth Movement.",
      icon: "images/logo.png"
    });
  }
};

// ================================================
// EXPORT ALL INIT FUNCTIONS
// ================================================
window.initPledgeWall = initPledgeWall;
window.initEventCountdown = initEventCountdown;
window.initDonationProgressBar = initDonationProgressBar;
window.initLiveStats = initLiveStats;
window.initSchoolRegistration = initSchoolRegistration;
window.initPushNotifications = initPushNotifications;

console.log("ORM — All 10 Automation Features loaded ✅");
