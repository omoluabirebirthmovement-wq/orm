-- Supabase Table Schema Configuration for ORM Rebirth
-- Copy and paste this directly into the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. BLOGS TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    read_time TEXT NOT NULL DEFAULT '5 mins read'
);

-- 2. STORIES TABLE
CREATE TABLE IF NOT EXISTS public.stories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    before TEXT NOT NULL,
    after TEXT NOT NULL,
    video_url TEXT
);

-- 3. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Upcoming',
    rsvps JSONB DEFAULT '[]'::jsonb
);

-- 4. RSVPS TABLE (Separate ledger for details)
CREATE TABLE IF NOT EXISTS public.rsvps (
    id TEXT PRIMARY KEY,
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    category TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    notes TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- 6. REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.reports (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    details TEXT NOT NULL,
    contact_info TEXT DEFAULT 'Anonymous',
    state TEXT NOT NULL,
    school TEXT,
    whatsapp TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- 7. VOLUNTEERS TABLE
CREATE TABLE IF NOT EXISTS public.volunteers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL,
    state TEXT NOT NULL,
    school TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    role TEXT NOT NULL,
    skills TEXT NOT NULL,
    socials TEXT,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- 8. DONATIONS TABLE
CREATE TABLE IF NOT EXISTS public.donations (
    id TEXT PRIMARY KEY,
    name TEXT DEFAULT 'Anonymous Partner',
    amount NUMERIC NOT NULL,
    type TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Enable RLS and set public policies (so front-end client-side reads/writes are allowed directly)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-write access to blogs" ON public.blogs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to stories" ON public.stories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to events" ON public.events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to rsvps" ON public.rsvps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to bookings" ON public.bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to reports" ON public.reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to volunteers" ON public.volunteers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to donations" ON public.donations FOR ALL USING (true) WITH CHECK (true);

-- Insert initial seed blogs so your Supabase instance is pre-seeded
INSERT INTO public.blogs (id, title, category, excerpt, content, author, date, read_time) VALUES
('blog-1', 'Understanding Omoluabi: Restoring Integrity in an Era of Compromise', 'Integrity', 'What does it truly mean to be an Omoluabi? Dive deep into the core philosophy of character, respect, and social duty.', 'The term ''Omoluabi'' describes a person of excellent character, integrity, and honor in Yoruba culture. It is not merely an individual trait but a social commitment. In a world where the search for quick money (Yahoo-Yahoo, ritualism) is glamorized, reviving the Omoluabi spirit is a matter of generational survival. It is about understanding that character is wealth (Iwa l''ewa), and that true prosperity cannot be separated from integrity. We explore the 7 core pillars: Oro siso (spoken word), Iteriba (respect), Inu rere (good intentions), Otito (truth), Igboya (courage), Ise (hard work), and Opolo pipe (intelligence).', 'Dr. Akinolu Babalola', '2026-05-20', '5 mins read'),
('blog-2', 'The Illusion of Fast Wealth: The Reality Behind Cybercrime', 'Youth development', 'An objective, emotional, and social analysis of how internet fraud destroys the psyche and future of young Nigerians.', 'Cybercrime offers a temporary high but a permanent scar. Beyond the threat of law enforcement, it erodes cognitive skills, makes honest work seem tedious, and alienates individuals from true societal values. Many youths who enter ''Yahoo Yahoo'' face spiritual and emotional hollows, leading to depression and extreme anxiety. True success is built step-by-step through character, digital skills, and industrious endeavors. Let us build a nation based on honor, not fast money.', 'Pastor Funsho Adebayo', '2026-05-24', '7 mins read'),
('blog-4', 'Digital Entrepreneurship: Building Sustainable Wealth in Nigeria', 'Entrepreneurship', 'Discover the real digital skills that pay: software engineering, content marketing, graphics design, and how to start legitimately.', 'You do not need to cheat to make it in the digital space. Legitimate digital skills are in extremely high demand globally. By learning coding, copywriting, graphic design, or video editing, African youths can earn a respectable income while building sustainable careers. Omoluabi Rebirth Movement organizes workshops to equip young people with these crucial modern tools. Learn a skill, build a portfolio, work hard, and secure your future with pride.', 'Yetunde Alabi (Tech Founder)', '2026-05-28', '8 mins read')
ON CONFLICT (id) DO NOTHING;

-- Insert initial seed stories
INSERT INTO public.stories (id, name, type, title, excerpt, content, before, after) VALUES
('story-1', 'Adefemi', 'repentance', 'My Turnaround: From Cybercrime Anxiety to Digital Pride', 'Adefemi shares how internet fraud brought him constant fear, and how ORM helped him redirect his tech skills into software development.', 'I used to be a ''Yahoo Boy''. I made money, yes, but I couldn''t sleep. The constant fear of the EFCC, the moral burden of knowing I ruined lives, and the toxic company I kept almost pushed me to suicide. When the ORM school tour visited our community center, I felt like the founder was speaking directly to my soul. I decided to make a U-turn. ORM accepted me, kept me anonymous during my recovery, and enrolled me in a digital skills boot camp. Today, I am a certified backend software engineer earning a legitimate living. The peace of mind I have now is completely priceless. Integrity is everything.', 'Anxious ''Yahoo'' hacker in constant fear', 'Legitimate Software Developer and ORM Mentor'),
('story-2', 'Yetunde', 'entrepreneurship', 'Rising Above the Streets: Creating a Thriving Brand', 'Yetunde shares how she overcame toxic peer pressure and street vulnerability to establish a thriving organic cosmetics company with ORM''s grant.', 'Growing up in a tough neighborhood in Ibadan, the pressure to engage in transactional relationships or social vices was high. I wanted more for myself. I loved natural skincare but had zero capital. Through the ORM entrepreneurship workshop, I learned business planning, packaging, and digital branding. I pitched my idea and received a small startup seed grant. Today, ''Awele Organics'' employs three other youths and supplies products nationwide. ORM didn''t just give me money; they gave me a positive identity. I am a true Omoluabi.', 'Struggling street vendor facing toxic peer pressure', 'CEO of Awele Organics, employing local youths')
ON CONFLICT (id) DO NOTHING;

-- Insert initial seed events
INSERT INTO public.events (id, title, date, time, location, "desc", status) VALUES
('event-1', 'Lagos High School Integrity Summit', '2026-06-15', '09:00 AM', 'National Theatre, Iganmu, Lagos', 'A massive gathering of 2,000+ secondary school students focusing on moral orientation, digital skills pathways, and anti-vice campaigns.', 'Upcoming'),
('event-2', 'Ibadan Youth Leadership Assembly', '2026-07-10', '10:00 AM', 'Mapo Hall, Ibadan, Oyo State', 'An orientation program for university undergraduates and community youths on ethics, community leadership, and social entrepreneurship.', 'Upcoming')
ON CONFLICT (id) DO NOTHING;

-- 9. MEMBERS TABLE (100 Future Leaders)
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    referral_code TEXT UNIQUE NOT NULL,
    referred_by_id UUID REFERENCES public.members(id),
    points INT DEFAULT 0,
    rank TEXT DEFAULT 'Beginner',
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. COURSE PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.course_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL,
    completion_status TEXT DEFAULT 'Pending',
    quiz_score INT DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 11. CONTENT CALENDAR TABLE (NINUOYO TV)
CREATE TABLE IF NOT EXISTS public.content_calendar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date_to_publish DATE NOT NULL,
    platform TEXT NOT NULL,
    content_type TEXT NOT NULL,
    text_prompt TEXT NOT NULL,
    status TEXT DEFAULT 'Draft',
    media_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. SPONSORSHIP CRM TABLE
CREATE TABLE IF NOT EXISTS public.sponsorship_crm (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    contact_name TEXT,
    status TEXT DEFAULT 'Lead',
    last_outreach DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. LEADERBOARD VIEW
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT id, name, points, rank,
       RANK() OVER (ORDER BY points DESC) as leaderboard_rank
FROM public.members
WHERE status = 'Active';

-- Enable RLS for new tables
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsorship_crm ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-write access to members" ON public.members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to course_progress" ON public.course_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to content_calendar" ON public.content_calendar FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to sponsorship_crm" ON public.sponsorship_crm FOR ALL USING (true) WITH CHECK (true);

-- ==========================================
-- YOUNG GOVERNMENT INITIATIVE (YGI) TABLES
-- ==========================================

-- 14. YGI POSITIONS TABLE
CREATE TABLE IF NOT EXISTS public.ygi_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    level TEXT NOT NULL, -- 'State', 'Local', 'Legislative'
    description TEXT NOT NULL,
    requirements TEXT,
    status TEXT DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. YGI APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.ygi_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    dob DATE NOT NULL,
    gender TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    state TEXT NOT NULL,
    lga TEXT NOT NULL,
    school TEXT NOT NULL,
    class_level TEXT NOT NULL,
    parent_info TEXT NOT NULL,
    leadership_experience TEXT,
    community_experience TEXT,
    position_id UUID REFERENCES public.ygi_positions(id),
    personal_statement TEXT NOT NULL,
    passport_url TEXT,
    id_url TEXT,
    recommendation_url TEXT,
    screening_score INT DEFAULT 0,
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. YGI INTERVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.ygi_interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.ygi_applications(id) ON DELETE CASCADE,
    interview_date TIMESTAMP WITH TIME ZONE,
    panel_members TEXT,
    score INT DEFAULT 0,
    feedback TEXT,
    status TEXT DEFAULT 'Scheduled', -- 'Scheduled', 'Completed', 'Missed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 17. YGI ELECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.ygi_elections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    position_id UUID REFERENCES public.ygi_positions(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'Upcoming', -- 'Upcoming', 'Active', 'Completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 18. YGI VOTES TABLE
CREATE TABLE IF NOT EXISTS public.ygi_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    election_id UUID REFERENCES public.ygi_elections(id) ON DELETE CASCADE,
    candidate_id UUID REFERENCES public.ygi_applications(id) ON DELETE CASCADE,
    voter_identifier TEXT NOT NULL, -- Could be IP or Hash to prevent double voting
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(election_id, voter_identifier)
);

-- 19. YGI TRAININGS TABLE
CREATE TABLE IF NOT EXISTS public.ygi_trainings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    module_name TEXT NOT NULL,
    content_url TEXT, -- Video or Document
    quiz_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 20. YGI CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.ygi_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID REFERENCES public.ygi_applications(id),
    certificate_type TEXT NOT NULL, -- 'Participation', 'Leadership', 'Appointment', 'Award'
    issue_date DATE DEFAULT CURRENT_DATE,
    certificate_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 21. YGI PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.ygi_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    leader_id UUID REFERENCES public.ygi_applications(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    evidence_urls JSONB,
    beneficiaries_count INT DEFAULT 0,
    impact_score INT DEFAULT 0,
    status TEXT DEFAULT 'Ongoing',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for YGI tables
ALTER TABLE public.ygi_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ygi_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ygi_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ygi_elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ygi_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ygi_trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ygi_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ygi_projects ENABLE ROW LEVEL SECURITY;

-- Add basic public read-write policies (For demo/frontend ease - in production these should be restricted)
CREATE POLICY "Allow public read-write access to ygi_positions" ON public.ygi_positions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to ygi_applications" ON public.ygi_applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to ygi_interviews" ON public.ygi_interviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to ygi_elections" ON public.ygi_elections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to ygi_votes" ON public.ygi_votes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to ygi_trainings" ON public.ygi_trainings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to ygi_certificates" ON public.ygi_certificates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to ygi_projects" ON public.ygi_projects FOR ALL USING (true) WITH CHECK (true);
