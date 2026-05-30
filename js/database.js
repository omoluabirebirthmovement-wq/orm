/* Database Engine & State Manager for ORM with Supabase Sync Integration */

const SEED_BLOGS = [
  {
    id: "blog-1",
    title: "Understanding Omoluabi: Restoring Integrity in an Era of Compromise",
    category: "Integrity",
    excerpt: "What does it truly mean to be an Omoluabi? Dive deep into the core philosophy of character, respect, and social duty.",
    content: "The term 'Omoluabi' describes a person of excellent character, integrity, and honor in Yoruba culture. It is not merely an individual trait but a social commitment. In a world where the search for quick money (Yahoo-Yahoo, ritualism) is glamorized, reviving the Omoluabi spirit is a matter of generational survival. It is about understanding that character is wealth (Iwa l'ewa), and that true prosperity cannot be separated from integrity. We explore the 7 core pillars: Oro siso (spoken word), Iteriba (respect), Inu rere (good intentions), Otito (truth), Igboya (courage), Ise (hard work), and Opolo pipe (intelligence).",
    author: "Engr. Jimoh Lawal Akinlabi",
    date: "2026-05-20",
    readTime: "5 mins read"
  },
  {
    id: "blog-2",
    title: "The Illusion of Fast Wealth: The Reality Behind Cybercrime",
    category: "Youth development",
    excerpt: "An objective, emotional, and social analysis of how internet fraud destroys the psyche and future of young Nigerians.",
    content: "Cybercrime offers a temporary high but a permanent scar. Beyond the threat of law enforcement, it erodes cognitive skills, makes honest work seem tedious, and alienates individuals from true societal values. Many youths who enter 'Yahoo Yahoo' face spiritual and emotional hollows, leading to depression and extreme anxiety. True success is built step-by-step through character, digital skills, and industrious endeavors. Let us build a nation based on honor, not fast money.",
    author: "Pastor Funsho Adebayo",
    date: "2026-05-24",
    readTime: "7 mins read"
  },
  {
    id: "blog-3",
    title: "Parenting in a Digital Age: Restoring Respect and Communication",
    category: "Parenting",
    excerpt: "Helpful advice for parents on detecting warning signs, setting boundaries, and maintaining healthy dialogue with teens.",
    content: "Modern teenagers face unprecedented pressure from social media feeds that glamorize luxury without labor. Parents must transition from authoritarians to trusted guides. Watch out for warning signs: sudden unexplained expensive gadgets, withdrawal, late-night internet sessions, and unexplained deposits. Establish direct communication, teach your children the core values of Omoluabi from childhood, and lead by example. Character begins in the home.",
    author: "Mrs. Sade Olamide (Family Counselor)",
    date: "2026-05-26",
    readTime: "6 mins read"
  },
  {
    id: "blog-4",
    title: "Digital Entrepreneurship: Building Sustainable Wealth in Nigeria",
    category: "Entrepreneurship",
    excerpt: "Discover the real digital skills that pay: software engineering, content marketing, graphics design, and how to start legitimately.",
    content: "You do not need to cheat to make it in the digital space. Legitimate digital skills are in extremely high demand globally. By learning coding, copywriting, graphic design, or video editing, African youths can earn a respectable income while building sustainable careers. Omoluabi Rebirth Movement organizes workshops to equip young people with these crucial modern tools. Learn a skill, build a portfolio, work hard, and secure your future with pride.",
    author: "Yetunde Alabi (Tech Founder)",
    date: "2026-05-28",
    readTime: "8 mins read"
  }
];

const SEED_STORIES = [
  {
    id: "story-1",
    name: "Adefemi",
    type: "repentance",
    title: "My Turnaround: From Cybercrime Anxiety to Digital Pride",
    excerpt: "Adefemi shares how internet fraud brought him constant fear, and how ORM helped him redirect his tech skills into software development.",
    content: "I used to be a 'Yahoo Boy'. I made money, yes, but I couldn't sleep. The constant fear of the EFCC, the moral burden of knowing I ruined lives, and the toxic company I kept almost pushed me to suicide. When the ORM school tour visited our community center, I felt like the founder was speaking directly to my soul. I decided to make a U-turn. ORM accepted me, kept me anonymous during my recovery, and enrolled me in a digital skills boot camp. Today, I am a certified backend software engineer earning a legitimate living. The peace of mind I have now is completely priceless. Integrity is everything.",
    before: "Anxious 'Yahoo' hacker in constant fear",
    after: "Legitimate Software Developer and ORM Mentor",
    videoUrl: ""
  },
  {
    id: "story-2",
    name: "Yetunde",
    type: "entrepreneurship",
    title: "Rising Above the Streets: Creating a Thriving Brand",
    excerpt: "Yetunde shares how she overcame toxic peer pressure and street vulnerability to establish a thriving organic cosmetics company with ORM's grant.",
    content: "Growing up in a tough neighborhood in Ibadan, the pressure to engage in transactional relationships or social vices was high. I wanted more for myself. I loved natural skincare but had zero capital. Through the ORM entrepreneurship workshop, I learned business planning, packaging, and digital branding. I pitched my idea and received a small startup seed grant. Today, 'Awele Organics' employs three other youths and supplies products nationwide. ORM didn't just give me money; they gave me a positive identity. I am a true Omoluabi.",
    before: "Struggling street vendor facing toxic peer pressure",
    after: "CEO of Awele Organics, employing local youths",
    videoUrl: ""
  },
  {
    id: "story-3",
    name: "Olumide",
    type: "youth",
    title: "Rejecting Cultism: Becoming a School Ambassador of Peace",
    excerpt: "How Olumide resisted high school cult intimidation and rose to become ORM's Senior School Ambassador.",
    content: "In my school, joining local secondary school cults was seen as the only way to protect yourself. I was threatened several times for refusing to join. But my mother always told me that character is strength. When ORM established the Omoluabi Club in our school, I joined immediately. We stood together, resisted the cultists, and reported their activities safely to school counselors. Today, cultism has dropped by 80% in our school, and I am proud to lead a generation of students built on discipline and purpose.",
    before: "Intimidated high school student under cultist threats",
    after: "ORM School Ambassador & President of Omoluabi Club",
    videoUrl: ""
  }
];

const SEED_EVENTS = [
  {
    id: "event-1",
    title: "Lagos High School Integrity Summit",
    date: "2026-06-15",
    time: "09:00 AM",
    location: "National Theatre, Iganmu, Lagos",
    desc: "A massive gathering of 2,000+ secondary school students focusing on moral orientation, digital skills pathways, and anti-vice campaigns.",
    status: "Upcoming",
    rsvps: []
  },
  {
    id: "event-2",
    title: "Ibadan Youth Leadership Assembly",
    date: "2026-07-10",
    time: "10:00 AM",
    location: "Mapo Hall, Ibadan, Oyo State",
    desc: "An orientation program for university undergraduates and community youths on ethics, community leadership, and social entrepreneurship.",
    status: "Upcoming",
    rsvps: []
  },
  {
    id: "event-3",
    title: "Omoluabi Digital Boot Camp 2026",
    date: "2026-08-02",
    time: "08:30 AM",
    location: "ORM Hub, Ikeja, Lagos",
    desc: "A intensive 4-week workshop teaching UI/UX, software development, video editing, and digital marketing to reformed and vulnerable youths.",
    status: "Upcoming",
    rsvps: []
  }
];

const SEED_BOOKINGS = [
  {
    id: "book-1",
    name: "Biodun Johnson",
    email: "biodun@example.com",
    phone: "08033221144",
    whatsapp: "08033221144",
    category: "Parent interview",
    date: "2026-06-02",
    time: "10:00 AM",
    notes: "I am noticing my teenage son has expensive items he cannot explain. I need advice on how to communicate without pushing him away.",
    status: "pending",
    createdAt: "2026-05-28"
  },
  {
    id: "book-2",
    name: "Anonymous Youth",
    email: "counsel@orm.org",
    phone: "09049656467",
    whatsapp: "09049656467",
    category: "Repentance testimony",
    date: "2026-06-04",
    time: "02:00 PM",
    notes: "I want to share my confession of how I left cultism and help warn other young school boys.",
    status: "approved",
    createdAt: "2026-05-28"
  }
];

const SEED_REPORTS = [
  {
    id: "rep-1",
    category: "Cultism",
    details: "I noticed a group of students in senior year meeting late at night behind the school football field. They are initiating younger boys into cultism.",
    contactInfo: "Anonymous (Student of Model College)",
    state: "Lagos",
    school: "Lagos Model College",
    whatsapp: "",
    status: "pending",
    createdAt: "2026-05-28"
  },
  {
    id: "rep-2",
    category: "Drug Abuse",
    details: "A vendor is selling codeine and tramadol to students near our school gate. We need urgent intervention.",
    contactInfo: "Mrs. Falode (Teacher)",
    state: "Oyo",
    school: "Ibadan Grammar School",
    whatsapp: "08055443322",
    status: "resolved",
    createdAt: "2026-05-27"
  }
];

const SEED_VOLUNTEERS = [
  {
    id: "vol-1",
    name: "Tunde Bakare",
    age: 24,
    state: "Lagos",
    school: "UNILAG",
    phone: "08122334455",
    whatsapp: "08122334455",
    role: "volunteer",
    skills: "Graphic Design, Content Creation",
    reason: "I want to use my creative talent to build designs that inspire youths away from destructive online fraud and cybercrime.",
    status: "approved",
    socials: "@tunde_designs",
    createdAt: "2026-05-28"
  },
  {
    id: "vol-2",
    name: "Chidinma Nwosu",
    age: 21,
    state: "Enugu",
    school: "UNN",
    phone: "08088776655",
    whatsapp: "08088776655",
    role: "counselor",
    skills: "Psychology Student, Active Listening",
    reason: "I want to help provide mental and emotional support to girls who are facing peer pressure and drugs in the university.",
    status: "pending",
    socials: "@chidy_n",
    createdAt: "2026-05-28"
  }
];

const SEED_DONATIONS = [
  { id: "don-1", name: "Alhaji Kunle Tinubu", amount: 150000, type: "one-time", date: "2026-05-28" },
  { id: "don-2", name: "Anonymous Partner", amount: 50000, type: "monthly", date: "2026-05-27" },
  { id: "don-3", name: "Dr. Chioma Nwachukwu", amount: 100000, type: "one-time", date: "2026-05-25" }
];

const SEED_RESOURCES = [
  { id: "res-1", title: "Digital Skills Starter Guide", desc: "A beginner-friendly guide to coding, design, and freelancing.", icon: "fa-laptop-code", type: "PDF", url: "#" },
  { id: "res-2", title: "The Omoluabi Character Manual", desc: "A comprehensive guide to the 7 pillars of Omoluabi philosophy.", icon: "fa-book", type: "eBook", url: "#" },
  { id: "res-3", title: "Parenting in the Digital Age", desc: "Tips for parents to guide teens away from cybercrime and cultism.", icon: "fa-users", type: "PDF", url: "#" },
  { id: "res-4", title: "Youth Leadership Workbook", desc: "Exercises and prompts for building moral courage and purpose.", icon: "fa-crown", type: "eBook", url: "#" }
];

const SEED_DIRECTORY = [
  { id: "dir-1", name: "Adefemi A.", role: "School Ambassador", location: "Lagos", initials: "AA" },
  { id: "dir-2", name: "Yetunde Alabi", role: "Mentor", location: "Ibadan", initials: "YA" },
  { id: "dir-3", name: "Olumide S.", role: "Club President", location: "Oyo", initials: "OS" },
  { id: "dir-4", name: "Tunde Bakare", role: "Volunteer Coordinator", location: "Lagos", initials: "TB" },
  { id: "dir-5", name: "Chidinma Nwosu", role: "Counselor", location: "Enugu", initials: "CN" }
];

const INTERVIEW_QUESTIONS = {
  youth: [
    "What pressures do teenagers face today?",
    "Why do many youths chase fast money?",
    "What social media influences affect young people negatively?",
    "What does success mean to you?",
    "Have you ever felt pressure to join internet fraud?",
    "What kind of future do you want?",
    "Who inspires you positively?"
  ],
  repentance: [
    "What lifestyle were you involved in before?",
    "What consequences did you face?",
    "What changed your mindset?",
    "What advice would you give to teenagers?",
    "What does integrity mean to you now?"
  ],
  school: [
    "What major challenges affect students today?",
    "What values are missing among youths?",
    "How can schools help students avoid destructive lifestyles?",
    "What skills should youths learn today?"
  ],
  parent: [
    "What changes have you observed in modern teenagers?",
    "How can parents guide children better?",
    "How important is communication in parenting?",
    "What warning signs should parents watch for?"
  ],
  leadership: [
    "What kind of generation are we building?",
    "Why is character important?",
    "How can leaders restore values?",
    "What future do you envision for Nigerian youths?"
  ]
};

// Initialize Supabase Client
let supabaseClient = null;
if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
  try {
    supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    console.log("Supabase Client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Supabase:", err);
  }
}

// Database Initialization helper
class ORMDatabase {
  constructor() {
    this.init();
    this.pullFromSupabase();
  }

  init() {
    if (!localStorage.getItem("orm_blogs")) {
      localStorage.setItem("orm_blogs", JSON.stringify(SEED_BLOGS));
    }
    if (!localStorage.getItem("orm_stories")) {
      localStorage.setItem("orm_stories", JSON.stringify(SEED_STORIES));
    }
    if (!localStorage.getItem("orm_events")) {
      localStorage.setItem("orm_events", JSON.stringify(SEED_EVENTS));
    }
    if (!localStorage.getItem("orm_bookings")) {
      localStorage.setItem("orm_bookings", JSON.stringify(SEED_BOOKINGS));
    }
    if (!localStorage.getItem("orm_reports")) {
      localStorage.setItem("orm_reports", JSON.stringify(SEED_REPORTS));
    }
    if (!localStorage.getItem("orm_volunteers")) {
      localStorage.setItem("orm_volunteers", JSON.stringify(SEED_VOLUNTEERS));
    }
    if (!localStorage.getItem("orm_donations")) {
      localStorage.setItem("orm_donations", JSON.stringify(SEED_DONATIONS));
    }
    if (!localStorage.getItem("orm_resources")) {
      localStorage.setItem("orm_resources", JSON.stringify(SEED_RESOURCES));
    }
    if (!localStorage.getItem("orm_directory")) {
      localStorage.setItem("orm_directory", JSON.stringify(SEED_DIRECTORY));
    }
  }

  // Fetch all Supabase remote tables to sync local storage automatically at launch
  async pullFromSupabase() {
    if (!supabaseClient) return;
    try {
      const tables = [
        { local: "orm_blogs", remote: "blogs" },
        { local: "orm_stories", remote: "stories" },
        { local: "orm_events", remote: "events" },
        { local: "orm_bookings", remote: "bookings" },
        { local: "orm_reports", remote: "reports" },
        { local: "orm_volunteers", remote: "volunteers" },
        { local: "orm_donations", remote: "donations" }
      ];
      for (const t of tables) {
        const { data, error } = await supabaseClient.from(t.remote).select("*");
        if (error) {
          console.error(`Error pulling ${t.remote} from Supabase:`, error);
        } else if (data && data.length > 0) {
          localStorage.setItem(t.local, JSON.stringify(data));
          console.log(`Pulled ${data.length} records for ${t.remote} from Supabase.`);
        }
      }
      // Re-trigger visual grids rendering to update UI once data pulls successfully
      if (window.renderBlogsGrid) window.renderBlogsGrid();
      if (window.renderStoriesGrid) window.renderStoriesGrid();
      if (window.renderEventsGrid) window.renderEventsGrid();
    } catch (err) {
      console.error("Failed to pull from Supabase:", err);
    }
  }

  // Background sync helpers
  async syncToSupabase(table, data) {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from(table).insert([data]);
        if (error) console.error(`Error syncing to Supabase table ${table}:`, error);
        else console.log(`Successfully synced record to Supabase table ${table}.`);
      } catch (err) {
        console.error(`Supabase sync failure for table ${table}:`, err);
      }
    }
  }

  async syncUpdateToSupabase(table, id, updates) {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from(table).update(updates).eq('id', id);
        if (error) console.error(`Error updating Supabase table ${table}:`, error);
      } catch (err) {
        console.error(`Supabase update failure for table ${table}:`, err);
      }
    }
  }

  async syncDeleteFromSupabase(table, id) {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from(table).delete().eq('id', id);
        if (error) console.error(`Error deleting from Supabase table ${table}:`, error);
      } catch (err) {
        console.error(`Supabase delete failure for table ${table}:`, err);
      }
    }
  }

  // --- BLOGS ---
  getBlogs() {
    return JSON.parse(localStorage.getItem("orm_blogs")) || [];
  }

  addBlog(blog) {
    const blogs = this.getBlogs();
    const newBlog = {
      id: "blog-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      readTime: "4 mins read",
      ...blog
    };
    blogs.unshift(newBlog);
    localStorage.setItem("orm_blogs", JSON.stringify(blogs));
    
    // Background Sync
    this.syncToSupabase("blogs", newBlog);
    
    return newBlog;
  }

  // --- STORIES ---
  getStories() {
    return JSON.parse(localStorage.getItem("orm_stories")) || [];
  }

  addStory(story) {
    const stories = this.getStories();
    const newStory = {
      id: "story-" + Date.now(),
      ...story
    };
    stories.unshift(newStory);
    localStorage.setItem("orm_stories", JSON.stringify(stories));
    
    // Background Sync
    this.syncToSupabase("stories", newStory);
    
    return newStory;
  }

  // --- EVENTS ---
  getEvents() {
    return JSON.parse(localStorage.getItem("orm_events")) || [];
  }

  addEvent(event) {
    const events = this.getEvents();
    const newEvent = {
      id: "event-" + Date.now(),
      rsvps: [],
      ...event
    };
    events.push(newEvent);
    localStorage.setItem("orm_events", JSON.stringify(events));
    
    // Background Sync
    this.syncToSupabase("events", newEvent);
    
    return newEvent;
  }

  rsvpEvent(eventId, rsvpDetails) {
    const events = this.getEvents();
    const idx = events.findIndex(e => e.id === eventId);
    if (idx !== -1) {
      events[idx].rsvps.push(rsvpDetails);
      localStorage.setItem("orm_events", JSON.stringify(events));
      
      // Sync RSVP
      this.syncToSupabase("rsvps", { id: "rsvp-" + Date.now(), eventId, ...rsvpDetails });
      this.syncUpdateToSupabase("events", eventId, { rsvps: events[idx].rsvps });
      return true;
    }
    return false;
  }

  // --- BOOKINGS ---
  getBookings() {
    return JSON.parse(localStorage.getItem("orm_bookings")) || [];
  }

  addBooking(booking) {
    const bookings = this.getBookings();
    const newBooking = {
      id: "book-" + Date.now(),
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      ...booking
    };
    bookings.unshift(newBooking);
    localStorage.setItem("orm_bookings", JSON.stringify(bookings));
    
    // Background Sync
    this.syncToSupabase("bookings", newBooking);
    
    return newBooking;
  }

  updateBookingStatus(id, status) {
    const bookings = this.getBookings();
    const idx = bookings.findIndex(b => b.id === id);
    if (idx !== -1) {
      bookings[idx].status = status;
      localStorage.setItem("orm_bookings", JSON.stringify(bookings));
      
      // Sync Update
      this.syncUpdateToSupabase("bookings", id, { status });
      return true;
    }
    return false;
  }

  deleteBooking(id) {
    const bookings = this.getBookings();
    const updated = bookings.filter(b => b.id !== id);
    localStorage.setItem("orm_bookings", JSON.stringify(updated));
    this.syncDeleteFromSupabase("bookings", id);
    return true;
  }

  // --- REPORTS ---
  getReports() {
    return JSON.parse(localStorage.getItem("orm_reports")) || [];
  }

  addReport(report) {
    const reports = this.getReports();
    const newReport = {
      id: "rep-" + Date.now(),
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      ...report
    };
    reports.unshift(newReport);
    localStorage.setItem("orm_reports", JSON.stringify(reports));
    
    // Background Sync
    this.syncToSupabase("reports", newReport);
    
    return newReport;
  }

  updateReportStatus(id, status) {
    const reports = this.getReports();
    const idx = reports.findIndex(r => r.id === id);
    if (idx !== -1) {
      reports[idx].status = status;
      localStorage.setItem("orm_reports", JSON.stringify(reports));
      
      // Sync Update
      this.syncUpdateToSupabase("reports", id, { status });
      return true;
    }
    return false;
  }

  // --- VOLUNTEERS ---
  getVolunteers() {
    return JSON.parse(localStorage.getItem("orm_volunteers")) || [];
  }

  addVolunteer(volunteer) {
    const volunteers = this.getVolunteers();
    const newVolunteer = {
      id: "vol-" + Date.now(),
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      ...volunteer
    };
    volunteers.unshift(newVolunteer);
    localStorage.setItem("orm_volunteers", JSON.stringify(volunteers));
    
    // Background Sync
    this.syncToSupabase("volunteers", newVolunteer);
    
    return newVolunteer;
  }

  updateVolunteerStatus(id, status) {
    const volunteers = this.getVolunteers();
    const idx = volunteers.findIndex(v => v.id === id);
    if (idx !== -1) {
      volunteers[idx].status = status;
      localStorage.setItem("orm_volunteers", JSON.stringify(volunteers));
      
      // Sync Update
      this.syncUpdateToSupabase("volunteers", id, { status });
      return true;
    }
    return false;
  }

  deleteVolunteer(id) {
    const volunteers = this.getVolunteers();
    const updated = volunteers.filter(v => v.id !== id);
    localStorage.setItem("orm_volunteers", JSON.stringify(updated));
    this.syncDeleteFromSupabase("volunteers", id);
    return true;
  }

  // --- DONATIONS ---
  getDonations() {
    return JSON.parse(localStorage.getItem("orm_donations")) || [];
  }

  addDonation(donation) {
    const donations = this.getDonations();
    const newDonation = {
      id: "don-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      ...donation
    };
    donations.unshift(newDonation);
    localStorage.setItem("orm_donations", JSON.stringify(donations));
    
    // Background Sync
    this.syncToSupabase("donations", newDonation);
    
    return newDonation;
  }

  // --- QUESTIONS ---
  getQuestions() {
    return INTERVIEW_QUESTIONS;
  }

  // --- RESOURCES ---
  getResources() {
    const data = localStorage.getItem("orm_resources");
    return data ? JSON.parse(data) : SEED_RESOURCES;
  }

  // --- DIRECTORY ---
  getDirectory() {
    const data = localStorage.getItem("orm_directory");
    return data ? JSON.parse(data) : SEED_DIRECTORY;
  }
}

// Instantiate globally
window.db = new ORMDatabase();
console.log("ORM Local Storage & Supabase Sync Engine initialized.");
