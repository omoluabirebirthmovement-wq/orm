-- ==========================================
-- AI COMMAND CENTER (ACC) TABLES
-- ==========================================

-- 1. ACC USERS TABLE (For system roles: admin, parent, student, staff)
CREATE TABLE IF NOT EXISTS public.acc_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'student', -- 'admin', 'parent', 'student', 'staff'
    whatsapp_id TEXT,
    telegram_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. GOALS TABLE
CREATE TABLE IF NOT EXISTS public.goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.acc_users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- 'personal', 'business', 'YGI', 'education'
    status TEXT DEFAULT 'pending', -- 'pending', 'in-progress', 'completed'
    progress_percentage INT DEFAULT 0,
    deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TASKS TABLE
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID REFERENCES public.goals(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
    status TEXT DEFAULT 'pending', -- 'pending', 'completed'
    due_date TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. MESSAGES LOG TABLE
CREATE TABLE IF NOT EXISTS public.messages_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel TEXT NOT NULL, -- 'whatsapp', 'telegram', 'system'
    recipient TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'queued', -- 'sent', 'failed', 'queued'
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. YGI MEMBERS TABLE (Integrated into ACC)
CREATE TABLE IF NOT EXISTS public.acc_ygi_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.acc_users(id),
    parent_name TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    student_name TEXT NOT NULL,
    age INT,
    class TEXT,
    status TEXT DEFAULT 'active',
    cohort_number INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for new tables
ALTER TABLE public.acc_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_ygi_members ENABLE ROW LEVEL SECURITY;

-- For the admin dashboard backend, we will use the Service Role Key which bypasses RLS.
-- Therefore, we don't necessarily need public policies unless the client connects directly.
-- To allow the client (if authenticated) or just open for now (since it's a demo/admin system):
CREATE POLICY "Allow public read-write access to acc_users" ON public.acc_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to goals" ON public.goals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to messages_log" ON public.messages_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write access to acc_ygi_members" ON public.acc_ygi_members FOR ALL USING (true) WITH CHECK (true);
