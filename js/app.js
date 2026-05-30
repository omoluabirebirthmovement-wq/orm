/* Master Application Orchestrator for ORM */

document.addEventListener("DOMContentLoaded", () => {
  // 1. STATE INITIALIZATION
  window.activeLang = localStorage.getItem("orm_lang") || "en";
  window.activeTheme = localStorage.getItem("orm_theme") || "dark";
  
  // Initialize Systems
  initTheme();
  initLanguage();
  initRouter();
  initSliders();
  initCalendar();
  initFormBindings();
  initChatbotUI();
  initLiveAlerts();
  initMobileNav();
  initFilters();
  
  // Render Seed grids
  renderBlogsGrid();
  renderStoriesGrid();
  renderEventsGrid();
  renderResourcesGrid();
  renderDirectoryGrid();
});

// 2. THEME SYSTEM
function initTheme() {
  document.documentElement.setAttribute("data-theme", window.activeTheme);
  updateThemeIcon();

  const themeBtn = document.getElementById("theme-toggle");
  const mobileThemeBtn = document.getElementById("mobile-theme-toggle");
  
  function handleThemeToggle() {
    window.activeTheme = window.activeTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", window.activeTheme);
    localStorage.setItem("orm_theme", window.activeTheme);
    updateThemeIcon();
    showToast(window.activeLang === "en" ? `Switched to ${window.activeTheme} mode` : `A ti yipada si eto ${window.activeTheme}`);
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", handleThemeToggle);
  }
  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener("click", handleThemeToggle);
  }
}

function updateThemeIcon() {
  const btns = [document.getElementById("theme-toggle"), document.getElementById("mobile-theme-toggle")];
  btns.forEach(btn => {
    if (btn) {
      btn.innerHTML = window.activeTheme === "dark" 
        ? `<i class="fas fa-sun"></i> <span data-translate="btn-theme-light">Light Mode</span>`
        : `<i class="fas fa-moon"></i> <span data-translate="btn-theme-dark">Dark Mode</span>`;
      translateElement(btn);
    }
  });
}

// 3. ROUTER & PAGE SWITCHER
function initRouter() {
  window.router = function(viewId) {
    const views = document.querySelectorAll(".view-section");
    let targetView = document.getElementById(viewId);
    
    if (!targetView) return;

    // Remove active state from all views and add to target
    views.forEach(v => {
      v.classList.remove("active");
      v.style.display = "none";
    });
    
    targetView.style.display = "block";
    // Trigger layout paint for transition
    setTimeout(() => {
      targetView.classList.add("active");
    }, 50);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Render admin data if authenticated
    if (viewId === "admin-view" && window.admin && window.admin.isAuthenticated) {
      window.admin.renderData();
    }

    // Handle Admin authentication guard — check before showing targetView
    if (viewId === "admin-view" && window.admin && !window.admin.isAuthenticated) {
      window.admin.showLogin();
      return;
    }

    // Update active state in Navigation Links (both desktop and mobile)
    document.querySelectorAll(".nav-links a, .nav-dropdown-menu a, .mobile-nav-drawer a").forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href && href.includes(viewId.replace("-view", ""))) {
        link.classList.add("active");
      }
    });

    // Close mobile drawer and any open dropdown after navigation
    closeMobileNav();
    document.querySelectorAll(".nav-dropdown").forEach(d => d.classList.remove("open"));
  };

  // Nav click handlers (desktop + mobile drawer)
  document.querySelectorAll(".nav-links a, .logo, .mobile-nav-drawer a").forEach(el => {
    el.addEventListener("click", (e) => {
      const href = el.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetViewId = href.replace("#", "") + "-view";
        window.router(targetViewId);
      }
    });
  });

  // Handle CTA button clicks throughout pages
  document.querySelectorAll("[data-route]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-route");
      window.router(target);
    });
  });
}

// 4. BILINGUAL TRANSLATION ENGINE
function showLoading(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="skeleton skeleton-card"></div>
    <div class="skeleton skeleton-line w60"></div>
    <div class="skeleton skeleton-line w40"></div>
    <div class="skeleton skeleton-line"></div>
  `;
}

function hideLoading(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = "";
}

function initLanguage() {
  const langBtn = document.getElementById("lang-toggle");
  const mobileLangBtn = document.getElementById("mobile-lang-toggle");
  
  function handleLangToggle() {
    window.activeLang = window.activeLang === "en" ? "yo" : "en";
    localStorage.setItem("orm_lang", window.activeLang);
    applyTranslations();
    showToast(window.activeLang === "en" ? "Language changed to English" : "A ti yi ede pada si Yoruba");
  }

  if (langBtn) {
    langBtn.addEventListener("click", handleLangToggle);
  }
  if (mobileLangBtn) {
    mobileLangBtn.addEventListener("click", handleLangToggle);
  }
  applyTranslations();
}

function applyTranslations() {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach(translateElement);

  // Update language button text (both desktop and mobile)
  const langBtns = [document.getElementById("lang-toggle"), document.getElementById("mobile-lang-toggle")];
  langBtns.forEach(btn => {
    if (btn) {
      btn.innerHTML = `<i class="fas fa-globe"></i> ${window.translations[window.activeLang]["btn-lang"]}`;
    }
  });

  // Update HTML Lang Tag
  document.documentElement.lang = window.activeLang;
}

function translateElement(el) {
  const key = el.getAttribute("data-translate");
  const dict = window.translations[window.activeLang];
  if (dict && dict[key]) {
    // If element is an input or textarea, translate placeholder
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
      el.placeholder = dict[key];
    } else {
      el.innerHTML = dict[key];
    }
  }
}

// 5. TESTIMONIAL SLIDER
function initSliders() {
  const wrapper = document.querySelector(".slider-wrapper");
  const dots = document.querySelectorAll(".slider-dot");
  let activeIndex = 0;

  if (!wrapper || dots.length === 0) return;

  function goToSlide(index) {
    activeIndex = index;
    wrapper.style.transform = `translateX(-${activeIndex * 100}%)`;
    
    dots.forEach((dot, idx) => {
      if (idx === activeIndex) dot.classList.add("active");
      else dot.classList.remove("active");
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => goToSlide(idx));
  });

  // Autoplay slider every 8 seconds
  setInterval(() => {
    let next = (activeIndex + 1) % dots.length;
    goToSlide(next);
  }, 8000);
}

// 6. BOOKING CALENDAR SYSTEM
function initCalendar() {
  const calGrid = document.getElementById("calendar-days");
  const currentMonthEl = document.getElementById("calendar-current-month");
  
  if (!calGrid || !currentMonthEl) return;

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  currentMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  
  // Calculate calendar days
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  calGrid.innerHTML = "";
  
  // Prev month filler
  for (let i = 0; i < firstDayIndex; i++) {
    const btn = document.createElement("button");
    btn.classList.add("calendar-day", "disabled");
    btn.disabled = true;
    btn.textContent = "";
    calGrid.appendChild(btn);
  }
  
  // Current month days
  for (let d = 1; d <= lastDay; d++) {
    const btn = document.createElement("button");
    btn.classList.add("calendar-day");
    btn.textContent = d;
    
    // Disable past days
    const dayDate = new Date(currentYear, currentMonth, d);
    if (dayDate < new Date().setHours(0,0,0,0)) {
      btn.classList.add("disabled");
      btn.disabled = true;
    }
    
    btn.addEventListener("click", () => {
      document.querySelectorAll(".calendar-day").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Store selected date in a hidden field or memory
      const selectedDay = String(d).padStart(2, '0');
      const selectedMonthStr = String(currentMonth + 1).padStart(2, '0');
      window.selectedBookingDate = `${currentYear}-${selectedMonthStr}-${selectedDay}`;
      showToast(`Selected date: ${window.selectedBookingDate}`);
    });
    
    calGrid.appendChild(btn);
  }

  // Handle slot selections
  document.querySelectorAll(".time-slot").forEach(slot => {
    slot.addEventListener("click", () => {
      if (slot.classList.contains("booked")) return;
      document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("active"));
      slot.classList.add("active");
      window.selectedBookingTime = slot.getAttribute("data-time");
    });
  });

  // Handle Question database accordion toggles
  document.querySelectorAll(".question-accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      btn.classList.toggle("active");
      panel.classList.toggle("active");
    });
  });
}

// 7. PUBLIC GRID RENDERERS
function renderBlogsGrid() {
  const grid = document.getElementById("blogs-grid-container");
  if (!grid) return;

  showLoading("blogs-grid-container");

  const blogs = window.db.getBlogs();
  grid.innerHTML = "";

  blogs.forEach(b => {
    const card = document.createElement("div");
    card.classList.add("blog-card");
    card.innerHTML = `
      <div class="blog-card-img">
        <i class="fas fa-book-open"></i>
      </div>
      <div class="blog-card-content">
        <div>
          <span class="blog-card-footer" style="padding-top:0; border:none; margin-bottom:8px;">
            <span class="story-tag">${b.category}</span>
            <span>${b.readTime}</span>
          </span>
          <h4 class="blog-card-title">${b.title}</h4>
          <p class="blog-card-excerpt">${b.excerpt}</p>
        </div>
        <div class="blog-card-footer">
          <span>By ${b.author}</span>
          <span>${b.date}</span>
        </div>
        <button class="btn btn-primary btn-sm" style="margin-top:15px; width:100%" onclick="window.readBlogArticle('${b.id}')">Read Full Article</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Reader modal for Blogs
window.readBlogArticle = function(id) {
  const blogs = window.db.getBlogs();
  const blog = blogs.find(b => b.id === id);
  if (!blog) return;

  const modal = document.getElementById("blog-reader-modal");
  const title = document.getElementById("reader-modal-title");
  const author = document.getElementById("reader-modal-author");
  const body = document.getElementById("reader-modal-body");

  if (!modal || !title || !author || !body) return;

  title.textContent = blog.title;
  author.innerHTML = `<span class="badge-status resolved">${blog.category}</span> &bull; By ${blog.author} &bull; ${blog.date}`;
  body.innerHTML = `<p style="font-size:1.05rem; line-height:1.8;">${blog.content}</p>`;

  modal.classList.add("active");
};

function renderStoriesGrid(filter = 'all') {
  const grid = document.getElementById("stories-grid-container");
  if (!grid) return;

  const allStories = window.db.getStories();
  const stories = filter === 'all' ? allStories : allStories.filter(s => s.type === filter);
  grid.innerHTML = "";

  stories.forEach(s => {
    const card = document.createElement("div");
    card.classList.add("story-card");
    card.innerHTML = `
      <div class="story-image-container">
        <span class="story-badge">${s.type}</span>
        <div class="story-media-mock">
          <i class="fas fa-quote-left"></i>
        </div>
      </div>
      <div class="story-content">
        <span class="story-tag">${s.name}'s Journey</span>
        <h3 class="story-title">${s.title}</h3>
        <p class="story-excerpt">${s.excerpt}</p>
        <div style="background-color:var(--bg-tertiary); padding:12px; border-radius:6px; margin-bottom:15px; font-size:0.85rem;">
          <div><strong class="highlight-gold">Before:</strong> ${s.before}</div>
          <div style="margin-top:4px;"><strong class="highlight-green">After:</strong> ${s.after}</div>
        </div>
        <button class="btn btn-outline btn-sm" style="width:100%" onclick="window.readTransformationStory('${s.id}')">Read Journey</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Reader modal for stories
window.readTransformationStory = function(id) {
  const stories = window.db.getStories();
  const story = stories.find(s => s.id === id);
  if (!story) return;

  const modal = document.getElementById("blog-reader-modal");
  const title = document.getElementById("reader-modal-title");
  const author = document.getElementById("reader-modal-author");
  const body = document.getElementById("reader-modal-body");

  if (!modal || !title || !author || !body) return;

  title.textContent = story.title;
  author.innerHTML = `<span class="badge-status pending">${story.type} transformation</span> &bull; Participant: ${story.name}`;
  body.innerHTML = `
    <div style="background-color:var(--bg-tertiary); padding:20px; border-radius:8px; margin-bottom:20px; border-left:4px solid var(--accent)">
      <div style="margin-bottom:8px;"><strong class="highlight-gold">Before ORM Rebirth:</strong> ${story.before}</div>
      <div><strong class="highlight-green">Rebuilt Identity:</strong> ${story.after}</div>
    </div>
    <p style="font-size:1.05rem; line-height:1.8; white-space:pre-line;">${story.content}</p>
  `;

  modal.classList.add("active");
};

function renderEventsGrid() {
  const list = document.getElementById("events-list-container");
  if (!list) return;

  const events = window.db.getEvents();
  list.innerHTML = "";

  events.forEach(e => {
    const parts = e.date.split("-");
    const year = parts[0];
    const monthIdx = Number(parts[1]) - 1;
    const day = parts[2];
    
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthStr = months[monthIdx] || "JUN";

    const card = document.createElement("div");
    card.classList.add("event-card");
    card.innerHTML = `
      <div class="event-date-badge">
        <div class="event-date-day">${day}</div>
        <div class="event-date-month">${monthStr}</div>
      </div>
      <div class="event-info">
        <h3 class="event-title">${e.title}</h3>
        <div class="event-meta">
          <span><i class="far fa-clock highlight-gold"></i> ${e.time}</span>
          <span><i class="fas fa-map-marker-alt highlight-gold"></i> ${e.location}</span>
        </div>
        <p class="event-desc">${e.desc}</p>
        <button class="btn btn-accent btn-sm" style="margin-top:15px;" onclick="window.openRsvpModal('${e.id}', '${e.title}')">RSVP Now</button>
      </div>
    `;
    list.appendChild(card);
  });
}

// RSVP Modal helper
window.openRsvpModal = function(id, title) {
  const modal = document.getElementById("rsvp-modal");
  const eventTitleSpan = document.getElementById("rsvp-event-title");
  const hiddenInput = document.getElementById("rsvp-event-id");

  if (!modal || !eventTitleSpan || !hiddenInput) return;

  eventTitleSpan.textContent = title;
  hiddenInput.value = id;
  modal.classList.add("active");
};

// Resource Library grid renderer
function renderResourcesGrid() {
  const grid = document.getElementById("resources-grid-container");
  if (!grid) return;
  const resources = window.db.getResources();
  if (!resources || !resources.length) {
    grid.innerHTML = `<p class="text-secondary text-center">No resources available yet. Check back soon!</p>`;
    return;
  }
  grid.innerHTML = resources.map(r => `
    <div class="resource-card">
      <i class="fas ${r.icon}"></i>
      <h4>${r.title}</h4>
      <p>${r.desc}</p>
      <span class="badge-status resolved" style="margin-bottom:10px; display:inline-block;">${r.type}</span>
      <br>
      <a href="${r.url}" class="btn btn-primary btn-sm" style="margin-top:5px;" onclick="window.showToast('Download started for ${r.title}')"><i class="fas fa-download"></i> Download</a>
    </div>
  `).join("");
}

// Ambassador Directory grid renderer
function renderDirectoryGrid() {
  const grid = document.getElementById("directory-grid-container");
  if (!grid) return;
  const members = window.db.getDirectory();
  if (!members || !members.length) {
    grid.innerHTML = `<p class="text-secondary text-center">No ambassadors listed yet.</p>`;
    return;
  }
  grid.innerHTML = members.map(m => `
    <div class="directory-card">
      <div class="directory-avatar">${m.initials}</div>
      <h4>${m.name}</h4>
      <div class="role">${m.role}</div>
      <div class="location"><i class="fas fa-map-marker-alt" style="margin-right:4px;"></i>${m.location}</div>
    </div>
  `).join("");
}

// 8. FORM SUBMISSIONS BINDING
function initFormBindings() {
  // Render CAPTCHA on forms
  renderCaptcha("captcha-volunteer");
  renderCaptcha("captcha-story");
  renderCaptcha("captcha-report");
  renderCaptcha("captcha-booking");
  renderCaptcha("captcha-donation");

  // Global Modal closes
  document.querySelectorAll(".modal-close, .modal-overlay").forEach(el => {
    el.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay") || e.target.classList.contains("modal-close") || e.target.tagName === "I") {
        document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
      }
    });
  });

  // Volunteer form submit
  const volForm = document.getElementById("volunteer-registration-form");
  if (volForm) {
    volForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("vol-name").value;
      const age = document.getElementById("vol-age").value;
      const state = document.getElementById("vol-state").value;
      const school = document.getElementById("vol-school").value;
      const phone = document.getElementById("vol-phone").value;
      const whatsapp = document.getElementById("vol-whatsapp").value;
      const role = document.getElementById("vol-role").value;
      const skills = document.getElementById("vol-skills").value;
      const socials = document.getElementById("vol-socials").value;
      const reason = document.getElementById("vol-reason").value;

      if (!validateCaptcha("captcha-volunteer")) {
        showToast("Please answer the verification question correctly.");
        return;
      }
      window.db.addVolunteer({
        name, age: Number(age), state, school, phone, whatsapp, role, skills, socials, reason
      });

      sendNotification("volunteer", { name, role, state });
      showToast(window.activeLang === 'en' ? "Application received! Please record your video interview." : "A ti gba iwe ibere rẹ. Jọwọ gbasilẹ fidio rẹ!");
      volForm.reset();
      renderCaptcha("captcha-volunteer");
      // Show video interview guide after successful submission
      if (window.showVideoGuide) {
        setTimeout(() => window.showVideoGuide(name, role, state, role || "volunteer"), 800);
      }
      window.router("home-view");
    });
  }

  // RSVP Form submission
  const rsvpForm = document.getElementById("rsvp-form-element");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const eventId = document.getElementById("rsvp-event-id").value;
      const name = document.getElementById("rsvp-name").value;
      const email = document.getElementById("rsvp-email").value;
      const phone = document.getElementById("rsvp-phone").value;

      const evTitle = document.getElementById("rsvp-event-title")?.textContent || "ORM Event";
      window.db.rsvpEvent(eventId, { name, email, phone });
      showToast("RSVP Confirmed! See you at the summit 🎉");
      rsvpForm.reset();
      document.getElementById("rsvp-modal").classList.remove("active");
      // WhatsApp follow-up
      if (window.showFollowUpBanner) {
        setTimeout(() => window.showFollowUpBanner("rsvp", { name, eventTitle: evTitle }), 600);
      }
    });
  }

  // Anonymous Report form submit
  const reportForm = document.getElementById("anonymous-report-form");
  if (reportForm) {
    reportForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = document.getElementById("rep-category").value;
      const details = document.getElementById("rep-details").value;
      const contactInfo = document.getElementById("rep-contact").value || "Anonymous";
      const state = document.getElementById("rep-state").value;
      const school = document.getElementById("rep-school").value;
      const whatsapp = document.getElementById("rep-whatsapp").value;

      if (!validateCaptcha("captcha-report")) {
        showToast("Please answer the verification question correctly.");
        return;
      }
      window.db.addReport({
        category, details, contactInfo, state, school, whatsapp
      });

      showToast("Report submitted securely. Our counsel team will act promptly.");
      reportForm.reset();
      renderCaptcha("captcha-report");
      // WhatsApp follow-up banner
      if (window.showFollowUpBanner) {
        setTimeout(() => window.showFollowUpBanner("report", { category, state }), 700);
      }
      window.router("home-view");
    });
  }

  // Interview & Counseling booking form submit
  const bookForm = document.getElementById("interview-booking-form");
  if (bookForm) {
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("book-name").value;
      const email = document.getElementById("book-email").value;
      const phone = document.getElementById("book-phone").value;
      const whatsapp = document.getElementById("book-whatsapp").value;
      const category = document.getElementById("book-category").value;
      const notes = document.getElementById("book-notes").value;

      if (!window.selectedBookingDate || !window.selectedBookingTime) {
        alert("Please select a date and an available time slot from the calendar widgets.");
        return;
      }
      if (!validateCaptcha("captcha-booking")) {
        showToast("Please answer the verification question correctly.");
        return;
      }

      const bookingData = {
        name, email, phone, whatsapp, category, notes,
        date: window.selectedBookingDate,
        time: window.selectedBookingTime
      };
      window.db.addBooking(bookingData);

      showToast("Booking confirmed! We will contact you on WhatsApp shortly.");
      bookForm.reset();
      
      // Clear calendar selection
      document.querySelectorAll(".calendar-day").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("active"));
      window.selectedBookingDate = null;
      window.selectedBookingTime = null;
      renderCaptcha("captcha-booking");
      // WhatsApp follow-up banner
      if (window.showFollowUpBanner) {
        setTimeout(() => window.showFollowUpBanner("booking", bookingData), 700);
      }
      window.router("home-view");
    });
  }

  // Anonymous Story submissions
  const storyForm = document.getElementById("anonymous-story-form");
  if (storyForm) {
    storyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("story-author-name").value || "Anonymous";
      const type = document.getElementById("story-type-select").value;
      const title = document.getElementById("story-title-input").value;
      const excerpt = document.getElementById("story-excerpt-input").value;
      const content = document.getElementById("story-content-input").value;
      const before = document.getElementById("story-before-input").value;
      const after = document.getElementById("story-after-input").value;

      if (!validateCaptcha("captcha-story")) {
        showToast("Please answer the verification question correctly.");
        return;
      }
      window.db.addStory({
        name, type, title, excerpt, content, before, after
      });

      showToast("Story saved! You can also record a video version — we'd love to feature it.");
      storyForm.reset();
      renderCaptcha("captcha-story");
      renderStoriesGrid();
      // Offer video recording for the story
      if (window.showVideoGuide) {
        setTimeout(() => window.showVideoGuide(name === "Anonymous" ? "Friend" : name, "Story Sharer", "", type || "repentance"), 800);
      }
      window.router("stories-view");
    });
  }

  // Donation form presets & custom submit
  const presetBtns = document.querySelectorAll(".preset-btn");
  const customDonationInput = document.getElementById("don-amount-custom");
  const donationFormSubmit = document.getElementById("donation-form-action");

  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      presetBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      customDonationInput.value = btn.getAttribute("data-amount");
    });
  });

  if (donationFormSubmit) {
    donationFormSubmit.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("don-name").value || "Anonymous Partner";
      const amount = Number(customDonationInput.value);
      const isMonthly = document.getElementById("don-monthly").checked;

      if (!amount || amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }
      if (!validateCaptcha("captcha-donation")) {
        showToast("Please answer the verification question correctly.");
        return;
      }

      window.db.addDonation({
        name,
        amount,
        type: isMonthly ? "monthly" : "one-time"
      });

      showToast(`Thank you ${name}! 💚 Donation of ₦${amount.toLocaleString()} received. Please send payment via WhatsApp.`);
      donationFormSubmit.reset();
      presetBtns.forEach(b => b.classList.remove("active"));
      renderCaptcha("captcha-donation");
      // WhatsApp follow-up with payment details request
      if (window.showFollowUpBanner) {
        setTimeout(() => window.showFollowUpBanner("donation", { name, amount }), 700);
      }
    });
  }

  // Newsletter form
  document.querySelectorAll(".newsletter-form-el").forEach(f => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Subscribed! Thank you for staying updated with the Omoluabi Rebirth Movement.");
      f.reset();
    });
  });
}

// 9. AI CHATBOT INTERFACE BINDINGS
function initChatbotUI() {
  const toggleBtn = document.getElementById("chatbot-trigger");
  const container = document.getElementById("chatbot-widget");
  const closeBtn = document.getElementById("chatbot-close-btn");
  const sendBtn = document.getElementById("chatbot-send-btn");
  const inputEl = document.getElementById("chatbot-input-field");
  const msgFeed = document.getElementById("chatbot-messages-feed");

  if (!toggleBtn || !container || !closeBtn || !sendBtn || !inputEl || !msgFeed) return;

  // Toggle widget
  toggleBtn.addEventListener("click", () => {
    container.classList.toggle("active");
    if (container.classList.contains("active") && msgFeed.children.length === 0) {
      // Seed initial welcoming greeting
      appendBotMsg(window.chatbot.greetings[0]);
    }
  });

  closeBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });

  // Message Send actions
  function handleSendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    // Append user message
    appendUserMsg(text);
    inputEl.value = "";

    // Show simulated counselor thinking state
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("chatbot-msg", "bot");
    typingIndicator.innerHTML = `<em>Counselor typing...</em>`;
    msgFeed.appendChild(typingIndicator);
    msgFeed.scrollTop = msgFeed.scrollHeight;

    setTimeout(() => {
      // Remove typing indicator and add final response
      typingIndicator.remove();
      const botResponse = window.chatbot.getResponse(text);
      appendBotMsg(botResponse);
    }, 1200);
  }

  sendBtn.addEventListener("click", handleSendMessage);
  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendMessage();
  });

  function appendBotMsg(html) {
    const div = document.createElement("div");
    div.classList.add("chatbot-msg", "bot");
    div.innerHTML = html;
    msgFeed.appendChild(div);
    msgFeed.scrollTop = msgFeed.scrollHeight;
  }

  function appendUserMsg(text) {
    const div = document.createElement("div");
    div.classList.add("chatbot-msg", "user");
    div.textContent = text;
    msgFeed.appendChild(div);
    msgFeed.scrollTop = msgFeed.scrollHeight;
  }
}

// 10. LIVE ALERT NOTIFICATION SYSTEM
function initLiveAlerts() {
  const toaster = document.createElement("div");
  toaster.id = "toaster-container";
  toaster.classList.add("notifications-toaster");
  document.body.appendChild(toaster);

  window.showToast = function(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = `<i class="fas fa-info-circle highlight-gold"></i> <span>${message}</span>`;
    
    toaster.appendChild(toast);
    
    // Auto remove after animation completes (5 seconds total)
    setTimeout(() => {
      toast.remove();
    }, 5000);
  };

  // Simulate viral live notifications to make the site feel like an active movement
  const viralAlerts = [
    "Adefemi just shared a testimony of transformation from Ibadan!",
    "Lagos Model College just registered 150 students for the Omoluabi club.",
    "A new anonymous report has been processed by our counseling center.",
    "An anonymous donor supported the digital boot camp with ₦50,000.",
    "Yetunde from Ibadan just expanded 'Awele Organics' with a new youth intern!",
    "School tour scheduled for Model College Oyo State next week.",
    "Omoluabi Club established in King's College Lagos!"
  ];

  setInterval(() => {
    // 25% chance of showing a viral alert every 25 seconds
    if (Math.random() > 0.7) {
      const idx = Math.floor(Math.random() * viralAlerts.length);
      window.showToast(viralAlerts[idx]);
    }
  }, 25000);
}

// 11. MOBILE HAMBURGER NAVIGATION
function closeMobileNav() {
  const hamburger = document.getElementById("hamburger-btn");
  const drawer = document.getElementById("mobile-nav-drawer");
  const overlay = document.getElementById("mobile-nav-overlay");

  if (hamburger) hamburger.classList.remove("open");
  if (drawer) drawer.classList.remove("open");
  if (overlay) overlay.classList.remove("visible");
  document.body.style.overflow = "";
}

function initMobileNav() {
  const hamburger = document.getElementById("hamburger-btn");
  const drawer = document.getElementById("mobile-nav-drawer");
  const overlay = document.getElementById("mobile-nav-overlay");

  if (!hamburger || !drawer || !overlay) return;

  hamburger.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      closeMobileNav();
    } else {
      hamburger.classList.add("open");
      drawer.classList.add("open");
      overlay.classList.add("visible");
      document.body.style.overflow = "hidden";
    }
  });

  // Close on overlay click
  overlay.addEventListener("click", closeMobileNav);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });
}

// 12. FILTER BUTTONS LOGIC
function initFilters() {
  // Media Filter
  const mediaFilterBtns = document.querySelectorAll('#media-view .filter-btn');
  const mediaCards = document.querySelectorAll('#media-view .media-card');

  mediaFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // update active state
      mediaFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.textContent.trim();

      mediaCards.forEach(card => {
        const tagEl = card.querySelector('.media-tag');
        const tagText = tagEl ? tagEl.textContent.trim() : '';

        if (filterType === 'All Media' || filterType === tagText) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Stories Filter
  const storiesFilterBtns = document.querySelectorAll('#stories-view .filter-btn');
  storiesFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // update active state
      storiesFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterText = btn.textContent.trim();
      let filterType = 'all';
      if (filterText.includes('Repentance')) filterType = 'repentance';
      else if (filterText.includes('Entrepreneurship')) filterType = 'entrepreneurship';
      else if (filterText.includes('School')) filterType = 'youth';

      // re-render the grid with filter
      renderStoriesGrid(filterType);
    });
  });
}

// 14. PWA SERVICE WORKER REGISTRATION
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

// 15. SEARCH ENGINE
const searchData = {
  blogs: [],
  stories: [],
  events: []
};

function refreshSearchIndex() {
  searchData.blogs = (window.db && window.db.getBlogs()) || [];
  searchData.stories = (window.db && window.db.getStories()) || [];
  searchData.events = (window.db && window.db.getEvents()) || [];
}

function performSearch(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const results = [];
  searchData.blogs.forEach(b => {
    if (b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)) {
      results.push({ type: "blog", title: b.title, excerpt: b.excerpt, id: b.id, route: "blog-view" });
    }
  });
  searchData.stories.forEach(s => {
    if (s.title.toLowerCase().includes(q) || s.excerpt.toLowerCase().includes(q)) {
      results.push({ type: "story", title: s.title, excerpt: s.excerpt, id: s.id, route: "stories-view" });
    }
  });
  searchData.events.forEach(e => {
    if (e.title.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q)) {
      results.push({ type: "event", title: e.title, excerpt: e.desc, id: e.id, route: "events-view" });
    }
  });
  return results;
}

function showSearchModal() {
  refreshSearchIndex();
  const existing = document.getElementById("search-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "search-modal";
  modal.className = "search-overlay";
  modal.innerHTML = `
    <div class="search-modal-box">
      <div class="search-modal-header">
        <i class="fas fa-search" style="color:var(--accent);"></i>
        <input type="text" id="search-input" class="search-input" placeholder="Search blogs, stories, events..." autofocus>
        <button class="search-close-btn" onclick="document.getElementById('search-modal').remove()"><i class="fas fa-times"></i></button>
      </div>
      <div id="search-results" class="search-results"></div>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add("active"), 10);

  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");

  input.addEventListener("input", () => {
    const query = input.value.trim();
    const results = performSearch(query);
    if (!query || query.length < 2) {
      resultsContainer.innerHTML = `<div class="search-hint">Type at least 2 characters to search...</div>`;
      return;
    }
    if (results.length === 0) {
      resultsContainer.innerHTML = `<div class="search-hint">No results found for "${query}"</div>`;
      return;
    }
    resultsContainer.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="document.getElementById('search-modal').remove(); window.router('${r.route}')">
        <div><span class="search-badge ${r.type}">${r.type}</span> <strong>${r.title}</strong></div>
        <div class="search-snippet">${r.excerpt.substring(0, 100)}...</div>
      </div>
    `).join("");
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.remove();
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

// 16. EMAIL / WHATSAPP NOTIFICATION SIMULATION
function sendNotification(type, data) {
  console.log(`[NOTIFICATION] ${type}:`, data);
  // In production, this would call a Supabase Edge Function or external API
  const messages = {
    volunteer: `New volunteer application from ${data.name}`,
    booking: `New booking request from ${data.name} for ${data.category}`,
    report: `New anonymous report filed: ${data.category}`,
    donation: `New donation of ₦${data.amount} from ${data.name}`
  };
  const msg = messages[type] || `Notification: ${type}`;
  showToast(`📧 ${msg}`);
}

// 17. CAPTCHA HELPER
function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b };
}

function renderCaptcha(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const captcha = generateCaptcha();
  container.innerHTML = `
    <label style="display:block; font-weight:600; margin-bottom:8px; font-size:0.9rem;">Verify you are human: <strong>${captcha.a} + ${captcha.b} = ?</strong></label>
    <div style="display:flex; gap:10px;">
      <input type="number" id="${containerId}-answer" class="captcha-input" placeholder="Answer" required style="flex:1; padding:10px; border-radius:6px; border:1px solid var(--border); background:var(--bg-secondary); color:var(--text-primary);">
      <input type="hidden" id="${containerId}-expected" value="${captcha.answer}">
    </div>
  `;
}

function validateCaptcha(containerId) {
  const answer = document.getElementById(`${containerId}-answer`);
  const expected = document.getElementById(`${containerId}-expected`);
  if (!answer || !expected) return true;
  return parseInt(answer.value) === parseInt(expected.value);
}
