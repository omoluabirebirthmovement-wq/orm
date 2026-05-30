/* ORM — Smart Cultural Counseling AI (Omoluabi Guide) v2 with Intent Routing */

class OmoluabiChatbot {
  constructor() {
    this.name = "Omoluabi Guide";
    this.intents = [
      { keys: ["join","volunteer","ambassador","register","apply","member"],       route: "join-view",     label: "Go to Join Page" },
      { keys: ["book","appointment","counselor","mentor","schedule","interview"],  route: "booking-view",  label: "Book a Session" },
      { keys: ["report","cult","cultism","drug","anonymous","confraternity"],      route: "counsel-view",  label: "Submit Anonymous Report" },
      { keys: ["event","summit","conference","training","bootcamp","workshop"],    route: "events-view",   label: "View Upcoming Events" },
      { keys: ["blog","article","read","learn","post","news"],                     route: "blog-view",     label: "Read Our Blog" },
      { keys: ["story","testimony","transformation","confession","repentance"],    route: "stories-view",  label: "Read Transformation Stories" },
      { keys: ["donate","fund","support","sponsor","contribution"],                route: "partners-view", label: "Support ORM" },
      { keys: ["media","video","watch","podcast","masterclass"],                   route: "media-view",    label: "Watch Our Media" },
      { keys: ["pledge","integrity","commit","promise","vow"],                     route: "pledge-view",   label: "Sign the Integrity Pledge" },
      { keys: ["school","principal","register school","host","outreach"],          route: "school-view",   label: "Register Your School" },
      { keys: ["contact","address","office","location","reach"],                   route: "contact-view",  label: "Contact ORM" },
    ];
  }

  detectIntent(text) {
    for (const intent of this.intents) {
      if (intent.keys.some(k => text.includes(k))) return intent;
    }
    return null;
  }

  buildRouteBtn(intent) {
    const waText = encodeURIComponent("Hello ORM! I need help with: " + intent.label);
    return `<br><br>
      <button onclick="window.router('${intent.route}'); document.getElementById('chatbot-widget').classList.remove('active');"
        style="background:var(--primary);color:white;border:none;padding:10px 18px;border-radius:8px;cursor:pointer;font-weight:700;font-size:0.85rem;margin-right:8px;">
        <i class="fas fa-arrow-right"></i> ${intent.label}
      </button>
      <a href="https://wa.me/2349049656467?text=${waText}" target="_blank"
        style="display:inline-block;background:#25D366;color:white;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.85rem;text-decoration:none;">
        <i class="fab fa-whatsapp"></i> Talk to Human
      </a>`;
  }

  getResponse(userInput) {
    const text = userInput.toLowerCase().trim();
    const intent = this.detectIntent(text);

    if (this.containsAny(text, ["hello","hi","hey","welcome","greetings","aafia","n le","baawo"])) {
      return `Greetings! I am the <strong>Omoluabi Guide</strong> 🌿<br><br>
              I can help you with:<br>
              🔹 Leaving fraud or cybercrime<br>
              🔹 Reporting cultism or drug abuse anonymously<br>
              🔹 Finding legitimate digital skills and jobs<br>
              🔹 Joining ORM as a volunteer or ambassador<br>
              🔹 Booking a confidential counseling session<br><br>
              Just tell me what is on your mind. I am here for you. 💚`;
    }

    if (this.containsAny(text, ["yahoo","fraud","scam","fast money","g-boy","ritual","cybercrime","419","client"])) {
      return `<strong>The glitz of Yahoo-Yahoo is a dangerous illusion.</strong><br><br>
              <em>"Owo ti a ko ba sise fun, ko le pe lowo"</em> — Wealth gotten without labor never lasts.<br><br>
              Internet fraud causes anxiety, EFCC danger, and destroys your character permanently. We do not judge you — if you want to redirect your skills into legitimate coding, writing, or design, ORM will guide you step by step.
              ${this.buildRouteBtn({route:"booking-view", label:"Book a Confidential Consultation"})}`;
    }

    if (this.containsAny(text, ["cult","initiate","confraternity","violence","threat","gang","aye","eye","black axe"])) {
      return `<strong>Your safety and character are worth far more than any cult membership.</strong><br><br>
              Cultism promises protection but delivers only fear, violence, and early death. Real power lies in your character and discipline.<br><br>
              If you are being pressured to join or want to exit safely — report it anonymously. We work with schools and communities to protect you without revealing your identity.
              ${this.buildRouteBtn({route:"counsel-view", label:"Submit Anonymous Report"})}`;
    }

    if (this.containsAny(text, ["drug","codeine","tramadol","smoke","loud","addiction","abuse","substance","weed"])) {
      return `<strong>Addiction is a battle you do not have to fight alone.</strong><br><br>
              Substance abuse slowly steals your health, focus, and future. Our counselors offer completely judgment-free support and can connect you with rehabilitation partners.<br><br>
              📞 WhatsApp urgent help: <strong>+234 9049656467</strong>
              ${this.buildRouteBtn({route:"counsel-view", label:"Book Counseling Session"})}`;
    }

    if (this.containsAny(text, ["depressed","depression","sad","die","suicide","lonely","hopeless","give up","no reason"])) {
      return `<strong>Please hold on. You are extremely valuable. 💚</strong><br><br>
              In tough moments, the darkness feels permanent — but support is here. You do not have to face this alone.<br><br>
              Please speak to one of our counselors right now. You can remain completely anonymous.<br><br>
              📞 <strong>Call or WhatsApp immediately: +234 9049656467</strong>
              ${this.buildRouteBtn({route:"counsel-view", label:"Get Anonymous Help Now"})}`;
    }

    if (this.containsAny(text, ["skill","digital","coding","code","learn","program","job","legit","earn","freelance","design"])) {
      return `<strong>The digital economy is full of legitimate wealth! 💻</strong><br><br>
              Software engineering, UI/UX design, copywriting, video editing — all pay well from anywhere in Nigeria.<br><br>
              ORM offers free workshops and boot camps for motivated youths. <em>"Ise l'ogun ise"</em> — Hard work is the cure for poverty.
              ${this.buildRouteBtn({route:"events-view", label:"View Events & Boot Camps"})}`;
    }

    if (this.containsAny(text, ["yoruba","omoluabi","culture","meaning","proverb","about orm","what is"])) {
      return `<strong>An Omoluabi is a person of exceptional character.</strong><br><br>
              The highest moral standard in Yoruba civilization:<br>
              • <strong>Otito</strong> — Truthfulness<br>
              • <strong>Iteriba</strong> — Respect and humility<br>
              • <strong>Inu rere</strong> — Good intentions<br>
              • <strong>Igboya</strong> — Moral courage<br>
              • <strong>Ise</strong> — Industriousness<br><br>
              <em>"Iwa l'ewa"</em> — Character is beauty. Let us restore these values together!
              ${this.buildRouteBtn({route:"about-view", label:"Learn More About ORM"})}`;
    }

    // Smart intent routing — catches all other navigation requests
    if (intent) {
      return `I can help you with that! 🌿 Here is where you need to go:
              ${this.buildRouteBtn(intent)}`;
    }

    return `Thank you for sharing. 🌿 As your Omoluabi Guide — <strong>your character is your greatest wealth.</strong><br><br>
            Try typing a topic like:<br>
            👉 <em>fraud, cultism, drugs, skills, join, report, pledge, donate, event, story</em><br><br>
            Or reach a human counselor now:<br>
            📞 <strong>WhatsApp: +234 9049656467</strong>
            ${this.buildRouteBtn({route:"counsel-view", label:"Book a Counseling Session"})}`;
  }

  containsAny(text, keywords) {
    return keywords.some(k => text.includes(k));
  }
}

window.chatbot = new OmoluabiChatbot();
console.log("Omoluabi Smart Chatbot v2 — Intent routing active.");
