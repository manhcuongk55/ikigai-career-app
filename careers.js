// ===== IKIGAI - Career Database & Mentor Directory =====

const CAREERS = [
    // ===== TECH & AI =====
    {
        id: "ai-engineer",
        name: "AI / Machine Learning Engineer",
        icon: "🤖",
        category: "Tech & AI",
        match_tags: ["tech", "analytical", "ai", "automation", "learning"],
        salary_range: "25-80 triệu/tháng",
        growth: "🔥 Rất cao",
        description: "Xây dựng và triển khai mô hình AI, tự động hoá quy trình bằng machine learning.",
        skills: ["Python", "TensorFlow/PyTorch", "Data Science", "Problem Solving"],
        ikigai_fit: { love: 0.7, good: 0.9, need: 0.9, paid: 0.9 }
    },
    {
        id: "data-analyst",
        name: "Data Analyst / Scientist",
        icon: "📊",
        category: "Tech & AI",
        match_tags: ["analytical", "tech", "digital", "business"],
        salary_range: "18-50 triệu/tháng",
        growth: "🔥 Rất cao",
        description: "Phân tích dữ liệu để đưa ra insight kinh doanh, hỗ trợ ra quyết định chiến lược.",
        skills: ["SQL", "Python/R", "Tableau/PowerBI", "Statistics"],
        ikigai_fit: { love: 0.6, good: 0.9, need: 0.8, paid: 0.8 }
    },
    {
        id: "software-dev",
        name: "Software Developer / Engineer",
        icon: "💻",
        category: "Tech & AI",
        match_tags: ["tech", "analytical", "digital", "innovation"],
        salary_range: "20-70 triệu/tháng",
        growth: "📈 Cao",
        description: "Phát triển phần mềm, ứng dụng web/mobile phục vụ hàng triệu người dùng.",
        skills: ["JavaScript", "React/Vue", "Backend Dev", "DevOps"],
        ikigai_fit: { love: 0.7, good: 0.9, need: 0.7, paid: 0.9 }
    },
    {
        id: "product-manager",
        name: "Product Manager",
        icon: "🎯",
        category: "Tech & AI",
        match_tags: ["tech", "management", "strategy", "product", "ux", "communication"],
        salary_range: "25-60 triệu/tháng",
        growth: "📈 Cao",
        description: "Quản lý sản phẩm từ ý tưởng đến ra mắt, kết nối kỹ thuật và kinh doanh.",
        skills: ["Product Strategy", "Agile/Scrum", "UX Research", "Data-driven Decision"],
        ikigai_fit: { love: 0.7, good: 0.8, need: 0.8, paid: 0.8 }
    },

    // ===== MARKETING & CREATIVE =====
    {
        id: "digital-marketer",
        name: "Digital Marketing Manager",
        icon: "📱",
        category: "Marketing & Creative",
        match_tags: ["marketing", "content", "digital", "communication", "branding", "creative"],
        salary_range: "15-45 triệu/tháng",
        growth: "📈 Cao",
        description: "Lên chiến lược marketing online, quản lý ads, SEO, content để tăng trưởng doanh nghiệp.",
        skills: ["Facebook/Google Ads", "SEO/SEM", "Content Strategy", "Analytics"],
        ikigai_fit: { love: 0.7, good: 0.7, need: 0.7, paid: 0.7 }
    },
    {
        id: "content-creator",
        name: "Content Creator / Influencer",
        icon: "🎬",
        category: "Marketing & Creative",
        match_tags: ["creative", "content", "branding", "social", "design"],
        salary_range: "10-100 triệu/tháng",
        growth: "🔥 Rất cao",
        description: "Tạo nội dung (video, blog, podcast) xây dựng thương hiệu cá nhân và kiếm tiền từ đó.",
        skills: ["Video Editing", "Copywriting", "Social Media", "Personal Branding"],
        ikigai_fit: { love: 0.9, good: 0.7, need: 0.6, paid: 0.7 }
    },
    {
        id: "ux-designer",
        name: "UX/UI Designer",
        icon: "🎨",
        category: "Marketing & Creative",
        match_tags: ["creative", "design", "tech", "ux", "product"],
        salary_range: "18-50 triệu/tháng",
        growth: "📈 Cao",
        description: "Thiết kế giao diện và trải nghiệm người dùng cho sản phẩm số.",
        skills: ["Figma/Sketch", "Design Thinking", "Prototyping", "User Research"],
        ikigai_fit: { love: 0.8, good: 0.8, need: 0.7, paid: 0.8 }
    },
    {
        id: "brand-strategist",
        name: "Brand Strategist",
        icon: "💎",
        category: "Marketing & Creative",
        match_tags: ["branding", "strategy", "communication", "marketing", "creative"],
        salary_range: "20-50 triệu/tháng",
        growth: "📈 Cao",
        description: "Xây dựng chiến lược thương hiệu, định vị và storytelling cho doanh nghiệp.",
        skills: ["Brand Strategy", "Market Research", "Storytelling", "Visual Identity"],
        ikigai_fit: { love: 0.8, good: 0.7, need: 0.7, paid: 0.7 }
    },

    // ===== BUSINESS & FINANCE =====
    {
        id: "startup-founder",
        name: "Startup Founder / CEO",
        icon: "🚀",
        category: "Business & Finance",
        match_tags: ["entrepreneurship", "strategy", "leadership", "innovation", "business", "ambition"],
        salary_range: "Không giới hạn",
        growth: "🔥 Rất cao (Rủi ro cao)",
        description: "Sáng lập và điều hành startup, biến ý tưởng thành doanh nghiệp triệu đô.",
        skills: ["Business Model", "Fundraising", "Leadership", "Product-Market Fit"],
        ikigai_fit: { love: 0.9, good: 0.7, need: 0.8, paid: 0.8 }
    },
    {
        id: "business-consultant",
        name: "Business Consultant",
        icon: "💼",
        category: "Business & Finance",
        match_tags: ["consulting", "business", "strategy", "analytical", "communication", "management"],
        salary_range: "25-80 triệu/tháng",
        growth: "📈 Cao",
        description: "Tư vấn chiến lược, tối ưu vận hành, và giúp doanh nghiệp tăng trưởng.",
        skills: ["Strategy Consulting", "Financial Analysis", "Presentation", "Problem Solving"],
        ikigai_fit: { love: 0.6, good: 0.8, need: 0.8, paid: 0.9 }
    },
    {
        id: "financial-advisor",
        name: "Financial Advisor / Analyst",
        icon: "📈",
        category: "Business & Finance",
        match_tags: ["finance", "fintech", "analytical", "investment", "business"],
        salary_range: "20-60 triệu/tháng",
        growth: "📈 Cao",
        description: "Phân tích tài chính, tư vấn đầu tư, quản lý tài sản cho cá nhân và doanh nghiệp.",
        skills: ["Financial Modeling", "Investment Analysis", "Risk Management", "CFA"],
        ikigai_fit: { love: 0.5, good: 0.8, need: 0.7, paid: 0.9 }
    },
    {
        id: "ecommerce-manager",
        name: "E-commerce Manager",
        icon: "🛒",
        category: "Business & Finance",
        match_tags: ["business", "digital", "sales", "marketing", "operations", "consumer"],
        salary_range: "15-40 triệu/tháng",
        growth: "📈 Cao",
        description: "Quản lý cửa hàng online, tối ưu funnel bán hàng, và phát triển doanh thu.",
        skills: ["E-commerce Platform", "Supply Chain", "CRO", "Customer Analytics"],
        ikigai_fit: { love: 0.6, good: 0.7, need: 0.7, paid: 0.8 }
    },

    // ===== EDUCATION & COACHING =====
    {
        id: "coach-mentor",
        name: "Life/Business Coach",
        icon: "🧭",
        category: "Education & Coaching",
        match_tags: ["coaching", "social", "communication", "hr", "education", "social-impact"],
        salary_range: "15-80 triệu/tháng",
        growth: "🔥 Rất cao",
        description: "Coaching 1:1 và nhóm, giúp cá nhân và doanh nhân đạt mục tiêu nghề nghiệp và cuộc sống.",
        skills: ["Active Listening", "NLP", "Goal Setting", "Emotional Intelligence"],
        ikigai_fit: { love: 0.9, good: 0.7, need: 0.9, paid: 0.7 }
    },
    {
        id: "trainer-educator",
        name: "Corporate Trainer / Educator",
        icon: "🎓",
        category: "Education & Coaching",
        match_tags: ["education", "coaching", "communication", "social", "digital-product"],
        salary_range: "15-50 triệu/tháng",
        growth: "📈 Cao",
        description: "Đào tạo kỹ năng cho doanh nghiệp, tạo khoá học online, và phát triển nhân lực.",
        skills: ["Instructional Design", "Public Speaking", "LMS", "E-learning"],
        ikigai_fit: { love: 0.8, good: 0.7, need: 0.8, paid: 0.7 }
    },
    {
        id: "hr-specialist",
        name: "HR & Talent Development",
        icon: "👥",
        category: "Education & Coaching",
        match_tags: ["hr", "management", "communication", "coaching", "leadership"],
        salary_range: "15-45 triệu/tháng",
        growth: "📊 Trung bình-Cao",
        description: "Quản trị nhân sự, tuyển dụng, đào tạo, và phát triển văn hoá doanh nghiệp.",
        skills: ["Recruitment", "People Management", "OD", "Labor Law"],
        ikigai_fit: { love: 0.6, good: 0.7, need: 0.7, paid: 0.7 }
    },

    // ===== HEALTHCARE & WELLNESS =====
    {
        id: "health-tech",
        name: "HealthTech / Wellness Specialist",
        icon: "🏥",
        category: "Healthcare & Wellness",
        match_tags: ["healthcare", "wellness", "tech", "social-impact", "innovation"],
        salary_range: "20-60 triệu/tháng",
        growth: "🔥 Rất cao",
        description: "Ứng dụng công nghệ trong y tế, wellness, telemedicine và chăm sóc sức khoẻ.",
        skills: ["Health Informatics", "Telemedicine", "Wellness Programs", "MedTech"],
        ikigai_fit: { love: 0.7, good: 0.7, need: 0.9, paid: 0.7 }
    },

    // ===== FREELANCE & GLOBAL =====
    {
        id: "freelancer",
        name: "Freelancer / Digital Nomad",
        icon: "🌏",
        category: "Freelance & Global",
        match_tags: ["freelance", "global", "digital", "creative", "tech", "language"],
        salary_range: "15-100 triệu/tháng",
        growth: "🔥 Rất cao",
        description: "Làm việc tự do từ xa, phục vụ khách hàng toàn cầu với kỹ năng chuyên môn.",
        skills: ["Remote Work", "Self-discipline", "Client Management", "Portfolio Building"],
        ikigai_fit: { love: 0.8, good: 0.7, need: 0.6, paid: 0.8 }
    }
];

// ===== MENTORS DATABASE =====
const MENTORS = [
    {
        id: "m1",
        name: "Nguyễn Hà Đông",
        avatar: "👨‍💻",
        title: "AI & Tech Mentor",
        specialty: ["Tech & AI", "Startup"],
        match_careers: ["ai-engineer", "data-analyst", "software-dev", "product-manager"],
        bio: "15 năm kinh nghiệm trong AI và phát triển phần mềm. Cựu Tech Lead tại các công ty công nghệ hàng đầu.",
        expertise: ["Machine Learning", "System Design", "Career in Tech"],
        rating: 4.9,
        sessions: 120,
        price: "500k/session"
    },
    {
        id: "m2",
        name: "Trần Minh Anh",
        avatar: "👩‍🎨",
        title: "Creative & Brand Mentor",
        specialty: ["Marketing & Creative"],
        match_careers: ["digital-marketer", "content-creator", "ux-designer", "brand-strategist"],
        bio: "Brand Director với 10 năm kinh nghiệm tại các agency hàng đầu. Chuyên gia storytelling và xây dựng thương hiệu.",
        expertise: ["Brand Strategy", "Content Marketing", "Creative Direction"],
        rating: 4.8,
        sessions: 95,
        price: "450k/session"
    },
    {
        id: "m3",
        name: "Lê Quốc Việt",
        avatar: "👨‍💼",
        title: "Business & Strategy Mentor",
        specialty: ["Business & Finance"],
        match_careers: ["startup-founder", "business-consultant", "financial-advisor", "ecommerce-manager"],
        bio: "Serial entrepreneur với 3 lần exit thành công. Mentor cho 50+ startup trong hệ sinh thái Việt Nam.",
        expertise: ["Business Model", "Fundraising", "Go-to-Market Strategy"],
        rating: 4.9,
        sessions: 200,
        price: "800k/session"
    },
    {
        id: "m4",
        name: "Phạm Thuỳ Linh",
        avatar: "👩‍🏫",
        title: "Education & Coaching Mentor",
        specialty: ["Education & Coaching"],
        match_careers: ["coach-mentor", "trainer-educator", "hr-specialist"],
        bio: "ICF Certified Coach, đào tạo 500+ học viên. Chuyên gia phát triển cá nhân và nghề nghiệp.",
        expertise: ["Coaching Skills", "Career Development", "Leadership"],
        rating: 4.7,
        sessions: 180,
        price: "400k/session"
    },
    {
        id: "m5",
        name: "Đặng Hoàng Nam",
        avatar: "👨‍⚕️",
        title: "HealthTech & Wellness Mentor",
        specialty: ["Healthcare & Wellness"],
        match_careers: ["health-tech"],
        bio: "Bác sĩ chuyển ngành HealthTech. Co-founder startup y tế số được đầu tư Series A.",
        expertise: ["HealthTech", "Telemedicine", "Wellness Business"],
        rating: 4.8,
        sessions: 60,
        price: "600k/session"
    },
    {
        id: "m6",
        name: "Vũ Thị Hương",
        avatar: "👩‍💻",
        title: "Freelance & Remote Work Mentor",
        specialty: ["Freelance & Global"],
        match_careers: ["freelancer"],
        bio: "Digital nomad 7 năm, thu nhập $10k+/tháng từ freelance. Giúp 200+ người Việt làm việc remote toàn cầu.",
        expertise: ["Freelancing", "Remote Work", "Global Clients", "Portfolio"],
        rating: 4.9,
        sessions: 150,
        price: "350k/session"
    },
    {
        id: "m7",
        name: "Ngô Thanh Tùng",
        avatar: "🧑‍💼",
        title: "Product & UX Mentor",
        specialty: ["Tech & AI", "Marketing & Creative"],
        match_careers: ["product-manager", "ux-designer"],
        bio: "Head of Product tại unicorn Việt Nam. 8 năm kinh nghiệm xây dựng sản phẩm từ 0 đến triệu users.",
        expertise: ["Product Management", "UX Strategy", "Growth Hacking"],
        rating: 4.8,
        sessions: 85,
        price: "550k/session"
    }
];

// ===== CAREER MATCHING ENGINE =====
function matchCareers(answers, questions) {
    // Collect all tags from high-scored questions
    const tagScores = {};

    questions.forEach(q => {
        const answer = answers[q.id] || 0;
        if (q.tags) {
            q.tags.forEach(tag => {
                if (!tagScores[tag]) tagScores[tag] = 0;
                tagScores[tag] += answer * q.weight;
            });
        }
    });

    // Score each career
    const scoredCareers = CAREERS.map(career => {
        let matchScore = 0;
        let maxPossible = 0;

        career.match_tags.forEach(tag => {
            matchScore += tagScores[tag] || 0;
            maxPossible += 5 * 1.5; // max answer * max weight
        });

        // Normalize to 0-100
        const normalizedScore = maxPossible > 0 ? Math.round((matchScore / maxPossible) * 100) : 0;

        return {
            ...career,
            matchScore: normalizedScore
        };
    });

    // Sort by match score descending
    scoredCareers.sort((a, b) => b.matchScore - a.matchScore);

    return scoredCareers;
}

// ===== MENTOR MATCHING =====
function matchMentors(topCareers) {
    const topCareerIds = topCareers.slice(0, 5).map(c => c.id);
    const topCategories = [...new Set(topCareers.slice(0, 5).map(c => c.category))];

    const scoredMentors = MENTORS.map(mentor => {
        let relevance = 0;
        // Match by career ID
        mentor.match_careers.forEach(cid => {
            if (topCareerIds.includes(cid)) relevance += 3;
        });
        // Match by category
        mentor.specialty.forEach(spec => {
            if (topCategories.includes(spec)) relevance += 1;
        });

        return { ...mentor, relevance };
    });

    scoredMentors.sort((a, b) => b.relevance - a.relevance);
    return scoredMentors.filter(m => m.relevance > 0);
}
