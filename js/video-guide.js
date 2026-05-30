/* ORM Video Interview Guide & WhatsApp/Gmail Follow-Up Automation System */

const ORM_CONTACT = {
  gmail: "omoluabirebirthmovement@gmail.com",
  whatsapp: "2349049656467",
  whatsappDisplay: "+234 904 965 6467"
};

const INTERVIEW_QUESTIONS_MAP = {
  volunteer: [
    "Please introduce yourself — your name, age, and where you are from.",
    "Why do you want to join the Omoluabi Rebirth Movement?",
    "What skills or talents do you bring to this movement?",
    "What problem do you see affecting Nigerian youths around you?",
    "What positive change do you want to make in your community?"
  ],
  ambassador: [
    "Introduce yourself — your name, school or workplace, and state.",
    "Why do you want to be an ORM Ambassador?",
    "How will you spread the Omoluabi message in your environment?",
    "Share one experience that convinced you character is more important than money.",
    "What would you say to a peer who is considering cybercrime?"
  ],
  counselor: [
    "Introduce yourself — your name, qualification, and area of expertise.",
    "Why is youth counseling important in Nigeria today?",
    "How would you approach a young person involved in internet fraud?",
    "What practical advice do you give to parents who have troubled teenagers?",
    "What does the phrase 'Iwa l'ewa' mean to you?"
  ],
  youth: [
    "Introduce yourself — your name, age, and school.",
    "What pressures do teenagers face in Nigeria today?",
    "Have you or someone you know been tempted by cybercrime or cultism? How was it handled?",
    "What does success mean to you personally?",
    "What future are you working to build for yourself?"
  ],
  repentance: [
    "You may introduce yourself — name is optional if you prefer to stay anonymous.",
    "What lifestyle were you involved in before finding ORM?",
    "What were the consequences you faced — emotionally, financially, or socially?",
    "What changed your mindset and turned you around?",
    "What advice would you give to a teenager who is walking the same path you walked?"
  ],
  parent: [
    "Please introduce yourself — your name and the city you live in.",
    "What changes have you observed in modern teenagers around you?",
    "What warning signs should parents watch for in their children?",
    "How did ORM or the Omoluabi message help your family?",
    "What would you say to another parent who suspects their child is involved in a social vice?"
  ],
  school: [
    "Please introduce yourself — your name, school, and position.",
    "What are the biggest challenges affecting students in your school today?",
    "How can schools better guide students away from destructive lifestyles?",
    "How has ORM's presence impacted your school community?",
    "What message do you have for other school leaders and educators?"
  ],
  leadership: [
    "Please introduce yourself — your name and leadership role in your community.",
    "What kind of generation are we building in Nigeria today?",
    "Why is character and integrity important in a world that glorifies fast money?",
    "How can community leaders restore values among youths?",
    "What future do you envision for Nigerian youths 10 years from now?"
  ]
};

// Build Gmail mailto link
function buildGmailLink(name, role, state, category) {
  const questions = INTERVIEW_QUESTIONS_MAP[category] || INTERVIEW_QUESTIONS_MAP.volunteer;
  const numberedQs = questions.map((q, i) => `${i + 1}. ${q}`).join("\n");

  const subject = `ORM Video Interview — ${name} (${role || "Volunteer"}, ${state || "Nigeria"})`;
  const body =
    `Hello Omoluabi Rebirth Movement Team,\n\n` +
    `My name is ${name}. I am submitting my video interview as a ${role || "Volunteer"} from ${state || "Nigeria"}.\n\n` +
    `The interview questions I answered in my video:\n\n${numberedQs}\n\n` +
    `Please find my video interview attached to this email.\n\n` +
    `Thank you for giving me the opportunity to serve the movement.\n\n` +
    `Sincerely,\n${name}`;

  return `mailto:${ORM_CONTACT.gmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Build WhatsApp message link
function buildWhatsAppLink(name, role, state, category) {
  const questions = INTERVIEW_QUESTIONS_MAP[category] || INTERVIEW_QUESTIONS_MAP.volunteer;
  const numberedQs = questions.map((q, i) => `${i + 1}. ${q}`).join("\n");

  const msg =
    `Hello ORM Team! 🌿\n\n` +
    `My name is *${name}*, applying as a *${role || "Volunteer"}* from *${state || "Nigeria"}*.\n\n` +
    `I am sending my video interview. Here are the questions I answered:\n\n${numberedQs}\n\n` +
    `Please review my application and confirm receipt. Thank you! 🙏`;

  return `https://wa.me/${ORM_CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
}

// Build follow-up WhatsApp link for other forms
function buildFollowUpWALink(formType, data) {
  const msgs = {
    booking:
      `Hello ORM Team! 👋\n\n` +
      `I just submitted a *${data.category || "counseling"}* booking request.\n\n` +
      `*Name:* ${data.name}\n*Date:* ${data.date}\n*Time:* ${data.time}\n\n` +
      `Please confirm my appointment. Thank you!`,

    report:
      `Hello ORM Team 🚨\n\n` +
      `I just submitted a confidential report about *${data.category || "a social vice"}* in *${data.state || "Nigeria"}*.\n\n` +
      `Please confirm it was received. Keep my identity confidential. Thank you.`,

    story:
      `Hello ORM Team! 📖\n\n` +
      `I just submitted my testimony story:\n*"${data.title || "My Transformation Story"}"*\n\n` +
      `Please review it. I am also available to record a video version of my story if needed.`,

    donation:
      `Hello ORM Team! 💚\n\n` +
      `My name is *${data.name || "Donor"}*. I just initiated a donation of *₦${Number(data.amount || 0).toLocaleString()}*.\n\n` +
      `Please confirm receipt and provide bank details for the transfer. Thank you for the great work!`,

    rsvp:
      `Hello ORM Team! 🗓️\n\n` +
      `My name is *${data.name}*. I just RSVP'd for the event:\n*${data.eventTitle || "ORM Outreach Event"}*\n\n` +
      `Please confirm my registration. I look forward to attending!`
  };

  const text = msgs[formType] || `Hello ORM Team, I just submitted a form on your website. Please follow up with me.`;
  return `https://wa.me/${ORM_CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

// =============================================
// MAIN: Show Video Interview Guide Modal
// =============================================
function showVideoGuide(name, role, state, category) {
  const modal = document.getElementById("video-guide-modal");
  if (!modal) return;

  const questions = INTERVIEW_QUESTIONS_MAP[category] || INTERVIEW_QUESTIONS_MAP.volunteer;
  const questionItems = questions.map((q, i) =>
    `<li style="margin-bottom:10px;padding:10px 14px;background:var(--bg-tertiary);border-radius:8px;font-size:0.88rem;line-height:1.5;">
      <span style="color:var(--accent);font-weight:700;margin-right:8px;">${i + 1}.</span>${q}
    </li>`
  ).join("");

  const gmailLink = buildGmailLink(name, role, state, category);
  const waLink = buildWhatsAppLink(name, role, state, category);

  document.getElementById("video-guide-body").innerHTML = `
    <div style="text-align:center;margin-bottom:20px;">
      <div style="width:72px;height:72px;background:linear-gradient(135deg,var(--primary),var(--accent));border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:2rem;">🎥</div>
      <h4 style="margin-bottom:8px;font-family:var(--font-heading);">One Last Step, ${name}!</h4>
      <p style="color:var(--text-secondary);font-size:0.88rem;line-height:1.6;">
        Your application is saved ✅. Now please <strong>record a short 2–5 minute video</strong> on your phone or laptop answering the questions below, then send the video to us via Gmail or WhatsApp.
      </p>
    </div>

    <div style="background:var(--bg-tertiary);border-radius:12px;padding:16px;margin-bottom:18px;">
      <h5 style="margin-bottom:12px;color:var(--accent);font-size:0.9rem;"><i class="fas fa-list-ol"></i> &nbsp;Your Interview Questions</h5>
      <ol style="list-style:none;padding:0;margin:0;">${questionItems}</ol>
    </div>

    <div style="background:rgba(197,155,39,0.08);border:1px solid rgba(197,155,39,0.25);border-radius:12px;padding:14px;margin-bottom:22px;">
      <h5 style="margin-bottom:8px;font-size:0.85rem;color:var(--accent);"><i class="fas fa-lightbulb"></i> &nbsp;Recording Tips</h5>
      <ul style="font-size:0.81rem;color:var(--text-secondary);padding-left:18px;margin:0;line-height:1.8;">
        <li>Record using your phone camera or laptop webcam</li>
        <li>Find a quiet, well-lit room — face a window for natural light</li>
        <li>Speak clearly and naturally — no need to memorize anything</li>
        <li>2 to 5 minutes is perfect — answer as many questions as you can</li>
        <li>You may remain anonymous if your story is sensitive</li>
      </ul>
    </div>

    <p style="text-align:center;font-size:0.82rem;color:var(--text-secondary);font-weight:600;margin-bottom:12px;">
      <i class="fas fa-paper-plane"></i> &nbsp;After recording, send the video file to us:
    </p>

    <div style="display:flex;flex-direction:column;gap:12px;">
      <a href="${gmailLink}" class="btn btn-primary" style="display:flex;align-items:center;justify-content:center;gap:12px;padding:16px 20px;font-size:0.95rem;text-decoration:none;border-radius:12px;">
        <i class="fas fa-envelope" style="font-size:1.3rem;"></i>
        <div style="text-align:left;">
          <div style="font-weight:700;">Send Video via Gmail</div>
          <div style="font-size:0.72rem;opacity:0.8;margin-top:2px;">omoluabirebirthmovement@gmail.com</div>
        </div>
      </a>
      <a href="${waLink}" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:12px;padding:16px 20px;font-size:0.95rem;background:#25D366;color:white;border:none;border-radius:12px;text-decoration:none;cursor:pointer;">
        <i class="fab fa-whatsapp" style="font-size:1.5rem;"></i>
        <div style="text-align:left;">
          <div style="font-weight:700;">Send Video via WhatsApp</div>
          <div style="font-size:0.72rem;opacity:0.85;margin-top:2px;">${ORM_CONTACT.whatsappDisplay}</div>
        </div>
      </a>
    </div>

    <p style="text-align:center;margin-top:16px;font-size:0.78rem;color:var(--text-secondary);">
      <i class="fas fa-shield-alt"></i> &nbsp;You can also send it later — we will follow up with you on WhatsApp.
    </p>
  `;

  modal.classList.add("active");
}

// =============================================
// Show post-submit WhatsApp follow-up banner
// =============================================
function showFollowUpBanner(formType, data) {
  const waLink = buildFollowUpWALink(formType, data);
  const banner = document.getElementById("wa-followup-banner");
  const btn = document.getElementById("wa-followup-btn");
  if (!banner || !btn) return;

  const labels = {
    booking:    "Confirm your booking on WhatsApp",
    report:     "Confirm your report was received",
    story:      "Offer to record a video of your story",
    donation:   "Get your donation receipt on WhatsApp",
    rsvp:       "Confirm your event RSVP on WhatsApp"
  };

  document.getElementById("wa-followup-text").textContent = labels[formType] || "Chat with us on WhatsApp";
  btn.href = waLink;
  banner.classList.add("active");

  // Auto-hide after 15 seconds
  clearTimeout(window._waBannerTimer);
  window._waBannerTimer = setTimeout(() => banner.classList.remove("active"), 15000);
}

function dismissFollowUpBanner() {
  const banner = document.getElementById("wa-followup-banner");
  if (banner) banner.classList.remove("active");
  clearTimeout(window._waBannerTimer);
}

// Expose globally
window.showVideoGuide = showVideoGuide;
window.showFollowUpBanner = showFollowUpBanner;
window.dismissFollowUpBanner = dismissFollowUpBanner;
window.buildFollowUpWALink = buildFollowUpWALink;

console.log("ORM Video Guide & Follow-Up Automation loaded.");
